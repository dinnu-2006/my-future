'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

const hexToRgba = (hex: string, alpha: number) => {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) || 167;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 74;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const AICursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useMousePosition();
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animFrame = requestAnimationFrame(() => {
      setReducedMotion(mediaQuery.matches);
    });
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  useEffect(() => {
    mouseRef.current = mouse;
    if (!isVisible && (mouse.x > 0 || mouse.y > 0)) {
      const animFrame = requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return () => cancelAnimationFrame(animFrame);
    }
  }, [mouse, isVisible]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (reducedMotion || isMobile) {
      document.body.classList.remove('custom-cursor-active');
      return;
    }

    // Add CSS class to body to hide default cursor
    document.body.classList.add('custom-cursor-active');

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let primaryColorHex = '#CF9D7B';
    let secondaryColorHex = '#724B39';

    // Get current root variables if available
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

    // Event listeners to handle window resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const ripples: Ripple[] = [];
    
    // Main cursor trail position tracking (lerped position)
    let trailX = mouseRef.current.x;
    let trailY = mouseRef.current.y;

    // Detect click to spawn ripples & sparks
    const handleClick = (e: MouseEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 2,
        maxRadius: 32,
        alpha: 0.85,
      });

      // Spawn click sparks
      for (let i = 0; i < 8; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3.5 + 2.0;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1.0,
          size: Math.random() * 2.0 + 1.5,
        });
      }
    };
    window.addEventListener('click', handleClick);

    // Track when mouse leaves viewport
    const handleMouseLeaveViewport = () => setIsVisible(false);
    const handleMouseEnterViewport = () => setIsVisible(true);
    document.addEventListener('mouseleave', handleMouseLeaveViewport);
    document.addEventListener('mouseenter', handleMouseEnterViewport);

    // Detect hover on links/buttons
    const handleMouseEnterElement = () => setIsHovering(true);
    const handleMouseLeaveElement = () => setIsHovering(false);

    const addHoverListeners = () => {
      const targets = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .interactive-hover');
      targets.forEach((target) => {
        target.removeEventListener('mouseenter', handleMouseEnterElement);
        target.removeEventListener('mouseleave', handleMouseLeaveElement);
        target.addEventListener('mouseenter', handleMouseEnterElement);
        target.addEventListener('mouseleave', handleMouseLeaveElement);
      });
    };

    // Periodically search for new elements (in case routing/re-rendering occurs)
    const interval = setInterval(addHoverListeners, 1000);
    addHoverListeners();

    // Spawning particles on cursor move
    let lastSpawnX = 0;
    let lastSpawnY = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (!isVisible) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      const currentX = mouseRef.current.x;
      const currentY = mouseRef.current.y;

      // Spawn particles when cursor moves significantly
      const distMoved = Math.sqrt(Math.pow(currentX - lastSpawnX, 2) + Math.pow(currentY - lastSpawnY, 2));
      if (distMoved > 8) {
        particles.push({
          x: currentX,
          y: currentY,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          alpha: 0.8,
          size: Math.random() * 1.5 + 1.0,
        });
        lastSpawnX = currentX;
        lastSpawnY = currentY;
      }

      // Limit particle count
      if (particles.length > 20) {
        particles.splice(0, particles.length - 20);
      }

      // Update and Draw Particles (Green Glow Dust)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;
        p.size -= 0.02;

        if (p.alpha <= 0 || p.size <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(primaryColorHex, p.alpha);
        ctx.shadowColor = secondaryColorHex;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow blur
      }

      // Update and Draw Click Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += (r.maxRadius - r.radius) * 0.12;
        r.alpha -= 0.035;

        if (r.alpha <= 0 || r.radius >= r.maxRadius - 0.5) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = hexToRgba(primaryColorHex, r.alpha);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Smooth lag target trailing circle (linear interpolation)
      const lerpFactor = 0.15;
      trailX += (currentX - trailX) * lerpFactor;
      trailY += (currentY - trailY) * lerpFactor;

      // Draw Custom Futuristic HUD Reticle Bracket Corners
      if (isHovering) {
        // Draw rotating dashed inner ring (representing hover distortion/HUD interaction)
        ctx.save();
        ctx.translate(trailX, trailY);
        ctx.rotate(Date.now() * 0.0025);
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.strokeStyle = hexToRgba(primaryColorHex, 0.4);
        ctx.lineWidth = 0.8;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.restore();

        // Draw 4 corner brackets around the pointer
        const bSize = 6;
        const bOffset = 22; // Distance from center
        ctx.strokeStyle = primaryColorHex;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = primaryColorHex;
        ctx.shadowBlur = 6;

        // Top Left [
        ctx.beginPath();
        ctx.moveTo(trailX - bOffset + bSize, trailY - bOffset);
        ctx.lineTo(trailX - bOffset, trailY - bOffset);
        ctx.lineTo(trailX - bOffset, trailY - bOffset + bSize);
        ctx.stroke();

        // Top Right ]
        ctx.beginPath();
        ctx.moveTo(trailX + bOffset - bSize, trailY - bOffset);
        ctx.lineTo(trailX + bOffset, trailY - bOffset);
        ctx.lineTo(trailX + bOffset, trailY - bOffset + bSize);
        ctx.stroke();

        // Bottom Left [
        ctx.beginPath();
        ctx.moveTo(trailX - bOffset + bSize, trailY + bOffset);
        ctx.lineTo(trailX - bOffset, trailY + bOffset);
        ctx.lineTo(trailX - bOffset, trailY + bOffset - bSize);
        ctx.stroke();

        // Bottom Right ]
        ctx.beginPath();
        ctx.moveTo(trailX + bOffset - bSize, trailY + bOffset);
        ctx.lineTo(trailX + bOffset, trailY + bOffset);
        ctx.lineTo(trailX + bOffset, trailY + bOffset - bSize);
        ctx.stroke();

        ctx.shadowBlur = 0; // Reset
      } else {
        // Normal outer tracking circle
        ctx.beginPath();
        ctx.arc(trailX, trailY, 10, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw Main Dot center (the physical pointer)
      ctx.beginPath();
      ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
      ctx.fillStyle = primaryColorHex;
      ctx.shadowColor = primaryColorHex;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0; // Reset

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      clearInterval(interval);
      window.removeEventListener('theme-accent-change', handleThemeChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('mouseleave', handleMouseLeaveViewport);
      document.removeEventListener('mouseenter', handleMouseEnterViewport);
      document.body.classList.remove('custom-cursor-active');
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, isHovering, reducedMotion, isMobile]);

  if (reducedMotion || isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] hidden md:block"
    />
  );
};

export default AICursor;
