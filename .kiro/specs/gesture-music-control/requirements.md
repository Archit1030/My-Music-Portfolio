# Requirements Document

## Introduction

This feature adds a hand gesture control section to the music portfolio website. Using the device camera and MediaPipe Hands (a browser-based computer vision library), the system detects real-time hand gestures and maps them to music playback controls — next track, previous track, volume up, volume down, playback speed increase, and playback speed decrease. The section serves as a live technical skills showcase embedded in the portfolio.

## Glossary

- **GestureController**: The React component that manages the camera feed, gesture detection pipeline, and music control dispatch.
- **MediaPipe Hands**: A browser-compatible ML library that detects 21 hand landmarks from a video stream.
- **Landmark**: A single detected 2D/3D point on the hand (e.g., fingertip, knuckle) returned by MediaPipe Hands.
- **Gesture**: A classified hand movement or pose derived from landmark positions and motion vectors.
- **Index Swipe Left**: A gesture where only the index finger is extended and moves from right to left across the frame.
- **Index Swipe Right**: A gesture where only the index finger is extended and moves from left to right across the frame.
- **Four-Finger Swipe Up**: A gesture where the index, middle, ring, and pinky fingers are extended and move upward.
- **Four-Finger Swipe Down**: A gesture where the index, middle, ring, and pinky fingers are extended and move downward.
- **Open Hand**: A gesture where all five fingers (including thumb) are fully extended and spread.
- **Closed Fist**: A gesture where all five fingers (including thumb) are curled inward toward the palm.
- **MusicSection**: The existing React component that manages audio playback, track list, and playback state.
- **Playback Rate**: The speed multiplier applied to audio playback (e.g., 0.5x, 1.0x, 1.5x, 2.0x).
- **Volume**: The audio output level expressed as a value between 0.0 and 1.0.
- **Gesture Cooldown**: A minimum time interval enforced between consecutive gesture recognitions to prevent repeated triggers.
- **Confidence Score**: A numeric value (0.0–1.0) returned by MediaPipe Hands indicating detection reliability.

---

## Requirements

### Requirement 1

**User Story:** As a portfolio visitor, I want to see a dedicated gesture control section on the website, so that I can understand and interact with the hand gesture music control feature.

#### Acceptance Criteria

1. THE GestureController SHALL render a visible section on the portfolio page containing a camera preview, a gesture legend, and a status indicator.
2. THE GestureController SHALL display a legend listing all six supported gestures alongside their corresponding music actions.
3. WHEN the GestureController section is not active, THE GestureController SHALL display an activation button that requests camera permission when clicked.
4. IF the user denies camera permission, THEN THE GestureController SHALL display an error message explaining that camera access is required and provide a retry button.

---

### Requirement 2

**User Story:** As a portfolio visitor, I want the system to detect my hand in real time from my webcam, so that gestures can be recognized without any additional hardware.

#### Acceptance Criteria

1. WHEN the user activates the GestureController, THE GestureController SHALL initialize the MediaPipe Hands model and begin processing the camera video stream at a minimum of 15 frames per second.
2. WHILE the camera stream is active, THE GestureController SHALL render a mirrored video preview with detected hand landmarks overlaid.
3. IF the MediaPipe Hands model fails to load, THEN THE GestureController SHALL display a fallback error message and stop processing.
4. WHILE no hand is detected in the frame, THE GestureController SHALL display a "No hand detected" status message in the UI.
5. THE GestureController SHALL process only hands with a confidence score of 0.7 or above to reduce false positives.

---

### Requirement 3

**User Story:** As a portfolio visitor, I want to skip to the next track by swiping right with my index finger, so that I can navigate music hands-free.

#### Acceptance Criteria

1. WHEN an Index Swipe Right gesture is detected, THE GestureController SHALL dispatch a "next track" command to the MusicSection.
2. WHEN a "next track" command is received, THE MusicSection SHALL begin playback of the track following the currently active track in the track list.
3. WHEN a "next track" command is received and the currently active track is the last track, THE MusicSection SHALL begin playback of the first track in the track list.
4. WHILE a Gesture Cooldown of 1000 milliseconds is active, THE GestureController SHALL ignore any new Index Swipe Right gesture detections.

