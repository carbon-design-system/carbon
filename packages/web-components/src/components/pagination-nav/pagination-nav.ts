/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import CaretLeft16 from '@carbon/icons/es/caret--left/16.js';
import CaretRight16 from '@carbon/icons/es/caret--right/16.js';
import OverflowMenuHorizontal16 from '@carbon/icons/es/overflow-menu--horizontal/16.js';
import FocusMixin from '../../globals/mixins/focus';
import HostListenerMixin from '../../globals/mixins/host-listener';
import styles from './pagination-nav.scss?lit';
import { PAGINATION_NAV_SIZE } from './defs';
import { iconLoader } from '../../globals/internal/icon-loader';
import '../icon-button/index';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Translation IDs
 */
const translationIds = {
  'carbon.pagination-nav.next': 'Next',
  'carbon.pagination-nav.previous': 'Previous',
  'carbon.pagination-nav.item': 'Page',
  'carbon.pagination-nav.active': 'Active',
  'carbon.pagination-nav.of': 'of',
};

/**
 * Pagination navigation component
 *
 * @element cds-pagination-nav
 * @fires cds-pagination-nav-changed - The custom event fired when the current page changes
 */
@customElement(`${prefix}-pagination-nav`)
class CDSPaginationNav extends FocusMixin(HostListenerMixin(LitElement)) {
  /**
   * Calculate cuts for pagination display
   */
  private _calculateCuts(
    page: number,
    totalItems: number,
    itemsDisplayedOnPage: number,
    splitPoint: number | null = null
  ) {
    if (itemsDisplayedOnPage >= totalItems) {
      return { front: 0, back: 0 };
    }

    const split = splitPoint || Math.ceil(itemsDisplayedOnPage / 2) - 1;

    let frontHidden = page + 1 - split;
    let backHidden = totalItems - page - (itemsDisplayedOnPage - split) + 1;

    if (frontHidden <= 1) {
      backHidden -= frontHidden <= 0 ? Math.abs(frontHidden) + 1 : 0;
      frontHidden = 0;
    }

    if (backHidden <= 1) {
      frontHidden -= backHidden <= 0 ? Math.abs(backHidden) + 1 : 0;
      backHidden = 0;
    }

    return { front: frontHidden, back: backHidden };
  }

  /**
   * Jump to a specific page
   */
  private _jumpToItem(index: number) {
    if (index >= 0 && index < this.totalItems) {
      this.page = index;
      this.dispatchEvent(
        new CustomEvent(
          (this.constructor as typeof CDSPaginationNav).eventChange,
          {
            bubbles: true,
            composed: true,
            detail: {
              page: index,
            },
          }
        )
      );
    }
  }

  /**
   * Jump to the next page
   */
  private _jumpToNext() {
    const nextIndex = this.page + 1;

    if (nextIndex >= this.totalItems) {
      if (this.loop) {
        this._jumpToItem(0);
      }
    } else {
      this._jumpToItem(nextIndex);
    }
  }

  /**
   * Jump to the previous page
   */
  private _jumpToPrevious() {
    const previousIndex = this.page - 1;

    if (previousIndex < 0) {
      if (this.loop) {
        this._jumpToItem(this.totalItems - 1);
      }
    } else {
      this._jumpToItem(previousIndex);
    }
  }

  /**
   * Check if a page would be hidden in the current view
   */
  private _pageWouldBeHidden(page: number) {
    const startOffset = this.itemsDisplayedOnPage <= 4 && this.page > 1 ? 0 : 1;

    const wouldBeHiddenInFront =
      (page >= startOffset && page <= this.cuts.front) || page === 0;
    const wouldBeHiddenInBack =
      page >= this.totalItems - this.cuts.back - 1 &&
      page <= this.totalItems - 2;

    return wouldBeHiddenInFront || wouldBeHiddenInBack;
  }

  /**
   * If true, the '...' pagination overflow will not render page links between the first and last rendered buttons.
   */
  @property({ type: Boolean, reflect: true })
  disableOverflow = false;

  /**
   * The number of items to be shown (minimum of 4 unless props.items < 4).
   */
  @property({ type: Number, attribute: 'items-shown' })
  itemsShown = 10;

  /**
   * Whether user should be able to loop through the items when reaching first / last.
   */
  @property({ type: Boolean, reflect: true })
  loop = false;

  /**
   * The index of current page.
   */
  @property({ type: Number, reflect: true })
  page = 0;

