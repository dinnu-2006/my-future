'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Add a class to disable mouse cursor hide if active
      document.body.classList.remove('custom-cursor-active');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#030712]/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 15 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className={cn(
              'relative z-10 w-full max-w-4xl max-h-[85vh] overflow-y-auto glass-card p-6 md:p-8 flex flex-col gap-6 bg-[#07131A]/90 border border-white/8 shadow-[0_0_50px_rgba(167,255,74,0.08)]',
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/8 pb-4">
              {title ? (
                <h3 className="text-lg md:text-xl font-bold tracking-wider uppercase text-white">
                  {title}
                </h3>
              ) : (
                <div />
              )}
              <Button
                variant="glow"
                size="sm"
                className="w-8 h-8 p-0 rounded-full flex items-center justify-center border-white/10 hover:border-primary-accent/40 text-white hover:text-primary-accent active:scale-95"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 w-full">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
