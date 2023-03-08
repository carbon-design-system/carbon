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
import styles from './data-table.scss';

/**
 * Table toolbar content.
 *
 * @element cds-table-toolbar-content
 */
@customElement(`${prefix}-table-toolbar-content`)
class BXTableToolbarContent extends LitElement {
  /**
   * `true` if this batch actions bar is active.
   */
  @property({ type: Boolean, reflect: true, attribute: 'has-batch-actions' })
  hasBatchActions = false;

  updated(changedProperties) {
    if (changedProperties.has('hasBatchActions')) {
      this.setAttribute('tabindex', `${this.hasBatchActions ? '-1' : ''}`);
    }
  }

  render() {
    return html` <slot></slot> `;
  }

  static styles = styles;
}

export default BXTableToolbarContent;
