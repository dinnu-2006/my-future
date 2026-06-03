'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicIntroProps {
  onComplete: () => void;
}

const hexToRgba = (hex: string, alpha: number) => {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) || 167;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 74;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [showLogo, setShowLogo] = useState(false);
  const [zoomOut, setZoomOut] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Get active theme colors
    let primaryColorHex = '#A7FF4A';
    let secondaryColorHex = '#00FFB2';

    if (typeof window !== 'undefined') {
      const style = getComputedStyle(document.documentElement);
      const accent = style.getPropertyValue('--primary-accent').trim();
      const glow = style.getPropertyValue('--accent-glow').trim();
      if (accent) primaryColorHex = accent;
      if (glow) secondaryColorHex = glow;
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Cursor position tracking
    let cursorX = width / 2;
    let cursorY = height / 2;
    const handleMouseMove = (e: MouseEvent) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particles creation
    const particleCount = 140;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      originalVx: number;
      originalVy: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      // Spawn particles distributed across screen
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        originalVx: 0,
        originalVy: 0,
        radius: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.4 + 0.1,
      });
      // Save original random velocities for fallback
      particles[i].originalVx = particles[i].vx;
      particles[i].originalVy = particles[i].vy;
    }

    // Central Core Node configuration
    let coreGlow = 0;
    let coreRadius = 4;
    let coreAlpha = 0;
    let corePulse = 0;

    // Timeline control
    let startTime = Date.now();
    let shockwaveRadius = 0;
    let shockwaveAlpha = 0;

    const draw = () => {
      const elapsed = (Date.now() - startTime) / 1000; // in seconds
      ctx.clearRect(0, 0, width, height);

      // Center coordinates
      const centerX = width / 2;
      const centerY = height / 2;

      // Phase control variables
      const isAttracting = elapsed >= 0.4 && elapsed < 1.1;
      const isCollapsing = elapsed >= 1.1 && elapsed < 1.35;
      const isExploded = elapsed >= 1.35;

      // 1. Ambient Background Darkening & Core Glow calculations
      if (elapsed < 0.4) {
        coreAlpha = elapsed / 0.4; // fade core in
      }

      // Draw the central node (if not collapsed)
      if (coreAlpha > 0 && !isExploded) {
        corePulse = Math.sin(Date.now() * 0.008) * 2;
        const currentCoreRadius = Math.max(0.1, coreRadius + corePulse);
        
        // Draw glow ring
        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, currentCoreRadius * 6
        );
        gradient.addColorStop(0, hexToRgba(primaryColorHex, 0.4 * coreAlpha));
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, currentCoreRadius * 6, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core Solid Dot
        ctx.beginPath();
        ctx.arc(centerX, centerY, currentCoreRadius, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(primaryColorHex, coreAlpha);
        ctx.fill();
      }

      // Draw particles and update them
      particles.forEach((p, idx) => {
        if (isCollapsing) {
          // Phase 3: Collapse inward rapidly to center
          const dx = centerX - p.x;
          const dy = centerY - p.y;
          p.x += dx * 0.16;
          p.y += dy * 0.16;
          p.radius = Math.max(0.2, p.radius * 0.95);
          p.alpha = Math.min(1.0, p.alpha + 0.05);
          
          // Core shrink
          coreRadius = Math.max(0, coreRadius - 0.25);
        } else if (isAttracting) {
          // Phase 2: Attract to central core
          const dx = centerX - p.x;
          const dy = centerY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist > 10) {
            // Apply gravitational pull force
            const pull = 0.8 / (dist * 0.015);
            p.x += (dx / dist) * Math.min(3.5, pull);
            p.y += (dy / dist) * Math.min(3.5, pull);
            p.alpha = Math.min(0.85, p.alpha + 0.01);
          }
        } else if (isExploded) {
          // Phase 4: Shockwave explosion - push particles outwards radially
          if (p.vx === p.originalVx) {
            // Re-assign explosive velocity vector based on angle from center
            const dx = p.x - centerX;
            const dy = p.y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.2;
            const force = (Math.random() * 12 + 6);
            p.vx = Math.cos(angle) * force;
            p.vy = Math.sin(angle) * force;
            p.radius = Math.random() * 1.8 + 0.7; // Restore radius
          }

          // Apply friction/decay to outward burst
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.92;
          p.vy *= 0.92;
          p.alpha -= 0.015; // Fade out exploded particles
        } else {
          // Phase 1: Ambient drift
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }

        // Mouse attraction in ambient phase
        if (!isCollapsing && !isExploded) {
          const dx = cursorX - p.x;
          const dy = cursorY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const pull = (120 - dist) / 120;
            p.x += (dx / dist) * pull * 0.5;
            p.y += (dy / dist) * pull * 0.5;
            // Brighten near cursor
            p.alpha = Math.min(0.9, p.alpha + 0.03);
          }
        }

        // Draw particle
        if (p.alpha > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = hexToRgba(primaryColorHex, p.alpha);
          ctx.fill();
        }
      });

      // 2. Draw connections (neural network strings)
      if (!isExploded) {
        const maxDist = 95;
        // Soft pulsing network alpha limit
        const networkAlphaMultiplier = isAttracting 
          ? 1.0 
          : 0.45 + Math.sin(Date.now() * 0.003) * 0.15;

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];

            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.15 * Math.min(p1.alpha, p2.alpha) * networkAlphaMultiplier;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = hexToRgba(secondaryColorHex, alpha);
              ctx.lineWidth = 0.55;
              ctx.stroke();
            }
          }
        }
      }

      // 3. Shockwave rendering
      if (isExploded) {
        if (shockwaveRadius === 0) {
          shockwaveRadius = 1;
          shockwaveAlpha = 0.85;
          // Trigger logo fade-in exactly at shockwave
          setShowLogo(true);
        }

        shockwaveRadius += (width * 0.8 - shockwaveRadius) * 0.07;
        shockwaveAlpha -= 0.022;

        if (shockwaveAlpha > 0) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, shockwaveRadius, 0, Math.PI * 2);
          ctx.strokeStyle = hexToRgba(primaryColorHex, shockwaveAlpha);
          ctx.lineWidth = 2.5;
          
          // Outer blur path shadow
          ctx.shadowColor = primaryColorHex;
          ctx.shadowBlur = 12;
          ctx.stroke();
          ctx.shadowBlur = 0; // Reset
        }
      }

      // 4. Trigger Zoom Out and Complete transitions
      if (elapsed >= 1.95 && !zoomOut) {
        setZoomOut(true);
      }

      if (elapsed >= 2.35) {
        onComplete();
        return; // Terminate animation loop
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Begin render loop
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete, zoomOut]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#02050d] overflow-hidden flex items-center justify-center pointer-events-none select-none"
    >
      {/* Visual Canvas Backdrop */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Cinematic Logo Materializer */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.84, filter: 'blur(15px)' }}
            animate={zoomOut 
              ? { opacity: 0, scale: 1.35, filter: 'blur(20px)' } 
              : { opacity: 1, scale: 1.0, filter: 'blur(0px)' }
            }
            transition={zoomOut
              ? { duration: 0.45, ease: [0.33, 1, 0.68, 1] }
              : { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
            }
            className="z-10 text-center relative flex flex-col items-center gap-1.5"
          >
            {/* Glowing Backdrop Ring */}
            <div className="absolute inset-0 -m-8 rounded-full bg-primary-accent/[0.04] blur-3xl pointer-events-none" />

            <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-[0.25em] font-sans text-white select-none drop-shadow-[0_0_20px_rgba(167,255,74,0.15)]">
              Synapse<span className="text-primary-accent">.core</span>
            </h1>
            
            <span className="text-[9px] md:text-[10px] uppercase font-mono tracking-[0.45em] text-text-muted/70 block mt-2">
              Artificial Intelligence awakened
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CinematicIntro;
