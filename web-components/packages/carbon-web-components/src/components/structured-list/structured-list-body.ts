/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './structured-list.scss';

/**
 * Structured list body.
 *
 * @element cds-structured-list-body
 */
@customElement(`${prefix}-structured-list-body`)
class BXStructuredListBody extends LitElement {
  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'rowgroup');
    }
    super.connectedCallback();
  }

  render() {
    return html` <slot></slot> `;
  }

  static styles = styles;
}

export default BXStructuredListBody;
