'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { BookOpen, Code, Cpu, Rocket, Award } from 'lucide-react';

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
                
                {/* Profile Photo Thumbnail with Cyber Border */}
                <div 
                  className="relative w-24 h-24 p-[1.5px] bg-gradient-to-tr from-[#724B39] to-primary-accent shadow-[0_0_15px_rgba(207,157,123,0.15)] flex-shrink-0"
                  style={{
                    clipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)',
                  }}
                >
                  <div 
                    className="w-full h-full bg-[#0C1519] overflow-hidden relative"
                    style={{
                      clipPath: 'polygon(11px 0%, 100% 0%, 100% calc(100% - 11px), calc(100% - 11px) 100%, 0% 100%, 0% 11px)',
                    }}
                  >
                    <img
                      src="/profile.jpg"
                      alt="Dinesh P"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary-accent to-transparent opacity-60 animate-scan pointer-events-none" />
                  </div>
                </div>

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
                  "Bridge the gap between artificial intelligence and beautiful, high-performance web systems to architect the digital future."
                </p>
              </div>
            </Card>

            {/* Grid of Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {STATS.map((stat, idx) => (
                <div key={idx} className="glass-card bg-[#162127]/30 border border-white/6 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                  <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-primary-accent to-[#724B39] bg-clip-text text-transparent mb-1">
                    {stat.value}
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
