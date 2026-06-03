'use client';

import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

export const FloatingOrb: React.FC = () => {
  const mouse = useMousePosition();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tracking coordinates
  const springConfig = { damping: 50, stiffness: 160, mass: 1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    // Position orb center to match cursor (offset by radius)
    x.set(mouse.x - 200);
    y.set(mouse.y - 200);
  }, [mouse, x, y]);

  return (
    <motion.div
      className="fixed pointer-events-none z-0 hidden md:block"
      style={{
        left: springX,
        top: springY,
        width: 400,
        height: 400,
      }}
    >
      {/* Outer Glow Orb */}
      <div className="w-full h-full rounded-full bg-gradient-to-tr from-primary-accent via-emerald-500 to-[#00FFB2] opacity-[0.09] blur-[80px]" />
    </motion.div>
  );
};

export default FloatingOrb;