---

### Requirement 4

**User Story:** As a portfolio visitor, I want to go back to the previous track by swiping left with my index finger, so that I can replay music hands-free.

#### Acceptance Criteria

1. WHEN an Index Swipe Left gesture is detected, THE GestureController SHALL dispatch a "previous track" command to the MusicSection.
2. WHEN a "previous track" command is received, THE MusicSection SHALL begin playback of the track preceding the currently active track in the track list.
3. WHEN a "previous track" command is received and the currently active track is the first track, THE MusicSection SHALL begin playback of the last track in the track list.
4. WHILE a Gesture Cooldown of 1000 milliseconds is active, THE GestureController SHALL ignore any new Index Swipe Left gesture detections.

---

### Requirement 5

**User Story:** As a portfolio visitor, I want to raise the volume by swiping up with all four fingers, so that I can adjust audio output hands-free.

#### Acceptance Criteria

1. WHEN a Four-Finger Swipe Up gesture is detected, THE GestureController SHALL dispatch a "volume up" command to the MusicSection.
2. WHEN a "volume up" command is received, THE MusicSection SHALL increase the current Volume by 0.1, to a maximum of 1.0.
3. WHILE a Gesture Cooldown of 800 milliseconds is active, THE GestureController SHALL ignore any new Four-Finger Swipe Up gesture detections.

---

### Requirement 6

**User Story:** As a portfolio visitor, I want to lower the volume by swiping down with all four fingers, so that I can reduce audio output hands-free.

#### Acceptance Criteria

1. WHEN a Four-Finger Swipe Down gesture is detected, THE GestureController SHALL dispatch a "volume down" command to the MusicSection.
2. WHEN a "volume down" command is received, THE MusicSection SHALL decrease the current Volume by 0.1, to a minimum of 0.0.
3. WHILE a Gesture Cooldown of 800 milliseconds is active, THE GestureController SHALL ignore any new Four-Finger Swipe Down gesture detections.

---

### Requirement 7

**User Story:** As a portfolio visitor, I want to increase the playback speed by opening my hand, so that I can control how fast the music plays hands-free.

#### Acceptance Criteria

1. WHEN an Open Hand gesture is detected, THE GestureController SHALL dispatch a "speed up" command to the MusicSection.
2. WHEN a "speed up" command is received, THE MusicSection SHALL increase the Playback Rate by 0.25, to a maximum of 2.0.
3. WHILE a Gesture Cooldown of 1000 milliseconds is active, THE GestureController SHALL ignore any new Open Hand gesture detections.

---

### Requirement 8

**User Story:** As a portfolio visitor, I want to decrease the playback speed by closing my hand into a fist, so that I can slow down the music hands-free.

#### Acceptance Criteria

1. WHEN a Closed Fist gesture is detected, THE GestureController SHALL dispatch a "speed down" command to the MusicSection.
2. WHEN a "speed down" command is received, THE MusicSection SHALL decrease the Playback Rate by 0.25, to a minimum of 0.25.
3. WHILE a Gesture Cooldown of 1000 milliseconds is active, THE GestureController SHALL ignore any new Closed Fist gesture detections.

---

### Requirement 9

**User Story:** As a portfolio visitor, I want real-time visual feedback when a gesture is recognized, so that I know the system has registered my input.

#### Acceptance Criteria

1. WHEN any gesture is recognized, THE GestureController SHALL display the name of the detected gesture and the triggered action in the status area for a minimum of 800 milliseconds.
2. WHEN any gesture is recognized, THE GestureController SHALL highlight the corresponding entry in the gesture legend for the duration of the Gesture Cooldown.
3. THE GestureController SHALL display the current Volume level and Playback Rate as numeric indicators that update in real time.
