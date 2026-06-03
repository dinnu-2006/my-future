'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import CanvasWrapper from '../three/CanvasWrapper';
import { fadeUp, fadeIn } from '@/lib/animations';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-bg opacity-[0.35] pointer-events-none z-0" />
      
      {/* Radial Gradient Backlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(7,19,26,0.85)_0%,#030712_100%)] pointer-events-none z-0" />

      {/* Futuristic scanning scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.01] to-transparent bg-[size:100%_4px] z-0" />

      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 py-12 md:py-20">
        {/* Left Column: Headlines */}
        <motion.div
          variants={fadeUp(0.8, 0.15)}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start gap-6 text-left"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-accent/8 border border-primary-accent/20 text-xs md:text-sm font-semibold tracking-wider text-primary-accent uppercase shadow-[0_0_12px_rgba(167,255,74,0.12)]">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-accent animate-pulse" />
            AI Architect & Founder
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-display">
            Building AI-Powered <br />
            <span className="bg-gradient-to-r from-[#00FFB2] via-primary-accent to-[#B7FF62] bg-clip-text text-transparent neon-text">
              Digital Experiences
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-sm md:text-lg text-text-muted leading-relaxed max-w-xl font-sans">
            CSE Student | AI Developer | Full Stack Developer | Digital Marketer. <br />
            Constructing multi-agent networks, serverless SaaS portals, automated pipelines, and algorithmic growth channels.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-3 w-full sm:w-auto">
            <Button variant="primary" magnetic={true} href="#projects">
              View Projects
            </Button>
            <Button variant="outline" magnetic={true} href="#contact">
              Hire Me
            </Button>
            {/* Directs to an interactive printable resume page */}
            <Button variant="glow" magnetic={true} href="/resume">
              View Resume
            </Button>
          </div>
        </motion.div>

        {/* Right Column: 3D TechSphere */}
        <motion.div
          variants={fadeIn(1.2, 0.4)}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 w-full h-[320px] md:h-[450px] flex items-center justify-center relative select-none pointer-events-none"
        >
          {/* Orbit rings background overlay */}
          <div className="absolute w-[260px] md:w-[360px] h-[260px] md:h-[360px] rounded-full border border-primary-accent/5 pointer-events-none animate-pulse-glow" />
          <div className="absolute w-[320px] md:w-[440px] h-[320px] md:h-[440px] rounded-full border border-emerald-500/5 pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
          <CanvasWrapper />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
