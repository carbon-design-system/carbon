/**
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
  #state: StackState = {
    stack: [],
    containers: new Map(),
    stackStepSize: 'lg',
  };

  /** Callbacks registered by each open tearsheet. Called after every mutation. */
  readonly #subscribers = new Set<() => void>();

  subscribe(cb: () => void): () => void {
    this.#subscribers.add(cb);
    return () => this.#subscribers.delete(cb);
  }

  #notify() {
    this.#subscribers.forEach((cb) => cb());
  }

  get state() {
    return this.#state;
  }

  setStackStepSize(size: StackStepSize) {
    this.#state = { ...this.#state, stackStepSize: size };
    this.#notify();
  }

  notifyStack(id: string, open: boolean, container: HTMLElement | null) {
    const newContainers = new Map(this.#state.containers);

    if (open && container) {
      newContainers.set(id, container);

      // Move to top if already exists, otherwise add
      const newStack = this.#state.stack.includes(id)
        ? [...this.#state.stack.filter((i) => i !== id), id]
        : [...this.#state.stack, id];

      this.#state = {
        ...this.#state,
        stack: newStack,
        containers: newContainers,
      };
    } else {
      // Remove from stack
      newContainers.delete(id);
      this.#state = {
        ...this.#state,
        stack: this.#state.stack.filter((i) => i !== id),
        containers: newContainers,
      };
    }
    this.#notify();
  }

  getDepth(id: string): number {
    const index = this.#state.stack.indexOf(id);
    if (index === -1) {
      return -1;
    }
    return this.#state.stack.length - 1 - index; // topmost → 0
  }

  getScaleFactor(id: string): number {
    const depth = this.getDepth(id);
    const { stackStepSize, containers } = this.#state;
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
    const { stackStepSize } = this.#state;

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
    this.#state = {
      stack: [],
      containers: new Map(),
      stackStepSize: 'lg',
    };
    this.#notify();
  }
}

// Export a singleton instance
export const stackManager = new StackManager();
