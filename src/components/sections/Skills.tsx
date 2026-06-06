'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { fadeUp } from '@/lib/animations';
import { skills } from '@/data/skills';
import { Cpu, Layout, Server, TrendingUp, Sparkles } from 'lucide-react';

const CATEGORIES = [
  { id: 'ai', label: 'AI Engineering', icon: Cpu, color: '#CF9D7B', radius: 115, speed: '40s' },
  { id: 'frontend', label: 'Frontend UI', icon: Layout, color: '#A88E80', radius: 175, speed: '55s' },
  { id: 'backend', label: 'Backend Core', icon: Server, color: '#724B39', radius: 235, speed: '70s' },
  { id: 'marketing', label: 'Growth/SEO', icon: TrendingUp, color: '#F5EDE8', radius: 295, speed: '85s' }
];

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Group skills by category
  const getSkillsByCategory = (cat: string) => skills.filter(s => s.category === cat);
  const activeCat = CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#0C1519]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-accent/[0.02] blur-[150px] pointer-events-none" />

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
            Neural Skill Vault
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white hover-glitch inline-block" data-text="Capability Galaxy">
            Capability Galaxy
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary-accent to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Mobile/Tablet Grid View (Hidden on LG desktops) */}
        <div className="block lg:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const catSkills = getSkillsByCategory(cat.id);
              return (
                <Card key={cat.id} glowColor={`${cat.color}20`} className="p-6 bg-[#162127]/35">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-lg border flex items-center justify-center" style={{ borderColor: `${cat.color}30`, backgroundColor: `${cat.color}08`, color: cat.color }}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                      {cat.label}
                    </h3>
                  </div>

                  {/* Mobile Skills Progress Bars */}
                  <div className="flex flex-col gap-4">
                    {catSkills.map((skill, idx) => (
                      <div key={idx} className="flex flex-col gap-1.5 text-left">
                        <div className="flex items-center justify-between text-xs text-white">
                          <span className="font-mono">{skill.name}</span>
                          <span className="text-primary-accent font-semibold">{skill.level}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded bg-white/5 overflow-hidden relative border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-[#724B39] to-primary-accent"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Desktop Split Galaxy View (LG screens) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center min-h-[750px] w-full relative">
          
          {/* Custom SVG filter for neon glow */}
          <svg className="absolute w-0 h-0">
            <defs>
              <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Left Column: Interactive Galaxy (col-span-7) */}
          <div className="col-span-7 flex items-center justify-center min-h-[680px] relative">
            
            {/* Pulsing Galaxy Core Center */}
            <div className="absolute z-30 w-36 h-36 rounded-full flex flex-col items-center justify-center bg-[#0C1519] border border-primary-accent/30 shadow-[0_0_40px_rgba(207,157,123,0.15)] select-none">
              <div className="absolute inset-2 rounded-full border border-dashed border-white/5 animate-spin" style={{ animationDuration: '30s' }} />
              <div className="absolute inset-4 rounded-full border border-dashed border-primary-accent/15 animate-spin" style={{ animationDuration: '18s', animationDirection: 'reverse' }} />
              <div className="absolute inset-0 rounded-full bg-primary-accent/[0.02] animate-ping" style={{ animationDuration: '3.5s' }} />
              
              <Cpu className="w-8 h-8 text-primary-accent mb-1 animate-pulse" />
              <span className="text-[9px] uppercase tracking-widest font-mono text-primary-accent font-semibold">
                AI & Dev
              </span>
              <span className="text-[7px] text-[#CF9D7B]/70 font-mono mt-0.5 animate-pulse">
                SYS_ACTIVE // V4.0
              </span>
            </div>

            {/* Render Concentric Orbits */}
            {CATEGORIES.map((cat) => {
              const catSkills = getSkillsByCategory(cat.id);
              const count = catSkills.length;
              const isHovered = selectedCategory === cat.id;

              return (
                <div
                  key={cat.id}
                  onMouseEnter={() => setSelectedCategory(cat.id)}
                  onMouseLeave={() => setSelectedCategory(null)}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  {/* SVG Orbit Ring Line */}
                  <svg
                    className="absolute pointer-events-none"
                    style={{
                      width: cat.radius * 2 + 40,
                      height: cat.radius * 2 + 40,
                      transition: 'all 0.5s ease',
                    }}
                    viewBox={`0 0 ${cat.radius * 2 + 40} ${cat.radius * 2 + 40}`}
                  >
                    {isHovered && (
                      <circle
                        cx={cat.radius + 20}
                        cy={cat.radius + 20}
                        r={cat.radius}
                        fill="none"
                        stroke={cat.color}
                        strokeWidth={5}
                        opacity={0.12}
                        filter="url(#neon-glow)"
                      />
                    )}
                    <circle
                      cx={cat.radius + 20}
                      cy={cat.radius + 20}
                      r={cat.radius}
                      fill="none"
                      stroke={isHovered ? cat.color : 'rgba(255, 255, 255, 0.04)'}
                      strokeWidth={isHovered ? 1.5 : 1}
                      strokeDasharray={isHovered ? '6, 8' : 'none'}
                      className="transition-all duration-300"
                    />
                  </svg>

                  {/* Rotating Orbit Container */}
                  <div
                    className="absolute flex items-center justify-center"
                    style={{
                      width: cat.radius * 2,
                      height: cat.radius * 2,
                      animation: `orbit ${cat.speed} linear infinite`,
                    }}
                  >
                    {/* Gravity connectors */}
                    {isHovered && catSkills.map((_, index) => {
                      const angle = (index * 2 * Math.PI) / count;
                      const x = cat.radius * Math.cos(angle);
                      const y = cat.radius * Math.sin(angle);
                      return (
                        <svg
                          key={`beam-${index}`}
                          className="absolute inset-0 pointer-events-none"
                          style={{ width: '100%', height: '100%' }}
                          viewBox={`0 0 ${cat.radius * 2} ${cat.radius * 2}`}
                        >
                          <line
                            x1={cat.radius}
                            y1={cat.radius}
                            x2={cat.radius + x}
                            y2={cat.radius + y}
                            stroke={cat.color}
                            strokeWidth={0.65}
                            opacity={0.15}
                            strokeDasharray="4, 4"
                          />
                        </svg>
                      );
                    })}

                    {/* Skill Nodes distributed along the Orbit Ring */}
                    {catSkills.map((skill, index) => {
                      const angle = (index * 2 * Math.PI) / count;
                      const x = cat.radius * Math.cos(angle);
                      const y = cat.radius * Math.sin(angle);

                      return (
                        <div
                          key={index}
                          className="absolute pointer-events-auto cursor-pointer"
                          style={{ transform: `translate(${x}px, ${y}px)` }}
                        >
                          {/* Counter-rotation to keep titles upright */}
                          <div style={{ animation: `orbit ${cat.speed} linear infinite reverse` }}>
                            <div
                              className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono transition-all duration-300 whitespace-nowrap shadow-md flex items-center gap-2 group/node ${
                                isHovered
                                  ? 'bg-[#162127]/95 text-white backdrop-blur-md scale-105 border-[#CF9D7B]/30'
                                  : 'bg-[#0C1519]/80 text-text-muted border-white/6 hover:text-white hover:border-white/20'
                              }`}
                              style={{
                                borderColor: isHovered ? cat.color : 'rgba(255, 255, 255, 0.08)',
                                boxShadow: isHovered ? `0 0 15px ${cat.color}20` : 'none',
                              }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
                                style={{
                                  backgroundColor: isHovered ? cat.color : 'rgba(255, 255, 255, 0.25)',
                                  boxShadow: isHovered ? `0 0 8px ${cat.color}` : 'none',
                                }}
                              />
                              {skill.name}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Skill HUD details panel (col-span-5) */}
          <div className="col-span-5 flex flex-col justify-center">
            <Card glowColor="rgba(207, 157, 123, 0.12)" className="p-6 bg-[#162127]/30 border border-white/6 h-[460px] flex flex-col justify-between text-left font-mono">
              <div>
                <div className="flex items-center justify-between border-b border-white/8 pb-3 mb-6">
                  <span className="text-xs uppercase tracking-widest text-[#CF9D7B] font-extrabold flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-primary-accent" />
                    {activeCat ? activeCat.label : 'SYSTEM OVERVIEW'}
                  </span>
                  <span className="text-[9px] text-[#B9ACA3]">
                    {activeCat ? 'CORE_METRICS' : 'SYS_ONLINE'}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {activeCat ? (
                    <motion.div
                      key={activeCat.id}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-5"
                    >
                      {getSkillsByCategory(activeCat.id).map((skill, idx) => (
                        <div key={idx} className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between text-xs text-white">
                            <span>{skill.name}</span>
                            <span className="text-[#CF9D7B] font-bold">{skill.level}%</span>
                          </div>
                          {/* Progress Bar Container */}
                          <div className="w-full h-2 rounded bg-[#0C1519] overflow-hidden border border-white/5 relative">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1], delay: idx * 0.08 }}
                              className="h-full bg-gradient-to-r from-[#724B39] to-[#CF9D7B]"
                              style={{
                                boxShadow: '0 0 10px rgba(207, 157, 123, 0.5)'
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="diagnostic"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-4 text-xs text-text-muted py-4"
                    >
                      <p>&gt; AWAITING NEURAL COGNITION PATHWAY SELECT...</p>
                      <p>&gt; HOVER AN ORBIT PATH TO INITIALIZE TELEMETRY READOUT.</p>
                      <div className="mt-6 border border-white/5 p-4 rounded bg-[#0C1519]/40 flex flex-col gap-2 leading-relaxed">
                        <span className="text-[10px] text-primary-accent uppercase tracking-widest font-bold">SYSTEM TELEMETRY:</span>
                        <span>- Python, LLM & Orchestration Modules Online.</span>
                        <span>- React, Next.js UI Core Online.</span>
                        <span>- Node.js & DB Servers Responsive.</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="border-t border-white/5 pt-4 text-[9px] text-text-muted flex justify-between uppercase">
                <span>Core: V4.02 // Synapse</span>
                <span className="animate-pulse text-emerald-400 font-bold">SYS_SECURE</span>
              </div>
            </Card>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
