/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactiveController, ReactiveControllerHost } from 'lit';

interface CollapsibleOptions {
  container: () => HTMLElement | null;
  triggerCollapse: (collapsed: boolean) => void;
  disable?: () => boolean;
}

export class CollapsibleController implements ReactiveController {
  private options: CollapsibleOptions;

  private startY: number | null = null;
  private isDragging = false;

  constructor(host: ReactiveControllerHost, options: CollapsibleOptions) {
    this.options = options;
    host.addController(this);
  }

  private onPointerDown = (e: PointerEvent) => {
    if (this.options.disable?.()) return;
    this.startY = e.clientY;
    this.isDragging = true;
  };

  private onPointerMove = (e: PointerEvent) => {
    if (!this.isDragging || this.startY === null) {
      return;
    }
    if (this.options.disable?.()) return;

    const diffY = this.startY - e.clientY;

    if (diffY > 5) {
      this.options.triggerCollapse(true);
    } else if (diffY < -5) {
      this.options.triggerCollapse(false);
    }
  };

  private onPointerUp = () => {
    this.isDragging = false;
    this.startY = null;
    document.body.style.cursor = 'default';
  };

  private onWheel = (e: WheelEvent) => {
    // Re-evaluate disable() on every event so that a prop change that arrives
    // after hostConnected (e.g. disableHeaderCollapse set via context in
    // firstUpdated) is respected at runtime, not just at connect time.
    if (this.options.disable?.()) return;
    if (e.deltaY > 0) {
      this.options.triggerCollapse(true);
    } else if (e.deltaY < 0) {
      this.options.triggerCollapse(false);
    }
  };

  hostConnected() {
    // Always register listeners. The disable() check is re-evaluated inside
    // each handler so that disableHeaderCollapse set after connect (e.g. via
    // context in firstUpdated) is honoured. Checking only here means any prop
    // that arrives after the element connects would be silently ignored.
    const container = this.options.container();
    if (!container) {
      return;
    }

    container.addEventListener('pointerdown', this.onPointerDown);
    container.addEventListener('pointermove', this.onPointerMove);
    container.addEventListener('pointerup', this.onPointerUp);
    container.addEventListener('wheel', this.onWheel);
  }

  hostDisconnected() {
    const container = this.options.container();
    if (!container) {
      return;
    }

    container.removeEventListener('pointerdown', this.onPointerDown);
    container.removeEventListener('pointermove', this.onPointerMove);
    container.removeEventListener('pointerup', this.onPointerUp);
    container.removeEventListener('wheel', this.onWheel);
  }
}
