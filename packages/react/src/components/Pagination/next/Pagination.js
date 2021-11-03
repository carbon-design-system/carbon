/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CaretRight16, CaretLeft16 } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';
import Select from '../Select';
import SelectItem from '../SelectItem';
import { equals } from '../../tools/array';
import { usePrefix } from '../../../internal/usePrefix';

let instanceId = 0;

const mapPageSizesToObject = (sizes) => {
  return typeof sizes[0] === 'object' && sizes[0] !== null
    ? sizes
    : sizes.map((size) => ({ text: size, value: size }));
};

function Pagination({
  backwardText = 'Previous page',
  className: customClassName,
  disabled = false,
  forwardText = 'Next page',
  id,
  isLastPage = false,
  itemText = (min, max) => `${min}–${max} items`,
  itemsPerPageText = 'Items per page:',
  itemRangeText = (min, max, total) => `${min}–${max} of ${total} items`,
  onChange,
  pageInputDisabled,
  pageNumberText = 'Page Number',
  pageSizeInputDisabled,
  pageRangeText = (current, total) =>
    `of ${total} ${total === 1 ? 'page' : 'pages'}`,
  page: pageNumber = 1,
  pageNumberText,
  pageSize,
  pageSizes,
  pageText = (page) => `page ${page}`,
  pagesUnknown = false,
  size,
  totalItems,
  ...rest
}) {
  const prefix = usePrefix();
  const className = cx({
    [`${prefix}--pagination`]: true,
    [`${prefix}--pagination--${size}`]: size,
    [className]: !!className,
  });
  const inputId = id || this.uniqueId;
  const { page: statePage, pageSize: statePageSize } = this.state;
  const totalPages = Math.max(Math.ceil(totalItems / statePageSize), 1);
  const backButtonDisabled = disabled || statePage === 1;
  const backButtonClasses = cx(
    `${prefix}--pagination__button`,
    `${prefix}--pagination__button--backward`,
    {
      [`${prefix}--pagination__button--no-index`]: backButtonDisabled,
    }
  );
  const forwardButtonDisabled = disabled || statePage === totalPages;
  const forwardButtonClasses = cx(
    `${prefix}--pagination__button`,
    `${prefix}--pagination__button--forward`,
    {
      [`${prefix}--pagination__button--no-index`]: forwardButtonDisabled,
    }
  );
  const selectItems = this.renderSelectItems(totalPages);
  const pageSizes = mapPageSizesToObject(_pageSizes);

  function handleSizeChange(evt) {
    const pageSize = Number(evt.target.value);
    this.setState({ pageSize, page: 1 });
    this.props.onChange({ page: 1, pageSize });
  }

  function handlePageChange(evt) {
    this.setState({ page: evt.target.value });
  }

  function handlePageInputChange(evt) {
    const page = Number(evt.target.value);
    if (
      page > 0 &&
      page <=
        Math.max(Math.ceil(this.props.totalItems / this.state.pageSize), 1)
    ) {
      this.setState({ page });
      this.props.onChange({
        page,
        pageSize: this.state.pageSize,
      });
    }
  }

  function incrementPage() {
    const page = this.state.page + 1;
    this.setState({ page });
    this.props.onChange({ page, pageSize: this.state.pageSize });
  }

  function decrementPage() {
    const page = this.state.page - 1;
    this.setState({ page });
    this.props.onChange({ page, pageSize: this.state.pageSize });
  }

  function renderSelectItems(total) {
    let counter = 1;
    let itemArr = [];
    while (counter <= total) {
      itemArr.push(
        <SelectItem key={counter} value={counter} text={String(counter)} />
      );
      counter++;
    }
    return itemArr;
  }

  return (
    <div className={classNames} {...rest}>
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
          disabled={pageSizeInputDisabled || disabled}
          value={statePageSize}>
          {pageSizes.map((sizeObj) => (
            <SelectItem
              key={sizeObj.value}
              value={sizeObj.value}
              text={String(sizeObj.text)}
            />
          ))}
        </Select>
        <span
          className={`${prefix}--pagination__text ${prefix}--pagination__items-count`}>
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
        <Select
          id={`${prefix}-pagination-select-${inputId}-right`}
          className={`${prefix}--select__page-number`}
          labelText={`Page number, of ${totalPages} pages`}
          inline
          hideLabel
          onChange={this.handlePageInputChange}
          value={statePage}
          disabled={pageInputDisabled || disabled}>
          {selectItems}
        </Select>
        <span className={`${prefix}--pagination__text`}>
          {pagesUnknown
            ? pageText(statePage)
            : pageRangeText(statePage, totalPages)}
        </span>
        <div className={`${prefix}--pagination__control-buttons`}>
          <Button
            kind="ghost"
            className={backButtonClasses}
            hasIconOnly
            renderIcon={CaretLeft16}
            iconDescription={backwardText}
            tooltipAlignment="center"
            tooltipPosition="top"
            onClick={this.decrementPage}
            disabled={backButtonDisabled}
          />
          <Button
            kind="ghost"
            className={forwardButtonClasses}
            hasIconOnly
            renderIcon={CaretRight16}
            iconDescription={forwardText}
            tooltipAlignment="end"
            tooltipPosition="top"
            onClick={this.incrementPage}
            disabled={forwardButtonDisabled || isLastPage}
          />
        </div>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  /**
   * The description for the backward icon.
   */
  backwardText: PropTypes.string,

  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * `true` if the backward/forward buttons, as well as the page select elements,  should be disabled.
   */
  disabled: PropTypes.bool,

  /**
   * The description for the forward icon.
   */
  forwardText: PropTypes.string,

  /**
   * The unique ID of this component instance.
   */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // TODO: remove when v9 is deprecated
  /**
   * `true` if the current page should be the last page.
   */
  isLastPage: PropTypes.bool,

  /**
   * The function returning a translatable text showing where the current page is,
   * in a manner of the range of items.
   */
  itemRangeText: PropTypes.func,

  /**
   * A variant of `itemRangeText`, used if the total number of items is unknown.
   */
  itemText: PropTypes.func,

  /**
   * The translatable text indicating the number of items per page.
   */
  itemsPerPageText: PropTypes.string,

  /**
   * The callback function called when the current page changes.
   */
  onChange: PropTypes.func,

  /**
   * The current page.
   */
  page: PropTypes.number,

  /**
   * `true` if the select box to change the page should be disabled.
   */
  pageInputDisabled: PropTypes.bool,

  pageNumberText: PropTypes.string,

  /**
   * A function returning PII showing where the current page is.
   */
  pageRangeText: PropTypes.func,

  /**
   * The number dictating how many items a page contains.
   */
  pageSize: PropTypes.number,

  /**
   * `true` if the select box to change the items per page should be disabled.
   */
  pageSizeInputDisabled: PropTypes.bool,

  /**
   * The choices for `pageSize`.
   */
  pageSizes: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.text,
        value: PropTypes.number,
      })
    ),
  ]).isRequired,

  /**
   * The translatable text showing the current page.
   */
  pageText: PropTypes.func,

  /**
   * `true` if the total number of items is unknown.
   */
  pagesUnknown: PropTypes.bool,

  /**
   * Specify the size of the Pagination. Currently supports either `sm`, 'md' (default) or 'lg` as an option.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * The total number of items.
   */
  totalItems: PropTypes.number,
};

