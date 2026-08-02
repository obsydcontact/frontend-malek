'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

/**
 * "Curtain" reveal: clip-path animates from fully covered to fully visible
 * as the image scrolls into view. Per docs/04-design-system.md § Motion
 * principles. Wrap a <div> containing a next/image fill child.
 */
export function ImageReveal({ children, className, delay = 0 }: ImageRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn('relative overflow-hidden', className)}
      initial={shouldReduceMotion ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1, delay, ease: EASE_PREMIUM }}
    >
      {children}
    </motion.div>
  );
}
