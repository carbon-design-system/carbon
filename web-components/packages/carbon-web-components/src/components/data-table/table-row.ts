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
import FocusMixin from '../../globals/mixins/focus';
import styles from './data-table.scss';

const { prefix } = settings;

/**
 * Data table row.
 *
 * @element bx-table-row
 * @csspart selection-container The container of the checkbox.
 * @csspart selection The checkbox.
 * @fires bx-table-row-change-selection
 *   The custom event fired before this row is selected/unselected upon a user gesture.
 *   Cancellation of this event stops the user-initiated change in selection.
 */
@customElement(`${prefix}-table-row`)
class BXTableRow extends FocusMixin(LitElement) {
  /**
   * Handles `click` event on the check box.
   *
   * @param event The event.
   */
  private _handleClickSelectionCheckbox(event: Event) {
    const selected = (event.target as HTMLInputElement).checked;
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        selected,
      },
    };
    const constructor = this.constructor as typeof BXTableRow;
    if (this.dispatchEvent(new CustomEvent(constructor.eventBeforeChangeSelection, init))) {
      this.selected = selected;
    }
  }

  /**
   * @returns The first set of table cells.
   */
  protected _renderFirstCells() {
    const { disabled, selected, selectionLabel, selectionName, selectionValue } = this;
    // Using `@click` instead of `@change` to support `.preventDefault()`
    return !selectionName
      ? undefined
      : html`
          <div part="selection-container" class="${prefix}--table-column-checkbox">
            ${html`
              <input
                id="selection"
                part="selection"
                class="${prefix}--checkbox"
                type="checkbox"
                value="${selectionValue}"
                name="${selectionName}"
                ?disabled="${disabled}"
                .checked=${selected}
                @click=${this._handleClickSelectionCheckbox}
              />
              <label for="selection" class="${prefix}--checkbox-label" aria-label="${selectionLabel}"></label>
            `}
          </div>
        `;
  }

  /**
   * `true` if this table row should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * `true` if this table row is placed at an even position in parent `<bx-table-body>`.
   * `<bx-table-body>` sets this property, _only_ in zebra stripe mode.
   *
   * @private
   */
  @property({ type: Boolean, reflect: true })
  even = false;

  /**
   * `true` if this table row is placed at an odd position in parent `<bx-table-body>`.
   * `<bx-table-body>` sets this property, _only_ in zebra stripe mode.
   *
   * @private
   */
  @property({ type: Boolean, reflect: true })
  odd = false;

  /**
   * `true` if this table row should be selected.
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * The `aria-label` attribute for the `<label>` for selection.
   */
  @property({ attribute: 'selection-label' })
  selectionLabel = '';

  /**
   * The `name` attribute for the `<input>` for selection.
   * If present, this table row will be a selectable one.
   */
  @property({ attribute: 'selection-name' })
  selectionName = '';

  /**
   * The `value` attribute for the `<input>` for selection.
   */
  @property({ attribute: 'selection-value' })
  selectionValue = '';

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'row');
    }
    super.connectedCallback();
  }

  render() {
    return html`
      ${this._renderFirstCells()}<slot></slot>
    `;
  }

  /**
   * The name of the custom event fired before this row is selected/unselected upon a user gesture.
   * Cancellation of this event stops the user-initiated change in selection.
   */
  static get eventBeforeChangeSelection() {
    return `${prefix}-table-row-change-selection`;
  }

  /**
   * The CSS selector to find the table.
   */
  static get selectorTable() {
    return `${prefix}-table`;
  }

  static styles = styles;
}

export default BXTableRow;
