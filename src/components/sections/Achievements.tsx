'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { achievements } from '@/data/achievements';
import { Lock, Unlock, Award, CheckCircle, ExternalLink } from 'lucide-react';

const vaultCardVariants: Variants = {
  locked: {
    opacity: 0.45,
    scale: 0.96,
    filter: 'grayscale(100%)',
    borderColor: 'rgba(255, 255, 255, 0.05)',
    backgroundColor: 'rgba(3, 7, 18, 0.2)',
  },
  unlocked: {
    opacity: 1,
    scale: 1,
    filter: 'grayscale(0%)',
    borderColor: 'rgba(207, 157, 123, 0.25)',
    backgroundColor: 'rgba(7, 19, 26, 0.45)',
    transition: {
      type: 'spring' as const,
      damping: 20,
      stiffness: 120,
    }
  }
};

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-[#0C1519]">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-primary-accent/[0.015] blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Badge variant="primary" className="mb-3">
            Secure Credentials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white hover-glitch inline-block" data-text="Achievement Vault">
            Achievement Vault
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary-accent to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Vault Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item) => (
            <motion.div
              key={item.id}
              initial="locked"
              whileInView="unlocked"
              viewport={{ once: true, margin: '-80px' }}
              variants={vaultCardVariants}
              className="h-full rounded-xl overflow-hidden border pointer-events-auto transition-all duration-300 hover:border-[#CF9D7B]/30 hover:shadow-[0_0_20px_rgba(207,157,123,0.1)]"
            >
              {/* Inner wrapper simulating card layout with state shifts */}
              <div className="p-6 flex flex-col justify-between h-full relative group overflow-hidden">
                {/* Trophy shine sweep overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[trophy-sweep_1.2s_ease-out] pointer-events-none" />
                
                {/* Vault State Indicator (Lock/Unlock) */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-mono">
                  <motion.div
                    initial={{ rotate: -10 }}
                    whileInView={{ rotate: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-1 text-text-muted group-hover:text-primary-accent transition-colors"
                  >
                    <span className="text-[10px] uppercase tracking-widest text-text-muted group-hover:text-primary-accent font-semibold">
                      Unlocked
                    </span>
                    <Unlock className="w-3.5 h-3.5 text-primary-accent animate-pulse" />
                  </motion.div>
                </div>

                <div>
                  {/* Category */}
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#CF9D7B] mb-4 block">
                    {item.category}
                  </span>

                  {/* Title & Organization */}
                  <h3 className="text-lg font-bold text-white tracking-wide mb-1 group-hover:text-primary-accent transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-xs font-mono text-text-muted block mb-4">
                    {item.event} | {item.date}
                  </span>

                  {/* Description */}
                  <p className="text-sm text-text-muted leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Footer Badges / Links */}
                <div className="border-t border-white/5 pt-4 flex items-center justify-between mt-auto">
                  {item.valueBadge ? (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white px-2 py-0.5 rounded bg-white/5 border border-white/6">
                      {item.valueBadge}
                    </span>
                  ) : (
                    <div />
                  )}

                  {item.credentialUrl && (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-primary-accent hover:text-accent-glow flex items-center gap-1 group/link cursor-pointer"
                    >
                      Verify
                      <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Achievements;
