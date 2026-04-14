import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Music2, Clock, Activity } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { tracks } from '../mock';
import TiltCard from './TiltCard';

const TrackCard = ({ track, isPlaying, onPlayPause }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
            <img
              src={track.coverArt}
              alt={track.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-orange-500/10" />
          </div>

        <div className="relative p-6">
          <div className="flex items-start gap-4">
            {/* Album Art */}
            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 shadow-lg shadow-cyan-500/20">
              <img
                src={track.coverArt}
                alt={track.title}
                className="w-full h-full object-cover"
              />
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
              onClick={(e) => {
                e.stopPropagation();
                onPlayPause(track.id);
              }}
              size="icon"
              className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 transition-all duration-300 interactive"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" fill="white" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" fill="white" />
              )}
            </Button>
          </div>

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
                  {/* Waveform Placeholder */}
                  <div className="flex items-end gap-0.5 h-8">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-gradient-to-t from-cyan-500 to-orange-500 rounded-full"
                        animate={{
                          height: isPlaying ? `${Math.random() * 100}%` : '20%'
                        }}
                        transition={{
                          duration: 0.3,
                          repeat: isPlaying ? Infinity : 0,
                          repeatType: 'reverse'
                        }}
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
  const [playingTrack, setPlayingTrack] = useState(null);

  const handlePlayPause = (trackId) => {
    setPlayingTrack(playingTrack === trackId ? null : trackId);
    // Note: In production, this would trigger actual audio playback
    console.log('Play/Pause track:', trackId);
  };

  return (
    <section className="relative min-h-screen py-24 px-6 bg-black">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
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
            Explore my latest productions spanning electronic, trap, and experimental soundscapes
          </p>
        </motion.div>

        {/* Track Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              isPlaying={playingTrack === track.id}
              onPlayPause={handlePlayPause}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
