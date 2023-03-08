/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { forEach } from '../../globals/internal/collection-helpers';
import { TABLE_COLOR_SCHEME, TABLE_SIZE } from './defs';
import styles from './data-table.scss';

export { TABLE_COLOR_SCHEME, TABLE_SIZE };

/**
 * Data table.
 *
 * @element cds-table
 */
@customElement(`${prefix}-table`)
class BXTable extends LitElement {
  /**
   * The table size.
   */
  @property({ reflect: true })
  size = TABLE_SIZE.LG;

  /**
   * `true` if this table should support sorting.
   */
  @property({ type: Boolean, reflect: true })
  sort = false;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'table');
    }
    super.connectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('size')) {
      // Propagate `size` attribute to descendants until `:host-context()` gets supported in all major browsers
      forEach(
        this.querySelectorAll(
          (this.constructor as typeof BXTable).selectorRowsWithHeader
        ),
        (elem) => {
          elem.setAttribute('size', this.size);
        }
      );
    }
  }

  render() {
    return html` <slot></slot> `;
  }

  /**
   * The CSS selector to find the rows, including header rows.
   */
  static get selectorRowsWithHeader() {
    return `${prefix}-table-header-row,${prefix}-table-row`;
  }

  static styles = styles;
}

export default BXTable;
