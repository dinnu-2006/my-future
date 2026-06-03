'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Terminal } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { label: string; id: string; href: string }[];
  onTerminalToggle: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
  onTerminalToggle,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="fixed inset-x-0 top-[60px] bottom-0 z-30 bg-[#030712]/98 backdrop-blur-xl border-t border-white/6 p-6 flex flex-col justify-between lg:hidden"
        >
          {/* Navigation Links */}
          <nav className="flex flex-col gap-5 text-left">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={onClose}
                className="text-base font-mono uppercase tracking-wider text-text-muted hover:text-primary-accent border-b border-white/5 pb-2 transition-colors focus:outline-none"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action trigger footer */}
          <div className="flex flex-col gap-4 border-t border-white/6 pt-6">
            <Button
              variant="glow"
              onClick={() => {
                onClose();
                onTerminalToggle();
              }}
              className="w-full flex items-center justify-center gap-2 font-mono py-3"
            >
              <Terminal className="w-4 h-4" />
              Developer Terminal
            </Button>
            
            <p className="text-[10px] text-center font-mono text-text-muted">
              CTRL + SHIFT + D to trigger console.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
