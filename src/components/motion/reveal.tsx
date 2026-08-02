'use client';

import * as React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** 'up' is the default per docs/04-design-system.md reveal pattern. */
  direction?: 'up' | 'none';
  as?: 'div' | 'section' | 'li';
}

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

/**
 * Generic fade/slide-up-on-scroll primitive. Every homepage section should
 * compose from this rather than writing bespoke Framer Motion variants
 * inline — see docs/03-architecture.md § Component architecture rules.
 */
export function Reveal({ children, className, delay = 0, direction = 'up', as = 'div' }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: direction === 'up' ? 24 : 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.01 : 0.7, delay, ease: EASE_PREMIUM },
    },
  };

  const sharedProps = {
    className,
    initial: 'hidden' as const,
    whileInView: 'visible' as const,
    viewport: { once: true, margin: '-10% 0px' },
    variants,
  };

  if (as === 'section') return <motion.section {...sharedProps}>{children}</motion.section>;
  if (as === 'li') return <motion.li {...sharedProps}>{children}</motion.li>;
  return <motion.div {...sharedProps}>{children}</motion.div>;
}
