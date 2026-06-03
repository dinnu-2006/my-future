'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { fadeUp } from '@/lib/animations';
import { skills } from '@/data/skills';
import { Cpu, Layout, Server, TrendingUp, Cpu as AutomateIcon } from 'lucide-react';

const CATEGORIES = [
  { id: 'ai', label: 'AI Engineering', icon: Cpu, color: '#A7FF4A', radius: 130, speed: '40s' },
  { id: 'frontend', label: 'Frontend UI', icon: Layout, color: '#00FFB2', radius: 195, speed: '55s' },
  { id: 'backend', label: 'Backend Core', icon: Server, color: '#38BDF8', radius: 260, speed: '70s' },
  { id: 'automation', label: 'Automation', icon: AutomateIcon, color: '#B7FF62', radius: 320, speed: '85s' },
  { id: 'marketing', label: 'Growth/SEO', icon: TrendingUp, color: '#F472B6', radius: 375, speed: '100s' }
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
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white">
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
        <div className="hidden lg:flex items-center justify-center min-h-[800px] w-full relative">
          
          {/* Pulsing Galaxy Core Center */}
          <div className="absolute z-30 w-36 h-36 rounded-full flex flex-col items-center justify-center bg-[#07131A] border-2 border-primary-accent/30 shadow-[0_0_40px_rgba(167,255,74,0.15)] select-none">
            <div className="absolute inset-0 rounded-full bg-primary-accent/5 animate-ping" />
            <Cpu className="w-8 h-8 text-primary-accent mb-1 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest font-mono text-primary-accent font-semibold">
              AI & Dev
            </span>
            <span className="text-[9px] uppercase tracking-widest text-text-muted mt-0.5">
              Galaxy Core
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
                  className="absolute"
                  style={{
                    width: cat.radius * 2,
                    height: cat.radius * 2,
                    transition: 'all 0.5s ease',
                  }}
                >
                  <circle
                    cx={cat.radius}
                    cy={cat.radius}
                    r={cat.radius - 1}
                    fill="none"
                    stroke={isHovered ? cat.color : 'rgba(255, 255, 255, 0.04)'}
                    strokeWidth={isHovered ? 1.5 : 1}
                    strokeDasharray={isHovered ? '4, 4' : 'none'}
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
                        {/* Opposite rotation to keep text vertical */}
                        <div
                          style={{
                            animation: `orbit ${cat.speed} linear infinite reverse`,
                          }}
                        >
                          <div
                            className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-300 whitespace-nowrap shadow-md ${
                              isHovered
                                ? 'bg-[#07131A] text-white'
                                : 'bg-[#030712]/80 text-text-muted border-white/6 hover:text-white'
                            }`}
                            style={{
                              borderColor: isHovered ? cat.color : 'rgba(255, 255, 255, 0.08)',
                              boxShadow: isHovered ? `0 0 15px ${cat.color}20` : 'none',
                            }}
                          >
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
