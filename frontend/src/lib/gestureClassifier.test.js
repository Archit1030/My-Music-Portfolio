import {
  isFingerExtended,
  classifyPose,
  updateFrameBuffer,
  classifySwipe,
  classifyGesture,
} from './gestureClassifier';

// ─── Landmark helpers ─────────────────────────────────────────────────────────

/**
 * Build a 21-landmark array. All points default to {x:0.5, y:0.5, z:0}.
 * Pass overrides as { [index]: { x, y, z } }.
 */
function makeLandmarks(overrides = {}) {
  const lm = Array.from({ length: 21 }, () => ({ x: 0.5, y: 0.5, z: 0 }));
  for (const [idx, val] of Object.entries(overrides)) {
    lm[Number(idx)] = { ...lm[Number(idx)], ...val };
  }
  return lm;
}

// Finger tip/pip indices: [tip, pip]
// thumb=4/3, index=8/7, middle=12/11, ring=16/15, pinky=20/19
function extendFinger(lm, tipIdx, pipIdx) {
  lm[tipIdx] = { ...lm[tipIdx], y: 0.2 }; // tip high (extended)
  lm[pipIdx] = { ...lm[pipIdx], y: 0.4 };
  return lm;
}

function curlFinger(lm, tipIdx, pipIdx) {
  lm[tipIdx] = { ...lm[tipIdx], y: 0.6 }; // tip low (curled)
  lm[pipIdx] = { ...lm[pipIdx], y: 0.4 };
  return lm;
}

function makeOpenHand() {
  let lm = makeLandmarks();
  // Extend all 5 fingers: [tip, pip] pairs
  [[4, 3], [8, 7], [12, 11], [16, 15], [20, 19]].forEach(([t, p]) => extendFinger(lm, t, p));
  return lm;
}

function makeClosedFist() {
  let lm = makeLandmarks();
  [[4, 3], [8, 7], [12, 11], [16, 15], [20, 19]].forEach(([t, p]) => curlFinger(lm, t, p));
  return lm;
}

function makeIndexOnly() {
  let lm = makeLandmarks();
  // Only index extended
  extendFinger(lm, 8, 7);
  curlFinger(lm, 4, 3);
  curlFinger(lm, 12, 11);
  curlFinger(lm, 16, 15);
  curlFinger(lm, 20, 19);
  return lm;
}

function makeFourFingers() {
  let lm = makeLandmarks();
  // index, middle, ring, pinky extended; thumb curled
  extendFinger(lm, 8, 7);
  extendFinger(lm, 12, 11);
  extendFinger(lm, 16, 15);
  extendFinger(lm, 20, 19);
  curlFinger(lm, 4, 3);
  return lm;
}

/** Build a full 10-frame buffer simulating a swipe in the given direction */
function makeSwipeBuffer(direction) {
  const frames = [];
  for (let i = 0; i < 10; i++) {
    const t = i / 9; // 0 → 1
    let indexX = 0.5, indexY = 0.5;
    let fourX = 0.5, fourY = 0.5;

    if (direction === 'right') indexX = 0.2 + t * 0.4;       // 0.2 → 0.6 (dx=+0.4)
    if (direction === 'left')  indexX = 0.7 - t * 0.4;       // 0.7 → 0.3 (dx=-0.4)
    if (direction === 'up')    fourY  = 0.7 - t * 0.4;       // 0.7 → 0.3 (dy=-0.4)
    if (direction === 'down')  fourY  = 0.3 + t * 0.4;       // 0.3 → 0.7 (dy=+0.4)

    frames.push({
      index: { x: indexX, y: indexY },
      fourFinger: { x: fourX, y: fourY },
    });
  }
  return frames;
}

// ─── isFingerExtended ─────────────────────────────────────────────────────────

describe('isFingerExtended', () => {
  test('returns true when tip Y < pip Y (extended)', () => {
    const lm = makeLandmarks({ 8: { y: 0.2 }, 7: { y: 0.4 } });
    expect(isFingerExtended(lm, 1)).toBe(true); // index finger
  });

  test('returns false when tip Y > pip Y (curled)', () => {
    const lm = makeLandmarks({ 8: { y: 0.7 }, 7: { y: 0.4 } });
    expect(isFingerExtended(lm, 1)).toBe(false);
  });
});

// ─── classifyPose ─────────────────────────────────────────────────────────────

