/**
 * Copyright IBM Corp. 2026, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ─── Axis type ────────────────────────────────────────────────────────────────

export type ResizerAxis = 'x' | 'y';

// ─── Position ─────────────────────────────────────────────────────────────────

export interface Position {
  x: number;
  y: number;
}

// ─── Event detail interfaces ──────────────────────────────────────────────────

export interface ResizeStartDetail {
  axis: ResizerAxis;
  startPosition: Position;
}

export interface ResizeDragDetail {
  axis: ResizerAxis;
  delta: number;
  position: Position;
}

export interface ResizeEndDetail {
  axis: ResizerAxis;
  delta: number;
  position: Position;
}

// ─── Double-tap detection ─────────────────────────────────────────────────────

export const DOUBLE_TAP = {
  MAX_TIME_MS: 300,
  MAX_DISTANCE_PX: 24,
  VIBRATION_MS: 8,
} as const;

// ─── Keyboard navigation ──────────────────────────────────────────────────────

export const KEYBOARD = {
  DEFAULT_STEP_PX: 5,
  LARGE_STEP_PX: 25,
} as const;

// ─── ARIA ─────────────────────────────────────────────────────────────────────

export const ARIA = {
  ROLE_SEPARATOR: 'separator',
  LIVE_ASSERTIVE: 'assertive',
  VALUE_MIN: '0',
  VALUE_MAX: '100',
  VALUE_DEFAULT: '50',
} as const;

// ─── Selectors ────────────────────────────────────────────────────────────────

export const SELECTORS = {
  GRID: 'cds-resizer-grid',
  PANEL: 'cds-resizer-panel',
  HANDLE: 'cds-resizer-handle',
  PIVOT: 'cds-resizer-handle-pivot',
} as const;

// ─── Slot names ───────────────────────────────────────────────────────────────

export const SLOTS = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
  HANDLE_HORIZONTAL: 'handle-horizontal',
  HANDLE_VERTICAL: 'handle-vertical',
  PIVOT: 'pivot',
  ICON: 'icon',
} as const;

// ─── Event names ──────────────────────────────────────────────────────────────

export const EVENTS = {
  RESIZE_START: 'resize-start',
  RESIZE_DRAG: 'resize-drag',
  RESIZE_END: 'resize-end',
  RESIZE_RESET: 'resize-reset',
} as const;

// ─── Utility functions ────────────────────────────────────────────────────────

export function calculateFlexRatio(value: number, total: number): number {
  if (total <= 0) {
    return 0;
  }
  return Math.max(0, Math.min(1, value / total));
}

export function formatSplitRatio(percentage: number): string {
  const start = Math.round(Math.max(0, Math.min(100, percentage)));
  const end = 100 - start;
  return `${start}% / ${end}%`;
}

export function determineAxis(
  slot: string | null,
  cursor?: string
): ResizerAxis {
  if (slot === SLOTS.HANDLE_VERTICAL) {
    return 'y';
  }
  if (slot === SLOTS.HANDLE_HORIZONTAL) {
    return 'x';
  }
  if (cursor?.includes('ew')) {
    return 'x';
  }
  return 'y';
}

export function isWithinDistance(
  pos1: Position,
  pos2: Position,
  threshold: number
): boolean {
  return (
    Math.abs(pos1.x - pos2.x) < threshold &&
    Math.abs(pos1.y - pos2.y) < threshold
  );
}

export function triggerHapticFeedback(duration: number): void {
  if ('vibrate' in navigator) {
    try {
      navigator.vibrate(duration);
    } catch {
      // Silently fail if vibration is blocked
    }
  }
}

export function createCustomEvent<T>(
  eventName: string,
  detail?: T,
  options?: EventInit
): CustomEvent<T> {
  return new CustomEvent<T>(eventName, {
    bubbles: true,
    composed: true,
    detail,
    ...options,
  });
}

export function getOrientationFromAxis(
  axis: ResizerAxis
): 'horizontal' | 'vertical' {
  return axis === 'x' ? 'vertical' : 'horizontal';
}

export function safeClosest<T extends HTMLElement = HTMLElement>(
  element: Element,
  selector: string
): T | null {
  try {
    return element.closest<T>(selector);
  } catch {
    return null;
  }
}

export function safeQuerySelectorAll<T extends HTMLElement = HTMLElement>(
  root: Element | Document,
  selector: string
): T[] {
  try {
    return Array.from(root.querySelectorAll<T>(selector));
  } catch {
    return [];
  }
}
