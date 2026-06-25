/**
 * Copyright IBM Corp. 2025
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
    this.startY = e.clientY;
    this.isDragging = true;
  };

  private onPointerMove = (e: PointerEvent) => {
    if (!this.isDragging || this.startY === null) {
      return;
    }

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
    if (e.deltaY > 0) {
      this.options.triggerCollapse(true);
    } else if (e.deltaY < 0) {
      this.options.triggerCollapse(false);
    }
  };

  hostConnected() {
    if (this.options.disable?.()) {
      return;
    }

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
