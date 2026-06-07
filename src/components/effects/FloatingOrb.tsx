'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

export const FloatingOrb: React.FC = () => {
  const mouse = useMousePosition();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animFrame = requestAnimationFrame(() => {
      setReducedMotion(mediaQuery.matches);
    });
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  // Smooth springs for tracking coordinates
  const springConfig = { damping: 50, stiffness: 160, mass: 1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    if (reducedMotion) {
      if (typeof window !== 'undefined') {
        x.set(window.innerWidth / 2 - 200);
        y.set(window.innerHeight / 2 - 200);
      }
      return;
    }
    // Position orb center to match cursor (offset by radius)
    x.set(mouse.x - 200);
    y.set(mouse.y - 200);
  }, [mouse, x, y, reducedMotion]);

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
      <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#724B39] via-[#8c6d1f]/30 to-[#CF9D7B] opacity-[0.06] blur-[100px]" />
    </motion.div>
  );
};

export default FloatingOrb;
