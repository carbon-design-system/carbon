/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import { html, property, customElement, LitElement } from 'lit-element';
import CaretLeft24 from '@carbon/icons/lib/caret--left/24';
import CaretRight24 from '@carbon/icons/lib/caret--right/24';
import settings from 'carbon-components/es/globals/js/settings';
import FocusMixin from '../../globals/mixins/focus';
import HostListenerMixin from '../../globals/mixins/host-listener';
import HostListener from '../../globals/decorators/host-listener';
import { forEach } from '../../globals/internal/collection-helpers';
import BXPagesSelect from './pages-select';
import BXPageSizesSelect from './page-sizes-select';
import styles from './pagination.scss';

const { prefix } = settings;

/**
 * Pagination UI.
 *
 * @element bx-pagination
 * @slot page-sizes-select - Where to put in the `<page-sizes-select>`.
 * @fires bx-pages-select-changed - The custom event fired after the current page is changed from `<bx-pages-select>`.
 * @fires bx-page-sizes-select-changed
 *   The custom event fired after the number of rows per page is changed from `<bx-page-sizes-select>`.
 */
@customElement(`${prefix}-pagination`)
class BXPagination extends FocusMixin(HostListenerMixin(LitElement)) {
  /**
   * @returns Page status text.
   */
  private _renderStatusText() {
    const { atLastPage, start, pageSize, total, formatStatusWithDeterminateTotal, formatStatusWithIndeterminateTotal } = this;
    // * Regular: `1-10 of 100 items`
    // * Indeterminate total: `Item 1-10` (`Item 11-` at the last page)
    const end = atLastPage ? undefined : Math.min(start + pageSize, total == null ? Infinity : total);
    const format = total == null ? formatStatusWithIndeterminateTotal : formatStatusWithDeterminateTotal;
    // `start`/`end` properties starts with zero, whereas we want to show number starting with 1
    return format({ start: start + 1, end, count: total });
  }

