'use client';

import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { fadeUp } from '@/lib/animations';
import { BookOpen, Code, Rocket } from 'lucide-react';

const TIMELINE_STEPS = [
  {
    id: 'student',
    icon: BookOpen,
    label: 'Academic',
    period: '2024 - 2028 (Expected)',
    title: 'Computer Science Engineering',
    details: 'Pursuing Bachelor of Engineering in Computer Science & Engineering at Jaya Engineering College. Focus on algorithms, artificial intelligence integration, and systems architecture.',
  },
  {
    id: 'developer',
    icon: Code,
    label: 'Systems',
    period: '2024 - Present',
    title: 'Full Stack & AI Engineer',
    details: 'Developing production-ready web apps, deploying autonomous agents, and orchestrating serverless APIs through high-performance software environments.',
  },
  {
    id: 'marketer',
    icon: Rocket,
    label: 'Strategist',
    period: '2025 - Present',
    title: 'Growth Engineering',
    details: 'Structuring data-driven organic marketing funnels, search engine optimization (SEO), and programmatically engineered content delivery systems.',
  }
];

const STATS = [
  { label: 'Projects Built', value: '8+' },
  { label: 'Core Toolkit Skills', value: '12' },
  { label: 'Certifications', value: '2' },
  { label: 'CSE Department Year', value: '3rd' },
  { label: 'Graduation Year', value: '2028' },
  { label: 'Github Repository', value: 'Active' }
];

