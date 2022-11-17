/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { html, customElement, LitElement } from 'lit-element';
import styles from './structured-list.scss';

const { prefix } = settings;

/**
 * Structured list header.
 *
 * @element bx-structured-list-head
 */
@customElement(`${prefix}-structured-list-head`)
class BXStructuredListHeader extends LitElement {
  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'rowgroup');
    }
    super.connectedCallback();
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  static styles = styles;
}

export default BXStructuredListHeader;
