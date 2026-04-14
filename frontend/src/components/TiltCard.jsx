import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const TiltCard = ({ children, className }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * -10;
    const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);

    // Glow position
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      className={`relative ${className}`}
    >
      {/* Glow effect that follows cursor */}
      <div
        className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-300 opacity-0 hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(0, 240, 255, 0.15), transparent 40%)`
        }}
      />
      {children}
    </motion.div>
  );
};

export default TiltCard;
