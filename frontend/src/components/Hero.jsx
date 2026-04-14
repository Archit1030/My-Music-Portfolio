import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Button } from './ui/button';

const Hero = ({ onEnter }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Animated CSS Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
              transform: 'perspective(500px) rotateX(60deg)',
              transformOrigin: 'center center'
            }}
          />
        </div>

        {/* Floating Particles CSS */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 2 === 0 ? '#00f0ff' : '#ff6b35',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 10px ${i % 2 === 0 ? '#00f0ff' : '#ff6b35'}`
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center"
        >
          {/* Artist Name */}
          <motion.h1
            className="text-8xl md:text-9xl font-black tracking-tighter mb-4"
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              background: 'linear-gradient(135deg, #00f0ff 0%, #ff6b35 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 80px rgba(0,240,255,0.5)'
            }}
            animate={{
              textShadow: [
                '0 0 80px rgba(0,240,255,0.5)',
                '0 0 100px rgba(255,107,53,0.5)',
                '0 0 80px rgba(0,240,255,0.5)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            KAAGZ
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 tracking-wide"
            style={{ fontFamily: '"Exo 2", sans-serif' }}
          >
            Music Producer <span className="text-cyan-400">×</span> Creative Developer
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <Button
              onClick={onEnter}
              size="lg"
              className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-12 py-6 text-lg font-bold rounded-full shadow-lg shadow-cyan-500/50 hover:shadow-cyan-400/70 transition-all duration-300 interactive"
            >
              <Play className="w-6 h-6 mr-2 inline-block group-hover:scale-110 transition-transform" />
              ENTER EXPERIENCE
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
