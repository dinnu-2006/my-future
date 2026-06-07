'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';

interface ThemeColor {
  name: string;
  label: string;
  primary: string;
  glow: string;
  bgGlow: string;
}

const THEME_CORES: ThemeColor[] = [
  {
    name: 'brass',
    label: 'ANTIQUE_BRASS',
    primary: '#CF9D7B',
    glow: '#724B39',
    bgGlow: 'rgba(207, 157, 123, 0.15)',
  },
  {
    name: 'bronze',
    label: 'WARM_BRONZE',
    primary: '#CD7F32',
    glow: '#804A1B',
    bgGlow: 'rgba(205, 127, 50, 0.15)',
  },
  {
    name: 'gold',
    label: 'CHAMPAGNE_GOLD',
    primary: '#D4AF37',
    glow: '#8C6D1F',
    bgGlow: 'rgba(212, 175, 55, 0.15)',
  },
  {
    name: 'platinum',
    label: 'PLATINUM_SILVER',
    primary: '#E5E4E2',
    glow: '#7F7F7F',
    bgGlow: 'rgba(229, 228, 226, 0.15)',
  },
];

export const ThemeSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCore, setActiveCore] = useState('brass');

  const applyCore = (core: ThemeColor) => {
    setActiveCore(core.name);
    localStorage.setItem('synapse-accent-core', core.name);

    // Apply values to HTML element style properties
    document.documentElement.style.setProperty('--primary-accent', core.primary);
    document.documentElement.style.setProperty('--accent-glow', core.glow);

    // Broadcast change for non-CSS React components (like Canvas)
    window.dispatchEvent(
      new CustomEvent('theme-accent-change', {
        detail: { primary: core.primary, glow: core.glow },
      })
    );
  };

  // Initialize theme from localStorage on load
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('synapse-accent-core');
    const core = THEME_CORES.find((c) => c.name === stored) || THEME_CORES[0];
    const frameId = requestAnimationFrame(() => {
      applyCore(core);
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden md:block">
      <div className="relative">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-14 left-0 p-3 rounded-xl bg-[#0C1519]/90 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md w-48 flex flex-col gap-2"
            >
              <div className="text-[10px] font-mono tracking-wider text-text-muted border-b border-white/5 pb-1.5 uppercase mb-1 flex items-center justify-between">
                <span>Select Reactor Core</span>
                <span className="animate-pulse text-primary-accent">●</span>
              </div>
              
              {THEME_CORES.map((core) => (
                <button
                   key={core.name}
                   onClick={() => applyCore(core)}
                   className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/[0.04] transition-all text-left font-mono text-[10px] group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-white/20 transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: core.primary,
                        boxShadow: `0 0 8px ${core.primary}`,
                      }}
                    />
                    <span className="text-white group-hover:text-primary-accent transition-colors">
                      {core.label}
                    </span>
                  </div>
                  {activeCore === core.name && (
                    <span className="text-[8px] font-bold text-primary-accent">
                      [ ACTIVE ]
                    </span>
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-xl border border-white/8 hover:border-primary-accent/30 bg-[#0C1519]/70 backdrop-blur-md flex items-center justify-center text-text-muted hover:text-primary-accent shadow-lg transition-all focus:outline-none cursor-pointer group"
          title="Reactor Core Color Configuration"
        >
          <Palette className="w-4 h-4 transition-transform group-hover:rotate-12" />
        </button>
      </div>
    </div>
  );
};

export default ThemeSelector;
