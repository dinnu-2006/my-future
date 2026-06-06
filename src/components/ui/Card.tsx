'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowHover?: boolean;
  tiltEffect?: boolean;
  glowColor?: string;
}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  glowHover = true,
  tiltEffect = true,
  glowColor = 'rgba(207, 157, 123, 0.12)',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [floatDelay, setFloatDelay] = useState(0);
  const [floatDuration, setFloatDuration] = useState(6);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Asynchronous float offsets
    setFloatDelay(Math.random() * 4);
    setFloatDuration(5 + Math.random() * 3);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    if (isMobile) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setMousePos({ x, y });

    if (tiltEffect) {
      const centerX = width / 2;
      const centerY = height / 2;
      const maxTilt = 4; // Soft tilt limits: 3-5 degrees
      const rotateXVal = -((y - centerY) / centerY) * maxTilt;
      const rotateYVal = ((x - centerX) / centerX) * maxTilt;
      setRotateX(rotateXVal);
      setRotateY(rotateYVal);
    }

    if (glowHover) {
      setGlowStyle({
        background: `radial-gradient(circle 180px at ${x}px ${y}px, ${glowColor}, transparent 80%)`,
      });
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowStyle({});
    setIsHovered(false);
  };

  const borderBackground = isHovered && glowHover
    ? `radial-gradient(circle 220px at ${mousePos.x}px ${mousePos.y}px, rgba(207, 157, 123, 0.28), rgba(255, 255, 255, 0.05))`
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)';

  // Float animation calculations
  const floatAnimate = isHovered || isMobile
    ? { y: -5 }
    : { y: [0, -4, 0] };
  
  const floatTransition = isHovered || isMobile
    ? { duration: 0.35, ease: 'easeOut' as const }
    : { duration: floatDuration, repeat: Infinity, ease: 'easeInOut' as const, delay: floatDelay };

  return (
    <motion.div
      animate={floatAnimate}
      transition={floatTransition}
      className="h-full w-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'relative rounded-xl p-[1.2px] overflow-hidden transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform h-full w-full',
          className
        )}
        style={{
          transform: !isMobile && tiltEffect && isHovered
            ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
            : undefined,
          transformStyle: 'preserve-3d',
          background: borderBackground,
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        }}
        {...props}
      >
        <div className="w-full h-full rounded-[11px] bg-[#162127]/98 backdrop-blur-2xl relative overflow-hidden flex flex-col justify-between">
          {/* Gradient Glow Layer */}
          {glowHover && (
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-500 mix-blend-screen z-0"
              style={{
                ...glowStyle,
                opacity: isHovered ? 1 : 0,
              }}
            />
          )}
          
          {/* Periodic Glass Reflection Sweep */}
          {!isMobile && (
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -skew-x-20 -translate-x-[150%]"
                style={{
                  animation: 'light-sweep-occasional 16s ease-in-out infinite',
                  animationDelay: `${floatDelay * 3.2}s`
                }}
              />
            </div>
          )}

          <div className="relative z-10 w-full h-full">{children}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
