'use client';

import React, { useRef, useEffect } from 'react';

const TECHNOLOGIES = [
  { name: 'Python', orbit: 1, color: '#A7FF4A' },
  { name: 'React', orbit: 1, color: '#00FFB2' },
  { name: 'Next.js', orbit: 1, color: '#38BDF8' },
  { name: 'AI & ML', orbit: 1, color: '#A7FF4A' },
  
  { name: 'TypeScript', orbit: 2, color: '#38BDF8' },
  { name: 'Node.js', orbit: 2, color: '#00FFB2' },
  { name: 'Tailwind', orbit: 2, color: '#FFFFFF' },
  { name: 'MongoDB', orbit: 2, color: '#00FFB2' },
  { name: 'Git', orbit: 2, color: '#FFFFFF' },
  
  { name: 'SEO', orbit: 3, color: '#F472B6' },
  { name: 'Express', orbit: 3, color: '#38BDF8' },
  { name: 'n8n', orbit: 3, color: '#A7FF4A' },
  { name: 'Zapier', orbit: 3, color: '#FFFFFF' },
  { name: 'FastAPI', orbit: 3, color: '#A7FF4A' }
];

const hexToRgba = (hex: string, alpha: number) => {
  const cleanHex = hex.replace('#', '');
  if (cleanHex === 'FFFFFF') return `rgba(255, 255, 255, ${alpha})`;
  const r = parseInt(cleanHex.substring(0, 2), 16) || 167;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 74;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const CanvasWrapper: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 450);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates tracking relative to canvas
    let mouseX = -1000;
    let mouseY = -1000;
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseEnter = () => {
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Setup Orbits
    const orbitRadii = [65, 115, 165];
    const orbitSpeeds = [0.006, -0.0035, 0.002]; // Counter-rotating gears!
    
    // Sonar waves configuration
    let sonarWaves: Array<{ r: number; alpha: number }> = [];
    let frameCount = 0;

    const startTime = Date.now();

    const draw = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      frameCount++;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Expanding sonar pulse wave
      if (frameCount % 120 === 0) {
        sonarWaves.push({ r: 5, alpha: 0.85 });
      }

      sonarWaves.forEach((wave) => {
        wave.r += 1.45;
        wave.alpha -= 0.0065;
      });

      sonarWaves = sonarWaves.filter((wave) => wave.alpha > 0);

      sonarWaves.forEach((wave) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, wave.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(167, 255, 74, ${wave.alpha * 0.15})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      });

      // 2. Draw Concentric Target Orbit Lines
      orbitRadii.forEach((radius, idx) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        
        // Highlight hovered orbit
        let isOrbitHovered = false;
        if (isHovering) {
          const dx = mouseX - centerX;
          const dy = mouseY - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (Math.abs(dist - radius) < 22) {
            isOrbitHovered = true;
          }
        }

        ctx.strokeStyle = isOrbitHovered 
          ? 'rgba(167, 255, 74, 0.25)' 
          : 'rgba(255, 255, 255, 0.035)';
        ctx.lineWidth = isOrbitHovered ? 1.5 : 0.8;
        
        if (!isOrbitHovered) {
          ctx.setLineDash([3, 10]);
        } else {
          ctx.setLineDash([8, 6]);
        }
        ctx.stroke();
        ctx.restore();
      });

      // 3. Central AI core node styling
      ctx.save();
      const corePulse = Math.sin(Date.now() * 0.007) * 2;
      const coreRadius = 24 + corePulse;
      
      // Outer neon shadow core
      const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius * 2.2);
      coreGrad.addColorStop(0, 'rgba(0, 255, 178, 0.14)');
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Spinning dashed scope ticks
      ctx.translate(centerX, centerY);
      ctx.rotate(elapsed * 0.2);
      ctx.beginPath();
      ctx.arc(0, 0, coreRadius + 6, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(167, 255, 74, 0.35)';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 12]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Solid central core sphere
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#050c12';
      ctx.strokeStyle = '#00FFB2';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = '#00FFB2';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.stroke();

      // Core details & label
      ctx.font = 'bold 9px "Courier New", Courier, monospace';
      ctx.fillStyle = '#A7FF4A';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('AI', centerX, centerY - 2.5);
      
      ctx.font = '5px "Courier New", Courier, monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fillText('CORE v4.0', centerX, centerY + 6);
      ctx.restore();

      // 4. Draw Orbiting Technology Nodes
      const nodes: Array<{ name: string; x: number; y: number; color: string; isHovered: boolean }> = [];

      TECHNOLOGIES.forEach((tech) => {
        const radius = orbitRadii[tech.orbit - 1];
        const speed = orbitSpeeds[tech.orbit - 1];
        const sameOrbitCount = TECHNOLOGIES.filter(t => t.orbit === tech.orbit).length;
        const indexInOrbit = TECHNOLOGIES.filter(t => t.orbit === tech.orbit).indexOf(tech);
        
        // Dynamic angle calculation
        const angle = (elapsed * speed * 2 * Math.PI) + (indexInOrbit * (2 * Math.PI / sameOrbitCount));
        const nodeX = centerX + Math.cos(angle) * radius;
        const nodeY = centerY + Math.sin(angle) * radius;

        // Check node hover state
        let isNodeHovered = false;
        if (isHovering) {
          const dx = mouseX - nodeX;
          const dy = mouseY - nodeY;
          if (Math.sqrt(dx * dx + dy * dy) < 26) {
            isNodeHovered = true;
          }
        }

        nodes.push({
          name: tech.name,
          x: nodeX,
          y: nodeY,
          color: tech.color,
          isHovered: isNodeHovered
        });
      });

      // Draw tethers and connection beams
      nodes.forEach((node) => {
        if (node.isHovered || isHovering) {
          const distToMouse = Math.sqrt((mouseX - node.x) ** 2 + (mouseY - node.y) ** 2);
          if (distToMouse < 90) {
            // Draw interactive light line to cursor
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = hexToRgba(node.color, 0.28 * (1 - distToMouse / 90));
            ctx.lineWidth = 1.2;
            ctx.shadowColor = node.color;
            ctx.shadowBlur = 4;
            ctx.stroke();
            ctx.restore();
          }
        }

        // Draw basic connector back to central core (faint, pulsing)
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(node.x, node.y);
        ctx.strokeStyle = node.isHovered 
          ? hexToRgba(node.color, 0.2) 
          : hexToRgba(node.color, 0.045 + Math.sin(Date.now() * 0.005) * 0.015);
        ctx.lineWidth = node.isHovered ? 0.95 : 0.5;
        if (node.isHovered) {
          ctx.setLineDash([2, 2]);
        } else {
          ctx.setLineDash([4, 6]);
        }
        ctx.stroke();
        ctx.restore();
      });

      // Render actual capsules/pill tags for each tech node
      nodes.forEach((node) => {
        ctx.save();
        
        // Measure text size to size pill dynamically
        ctx.font = '9px "Courier New", Courier, monospace';
        const textWidth = ctx.measureText(node.name).width;
        
        const pillWidth = textWidth + 20; // text + margins + LED dot
        const pillHeight = 16;
        
        // Hover expansion
        const scale = node.isHovered ? 1.08 : 1.0;
        ctx.translate(node.x, node.y);
        ctx.scale(scale, scale);

        // Draw capsule background box
        ctx.beginPath();
        ctx.roundRect(-pillWidth / 2, -pillHeight / 2, pillWidth, pillHeight, 5);
        ctx.fillStyle = 'rgba(3, 7, 18, 0.88)';
        ctx.strokeStyle = node.isHovered ? node.color : 'rgba(255, 255, 255, 0.06)';
        ctx.lineWidth = node.isHovered ? 1.25 : 0.8;
        
        if (node.isHovered) {
          ctx.shadowColor = node.color;
          ctx.shadowBlur = 8;
        }

        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0; // reset

        // Draw glowing LED dot inside capsule
        ctx.beginPath();
        ctx.arc(-pillWidth / 2 + 7.5, 0, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        
        if (node.isHovered) {
          ctx.save();
          ctx.shadowColor = node.color;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.restore();
        } else {
          ctx.fill();
        }

        // Draw node title text
        ctx.fillStyle = node.isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.72)';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.name, -pillWidth / 2 + 15, 0.5);

        ctx.restore();
      });

      // 5. Draw cursor indicator node
      if (isHovering && mouseX > 0 && mouseY > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#A7FF4A';
        ctx.shadowColor = '#A7FF4A';
        ctx.shadowBlur = 10;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 10, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(167, 255, 74, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Initialize draw cycle
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative flex items-center justify-center pointer-events-auto"
    >
      <canvas ref={canvasRef} className="absolute max-w-full max-h-full block z-10" />
    </div>
  );
};

export default CanvasWrapper;
