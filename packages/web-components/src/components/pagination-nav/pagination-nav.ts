/**
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { prefix } from '../../globals/settings';
import styles from './pagination-nav.scss?lit';
import { classMap } from 'lit/directives/class-map.js';
import CaretLeft16 from '@carbon/icons/es/caret--left/16.js';
import CaretRight16 from '@carbon/icons/es/caret--right/16.js';
import OverflowMenu from '@carbon/icons/es/overflow-menu--horizontal/16.js';
import { iconLoader } from '../../globals/internal/icon-loader';
import '../icon-button';
import {
  PAGINATION_NAV_SIZE,
  PAGINATION_TOOLTIP_ALIGNMENT,
  PAGINATION_TOOLTIP_POSITION,
} from './defs';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * Translation IDs and default translations
 */
const translationIds = {
  'carbon.pagination-nav.next': 'carbon.pagination-nav.next',
  'carbon.pagination-nav.previous': 'carbon.pagination-nav.previous',
  'carbon.pagination-nav.item': 'carbon.pagination-nav.item',
  'carbon.pagination-nav.active': 'carbon.pagination-nav.active',
  'carbon.pagination-nav.of': 'carbon.pagination-nav.of',
} as const;

type TranslationKey = keyof typeof translationIds;

const defaultTranslations: Record<TranslationKey, string> = {
  [translationIds['carbon.pagination-nav.next']]: 'Next',
  [translationIds['carbon.pagination-nav.previous']]: 'Previous',
  [translationIds['carbon.pagination-nav.item']]: 'Page',
  [translationIds['carbon.pagination-nav.active']]: 'Active',
  [translationIds['carbon.pagination-nav.of']]: 'of',
};

/**
 * Default translation function
 */
const defaultTranslateWithId = (messageId: TranslationKey): string => {
  return defaultTranslations[messageId];
};

/**
 * Pagination Navigation.
 *
 * @element cds-pagination-nav
 * @fires cds-page-changed - The custom event fired when the the page has been changed.
 */
@customElement(`${prefix}-pagination-nav`)
class CDSPaginationNav extends LitElement {
  /**
   * Internal state for items displayed on page
   */
  @state()
  private itemsDisplayedOnPage!: number;

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
   * The number of items to be shown (minimum of 4 unless props.items < 4).
   */
  @property({ attribute: 'items-shown', reflect: true, type: Number })
  itemsShown = 10;

  /**
   * Whether user should be able to loop through the items when reaching first / last.
   */
  @property({ attribute: 'loop', type: Boolean })
  loop = false;

  /**
   * The index of current page.
   */
  @property({ attribute: 'page', reflect: true, type: Number })
  page = 0;

  /**
   * The total number of items.
   */
  @property({ attribute: 'total-items', reflect: true, type: Number })
  totalItems = 1;

  /**
   * Specify the size of the PaginationNav.
   */
  @property({ reflect: true })
  size = PAGINATION_NAV_SIZE.LARGE;

  /**
   * Specify the alignment of the tooltip for the icon-only next/prev buttons.
   * Can be one of: start, center, or end.
   */
  @property({ attribute: 'tooltip-alignment', reflect: true })
  tooltipAlignment = PAGINATION_TOOLTIP_ALIGNMENT.CENTER;

  /**
   * Specify the position of the tooltip for the icon-only next/prev buttons.
   * Can be one of: top, right, bottom, or left.
   */
  @property({ attribute: 'tooltip-position', reflect: true })
  tooltipPosition = PAGINATION_TOOLTIP_POSITION.BOTTOM;

  /**
   * If true, the '...' pagination overflow will not render page links between the first and last rendered buttons.
   * Set this to true if you are having performance problems with large data sets.
   */
  @property({ attribute: 'disable-overflow', reflect: true, type: Boolean })
  disableOverflow?: boolean;

