/**
 * Copyright IBM Corp. 2026, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { prefix } from '../../globals/settings';
import styles from './resizer-handle.scss?lit';
import type { ResizerAxis, Position } from './defs';
import {
  DOUBLE_TAP,
  KEYBOARD,
  ARIA,
  SELECTORS,
  SLOTS,
  EVENTS,
  determineAxis,
  calculateFlexRatio,
  formatSplitRatio,
  isWithinDistance,
  triggerHapticFeedback,
  createCustomEvent,
  getOrientationFromAxis,
  safeClosest,
  safeQuerySelectorAll,
} from './defs';

/**
 * Resizer handle component for resizing panels.
 * @element cds-resizer-handle
 * @fires resize-start - Fired when dragging starts
 * @fires resize-drag  - Fired during dragging (detail: { axis, delta, position })
 * @fires resize-end   - Fired when dragging ends (detail: { axis, delta, position })
 * @fires resize-reset - Fired on double-tap / double-click
 */
@customElement(`${prefix}-resizer-handle`)
class CDSResizerHandle extends LitElement {
  static styles = styles;

  /** Resize axis — determined automatically from slot, or set explicitly. */
  @property({ type: String, reflect: true })
  axis: ResizerAxis = 'y';

  @state()
  private _isDragging = false;

  private _startNode?: HTMLElement;
  private _endNode?: HTMLElement;
  private _grid?: HTMLElement;
  private _startSize = 0;
  private _endSize = 0;
  private _lastTapTime = 0;
  private _lastTapPosition: Position = { x: 0, y: 0 };

  private _boundStartDrag?: (e: PointerEvent) => void;
  private _boundHandleKeyDown?: (e: KeyboardEvent) => void;
  private _boundMove?: (e: PointerEvent) => void;
  private _boundStop?: (e: PointerEvent) => void;

  // ─── Public API (used by resizer-handle-pivot) ──────────────────────────────

  setSyntheticHoverState(isHovered: boolean): void {
    this.toggleAttribute('data-synthetic-hover', isHovered);
    this.requestUpdate();
  }

  setSyntheticActiveState(isActive: boolean): void {
    this.toggleAttribute('data-synthetic-active', isActive);
    this.requestUpdate();
  }

  /** Start dragging (called by pivot component). */
  startDrag = (e: PointerEvent): void => {
    this._handlePointerDown(e);
  };

  /** Reset panel sizes to default (called by pivot component or double-click). */
  resetSizes = (e: MouseEvent): void => {
    e.preventDefault();
    this.dispatchEvent(createCustomEvent(EVENTS.RESIZE_RESET));

    if (this._grid) {
      this._grid.style.removeProperty('--start-element-size');
      this._grid.style.removeProperty('--end-element-size');
      const handleTransitionEnd = () => {
        this._updateAriaAttributes();
        this._grid?.removeEventListener('transitionend', handleTransitionEnd);
      };
      this._grid.addEventListener('transitionend', handleTransitionEnd, {
        once: true,
      });
    }
  };

  get pivot(): 'start' | 'end' | undefined {
    return this._pivot;
  }

  // ─── Lifecycle ──────────────────────────────────────────────────────────────

  connectedCallback() {
    super.connectedCallback();
    this._initializeComponent();
    this._setupEventListeners();
  }

  firstUpdated(): void {
    if (this._grid && this._startNode && this._endNode) {
      requestAnimationFrame(() => {
        this._updateAriaAttributes();
      });
    }
  }

  disconnectedCallback() {
    this._cleanup();
    super.disconnectedCallback();
  }

  // ─── Internals ──────────────────────────────────────────────────────────────

  private _initializeComponent(): void {
    this._grid = safeClosest(this, SELECTORS.GRID) || undefined;

    const slot = this.getAttribute('slot');
    const cursor = getComputedStyle(this).cursor;
    this.axis = determineAxis(slot, cursor);

    if (this._grid) {
      const panels = safeQuerySelectorAll<HTMLElement>(
        this._grid,
        SELECTORS.PANEL
      );
      if (this.axis === 'x') {
        this._startNode = panels.find((p) => p.slot === SLOTS.LEFT);
        this._endNode = panels.find((p) => p.slot === SLOTS.RIGHT);
      } else {
        this._startNode = panels.find((p) => p.slot === SLOTS.TOP);
        this._endNode = panels.find((p) => p.slot === SLOTS.BOTTOM);
      }
    }

    this._setupAccessibility();
  }

  private _setupAccessibility(): void {
    this.setAttribute('role', ARIA.ROLE_SEPARATOR);
    this.setAttribute('tabindex', '0');
    this.setAttribute('aria-orientation', getOrientationFromAxis(this.axis));
    this.setAttribute('aria-live', ARIA.LIVE_ASSERTIVE);
    if (this._grid && this._startNode && this._endNode) {
      this.setAttribute('aria-valuenow', ARIA.VALUE_DEFAULT);
      this.setAttribute('aria-valuemin', ARIA.VALUE_MIN);
      this.setAttribute('aria-valuemax', ARIA.VALUE_MAX);
      this.setAttribute('aria-valuetext', formatSplitRatio(50));
    }
  }

