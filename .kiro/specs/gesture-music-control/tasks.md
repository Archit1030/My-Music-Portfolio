# Implementation Plan

- [x] 1. Set up MusicPlayerContext to lift audio state





  - Create `src/context/MusicPlayerContext.jsx` with useReducer managing tracks, currentTrackIndex, isPlaying, volume, playbackRate, and audioRef
  - Implement all actions: NEXT_TRACK, PREV_TRACK, PLAY_TRACK, PAUSE, SET_VOLUME, SET_RATE, SEEK
  - Add a useEffect inside the provider that syncs audioRef.current properties (volume, playbackRate, src, play/pause) whenever state changes
  - Wrap `App.js` content in `<MusicPlayerProvider>`
  - _Requirements: 3.2, 4.2, 5.2, 6.2, 7.2, 8.2_

- [x] 2. Refactor MusicSection to consume MusicPlayerContext





  - [x] 2.1 Remove internal audio state from MusicSection and read from context


    - Replace useState for playingTrack, progress, currentTime, duration, volume with context values
    - Replace internal handlePlayPause, handleSeek with context dispatch calls
    - _Requirements: 3.2, 4.2, 5.2, 6.2_
  - [x] 2.2 Update TrackCard to receive and use context-driven props

    - Ensure play/pause, seek, and progress display still work correctly after refactor
    - _Requirements: 3.2, 4.2_

- [x] 3. Implement gesture classifier





  - [x] 3.1 Create `src/lib/gestureClassifier.js` as a pure module


    - Implement `isFingerExtended(landmarks, fingerIndex)` using tip-vs-PIP Y comparison
    - Implement `classifyPose(landmarks)` returning OPEN_HAND or CLOSED_FIST based on all 5 fingers
    - _Requirements: 7.1, 8.1_
  - [x] 3.2 Add swipe detection with rolling frame buffer

    - Implement `updateFrameBuffer(buffer, landmarks)` maintaining a 10-frame rolling window of fingertip centroids
    - Implement `classifySwipe(buffer, fingerMask)` computing X/Y delta and returning INDEX_SWIPE_RIGHT, INDEX_SWIPE_LEFT, FOUR_FINGER_SWIPE_UP, FOUR_FINGER_SWIPE_DOWN, or null
    - Export main `classifyGesture(results, frameBuffer)` combining pose and swipe classification
    - _Requirements: 3.1, 4.1, 5.1, 6.1_
  - [x] 3.3 Write unit tests for gestureClassifier


    - Test each gesture with synthetic landmark arrays
    - Test boundary conditions (confidence < 0.7, empty results)
    - _Requirements: 3.1, 4.1, 5.1, 6.1, 7.1, 8.1_

- [x] 4. Implement useGestureDetection hook





  - [x] 4.1 Create `src/hooks/useGestureDetection.js` with MediaPipe Hands initialization


    - Dynamically load `@mediapipe/hands` via CDN script injection (avoids webpack bundling issues)
    - Initialize Hands model with maxNumHands: 1, minDetectionConfidence: 0.7
    - Expose videoRef, canvasRef, isReady, isDetecting, error, startDetection, stopDetection
    - _Requirements: 2.1, 2.3_
  - [x] 4.2 Add camera stream management

    - Implement startDetection to call getUserMedia and attach stream to videoRef
    - Implement stopDetection to stop all tracks and clean up
    - Handle permission denied error and surface via error state
    - _Requirements: 2.1, 1.4_
  - [x] 4.3 Wire detection loop and gesture dispatch

    - Run requestAnimationFrame loop calling hands.send on each frame
    - Pass results through classifyGesture with the rolling frame buffer
    - Enforce per-gesture cooldown map before calling onGesture callback
    - Draw landmarks on canvasRef overlay
    - _Requirements: 2.2, 2.4, 2.5, 9.1_

- [x] 5. Build GestureControlSection component





  - [x] 5.1 Create `src/components/GestureControlSection.jsx` with activation panel


    - Render "Activate Gesture Control" button when camera is inactive
    - Show camera permission error message with retry button when error state is set
    - Style consistent with existing dark/cyan portfolio aesthetic
    - _Requirements: 1.1, 1.3, 1.4_
  - [x] 5.2 Add camera preview with landmark canvas overlay

    - Render mirrored `<video>` element (CSS transform: scaleX(-1)) with `<canvas>` absolutely positioned on top
    - Show "No hand detected" status when isDetecting is true but no landmarks are present
    - _Requirements: 2.2, 2.4_
  - [x] 5.3 Add gesture legend panel

    - Render all 6 gestures with icon, gesture name, and action label
    - Highlight the active gesture entry for the duration of its cooldown using lastGesture state
    - _Requirements: 1.2, 9.2_
  - [x] 5.4 Add status bar with live indicators

    - Display last detected gesture name and triggered action for ≥800ms
    - Display current volume as percentage and playback rate as multiplier, reading from MusicPlayerContext
    - _Requirements: 9.1, 9.3_

- [x] 6. Wire gesture commands to MusicPlayerContext and integrate into App





  - Implement onGesture callback in GestureControlSection that maps gesture names to context dispatch actions
  - Add `<GestureControlSection />` to App.js between MusicSection and AboutSection wrapped in a motion.div
  - Install `@mediapipe/hands` and `@mediapipe/camera_utils` packages
  - _Requirements: 1.1, 3.1, 4.1, 5.1, 6.1, 7.1, 8.1_
