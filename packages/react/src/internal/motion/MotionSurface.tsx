/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  forwardRef,
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { MotionSurfaceName } from '@carbon/motion';
import { warning } from '../warning';
import { useMotionSurface } from './useMotionSurface';

// Motion owns these handler types (not React)
type SafeDivProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'
>;

export interface MotionSurfaceProps extends SafeDivProps {
  // the named motion intent from `@carbon/motion`
  surface: MotionSurfaceName;
  // shared-element target (`MotionSurfaceOrigin`) - required for
  // shared-element surfaces only
  surfaceId?: string;
  // presence - exit animation runs before children unmount when this flips
  // to false
  open?: boolean;
  // called after exit and children have unmounted
  onExitComplete?: () => void;
  children?: ReactNode;
}

/**
 * Animates its children according to a named @carbon/motion surface
 *
 * Reveal surfaces enter/exit between surface keyframes. Shared-element
 * surfaces morph from the `MotionSurfaceOrigin` with the same `surfaceId`
 *
 * When users prefer reduced motion, render as plain element and
 * mount/unmount immediately - no Motion runs at all
 */
export const MotionSurface = forwardRef<HTMLDivElement, MotionSurfaceProps>(
  function MotionSurface(
    { surface, surfaceId, open = true, onExitComplete, children, ...rest },
    ref
  ) {
    const resolved = useMotionSurface(surface);
    const { enabled } = resolved;

    warning(
      !(resolved.kind === 'shared-element' && !surfaceId),
      `MotionSurface: the ${surface} surface is a shared-element morph and ` +
        'needs a `surfaceId` that matches a `MotionSurfaceOrigin`.'
    );

    // is never rendered - `onExitComplete` by hand
    const wasOpen = useRef(open);
    useEffect(() => {
      if (!enabled && wasOpen.current && !open) {
        onExitComplete?.();
      }
      wasOpen.current = open;
    }, [enabled, onExitComplete, open]);

    if (!enabled) {
      return open ? (
        <div ref={ref} {...rest}>
          {children}
        </div>
      ) : null;
    }

    if (resolved.kind === 'shared-element') {
      return (
        <AnimatePresence initial={false} onExitComplete={onExitComplete}>
          {open && (
            <motion.div
              ref={ref}
              layoutId={surfaceId}
              transition={resolved.enterTransition}
              {...rest}>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      );
    }

    return (
      <AnimatePresence initial={false} onExitComplete={onExitComplete}>
        {open && (
          <motion.div
            ref={ref}
            initial={resolved.initial}
            animate={resolved.animate}
            exit={resolved.exit}
            {...rest}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

export interface MotionSurfaceOriginProps extends SafeDivProps {
  // named motion intent - must be shared-element surface
  surface: MotionSurfaceName;
  // pair this origin with `MotionSurface` it morphs into
  surfaceId: string;
  children?: ReactNode;
}

// mark element as shared-element surface morph (from/to)
// stays mounted then hides when its paird target is the lead
export const MotionSurfaceOrigin = forwardRef<
  HTMLDivElement,
  MotionSurfaceOriginProps
>(function MotionSurfaceOrigin({ surface, surfaceId, children, ...rest }, ref) {
  const resolved = useMotionSurface(surface);

  warning(
    resolved.kind === 'shared-element',
    `MotionSurfaceOrigin: the ${surface} surface is a reveal and has no ` +
      'origin. Use MotionSurface directly instead.'
  );

  if (!resolved.enabled || resolved.kind !== 'shared-element') {
    return (
      <div ref={ref} {...rest}>
        {children}
      </div>
    );
  }

  // reverse morph when target exits - use surface exit transition
  return (
    <motion.div
      ref={ref}
      layoutId={surfaceId}
      transition={resolved.exitTransition}
      {...rest}>
      {children}
    </motion.div>
  );
});
