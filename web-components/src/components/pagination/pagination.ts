/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import CaretLeft16 from '@carbon/icons/lib/caret--left/16';
import CaretRight16 from '@carbon/icons/lib/caret--right/16';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import HostListenerMixin from '../../globals/mixins/host-listener';
import HostListener from '../../globals/decorators/host-listener';
import styles from './pagination.scss?lit';
import { PAGINATION_SIZE } from './defs';
import CDSSelect from '../select/select';
import '../button/index';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Pagination UI.
 *
 * @element cds-pagination
 * @slot page-sizes-select - Where to put in the `<page-sizes-select>`.
 * @fires cds-pages-select-changed - The custom event fired after the current page is changed from `<cds-pages-select>`.
 * @fires cds-page-sizes-select-changed
 *   The custom event fired after the number of rows per page is changed from `<cds-page-sizes-select>`.
 */
@customElement(`${prefix}-pagination`)
class CDSPagination extends FocusMixin(HostListenerMixin(LitElement)) {
  @query(`${prefix}-select`)
  private _pageSizeSelect!: HTMLElement;

  private _handleSlotChange({ target }: Event) {
    const content = (target as HTMLSlotElement)
      .assignedNodes()
      .filter(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );

    content.forEach((item) => {
      this._pageSizeSelect.appendChild(item);
    });
  }

  /**
   * @returns Page status text.
   */
  private _renderStatusText() {
    const {
      start,
      pageSize,
      totalItems,
      pagesUnknown,
      formatStatusWithDeterminateTotal,
      formatStatusWithIndeterminateTotal,
    } = this;
    // * Regular: `1-10 of 100 items`
    // * Indeterminate total: `Item 1-10` (`Item 11-` at the last page)
    const end = Math.min(
      start + pageSize,
      totalItems == null ? Infinity : totalItems
    );
    const format =
      totalItems == null || pagesUnknown
        ? formatStatusWithIndeterminateTotal
        : formatStatusWithDeterminateTotal;

    // `start`/`end` properties starts with zero, whereas we want to show number starting with 1
    return format({ start: start + 1, end, count: totalItems });
  }

