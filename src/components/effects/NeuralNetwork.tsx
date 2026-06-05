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

    // Adapt particle count to viewport size
    const getParticleCount = () => {
      const area = window.innerWidth * window.innerHeight;
      return Math.min(100, Math.floor(area / 18000));
    };

    let particleCount = getParticleCount();
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const initParticles = () => {
      particles = [];
      particleCount = getParticleCount();
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 0.8,
        });
      }
    };

    initParticles();

    // Trigger re-init on resize
    const handleResizeParticles = () => {
      handleResize();
      initParticles();
    };
    window.addEventListener('resize', handleResizeParticles);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const mX = mouseRef.current.x;
      const mY = mouseRef.current.y;

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Magnet logic: cursor attraction
        const dx = mX - p.x;
        const dy = mY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 180) {
          const force = (180 - dist) / 180;
          p.x += (dx / dist) * force * 0.25;
          p.y += (dy / dist) * force * 0.25;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(primaryColorHex, 0.3);
        ctx.fill();
      });

      // Connecting lines
      const maxDistance = 115;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = hexToRgba(secondaryColorHex, alpha);
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('theme-accent-change', handleThemeChange);
      window.removeEventListener('resize', handleResizeParticles);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
};

export default NeuralNetwork;
