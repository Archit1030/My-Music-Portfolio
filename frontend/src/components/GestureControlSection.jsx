import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  CameraOff,
  Hand,
  AlertCircle,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import { useGestureDetection } from '../hooks/useGestureDetection';
import { useMusicPlayer } from '../context/MusicPlayerContext';

// ── Gesture legend data ──────────────────────────────────────────────────────

const GESTURE_LEGEND = [
  {
    name: 'OPEN_PALM',
    label: 'Open Palm',
    action: 'Play',
    icon: Play,
    cooldown: 1500,
  },
  {
    name: 'FIST',
    label: 'Closed Fist',
    action: 'Pause',
    icon: Pause,
    cooldown: 1500,
  },
  {
    name: 'SWIPE_RIGHT',
    label: 'Swipe Right',
    action: 'Next Track',
    icon: ChevronRight,
    cooldown: 1500,
  },
  {
    name: 'SWIPE_LEFT',
    label: 'Swipe Left',
    action: 'Previous Track',
    icon: ChevronLeft,
    cooldown: 1500,
  },
  {
    name: 'THUMBS_UP',
    label: 'Thumbs Up',
    action: 'Volume Up',
    icon: ThumbsUp,
    cooldown: 1500,
  },
  {
    name: 'THUMBS_DOWN',
    label: 'Thumbs Down',
    action: 'Volume Down',
    icon: ThumbsDown,
    cooldown: 1500,
  },
];

// ── Gesture → MusicPlayerContext dispatch mapping ────────────────────────────

function applyGesture(dispatch, stateRef, gestureName) {
  const state = stateRef.current;
  switch (gestureName) {
    case 'SWIPE_RIGHT':
      dispatch({ type: 'NEXT_TRACK' });
      break;
    case 'SWIPE_LEFT':
      dispatch({ type: 'PREV_TRACK' });
      break;
    case 'THUMBS_UP':
      dispatch({ type: 'SET_VOLUME', value: Math.min(1.0, state.volume + 0.1) });
      break;
    case 'THUMBS_DOWN':
      dispatch({ type: 'SET_VOLUME', value: Math.max(0.0, state.volume - 0.1) });
      break;
    case 'OPEN_PALM':
      if (!state.isPlaying && state.currentTrackIndex !== null) {
        dispatch({ type: 'PLAY_TRACK', index: state.currentTrackIndex });
      }
      break;
    case 'FIST':
      if (state.isPlaying) {
        dispatch({ type: 'PAUSE' });
      }
      break;
    default:
      break;
  }
}

// ── Sub-components ───────────────────────────────────────────────────────────

/** 5.1 — Activation panel shown before camera starts */
const ActivationPanel = ({ onActivate, isReady, error, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-16 gap-6">
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center"
    >
      <Hand className="w-10 h-10 text-cyan-400" />
    </motion.div>

    <div className="text-center max-w-sm">
      <h3 className="text-xl font-bold text-white mb-2">Gesture Control</h3>
      <p className="text-gray-400 text-sm">
        Control music playback with hand gestures using your webcam. No data is stored or transmitted.
      </p>
    </div>

    {/* 5.1 — Camera permission error with retry */}
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="flex items-start gap-3 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl max-w-sm text-sm text-red-400"
        >
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}
    </AnimatePresence>

    <div className="flex gap-3">
      <button
        onClick={onActivate}
        disabled={!isReady}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-full shadow-lg shadow-cyan-500/30 transition-all duration-300"
      >
        <Camera className="w-4 h-4" />
        {isReady ? 'Activate Gesture Control' : 'Loading model…'}
      </button>

      {error && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 font-semibold rounded-full transition-all duration-300"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      )}
    </div>
  </div>
);

/** 5.2 — Camera preview with landmark canvas overlay */
const CameraPreview = ({ videoRef, canvasRef, isDetecting, hasLandmarks, onStop }) => (
  <div className="relative w-full max-w-md mx-auto">
    {/* Mirrored video — CSS scaleX(-1) per requirement 2.2 */}
    <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-lg shadow-cyan-500/10 bg-black aspect-video">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover opacity-0"
        style={{ transform: 'scaleX(-1)' }}
      />
      {/* Canvas overlay — mirrored to match video */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ transform: 'scaleX(-1)' }}
      />
    </div>

    {/* Stop button */}
    <div className="flex justify-center mt-3">
      <button
        onClick={onStop}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-400 hover:text-white text-sm rounded-full transition-all duration-300"
      >
        <CameraOff className="w-3.5 h-3.5" />
        Stop Camera
      </button>
    </div>
  </div>
);

