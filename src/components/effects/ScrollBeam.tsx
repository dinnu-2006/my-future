'use client';

import React from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export const ScrollBeam: React.FC = () => {
  const scrollProgress = useScrollProgress();

  return (
    <div className="fixed left-0 top-0 bottom-0 w-[2px] bg-white/[0.02] z-40 hidden md:block">
      {/* Scroll indicator beam */}
      <div
        className="w-full bg-gradient-to-b from-[#00FFB2] via-primary-accent to-[#B7FF62] shadow-[0_0_12px_#A7FF4A,0_0_20px_rgba(167,255,74,0.5)] origin-top transition-all duration-75"
        style={{ height: `${scrollProgress * 100}%` }}
      />
    </div>
  );
};

export default ScrollBeam;