  /**
   * Handles user-initiated change in the row number the current page starts with.
   *
   * @param start The new current row number, index that starts with zero.
   */
  private _handleUserInitiatedChangeStart(start: number) {
    this.start = start;
    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof BXPagination).eventChangeCurrent, {
        bubbles: true,
        composed: true,
        detail: {
          start,
        },
      })
    );
  }

  /**
   * Handles `click` event on the previous button.
   */
  private _handleClickPrevButton() {
    const { start: oldStart, pageSize } = this;
    const newStart = Math.max(oldStart - pageSize, 0);
    if (newStart !== oldStart) {
      this._handleUserInitiatedChangeStart(newStart);
    }
  }

  /**
   * Handles `click` event on the next button.
   */
  private _handleClickNextButton() {
    const { start: oldStart, pageSize, total } = this;
    const newStart = oldStart + pageSize;
    if (newStart < (total == null ? Infinity : total)) {
      this._handleUserInitiatedChangeStart(newStart);
    }
  }

  /**
   * Handles user-initiated change in current page.
   *
   * @param event The event.
   */
  @HostListener('eventChangePage')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleChangePage = ({ detail }: CustomEvent) => {
    const { value } = detail;
    const { pageSize } = this;
    this._handleUserInitiatedChangeStart(value * pageSize);
  };

  /**
   * Handles user-initiated change in number of rows per page.
   *
   * @param event The event.
   */
  @HostListener('eventChangePageSize')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleChangePageSize = ({ detail }: CustomEvent) => {
    this.pageSize = detail.value;
  };

  /**
   * The formatter, used with determinate the total pages. Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatStatusWithDeterminateTotal = ({ start, end, count }) => `${start}–${end} of ${count} item${count <= 1 ? '' : 's'}`;

  /**
   * The formatter, used with indeterminate the total pages. Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatStatusWithIndeterminateTotal = ({ start, end }) => (end == null ? `Item ${start}–` : `Item ${start}–${end}`);

  /**
   * `true` to explicitly state that user is at the last page.
   */
  @property({ type: Boolean, attribute: 'at-last-page' })
  atLastPage!: boolean;

  /**
   * `true` if the pagination UI should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The assistive text for the button to go to next page.
   */
  @property({ attribute: 'next-button-text' })
  nextButtonText = 'Next page';

  /**
   * Number of items per page.
   */
  @property({ type: Number, attribute: 'page-size' })
  pageSize = 10;

  /**
   * The label text for the UI to select page size.
   */
  @property({ attribute: 'page-size-label-text' })
  pageSizeLabelText!: string;

  /**
   * The assistive text for the button to go to previous page.
   */
  @property({ attribute: 'prev-button-text' })
  prevButtonText = 'Previous page';

  /**
   * The row number where current page start with, index that starts with zero.
   */
  @property({ type: Number })
  start = 0;

  /**
   * The number of total items.
   */
  @property({ type: Number })
  total!: number;

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]) <= 537,
    });
  }

  updated(changedProperties) {
    const { pageSize } = this;
    const { selectorPageSizesSelect, selectorPagesSelect } = this.constructor as typeof BXPagination;
    if (changedProperties.has('pageSize')) {
      forEach(this.querySelectorAll(selectorPageSizesSelect), elem => {
        (elem as BXPageSizesSelect).value = pageSize;
      });
    }
    if (changedProperties.has('pageSize') || changedProperties.has('start')) {
      const { start } = this;
      forEach(this.querySelectorAll(selectorPagesSelect), elem => {
        (elem as BXPagesSelect).value = Math.floor(start / pageSize);
      });
    }
    if (changedProperties.has('pageSize') || changedProperties.has('total')) {
      const { total } = this;
      forEach(this.querySelectorAll(selectorPagesSelect), elem => {
        (elem as BXPagesSelect).total = Math.ceil(total / pageSize);
      });
    }
  }

  render() {
    const {
      disabled,
      nextButtonText,
      prevButtonText,
      pageSize,
      start,
      total,
      _handleClickPrevButton: handleClickPrevButton,
      _handleClickNextButton: handleClickNextButton,
    } = this;
    const { atLastPage = start + pageSize >= total } = this;
    const prevButtonDisabled = disabled || start === 0;
    const nextButtonDisabled = disabled || atLastPage;
    const prevButtonClasses = classMap({
      [`${prefix}--pagination__button`]: true,
      [`${prefix}--pagination__button--backward`]: true,
      [`${prefix}--pagination__button--no-index`]: prevButtonDisabled,
    });
    const nextButtonClasses = classMap({
      [`${prefix}--pagination__button`]: true,
      [`${prefix}--pagination__button--forward`]: true,
      [`${prefix}--pagination__button--no-index`]: nextButtonDisabled,
    });
    return html`
      <div class="${prefix}--pagination__left">
        <slot name="page-sizes-select"></slot>
        <div class="${prefix}-ce--pagination__divider"></div>
        <span class="${prefix}--pagination__text ${prefix}--pagination__items-count">${this._renderStatusText()}</span>
      </div>
      <div class="${prefix}-ce--pagination__divider"></div>
      <div class="${prefix}--pagination__right">
        <slot></slot>
        <div class="${prefix}--pagination__control-buttons">
          <button
            ?disabled="${prevButtonDisabled}"
            class="${prevButtonClasses}"
            title="${prevButtonText}"
            @click="${handleClickPrevButton}"
          >
            ${CaretLeft24()}
          </button>
          <button
            ?disabled="${nextButtonDisabled}"
            class="${nextButtonClasses}"
            title="${nextButtonText}"
            @click="${handleClickNextButton}"
          >
            ${CaretRight24()}
          </button>
        </div>
      </div>
    `;
  }

  /**
   * A selector that will return the select box for the current page.
   */
  static get selectorPagesSelect() {
    return `${prefix}-pages-select`;
  }

  /**
   * A selector that will return the select box for page sizes.
   */
  static get selectorPageSizesSelect() {
    return `${prefix}-page-sizes-select`;
  }

  /**
   * The name of the custom event fired after the current row number is changed.
   */
  static get eventChangeCurrent() {
    return `${prefix}-pagination-changed-current`;
  }

  /**
   * The name of the custom event fired after the current page is changed from `<bx-pages-select>`.
   */
  static get eventChangePage() {
    return `${prefix}-pages-select-changed`;
  }

  /**
   * The name of the custom event fired after the number of rows per page is changed from `<bx-page-sizes-select>`.
   */
  static get eventChangePageSize() {
    return `${prefix}-page-sizes-select-changed`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXPagination;