/** 5.3 — Gesture legend panel */
const GestureLegend = ({ activeGestureName }) => (
  <div className="grid grid-cols-2 gap-2">
    {GESTURE_LEGEND.map(({ name, label, action, icon: Icon }) => {
      const isActive = activeGestureName === name;
      return (
        <motion.div
          key={name}
          animate={isActive ? { scale: [1, 1.03, 1] } : {}}
          transition={{ duration: 0.3 }}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-300 ${
            isActive
              ? 'bg-cyan-500/15 border-cyan-500/60 shadow-sm shadow-cyan-500/20'
              : 'bg-gray-900/60 border-gray-800'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
              isActive
                ? 'bg-cyan-500/30 text-cyan-300'
                : 'bg-gray-800 text-gray-500'
            }`}
          >
            <Icon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className={`text-xs font-medium truncate transition-colors duration-300 ${isActive ? 'text-cyan-300' : 'text-gray-400'}`}>
              {label}
            </div>
            <div className={`text-xs truncate transition-colors duration-300 ${isActive ? 'text-cyan-400/80' : 'text-gray-600'}`}>
              {action}
            </div>
          </div>
        </motion.div>
      );
    })}
  </div>
);

/** 5.4 — Status bar with live indicators */
const StatusBar = ({ lastGesture, volume }) => (
  <div className="flex items-center justify-between gap-4 px-4 py-3 bg-gray-900/80 border border-gray-800 rounded-xl text-sm">
    {/* Last gesture + action */}
    <div className="flex items-center gap-2 min-w-0">
      <div className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0 animate-pulse" />
      <AnimatePresence mode="wait">
        {lastGesture ? (
          <motion.span
            key={lastGesture.timestamp}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-cyan-400 font-medium truncate"
          >
            {lastGesture.action}
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-600"
          >
            Waiting for gesture…
          </motion.span>
        )}
      </AnimatePresence>
    </div>

    {/* Live numeric indicators */}
    <div className="flex items-center gap-4 flex-shrink-0 text-xs">
      <span className="text-gray-500">
        Vol: <span className="text-gray-300 font-mono">{Math.round(volume * 100)}%</span>
      </span>
    </div>
  </div>
);

/** Now-playing mini-player shown while gesture control is active */
const NowPlaying = ({ track, isPlaying, onPlayPause, onNext, onPrev }) => {
  if (!track) return null;
  return (
    <div className="flex items-center gap-4 px-4 py-3 bg-gray-900/80 border border-cyan-500/20 rounded-xl">
      <img
        src={track.coverArt}
        alt={track.title}
        className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-gray-700"
      />
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm truncate">{track.title}</p>
        <p className="text-gray-500 text-xs truncate">{track.genre}</p>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={onPrev}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={onPlayPause}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-cyan-500 hover:bg-cyan-400 text-white transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" fill="white" /> : <Play className="w-4 h-4 ml-0.5" fill="white" />}
        </button>
        <button
          onClick={onNext}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ── Main component ───────────────────────────────────────────────────────────

const GestureControlSection = () => {
  const { state, dispatch } = useMusicPlayer();
  const stateRef = useRef(state);
  const [lastGesture, setLastGesture] = useState(null);
  const cooldownMapRef = useRef({});

  // Keep stateRef current so gesture handler never reads stale state
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const handleGesture = useCallback(
    (gestureName) => {
      // Check cooldown - use different cooldowns for different gestures
      const now = Date.now();
      const gestureInfo = GESTURE_LEGEND.find(g => g.name === gestureName);
      const cooldown = gestureInfo?.cooldown || 1500;
      
      if (now - (cooldownMapRef.current[gestureName] || 0) < cooldown) {
        return;
      }
      cooldownMapRef.current[gestureName] = now;

      // Find gesture action for display
      const event = {
        name: gestureName,
        action: gestureInfo?.action || gestureName,
        timestamp: now,
      };

      setLastGesture(event);
      setTimeout(() => setLastGesture((prev) => (prev?.timestamp === event.timestamp ? null : prev)), 800);
      applyGesture(dispatch, stateRef, gestureName);
    },
    [dispatch]
  );

  const { videoRef, canvasRef, isReady, isDetecting, hasLandmarks, error, startDetection, stopDetection } =
    useGestureDetection({ onGesture: handleGesture });

  // Auto-start first track when camera activates (if nothing is playing)
  const handleActivate = useCallback(async () => {
    await startDetection();
    if (stateRef.current.currentTrackIndex === null) {
      dispatch({ type: 'PLAY_TRACK', index: 0 });
    }
  }, [startDetection, dispatch]);

  const currentTrack =
    state.currentTrackIndex !== null ? state.tracks[state.currentTrackIndex] : null;

  const handlePlayPause = useCallback(() => {
    if (state.isPlaying) {
      dispatch({ type: 'PAUSE' });
    } else if (state.currentTrackIndex !== null) {
      dispatch({ type: 'PLAY_TRACK', index: state.currentTrackIndex });
    } else {
      dispatch({ type: 'PLAY_TRACK', index: 0 });
    }
  }, [state.isPlaying, state.currentTrackIndex, dispatch]);

  const handleNext = useCallback(() => dispatch({ type: 'NEXT_TRACK' }), [dispatch]);
  const handlePrev = useCallback(() => dispatch({ type: 'PREV_TRACK' }), [dispatch]);

  return (
    <section className="relative py-24 px-6 bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
            <Hand className="w-5 h-5 text-cyan-400" />
            <span className="text-sm text-cyan-400 font-semibold tracking-wider">GESTURE CONTROL</span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: '"Bebas Neue", sans-serif' }}
          >
            HANDS-FREE MUSIC
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Control playback with hand gestures — a live demo of real-time computer vision in the browser.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 md:p-8"
        >
          {/* 5.1 — Activation panel or 5.2 — Camera preview */}
          {!isDetecting ? (
            <ActivationPanel
              onActivate={handleActivate}
              isReady={isReady}
              error={error}
              onRetry={handleActivate}
            />
          ) : (
            <div className="flex flex-col gap-6">
              {/* Now-playing mini-player */}
              <NowPlaying
                track={currentTrack}
                isPlaying={state.isPlaying}
                onPlayPause={handlePlayPause}
                onNext={handleNext}
                onPrev={handlePrev}
              />

              <CameraPreview
                videoRef={videoRef}
                canvasRef={canvasRef}
                isDetecting={isDetecting}
                hasLandmarks={hasLandmarks}
                onStop={stopDetection}
              />

              {/* 5.4 — Status bar */}
              <StatusBar
                lastGesture={lastGesture}
                volume={state.volume}
              />
            </div>
          )}

          {/* 5.3 — Gesture legend — always visible */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-xs text-gray-600 uppercase tracking-wider mb-3">Supported Gestures</p>
            <GestureLegend activeGestureName={lastGesture?.name} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GestureControlSection;