  private _setupEventListeners(): void {
    this._boundStartDrag = this._handlePointerDown.bind(this);
    this._boundHandleKeyDown = this._handleKeyDown.bind(this);
    this.addEventListener('pointerdown', this._boundStartDrag);
    this.addEventListener('keydown', this._boundHandleKeyDown);
  }

  private _cleanup(): void {
    if (this._boundStartDrag) {
      this.removeEventListener('pointerdown', this._boundStartDrag);
      this._boundStartDrag = undefined;
    }
    if (this._boundHandleKeyDown) {
      this.removeEventListener('keydown', this._boundHandleKeyDown);
      this._boundHandleKeyDown = undefined;
    }
    if (this._boundMove) {
      window.removeEventListener('pointermove', this._boundMove);
      this._boundMove = undefined;
    }
    if (this._boundStop) {
      window.removeEventListener('pointerup', this._boundStop);
      this._boundStop = undefined;
    }
    this.removeAttribute('data-synthetic-hover');
    this.removeAttribute('data-synthetic-active');
    this._isDragging = false;
  }

  private get _pivot(): 'start' | 'end' | undefined {
    const panel = safeClosest(this, SELECTORS.PANEL);
    if (!panel) return undefined;
    const slot = panel.getAttribute('slot');
    if (slot === SLOTS.LEFT) return 'end';
    if (slot === SLOTS.RIGHT) return 'start';
    return undefined;
  }

  private _updateAriaAttributes(): void {
    if (!this._grid || !this._startNode || !this._endNode) return;
    const rectStart = this._startNode.getBoundingClientRect();
    const rectEnd = this._endNode.getBoundingClientRect();
    const isHorizontal = this.axis === 'x';
    const startSize = isHorizontal ? rectStart.width : rectStart.height;
    const endSize = isHorizontal ? rectEnd.width : rectEnd.height;
    const totalSize = startSize + endSize;
    if (totalSize > 0) {
      const percentage = Math.round((startSize / totalSize) * 100);
      this.setAttribute('aria-valuenow', percentage.toString());
      this.setAttribute('aria-valuemin', ARIA.VALUE_MIN);
      this.setAttribute('aria-valuemax', ARIA.VALUE_MAX);
      this.setAttribute('aria-valuetext', formatSplitRatio(percentage));
    }
  }

  private _detectDoubleTap(e: PointerEvent): boolean {
    const now = Date.now();
    const dt = now - this._lastTapTime;
    const currentPos: Position = { x: e.clientX, y: e.clientY };
    if (
      dt < DOUBLE_TAP.MAX_TIME_MS &&
      isWithinDistance(
        currentPos,
        this._lastTapPosition,
        DOUBLE_TAP.MAX_DISTANCE_PX
      )
    ) {
      triggerHapticFeedback(DOUBLE_TAP.VIBRATION_MS);
      this.resetSizes(e as MouseEvent);
      this._lastTapTime = 0;
      return true;
    }
    this._lastTapTime = now;
    this._lastTapPosition = currentPos;
    return false;
  }

  private _handlePointerDown = (e: PointerEvent): void => {
    if (this._detectDoubleTap(e)) return;
    e.preventDefault();
    this._isDragging = true;
    this.setSyntheticActiveState(true);

    const startPosition: Position = { x: e.clientX, y: e.clientY };
    const startValue = this.axis === 'x' ? e.clientX : e.clientY;

    this.dispatchEvent(
      createCustomEvent(EVENTS.RESIZE_START, { axis: this.axis, startPosition })
    );

    if (this._grid && this._startNode && this._endNode) {
      const rectStart = this._startNode.getBoundingClientRect();
      const rectEnd = this._endNode.getBoundingClientRect();
      this._startSize = this.axis === 'x' ? rectStart.width : rectStart.height;
      this._endSize = this.axis === 'x' ? rectEnd.width : rectEnd.height;
    }

    this._boundMove = this._createMoveHandler(startValue);
    this._boundStop = this._createStopHandler(startValue);
    window.addEventListener('pointermove', this._boundMove);
    window.addEventListener('pointerup', this._boundStop);
  };

  private _createMoveHandler(startValue: number): (e: PointerEvent) => void {
    return (e: PointerEvent) => {
      if (!this._isDragging) return;
      const currentValue = this.axis === 'x' ? e.clientX : e.clientY;
      const delta = currentValue - startValue;
      const position: Position = { x: e.clientX, y: e.clientY };
      this.dispatchEvent(
        createCustomEvent(EVENTS.RESIZE_DRAG, {
          axis: this.axis,
          delta,
          position,
        })
      );
      if (this._grid && this._startNode && this._endNode) {
        this._updateGridSizes(delta);
      }
    };
  }

