'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, RefreshCw } from 'lucide-react';

interface ThemeColor {
  name: string;
  label: string;
  primary: string;
  glow: string;
  bgGlow: string;
}

const THEME_CORES: ThemeColor[] = [
  {
    name: 'green',
    label: 'MATRIX_GREEN',
    primary: '#A7FF4A',
    glow: '#B7FF62',
    bgGlow: 'rgba(167, 255, 74, 0.15)',
  },
  {
    name: 'cyan',
    label: 'HYPER_CYAN',
    primary: '#00D2FF',
    glow: '#80F3FF',
    bgGlow: 'rgba(0, 210, 255, 0.15)',
  },
  {
    name: 'violet',
    label: 'NEON_VIOLET',
    primary: '#D500F9',
    glow: '#F180FF',
    bgGlow: 'rgba(213, 0, 249, 0.15)',
  },
  {
    name: 'orange',
    label: 'SOLAR_FLARE',
    primary: '#FFA800',
    glow: '#FFD580',
    bgGlow: 'rgba(255, 168, 0, 0.15)',
  },
  {
    name: 'crimson',
    label: 'CRIMSON_CORE',
    primary: '#FF1744',
    glow: '#FF8096',
    bgGlow: 'rgba(255, 23, 68, 0.15)',
  },
];

export const ThemeSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCore, setActiveCore] = useState('green');

  // Initialize theme from localStorage on load
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('synapse-accent-core');
    if (stored) {
      const core = THEME_CORES.find((c) => c.name === stored);
      if (core) {
        applyCore(core);
      }
    }
  }, []);

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
              className="absolute bottom-14 left-0 p-3 rounded-xl bg-[#030712]/90 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md w-48 flex flex-col gap-2"
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
          className="w-10 h-10 rounded-xl border border-white/8 hover:border-primary-accent/30 bg-[#030712]/70 backdrop-blur-md flex items-center justify-center text-text-muted hover:text-primary-accent shadow-lg transition-all focus:outline-none cursor-pointer group"
          title="Reactor Core Color Configuration"
        >
          <Palette className="w-4 h-4 transition-transform group-hover:rotate-12" />
        </button>
      </div>
    </div>
  );
};

export default ThemeSelector;
