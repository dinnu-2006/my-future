'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence as FramerAnimatePresence, motion as framerMotion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Services from '@/components/sections/Services';
import Achievements from '@/components/sections/Achievements';
import Testimonials from '@/components/sections/Testimonials';
import Blog from '@/components/sections/Blog';
import Contact from '@/components/sections/Contact';
import NeuralNetwork from '@/components/effects/NeuralNetwork';
import FloatingOrb from '@/components/effects/FloatingOrb';
import AICursor from '@/components/effects/AICursor';
import ScrollBeam from '@/components/effects/ScrollBeam';
import DataStreams from '@/components/effects/DataStreams';
import DeveloperConsole from '@/components/ui/DeveloperConsole';
import CinematicIntro from '@/components/effects/CinematicIntro';

// Module-level flag to track if the cinematic intro has already played in this session.
// This prevents the intro from playing again during client-side page transitions.
let hasPlayedIntro = false;

export default function Home() {
  const [isLoading, setIsLoading] = useState(!hasPlayedIntro);
  const [consoleOpen, setConsoleOpen] = useState(false);

  // Hotkey handlers for Ctrl+K (command palette) and Ctrl+Shift+D (terminal mode)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setConsoleOpen((prev) => !prev);
      }
      // Ctrl+Shift+D
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setConsoleOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <FramerAnimatePresence mode="wait">
        {isLoading ? (
          <CinematicIntro
            key="loader"
            onComplete={() => {
              hasPlayedIntro = true;
              setIsLoading(false);
            }}
          />
        ) : (
          <framerMotion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative min-h-screen bg-[#030712]"
          >
            {/* Visual Canvas Effects */}
            <NeuralNetwork />
            <DataStreams />
            <FloatingOrb />
            <ScrollBeam />
            <AICursor />

            {/* Layout Navigation */}
            <Navbar onTerminalToggle={() => setConsoleOpen(true)} />

            {/* Main Sections */}
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Services />
              <Achievements />
              <Testimonials />
              <Blog />
              <Contact />
            </main>

            {/* Footer */}
            <Footer />

            {/* Developer Console Terminal overlay */}
            <DeveloperConsole isOpen={consoleOpen} onClose={() => setConsoleOpen(false)} />
          </framerMotion.div>
        )}
      </FramerAnimatePresence>
    </>
  );
}
