/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import settings from 'carbon-components/es/globals/js/settings';
import styles from './structured-list.scss';

const { prefix } = settings;

/**
 * Structured list cell.
 *
 * @element bx-structured-list-cell
 */
@customElement(`${prefix}-structured-list-cell`)
class BXStructuredListCell extends LitElement {
  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'cell');
    }
    super.connectedCallback();
  }

  render() {
    return html` <slot></slot> `;
  }

  static styles = styles;
}

export default BXStructuredListCell;
