'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { fadeUp } from '@/lib/animations';
import { experience } from '@/data/experience';
import { Calendar, Briefcase, GraduationCap, Box, CheckCircle } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#030712]">
      {/* Background grids and details */}
      <div className="absolute inset-0 grid-bg opacity-[0.2] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-0 w-[250px] h-[250px] rounded-full bg-primary-accent/[0.01] blur-[120px] pointer-events-none" />

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
            Mission Timeline
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white">
            Career Operations Log
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary-accent to-transparent mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Console Panel */}
          <motion.div
            variants={fadeUp(0.8, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-4 flex flex-col gap-6"
          >
            <Card glowColor="rgba(0, 255, 178, 0.1)" className="p-6 bg-[#07131A]/35 border border-white/6 sticky top-28">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Box className="w-5 h-5 text-primary-accent animate-pulse" />
                Operational Status
              </h3>
              
              <ul className="flex flex-col gap-4 text-sm font-mono text-text-muted">
                <li className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span>Current Target:</span>
                  <span className="text-white">Stealth AI Builder</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span>CSE Academic Cycle:</span>
                  <span className="text-primary-accent">3rd Year</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span>Freelance Queues:</span>
                  <span className="text-white">Active Queue</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>System Health:</span>
                  <span className="text-[#00FFB2] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FFB2] animate-ping" />
                    Online
                  </span>
                </li>
              </ul>

              <div className="mt-6 border-t border-white/8 pt-6">
                <span className="text-xs uppercase tracking-wider text-white font-semibold block mb-3">
                  Key Milestones Summary
                </span>
                <div className="flex flex-col gap-2.5 text-xs text-text-muted">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary-accent flex-shrink-0" />
                    <span>Bootstrapped Synapse Automation MVP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary-accent flex-shrink-0" />
                    <span>Deployed 15+ Client Automation Chains</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary-accent flex-shrink-0" />
                    <span>Lighthouse 100/100 SaaS Boilers Built</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right Column: Holographic Dotted Roadmap */}
          <div className="lg:col-span-8 relative border-l border-white/8 pl-6 md:pl-8 ml-3 flex flex-col gap-10">
            {experience.map((item, idx) => {
              const isEducation = item.type === 'Education';
              const IconComponent = isEducation ? GraduationCap : Briefcase;
              return (
                <motion.div
                  key={item.id}
                  variants={fadeUp(0.8, idx * 0.1)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  className="relative group"
                >
                  {/* Glowing vertical node anchor */}
                  <div className="absolute -left-[35px] md:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-[#030712] border border-white/10 flex items-center justify-center text-text-muted group-hover:text-primary-accent group-hover:border-primary-accent transition-all duration-300 shadow-md">
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>

                  <Card glowColor="rgba(167, 255, 74, 0.1)" className="p-6 md:p-8 bg-[#07131A]/15 border border-white/6 hover:border-white/12 transition-all">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <div>
                        <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-primary-accent bg-primary-accent/5 px-2 py-0.5 rounded border border-primary-accent/20">
                          {item.type}
                        </span>
                        <h4 className="text-lg md:text-xl font-bold text-white tracking-wide mt-2">
                          {item.role}
                        </h4>
                        <span className="text-sm font-medium text-white/70 block mt-0.5">
                          {item.company}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.duration}</span>
                      </div>
                    </div>

                    {/* Description Bullets */}
                    <ul className="flex flex-col gap-2 mb-6">
                      {item.description.map((desc, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 text-sm text-text-muted leading-relaxed">
                          <span className="w-1 h-1 rounded-full bg-white/40 mt-2 flex-shrink-0" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-4">
                      {item.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-text-muted"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
