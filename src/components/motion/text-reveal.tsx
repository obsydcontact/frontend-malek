'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  /** Delay before the first word starts, in seconds. */
  delay?: number;
  as?: 'h1' | 'h2' | 'p';
}

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

/**
 * Splits a headline into words and staggers a fade+translateY reveal on
 * each — per docs/04-design-system.md § Motion principles. Used for hero
 * and major section headlines only (not body copy — keep restrained).
 */
export function TextReveal({ text, className, delay = 0, as = 'h1' }: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  const Tag = as;

  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-1">
            <motion.span
              className="inline-block"
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: delay + index * 0.05, ease: EASE_PREMIUM }}
            >
              {word}
              {index < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
