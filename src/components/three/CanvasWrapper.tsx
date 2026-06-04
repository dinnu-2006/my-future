'use client';

import React from 'react';

export const CanvasWrapper: React.FC = () => {
  return (
    <div className="relative w-[280px] md:w-[360px] h-[280px] md:h-[360px] flex items-center justify-center pointer-events-auto">
      
      {/* Outer Holographic Orbit Rings */}
      <div className="absolute inset-0 rounded-full border border-dashed border-primary-accent/15 animate-spin" style={{ animationDuration: '40s' }} />
      <div className="absolute -inset-4 rounded-full border border-dashed border-[#00FFB2]/10 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
      
      {/* Rotating HUD compass ticks */}
      <div className="absolute -inset-8 rounded-full border border-white/5 pointer-events-none animate-pulse" />
      
      {/* Corner Bracket decorations */}
      <div className="absolute -top-4 -left-4 w-6 h-6 border-t border-l border-primary-accent/30 rounded-tl" />
      <div className="absolute -top-4 -right-4 w-6 h-6 border-t border-r border-primary-accent/30 rounded-tr" />
      <div className="absolute -bottom-4 -left-4 w-6 h-6 border-b border-l border-primary-accent/30 rounded-bl" />
      <div className="absolute -bottom-4 -right-4 w-6 h-6 border-b border-r border-primary-accent/30 rounded-br" />

      {/* Cyber Frame Container */}
      <div className="relative w-[230px] md:w-[300px] h-[230px] md:h-[300px] rounded-full p-1 bg-gradient-to-tr from-[#00FFB2] via-primary-accent to-[#38BDF8] shadow-[0_0_35px_rgba(167,255,74,0.12)] overflow-hidden group">
        
        {/* Inner black border ring */}
        <div className="relative w-full h-full rounded-full bg-[#030712] overflow-hidden flex items-center justify-center">
          
          {/* Faint Tech Grid Inside */}
          <div className="absolute inset-0 grid-bg opacity-[0.15] z-10 pointer-events-none" />
          
          {/* User Photo */}
          <img
            src="/profile.jpg"
            alt="Dinesh P"
            className="w-full h-full object-cover transition-all duration-500 scale-105 group-hover:scale-100 group-hover:brightness-110 z-0"
            onError={(e) => {
              // Fallback to a futuristic SVG avatar if the image doesn't exist yet
              e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'><circle cx='50' cy='35' r='18' fill='%23A7FF4A' opacity='0.75'/><path d='M20 80 C 20 55, 80 55, 80 80' fill='%23A7FF4A' opacity='0.75'/><circle cx='50' cy='50' r='48' stroke='%23A7FF4A' stroke-width='2' stroke-dasharray='4,4'/></svg>";
            }}
          />

          {/* Gliding Digital Scanner Laser Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-accent to-transparent opacity-70 animate-scan pointer-events-none z-20" />
          
          {/* Inner focus target circle */}
          <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none z-10" />
        </div>
      </div>
      
      {/* Floating telemetry metrics beside the frame */}
      <div className="absolute -right-16 top-1/4 font-mono text-[7px] text-text-muted flex flex-col gap-0.5 select-none pointer-events-none hidden xl:flex">
        <span>LOC: Chennai, IN</span>
        <span>SYS_STATUS: ONLINE</span>
        <span>SYS_HEALTH: 100%</span>
      </div>

      <div className="absolute -left-16 bottom-1/4 font-mono text-[7px] text-text-muted flex flex-col gap-0.5 select-none pointer-events-none hidden xl:flex">
        <span>COGNITIVE_NET: ACT</span>
        <span>USER: DINESH_P</span>
        <span>INTEGRATION: TRUE</span>
      </div>
    </div>
  );
};

export default CanvasWrapper;