const AIPortrait: React.FC = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotate({
      x: -((y - centerY) / centerY) * 10,
      y: ((x - centerX) / centerX) * 10
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div className="relative p-4 md:p-6 mb-6 sm:mb-0 flex-shrink-0 flex items-center justify-center">
      {/* 3D Skewed Holographic Rings (Layered behind and around) */}
      <div 
        className="absolute pointer-events-none z-0 flex items-center justify-center opacity-40 select-none"
        style={{
          transform: 'rotateX(72deg) rotateY(12deg) translateZ(-15px) translateY(-5px)',
          transformStyle: 'preserve-3d',
          width: 180,
          height: 180,
        }}
      >
        <div 
          className="absolute w-[170px] h-[170px] rounded-full border border-dashed border-[#CF9D7B]/25 animate-[orbit_30s_linear_infinite]"
        />
        <div 
          className="absolute w-[150px] h-[150px] rounded-full border border-double border-[#724B39]/30 animate-[orbit_18s_linear_infinite_reverse]"
        />
      </div>

      {/* Concentric Rotating HUD Circles (Directly behind the portrait card) */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center select-none scale-[1.2] md:scale-[1.35]">
        <div 
          className="absolute w-[100px] h-[100px] rounded-full border border-dotted border-primary-accent/15 animate-spin"
          style={{ animationDuration: '20s' }}
        />
        <div 
          className="absolute w-[110px] h-[110px] rounded-full border border-dashed border-[#CF9D7B]/10 animate-[spin_35s_linear_infinite_reverse]"
        />
        <div 
          className="absolute w-[122px] h-[122px] rounded-full border border-primary-accent/5 animate-pulse"
          style={{ animationDuration: '3s' }}
        />
      </div>

      <motion.div
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        className="relative w-28 h-28 md:w-32 md:h-32 flex-shrink-0 cursor-pointer will-change-transform select-none z-10"
        style={{
          transform: `perspective(800px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.05 : 1})`,
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.45s ease',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Outer pulsing glow */}
        <div 
          className="absolute inset-[-8px] rounded-xl bg-gradient-to-r from-primary-accent/15 to-[#724B39]/15 opacity-0 transition-opacity duration-500 blur-lg pointer-events-none"
          style={{ opacity: isHovered ? 0.9 : 0.25 }}
        />

        {/* Holographic corners */}
        <div className="holographic-corner holographic-corner-tl" />
        <div className="holographic-corner holographic-corner-tr" />
        <div className="holographic-corner holographic-corner-bl" />
        <div className="holographic-corner holographic-corner-br" />

        {/* Main image container */}
        <div 
          className="w-full h-full bg-[#0C1519] border border-[#CF9D7B]/20 overflow-hidden relative rounded-lg flex items-center justify-center shadow-[0_0_25px_rgba(0,0,0,0.5)]"
          style={{ transform: 'translateZ(12px)' }}
        >
          <img
            src="/profile.jpg"
            alt="Dinesh P"
            className="w-full h-full object-cover object-center filter saturate-[0.8] contrast-[1.08] transition-all duration-300 group-hover:scale-105"
          />

          {/* Energy Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            <div className="absolute w-1 h-1 rounded-full bg-primary-accent animate-[pulse-glow_3s_infinite]" style={{ top: '15%', left: '25%' }} />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-[#CF9D7B] animate-pulse" style={{ top: '75%', left: '80%', animationDuration: '2.5s' }} />
            <div className="absolute w-1 h-1 rounded-full bg-white opacity-40" style={{ top: '65%', left: '20%' }} />
          </div>

          {/* Code Streams Overlay */}
          <div className="absolute inset-0 bg-[#0C1519]/35 pointer-events-none z-10" />
          <div className="code-stream-panel z-10 opacity-20">
            <div className="animate-[matrix-fade_10s_linear_infinite]" style={{ whiteSpace: 'pre-wrap' }}>
              {"01011\nCORE\nSYS_\nNET_"}
            </div>
          </div>

          {/* Scan line */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#CF9D7B] to-transparent opacity-90 animate-scan pointer-events-none z-10" />
        </div>

        {/* Floating UI micro-panels */}
        <div 
          className="absolute -top-2 -left-2 px-1.5 py-0.5 bg-[#162127]/90 border border-white/10 text-[7px] font-mono text-primary-accent rounded pointer-events-none z-20 transition-all duration-300 shadow-lg"
          style={{ transform: 'translateZ(24px)', opacity: isHovered ? 1 : 0.8 }}
        >
          SYS_ONLINE
        </div>
        <div 
          className="absolute -bottom-2 -right-2 px-1.5 py-0.5 bg-[#162127]/90 border border-white/10 text-[7px] font-mono text-[#B9ACA3] rounded pointer-events-none z-20 transition-all duration-300 shadow-lg"
          style={{ transform: 'translateZ(24px)', opacity: isHovered ? 1 : 0.8 }}
        >
          V4.0 // CORE
        </div>
      </motion.div>
    </div>
  );
};

const AnimatedCounter: React.FC<{ value: string; duration?: number }> = ({ value, duration = 1.5 }) => {
  const [current, setCurrent] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const number = parseInt(value.replace(/\D/g, ''), 10) || 0;
  const suffix = value.replace(/\d/g, '');

  useEffect(() => {
    if (!isInView) return;
    const start = 0;
    const end = number;
    let frameId: number;

    if (start === end) {
      frameId = requestAnimationFrame(() => {
        setCurrent(end);
      });
      return () => cancelAnimationFrame(frameId);
    }

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCurrent(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, number, duration]);

  return <span ref={ref}>{current}{suffix}</span>;
};

export const About: React.FC = () => {
  const [activeStep, setActiveStep] = useState('student');

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#162127]/30">
      {/* Background decoration blur */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full bg-primary-accent/3 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Title */}
        <motion.div
          variants={fadeUp(0.6, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Badge variant="primary" className="mb-3">
            Mission Control
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white hover-glitch inline-block" data-text="Architecting the Future">
            Architecting the Future
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary-accent to-transparent mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Narrative & Stats */}
          <motion.div
            variants={fadeUp(0.8, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-6 flex flex-col gap-8"
          >
            {/* Story Card */}
            <Card glowColor="rgba(207, 157, 123, 0.12)" className="p-6 md:p-8 bg-[#162127]/40">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                
                <AIPortrait />

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white">
                    Who Is Dinesh P?
                  </h3>
                  <p className="text-sm md:text-base text-text-muted leading-relaxed mb-4">
                    I am an AI developer and full-stack software engineer pursuing my Computer Science Engineering degree. Specializing in autonomous multi-agent networks, cloud infrastructure, and intelligent software systems, I build end-to-end applications designed for scale, efficiency, and real-world utility.
                  </p>
                  <p className="text-sm md:text-base text-text-muted leading-relaxed mb-6">
                    My work converges at the intersection of modern front-end design, secure serverless architectures, and advanced data-driven marketing systems—ensuring every product delivers maximum technical efficiency and business growth.
                  </p>
                </div>
              </div>

              <div className="border-t border-white/8 pt-5 mt-4">
                <span className="text-xs uppercase tracking-wider text-primary-accent font-semibold block mb-2">
                  My Core Creed
                </span>
                <p className="text-sm italic text-white/90">
                  &ldquo;Bridge the gap between artificial intelligence and beautiful, high-performance web systems to architect the digital future.&rdquo;
                </p>
              </div>
            </Card>

            {/* Grid of Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {STATS.map((stat, idx) => (
                <div key={idx} className="glass-card bg-[#162127]/30 border border-white/6 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                  <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-primary-accent to-[#724B39] bg-clip-text text-transparent mb-1">
                    <AnimatedCounter value={stat.value} />
                  </span>
                  <span className="text-[10px] md:text-xs text-text-muted uppercase tracking-wider font-mono">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Interactive Timeline */}
          <motion.div
            variants={fadeUp(0.8, 0.3)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <Card glowColor="rgba(207, 157, 123, 0.12)" className="p-6 md:p-8 bg-[#162127]/40">
              <h3 className="text-xl md:text-2xl font-semibold mb-6 text-white text-center md:text-left">
                The Founder Journey
              </h3>

              {/* Horizontal Nav Steps */}
              <div className="flex justify-between items-center relative mb-8 border-b border-white/8 pb-4 overflow-x-auto gap-2 md:gap-0 scrollbar-none">
                {TIMELINE_STEPS.map((step) => {
                  const Icon = step.icon;
                  const isActive = activeStep === step.id;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveStep(step.id)}
                      className="flex flex-col items-center gap-1.5 focus:outline-none transition-all duration-300 relative group cursor-pointer"
                    >
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? 'border-primary-accent bg-primary-accent/15 text-primary-accent shadow-[0_0_12px_rgba(207, 157, 123,0.3)]' 
                          : 'border-white/10 bg-white/2 text-white/50 group-hover:border-white/30 group-hover:text-white'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-[10px] uppercase tracking-wider font-mono font-medium ${
                        isActive ? 'text-primary-accent' : 'text-text-muted group-hover:text-white'
                      }`}>
                        {step.label}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTimelineTab"
                          className="absolute -bottom-4 left-0 right-0 h-[2px] bg-primary-accent"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Step Detail Card */}
              {TIMELINE_STEPS.map((step) => {
                if (step.id !== activeStep) return null;
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-accent/8 border border-primary-accent/20 flex items-center justify-center text-primary-accent">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white tracking-wide uppercase">
                          {step.title}
                        </h4>
                        <span className="text-xs font-mono text-text-muted">
                          {step.period}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm md:text-base text-text-muted leading-relaxed mt-2 bg-white/[0.01] border border-white/5 p-4 rounded-lg">
                      {step.details}
                    </p>
                  </motion.div>
                );
              })}
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
