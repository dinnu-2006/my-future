'use client';

import React, { useRef, useEffect } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';

const hexToRgba = (hex: string, alpha: number) => {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) || 167;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 74;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const NeuralNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useMousePosition();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    mouseRef.current = mouse;
  }, [mouse]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let primaryColorHex = '#CF9D7B';
    let secondaryColorHex = '#724B39';

    // Get current root variable values if available in document
    if (typeof window !== 'undefined') {
      const style = getComputedStyle(document.documentElement);
      const accent = style.getPropertyValue('--primary-accent').trim();
      const glow = style.getPropertyValue('--accent-glow').trim();
      if (accent) primaryColorHex = accent;
      if (glow) secondaryColorHex = glow;
    }

    const handleThemeChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.primary) {
        primaryColorHex = detail.primary;
        secondaryColorHex = detail.glow || detail.primary;
      }
    };
    window.addEventListener('theme-accent-change', handleThemeChange);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isReduced = mediaQuery.matches;

    // Adapt particle count to viewport size
    const getParticleCount = () => {
      if (isReduced || window.innerWidth < 768) return 0;
      return 25;
    };

    interface DataFragment {
      x: number;
      y: number;
      text: string;
      vx: number;
      vy: number;
      alpha: number;
      alphaSpeed: number;
    }

    interface Pulse {
      x: number;
      y: number;
      r: number;
      maxR: number;
      alpha: number;
      speed: number;
    }

    let particleCount = getParticleCount();
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      alphaSpeed: number;
    }> = [];

    let dataFragments: DataFragment[] = [];
    const pulses: Pulse[] = [];
    const fragmentTexts = ['SYS_CORE', '0x7F', 'NET_A', '1011', 'AI_NODE', 'SYNAPSE', 'V4.0', 'LIVE', 'PORT_80', 'HOST_ONLINE', 'SEC_HTTPS'];

    const initParticles = () => {
      particles = [];
      particleCount = getParticleCount();
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          radius: Math.random() * 1.5 + 0.8,
          alpha: Math.random() * 0.5 + 0.1,
          alphaSpeed: (Math.random() - 0.5) * 0.005,
        });
      }

      dataFragments = [];
      if (window.innerWidth >= 768) {
        for (let i = 0; i < 6; i++) {
          dataFragments.push({
            x: Math.random() * width,
            y: Math.random() * height,
            text: fragmentTexts[Math.floor(Math.random() * fragmentTexts.length)],
            vx: (Math.random() - 0.5) * 0.08,
            vy: -(Math.random() * 0.12 + 0.04),
            alpha: Math.random() * 0.25 + 0.05,
            alphaSpeed: (Math.random() - 0.5) * 0.003,
          });
        }
      }
    };

    initParticles();

    const handleReducedChange = (e: MediaQueryListEvent) => {
      isReduced = e.matches;
      initParticles();
    };
    mediaQuery.addEventListener('change', handleReducedChange);

    // Trigger re-init on resize
    const handleResizeParticles = () => {
      handleResize();
      initParticles();
    };
    window.addEventListener('resize', handleResizeParticles);

    const draw = () => {
      if (particles.length === 0) {
        ctx.clearRect(0, 0, width, height);
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, width, height);

      const mX = mouseRef.current.x;
      const mY = mouseRef.current.y;

      // Update and draw particles (Constellation style with fading)
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Fading stars
        p.alpha += p.alphaSpeed;
        if (p.alpha < 0.05 || p.alpha > 0.6) p.alphaSpeed *= -1;

        // Bounce on boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Magnet logic: cursor attraction
        const dx = mX - p.x;
        const dy = mY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 180) {
          const force = (180 - dist) / 180;
          p.x += (dx / dist) * force * 0.2;
          p.y += (dy / dist) * force * 0.2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(primaryColorHex, p.alpha);
        ctx.fill();
      });

      // Connecting lines (Neural Network links)
      const maxDistance = 115;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const minAlpha = Math.min(p1.alpha, p2.alpha);
            const alpha = (1 - dist / maxDistance) * minAlpha * 0.4;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = hexToRgba(secondaryColorHex, alpha);
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw floating data fragments (only on desktop)
      if (window.innerWidth >= 768) {
        ctx.font = '7px monospace';
        dataFragments.forEach((f) => {
          f.y += f.vy;
          f.x += f.vx;
          f.alpha += f.alphaSpeed;
          if (f.alpha < 0.03 || f.alpha > 0.3) f.alphaSpeed *= -1;

          // Wrap top
          if (f.y < -15) {
            f.y = height + 15;
            f.x = Math.random() * width;
          }

          ctx.fillStyle = hexToRgba(primaryColorHex, f.alpha);
          ctx.fillText(f.text, f.x, f.y);
        });
      }

      // Spawn ambient pulses occasionally
      if (window.innerWidth >= 768 && Math.random() < 0.0025 && pulses.length < 2) {
        pulses.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 10,
          maxR: Math.random() * 180 + 120,
          alpha: 0.12,
          speed: Math.random() * 0.35 + 0.15,
        });
      }

      // Update and draw pulses
      pulses.forEach((pulse, pIdx) => {
        pulse.r += pulse.speed;
        pulse.alpha -= (pulse.speed / pulse.maxR) * 0.12;
        if (pulse.alpha <= 0 || pulse.r >= pulse.maxR) {
          pulses.splice(pIdx, 1);
          return;
        }

        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.r, 0, Math.PI * 2);
        ctx.strokeStyle = hexToRgba(primaryColorHex, pulse.alpha);
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('theme-accent-change', handleThemeChange);
      window.removeEventListener('resize', handleResizeParticles);
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleReducedChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.7 }}
      />
      {/* Ambient Moving Gradient Blobs for luxurious cinematic background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vh] rounded-full bg-gradient-to-tr from-[#CF9D7B]/[0.015] to-transparent blur-[120px] animate-[aurora-shift_25s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vh] rounded-full bg-gradient-to-bl from-[#724B39]/[0.02] to-transparent blur-[120px] animate-[aurora-shift_30s_ease-in-out_infinite_reverse]" />
      </div>
    </>
  );
};

export default NeuralNetwork;
