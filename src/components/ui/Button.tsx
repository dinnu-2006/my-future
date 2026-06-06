'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useMagnetic } from '@/hooks/useMagnetic';

interface ButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
  magneticStrength?: number;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  title?: string;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  magnetic = false,
  magneticStrength = 0.25,
  href,
  onClick,
  children,
  disabled = false,
  type = 'button',
  target,
  title,
  ...props
}) => {
  const { ref, x, y } = useMagnetic(magnetic ? magneticStrength : 0);
  const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
    if (onClick) onClick(e as any);
  };

  const baseStyles = 'group relative overflow-hidden inline-flex items-center justify-center font-medium transition-[transform,border-color,background-color,color] duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-[4px] hover:scale-[1.04] rounded-lg cursor-pointer focus:outline-none select-none active:scale-[0.94] active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-[#CF9D7B] text-[#0C1519] border border-[#CF9D7B]/20 hover:border-[#CF9D7B]/50 font-semibold',
    secondary: 'border border-[#724B39] bg-transparent text-white hover:bg-[#CF9D7B] hover:text-[#0C1519] hover:border-[#CF9D7B]',
    outline: 'border border-[#724B39] bg-transparent text-white hover:bg-[#CF9D7B] hover:text-[#0C1519] hover:border-[#CF9D7B]',
    glow: 'bg-transparent text-white border border-[#3A3534] hover:border-[#CF9D7B]/50 hover:bg-[#CF9D7B]/5'
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs md:text-sm',
    md: 'px-6 py-3 text-sm md:text-base',
    lg: 'px-8 py-4 text-base md:text-lg',
  };

  const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className);
  const transformStyle = magnetic ? { transform: `translate3d(${x}px, ${y}px, 0)`, transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)' } : undefined;

  const shineSweep = (
    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent translate-x-[-150%] translate-y-[-150%] rotate-45 pointer-events-none group-hover:animate-[hud-glimmer_1.1s_ease-out]" />
  );

  const rippleElements = ripples.map((ripple) => (
    <span
      key={ripple.id}
      className="absolute bg-white/20 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-[ripple-effect_0.6s_ease-out]"
      style={{
        left: ripple.x,
        top: ripple.y,
        width: 100,
        height: 100,
      }}
    />
  ));

  if (href) {
    if (href.startsWith('http') || href.startsWith('mailto:') || href.endsWith('.pdf')) {
      return (
        <a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href}
          onClick={handleButtonClick}
          className={combinedClassName}
          style={transformStyle}
          target={target || '_blank'}
          rel="noopener noreferrer"
          title={title}
        >
          {shineSweep}
          {rippleElements}
          <span className="relative z-10 flex items-center justify-center gap-1.5">{children}</span>
        </a>
      );
    }
    return (
      <Link
        href={href}
        onClick={handleButtonClick}
        className={combinedClassName}
        style={transformStyle}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        title={title}
      >
        {shineSweep}
        {rippleElements}
        <span className="relative z-10 flex items-center justify-center gap-1.5">{children}</span>
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={handleButtonClick}
      className={combinedClassName}
      style={transformStyle}
      title={title}
      {...props}
    >
      {shineSweep}
      {rippleElements}
      <span className="relative z-10 flex items-center justify-center gap-1.5">{children}</span>
    </button>
  );
};

export default Button;
