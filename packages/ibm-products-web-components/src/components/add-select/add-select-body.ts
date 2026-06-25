/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/search/index.js';
import '@carbon/web-components/es/components/tag/index.js';
import '@carbon/web-components/es/components/breadcrumb/index.js';
import '@carbon/web-components/es/components/link/index.js';
import { prefix } from '../../globals/settings';
import styles from './add-select-body.scss?lit';

const blockClass = `${prefix}--add-select__next`;

/**
 * Add Select Body component - contains the main content area
 * @element c4p-add-select-body
 * @slot default - The main content area containing c4p-add-select-content
 * @slot header - Custom header content
 * @fires c4p-add-select-body-search - Fired when search term changes
 */
@customElement(`${prefix}-add-select-body`)
class CDSAddSelectBody extends LitElement {
  /**
   * Whether this is a multi-select (inherited from parent c4p-add-select)
   * @private
   */
  private get _multi(): boolean {
    const parent = this.closest(`${prefix}-add-select`) as any;
    return parent?.multi ?? false;
  }

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
   * No results title
   */
  // @property({ type: String, attribute: 'no-results-title' })
  // noResultsTitle = 'No results found';

  /**
   * No results description
   */
  // @property({ type: String, attribute: 'no-results-description' })
  // noResultsDescription = 'Try adjusting your search or filter';

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
   * Item count for display
   */
  @property({ type: Number, attribute: 'item-count' })
  itemCount = 0;

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

  render() {
    const {
      itemsLabel,
      globalSearchLabel,
      globalSearchPlaceholder,
      searchResultsTitle,
      itemCount,
      path,
      _searchTerm: searchTerm,
      _handleSearch: handleSearch,
    } = this;

    const bodyClasses = classMap({
      [`${blockClass}__body`]: true,
      [`${blockClass}__body--single`]: !this._multi,
      [`${blockClass}__body--multi`]: this._multi,
    });

    return html`
      <div class=${bodyClasses}>
        <!-- Header Section -->
        <div class="${blockClass}__header">
          <slot name="header">
            <!-- Search -->
            <div class="${blockClass}__search">
              <cds-search
                label-text=${globalSearchLabel}
                placeholder=${globalSearchPlaceholder}
                size="lg"
                @cds-search-input=${handleSearch}
              ></cds-search>
            </div>

            <!-- Sub-header with breadcrumbs or item label -->
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
                          class="${classMap({
                            [`${prefix}--add-select__next__breadcrumbs`]: true,
                            [`${prefix}--add-select__next__breadcrumbs--multi`]:
                              this._multi,
                          })}"
                        >
                          ${path.map((entry, idx) => {
                            const isCurrentPage = idx === path.length - 1;
                            return html`
                              <cds-breadcrumb-item
                                ?is-current-page=${isCurrentPage}
                              >
                                ${isCurrentPage
                                  ? entry.title
                                  : html`
                                      <cds-link
                                        href="#"
                                        @click=${(e: Event) => {
                                          e.preventDefault();
                                          const init = {
                                            bubbles: true,
                                            cancelable: true,
                                            composed: true,
                                            detail: { index: idx },
                                          };
                                          this.dispatchEvent(
                                            new CustomEvent(
                                              (
                                                this
                                                  .constructor as typeof CDSAddSelectBody
                                              ).eventBreadcrumbClick,
                                              init
                                            )
                                          );
                                        }}
                                      >
                                        ${entry.title}
                                      </cds-link>
                                    `}
                              </cds-breadcrumb-item>
                            `;
                          })}
                        </cds-breadcrumb>
                      `
                    : html`
                        <p class="${blockClass}__tags-label">${itemsLabel}</p>
                      `}
                <cds-tag type="gray" size="sm">${itemCount}</cds-tag>
              </div>
            </div>
          </slot>
        </div>

        <!-- Body Content -->
        <div class="${blockClass}__content">
          <slot></slot>
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
