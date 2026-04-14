# 🎵 Adding Real Audio Files to Your Portfolio

This guide explains how to integrate your actual music tracks into the portfolio.

## Quick Start

### 1. Prepare Your Audio Files

**Recommended Format**: MP3 (128-192 kbps for web optimization)

```bash
# Create audio directory
mkdir -p /app/frontend/public/audio

# Copy your audio files here
# Example:
# /app/frontend/public/audio/neon-dreams.mp3
# /app/frontend/public/audio/trap-city.mp3
# etc.
```

### 2. Update Mock Data

Edit `/app/frontend/src/mock.js` and update the `audioUrl` field:

```javascript
export const tracks = [
  {
    id: 1,
    title: "Neon Dreams",
    genre: "Electronic/EDM",
    duration: "3:42",
    bpm: 128,
    releaseDate: "2024",
    coverArt: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
    audioUrl: "/audio/neon-dreams.mp3",  // ← UPDATE THIS
    description: "High-energy electronic track with pulsing synths"
  },
  // ... update all tracks
];
```

### 3. Implement Audio Playback

Update `/app/frontend/src/components/MusicSection.jsx`:

```javascript
import React, { useState, useRef, useEffect } from 'react';

const MusicSection = () => {
  const [playingTrack, setPlayingTrack] = useState(null);
  const audioRef = useRef(null);

  const handlePlayPause = (trackId, audioUrl) => {
    if (!audioUrl) {
      console.log('No audio file available');
      return;
    }

    if (playingTrack === trackId) {
      // Pause current track
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingTrack(null);
    } else {
      // Stop previous track if playing
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      // Play new track
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play();
      setPlayingTrack(trackId);
      
      // Reset when track ends
      audioRef.current.addEventListener('ended', () => {
        setPlayingTrack(null);
      });
    }
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // ... rest of component
};
```

### 4. Update TrackCard Component

Modify the play button to pass audioUrl:

```javascript
<Button
  onClick={(e) => {
    e.stopPropagation();
    onPlayPause(track.id, track.audioUrl); // ← Add audioUrl
  }}
  // ... rest of button props
>
```

## Advanced: Web Audio API Visualization

For real-time audio visualization:

```javascript
const [audioContext, setAudioContext] = useState(null);
const [analyser, setAnalyser] = useState(null);
const animationRef = useRef(null);

const setupAudioAnalyzer = (audioElement) => {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const analyzerNode = context.createAnalyser();
  const source = context.createMediaElementSource(audioElement);
  
  source.connect(analyzerNode);
  analyzerNode.connect(context.destination);
  analyzerNode.fftSize = 256;
  
  setAudioContext(context);
  setAnalyser(analyzerNode);
  
  return analyzerNode;
};

const visualize = () => {
  if (!analyser) return;
  
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  
  const draw = () => {
    animationRef.current = requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
    
    // Use dataArray to drive waveform animations
    // Update waveform component heights based on frequency data
  };
  
  draw();
};
```

## Example File Structure

```
/app/frontend/public/
└── audio/
    ├── neon-dreams.mp3
    ├── trap-city.mp3
    ├── cyber-pulse.mp3
    ├── urban-nights.mp3
    ├── hyperdrive.mp3
    └── midnight-run.mp3
```

## Tips

1. **File Size**: Keep files under 10MB for fast loading
2. **Format**: Use MP3 for best browser compatibility
3. **Bitrate**: 128-192 kbps is optimal for web
4. **Preload**: Consider preloading the first track
5. **Error Handling**: Add fallbacks for unsupported formats

## Troubleshooting

**Audio not playing?**
- Check browser console for errors
- Verify file path is correct
- Ensure file format is supported (MP3, WAV, OGG)
- Check browser autoplay policies

**Visualizations not working?**
- User must interact with page before Audio Context can be created
- Make sure Web Audio API is connected properly
- Check browser compatibility

---

Need help? The audio playback structure is ready - just add your files and update the audioUrl paths!
