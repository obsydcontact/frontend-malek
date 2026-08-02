'use client';

import * as React from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** How far the element moves relative to scroll, in pixels. Subtle only — see docs/04-design-system.md. */
  offset?: number;
}

/**
 * Subtle background/decorative parallax only — never applied to foreground
 * text (hurts readability + perceived CLS). See docs/04-design-system.md.
 */
export function Parallax({ children, className, offset = 60 }: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-offset, offset]);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
