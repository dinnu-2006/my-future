'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { fadeUp } from '@/lib/animations';
import { skills } from '@/data/skills';
import { Cpu, Layout, Server, TrendingUp } from 'lucide-react';

const CATEGORIES = [
  { id: 'ai', label: 'AI Engineering', icon: Cpu, color: '#A7FF4A', radius: 130, speed: '40s' },
  { id: 'frontend', label: 'Frontend UI', icon: Layout, color: '#00FFB2', radius: 195, speed: '55s' },
  { id: 'backend', label: 'Backend Core', icon: Server, color: '#38BDF8', radius: 260, speed: '70s' },
  { id: 'marketing', label: 'Growth/SEO', icon: TrendingUp, color: '#F472B6', radius: 325, speed: '85s' }
];

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Group skills by category
  const getSkillsByCategory = (cat: string) => skills.filter(s => s.category === cat);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#030712]">
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
                <Card key={cat.id} glowColor={`${cat.color}20`} className="p-6 bg-[#07131A]/35">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg border flex items-center justify-center" style={{ borderColor: `${cat.color}30`, backgroundColor: `${cat.color}08`, color: cat.color }}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                      {cat.label}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {catSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-white/6 bg-white/[0.02] text-white/95"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Desktop Interactive Galaxy View (Visible only on LG desktops) */}
        <div className="hidden lg:flex items-center justify-center min-h-[850px] w-full relative">
          
          {/* Custom SVG filter for high-end neon glow */}
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

          {/* Pulsing Galaxy Core Center */}
          <div className="absolute z-30 w-44 h-44 rounded-full flex flex-col items-center justify-center bg-[#050b10] border border-primary-accent/30 shadow-[0_0_55px_rgba(167,255,74,0.18)] select-none">
            {/* Spinning decorative rings inside core */}
            <div className="absolute inset-2 rounded-full border border-dashed border-white/5 animate-spin" style={{ animationDuration: '30s' }} />
            <div className="absolute inset-4 rounded-full border border-dashed border-primary-accent/15 animate-spin" style={{ animationDuration: '18s', animationDirection: 'reverse' }} />
            <div className="absolute inset-0 rounded-full bg-primary-accent/[0.02] animate-ping" style={{ animationDuration: '3.5s' }} />
            
            <Cpu className="w-9 h-9 text-primary-accent mb-1 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest font-mono text-primary-accent font-semibold">
              AI & Dev
            </span>
            <span className="text-[8px] uppercase tracking-widest text-text-muted mt-1 font-mono">
              Galaxy Core
            </span>
            <span className="text-[7px] text-[#00FFB2]/70 font-mono mt-0.5 animate-pulse">
              SYS_ACTIVE // V4.02
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
                  {/* Volumetric glow ring on hover */}
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
                  {/* Core orbit ring line */}
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
                  {/* Gravity connector tethers from nodes to center core */}
                  {isHovered && catSkills.map((skill, index) => {
                    const angle = (index * 2 * Math.PI) / count;
                    const x = cat.radius * Math.cos(angle);
                    const y = cat.radius * Math.sin(angle);
                    return (
                      <svg
                        key={`beam-${index}`}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        viewBox={`0 0 ${cat.radius * 2} ${cat.radius * 2}`}
                      >
                        <line
                          x1={cat.radius}
                          y1={cat.radius}
                          x2={cat.radius + x}
                          y2={cat.radius + y}
                          stroke={cat.color}
                          strokeWidth={0.65}
                          opacity={0.14}
                          strokeDasharray="4, 4"
                        />
                      </svg>
                    );
                  })}

                  {/* Micro orbital particle stars traveling along the path */}
                  {[0, 120, 240].map((offsetAngle, sIdx) => {
                    const starRad = (offsetAngle * Math.PI) / 180;
                    const starX = cat.radius * Math.cos(starRad);
                    const starY = cat.radius * Math.sin(starRad);
                    return (
                      <div
                        key={`star-${sIdx}`}
                        className="absolute w-1.5 h-1.5 rounded-full animate-ping pointer-events-none"
                        style={{
                          transform: `translate(${starX}px, ${starY}px)`,
                          backgroundColor: cat.color,
                          boxShadow: `0 0 10px ${cat.color}`,
                          opacity: isHovered ? 0.95 : 0.22,
                          transition: 'opacity 0.3s ease',
                        }}
                      />
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
                        style={{
                          transform: `translate(${x}px, ${y}px)`,
                        }}
                      >
                        {/* Counter-rotation to keep titles upright */}
                        <div
                          style={{
                            animation: `orbit ${cat.speed} linear infinite reverse`,
                          }}
                        >
                          <div
                            className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-300 whitespace-nowrap shadow-md flex items-center gap-2 group/node ${
                              isHovered
                                ? 'bg-[#07131a]/92 text-white backdrop-blur-md scale-105'
                                : 'bg-[#030712]/80 text-text-muted border-white/6 hover:text-white hover:border-white/20'
                            }`}
                            style={{
                              borderColor: isHovered ? cat.color : 'rgba(255, 255, 255, 0.08)',
                              boxShadow: isHovered ? `0 0 20px ${cat.color}25` : 'none',
                            }}
                          >
                            {/* Glowing LED dot next to the skill name */}
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

      </div>
    </section>
  );
};

export default Skills;
