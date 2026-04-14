import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import { Button } from './ui/button';
import GlitchText from './GlitchText';
import MagneticButton from './MagneticButton';
import GenerativeBackground from './GenerativeBackground';

const Hero = ({ onEnter }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      className="relative h-screen w-full overflow-hidden bg-black"
      style={{ opacity, scale }}
    >
      {/* Noise/Grain Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'3.5\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px'
        }}
      />

      {/* Generative Canvas Background */}
      <GenerativeBackground />

      {/* Massive Gradient Orbs with Parallax */}
      <motion.div 
        className="absolute top-0 left-0 w-[800px] h-[800px] bg-cyan-500/30 rounded-full blur-[120px]"
        animate={{
          x: mousePosition.x * 2,
          y: mousePosition.y * 2,
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          x: { type: 'spring', stiffness: 50 },
          y: { type: 'spring', stiffness: 50 },
          scale: { duration: 4, repeat: Infinity },
          opacity: { duration: 3, repeat: Infinity }
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-orange-500/30 rounded-full blur-[120px]"
        animate={{
          x: -mousePosition.x * 2,
          y: -mousePosition.y * 2,
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          x: { type: 'spring', stiffness: 50 },
          y: { type: 'spring', stiffness: 50 },
          scale: { duration: 5, repeat: Infinity },
          opacity: { duration: 4, repeat: Infinity }
        }}
      />

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/40 to-black/80 pointer-events-none" />

      {/* Content Container with Parallax */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-center"
          style={{
            transform: `translateY(${mousePosition.y}px)`
          }}
        >
          {/* Experimental Title with Glitch Effect */}
          <motion.div
            className="mb-6"
            animate={{
              y: [0, -10, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <GlitchText
              text="KAAGZ"
              className="text-[12rem] md:text-[16rem] font-black tracking-tighter leading-none"
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                background: 'linear-gradient(135deg, #00f0ff 0%, #ff6b35 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 60px rgba(0,240,255,0.6))'
              }}
            />
          </motion.div>

          {/* Animated Tagline with Letter Spacing Animation */}
          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.2em' }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="mb-16"
          >
            <p
              className="text-2xl md:text-3xl text-gray-300 tracking-[0.2em] uppercase"
              style={{ fontFamily: '"Exo 2", sans-serif' }}
            >
              <span className="inline-block">
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-cyan-400"
                >
                  Music Producer
                </motion.span>
              </span>
              <span className="mx-4 text-cyan-400">×</span>
              <span className="inline-block">
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="text-orange-400"
                >
                  Creative Developer
                </motion.span>
              </span>
            </p>
          </motion.div>

          {/* Magnetic CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2, type: 'spring', stiffness: 200 }}
          >
            <MagneticButton
              onClick={onEnter}
              className="inline-block"
            >
              <Button
                size="lg"
                className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-16 py-8 text-xl font-bold rounded-full shadow-[0_0_30px_rgba(0,240,255,0.5)] hover:shadow-[0_0_50px_rgba(0,240,255,0.8)] transition-all duration-300 interactive overflow-hidden"
              >
                {/* Animated background shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-200%', '200%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  <Play className="w-7 h-7 group-hover:scale-125 transition-transform" fill="white" />
                  <span className="tracking-wider">ENTER EXPERIENCE</span>
                </span>
              </Button>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Experimental Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 15, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-[2px] h-16 bg-gradient-to-b from-transparent via-cyan-400 to-transparent" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 border-2 border-cyan-400 rounded-full flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-cyan-400 rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to transparent pointer-events-none" />
    </motion.div>
  );
};

export default Hero;
