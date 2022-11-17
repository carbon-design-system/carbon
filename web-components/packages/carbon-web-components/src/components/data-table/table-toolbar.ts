/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import styles from './data-table.scss';

const { prefix } = settings;

/**
 * Table toolbar.
 *
 * @element bx-table-toolbar
 */
@customElement(`${prefix}-table-toolbar`)
class BXTableToolbar extends LitElement {
  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'section');
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

export default BXTableToolbar;
