/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { signal } from '@lit-labs/signals';

export type StackStepSize = 'sm' | 'md' | 'lg';

interface StackState {
  stack: string[];
  containers: Map<string, HTMLElement>;
  stackStepSize: StackStepSize;
}

const bufferMap: Record<StackStepSize, number> = {
  sm: 0.5,
  md: 0.75,
  lg: 1,
};

class StackManager {
  #state = signal<StackState>({
    stack: [],
    containers: new Map(),
    stackStepSize: 'lg',
  });

  get state() {
    return this.#state.get();
  }

  setStackStepSize(size: StackStepSize) {
    this.#state.set({
      ...this.#state.get(),
      stackStepSize: size,
    });
  }

  notifyStack(id: string, open: boolean, container: HTMLElement | null) {
    const currentState = this.#state.get();
    const newContainers = new Map(currentState.containers);

    if (open && container) {
      newContainers.set(id, container);

      // Move to top if already exists, otherwise add
      const newStack = currentState.stack.includes(id)
        ? [...currentState.stack.filter((i) => i !== id), id]
        : [...currentState.stack, id];

      this.#state.set({
        ...currentState,
        stack: newStack,
        containers: newContainers,
      });
    } else {
      // Remove from stack
      newContainers.delete(id);
      this.#state.set({
        ...currentState,
        stack: currentState.stack.filter((i) => i !== id),
        containers: newContainers,
      });
    }
  }

  getDepth(id: string): number {
    const { stack } = this.#state.get();
    const index = stack.indexOf(id);
    if (index === -1) {
      return -1;
    }
    return stack.length - 1 - index; // topmost → 0
  }

  getScaleFactor(id: string): number {
    const depth = this.getDepth(id);
    const { stackStepSize, containers } = this.#state.get();
    const container = containers.get(id);

    if (depth === -1 || !container) {
      return 1;
    }

    const buffer = bufferMap[stackStepSize];
    const bufferInPx = this.remToPx(buffer);
    const width = container.offsetWidth;

    const scale = (width - bufferInPx * 2 * depth) / width;
    return scale;
  }

  getBlockSizeChange(id: string): string {
    const depth = this.getDepth(id);
    const { stackStepSize } = this.#state.get();

    if (depth === -1) {
      return '0px';
    }

    const buffer = bufferMap[stackStepSize];
    const bufferInPx = this.remToPx(buffer);
    return `${bufferInPx * depth}px`;
  }

  private remToPx(rem: number): number {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  }

  reset() {
    this.#state.set({
      stack: [],
      containers: new Map(),
      stackStepSize: 'lg',
    });
  }
}

// Export a singleton instance
export const stackManager = new StackManager();
