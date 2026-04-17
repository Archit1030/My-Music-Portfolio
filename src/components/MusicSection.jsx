import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Music2, Clock, Activity } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import TiltCard from './TiltCard';
import { useMusicPlayer } from '../context/MusicPlayerContext';

const formatTime = (seconds) => {
  if (isNaN(seconds) || !seconds) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const TrackCard = ({ track, trackIndex, isPlaying, progress, currentTime, duration, onPlayPause, onSeek }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSeek = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    onSeek(ratio);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <TiltCard className="interactive">
        <Card
          className="group relative overflow-hidden bg-gradient-to-br from-gray-900 to-black border-gray-800 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Background Image */}
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
            <img src={track.coverArt} alt={track.title} className="w-full h-full object-cover" />
          </div>

          {/* Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-orange-500/10" />
          </div>

          <div className="relative p-6">
            <div className="flex items-start gap-4">
              {/* Album Art */}
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 shadow-lg shadow-cyan-500/20">
                <img src={track.coverArt} alt={track.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-orange-500/20" />
              </div>

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-white mb-1 truncate group-hover:text-cyan-400 transition-colors">
                  {track.title}
                </h3>
                <p className="text-sm text-gray-400 mb-2">{track.genre}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {track.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    {track.bpm} BPM
                  </span>
                </div>
              </div>

              {/* Play Button */}
              <Button
                onClick={(e) => { e.stopPropagation(); onPlayPause(); }}
                size="icon"
                className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 transition-all duration-300 interactive"
              >
                {isPlaying ? <Pause className="w-5 h-5" fill="white" /> : <Play className="w-5 h-5 ml-0.5" fill="white" />}
              </Button>
            </div>

            {/* Progress Bar — always visible when playing */}
            <AnimatePresence>
              {isPlaying && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Seekbar */}
                  <div
                    className="relative w-full h-2 bg-gray-700 rounded-full cursor-pointer group/seek"
                    onClick={handleSeek}
                  >
                    {/* Glowing fill */}
                    <motion.div
                      className="absolute left-0 top-0 h-full rounded-full"
                      style={{
                        width: `${progress * 100}%`,
                        background: 'linear-gradient(90deg, #06b6d4, #3b82f6, #06b6d4)',
                        backgroundSize: '200% 100%',
                        boxShadow: '0 0 8px rgba(6,182,212,0.8), 0 0 16px rgba(6,182,212,0.4)',
                      }}
                      animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Pulse dot at the tip */}
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2"
                      style={{ left: `calc(${progress * 100}% - 8px)` }}
                    >
                      {/* Outer ripple ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-cyan-400"
                        animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                        style={{ width: 16, height: 16 }}
                      />
                      {/* Inner core */}
                      <motion.div
                        className="relative w-4 h-4 rounded-full"
                        style={{ background: 'linear-gradient(135deg, #06b6d4, #818cf8)', boxShadow: '0 0 10px rgba(6,182,212,0.9)' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      >
                        {/* Spinning arc */}
                        <motion.div
                          className="absolute inset-0.5 rounded-full border-2 border-transparent border-t-white"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                      </motion.div>
                    </motion.div>
                  </div>
                  {/* Time */}
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expanded Details */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-gray-800"
                >
                  <p className="text-sm text-gray-400 mb-3">{track.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Released: {track.releaseDate}</span>
                    {/* Waveform animation */}
                    <div className="flex items-end gap-0.5 h-8">
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-gradient-to-t from-cyan-500 to-orange-500 rounded-full"
                          animate={{ height: isPlaying ? `${Math.random() * 100}%` : '20%' }}
                          transition={{ duration: 0.3, repeat: isPlaying ? Infinity : 0, repeatType: 'reverse' }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </TiltCard>
    </motion.div>
  );
};

const MusicSection = () => {
  const { state, dispatch, audioRef } = useMusicPlayer();
  const { tracks, currentTrackIndex, isPlaying, progress, currentTime, duration } = state;

  const handlePlayPause = (trackIndex) => {
    if (currentTrackIndex === trackIndex && isPlaying) {
      dispatch({ type: 'PAUSE' });
    } else {
      dispatch({ type: 'PLAY_TRACK', index: trackIndex });
    }
  };

  const handleSeek = (ratio) => {
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = ratio * audioRef.current.duration;
    }
  };

  return (
    <section className="relative min-h-screen py-24 px-6 bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
            <Music2 className="w-5 h-5 text-cyan-400" />
            <span className="text-sm text-cyan-400 font-semibold tracking-wider">LATEST TRACKS</span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: '"Bebas Neue", sans-serif' }}
          >
            MUSIC
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore my latest productions spanning electronic, trap, hip hop and indie
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((track, index) => (
            <TrackCard
              key={track.id}
              track={track}
              trackIndex={index}
              isPlaying={currentTrackIndex === index && isPlaying}
              progress={currentTrackIndex === index ? progress : 0}
              currentTime={currentTrackIndex === index ? currentTime : 0}
              duration={currentTrackIndex === index ? duration : 0}
              onPlayPause={() => handlePlayPause(index)}
              onSeek={handleSeek}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
