'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Projects from '@/components/sections/Projects';
import NeuralNetwork from '@/components/effects/NeuralNetwork';
import DataStreams from '@/components/effects/DataStreams';
import AICursor from '@/components/effects/AICursor';
import ScrollBeam from '@/components/effects/ScrollBeam';
import DeveloperConsole from '@/components/ui/DeveloperConsole';
import { useState, useEffect } from 'react';

export default function ProjectsPage() {
  const [consoleOpen, setConsoleOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setConsoleOpen((prev) => !prev);
      }
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setConsoleOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0C1519]">
      {/* Background canvas visuals */}
      <NeuralNetwork />
      <DataStreams />
      <ScrollBeam />
      <AICursor />

      {/* Navigation */}
      <Navbar onTerminalToggle={() => setConsoleOpen(true)} />

      {/* Main projects container */}
      <main className="pt-20">
        <Projects />
      </main>

      {/* Footer */}
      <Footer />

      {/* Command Palette */}
      <DeveloperConsole isOpen={consoleOpen} onClose={() => setConsoleOpen(false)} />
    </div>
  );
}