  private _createStopHandler(startValue: number): (e: PointerEvent) => void {
    return (e: PointerEvent) => {
      const currentValue = this.axis === 'x' ? e.clientX : e.clientY;
      const delta = currentValue - startValue;
      const position: Position = { x: e.clientX, y: e.clientY };
      this.dispatchEvent(
        createCustomEvent(EVENTS.RESIZE_END, {
          axis: this.axis,
          delta,
          position,
        })
      );
      if (this._boundMove) {
        window.removeEventListener('pointermove', this._boundMove);
        this._boundMove = undefined;
      }
      if (this._boundStop) {
        window.removeEventListener('pointerup', this._boundStop);
        this._boundStop = undefined;
      }
      if (this._grid) this._grid.style.removeProperty('transition');
      this._isDragging = false;
      this.setSyntheticActiveState(false);
    };
  }

  private _updateGridSizes(delta: number): void {
    if (!this._grid) return;
    this._grid.style.transition = 'none';
    const start = this._startSize + delta;
    const end = this._endSize - delta;
    const total = start + end || 1;
    this._grid.style.setProperty(
      '--start-element-size',
      `${calculateFlexRatio(start, total)}fr`
    );
    this._grid.style.setProperty(
      '--end-element-size',
      `${calculateFlexRatio(end, total)}fr`
    );
    this._updateAriaAttributes();
  }

  private _handleKeyDown = (e: KeyboardEvent): void => {
    const navKeys = [
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
      'PageUp',
      'PageDown',
    ];
    if (!navKeys.includes(e.key)) return;
    e.preventDefault();
    e.stopPropagation();

    const step = e.shiftKey ? KEYBOARD.LARGE_STEP_PX : KEYBOARD.DEFAULT_STEP_PX;
    const isHorizontal = this.axis === 'x';
    let delta = 0;

    if (e.key === 'ArrowUp' && !isHorizontal) delta = -step;
    else if (e.key === 'ArrowDown' && !isHorizontal) delta = step;
    else if (e.key === 'ArrowLeft' && isHorizontal) delta = -step;
    else if (e.key === 'ArrowRight' && isHorizontal) delta = step;
    else if (e.key === 'Home' && this._grid && this._startNode) {
      const rect = this._startNode.getBoundingClientRect();
      delta = isHorizontal ? -rect.width : -rect.height;
    } else if (e.key === 'End' && this._grid && this._endNode) {
      const rect = this._endNode.getBoundingClientRect();
      delta = isHorizontal ? rect.width : rect.height;
    }

    if (delta !== 0) this._handleKeyboardResize(delta);
  };

  private _handleKeyboardResize(delta: number): void {
    const position: Position = { x: 0, y: 0 };
    this.dispatchEvent(
      createCustomEvent(EVENTS.RESIZE_START, {
        axis: this.axis,
        startPosition: position,
      })
    );
    if (this._grid && this._startNode && this._endNode) {
      const rectStart = this._startNode.getBoundingClientRect();
      const rectEnd = this._endNode.getBoundingClientRect();
      const isHorizontal = this.axis === 'x';
      this._startSize = isHorizontal ? rectStart.width : rectStart.height;
      this._endSize = isHorizontal ? rectEnd.width : rectEnd.height;
      const start = this._startSize + delta;
      const end = this._endSize - delta;
      const total = start + end || 1;
      this._grid.style.setProperty(
        '--start-element-size',
        `${calculateFlexRatio(start, total)}fr`
      );
      this._grid.style.setProperty(
        '--end-element-size',
        `${calculateFlexRatio(end, total)}fr`
      );
      this._updateAriaAttributes();
    }
    this.dispatchEvent(
      createCustomEvent(EVENTS.RESIZE_DRAG, {
        axis: this.axis,
        delta,
        position,
      })
    );
    this.dispatchEvent(
      createCustomEvent(EVENTS.RESIZE_END, { axis: this.axis, delta, position })
    );
  }

  render() {
    return html`
      <div class="handle-content">
        <span class="sr-only">
          Use arrow keys to resize, hold Shift for larger steps. Double-click to
          reset.
        </span>
        <div>
          ${this._pivot === 'start'
            ? html`<slot name="${SLOTS.PIVOT}"></slot>`
            : ''}
        </div>
        <div class="icon-container" part="icon-container">
          <slot name="${SLOTS.ICON}"></slot>
        </div>
        <div>
          ${this._pivot === 'end'
            ? html`<slot name="${SLOTS.PIVOT}"></slot>`
            : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cds-resizer-handle': CDSResizerHandle;
  }
}

export default CDSResizerHandle;
