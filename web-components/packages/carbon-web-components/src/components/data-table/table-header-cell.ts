/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import ArrowsVertical32 from '@carbon/icons/lib/arrows--vertical/32';
import ArrowDown32 from '@carbon/icons/lib/arrow--down/32';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import {
  TABLE_SORT_CYCLE,
  TABLE_SORT_CYCLES,
  TABLE_SORT_DIRECTION,
} from './defs';
import styles from './data-table.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

export { TABLE_SORT_CYCLE, TABLE_SORT_CYCLES, TABLE_SORT_DIRECTION };

/**
 * Data table header cell.
 *
 * @element cds-table-header-cell
 * @fires cds-table-header-cell-sort
 *   The custom event fired before a new sort direction is set upon a user gesture.
 *   Cancellation of this event stops the user-initiated change in sort direction.
 */
@customElement(`${prefix}-table-header-cell`)
class CDSTableHeaderCell extends FocusMixin(LitElement) {
  /**
   * Handles `click` event on the sort button.
   *
   */
  private _handleClickSortButton(event) {
    if (
      !(event.target as HTMLElement).matches(
        (this.constructor as typeof CDSTableHeaderCell).slugItem
      )
    ) {
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
      const constructor = this.constructor as typeof CDSTableHeaderCell;
      if (
        this.dispatchEvent(new CustomEvent(constructor.eventBeforeSort, init))
      ) {
        this.sortActive = true;
        this.sortDirection = nextSortDirection;
      }
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
   * Handles `slotchange` event.
   */
  protected _handleSlugSlotChange({ target }: Event) {
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .filter((elem) =>
        (elem as HTMLElement).matches !== undefined
          ? (elem as HTMLElement).matches(
              (this.constructor as typeof CDSTableHeaderCell).slugItem
            )
          : false
      );
    if (hasContent.length > 0) {
      this._hasSlug = Boolean(hasContent);
      (hasContent[0] as HTMLElement).setAttribute('size', 'mini');
    }

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
    const directions = (this.constructor as typeof CDSTableHeaderCell)
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
   * `true` if there is a slug.
   */
  protected _hasSlug = false;

  /**
   * `true` if the table has expandable rows
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-sortable' })
  isExpandable = false;

  /**
   * `true` if this table has selectable rows
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-sortable' })
  isSelectable = false;
  /**
   * `true` if this table header column should be sortable
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-sortable' })
  isSortable = false;

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

  /**
   * TODO: Uncomment when Carbon fully implements sticky header
   * Specify whether the header should be sticky.
   * Still experimental: may not work with every combination of table props
   */
  // @property({ type: Boolean, reflect: true, attribute: 'sticky-header' })
  // stickyHeader = false;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'columnheader');
    }

    super.connectedCallback();
  }

  updated(changedProperties) {
    if (
      this.isSortable &&
      !changedProperties.has('sortDirection') &&
      !this.sortDirection
    ) {
      this.sortDirection = TABLE_SORT_DIRECTION.NONE;
    }
    if (this._hasSlug) {
      this.setAttribute('slug', '');
    } else {
      this.removeAttribute('slug');
    }
  }

  render() {
    const { sortDirection } = this;
    const labelClasses = classMap({
      [`${prefix}--table-header-label`]: true,
      [`${prefix}--table-header-label--slug`]: this._hasSlug,
    });
    if (sortDirection) {
      const sortIcon =
        sortDirection === TABLE_SORT_DIRECTION.NONE
          ? ArrowsVertical32({
              part: 'sort-icon',
              class: `${prefix}--table-sort__icon-unsorted`,
            })
          : ArrowDown32({
              part: 'sort-icon',
              class: `${prefix}--table-sort__icon`,
            });
      return html`
        <button
          part="sort-button"
          class="${prefix}--table-sort"
          title="${this.textContent}"
          @click=${this._handleClickSortButton}>
          <span class="${prefix}--table-sort__flex">
            <span part="label-text" class="${prefix}--table-header-label"
              ><slot @slotchange=${this._handleSlotChange}></slot
            ></span>
            <slot
              name="slug"
              @slotchange="${this._handleSlugSlotChange}"></slot>
            ${sortIcon}
          </span>
        </button>
      `;
    }
    return html`<span part="label-text" class="${labelClasses}">
      <slot></slot
      ><slot name="slug" @slotchange="${this._handleSlugSlotChange}"></slot
    ></span> `;
  }
  /**
   * A selector that will return the slug item.
   */
  static get slugItem() {
    return `${prefix}-slug`;
  }

  /**
   * The name of the custom event fired before a new sort direction is set upon a user gesture.
   * Cancellation of this event stops the user-initiated change in sort direction.
   */
  static get eventBeforeSort() {
    return `${prefix}-table-header-cell-sort`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles;

  /**
   * Mapping of table sort cycles to table sort states.
   */
  static TABLE_SORT_CYCLES = TABLE_SORT_CYCLES;
}

export default CDSTableHeaderCell;
