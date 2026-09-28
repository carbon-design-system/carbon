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

  /** Index of the currently focused row for grid keyboard navigation */
  private _focusedRowIndex = 0;

  /** Reference to the shadow div[role="grid"] — set after first render */
  private _gridEl: HTMLElement | null = null;

  /**
   * Returns all cds-add-select-row host elements in document order.
   * These are in the light DOM of this element, so querySelectorAll finds them.
   */
  private _getRowHosts(): HTMLElement[] {
    return Array.from(
      this.querySelectorAll<HTMLElement>(`${prefix}-add-select-row`)
    );
  }

  /**
   * Keyboard navigation for role="grid" (WAI-ARIA grid pattern).
   * Mirrors the React AddSelectBody handleKeyDown implementation exactly:
   * keydown is on the grid div, focused row has tabindex="0", others "-1".
   */
  private _handleGridKeydown = (event: KeyboardEvent) => {
    const rows = this._getRowHosts();
    if (rows.length === 0) {
      return;
    }

    let handled = false;
    const currentRow = rows[this._focusedRowIndex];

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this._updateRowFocus(this._focusedRowIndex + 1);
        handled = true;
        break;

      case 'ArrowUp':
        event.preventDefault();
        this._updateRowFocus(this._focusedRowIndex - 1);
        handled = true;
        break;

      case 'ArrowRight':
        // Navigate into children if the focused row has them
        if (currentRow && currentRow.hasAttribute('has-children')) {
          event.preventDefault();
          // Trigger navigate by clicking the nav-indicator inside the shadow root
          const navIndicator =
            currentRow.shadowRoot?.querySelector<HTMLElement>(
              '[class*="nav-indicator"]'
            );
          navIndicator?.click();
          handled = true;
        }
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        if (currentRow) {
          // The checkbox/radio host sits in the row's shadow DOM; the actual
          // <input> lives one level deeper inside that component's own shadow.
          const controlHost = currentRow.shadowRoot?.querySelector<HTMLElement>(
            `${prefix}-checkbox, ${prefix}-radio-button`
          );
          const input =
            controlHost?.shadowRoot?.querySelector<HTMLInputElement>(
              'input[type="checkbox"], input[type="radio"]'
            );
          input?.click();
        }
        handled = true;
        break;

      case 'Home':
        if (event.ctrlKey) {
          event.preventDefault();
          this._updateRowFocus(0);
          handled = true;
        }
        break;

      case 'End':
        if (event.ctrlKey) {
          event.preventDefault();
          this._updateRowFocus(rows.length - 1);
          handled = true;
        }
        break;
    }

    if (handled) {
      event.stopPropagation();
    }
  };

  /**
   * Mirrors React's updateItemFocus:
   * - Sets tabindex="0" on the target row host so it is the Tab stop inside
   *   the grid (Tab into grid → focused row, Tab out → next element after grid).
   * - Sets tabindex="-1" on all other row hosts.
   * - Calls .focus() on the target row host when shouldFocus is true.
   *
   * We set tabindex on the cds-add-select-row host elements (light DOM) rather
   * than their inner shadow divs because host elements are real browser Tab
   * stops; shadow-internal elements are not reachable by Tab from outside.
   */
  private _updateRowFocus(targetIndex: number, shouldFocus = true) {
    const rows = this._getRowHosts();
    if (rows.length === 0) {
      return;
    }
    this._focusedRowIndex = Math.max(0, Math.min(targetIndex, rows.length - 1));
    rows.forEach((row, idx) => {
      if (idx === this._focusedRowIndex) {
        row.setAttribute('tabindex', '0');
        if (shouldFocus) {
          row.focus();
        }
      } else {
        row.setAttribute('tabindex', '-1');
      }
    });
  }

  /**
   * After first render, wire the shadow div[role="grid"] as the Tab stop and
   * attach the keydown listener to it (mirrors React: tabIndex={0} + onKeyDown
   * on the grid div).
   */
  protected firstUpdated() {
    const gridEl = this.renderRoot.querySelector<HTMLElement>('[role="grid"]');
    if (gridEl) {
      this._gridEl = gridEl;
      gridEl.setAttribute('tabindex', '0');
      gridEl.addEventListener('keydown', this._handleGridKeydown);
    }
    // Initialise row tabindices without stealing focus (mirrors React useEffect)
    this._updateRowFocus(0, false);
  }

  /**
   * Re-initialise row tabindices when the default slot's content changes
   * (i.e. when rows are added/removed). Called from the default slot's
   * slotchange handler in the template.
   */
  private _handleContentSlotChange = () => {
    this._focusedRowIndex = 0;
    this._updateRowFocus(0, false);
  };

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._gridEl) {
      this._gridEl.removeEventListener('keydown', this._handleGridKeydown);
      this._gridEl = null;
    }
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
        <div class="${blockClass}__content" role="grid">
          <div
            class="${blockClass}-list-body${layout === 'horizontal'
              ? ` ${blockClass}-list-body--horizontal`
              : ''}"
            role="rowgroup">
            <slot @slotchange=${this._handleContentSlotChange}></slot>
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
