/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import styles from './structured-list.scss?lit';

/**
 * Structured list header.
 *
 * @element cds-structured-list-head
 */
@customElement(`${prefix}-structured-list-head`)
class CDSStructuredListHeader extends LitElement {
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

export default CDSStructuredListHeader;