export default Pagination;

class Paginationz extends React.Component {
  constructor(props) {
    super(props);
    const { pageSizes: _pageSizes, page, pageSize } = this.props;

    const pageSizes = mapPageSizesToObject(_pageSizes);

    this.state = {
      page: page,
      pageSize:
        pageSize && pageSizes.some((sizeObj) => pageSize === sizeObj.value)
          ? pageSize
          : pageSizes[0].value,
      prevPageSizes: pageSizes,
      prevPage: page,
      prevPageSize: pageSize,
    };
    this.uniqueId = ++instanceId;
  }

  static getDerivedStateFromProps(
    { pageSizes: _pageSizes, page, pageSize },
    state
  ) {
    const {
      prevPageSizes,
      prevPage,
      prevPageSize,
      page: currentPage,
      pageSize: currentPageSize,
    } = state;

    const pageSizes = mapPageSizesToObject(_pageSizes);
    const pageSizesValues = pageSizes.map((sizeObj) => sizeObj.value);
    const prevPageSizesValues = prevPageSizes.map((sizeObj) => sizeObj.value);

    const pageSizesChanged = !equals(pageSizesValues, prevPageSizesValues);
    if (
      pageSizesChanged &&
      !pageSizes.some((sizeObj) => pageSize === sizeObj.value)
    ) {
      pageSize = pageSizes[0].value;
    }
    const pageChanged = page !== prevPage;
    const pageSizeChanged = pageSize !== prevPageSize;
    return !pageSizesChanged && !pageChanged && !pageSizeChanged
      ? null
      : {
          page: (pageSizeChanged && 1) || (pageChanged && page) || currentPage,
          pageSize: pageSizeChanged ? pageSize : currentPageSize,
          prevPageSizes: pageSizes,
          prevPage: page,
          prevPageSize: pageSize,
        };
  }

  render() {}
}
