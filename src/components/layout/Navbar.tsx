'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X, Terminal as TerminalIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import MobileMenu from './MobileMenu';

const NAV_ITEMS = [
  { label: 'Home', id: 'home', href: '/#home' },
  { label: 'About', id: 'about', href: '/#about' },
  { label: 'Skills', id: 'skills', href: '/#skills' },
  { label: 'Projects', id: 'projects', href: '/#projects' },
  { label: 'Experience', id: 'experience', href: '/#experience' },
  { label: 'Services', id: 'services', href: '/#services' },
  { label: 'Achievements', id: 'achievements', href: '/#achievements' },
  { label: 'Blog', id: 'blog', href: '/blog' },
  { label: 'Contact', id: 'contact', href: '/#contact' }
];

export const Navbar: React.FC<{ onTerminalToggle: () => void }> = ({ onTerminalToggle }) => {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Handle scroll detection for background glass effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section using IntersectionObserver
  useEffect(() => {
    if (pathname !== '/') return;

    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'services', 'achievements', 'contact'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.25, rootMargin: '-20% 0px -60% 0px' }
      );
      observer.observe(el);
      return { el, observer };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300',
          scrolled ? 'glass-navbar py-3 shadow-lg' : 'bg-transparent py-5'
        )}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group focus:outline-none select-none active:scale-95 transition-transform duration-200">
            <div className="w-8 h-8 rounded-lg bg-primary-accent/10 border border-primary-accent/30 flex items-center justify-center text-primary-accent group-hover:bg-primary-accent group-hover:text-primary-bg group-hover:scale-105 transition-all duration-300">
              <TerminalIcon className="w-4.5 h-4.5" />
            </div>
            <span className="text-sm font-extrabold uppercase tracking-widest text-white group-hover:text-primary-accent transition-colors">
              Synapse<span className="text-primary-accent">.core</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isSectionActive = pathname === '/' && activeSection === item.id;
              const isBlogActive = item.href === '/blog' && pathname.startsWith('/blog');
              const active = isSectionActive || isBlogActive;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    'text-xs uppercase tracking-wider font-mono transition-all duration-300 focus:outline-none py-1.5 px-3.5 rounded-md relative hover:bg-white/[0.03] active:scale-95',
                    active ? 'text-primary-accent font-semibold' : 'text-text-muted hover:text-white'
                  )}
                >
                  <span className="relative z-10">{item.label}</span>
                  {active && (
                    <motion.span 
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary-accent shadow-[0_0_10px_#CF9D7B]" 
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Dev Terminal Hotkey Indicator */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Command Palette Trigger */}
            <button
              onClick={onTerminalToggle}
              className="text-[10px] font-mono border border-white/8 hover:border-primary-accent/30 hover:text-primary-accent bg-white/[0.02] text-text-muted px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-2 focus:outline-none cursor-pointer"
            >
              <span>Terminal</span>
              <kbd className="bg-white/5 border border-white/10 px-1 rounded text-[8px]">
                Ctrl+K
              </kbd>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex lg:hidden items-center justify-center p-2 text-white hover:text-primary-accent focus:outline-none cursor-pointer"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* Mobile Menu Dropdown drawer */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={NAV_ITEMS}
        onTerminalToggle={onTerminalToggle}
      />
    </>
  );
};

export default Navbar;
