/**
 * Copyright IBM Corp. 2026, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { prefix } from '../../globals/settings';
import styles from './resizer-panel.scss?lit';

/**
 * Resizer panel component for resizable content areas.
 * @element cds-resizer-panel
 */
@customElement(`${prefix}-resizer-panel`)
class CDSResizerPanel extends LitElement {
  static styles = styles;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cds-resizer-panel': CDSResizerPanel;
  }
}

export default CDSResizerPanel;
