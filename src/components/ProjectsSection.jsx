import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Youtube } from 'lucide-react';

const ProjectsSection = () => {
  const [playing, setPlaying] = useState(false);
  const videoId = 'VrZNvGxGXd4';

  return (
    <section className="relative min-h-screen py-24 px-6 bg-black">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(0,240,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="relative max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
            <Youtube className="w-5 h-5 text-cyan-400" />
            <span className="text-sm text-cyan-400 font-semibold tracking-wider">MUSIC VIDEO</span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: '"Bebas Neue", sans-serif' }}
          >
            WATCH
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The official music video — visuals to match the sound
          </p>
        </motion.div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-cyan-500/10"
          style={{ aspectRatio: '16/9' }}
        >
          {!playing ? (
            /* Thumbnail with play overlay */
            <div
              className="relative w-full h-full cursor-pointer group"
              onClick={() => setPlaying(true)}
            >
              <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Music Video Thumbnail"
                className="w-full h-full object-cover"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />

              {/* Glow ring + play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Ripple rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-cyan-500/30"
                    animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-cyan-500/20"
                    animate={{ scale: [1, 2.4], opacity: [0.4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
                  />
                  {/* Play circle */}
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </motion.div>
              </div>
            </div>
          ) : (
            /* Actual YouTube embed */
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title="Music Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </motion.div>

        {/* YouTube link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-full text-gray-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300"
          >
            <Youtube className="w-5 h-5" />
            <span>Watch on YouTube</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
