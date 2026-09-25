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
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import '../button/index';
import '../search/index';
import '../tag/index';
import '../breadcrumb/index';
import '../link/index';
import { prefix } from '../../globals/settings';
import styles from './add-select-body.scss?lit';

const blockClass = `${prefix}--add-select__next`;

/**
 * Add Select Body component - contains the main content area
 * @element cds-add-select-body
 * @slot default - The main content area containing cds-add-select-column or rows
 * @slot header - Replaces the entire header section
 * @slot actions - Custom actions (filter/sort) rendered next to the search input
 * @slot sub-header-actions - Custom content rendered after breadcrumbs and item count
 * @fires cds-add-select-body-search - Fired when search term changes; detail: { searchTerm }
 * @fires cds-add-select-body-breadcrumb-click - Fired when a breadcrumb link is clicked; detail: { index }
 */
@customElement(`${prefix}-add-select-body`)
class CDSAddSelectBody extends LitElement {
  /**
   * Label for items section
   */
  @property({ type: String, attribute: 'items-label' })
  itemsLabel = '';

  /**
   * Global search label
   */
  @property({ type: String, attribute: 'global-search-label' })
  globalSearchLabel = '';

  /**
   * Global search placeholder
   */
  @property({ type: String, attribute: 'global-search-placeholder' })
  globalSearchPlaceholder = 'Search';

  /**
   * Search results title
   */
  @property({ type: String, attribute: 'search-results-title' })
  searchResultsTitle = 'Search results';

  /**
   * Current search term
   */
  @state()
  private _searchTerm = '';

  /**
   * Item count for display. When undefined, no count badge is rendered.
   */
  @property({ type: Number, attribute: 'item-count' })
  itemCount: number | undefined = undefined;

  /**
   * Whether to hide the search input
   */
  @property({ type: Boolean, attribute: 'hide-search', reflect: true })
  hideSearch = false;

  /**
   * Layout direction for the list body: 'vertical' (default) or 'horizontal' (for hierarchy)
   */
  @property({ type: String, reflect: true })
  layout: 'vertical' | 'horizontal' = 'vertical';

  /**
   * Navigation path for breadcrumbs
   */
  @property({ type: Array })
  path: Array<{ id: string; title: string }> = [];

  /**
   * Handle search input
   */
  private _handleSearch(event: CustomEvent) {
    this._searchTerm = event.detail.value || '';
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: { searchTerm: this._searchTerm },
    };
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSAddSelectBody).eventSearch,
        init
      )
    );
  }

  /** Tracks whether the header slot has been filled by the consumer */
  @state()
  private _hasHeaderSlot = false;

  private _handleHeaderSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasHeaderSlot = slot.assignedElements({ flatten: true }).length > 0;
  }

  render() {
    const {
      itemsLabel,
      globalSearchLabel,
      globalSearchPlaceholder,
      searchResultsTitle,
      itemCount,
      hideSearch,
      layout,
      path,
      _searchTerm: searchTerm,
      _handleSearch: handleSearch,
    } = this;

    // Only render the __header div when it has visible content.
    const hasHeader =
      !hideSearch ||
      this._hasHeaderSlot ||
      itemCount !== undefined ||
      (path && path.length > 0);

    return html`
      <div class="${blockClass}__body">
        ${hasHeader
          ? html`
              <div class="${blockClass}__header">
                <!-- Named slot: consumer can replace the entire header -->
                <slot
                  name="header"
                  @slotchange=${this._handleHeaderSlotChange}></slot>

                ${!this._hasHeaderSlot
                  ? html`
                      <!-- Search + optional actions -->
                      ${!hideSearch
                        ? html`
                            <div
                              class="${blockClass}__search ${blockClass}__search--with-actions">
                              <div class="${blockClass}__search-input">
                                <cds-search
                                  label-text=${globalSearchLabel}
                                  placeholder=${globalSearchPlaceholder}
                                  size="lg"
                                  @cds-search-input=${handleSearch}></cds-search>
                              </div>
                              <div class="${blockClass}__global-actions">
                                <slot name="actions"></slot>
                              </div>
                            </div>
                          `
                        : nothing}

                      <!-- Sub-header: breadcrumbs / label + item count + optional actions -->
                      <div class="${blockClass}__sub-header">
                        <div class="${blockClass}__tags">
                          ${searchTerm
                            ? html`
                                <p class="${blockClass}__tags-label">
                                  ${searchResultsTitle}
                                </p>
                              `
                            : path && path.length > 0
                              ? html`
                                  <cds-breadcrumb
                                    no-trailing-slash
                                    class="${blockClass}__breadcrumbs">
                                    ${path.map((entry, idx) => {
                                      const isCurrentPage =
                                        idx === path.length - 1;
                                      return html`
                                        <cds-breadcrumb-item
                                          ?is-current-page=${isCurrentPage}>
                                          ${isCurrentPage
                                            ? entry.title
                                            : html`
                                                <cds-link
                                                  href="#"
                                                  @click=${(e: Event) => {
                                                    e.preventDefault();
                                                    this.dispatchEvent(
                                                      new CustomEvent(
                                                        (
                                                          this
                                                            .constructor as typeof CDSAddSelectBody
                                                        ).eventBreadcrumbClick,
                                                        {
                                                          bubbles: true,
                                                          cancelable: true,
                                                          composed: true,
                                                          detail: {
                                                            index: idx,
                                                          },
                                                        }
                                                      )
                                                    );
                                                  }}>
                                                  ${entry.title}
                                                </cds-link>
                                              `}
                                        </cds-breadcrumb-item>
                                      `;
                                    })}
                                  </cds-breadcrumb>
                                `
                              : html`
                                  <p class="${blockClass}__tags-label">
                                    ${itemsLabel}
                                  </p>
                                `}
                          ${itemCount !== undefined
                            ? html`<cds-tag type="gray" size="sm"
                                >${itemCount}</cds-tag
                              >`
                            : nothing}
                        </div>
                        <slot name="sub-header-actions"></slot>
                      </div>
                    `
                  : nothing}
              </div>
            `
          : nothing}

        <!-- Body Content -->
        <div class="${blockClass}__content" role="grid" tabindex="0">
          <div
            class="${blockClass}-list-body${layout === 'horizontal'
              ? ` ${blockClass}-list-body--horizontal`
              : ''}"
            role="rowgroup">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * The name of the custom event fired when search term changes
   */
  static get eventSearch() {
    return `${prefix}-add-select-body-search`;
  }

  /**
   * The name of the custom event fired when breadcrumb is clicked
   */
  static get eventBreadcrumbClick() {
    return `${prefix}-add-select-body-breadcrumb-click`;
  }

  static styles = styles;
}

export default CDSAddSelectBody;
