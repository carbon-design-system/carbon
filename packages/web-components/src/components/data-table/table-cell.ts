/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './data-table.scss?lit';

/**
 * Data table cell.
 *
 * @element cds-table-cell
 */
class CDSTableCell extends LitElement {
  static is = `${prefix}-table-cell`;

  /**
   * Specify whether the overflow menu (if it exists) should be shown always, or only on hover
   */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'overflow-menu-on-hover',
  })
  overflowMenuOnHover = false;

  /**
   * The table size.
   */
  @property({ reflect: true })
  size;

  /**
   * TODO: Uncomment when Carbon fully implements sticky header
   * Specify whether the header should be sticky.
   * Still experimental: may not work with every combination of table props
   */
  // @property({ type: Boolean, reflect: true, attribute: 'sticky-header' })
  // stickyHeader = false;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'cell');
    }
    super.connectedCallback();
  }

  render() {
    return html`<slot></slot>`;
  }

  static styles = styles;
}

export default CDSTableCell;
