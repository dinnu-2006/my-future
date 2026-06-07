'use client';

import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle class for orbiting blackhole
    interface BlackholeParticle {
      angle: number;
      distance: number;
      speed: number;
      size: number;
      color: string;
    }

    const particles: BlackholeParticle[] = [];
    const particleCount = 200;

    for (let i = 0; i < particleCount; i++) {
      // Random starting parameters
      particles.push({
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * 300 + 40,
        speed: Math.random() * 0.02 + 0.005,
        size: Math.random() * 1.5 + 0.5,
        color: Math.random() > 0.4 ? '#CF9D7B' : '#CF9D7B', // Green/Teal
      });
    }

    let frameId: number;
    const draw = () => {
      // Create trailing opacity fade to simulate velocity blur
      ctx.fillStyle = 'rgba(3, 7, 18, 0.15)';
      ctx.fillRect(0, 0, width, height);

      // Draw blackhole core
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 35, 0, Math.PI * 2);
      ctx.fillStyle = '#0C1519';
      ctx.shadowColor = '#CF9D7B';
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0; // Reset

      particles.forEach((p) => {
        // Orbit update
        p.angle -= p.speed;
        
        // Gravitational pull: pull inward slightly
        p.distance -= 0.35;

        // Reset if sucked into singularity
        if (p.distance < 36) {
          p.distance = Math.random() * 300 + 150;
          p.angle = Math.random() * Math.PI * 2;
        }

        // Compute polar coordinates
        const x = width / 2 + Math.cos(p.angle) * p.distance;
        const y = height / 2 + Math.sin(p.angle) * p.distance;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      frameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#0C1519] overflow-hidden flex items-center justify-center font-mono select-none">
      {/* Particle Blackhole Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Main Warning Interface */}
      <div className="relative z-10 p-6 md:p-10 glass-card bg-[#162127]/70 border-red-500/20 max-w-md w-full text-center flex flex-col items-center gap-6 shadow-[0_0_50px_rgba(239,68,68,0.06)]">
        
        <div className="p-3 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 animate-pulse">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold uppercase tracking-wider text-white">
            Coordinates Lost
          </h1>
          <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest">
            Error_404: Directory_Null
          </span>
        </div>

        <p className="text-xs text-text-muted leading-relaxed">
          The neural connection was severed. The coordinates you targeted have been sucked into the singularity.
        </p>

        <Button
          variant="glow"
          href="/"
          className="w-full flex items-center justify-center gap-2 text-xs uppercase tracking-wider border-white/10 hover:border-red-500/30 hover:text-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.1)] py-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Base
        </Button>
      </div>
    </div>
  );
}
