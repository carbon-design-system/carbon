/**
 * Copyright IBM Corp. 2026, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { prefix } from '../../globals/settings';
import styles from './resizer-handle-pivot.scss?lit';
import { SELECTORS } from './defs';
import type CDSResizerHandle from './resizer-handle';

/**
 * Resizer handle pivot — corner handle that delegates drag operations to its
 * sibling `cds-resizer-handle[slot="handle-horizontal"]`.
 * @element cds-resizer-handle-pivot
 */
@customElement(`${prefix}-resizer-handle-pivot`)
class CDSResizerHandlePivot extends LitElement {
  static styles = styles;

  private _cachedHandle: CDSResizerHandle | null = null;

  private _getHandle(): CDSResizerHandle | null {
    if (this._cachedHandle) return this._cachedHandle;
    const verticalHandle = this.parentElement;
    if (!verticalHandle) return null;
    const innerGrid = verticalHandle.closest(SELECTORS.GRID);
    if (!innerGrid) return null;
    const panel = innerGrid.closest(SELECTORS.PANEL);
    if (!panel) return null;
    const outerGrid = panel.closest(SELECTORS.GRID);
    if (!outerGrid) return null;
    const h = outerGrid.querySelector<CDSResizerHandle>(
      `${SELECTORS.HANDLE}[slot="handle-horizontal"]`
    );
    this._cachedHandle = h;
    return h;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('slot', 'pivot');
    this.setAttribute(
      'position',
      (this.parentElement as CDSResizerHandle).pivot ?? ''
    );
    this.addEventListener('pointerdown', this._handlePointerDown);
    this.addEventListener('pointerenter', this._handlePointerEnter);
    this.addEventListener('pointerleave', this._handlePointerLeave);
    this.addEventListener('dblclick', this._resetSizes);
  }

  disconnectedCallback(): void {
    const handle = this._cachedHandle ?? this._getHandle();
    handle?.setSyntheticHoverState(false);
    handle?.setSyntheticActiveState(false);
    this._cachedHandle = null;
    super.disconnectedCallback();
  }

  private _resetSizes = (e: MouseEvent) => {
    this._getHandle()?.resetSizes(e);
  };

  private _handlePointerDown = (e: PointerEvent) => {
    const handle = this._getHandle();
    if (handle) {
      handle.setSyntheticActiveState(true);
      handle.startDrag(e);
    }
  };

  private _handlePointerEnter = () => {
    this._getHandle()?.setSyntheticHoverState(true);
  };

  private _handlePointerLeave = () => {
    const handle = this._getHandle();
    if (handle) {
      handle.setSyntheticHoverState(false);
      handle.setSyntheticActiveState(false);
    }
  };

  render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cds-resizer-handle-pivot': CDSResizerHandlePivot;
  }
}

export default CDSResizerHandlePivot;
