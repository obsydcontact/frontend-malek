'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin fixed top progress bar, gold, driven by scroll position.
 * See docs/04-design-system.md § Motion principles.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-gold"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
