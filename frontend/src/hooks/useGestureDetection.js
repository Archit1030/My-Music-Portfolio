import { useRef, useState, useCallback, useEffect } from 'react';
import { classifyGesture, detectSwipe, resetSwipeHistory } from '../utils/gestureRecognizer';

const GESTURE_LABELS = {
  OPEN_PALM: 'Play',
  FIST: 'Pause',
  SWIPE_LEFT: 'Previous',
  SWIPE_RIGHT: 'Next',
  THUMBS_UP: 'Vol +',
  THUMBS_DOWN: 'Vol -',
};

export function useGestureDetection({ onGesture } = {}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const handsRef = useRef(null);
  const cameraRef = useRef(null);
  const onGestureRef = useRef(onGesture);

  const [isReady, setIsReady] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [hasLandmarks, setHasLandmarks] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    onGestureRef.current = onGesture;
  }, [onGesture]);

  // Check if MediaPipe is loaded
  useEffect(() => {
    let attempts = 0;
    const checkMediaPipe = setInterval(() => {
      if (window.Hands && window.Camera) {
        setIsReady(true);
        clearInterval(checkMediaPipe);
      } else if (attempts++ > 50) {
        setError('Hand tracking library failed to load. Check your internet connection.');
        clearInterval(checkMediaPipe);
      }
    }, 200);

    return () => clearInterval(checkMediaPipe);
  }, []);

  const drawResults = useCallback((results) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Black background instead of transparent overlay
    ctx.fillStyle = '#09090B';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle tech grid
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
    ctx.lineWidth = 0.5;
    const gridSize = 30;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        if (window.drawConnectors && window.HAND_CONNECTIONS) {
          // Outer glow layer
          ctx.save();
          ctx.shadowColor = '#3B82F6';
          ctx.shadowBlur = 16;
          window.drawConnectors(ctx, landmarks, window.HAND_CONNECTIONS, {
            color: 'rgba(59, 130, 246, 0.4)',
            lineWidth: 6,
          });
          ctx.restore();

          // Core line
          ctx.save();
          ctx.shadowColor = '#60A5FA';
          ctx.shadowBlur = 6;
          window.drawConnectors(ctx, landmarks, window.HAND_CONNECTIONS, {
            color: '#3B82F6',
            lineWidth: 2.5,
          });
          ctx.restore();
        }
        if (window.drawLandmarks) {
          // Outer glow dots
          ctx.save();
          ctx.shadowColor = '#93C5FD';
          ctx.shadowBlur = 12;
          window.drawLandmarks(ctx, landmarks, {
            color: '#60A5FA',
            fillColor: '#93C5FD',
            lineWidth: 1,
            radius: 4,
          });
          ctx.restore();
        }
      }
    } else {
      // No hand detected - show hint text
      ctx.fillStyle = 'rgba(161, 161, 170, 0.4)';
      ctx.font = '14px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Show your hand to the camera', canvas.width / 2, canvas.height / 2);
    }
  }, []);

  const processGestures = useCallback((results) => {
    if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
      setHasLandmarks(false);
      return;
    }
    
    setHasLandmarks(true);
    const landmarks = results.multiHandLandmarks[0];

    const swipe = detectSwipe(landmarks);
    if (swipe) {
      onGestureRef.current(swipe);
      return;
    }

    const gesture = classifyGesture(landmarks);
    if (gesture) {
      onGestureRef.current(gesture);
    }
  }, []);

  const startDetection = useCallback(async () => {
    if (!isReady) {
      setError('Hand tracking library not ready');
      return;
    }

    setError(null);
    
    // Set isDetecting to true first to render the video element
    setIsDetecting(true);
    
    // Wait for React to render the video element
    await new Promise(resolve => setTimeout(resolve, 100));

    let cancelled = false;

    const initCamera = async () => {
      try {
        if (!videoRef.current) {
          setError('Video element not found');
          setIsDetecting(false);
          return;
        }

        const hands = new window.Hands({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });

        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.7,
          minTrackingConfidence: 0.5,
        });

        hands.onResults((results) => {
          if (cancelled) return;
          drawResults(results);
          processGestures(results);
        });

        handsRef.current = hands;

        if (!window.Camera) {
          setError('Camera utilities failed to load.');
          setIsDetecting(false);
          return;
        }

        const camera = new window.Camera(videoRef.current, {
          onFrame: async () => {
            if (handsRef.current && videoRef.current) {
              await handsRef.current.send({ image: videoRef.current });
            }
          },
          width: 640,
          height: 480,
        });

        await camera.start();
        cameraRef.current = camera;

        if (canvasRef.current && videoRef.current) {
          canvasRef.current.width = 640;
          canvasRef.current.height = 480;
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Camera initialization error:', err);
          setError(err.message || 'Failed to initialize hand tracking');
          setIsDetecting(false);
        }
      }
    };

    initCamera();

    return () => {
      cancelled = true;
    };
  }, [isReady, drawResults, processGestures]);

  const stopDetection = useCallback(() => {
    if (cameraRef.current) {
      cameraRef.current.stop();
      cameraRef.current = null;
    }
    if (handsRef.current) {
      handsRef.current.close();
      handsRef.current = null;
    }
    resetSwipeHistory();
    setIsDetecting(false);
    setHasLandmarks(false);
  }, []);

  useEffect(() => {
    return () => {
      stopDetection();
    };
  }, [stopDetection]);

  return { 
    videoRef, 
    canvasRef, 
    isReady, 
    isDetecting, 
    hasLandmarks, 
    error, 
    startDetection, 
    stopDetection 
  };
}