  /**
   * Handles user-initiated change in the row number the current page starts with.
   *
   * @param start The new current row number, index that starts with zero.
   */
  private _handleUserInitiatedChangeStart(start: number) {
    this.start = start;
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSPagination).eventChangeCurrent,
        {
          bubbles: true,
          composed: true,
          detail: {
            page: this.page,
            pageSize: this.pageSize,
          },
        }
      )
    );
  }

  /**
   * Handles `click` event on the previous button.
   */
  private _handleClickPrevButton() {
    const { start: oldStart, pageSize } = this;
    this.page--;
    const newStart = Math.max(oldStart - pageSize, 0);
    if (newStart !== oldStart) {
      this._handleUserInitiatedChangeStart(newStart);
    }
  }

  /**
   * Handles `click` event on the next button.
   */
  private _handleClickNextButton() {
    const { start: oldStart, pageSize, totalItems } = this;
    this.page++;
    const newStart = oldStart + pageSize;
    if (newStart < (totalItems == null ? Infinity : totalItems)) {
      this._handleUserInitiatedChangeStart(newStart);
    }
  }

  /**
   * Handles user-initiated change in number of rows per page.
   *
   * @param event The event.
   */
  @HostListener('eventChangeSelect')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleChangeSelector(event) {
    const { value } = event.detail;
    const { totalItems, pageSize } = this;

    if (event.composedPath()[0] === this._pageSizeSelect) {
      this.pageSize = parseInt(value);
      // Default pageSize to effectively be 1 when we have a value of 0 to avoid
      // division by 0.
      this.totalPages =
        pageSize > 0 ? Math.ceil(totalItems / pageSize) : totalItems;
      this.page = 1;
      this.start = 0;
    } else {
      this.page = value;
      this._handleUserInitiatedChangeStart((value - 1) * pageSize);
    }
  }

  /**
   * The assistive text for the button to go to previous page.
   */
  @property({ attribute: 'backward-text' })
  backwardText = 'Previous page';

  /**
   * The current page
   */
  @property({ type: Number, reflect: true })
  page = 1;

  /**
   * The formatter for the assistive text for screen readers to announce.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatLabelText = ({ count }) =>
    `Page number, of ${count} page${count <= 1 ? '' : 's'}`;

  /**
   * The formatter, used with determinate the total pages. Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatStatusWithDeterminateTotal = ({ start, end, count }) =>
    `${start}–${end} of ${count} item${count <= 1 ? '' : 's'}`;

  /**
   * The formatter, used with indeterminate the total pages. Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatStatusWithIndeterminateTotal = ({ start, end, count }) =>
    end == null
      ? `Item ${start}–`
      : `${start}–${end} item${count <= 1 ? '' : 's'}`;

  /**
   * The formatter for the text next to the select box. Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatSupplementalText = ({ count }) =>
    this.pagesUnknown || !this.totalItems
      ? `page`
      : `of ${count} page${count <= 1 ? '' : 's'}`;
  /**
   * `true` to explicitly state that user is at the last page.
   */
  @property({ type: Boolean, attribute: 'is-last-page' })
  isLastPage!: boolean;

  /**
   * The translatable text indicating the number of items per page.
   */
  @property({ attribute: 'items-per-page-text' })
  itemsPerPageText = 'Items per page:';

  /**
   * `true` if the pagination UI should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The assistive text for the button to go to next page.
   */
  @property({ attribute: 'forward-text' })
  forwardText = 'Next page';

  /**
   * true if the select box to change the page should be disabled.
   */
  @property({ type: Boolean, attribute: 'page-input-disabled' })
  pageInputDisabled = false;

  /**
   * Number of items per page.
   */
  @property({ type: Number, attribute: 'page-size', reflect: true })
  pageSize = 10;

  /**
   * true if the select box to change the items per page should be disabled.
   */
  @property({ type: Boolean, attribute: 'page-size-input-disabled' })
  pageSizeInputDisabled;

  /**
   * The label text for the UI to select page size.
   */
  @property({ attribute: 'page-size-label-text' })
  pageSizeLabelText!: string;

  /**
   * true if the total number of items is unknown.
   */
  @property({ type: Boolean, reflect: true, attribute: 'pages-unknown' })
  pagesUnknown = false;

  /**
   * Specify the size of the Pagination.
   */
  @property({ reflect: true })
  size = PAGINATION_SIZE.MEDIUM;

  /**
   * The row number where current page start with, index that starts with zero.
   */
  @property({ type: Number })
  start = 0;

  /**
   * The number of total items.
   */
  @property({ type: Number, attribute: 'total-items' })
  totalItems!: number;

  /**
   * The number of total pages.
   */
  @property({ type: Number })
  totalPages = 1;

  updated(changedProperties) {
    const { page, pageSize, totalItems } = this;
    const { selectorPageSizesSelect, selectorPagesSelect } = this
      .constructor as typeof CDSPagination;

    if (changedProperties.has('pageSize')) {
      (this.shadowRoot!.querySelector(selectorPageSizesSelect) as any).value =
        pageSize;
    }
    if (changedProperties.has('pageSize') || changedProperties.has('start')) {
      // Default pageSize to effectively be 1 when we have a value of 0 to avoid
      // division by 0.
      this.totalPages =
        pageSize > 0 ? Math.ceil(totalItems / pageSize) : totalItems;
      (this.shadowRoot!.querySelector(selectorPagesSelect) as CDSSelect).value =
        this.page.toString();
    }

    if (changedProperties.has('page')) {
      this._handleUserInitiatedChangeStart((page - 1) * pageSize);
    }
  }

  render() {
    const {
      page,
      disabled,
      forwardText,
      backwardText,
      itemsPerPageText,
      pageInputDisabled,
      pageSize,
      pageSizeInputDisabled,
      pagesUnknown,
      size,
      start,
      totalItems,
      totalPages,
      _handleClickPrevButton: handleClickPrevButton,
      _handleClickNextButton: handleClickNextButton,
      _handleSlotChange: handleSlotChange,
      formatLabelText,
      formatSupplementalText,
    } = this;

    const { isLastPage = start + pageSize >= totalItems } = this;
    const prevButtonDisabled = disabled || start === 0;
    const nextButtonDisabled = disabled || isLastPage;

    const prevButtonClassMap = {
      [`${prefix}--btn`]: true,
      [`${prefix}--btn--icon-only`]: true,
      [`${prefix}--pagination__button`]: true,
      [`${prefix}--pagination__button--backward`]: true,
      [`${prefix}--pagination__button--no-index`]: prevButtonDisabled,
      [`${prefix}--btn--${size}`]: true,
      [`${prefix}--btn--ghost`]: true,
    };
    const nextButtonClassMap = {
      [`${prefix}--btn`]: true,
      [`${prefix}--btn--icon-only`]: true,
      [`${prefix}--pagination__button`]: true,
      [`${prefix}--pagination__button--forward`]: true,
      [`${prefix}--pagination__button--no-index`]: nextButtonDisabled,
      [`${prefix}--btn--${size}`]: true,
      [`${prefix}--btn--ghost`]: true,
    };

    const prevButtonClasses = Object.entries(prevButtonClassMap)
      .filter(([, value]) => value === true)
      .map(([key]) => key)
      .join(' ');
    const nextButtonClasses = Object.entries(nextButtonClassMap)
      .filter(([, value]) => value === true)
      .map(([key]) => key)
      .join(' ');

    return html`
      <div class="${prefix}--pagination__left">
        <label for="select" class="${prefix}--pagination__text"
          ><slot name="label-text">${itemsPerPageText}</slot></label
        >
        <cds-select
          ?disabled=${disabled || pageSizeInputDisabled}
          id="page-size-select"
          left-select
          pagination
          size="${size}"
          inline
          value="${pageSize}">
          <slot @slotchange=${handleSlotChange}></slot>
        </cds-select>
        <span
          class="${prefix}--pagination__text ${prefix}--pagination__items-count"
          >${this._renderStatusText()}</span
        >
      </div>
      <div class="${prefix}--pagination__right">
        <label for="select" class="${prefix}--label ${prefix}--visually-hidden">
          ${formatLabelText({ count: totalPages })}
        </label>
        ${pagesUnknown || !totalItems
          ? html`
              <span
                class="${prefix}--pagination__text ${prefix}--pagination__page-text"
                >${formatSupplementalText({ count: totalPages })}</span
              >

              <cds-select
                ?disabled=${disabled || pageInputDisabled}
                id="pages-select"
                pagination
                size="${size}"
                inline
                value="${page}">
                ${Array.from(new Array(totalPages)).map(
                  (_item, index) =>
                    html`
                      <cds-select-item value="${index + 1}">
                        ${index + 1}
                      </cds-select-item>
                    `
                )}
              </cds-select>
            `
          : html`
              <cds-select
                ?disabled=${disabled || pageInputDisabled}
                id="pages-select"
                pagination
                size="${size}"
                inline
                value="${page}">
                ${Array.from(new Array(totalPages)).map(
                  (_item, index) =>
                    html`
                      <cds-select-item value="${index + 1}">
                        ${index + 1}
                      </cds-select-item>
                    `
                )}
              </cds-select>
              <span class="${prefix}--pagination__text"
                >${formatSupplementalText({ count: totalPages })}</span
              >
            `}

        <div class="${prefix}--pagination__control-buttons">
          <cds-button
            pagination
            size="${size}"
            ?disabled="${prevButtonDisabled}"
            button-class-name="${prevButtonClasses}"
            tooltip-text="${backwardText}"
            @click="${handleClickPrevButton}">
            ${CaretLeft16({ slot: 'icon' })}
          </cds-button>
          <cds-button
            tooltip-position="top-right"
            pagination
            size="${size}"
            ?disabled="${nextButtonDisabled}"
            button-class-name="${nextButtonClasses}"
            tooltip-text="${forwardText}"
            @click="${handleClickNextButton}">
            ${CaretRight16({ slot: 'icon' })}
          </cds-button>
        </div>
      </div>
    `;
  }

  /**
   * A selector that will return the select box for the current page.
   */
  static get selectorPagesSelect() {
    return `${prefix}-select#pages-select`;
  }

  /**
   * A selector that will return the select box for page sizes.
   */
  static get selectorPageSizesSelect() {
    return `${prefix}-select`;
  }

  /**
   * The name of the custom event fired after the current row number is changed.
   */
  static get eventChangeCurrent() {
    return `${prefix}-pagination-changed-current`;
  }

  /**
   * The name of the custom event fired after the number of rows per page is changed from `<cds-page-sizes-select>`.
   */
  static get eventChangeSelect() {
    return `${prefix}-select-selected`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles; // `styles` here is a `CSSResult` generated by custom Vite loader
}

export default CDSPagination;
