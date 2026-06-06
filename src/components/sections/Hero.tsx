'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import CanvasWrapper from '../three/CanvasWrapper';

export const Hero: React.FC = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate relative coordinate offset from center of viewport
      const x = (e.clientX - window.innerWidth / 2) * 0.06;
      const y = (e.clientY - window.innerHeight / 2) * 0.06;
      setCoords({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Framer Motion staggered child animations with blur + fade + slide reveal
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        stiffness: 80,
        damping: 14
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Grid Overlay (Parallax Layer 1: background, moves in opposite direction) */}
      <div 
        className="absolute inset-0 grid-bg opacity-[0.35] pointer-events-none z-0 transition-transform duration-[600ms] ease-out"
        style={{
          transform: `translate3d(${coords.x * -0.2}px, ${coords.y * -0.2}px, 0)`,
        }}
      />
      
      {/* Radial Gradient Backlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(7,19,26,0.85)_0%,#0C1519_100%)] pointer-events-none z-0" />

      {/* Futuristic scanning scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.01] to-transparent bg-[size:100%_4px] z-0" />

      {/* Volumetric background lights (Parallax Layer 2) */}
      <div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary-accent/[0.02] blur-[150px] pointer-events-none z-0 transition-transform duration-[800ms] ease-out"
        style={{
          transform: `translate3d(${coords.x * -0.4}px, ${coords.y * -0.4}px, 0) scale(1.1)`,
        }}
      />

      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 py-12 md:py-20">
        {/* Left Column: Headlines */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start gap-6 text-left transition-transform duration-[400ms] ease-out"
          style={{
            transform: `translate3d(${coords.x * 0.15}px, ${coords.y * 0.15}px, 0)`,
          }}
        >
          {/* Status Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-accent/8 border border-primary-accent/20 text-xs md:text-sm font-semibold tracking-wider text-primary-accent uppercase shadow-[0_0_12px_rgba(207,157,123,0.12)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-accent animate-pulse" />
            <span className="font-mono">AI Integration & Full-Stack Engineer</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-display"
          >
            Building AI-Powered <br />
            <span className="bg-gradient-to-r from-[#CF9D7B] via-primary-accent to-[#724B39] bg-clip-text text-transparent neon-text animate-glow-breathe">
              Digital Experiences
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            variants={itemVariants}
            className="text-sm md:text-lg text-text-muted leading-relaxed max-w-xl font-sans"
          >
            Engineering next-generation AI agents, serverless full-stack systems, and automated growth channels. <br />
            Specializing in multi-agent orchestration, cloud architectures, and intelligent digital systems.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 mt-3 w-full sm:w-auto"
          >
            <Button variant="primary" magnetic={true} href="#projects">
              View Projects
            </Button>
            <Button variant="outline" magnetic={true} href="#contact">
              Hire Me
            </Button>
            <Button variant="glow" magnetic={true} href="/resume">
              View Resume
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D TechSphere (Parallax Layer 3) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="lg:col-span-5 w-full h-[320px] md:h-[450px] flex items-center justify-center relative select-none pointer-events-none transition-transform duration-[500ms] ease-out"
          style={{
            transform: `translate3d(${coords.x * 0.3}px, ${coords.y * 0.3}px, 0)`,
          }}
        >
          {/* Asymmetrical HUD background outlines */}
          <div 
            className="absolute w-[280px] md:w-[350px] h-[350px] md:h-[440px] border border-[#CF9D7B]/10 pointer-events-none animate-pulse-glow animate-float shadow-[0_0_30px_rgba(207,157,123,0.03)]"
            style={{
              clipPath: 'polygon(30px 0%, 100% 0%, 100% calc(100% - 50px), calc(100% - 50px) 100%, 18px 100%, 0% calc(100% - 18px), 0% 30px)'
            }}
          />
          <div className="animate-float-reverse">
            <CanvasWrapper />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
