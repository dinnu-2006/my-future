'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'gradient' | 'glow';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'primary',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium select-none border tracking-wider transition-all duration-300';
  
  const variants = {
    primary: 'bg-primary-accent/8 border-primary-accent/25 text-primary-accent shadow-[0_0_10px_rgba(207, 157, 123,0.08)]',
    secondary: 'bg-white/5 border-white/8 text-white/90',
    gradient: 'bg-gradient-to-r from-primary-accent/15 to-[#724B39]/15 border-primary-accent/25 text-white shadow-[0_0_15px_rgba(207, 157, 123,0.08)]',
    glow: 'bg-primary-accent text-primary-bg border-transparent font-semibold shadow-[0_0_12px_rgba(207, 157, 123,0.35)]'
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
};

export default Badge;
