'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Cpu, Activity } from 'lucide-react';

export const CanvasWrapper: React.FC = () => {
  // Mouse tracking for 3D parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tracking coordinates (reduces stutter and enables 60fps transitions)
  const springConfig = { damping: 35, stiffness: 90, mass: 1.0 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    // Normalized values between -1 and 1
    const x = (e.clientX - rect.left - width / 2) / (width / 2);
    const y = (e.clientY - rect.top - height / 2) / (height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Parallax layers transform values
  // Rotate the main card slightly based on mouse position
  const rotateX = useTransform(smoothMouseY, [-1, 1], [4, -4]);
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-4, 4]);
  
  // Ambient backlight displacement (max 8px movement)
  const lightX = useTransform(smoothMouseX, [-1, 1], [-8, 8]);
  const lightY = useTransform(smoothMouseY, [-1, 1], [-8, 8]);

  // Floating data card offsets (max 6px / 5px / 4px movement)
  const card1X = useTransform(smoothMouseX, [-1, 1], [6, -6]);
  const card1Y = useTransform(smoothMouseY, [-1, 1], [6, -6]);
  
  const card2X = useTransform(smoothMouseX, [-1, 1], [-5, 5]);
  const card2Y = useTransform(smoothMouseY, [-1, 1], [-5, 5]);

  const card3X = useTransform(smoothMouseX, [-1, 1], [4, -4]);
  const card3Y = useTransform(smoothMouseY, [-1, 1], [-4, 4]);

  // The custom asymmetrical shape polygon coordinates (used for clip-path)
  // Top-left beveled, sharp top-right, large bottom-right bevel, small bottom-left bevel
  const clipPolygon = "polygon(30px 0%, 100% 0%, 100% calc(100% - 50px), calc(100% - 50px) 100%, 18px 100%, 0% calc(100% - 18px), 0% 30px)";
  // Slightly inset polygon for the inner content to establish a uniform border
  const innerClipPolygon = "polygon(29px 0%, 100% 0%, 100% calc(100% - 49px), calc(100% - 49px) 100%, 18px 100%, 0% calc(100% - 18px), 0% 29px)";

  return (
    <div 
      className="group relative w-[300px] md:w-[360px] h-[360px] md:h-[440px] flex items-center justify-center pointer-events-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      
      {/* 1. Volumetric Backlight Glow (Layer 0 - Background) */}
      <motion.div 
        className="absolute w-[240px] md:w-[320px] h-[240px] md:h-[320px] rounded-full bg-[radial-gradient(circle_at_center,rgba(207, 157, 123,0.15)_0%,transparent_70%)] blur-[80px] pointer-events-none z-0"
        style={{
          x: lightX,
          y: lightY,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(207, 157, 123,0.05)_0%,transparent_60%)] pointer-events-none z-0 animate-[light-sweep_10s_ease-in-out_infinite]" />

      {/* 2. Backdrop HUD Calibration Grid Lines (No circles!) */}
      <div className="absolute inset-x-[-20px] inset-y-[-20px] border border-white/[0.02] bg-[linear-gradient(rgba(207, 157, 123,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(207, 157, 123,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40 rounded-xl" />
      
      {/* Horizontal & Vertical Crosshairs in Background */}
      <div className="absolute left-1/2 top-[-30px] bottom-[-30px] w-[1px] bg-gradient-to-b from-transparent via-[#CF9D7B]/10 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-[-30px] right-[-30px] h-[1px] bg-gradient-to-r from-transparent via-[#CF9D7B]/10 to-transparent pointer-events-none" />

      {/* 3. Main Layered Card Structure (3D transform container) */}
      <motion.div
        className="relative w-[240px] md:w-[290px] h-[320px] md:h-[390px] cursor-pointer z-10 select-none shadow-[0_30px_60px_rgba(0,0,0,0.8)] will-change-transform"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        
        {/* Outer Tech Border with Asymmetrical clip-path */}
        <div 
          className="relative w-full h-full p-[1.5px] bg-gradient-to-tr from-[#CF9D7B]/30 via-white/5 to-[#CF9D7B]/20"
          style={{
            clipPath: clipPolygon,
            transform: 'translateZ(10px)',
          }}
        >
          {/* Inner Premium Glassmorphic Plate */}
          <div 
            className="relative w-full h-full bg-gradient-to-br from-[#162127]/95 via-[#0C1519]/98 to-[#0C1519]/95 backdrop-blur-2xl flex items-center justify-center"
            style={{
              clipPath: innerClipPolygon,
            }}
          >
            
            {/* Fine Tech Grid Overlay inside glass */}
            <div className="absolute inset-0 grid-bg opacity-[0.08] pointer-events-none" />
            
            {/* User Profile Image */}
            <div 
              className="relative w-[96%] h-[97%] overflow-hidden bg-black/40"
              style={{
                clipPath: "polygon(27px 0%, 100% 0%, 100% calc(100% - 47px), calc(100% - 47px) 100%, 16px 100%, 0% calc(100% - 16px), 0% 27px)",
              }}
            >
              <img
                src="/profile.jpg"
                alt="Dinesh P"
                className="w-full h-full object-cover object-center transition-all duration-700 scale-100 group-hover:scale-105 brightness-[0.9] hover:brightness-[1.05]"
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'><rect x='25' y='20' width='50' height='50' rx='4' fill='%23CF9D7B' opacity='0.75'/><path d='M15 85 C 15 65, 85 65, 85 85' fill='%23CF9D7B' opacity='0.75'/><rect x='2' y='2' width='96' height='96' stroke='%23CF9D7B' stroke-width='2' stroke-dasharray='4,4'/></svg>";
                }}
              />
              
              {/* Subtle Scanning Scanline */}
              <div className="absolute left-0 w-full h-[1.5px] bg-[#CF9D7B]/40 shadow-[0_0_8px_#CF9D7B] opacity-60 animate-[scan-slow_10s_ease-in-out_infinite] pointer-events-none" />
              
              {/* Radial gradient shadow around image edges for cinematic lighting */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(3,7,18,0.7)_100%)] pointer-events-none" />
            </div>

            {/* Ambient Reflection Light Sheet (pans across container) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent translate-x-[-100%] translate-y-[-100%] rotate-45 pointer-events-none group-hover:animate-[hud-glimmer_1.6s_ease-out]" />
            
            {/* Holographic Target Corners (Crosshair guides inside bounds) */}
            <div className="absolute top-[35px] left-[35px] w-2.5 h-2.5 border-t border-l border-[#CF9D7B]/40" />
            <div className="absolute top-[35px] right-[35px] w-2.5 h-2.5 border-t border-r border-[#CF9D7B]/40" />
            <div className="absolute bottom-[55px] right-[55px] w-2.5 h-2.5 border-b border-r border-[#CF9D7B]/40" />
            <div className="absolute bottom-[35px] left-[35px] w-2.5 h-2.5 border-b border-l border-[#CF9D7B]/40" />
          </div>
        </div>

        {/* 4. Overlay SVG Glowing Energy Pulse along the shape */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          style={{ transform: 'translateZ(15px)' }}
        >
          <svg className="w-full h-full" viewBox="0 0 290 390" preserveAspectRatio="none">
            <defs>
              <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#CF9D7B" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#724B39" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#CF9D7B" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {/* Inactive fine outline */}
            <polygon 
              points="30,1 289,1 289,339 239,389 18,389 1,371 1,30" 
              fill="none" 
              stroke="url(#neonGradient)" 
              strokeWidth="1"
              className="opacity-20"
            />
            {/* Active pulsing energy stroke */}
            <motion.polygon 
              points="30,1 289,1 289,339 239,389 18,389 1,371 1,30" 
              fill="none" 
              stroke="#CF9D7B" 
              strokeWidth="1.5"
              strokeDasharray="80 380"
              animate={{
                strokeDashoffset: [460, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
              className="drop-shadow-[0_0_3px_rgba(207,157,123,0.5)]"
            />
          </svg>
        </div>

        {/* 5. Floating Telemetry Cards (Dynamic Parallax Depth Layers) */}
        
        {/* Card 1: Top-Right (AI System Status) */}
        <motion.div
          className="absolute -top-6 -right-12 w-[160px] p-3 rounded-lg border border-[#CF9D7B]/20 bg-gradient-to-br from-[#162127]/90 via-[#0C1519]/95 to-[#0C1519]/98 backdrop-blur-xl shadow-lg z-30 select-none text-left"
          style={{
            x: card1X,
            y: card1Y,
            transform: 'translateZ(35px)',
          }}
        >
          <div className="flex items-center justify-between mb-1.5 border-b border-white/5 pb-1">
            <span className="text-[8px] font-mono tracking-widest text-[#CF9D7B] font-bold flex items-center gap-1">
              <Cpu className="w-2.5 h-2.5" />
              CORE_NET_SYS // 01
            </span>
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CF9D7B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#CF9D7B]"></span>
            </span>
          </div>
          <div className="font-mono text-[7px] text-text-muted flex flex-col gap-0.5">
            <div className="flex justify-between">
              <span>STATUS:</span>
              <span className="text-[#CF9D7B] font-semibold">NOMINAL</span>
            </div>
            <div className="flex justify-between">
              <span>SYNC_LATENCY:</span>
              <span className="text-white">4.2ms</span>
            </div>
            <div className="flex justify-between">
              <span>MODEL:</span>
              <span className="text-white">SYNAPSE_CORE</span>
            </div>
          </div>
          {/* Audio voice waves visual representation */}
          <div className="flex items-end gap-[2px] h-3 mt-2">
            {[0.4, 0.8, 0.3, 0.9, 0.5, 0.7, 0.2, 0.6, 0.4].map((h, i) => (
              <div 
                key={i} 
                className="w-[3px] bg-[#CF9D7B]/80 rounded-full"
                style={{ 
                  height: `${h * 100}%`,
                  animation: 'voice-wave 1.2s ease-in-out infinite',
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Card 2: Bottom-Left (Neural Synchronizer Grid) */}
        <motion.div
          className="absolute -bottom-8 -left-12 w-[150px] p-2.5 rounded-lg border border-white/5 bg-gradient-to-br from-[#162127]/85 via-[#0C1519]/95 to-[#0C1519]/98 backdrop-blur-xl shadow-lg z-30 select-none text-left"
          style={{
            x: card2X,
            y: card2Y,
            transform: 'translateZ(25px)',
          }}
        >
          <div className="flex items-center gap-1 mb-1 text-[8px] font-mono tracking-wider text-white font-bold">
            <Activity className="w-2.5 h-2.5 text-[#CF9D7B]" />
            NEURAL_STREAM
          </div>
          <div className="w-full bg-white/5 h-[1.5px] mb-2 rounded-full overflow-hidden">
            <motion.div 
              className="bg-[#CF9D7B] h-full"
              initial={{ width: "20%" }}
              animate={{ width: ["20%", "85%", "45%", "90%", "20%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="grid grid-cols-2 gap-1 text-[6px] font-mono text-text-muted">
            <div className="bg-[#0C1519]/50 p-0.5 rounded border border-white/5">
              <span className="block text-white font-bold">LOC-91</span>
              <span>CHENNAI_IN</span>
            </div>
            <div className="bg-[#0C1519]/50 p-0.5 rounded border border-white/5">
              <span className="block text-white font-bold">NODE_ACT</span>
              <span className="text-[#CF9D7B] animate-pulse">TRUE</span>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Top-Left small sensor status tab */}
        <motion.div
          className="absolute top-1/3 -left-12 p-1.5 px-2.5 rounded border border-white/5 bg-gradient-to-r from-[#162127]/90 to-[#0C1519]/95 backdrop-blur-xl shadow-md z-30 select-none text-left font-mono text-[7px]"
          style={{
            x: card3X,
            y: card3Y,
            transform: 'translateZ(45px)',
          }}
        >
          <span className="text-text-muted">SEC_SHIELD: </span>
          <span className="text-[#CF9D7B] font-bold">ACTIVE</span>
        </motion.div>
      </motion.div>

      {/* Floating particles drift in 3D space (around the frame) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#CF9D7B]/40"
            style={{
              width: `${Math.random() * 3 + 1.5}px`,
              height: `${Math.random() * 3 + 1.5}px`,
              left: `${15 + Math.random() * 70}%`,
              top: `${20 + Math.random() * 60}%`,
              filter: 'blur(0.5px) drop-shadow(0 0 2px #CF9D7B)',
              animation: 'star-flicker 4s ease-in-out infinite',
              animationDelay: `${i * 0.7}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CanvasWrapper;