describe('classifyPose', () => {
  test('returns OPEN_HAND when all fingers extended', () => {
    expect(classifyPose(makeOpenHand())).toBe('OPEN_HAND');
  });

  test('returns CLOSED_FIST when all fingers curled', () => {
    expect(classifyPose(makeClosedFist())).toBe('CLOSED_FIST');
  });

  test('returns null for partial hand pose', () => {
    expect(classifyPose(makeIndexOnly())).toBeNull();
  });

  test('returns null for empty/invalid landmarks', () => {
    expect(classifyPose(null)).toBeNull();
    expect(classifyPose([])).toBeNull();
  });
});

// ─── classifySwipe ────────────────────────────────────────────────────────────

describe('classifySwipe', () => {
  test('returns INDEX_SWIPE_RIGHT for rightward index movement', () => {
    expect(classifySwipe(makeSwipeBuffer('right'), 'index')).toBe('INDEX_SWIPE_RIGHT');
  });

  test('returns INDEX_SWIPE_LEFT for leftward index movement', () => {
    expect(classifySwipe(makeSwipeBuffer('left'), 'index')).toBe('INDEX_SWIPE_LEFT');
  });

  test('returns FOUR_FINGER_SWIPE_UP for upward four-finger movement', () => {
    expect(classifySwipe(makeSwipeBuffer('up'), 'fourFinger')).toBe('FOUR_FINGER_SWIPE_UP');
  });

  test('returns FOUR_FINGER_SWIPE_DOWN for downward four-finger movement', () => {
    expect(classifySwipe(makeSwipeBuffer('down'), 'fourFinger')).toBe('FOUR_FINGER_SWIPE_DOWN');
  });

  test('returns null when buffer has fewer than 10 frames', () => {
    expect(classifySwipe([{ index: { x: 0.2, y: 0.5 }, fourFinger: { x: 0.5, y: 0.5 } }], 'index')).toBeNull();
  });
});

// ─── classifyGesture ─────────────────────────────────────────────────────────

describe('classifyGesture', () => {
  test('returns null gesture for empty results', () => {
    const { gesture } = classifyGesture(null, []);
    expect(gesture).toBeNull();
  });

  test('returns null gesture when no landmarks present', () => {
    const { gesture } = classifyGesture({ multiHandLandmarks: [] }, []);
    expect(gesture).toBeNull();
  });

  test('detects OPEN_HAND from results', () => {
    const results = { multiHandLandmarks: [makeOpenHand()], multiHandedness: [{ score: 0.95 }] };
    const { gesture } = classifyGesture(results, []);
    expect(gesture).toBe('OPEN_HAND');
  });

  test('detects CLOSED_FIST from results', () => {
    const results = { multiHandLandmarks: [makeClosedFist()], multiHandedness: [{ score: 0.9 }] };
    const { gesture } = classifyGesture(results, []);
    expect(gesture).toBe('CLOSED_FIST');
  });

  test('ignores hand with confidence < 0.7', () => {
    const results = {
      multiHandLandmarks: [makeOpenHand()],
      multiHandedness: [{ score: 0.5 }],
    };
    const { gesture } = classifyGesture(results, []);
    expect(gesture).toBeNull();
  });

  test('detects INDEX_SWIPE_RIGHT after building up frame buffer', () => {
    // Build landmarks where the index tip is at x=0.65 (end of a rightward swipe)
    const lm = makeIndexOnly();
    lm[8] = { ...lm[8], x: 0.65 }; // index tip at right side

    const results = { multiHandLandmarks: [lm], multiHandedness: [{ score: 0.9 }] };

    // Pre-buffer starts at x=0.2 so that after appending the new frame (x≈0.65) the delta > 0.15
    const preBuffer = Array.from({ length: 9 }, (_, i) => ({
      index: { x: 0.2 + (i / 9) * 0.2, y: 0.5 },   // 0.2 → ~0.4
      fourFinger: { x: 0.5, y: 0.5 },
    }));

    const { gesture } = classifyGesture(results, preBuffer);
    expect(gesture).toBe('INDEX_SWIPE_RIGHT');
  });

  test('detects FOUR_FINGER_SWIPE_UP after building up frame buffer', () => {
    const lm = makeFourFingers();
    const results = { multiHandLandmarks: [lm], multiHandedness: [{ score: 0.9 }] };

    const preBuffer = makeSwipeBuffer('up');
    const { gesture } = classifyGesture(results, preBuffer);
    expect(gesture).toBe('FOUR_FINGER_SWIPE_UP');
  });

  test('updatedBuffer grows up to 10 frames', () => {
    const lm = makeOpenHand();
    const results = { multiHandLandmarks: [lm], multiHandedness: [{ score: 0.9 }] };

    let buf = [];
    for (let i = 0; i < 15; i++) {
      const out = classifyGesture(results, buf);
      buf = out.updatedBuffer;
    }
    expect(buf.length).toBe(10);
  });
});
