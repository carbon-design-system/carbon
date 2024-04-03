/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CaretRight, CaretLeft } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import Select from '../Select';
import SelectItem from '../SelectItem';
import { equals } from '../../tools/array';
import { useFallbackId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { IconButton } from '../IconButton';

type ExcludedAttributes = 'id' | 'onChange';

export interface PaginationPageSize {
  text: string;
  value: number;
}

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, ExcludedAttributes> {
  /**
   * The description for the backward icon.
   */
  backwardText?: string;

  /**
   * The CSS class names.
   */
  className?: string;

  /**
   * `true` if the backward/forward buttons, as well as the page select elements,  should be disabled.
   */
  disabled?: boolean;

  /**
   * The description for the forward icon.
   */
  forwardText?: string;

  /**
   * The unique ID of this component instance.
   */
  id?: string | number;

  // TODO: remove when v9 is deprecated
  /**
   * `true` if the current page should be the last page.
   */
  isLastPage?: boolean;

  /**
   * The function returning a translatable text showing where the current page is,
   * in a manner of the range of items.
   */
  itemRangeText?: (min: number, max: number, total: number) => string;

  /**
   * A variant of `itemRangeText`, used if the total number of items is unknown.
   */
  itemText?: (min: number, max: number) => string;

  /**
   * The translatable text indicating the number of items per page.
   */
  itemsPerPageText?: string;

  /**
   * The callback function called when the current page changes.
   */
  onChange?: (data: {
    page: number;
    pageSize: number;
    ref?: React.RefObject<any>;
  }) => void;

  /**
   * The current page.
   */
  page?: number;

  /**
   * `true` if the select box to change the page should be disabled.
   */
  pageInputDisabled?: boolean;

  pageNumberText?: string;

  /**
   * A function returning PII showing where the current page is.
   */
  pageRangeText?: (current: number, total: number) => string;

  /**
   * The number dictating how many items a page contains.
   */
  pageSize?: number;

  /**
   * `true` if the select box to change the items per page should be disabled.
   */
  pageSizeInputDisabled?: boolean;

  /**
   * The choices for `pageSize`.
   */
  pageSizes: number[] | PaginationPageSize[];

  /**
   * The translatable text showing the current page.
   */
  pageText?: (page: number, pagesUnknown?: boolean) => string;

  /**
   * `true` if the total number of items is unknown.
   */
  pagesUnknown?: boolean;

  /**
   * Specify the size of the Pagination.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * The total number of items.
   */
  totalItems?: number;
}

function mapPageSizesToObject(sizes) {
  return typeof sizes[0] === 'object' && sizes[0] !== null
    ? sizes
    : sizes.map((size) => ({ text: size, value: size }));
}

function renderSelectItems(total) {
  let counter = 1;
  const itemArr: React.ReactNode[] = [];
  while (counter <= total) {
    itemArr.push(
      <SelectItem key={counter} value={counter} text={String(counter)} />
    );
    counter++;
  }
  return itemArr;
}

function getPageSize(pageSizes, pageSize) {
  if (pageSize) {
    const hasSize = pageSizes.find((size) => {
      return pageSize === size.value;
    });

    if (hasSize) {
      return pageSize;
    }
  }
  return pageSizes[0].value;
}

const Pagination = React.forwardRef(function Pagination(
  {
    backwardText = 'Previous page',
    className: customClassName = '',
    disabled = false,
    forwardText = 'Next page',
    id,
    isLastPage = false,
    itemText = (min, max) => `${min}–${max} items`,
    itemRangeText = (min, max, total) => `${min}–${max} of ${total} items`,
    itemsPerPageText = 'Items per page:',
    onChange,
    pageNumberText: _pageNumberText = 'Page Number',
    pageRangeText = (_current, total) =>
      `of ${total} ${total === 1 ? 'page' : 'pages'}`,
    page: controlledPage = 1,
    pageInputDisabled,
    pageSize: controlledPageSize,
    pageSizeInputDisabled,
    pageSizes: controlledPageSizes,
    pageText = (page, pagesUnknown) => `page ${pagesUnknown ? '' : page}`,
    pagesUnknown = false,
    size = 'md',
    totalItems = 1,
    ...rest
  }: PaginationProps,
  ref: React.Ref<HTMLDivElement>
) {
  const prefix = usePrefix();
  const inputId = useFallbackId(id?.toString());
  const backBtnRef = useRef<HTMLButtonElement>(null);
  const forwardBtnRef = useRef<HTMLButtonElement>(null);
  const [pageSizes, setPageSizes] = useState(() => {
    return mapPageSizesToObject(controlledPageSizes);
  });
  const [prevPageSizes, setPrevPageSizes] = useState(controlledPageSizes);

  const [page, setPage] = useState(controlledPage);
  const [prevControlledPage, setPrevControlledPage] = useState(controlledPage);

  const [pageSize, setPageSize] = useState(() => {
    return getPageSize(pageSizes, controlledPageSize);
  });
  const [prevControlledPageSize, setPrevControlledPageSize] =
    useState(controlledPageSize);

  const className = cx({
    [`${prefix}--pagination`]: true,
    [`${prefix}--pagination--${size}`]: size,
    [customClassName]: !!customClassName,
  });
  const totalPages = Math.max(Math.ceil(totalItems / pageSize), 1);
  const backButtonDisabled = disabled || page === 1;
  const backButtonClasses = cx({
    [`${prefix}--pagination__button`]: true,
    [`${prefix}--pagination__button--backward`]: true,
    [`${prefix}--pagination__button--no-index`]: backButtonDisabled,
  });
  const forwardButtonDisabled = disabled || page === totalPages;
  const forwardButtonClasses = cx({
    [`${prefix}--pagination__button`]: true,
    [`${prefix}--pagination__button--forward`]: true,
    [`${prefix}--pagination__button--no-index`]: forwardButtonDisabled,
  });
  const selectItems = renderSelectItems(totalPages);

  // Sync state with props
  if (controlledPage !== prevControlledPage) {
    setPage(controlledPage);
    setPrevControlledPage(controlledPage);
  }

  if (controlledPageSize !== prevControlledPageSize) {
    setPageSize(getPageSize(pageSizes, controlledPageSize));
    setPrevControlledPageSize(controlledPageSize);
  }

  if (!equals(controlledPageSizes, prevPageSizes)) {
    const pageSizes = mapPageSizesToObject(controlledPageSizes);

    const hasPageSize = pageSizes.find((size) => {
      return size.value === pageSize;
    });

    // Reset page to 1 if the current pageSize is not included in the new page
    // sizes
    if (!hasPageSize) {
      setPage(1);
    }

    setPageSizes(pageSizes);
    setPrevPageSizes(controlledPageSizes);
  }

  function handleSizeChange(event) {
    const pageSize = Number(event.target.value);
    const changes = {
      pageSize,
      page: 1,
    };

    setPage(changes.page);
    setPageSize(changes.pageSize);

    if (onChange) {
      onChange(changes);
    }
  }

  function handlePageInputChange(event) {
    const page = Number(event.target.value);
    if (page > 0 && page <= Math.max(Math.ceil(totalItems / pageSize), 1)) {
      setPage(page);

      if (onChange) {
        onChange({
          page,
          pageSize,
        });
      }
    }
  }

  function incrementPage() {
    const nextPage = page + 1;
    setPage(nextPage);

    // when the increment button reaches the last page,
    // the icon button becomes disabled and the focus shifts to `main`
    // this presents an a11y problem for keyboard & screen reader users
    // instead, we want the focus to shift to the other pagination btn
    if (nextPage === totalPages && backBtnRef?.current) {
      backBtnRef.current.focus();
    }

    if (onChange) {
      onChange({
        page: nextPage,
        pageSize,
        ref: backBtnRef,
      });
    }
  }

  function decrementPage() {
    const nextPage = page - 1;
    setPage(nextPage);

    // when the decrement button reaches the first page,
    // the icon button becomes disabled and the focus shifts to `main`
    // this presents an a11y problem for keyboard & screen reader users
    // instead, we want the focus to shift to the other pagination btn
    if (nextPage === 1 && forwardBtnRef?.current) {
      forwardBtnRef.current.focus();
    }

    if (onChange) {
      onChange({
        page: nextPage,
        pageSize,
        ref: forwardBtnRef,
      });
    }
  }

  return (
    <div className={className} ref={ref} {...rest}>
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
          onChange={handleSizeChange}
          disabled={pageSizeInputDisabled || disabled}
          value={pageSize}>
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
            ? itemText(pageSize * (page - 1) + 1, page * pageSize)
            : itemRangeText(
                Math.min(pageSize * (page - 1) + 1, totalItems),
                Math.min(page * pageSize, totalItems),
                totalItems
              )}
        </span>
      </div>
      <div className={`${prefix}--pagination__right`}>
        {pagesUnknown ? (
          <span
            className={`${prefix}--pagination__text ${prefix}--pagination__page-text`}>
            {pagesUnknown
              ? pageText(page, pagesUnknown)
              : pageRangeText(page, totalPages)}
          </span>
        ) : null}
        <Select
          id={`${prefix}-pagination-select-${inputId}-right`}
          className={`${prefix}--select__page-number`}
          labelText={`Page number, of ${totalPages} pages`}
          inline
          hideLabel
          onChange={handlePageInputChange}
          value={page}
          disabled={pageInputDisabled || disabled}>
          {selectItems}
        </Select>
        {pagesUnknown ? null : (
          <span className={`${prefix}--pagination__text`}>
            {pagesUnknown
              ? pageText(page, pagesUnknown)
              : pageRangeText(page, totalPages)}
          </span>
        )}
        <div className={`${prefix}--pagination__control-buttons`}>
          <IconButton
            align="top"
            disabled={backButtonDisabled}
            kind="ghost"
            className={backButtonClasses}
            label={backwardText}
            onClick={decrementPage}
            ref={backBtnRef}>
            <CaretLeft />
          </IconButton>
          <IconButton
            align="top-right"
            disabled={forwardButtonDisabled || isLastPage}
            kind="ghost"
            className={forwardButtonClasses}
            label={forwardText}
            onClick={incrementPage}
            ref={forwardBtnRef}>
            <CaretRight />
          </IconButton>
        </div>
      </div>
    </div>
  );
});

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
    PropTypes.arrayOf(PropTypes.number.isRequired),
    PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      }).isRequired
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
   * Specify the size of the Pagination.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * The total number of items.
   */
  totalItems: PropTypes.number,
};

export default Pagination;
