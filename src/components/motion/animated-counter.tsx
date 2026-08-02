'use client';

import * as React from 'react';
import { useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

interface AnimatedCounterProps {
  /** The final numeric value to count up to. */
  value: number;
  /** Text to render before the number, e.g. "+" prefix handled by prefix/suffix instead. */
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

/**
 * Counts up from 0 to `value` once the element scrolls into view. Respects
 * prefers-reduced-motion by rendering the final value directly with no
 * animation — see docs/10-seo-strategy.md § Accessibility.
 */
export function AnimatedCounter({ value, prefix = '', suffix = '', className, decimals = 0 }: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const shouldReduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1500, bounce: 0 });
  const [display, setDisplay] = React.useState('0');

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setDisplay(value.toFixed(decimals));
      return;
    }
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, shouldReduceMotion, value, decimals]);

  React.useEffect(() => {
    if (shouldReduceMotion) return;
    const unsubscribe = spring.on('change', (latest) => {
      setDisplay(latest.toFixed(decimals));
    });
    return unsubscribe;
  }, [spring, shouldReduceMotion, decimals]);

  return (
    <span ref={ref} className={className} aria-live="off">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
