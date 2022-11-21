/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { html, property, customElement, LitElement } from 'lit-element';
import styles from './structured-list.scss';

const { prefix } = settings;

/**
 * Structured list header row.
 *
 * @element bx-structured-list-header-row
 */
@customElement(`${prefix}-structured-list-header-row`)
class BXStructuredListHeaderRow extends LitElement {
  /**
   * The `name` attribute for the `<input>` for selection.
   * If present, this structured list header row will show its selectable version of the UI.
   */
  @property({ attribute: 'selection-name' })
  selectionName = '';

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'row');
    }
    super.connectedCallback();
  }

  render() {
    // We could look up in DOM for `bx-structured-list[hasSelection]`,
    // but uses `hasSelection` prop to utilize attribute change callback
    if (this.selectionName) {
      return html`
        <slot></slot>
        <div class="${prefix}--structured-list-th"></div>
      `;
    }
    return html` <slot></slot> `;
  }

  static styles = styles;
}

export default BXStructuredListHeaderRow;
