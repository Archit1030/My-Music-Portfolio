import React, { createContext, useContext, useReducer, useRef, useEffect } from 'react';
import { tracks } from '../mock';

const MusicPlayerContext = createContext(null);

const initialState = {
  tracks,
  currentTrackIndex: null, // null = nothing selected yet
  isPlaying: false,
  volume: 1.0,
  playbackRate: 1.0,
  progress: 0,       // 0.0 – 1.0
  currentTime: 0,    // seconds
  duration: 0,       // seconds
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function reducer(state, action) {
  switch (action.type) {
    case 'NEXT_TRACK': {
      const next =
        state.currentTrackIndex === null
          ? 0
          : (state.currentTrackIndex + 1) % state.tracks.length;
      return { ...state, currentTrackIndex: next, isPlaying: true };
    }
    case 'PREV_TRACK': {
      const prev =
        state.currentTrackIndex === null
          ? state.tracks.length - 1
          : (state.currentTrackIndex - 1 + state.tracks.length) % state.tracks.length;
      return { ...state, currentTrackIndex: prev, isPlaying: true };
    }
    case 'PLAY_TRACK':
      return { ...state, currentTrackIndex: action.index, isPlaying: true };
    case 'PAUSE':
      return { ...state, isPlaying: false };
    case 'SET_VOLUME':
      return { ...state, volume: clamp(action.value, 0.0, 1.0) };
    case 'SET_RATE':
      return { ...state, playbackRate: clamp(action.value, 0.25, 2.0) };
    case 'SET_PROGRESS':
      return { ...state, progress: action.progress, currentTime: action.currentTime, duration: action.duration };
    case 'SET_DURATION':
      return { ...state, duration: action.value };
    case 'TRACK_ENDED':
      return { ...state, isPlaying: false, progress: 0, currentTime: 0 };
    case 'SEEK':
      // Seek is handled imperatively via audioRef; no state change needed
      return state;
    default:
      return state;
  }
}

export function MusicPlayerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const audioRef = useRef(null);

  // Sync audioRef with state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = state.volume;
    audio.playbackRate = state.playbackRate;

    if (state.currentTrackIndex === null) return;

    const track = state.tracks[state.currentTrackIndex];
    if (audio.src !== window.location.origin + track.audioUrl) {
      audio.src = track.audioUrl;
      audio.load();
    }

    if (state.isPlaying) {
      const playPromise = audio.play();
      if (playPromise) {
        playPromise.catch(() => {
          dispatch({ type: 'PAUSE' });
        });
      }
    } else {
      audio.pause();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentTrackIndex, state.isPlaying, state.volume, state.playbackRate]);

  // Wire audio events for progress/duration/ended
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      dispatch({
        type: 'SET_PROGRESS',
        progress: audio.duration ? audio.currentTime / audio.duration : 0,
        currentTime: audio.currentTime,
        duration: audio.duration || 0,
      });
    };

    const onLoadedMetadata = () => {
      dispatch({ type: 'SET_DURATION', value: audio.duration });
    };

    const onEnded = () => {
      dispatch({ type: 'TRACK_ENDED' });
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio?.pause();
    };
  }, []);

  return (
    <MusicPlayerContext.Provider value={{ state, dispatch, audioRef }}>
      {/* Single shared audio element */}
      <audio ref={audioRef} />
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const ctx = useContext(MusicPlayerContext);
  if (!ctx) throw new Error('useMusicPlayer must be used within MusicPlayerProvider');
  return ctx;
}
