'use client';

import React, { useRef, useState } from 'react';
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
  glowColor = 'rgba(167, 255, 74, 0.12)',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    if (tiltEffect) {
      const centerX = width / 2;
      const centerY = height / 2;
      // Soft tilt limits: max 5 degrees
      const maxTilt = 6;
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

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'glass-card relative overflow-hidden',
        className
      )}
      style={{
        transform: tiltEffect
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          : undefined,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
      }}
      {...props}
    >
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
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};

export default Card;
