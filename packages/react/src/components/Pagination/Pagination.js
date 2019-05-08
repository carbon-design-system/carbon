/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import CaretRight24 from '@carbon/icons-react/lib/caret--right/24';
import CaretLeft24 from '@carbon/icons-react/lib/caret--left/24';
import { settings } from 'carbon-components';
import Select from '../Select';
import SelectItem from '../SelectItem';
import { equals } from '../../tools/array';

const { prefix } = settings;

let instanceId = 0;

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    const { pageSizes, page, pageSize } = this.props;
    this.state = {
      page: page,
      pageSize:
        pageSize && pageSizes.includes(pageSize) ? pageSize : pageSizes[0],
      prevPageSizes: pageSizes,
      prevPage: page,
      prevPageSize: pageSize,
    };
    this.uniqueId = ++instanceId;
  }

  static propTypes = {
    /**
     * The description for the backward icon.
     */
    backwardText: PropTypes.string,

    /**
     * The CSS class names.
     */
    className: PropTypes.string,

    /**
     * The function returning a translatable text showing where the current page is,
     * in a manner of the range of items.
     */
    itemRangeText: PropTypes.func,

    /**
     * The description for the forward icon.
     */
    forwardText: PropTypes.string,

    /**
     * The unique ID of this component instance.
     */
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * The translatable text indicating the number of items per page.
     */
    itemsPerPageText: PropTypes.string,

    /**
     * A variant of `itemRangeText`, used if the total number of items is unknown.
     */
    itemText: PropTypes.func,

    /**
     * The callback function called when the current page changes.
     */
    onChange: PropTypes.func,

    pageNumberText: PropTypes.string,

    /**
     * A function returning PII showing where the current page is.
     */
    pageRangeText: PropTypes.func,

    /**
     * The translatable text showing the current page.
     */
    pageText: PropTypes.func,

    /**
     * The choices for `pageSize`.
     */
    pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,

    /**
     * The total number of items.
     */
    totalItems: PropTypes.number,

    /**
     * `true` if the backward/forward buttons should be disabled.
     */
    disabled: PropTypes.bool,

    /**
     * The current page.
     */
    page: PropTypes.number,

    /**
     * The number dictating how many items a page contains.
     */
    pageSize: PropTypes.number,

    /**
     * `true` if the total number of items is unknown.
     */
    pagesUnknown: PropTypes.bool,

    // TODO: remove when v9 is deprecated
    /**
     * `true` if the current page should be the last page.
     */
    isLastPage: PropTypes.bool,

    /**
     * `true` if the select box to change the page should be disabled.
     */
    pageInputDisabled: PropTypes.bool,
  };

  static defaultProps = {
    backwardText: 'Previous page',
    itemRangeText: (min, max, total) => `${min}–${max} of ${total} items`,
    forwardText: 'Next page',
    itemsPerPageText: 'Items per page:',
    pageNumberText: 'Page Number',
    pageRangeText: (current, total) => `of ${total} pages`,
    disabled: false,
    page: 1,
    pagesUnknown: false,
    isLastPage: false,
    pageInputDisabled: false,
    itemText: (min, max) => `${min}–${max} items`,
    pageText: page => `page ${page}`,
  };

  static getDerivedStateFromProps({ pageSizes, page, pageSize }, state) {
    const {
      prevPageSizes,
      prevPage,
      prevPageSize,
      page: currentPage,
      pageSize: currentPageSize,
    } = state;
    const pageSizesChanged = !equals(pageSizes, prevPageSizes);
    const pageChanged = page !== prevPage;
    const pageSizeChanged = pageSize !== prevPageSize;
    return !pageSizesChanged && !pageChanged && !pageSizeChanged
      ? null
      : {
          page: pageSizesChanged ? 1 : pageChanged ? page : currentPage,
          pageSize: pageSizesChanged
            ? pageSizes[0]
            : pageSizeChanged
            ? pageSize
            : currentPageSize,
          prevPageSizes: pageSizes,
          prevPage: page,
          prevPageSize: pageSize,
        };
  }

  handleSizeChange = evt => {
    const pageSize = Number(evt.target.value);
    this.setState({ pageSize, page: 1 });
    this.props.onChange({ page: 1, pageSize });
  };

  handlePageChange = evt => {
    this.setState({ page: evt.target.value });
  };

  handlePageInputChange = evt => {
    const page = Number(evt.target.value);
    if (
      page > 0 &&
      page <=
        Math.max(Math.ceil(this.props.totalItems / this.state.pageSize), 1)
    ) {
      this.setState({ page });
      this.props.onChange({ page, pageSize: this.state.pageSize });
    }
  };

  incrementPage = () => {
    const page = this.state.page + 1;
    this.setState({ page });
    this.props.onChange({ page, pageSize: this.state.pageSize });
  };

  decrementPage = () => {
    const page = this.state.page - 1;
    this.setState({ page });
    this.props.onChange({ page, pageSize: this.state.pageSize });
  };

  renderSelectItems = total => {
    let counter = 1;
    let itemArr = [];
    while (counter <= total) {
      itemArr.push(
        <SelectItem key={counter} value={counter} text={String(counter)} />
      );
      counter++;
    }
    return itemArr;
  };

  render() {
    const {
      backwardText,
      className,
      forwardText,
      id,
      itemsPerPageText,
      itemRangeText,
      pageRangeText,
      pageSize, // eslint-disable-line no-unused-vars
      pageSizes,
      itemText,
      pageText,
      pageNumberText, // eslint-disable-line no-unused-vars
      pagesUnknown,
      isLastPage,
      pageInputDisabled,
      totalItems,
      onChange, // eslint-disable-line no-unused-vars
      page: pageNumber, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const classNames = classnames(`${prefix}--pagination`, className);
    const inputId = id || this.uniqueId;
    const { page: statePage, pageSize: statePageSize } = this.state;
    const totalPages = Math.max(Math.ceil(totalItems / statePageSize), 1);
    const backButtonDisabled = this.props.disabled || statePage === 1;
    const backButtonClasses = classnames(
      `${prefix}--pagination__button`,
      `${prefix}--pagination__button--backward`,
      {
        [`${prefix}--pagination__button--no-index`]: backButtonDisabled,
      }
    );
    const forwardButtonDisabled =
      this.props.disabled || statePage === totalPages;
    const forwardButtonClasses = classnames(
      `${prefix}--pagination__button`,
      `${prefix}--pagination__button--forward`,
      {
        [`${prefix}--pagination__button--no-index`]: forwardButtonDisabled,
      }
    );
    const selectItems = this.renderSelectItems(totalPages);
    const pageRange = (() => {
      if (pageInputDisabled) {
        return null;
      }
      return (
        <span className={`${prefix}--pagination__text`}>
          {pagesUnknown
            ? pageText(statePage)
            : pageRangeText(statePage, totalPages)}
        </span>
      );
    })();
    return (
      <div className={classNames} {...other}>
        <div className={`${prefix}--pagination__left`}>
          <label
            id={`${prefix}-pagination-select-${inputId}-count-label`}
            className={`${prefix}--pagination__text`}
            htmlFor={`${prefix}-pagination-select-${inputId}`}>
            {itemsPerPageText}
          </label>
          <Select
            id={`${prefix}-pagination-select-${inputId}`}
            className={`${prefix}--select__item-count`}
            labelText=""
            hideLabel
            noLabel
            inline
            onChange={this.handleSizeChange}
            value={statePageSize}>
            {pageSizes.map(size => (
              <SelectItem key={size} value={size} text={String(size)} />
            ))}
          </Select>
          <span className={`${prefix}--pagination__text`}>
            {pagesUnknown
              ? itemText(
                  statePageSize * (statePage - 1) + 1,
                  statePage * statePageSize
                )
              : itemRangeText(
                  Math.min(statePageSize * (statePage - 1) + 1, totalItems),
                  Math.min(statePage * statePageSize, totalItems),
                  totalItems
                )}
          </span>
        </div>
        <div className={`${prefix}--pagination__right`}>
          {pageInputDisabled ? null : (
            <Select
              id={`${prefix}-pagination-select-${inputId + 2}`}
              className={`${prefix}--select__page-number`}
              labelText={`Page number, of ${totalPages} pages`}
              inline
              hideLabel
              onChange={this.handlePageInputChange}
              value={statePage}>
              {selectItems}
            </Select>
          )}
          {pageRange}
          <button
            className={backButtonClasses}
            onClick={this.decrementPage}
            aria-label={backwardText}
            disabled={backButtonDisabled}>
            <CaretLeft24 />
          </button>
          <button
            className={forwardButtonClasses}
            aria-label={forwardText}
            onClick={this.incrementPage}
            disabled={forwardButtonDisabled || isLastPage}>
            <CaretRight24 />
          </button>
        </div>
      </div>
    );
  }
}