  /**
   * Translates component strings using your i18n tool.
   */
  @property({ attribute: false })
  translateWithId: (messageId: TranslationKey) => string =
    defaultTranslateWithId;

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
   * Sets the current page to a specified index.
   */
  private _setIndex(index: number) {
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
   * Reduce current page by one, but no lower than 0.
   */
  private _decrementIndex() {
    const { loop, page, totalItems } = this;
    const wouldLoop = page - 1 < 0;

    if (loop) {
      this.page = wouldLoop ? totalItems - 1 : page - 1;
    } else {
      this.page = Math.max(this.page - 1, 0);
    }
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSPaginationNav).eventChange,
        {
          bubbles: true,
          composed: true,
          detail: {
            page: this.page,
          },
        }
      )
    );
  }

  /**
   * Increase current page by one, but no higher than (this.totalItems - 1).
   */
  private _incrementIndex() {
    const { loop, page, totalItems } = this;
    const wouldLoop = page + 1 >= totalItems;

    if (loop) {
      this.page = wouldLoop ? 0 : page + 1;
    } else {
      this.page = Math.min(this.page + 1, this.totalItems - 1);
    }
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSPaginationNav).eventChange,
        {
          bubbles: true,
          composed: true,
          detail: {
            page: this.page,
          },
        }
      )
    );
  }

  /**
   * Renders a single pagination item & button.
   */
  private _renderPaginationItem(itemPage: number, isActive = false) {
    const { translateWithId: t } = this;
    const itemLabel = t('carbon.pagination-nav.item');
    const classes = {
      [`${prefix}--pagination-nav__page`]: true,
      [`${prefix}--pagination-nav__page--active`]: isActive,
    };

    return html`
      <li class="${prefix}--pagination-nav__list-item">
        <button
          class=${classMap(classes)}
          type="button"
          @click=${() => this._setIndex(itemPage)}
          data-page="${itemPage + 1}"
          aria-current=${ifDefined(isActive ? 'page' : undefined)}>
          <span class="${prefix}--pagination-nav__accessibility-label">
            ${isActive
              ? `${t('carbon.pagination-nav.active')}, ${itemLabel}`
              : itemLabel}
          </span>
          ${itemPage + 1}
        </button>
      </li>
    `;
  }

  /**
   * Renders overflow items in a select list.
   *
   */
  private _renderPaginationOverflow(fromIndex: number, count: number) {
    const { translateWithId: t } = this;

    if (count > 1) {
      return html`
        <li class="${prefix}--pagination-nav__list-item">
          <div class="${prefix}--pagination-nav__select">
            <select
              class="${prefix}--pagination-nav__page ${prefix}--pagination-nav__page--select"
              aria-label="Select ${t('carbon.pagination-nav.item')} number"
              ?disabled="${this.disableOverflow}"
              @change=${(e: Event) => {
                const target = e.target as HTMLSelectElement;
                const index = Number(target.value);
                this._setIndex(index);
                (e.target as HTMLSelectElement).value = '';
              }}>
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
              ${iconLoader(OverflowMenu, {
                class: `${prefix}--pagination-nav__select-icon`,
              })}
            </div>
          </div>
        </li>
      `;
    } else if (count === 1) {
      return this._renderPaginationItem(fromIndex);
    } else {
      return html``;
    }
  }

  render() {
    const {
      loop,
      page,
      totalItems,
      _incrementIndex: incrementIndex,
      _decrementIndex: decrementIndex,
      translateWithId: t,
      size,
      tooltipAlignment,
      tooltipPosition,
    } = this;
    const backwardButtonDisabled = !loop && page <= 0;
    const forwardButtonDisabled = !loop && page >= totalItems - 1;

    const startOffset = this.itemsDisplayedOnPage <= 4 && this.page > 1 ? 0 : 1;

    const align =
      tooltipAlignment === 'center'
        ? tooltipPosition
        : `${tooltipPosition}-${tooltipAlignment}`;

    const navClasses = classMap({
      [`${prefix}--pagination-nav`]: true,
      [`${prefix}--layout--size-${size}`]: size,
    });

    return html`
      <nav class="${navClasses}" aria-label="pagination">
        <ul class="${prefix}--pagination-nav__list">
          <li class="${prefix}--pagination-nav__list-item">
            <cds-icon-button
              kind="ghost"
              align="${align}"
              size="${size}"
              ?disabled=${backwardButtonDisabled}
              @click=${decrementIndex}>
              <span slot="tooltip-content"
                >${this.translateWithId('carbon.pagination-nav.previous')}</span
              >
              ${iconLoader(CaretLeft16, { slot: 'icon' })}
            </cds-icon-button>
          </li>

          ${
            // render first item if at least 5 items can be displayed or
            // 4 items can be displayed and the current page is either 0 or 1
            this.itemsDisplayedOnPage >= 5 ||
            (this.itemsDisplayedOnPage <= 4 && this.page <= 1)
              ? this._renderPaginationItem(0, this.page === 0)
              : ''
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
            this.totalItems > 1
              ? this._renderPaginationItem(
                  this.totalItems - 1,
                  this.page === this.totalItems - 1
                )
              : ''
          }
          <li class="${prefix}--pagination-nav__list-item">
            <cds-icon-button
              kind="ghost"
              align="${align}"
              size="${size}"
              ?disabled=${forwardButtonDisabled}
              @click=${incrementIndex}>
              <span slot="tooltip-content"
                >${this.translateWithId('carbon.pagination-nav.next')}</span
              >
              ${iconLoader(CaretRight16, { slot: 'icon' })}
            </cds-icon-button>
          </li>
        </ul>
        <div
          aria-live="polite"
          aria-atomic="true"
          class="${prefix}--pagination-nav__accessibility-label">
          ${`${t('carbon.pagination-nav.item')} ${
            this.page + 1
          } ${t('carbon.pagination-nav.of')} ${this.totalItems}`}
        </div>
      </nav>
    `;
  }

  shouldUpdate(changedProperties) {
    // Prevent setting "page" outside bounds of available pages.
    if (changedProperties.has('totalItems') || changedProperties.has('page')) {
      if (this.page > this.totalItems) {
        this.page = this.totalItems - 1;
      }
      if (this.page < 0) {
        this.page = 0;
      }
    }

    return true;
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
      let numberOfPages: number;

      switch (this.size) {
        case PAGINATION_NAV_SIZE.MEDIUM:
          numberOfPages = this.itemsShown === 4 ? this.itemsShown : 5;
          break;

        case PAGINATION_NAV_SIZE.SMALL:
          numberOfPages = Math.min(Math.max(4, this.itemsShown), 7);
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

  static get eventChange() {
    return `${prefix}-page-changed`;
  }

  static styles = styles;
}

export default CDSPaginationNav;
