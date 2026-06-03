import { Variants } from 'framer-motion';

export const fadeIn = (duration = 0.5, delay = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration, delay, ease: 'easeOut' },
  },
});

export const fadeUp = (duration = 0.6, delay = 0, yOffset = 30): Variants => ({
  hidden: { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: [0.16, 1, 0.3, 1] }, // Ultra smooth Custom cubic-bezier
  },
});

export const fadeDown = (duration = 0.6, delay = 0, yOffset = -30): Variants => ({
  hidden: { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
  },
});

export const fadeRight = (duration = 0.6, delay = 0, xOffset = -30): Variants => ({
  hidden: { opacity: 0, x: xOffset },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
  },
});

export const fadeLeft = (duration = 0.6, delay = 0, xOffset = 30): Variants => ({
  hidden: { opacity: 0, x: xOffset },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
  },
});

export const scaleUp = (duration = 0.5, delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration, delay, ease: 'easeOut' },
  },
});

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const clipPathReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};
