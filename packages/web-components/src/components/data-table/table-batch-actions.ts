/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './data-table.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Table batch actions.
 *
 * @element cds-table-batch-actions
 * @fires cds-table-batch-actions-cancel-clicked - The custom event fired after the Cancel button is clicked.
 */
@customElement(`${prefix}-table-batch-actions`)
class CDSTableBatchActions extends LitElement {
  /**
   * Handles `click` event on the Cancel button.
   */
  private _handleCancel() {
    const { eventClickCancel } = this
      .constructor as typeof CDSTableBatchActions;
    this.dispatchEvent(
      new CustomEvent(eventClickCancel, { bubbles: true, composed: true })
    );
  }

  /**
   * `true` if this batch actions bar should be active.
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  /**
   * The formatter for selected items. Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatSelectedItemsCount = ({ count }) =>
    `${count} item${count <= 1 ? '' : 's'} selected`;

  /**
   * Numeric representation of the total number of items selected in a table.
   * This number is used to derive the selection message.
   */
  @property({ type: Number, attribute: 'selected-rows-count' })
  selectedRowsCount = 0;

  firstUpdated() {
    this.querySelectorAll(
      (this.constructor as typeof CDSTableBatchActions).selectorButtons
    ).forEach((e) => {
      e.setAttribute('batch-action', '');
    });
  }

  updated(changedProperties) {
    if (changedProperties.has('active')) {
      this.setAttribute('tabindex', `${this.active ? '' : '-1'}`);
    }
  }

  render() {
    const {
      formatSelectedItemsCount,
      selectedRowsCount,
      _handleCancel: handleCancel,
    } = this;
    return html`
      <div class="${prefix}--batch-summary">
        <p class="${prefix}--batch-summary__para">
          ${formatSelectedItemsCount({ count: selectedRowsCount })}
        </p>
      </div>
      <div class="${prefix}--action-list">
        <slot></slot>
        <button
          class="${prefix}--btn ${prefix}--btn--primary ${prefix}--batch-summary__cancel"
          @click=${handleCancel}>
          <slot name="cancel-button-content">Cancel</slot>
        </button>
      </div>
    `;
  }

  /**
   * The CSS selector to find the action buttons.
   */
  static get selectorButtons() {
    return `${prefix}-button`;
  }

  /**
   * The name of the custom event fired after the Cancel button is clicked.
   */
  static get eventClickCancel() {
    return `${prefix}-table-batch-actions-cancel-clicked`;
  }

  static styles = styles;
}

export default CDSTableBatchActions;