  /**
   * Specify the size of the PaginationNav.
   */
  @property({ reflect: true })
  size = PAGINATION_NAV_SIZE.LARGE;

  /**
   * Specify the alignment of the tooltip for the icon-only next/prev buttons.
   */
  @property({ attribute: 'tooltip-alignment' })
  tooltipAlignment = 'center';

  /**
   * Specify the position of the tooltip for the icon-only next/prev buttons.
   */
  @property({ attribute: 'tooltip-position' })
  tooltipPosition = 'bottom';

  /**
   * The total number of items.
   */
  @property({ type: Number, attribute: 'total-items' })
  totalItems = 10;

  /**
   * Internal state for items displayed on page
   */
  @state()
  private itemsDisplayedOnPage = 10;

  /**
   * Internal state for cuts
   */
  @state()
  private cuts = { front: 0, back: 0 };

  /**
   * Internal state for previous page
   */
  @state()
  private prevPage: number | null = null;

  /**
   * Translate function for i18n
   */
  private _translate(key: string): string {
    return translationIds[key] || key;
  }

  updated(changedProperties) {
    if (changedProperties.has('page')) {
      this.prevPage = changedProperties.get('page');
    }

    if (
      changedProperties.has('totalItems') ||
      changedProperties.has('itemsShown') ||
      changedProperties.has('size')
    ) {
      let numberOfPages;
      switch (this.size) {
        case PAGINATION_NAV_SIZE.MEDIUM:
          numberOfPages = this.itemsShown === 4 ? this.itemsShown : 5;
          break;
        case PAGINATION_NAV_SIZE.SMALL:
          numberOfPages = Math.min(Math.max(this.itemsShown, 4), 7);
          break;
        default:
          numberOfPages = 4;
          break;
      }

      this.itemsDisplayedOnPage = Math.max(
        this.itemsShown >= 4 ? this.itemsShown : numberOfPages,
        4
      );
      this.cuts = this._calculateCuts(
        this.page,
        this.totalItems,
        this.itemsDisplayedOnPage
      );
    }

    if (changedProperties.has('page') && this._pageWouldBeHidden(this.page)) {
      const delta = this.page - (this.prevPage || 0);

      if (delta > 0) {
        const splitPoint = this.itemsDisplayedOnPage - 3;
        this.cuts = this._calculateCuts(
          this.page,
          this.totalItems,
          this.itemsDisplayedOnPage,
          splitPoint
        );
      } else {
        const splitPoint = this.itemsDisplayedOnPage > 4 ? 2 : 1;
        this.cuts = this._calculateCuts(
          this.page,
          this.totalItems,
          this.itemsDisplayedOnPage,
          splitPoint
        );
      }
    }
  }

  /**
   * Render a pagination item
   */
  private _renderPaginationItem(itemPage: number, isActive = false) {
    const itemLabel = this._translate('carbon.pagination-nav.item');

    return html`
      <li class="${prefix}--pagination-nav__list-item">
        <button
          type="button"
          class="${prefix}--pagination-nav__page ${isActive
            ? `${prefix}--pagination-nav__page--active`
            : ''}"
          @click="${() => this._jumpToItem(itemPage)}"
          data-page="${itemPage + 1}"
          ?aria-current="${isActive ? 'page' : false}">
          <span class="${prefix}--pagination-nav__accessibility-label">
            ${isActive
              ? `${this._translate('carbon.pagination-nav.active')}, ${itemLabel}`
              : itemLabel}
          </span>
          ${itemPage + 1}
        </button>
      </li>
    `;
  }

