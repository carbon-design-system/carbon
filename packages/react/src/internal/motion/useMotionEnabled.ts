/**
 * Copyright IBM Corp. 2026
 */

import { useReducedMotion } from 'motion/react';

/**
 * Accessibility gate for surface API
 *
 * Surface entrypoints check this hook and bail before doing any
 * motion work. When users request reduced motion, don't run surfaces at
 * all - components fall back to their default rendering (and their baseline
 * CSS transitions, which have their own `prefers-reduced-motion`)
 *
 */
export function useMotionEnabled(): boolean {
  const prefersReducedMotion = useReducedMotion();

  return !prefersReducedMotion;
}
