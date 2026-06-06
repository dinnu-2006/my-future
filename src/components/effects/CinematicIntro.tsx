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

const DIAGNOSTIC_LOGS = [
  { time: 0.15, text: "SYNAPSE.CORE INITIALIZING... [OK]" },
  { time: 0.50, text: "LOADING NEURAL NETWORKS... [OK]" },
  { time: 0.90, text: "CONNECTING MODULES... [OK]" },
  { time: 1.30, text: "AUTHENTICATING SYSTEM... [OK]" },
  { time: 1.75, text: "ACCESS GRANTED // SYSTEM BOOT COMPLETED" }
];

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [showLogo, setShowLogo] = useState(false);
  const [zoomOut, setZoomOut] = useState(false);
  const [scrambledTitle, setScrambledTitle] = useState("");
  const [scrambledSub, setScrambledSub] = useState("");
  const [bootPhase, setBootPhase] = useState(0);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const timer1 = setTimeout(() => setBootPhase(1), 400);
    const timer2 = setTimeout(() => setBootPhase(2), 800);
    const timer3 = setTimeout(() => setBootPhase(3), 1200);
    const timer4 = setTimeout(() => setBootPhase(4), 1600);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  // Immediate completion if prefers-reduced-motion is active
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onCompleteRef.current();
    }
  }, []);

  // Handle Logo Scrambling / Decrypt animation
  useEffect(() => {
    if (!showLogo) return;

    const finalTitle = "DINESH P.core";
    const finalSub = "SYSTEM INITIALIZED // WEB & AI DEVELOPER";
    const chars = "X01@#%&+?[]{}<>";

    let frame = 0;
    const maxFrames = 30;

    const interval = setInterval(() => {
      // Scramble Title
      let newTitle = "";
      for (let i = 0; i < finalTitle.length; i++) {
        if (finalTitle[i] === " " || finalTitle[i] === ".") {
          newTitle += finalTitle[i];
          continue;
        }
        const revealFrame = (i / finalTitle.length) * maxFrames * 0.7;
        if (frame >= revealFrame) {
          newTitle += finalTitle[i];
        } else {
          newTitle += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setScrambledTitle(newTitle);

      // Scramble Subtitle
      let newSub = "";
      for (let i = 0; i < finalSub.length; i++) {
        if (finalSub[i] === " " || finalSub[i] === "/") {
          newSub += finalSub[i];
          continue;
        }
        const revealFrame = (i / finalSub.length) * maxFrames * 0.8 + maxFrames * 0.25;
        if (frame >= revealFrame) {
          newSub += finalSub[i];
        } else {
          newSub += chars[Math.floor(Math.random() * chars.length)].toLowerCase();
        }
      }
      setScrambledSub(newSub);

      frame++;
      if (frame >= maxFrames) {
        setScrambledTitle(finalTitle);
        setScrambledSub(finalSub);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [showLogo]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Get active theme colors
    let primaryColorHex = '#CF9D7B';
    let secondaryColorHex = '#724B39';

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
    const particleCount = 25;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      angle: number;
      orbitRadius: number;
      isOrbiter: boolean;
      originalVx: number;
      originalVy: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      // 30% of particles behave like a rotating particle accelerator ring
      const isOrbiter = i < particleCount * 0.35;
      let pX = Math.random() * width;
      let pY = Math.random() * height;
      let angle = Math.random() * Math.PI * 2;
      let orbitRadius = Math.random() * 80 + 120;

      if (isOrbiter) {
        pX = width / 2 + Math.cos(angle) * orbitRadius;
        pY = height / 2 + Math.sin(angle) * orbitRadius;
      }

      particles.push({
        x: pX,
        y: pY,
        vx: isOrbiter ? 0 : (Math.random() - 0.5) * 0.9,
        vy: isOrbiter ? 0 : (Math.random() - 0.5) * 0.9,
        radius: Math.random() * 1.6 + 0.7,
        alpha: Math.random() * 0.5 + 0.15,
        angle: angle,
        orbitRadius: orbitRadius,
        isOrbiter: isOrbiter,
        originalVx: 0,
        originalVy: 0,
      });

      particles[i].originalVx = particles[i].vx;
      particles[i].originalVy = particles[i].vy;
    }

    // Central Core configuration
    let coreRadius = 4;
    let coreAlpha = 0;
    let corePulse = 0;

    // Timeline control
    const startTime = Date.now();
    let shockwaveRadius = 0;
    let shockwaveAlpha = 0;
    let zoomOutTriggered = false;

    const draw = () => {
      const elapsed = (Date.now() - startTime) / 1000; // in seconds
      ctx.clearRect(0, 0, width, height);
      
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Phase definitions
      const isAttracting = elapsed >= 1.0 && elapsed < 1.75;
      const isCollapsing = elapsed >= 1.75 && elapsed < 2.05;
      const isExploded = elapsed >= 2.05;
      
      // 1. Grid Background (with shockwave displacement ripple)
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.012)';
      ctx.lineWidth = 0.5;
      const gridSize = 45;
      
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y < height; y += 15) {
          let drawX = x;
          let drawY = y;
          if (isExploded) {
            const dx = x - centerX;
            const dy = y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const distToShockwave = Math.abs(dist - shockwaveRadius);
            if (distToShockwave < 120 && dist > 1) {
              const strength = (120 - distToShockwave) / 120 * shockwaveAlpha * 22;
              drawX += (dx / dist) * strength;
              drawY += (dy / dist) * strength;
            }
          }
          if (y === 0) ctx.moveTo(drawX, drawY);
          else ctx.lineTo(drawX, drawY);
        }
        ctx.stroke();
      }
      
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x < width; x += 15) {
          let drawX = x;
          let drawY = y;
          if (isExploded) {
            const dx = x - centerX;
            const dy = y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const distToShockwave = Math.abs(dist - shockwaveRadius);
            if (distToShockwave < 120 && dist > 1) {
              const strength = (120 - distToShockwave) / 120 * shockwaveAlpha * 22;
              drawX += (dx / dist) * strength;
              drawY += (dy / dist) * strength;
            }
          }
          if (x === 0) ctx.moveTo(drawX, drawY);
          else ctx.lineTo(drawX, drawY);
        }
        ctx.stroke();
      }
      ctx.restore();
      
      // 2. Spinning Calibration HUD Circles
      if (!isExploded) {
        const HUDAlpha = isCollapsing
          ? Math.max(0, 1 - (elapsed - 1.75) / 0.3)
          : Math.min(0.22, elapsed / 0.8);
          
        ctx.save();
        ctx.strokeStyle = hexToRgba(primaryColorHex, HUDAlpha);
        ctx.lineWidth = 0.8;
        ctx.translate(centerX, centerY);
        
        // Dashed Ring 1 (rotates clockwise)
        ctx.save();
        ctx.rotate(elapsed * 0.45);
        ctx.beginPath();
        ctx.arc(0, 0, 75, 0, Math.PI * 2);
        ctx.setLineDash([5, 12]);
        ctx.stroke();
        ctx.restore();
        
        // Dashed Ring 2 (rotates counter-clockwise)
        ctx.save();
        ctx.rotate(-elapsed * 0.3);
        ctx.beginPath();
        ctx.arc(0, 0, 105, 0, Math.PI * 2);
        ctx.setLineDash([12, 18]);
        ctx.stroke();
        ctx.restore();
        
        // Outer brackets (slow rotation)
        ctx.save();
        ctx.rotate(elapsed * 0.15);
        ctx.beginPath();
        ctx.arc(0, 0, 125, 0, Math.PI * 0.2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, 125, Math.PI, Math.PI * 1.2);
        ctx.stroke();
        ctx.restore();
        
        ctx.restore();
      }
      
      // 3. Central Core Node
      if (elapsed < 1.0) {
        coreAlpha = elapsed / 1.0;
      }
      if (isCollapsing) {
        coreRadius = Math.max(0.1, 4 + (elapsed - 1.75) * 22); // Core swells right before collapse
      }
      
      if (coreAlpha > 0 && !isExploded) {
        corePulse = Math.sin(Date.now() * 0.009) * 1.5;
        const currentCoreRadius = Math.max(0.1, coreRadius + corePulse);
        
        // Inner core glow
        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, currentCoreRadius * 7
        );
        gradient.addColorStop(0, hexToRgba(primaryColorHex, 0.45 * coreAlpha));
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, currentCoreRadius * 7, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Solid core
        ctx.beginPath();
        ctx.arc(centerX, centerY, currentCoreRadius * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(primaryColorHex, coreAlpha);
        ctx.fill();
      }
      
      // 4. Update and Draw Particles
      particles.forEach((p) => {
        if (isExploded) {
          // Explosion Phase: burst outward radially with velocity decay and trail lines
          if (p.vx === p.originalVx && !p.isOrbiter) {
            const dx = p.x - centerX;
            const dy = p.y - centerY;
            const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.25;
            const force = Math.random() * 14 + 7;
            p.vx = Math.cos(angle) * force;
            p.vy = Math.sin(angle) * force;
            p.radius = Math.random() * 1.8 + 0.7;
          } else if (p.isOrbiter) {
            // Orbiters burst outwards with extreme energy
            const angle = p.angle + (Math.random() - 0.5) * 0.15;
            const force = Math.random() * 18 + 10;
            p.vx = Math.cos(angle) * force;
            p.vy = Math.sin(angle) * force;
            p.isOrbiter = false; // convert to standard explosive particle
          }
          
          // Apply kinetic energy movement
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.93;
          p.vy *= 0.93;
          p.alpha -= 0.015; // fade out quickly
          
          // Draw spark trails
          if (p.alpha > 0) {
            ctx.beginPath();
            ctx.moveTo(p.x - p.vx * 1.6, p.y - p.vy * 1.6);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = hexToRgba(primaryColorHex, p.alpha * 0.75);
            ctx.lineWidth = p.radius * 0.8;
            ctx.stroke();
          }
        } else if (isCollapsing) {
          // Collapse Phase: Particles get sucked into central singularity using spiral vortex
          const dx = p.x - centerX;
          const dy = p.y - centerY;
          let dist = Math.sqrt(dx * dx + dy * dy);
          let pAngle = Math.atan2(dy, dx);
          
          if (dist > 1) {
            // Spiral velocity
            dist -= dist * 0.18;
            pAngle += 0.12;
            
            p.x = centerX + Math.cos(pAngle) * dist;
            p.y = centerY + Math.sin(pAngle) * dist;
            p.alpha = Math.min(1.0, p.alpha + 0.06);
            p.radius = Math.max(0.2, p.radius * 0.94);
          }
        } else if (isAttracting) {
          // Attraction Phase: particles start orbiting or heading towards center
          const dx = centerX - p.x;
          const dy = centerY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist > 15) {
            const pull = 1.3 / (dist * 0.012);
            p.x += (dx / dist) * Math.min(4.0, pull);
            p.y += (dy / dist) * Math.min(4.0, pull);
            p.alpha = Math.min(0.85, p.alpha + 0.012);
          }
          
          if (p.isOrbiter) {
            // Accelerate rotating particles on orbit
            p.angle += 0.035;
            p.x = centerX + Math.cos(p.angle) * p.orbitRadius;
            p.y = centerY + Math.sin(p.angle) * p.orbitRadius;
          }
        } else {
          // Ambient Phase: drift and rotate accelerator ring
          if (p.isOrbiter) {
            p.angle += 0.015;
            p.x = centerX + Math.cos(p.angle) * p.orbitRadius;
            p.y = centerY + Math.sin(p.angle) * p.orbitRadius;
          } else {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
          }
          
          // Cursor interactive pull
          const dx = cursorX - p.x;
          const dy = cursorY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const pull = (130 - dist) / 130;
            p.x += (dx / dist) * pull * 0.6;
            p.y += (dy / dist) * pull * 0.6;
            p.alpha = Math.min(0.9, p.alpha + 0.02);
          }
        }
        
        // Draw particle dot (only if not drawing spark trails in explosion phase)
        if (!isExploded && p.alpha > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = hexToRgba(primaryColorHex, p.alpha);
          ctx.fill();
        }
      });
      
      // 5. Drawing Neural Network String Connections
      if (!isExploded && !isCollapsing) {
        const maxDist = 92;
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
              const alpha = (1 - dist / maxDist) * 0.16 * Math.min(p1.alpha, p2.alpha) * networkAlphaMultiplier;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = hexToRgba(secondaryColorHex, alpha);
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }
      
      // 6. Draw Diagnostic logs overlay in the Canvas (Bottom Left)
      ctx.save();
      ctx.font = '9px "Courier New", Courier, monospace';
      ctx.textBaseline = 'top';
      
      const activeLogs = DIAGNOSTIC_LOGS.filter(log => elapsed >= log.time);
      const boxWidth = 320;
      const boxHeight = 145;
      const startX = 35;
      const startY = height - boxHeight - 35;
      
      if (!isExploded) {
        const diagnosticsAlpha = Math.min(0.7, elapsed / 0.4);
        
        // Border and Brackets
        ctx.strokeStyle = hexToRgba(primaryColorHex, 0.12 * diagnosticsAlpha);
        ctx.strokeRect(startX, startY, boxWidth, boxHeight);
        
        ctx.fillStyle = hexToRgba(primaryColorHex, 0.45 * diagnosticsAlpha);
        ctx.fillText("SYSTEM CORE DIAGNOSTICS //", startX + 12, startY - 14);
        
        activeLogs.forEach((log, index) => {
          const lineY = startY + 12 + index * 12;
          let text = `> ${log.text}`;
          if (index === activeLogs.length - 1 && Math.floor(Date.now() / 150) % 2 === 0) {
            text += " █";
          }
          ctx.fillStyle = index === activeLogs.length - 1
            ? hexToRgba(primaryColorHex, 0.9 * diagnosticsAlpha)
            : hexToRgba(primaryColorHex, 0.5 * diagnosticsAlpha);
          ctx.fillText(text, startX + 12, lineY);
        });
      }
      ctx.restore();
      
      // 7. Shockwave detonation ring & secondary echo rings
      if (isExploded) {
        if (shockwaveRadius === 0) {
          shockwaveRadius = 1;
          shockwaveAlpha = 0.85;
          setShowLogo(true);
        }
        
        shockwaveRadius += (width * 0.9 - shockwaveRadius) * 0.06;
        shockwaveAlpha -= 0.018;
        
        if (shockwaveAlpha > 0) {
          // Neon shockwave
          ctx.save();
          ctx.beginPath();
          ctx.arc(centerX, centerY, shockwaveRadius, 0, Math.PI * 2);
          ctx.strokeStyle = hexToRgba(primaryColorHex, shockwaveAlpha);
          ctx.lineWidth = 3.0;
          ctx.shadowColor = primaryColorHex;
          ctx.shadowBlur = 15;
          ctx.stroke();
          ctx.restore();
          
          // Secondary echo wave (slightly smaller and cyan)
          ctx.save();
          ctx.beginPath();
          ctx.arc(centerX, centerY, Math.max(1, shockwaveRadius - 55), 0, Math.PI * 2);
          ctx.strokeStyle = hexToRgba(secondaryColorHex, shockwaveAlpha * 0.65);
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        }
      }
      
      // 8. Timed Transitions to zoom-out and wrap-up
      if (elapsed >= 3.0 && !zoomOutTriggered) {
        zoomOutTriggered = true;
        setZoomOut(true);
      }
      
      if (elapsed >= 3.8) {
        onCompleteRef.current();
        return; // Break animation loop
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    // Initialize animation loop
    draw();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#0C1519] overflow-hidden flex items-center justify-center select-none"
    >
      {/* Sci-Fi Canvas Scene */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Grid Scanline Scan overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.008] to-transparent bg-[size:100%_6px] animate-pulse" />

      {/* Central High-Tech Boot Terminal */}
      <AnimatePresence>
        {!showLogo && (
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="z-20 max-w-sm w-[90%] p-6 rounded-xl font-mono text-[10px] md:text-xs text-left backdrop-blur-lg bg-[#0C1519]/60 border border-[#CF9D7B]/20 shadow-[0_0_40px_rgba(207,157,123,0.08)] flex flex-col gap-3 relative select-none pointer-events-auto"
            style={{
              clipPath: 'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)'
            }}
          >
            {/* HUD Corner Decorations */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#CF9D7B] opacity-60" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#CF9D7B] opacity-60" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#CF9D7B] opacity-60" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#CF9D7B] opacity-60" />

            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[8px] uppercase tracking-widest text-[#B9ACA3] mb-1">
              <span>SYNAPSE INTERFACE</span>
              <span className="animate-pulse">SYS_BOOT_V4.0</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {bootPhase >= 0 && (
                <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="text-[#CF9D7B]">&gt;</span> SYNAPSE.CORE INITIALIZING...
                </motion.div>
              )}
              {bootPhase >= 1 && (
                <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="text-[#CF9D7B]">&gt;</span> LOADING NEURAL NETWORKS... <span className="text-[#CF9D7B] animate-pulse">LOADED</span>
                </motion.div>
              )}
              {bootPhase >= 2 && (
                <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="text-[#CF9D7B]">&gt;</span> CONNECTING MODULES... <span className="text-emerald-400">100%</span>
                </motion.div>
              )}
              {bootPhase >= 3 && (
                <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="text-[#CF9D7B]">&gt;</span> AUTHENTICATING SYSTEM... <span className="text-emerald-400">SECURE</span>
                </motion.div>
              )}
              {bootPhase >= 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="text-emerald-400 font-bold tracking-wider border-t border-white/5 pt-2 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ACCESS GRANTED
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decrypting Glowing Logo Container */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(16px)' }}
            animate={zoomOut
              ? { opacity: 0, scale: 1.25, filter: 'blur(18px)' }
              : { opacity: 1, scale: 1.0, filter: 'blur(0px)' }
            }
            transition={zoomOut
              ? { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
              : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
            }
            className="z-20 text-center relative flex flex-col items-center gap-1"
          >
            {/* Supernova core light bulb backdrop */}
            <div className="absolute inset-0 -m-12 rounded-full bg-primary-accent/[0.04] blur-3xl pointer-events-none" />

            {/* Glowing calibration crosshairs */}
            <div className="absolute w-[360px] h-[360px] border border-white/[0.015] rounded-full pointer-events-none flex items-center justify-center animate-spin" style={{ animationDuration: '40s' }}>
              <div className="w-full h-[1px] bg-white/[0.03] absolute" />
              <div className="h-full w-[1px] bg-white/[0.03] absolute" />
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-[0.32em] font-sans text-white select-none drop-shadow-[0_0_24px_rgba(207,157,123,0.18)]">
              {scrambledTitle}
            </h1>

            <span className="text-[8px] md:text-[9px] uppercase font-mono tracking-[0.45em] text-text-muted mt-3 block bg-white/[0.03] px-3.5 py-1.5 rounded border border-white/5 shadow-[0_0_12px_rgba(255,255,255,0.02)]">
              {scrambledSub}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CinematicIntro;
