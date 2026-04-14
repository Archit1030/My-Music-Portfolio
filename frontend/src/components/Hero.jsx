import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

const FloatingShape = ({ delay = 0, duration = 20, size = 100, position, color }) => {
  return (
    <motion.div
      className="absolute"
      style={{
        width: size,
        height: size,
        ...position,
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
      animate={{
        rotateX: [0, 360],
        rotateY: [0, 360],
        rotateZ: [0, 360],
        y: [0, -30, 0]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      <div
        className="w-full h-full"
        style={{
          background: `linear-gradient(135deg, ${color}20, ${color}40)`,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${color}30`,
          borderRadius: '20px',
          boxShadow: `0 20px 60px ${color}20`,
          transform: 'rotateX(45deg) rotateZ(45deg)'
        }}
      />
    </motion.div>
  );
};

const Hero = ({ onEnter }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <motion.div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
      style={{ opacity }}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      {/* Radial Spotlight */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent" />

      {/* 3D Floating Shapes */}
      <FloatingShape 
        delay={0} 
        duration={25} 
        size={200} 
        position={{ top: '10%', left: '10%' }} 
        color="#00f0ff"
      />
      <FloatingShape 
        delay={5} 
        duration={30} 
        size={150} 
        position={{ top: '60%', right: '15%' }} 
        color="#ff6b35"
      />
      <FloatingShape 
        delay={10} 
        duration={28} 
        size={120} 
        position={{ bottom: '20%', left: '20%' }} 
        color="#0ea5e9"
      />

      {/* Main Content */}
      <motion.div 
        className="relative z-10 h-full flex flex-col items-center justify-center px-6"
        style={{ y, scale }}
      >
        <div className="text-center max-w-6xl mx-auto">
          {/* Small Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium tracking-wider backdrop-blur-sm">
              MUSIC PRODUCER & CREATIVE DEVELOPER
            </span>
          </motion.div>

          {/* Main Title with 3D Effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 perspective-1000"
          >
            <h1 
              className="text-8xl md:text-[12rem] font-black tracking-tight leading-none mb-4"
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                background: 'linear-gradient(180deg, #ffffff 0%, #00f0ff 50%, #0ea5e9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 80px rgba(0,240,255,0.3)',
                transform: 'translateZ(0)'
              }}
            >
              KAAGZ
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Crafting immersive soundscapes and building innovative digital experiences
            that push creative boundaries.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={onEnter}
              size="lg"
              className="group relative px-8 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Play className="w-5 h-5" fill="white" />
                Explore Work
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 border-2 border-gray-700 hover:border-cyan-500 bg-transparent hover:bg-cyan-500/10 text-white font-semibold rounded-lg transition-all duration-300"
            >
              View Projects
            </Button>
          </motion.div>

          {/* Stats or Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-500"
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-cyan-400 mb-1">120+</span>
              <span>Tracks Produced</span>
            </div>
            <div className="w-px h-12 bg-gray-800" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-cyan-400 mb-1">5+</span>
              <span>Years Experience</span>
            </div>
            <div className="w-px h-12 bg-gray-800" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-cyan-400 mb-1">30+</span>
              <span>Collaborations</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={onEnter}
          >
            <span className="text-xs text-gray-500 uppercase tracking-wider">Scroll</span>
            <ChevronDown className="w-5 h-5 text-cyan-400" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default Hero;
