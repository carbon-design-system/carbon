/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import '../search/index';
import '../tag/index';
import '../checkbox/index';
import { prefix } from '../../globals/settings';
import styles from './add-select-column.scss?lit';

const blockClass = `${prefix}--add-select__next`;

/**
 * Add Select Column component — optional column wrapper providing column-level
 * search, title, and "Select All" functionality. Propagates `multi` context to
 * child rows via the `multi` property/attribute.
 * @element cds-add-select-column
 * @slot default - AddSelectRow elements
 * @slot actions - Custom actions (filter/sort) placed next to column search
 * @fires cds-add-select-column-search - Fired when column search changes; detail: { searchTerm }
 * @fires cds-add-select-column-select-all - Fired when "Select All" checkbox changes; detail: { checked }
 */
@customElement(`${prefix}-add-select-column`)
class CDSAddSelectColumn extends LitElement {
  /**
   * Column title shown in the header
   */
  @property({ type: String })
  title = '';

  /**
   * Label text for the column search input (accessibility)
   */
  @property({ type: String, attribute: 'search-label' })
  searchLabel = 'Search';

  /**
   * Placeholder text for the column search input
   */
  @property({ type: String, attribute: 'search-placeholder' })
  searchPlaceholder = 'Search';

  /**
   * Whether to hide the column search input
   */
  @property({ type: Boolean, attribute: 'hide-search', reflect: true })
  hideSearch = false;

  /**
   * Whether this column uses multi-selection (checkboxes) or single-selection (radio buttons)
   */
  @property({ type: Boolean, reflect: true })
  multi = false;

  /**
   * Whether to show the "Select All" checkbox (only when multi is true)
   */
  @property({ type: Boolean, attribute: 'show-select-all', reflect: true })
  showSelectAll = false;

  /**
   * Total number of items in the column (shown in tag badge)
   */
  @property({ type: Number, attribute: 'item-count' })
  itemCount = 0;

  /**
   * Whether all items are currently selected
   */
  @property({ type: Boolean, attribute: 'all-selected', reflect: true })
  allSelected = false;

  /**
   * Whether the "Select All" checkbox is in an indeterminate state
   */
  @property({ type: Boolean, attribute: 'all-indeterminate', reflect: true })
  allIndeterminate = false;

  /** Internal column search term */
  @state()
  private _searchTerm = '';

  /** Whether the actions slot has any assigned content */
  @state()
  private _hasActionsSlot = false;

  private _handleActionsSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasActionsSlot = slot.assignedElements({ flatten: true }).length > 0;
  }

  private _handleSearch(event: CustomEvent) {
    this._searchTerm = (event.detail?.value as string) ?? '';
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSAddSelectColumn).eventSearch,
        {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: { searchTerm: this._searchTerm },
        }
      )
    );
  }

  private _handleSelectAll(event: CustomEvent) {
    const checked = !!event.detail?.checked;
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSAddSelectColumn).eventSelectAll,
        {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: { checked },
        }
      )
    );
  }

  private _handleSlotChange() {
    // Propagate multi to slotted rows
    const slot = this.shadowRoot?.querySelector(
      'slot:not([name])'
    ) as HTMLSlotElement | null;
    if (!slot) {
      return;
    }
    slot.assignedElements({ flatten: true }).forEach((el) => {
      if (el.tagName.toLowerCase() === `${prefix}-add-select-row`) {
        if (this.multi) {
          el.setAttribute('_column-multi', '');
        } else {
          el.removeAttribute('_column-multi');
        }
      }
    });
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('multi')) {
      this._handleSlotChange();
    }
  }

  render() {
    const {
      title,
      searchLabel,
      searchPlaceholder,
      hideSearch,
      multi,
      showSelectAll,
      itemCount,
      allSelected,
      allIndeterminate,
    } = this;

    const columnClasses = classMap({
      [`${blockClass}-column`]: true,
    });

    const showHeader = showSelectAll || !!title;

    return html`
      <div class=${columnClasses} part="column">
        <!-- Column search with optional actions slot -->
        ${!hideSearch
          ? html`
              <div
                class="${classMap({
                  [`${blockClass}-column__search`]: true,
                  [`${blockClass}-column__search--with-actions`]:
                    this._hasActionsSlot,
                })}">
                <div
                  class="${this._hasActionsSlot
                    ? `${blockClass}-column__search-input`
                    : ''}">
                  <cds-search
                    label-text=${searchLabel}
                    placeholder=${searchPlaceholder}
                    size="md"
                    @cds-search-input=${this._handleSearch}></cds-search>
                </div>
                <slot
                  name="actions"
                  class="${blockClass}-column__actions"
                  @slotchange=${this._handleActionsSlotChange}></slot>
              </div>
            `
          : nothing}

        <!-- Column header: Select All checkbox or title -->
        ${showHeader
          ? html`
              <div class="${blockClass}-column__header">
                ${showSelectAll && multi
                  ? html`
                      <cds-checkbox
                        class="${blockClass}-column__select-all"
                        ?checked=${allSelected}
                        ?indeterminate=${allIndeterminate}
                        @cds-checkbox-changed=${this._handleSelectAll}>
                        <span class="${blockClass}-column__title"
                          >${title}</span
                        >
                        ${itemCount > 0
                          ? html`<cds-tag type="gray" size="sm"
                              >${itemCount}</cds-tag
                            >`
                          : nothing}
                      </cds-checkbox>
                    `
                  : html`
                      <div class="${blockClass}-column__title-wrapper">
                        <span class="${blockClass}-column__title"
                          >${title}</span
                        >
                        ${itemCount > 0
                          ? html`<cds-tag type="gray" size="sm"
                              >${itemCount}</cds-tag
                            >`
                          : nothing}
                      </div>
                    `}
              </div>
            `
          : nothing}

        <!-- Rows container -->
        <div class="${blockClass}-column__rows" role="rowgroup">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
      </div>
    `;
  }

  /**
   * The name of the custom event fired when column search changes.
   * detail: { searchTerm: string }
   */
  static get eventSearch() {
    return `${prefix}-add-select-column-search`;
  }

  /**
   * The name of the custom event fired when "Select All" is toggled.
   * detail: { checked: boolean }
   */
  static get eventSelectAll() {
    return `${prefix}-add-select-column-select-all`;
  }

  static styles = styles;
}

export default CDSAddSelectColumn;
