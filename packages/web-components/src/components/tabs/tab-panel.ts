/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './tabs.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Tab panel component.
 * A simple container for tab content that can be shown/hidden based on tab selection.
 *
 * @element cds-tab-panel
 */
@customElement(`${prefix}-tab-panel`)
export default class CDSTabPanel extends LitElement {
  /**
   * `true` if this tab panel should be hidden.
   */
  @property({ type: Boolean, reflect: true })
  hidden = false;

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'tabpanel');
    }
  }

  render() {
    return html` <slot></slot> `;
  }

  static styles = styles;
}
