'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { fadeUp } from '@/lib/animations';
import { services } from '@/data/services';
import { Cpu, Globe, GitFork, TrendingUp, Check } from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Cpu,
  Globe,
  GitFork,
  TrendingUp,
};

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#162127]/30">
      {/* Background visual detail */}
      <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full bg-[#CF9D7B]/[0.01] blur-[120px] pointer-events-none" />

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
            Services Catalog
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white">
            Premium Engineering Deliverables
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary-accent to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service, idx) => {
            const Icon = ICON_MAP[service.icon] || Globe;
            return (
              <motion.div
                key={service.id}
                variants={fadeUp(0.8, idx * 0.15)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="h-full"
              >
                <Card
                  glowColor="rgba(207, 157, 123, 0.12)"
                  className="p-6 md:p-8 bg-[#0C1519]/50 border border-white/6 flex flex-col justify-between h-full group"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 rounded-lg bg-primary-accent/5 border border-primary-accent/20 text-primary-accent group-hover:bg-primary-accent group-hover:text-primary-bg transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-mono text-[#CF9D7B] font-semibold">
                        {service.price}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white tracking-wide mb-3 uppercase group-hover:text-primary-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="flex flex-col gap-3 mb-8">
                      {service.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-text-muted leading-none">
                          <Check className="w-4 h-4 text-primary-accent flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact button */}
                  <div className="border-t border-white/5 pt-6 mt-auto">
                    <Button
                      variant="glow"
                      size="sm"
                      href="#contact"
                      className="w-full text-xs uppercase tracking-wider border-white/10 group-hover:border-primary-accent/40"
                    >
                      Enquire Operations
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;
