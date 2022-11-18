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
import Arrows16 from '@carbon/icons/lib/arrows/16';
import ArrowDown16 from '@carbon/icons/lib/arrow--down/16';
import FocusMixin from '../../globals/mixins/focus';
import {
  TABLE_SORT_CYCLE,
  TABLE_SORT_CYCLES,
  TABLE_SORT_DIRECTION,
} from './defs';
import styles from './data-table.scss';

export { TABLE_SORT_CYCLE, TABLE_SORT_CYCLES, TABLE_SORT_DIRECTION };

const { prefix } = settings;

/**
 * Data table header cell.
 *
 * @element bx-table-header-cell
 * @fires bx-table-header-cell-sort
 *   The custom event fired before a new sort direction is set upon a user gesture.
 *   Cancellation of this event stops the user-initiated change in sort direction.
 */
@customElement(`${prefix}-table-header-cell`)
class BXTableHeaderCell extends FocusMixin(LitElement) {
  /**
   * Handles `click` event on the sort button.
   *
   */
  private _handleClickSortButton() {
    const nextSortDirection = this._getNextSort();
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        oldSortDirection: this.sortDirection,
        sortDirection: nextSortDirection,
      },
    };
    const constructor = this.constructor as typeof BXTableHeaderCell;
    if (
      this.dispatchEvent(new CustomEvent(constructor.eventBeforeSort, init))
    ) {
      this.sortActive = true;
      this.sortDirection = nextSortDirection;
    }
  }

  /**
   * Handles `slotchange` event.
   *
   */
  private _handleSlotChange() {
    this.requestUpdate();
  }

  /**
   * @returns The next sort direction.
   */
  private _getNextSort() {
    const {
      sortCycle = TABLE_SORT_CYCLE.TRI_STATES_FROM_ASCENDING,
      sortDirection,
    } = this;
    if (!sortDirection) {
      throw new TypeError(
        'Table sort direction is not defined. ' +
          'Likely that `_getNextSort()` is called with non-sorted table column, which should not happen in regular condition.'
      );
    }
    const directions = (this.constructor as typeof BXTableHeaderCell)
      .TABLE_SORT_CYCLES[sortCycle];
    const index = directions.indexOf(sortDirection as TABLE_SORT_DIRECTION);
    if (index < 0) {
      if (sortDirection === TABLE_SORT_DIRECTION.NONE) {
        // If the current sort direction is `none` in bi-state sort cycle, returns the first one in the cycle
        return directions[0];
      }
      throw new RangeError(
        `The given sort state (${sortDirection}) is not found in the given table sort cycle: ${sortCycle}`
      );
    }
    return directions[(index + 1) % directions.length];
  }

  /**
   * `true` if this table header cell is of a primary sorting column.
   */
  @property({ type: Boolean, reflect: true, attribute: 'sort-active' })
  sortActive = false;

  /**
   * The table sort cycle in use.
   */
  @property({ reflect: true, attribute: 'sort-cycle' })
  sortCycle?: TABLE_SORT_CYCLE;

  /**
   * The table sort direction.
   * If present, this table header cell will have a sorting UI. Choose between `ascending` or `descending`.
   */
  @property({ reflect: true, attribute: 'sort-direction' })
  sortDirection?: TABLE_SORT_DIRECTION;

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus:
        Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]) <=
        537,
    });
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'columnheader');
    }
    super.connectedCallback();
  }

  render() {
    const { sortDirection } = this;
    if (sortDirection) {
      const sortIcon =
        sortDirection === TABLE_SORT_DIRECTION.NONE
          ? Arrows16({
              part: 'sort-icon',
              class: `${prefix}--table-sort__icon-unsorted`,
            })
          : ArrowDown16({
              part: 'sort-icon',
              class: `${prefix}--table-sort__icon`,
            });
      return html`
        <button
          part="sort-button"
          class="${prefix}--table-sort"
          title="${this.textContent}"
          @click=${this._handleClickSortButton}
        >
          <span part="label-text" class="${prefix}--table-header-label"
            ><slot @slotchange=${this._handleSlotChange}></slot
          ></span>
          ${sortIcon}
        </button>
      `;
    }
    return html` <slot></slot> `;
  }

  /**
   * The name of the custom event fired before a new sort direction is set upon a user gesture.
   * Cancellation of this event stops the user-initiated change in sort direction.
   */
  static get eventBeforeSort() {
    return `${prefix}-table-header-cell-sort`;
  }

  static styles = styles;

  /**
   * Mapping of table sort cycles to table sort states.
   */
  static TABLE_SORT_CYCLES = TABLE_SORT_CYCLES;
}

export default BXTableHeaderCell;
