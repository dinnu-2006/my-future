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

  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg cursor-pointer focus:outline-none select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-primary-accent text-primary-bg hover:bg-primary-accent/90 hover:shadow-[0_0_20px_rgba(207,157,123,0.3)] font-semibold border border-transparent',
    secondary: 'border border-[#724B39] bg-transparent text-white hover:bg-primary-accent hover:text-primary-bg hover:border-primary-accent hover:shadow-[0_0_15px_rgba(207,157,123,0.15)]',
    outline: 'border border-[#724B39] bg-transparent text-white hover:bg-primary-accent hover:text-primary-bg hover:border-primary-accent hover:shadow-[0_0_15px_rgba(207,157,123,0.15)]',
    glow: 'bg-transparent text-white border border-border-custom hover:border-primary-accent/40 hover:shadow-[0_0_15px_rgba(207,157,123,0.15)]'
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs md:text-sm',
    md: 'px-6 py-3 text-sm md:text-base',
    lg: 'px-8 py-4 text-base md:text-lg',
  };

  const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className);
  const transformStyle = magnetic ? { transform: `translate3d(${x}px, ${y}px, 0)`, transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)' } : undefined;

  if (href) {
    if (href.startsWith('http') || href.startsWith('mailto:') || href.endsWith('.pdf')) {
      return (
        <a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href}
          onClick={onClick}
          className={combinedClassName}
          style={transformStyle}
          target={target || '_blank'}
          rel="noopener noreferrer"
          title={title}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        onClick={onClick}
        className={combinedClassName}
        style={transformStyle}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        title={title}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedClassName}
      style={transformStyle}
      title={title}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
