/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { createContext, useContext, type ReactNode } from 'react';
import { stagger } from 'motion/react';
import { useMotionEnabled } from './useMotionEnabled';

export interface MotionContextValue {
  /**
   * Milliseconds from the moment the open/close trigger fires at which the
   * nearest enclosing Carbon animation is expected to settle.
   * Children use this as their base delay before adding their own stagger.
   * Defaults to 0 when there is no enclosing animation.
   */
  settle: number;

  /**
   * Reduced-motion gate propagated from the nearest provider.
   * Consumers must skip all motion work when this is false.
   */
  enabled: boolean;
}

const MotionContextInternal = createContext<MotionContextValue | undefined>(
  undefined
);

/**
 * Returns the nearest `MotionContextValue` provided by a Carbon component or
 * a user-placed `<MotionContext>`. Returns `undefined` when there is no
 * enclosing provider.
 */
export function useMotionContext(): MotionContextValue | undefined {
  return useContext(MotionContextInternal);
}

export interface MotionContextProps {
  /** Delay between each child animation start, in milliseconds. */
  stagger: number;
  /**
   * Explicit baseline delay in milliseconds before the first child starts
   * animating. When provided, this takes precedence over any `settle` value
   * inherited from a parent context. Use this to offset the stagger past a
   * known enclosing transition (e.g. `settle={110}` to wait for an accordion
   * panel's expand before staggering its rows in).
   */
  settle?: number;
  children: ReactNode;
}

/**
 * Distributes staggered `settle` delays to each direct child so they can
 * schedule their own entry animations relative to the nearest enclosing
 * Carbon animation.
 *
 * Place this inside a Carbon component that provides `MotionContextValue`
 * (e.g. `TabPanel`, `DemoDialog`). Each direct child receives a unique
 * `settle` value:
 *
 * ```
 * childSettle[i] = parentSettle + stagger(staggerMs / 1000)(i, total) * 1000
 * ```
 *
 * Children read their delay via `useMotionContext().settle`.
 *
 * No DOM nodes are added — each child is wrapped only in a React context
 * provider, invisible in the DOM.
 *
 * When the user prefers reduced motion, children are rendered unchanged with
 * no context modification.
 */
export function MotionContext({
  stagger: staggerMs,
  settle,
  children,
}: MotionContextProps) {
  const parent = useContext(MotionContextInternal);
  const motionEnabled = useMotionEnabled();

  const enabled = parent?.enabled ?? motionEnabled;
  // Explicit `settle` prop takes precedence over an inherited parent value,
  // which in turn falls back to 0 when there is no enclosing context.
  const parentSettle = settle ?? parent?.settle ?? 0;

  if (!enabled) {
    return <>{children}</>;
  }

  const childArray = React.Children.toArray(children);
  const total = childArray.length;
  const staggerFn = stagger(staggerMs / 1000);

  return (
    <>
      {childArray.map((child, i) => {
        const settle = parentSettle + staggerFn(i, total) * 1000;
        return (
          <MotionContextInternal.Provider key={i} value={{ settle, enabled }}>
            {child}
          </MotionContextInternal.Provider>
        );
      })}
    </>
  );
}
