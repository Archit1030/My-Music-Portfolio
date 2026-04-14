import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GlitchText = ({ text, className }) => {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block">
      {/* Main text */}
      <h1 className={className}>
        {text}
      </h1>

      {/* Glitch layers */}
      {glitchActive && (
        <>
          <motion.h1
            className={`${className} absolute top-0 left-0`}
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
              color: '#00f0ff',
              textShadow: '-2px 0 #ff00de'
            }}
            animate={{
              x: [-2, 2, -2, 2, 0],
              y: [0, -1, 1, 0, 0]
            }}
            transition={{ duration: 0.2 }}
          >
            {text}
          </motion.h1>
          <motion.h1
            className={`${className} absolute top-0 left-0`}
            style={{
              clipPath: 'polygon(0 45%, 100% 45%, 100% 100%, 0 100%)',
              color: '#ff6b35',
              textShadow: '2px 0 #00f0ff'
            }}
            animate={{
              x: [2, -2, 2, -2, 0],
              y: [0, 1, -1, 0, 0]
            }}
            transition={{ duration: 0.2 }}
          >
            {text}
          </motion.h1>
        </>
      )}
    </div>
  );
};

export default GlitchText;