  /**
   * Render a pagination overflow
   */
  private _renderPaginationOverflow(fromIndex: number, count: number) {
    if (count <= 0) {
      return html``;
    }

    if (this.disableOverflow === true && count > 1) {
      return html`
        <li class="${prefix}--pagination-nav__list-item">
          <div class="${prefix}--pagination-nav__select">
            <select
              class="${prefix}--pagination-nav__page ${prefix}--pagination-nav__page--select"
              aria-label="Select ${this._translate(
                'carbon.pagination-nav.item'
              )} number"
              disabled></select>
            <div class="${prefix}--pagination-nav__select-icon-wrapper">
              ${iconLoader(OverflowMenuHorizontal16)}
            </div>
          </div>
        </li>
      `;
    }

    if (count > 1) {
      return html`
        <li class="${prefix}--pagination-nav__list-item">
          <div class="${prefix}--pagination-nav__select">
            <select
              class="${prefix}--pagination-nav__page ${prefix}--pagination-nav__page--select"
              aria-label="Select ${this._translate(
                'carbon.pagination-nav.item'
              )} number"
              @change="${(e: Event) => {
                const index = Number((e.target as HTMLSelectElement).value);
                this._jumpToItem(index);
              }}">
              <option value="" hidden></option>
              ${Array.from({ length: count }).map(
                (_, i) => html`
                  <option
                    value="${fromIndex + i}"
                    data-page="${fromIndex + i + 1}"
                    key="overflow-${fromIndex + i}">
                    ${fromIndex + i + 1}
                  </option>
                `
              )}
            </select>
            <div class="${prefix}--pagination-nav__select-icon-wrapper">
              ${iconLoader(OverflowMenuHorizontal16)}
            </div>
          </div>
        </li>
      `;
    }

    if (count === 1) {
      return this._renderPaginationItem(fromIndex);
    }

    return html``;
  }

  /**
   * Render a direction button (next/previous)
   */
  private _renderDirectionButton(
    direction: 'forward' | 'backward',
    disabled: boolean,
    onClick: () => void
  ) {
    const label =
      direction === 'forward'
        ? this._translate('carbon.pagination-nav.next')
        : this._translate('carbon.pagination-nav.previous');

    const align =
      this.tooltipAlignment === 'center'
        ? this.tooltipPosition
        : `${this.tooltipPosition}-${this.tooltipAlignment}`;

    return html`
      <li class="${prefix}--pagination-nav__list-item">
        <cds-icon-button
          align="${align}"
          ?disabled="${disabled}"
          kind="ghost"
          label="${label}"
          @click="${onClick}">
          ${direction === 'forward'
            ? iconLoader(CaretRight16)
            : iconLoader(CaretLeft16)}
        </cds-icon-button>
      </li>
    `;
  }

  render() {
    const backwardButtonDisabled = !this.loop && this.page === 0;
    const forwardButtonDisabled =
      !this.loop && this.page === this.totalItems - 1;
    const startOffset = this.itemsDisplayedOnPage <= 4 && this.page > 1 ? 0 : 1;

    const classNames = {
      [`${prefix}--pagination-nav`]: true,
      [`${prefix}--layout--size-${this.size}`]: !!this.size,
    };

    const finalClassNames = Object.entries(classNames)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(' ');

    return html`
      <nav class="${finalClassNames}" aria-label="pagination">
        <ul class="${prefix}--pagination-nav__list">
          ${this._renderDirectionButton(
            'backward',
            backwardButtonDisabled,
            this._jumpToPrevious.bind(this)
          )}
          ${
            // render first item if at least 5 items can be displayed or
            // 4 items can be displayed and the current page is either 0 or 1
            (this.itemsDisplayedOnPage >= 5 ||
              (this.itemsDisplayedOnPage <= 4 && this.page <= 1)) &&
            this._renderPaginationItem(0, this.page === 0)
          }
          ${
            /* render first overflow */
            this._renderPaginationOverflow(startOffset, this.cuts.front)
          }
          ${
            // render items between overflows
            Array.from({ length: this.totalItems })
              .map((_, i) => i)
              .slice(startOffset + this.cuts.front, (1 + this.cuts.back) * -1)
              .map((item) =>
                this._renderPaginationItem(item, this.page === item)
              )
          }
          ${
            /* render second overflow */
            this._renderPaginationOverflow(
              this.totalItems - this.cuts.back - 1,
              this.cuts.back
            )
          }
          ${
            // render last item unless there is only one in total
            this.totalItems > 1 &&
            this._renderPaginationItem(
              this.totalItems - 1,
              this.page === this.totalItems - 1
            )
          }
          ${this._renderDirectionButton(
            'forward',
            forwardButtonDisabled,
            this._jumpToNext.bind(this)
          )}
        </ul>
        <div
          aria-live="polite"
          aria-atomic="true"
          class="${prefix}--pagination-nav__accessibility-label">
          ${`${this._translate('carbon.pagination-nav.item')} ${
            this.page + 1
          } ${this._translate('carbon.pagination-nav.of')} ${this.totalItems}`}
        </div>
      </nav>
    `;
  }

  /**
   * The name of the custom event fired when the current page changes.
   */
  static get eventChange() {
    return `${prefix}-pagination-nav-changed`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static styles = styles;
}

export default CDSPaginationNav;
