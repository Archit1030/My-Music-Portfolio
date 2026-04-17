const THUMB_TIP = 4;
const THUMB_IP = 3;
const THUMB_MCP = 2;
const INDEX_TIP = 8;
const INDEX_PIP = 6;
const MIDDLE_TIP = 12;
const MIDDLE_PIP = 10;
const RING_TIP = 16;
const RING_PIP = 14;
const PINKY_TIP = 20;
const PINKY_PIP = 18;
const WRIST = 0;

function isFingerExtended(landmarks, tip, pip) {
  return landmarks[tip].y < landmarks[pip].y;
}

function isThumbExtended(landmarks) {
  const dx = Math.abs(landmarks[THUMB_TIP].x - landmarks[THUMB_MCP].x);
  const dxIp = Math.abs(landmarks[THUMB_IP].x - landmarks[THUMB_MCP].x);
  return dx > dxIp * 1.15;
}

// --- Static gesture detection (Open Palm, Fist) ---
let gestureBuffer = [];
const GESTURE_CONFIRM_FRAMES = 4;
let lastReportedGesture = null;
let neutralFrameCount = 0;

export function classifyGesture(landmarks) {
  if (!landmarks || landmarks.length < 21) return null;

  const thumb = isThumbExtended(landmarks);
  const index = isFingerExtended(landmarks, INDEX_TIP, INDEX_PIP);
  const middle = isFingerExtended(landmarks, MIDDLE_TIP, MIDDLE_PIP);
  const ring = isFingerExtended(landmarks, RING_TIP, RING_PIP);
  const pinky = isFingerExtended(landmarks, PINKY_TIP, PINKY_PIP);

  const fingersExtended = [index, middle, ring, pinky].filter(Boolean).length;

  let gesture = null;

  if (thumb && fingersExtended >= 3) {
    gesture = 'OPEN_PALM';
  } else if (fingersExtended === 0 && !thumb) {
    gesture = 'FIST';
  } else if (thumb && fingersExtended === 0) {
    if (landmarks[THUMB_TIP].y < landmarks[THUMB_IP].y - 0.03) {
      gesture = 'THUMBS_UP';
    } else if (landmarks[THUMB_TIP].y > landmarks[THUMB_IP].y + 0.03) {
      gesture = 'THUMBS_DOWN';
    }
  }

  gestureBuffer.push(gesture);
  if (gestureBuffer.length > GESTURE_CONFIRM_FRAMES) {
    gestureBuffer.shift();
  }

  const consistent =
    gestureBuffer.length >= GESTURE_CONFIRM_FRAMES &&
    gestureBuffer.every((g) => g === gesture) &&
    gesture !== null;

  if (consistent) {
    gestureBuffer = [];
    if (gesture !== lastReportedGesture) {
      lastReportedGesture = gesture;
      neutralFrameCount = 0;
      return gesture;
    }
    return null;
  }

  if (gesture === null) {
    neutralFrameCount++;
    if (neutralFrameCount > 8) {
      lastReportedGesture = null;
    }
  } else {
    neutralFrameCount = 0;
  }

  return null;
}

// --- Swipe detection (horizontal movement) ---
let positionHistory = [];
const MAX_HISTORY = 20;
let lastSwipeTime = 0;

export function detectSwipe(landmarks) {
  if (!landmarks || landmarks.length < 21) return null;

  const now = Date.now();
  const wristX = landmarks[WRIST].x;

  positionHistory.push({ x: wristX, time: now });

  while (positionHistory.length > MAX_HISTORY) {
    positionHistory.shift();
  }

  if (positionHistory.length < 8) return null;
  if (now - lastSwipeTime < 1500) return null;

  const recent = positionHistory.slice(-8);
  const xDelta = recent[recent.length - 1].x - recent[0].x;
  const timeDelta = recent[recent.length - 1].time - recent[0].time;

  if (timeDelta > 600) return null;

  if (Math.abs(xDelta) > 0.12) {
    positionHistory = [];
    lastSwipeTime = now;
    return xDelta > 0 ? 'SWIPE_LEFT' : 'SWIPE_RIGHT';
  }

  return null;
}

export function resetSwipeHistory() {
  positionHistory = [];
  lastSwipeTime = 0;
}
