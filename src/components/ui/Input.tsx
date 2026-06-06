'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label className="text-xs md:text-sm font-medium text-text-muted select-none">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'glass-input px-4 py-3 text-sm md:text-base w-full transition-all duration-300 hover:border-white/20 focus:border-[#CF9D7B] focus:shadow-[0_0_18px_rgba(207,157,123,0.25)] focus:bg-[#162127]/60 focus:outline-none',
            error && 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.15)]',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-400 font-medium mt-0.5">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label className="text-xs md:text-sm font-medium text-text-muted select-none">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'glass-input px-4 py-3 text-sm md:text-base w-full min-h-[120px] resize-y transition-all duration-300 hover:border-white/20 focus:border-[#CF9D7B] focus:shadow-[0_0_18px_rgba(207,157,123,0.25)] focus:bg-[#162127]/60 focus:outline-none',
            error && 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.15)]',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-400 font-medium mt-0.5">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
