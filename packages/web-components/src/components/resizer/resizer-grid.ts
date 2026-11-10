/**
 * Copyright IBM Corp. 2026, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { prefix } from '../../globals/settings';
import styles from './resizer-grid.scss?lit';

/**
 * Resizer grid component for managing resizable panels.
 * @element cds-resizer-grid
 */
@customElement(`${prefix}-resizer-grid`)
class CDSResizerGrid extends LitElement {
  static styles = styles;

  render() {
    return html`
      <slot name="left"></slot>
      <slot name="top"></slot>
      <slot name="handle-horizontal"></slot>
      <slot name="handle-vertical"></slot>
      <slot name="right"></slot>
      <slot name="bottom"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cds-resizer-grid': CDSResizerGrid;
  }
}

export default CDSResizerGrid;
