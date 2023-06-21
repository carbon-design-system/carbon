/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { boolean, number, text, select } from '@storybook/addon-knobs';
import './index';
import storyDocs from './pagination-story.mdx';
import { prefix } from '../../globals/settings';
import { PAGINATION_SIZE } from './defs';

const sizes = {
  [`Small size (${PAGINATION_SIZE.SMALL})`]: PAGINATION_SIZE.SMALL,
  [`Medium size (${PAGINATION_SIZE.MEDIUM})`]: PAGINATION_SIZE.MEDIUM,
  [`Large size (${PAGINATION_SIZE.LARGE})`]: PAGINATION_SIZE.LARGE,
};

export const Default = () => {
  return html`
    <cds-pagination start="0" total-items="103">
      <cds-select-item value="10">10</cds-select-item>
      <cds-select-item value="20">20</cds-select-item>
      <cds-select-item value="30">30</cds-select-item>
      <cds-select-item value="40">40</cds-select-item>
      <cds-select-item value="50">50</cds-select-item>
    </cds-pagination>
  `;
};

export const MultiplePaginationComponents = () => {
  return html`
    <cds-pagination start="0" total-items="103">
      <cds-select-item value="10">10</cds-select-item>
      <cds-select-item value="20">20</cds-select-item>
      <cds-select-item value="30">30</cds-select-item>
      <cds-select-item value="40">40</cds-select-item>
      <cds-select-item value="50">50</cds-select-item>
    </cds-pagination>
    <cds-pagination start="0" total-items="103">
      <cds-select-item value="10">10</cds-select-item>
      <cds-select-item value="20">20</cds-select-item>
      <cds-select-item value="30">30</cds-select-item>
      <cds-select-item value="40">40</cds-select-item>
      <cds-select-item value="50">50</cds-select-item>
    </cds-pagination>
  `;
};

MultiplePaginationComponents.storyName = 'Multiple Pagination components';

export const PaginationCustomPageSizeLabel = () => {
  return html`
    <cds-pagination start="0" total-items="103">
      <cds-select-item value="10">Ten</cds-select-item>
      <cds-select-item value="20">Twenty</cds-select-item>
      <cds-select-item value="30">Thirty</cds-select-item>
      <cds-select-item value="40">Forty</cds-select-item>
      <cds-select-item value="50">Fifty</cds-select-item>
    </cds-pagination>
  `;
};

PaginationCustomPageSizeLabel.storyname =
  'Pagination with custom page sizes label';

export const Playground = (args) => {
  const {
    backwardText,
    onChangedCurrent,
    onChangedPageSizesSelect,
    disabled,
    forwardText,
    isLastPage,
    itemsPerPageText,
    page,
    pageInputDisabled,
    pageSizeInputDisabled,
    pagesUnknown,
    size,
    totalItems,
  } = args?.[`${prefix}-pagination`] ?? {};
  return html`
    <cds-pagination
      background-text=${backwardText}
      ?disabled=${disabled}
      forward-text=${forwardText}
      ?is-last-page=${isLastPage}
      items-per-page=${itemsPerPageText}
      page=${page}
      ?page-input-disabled=${pageInputDisabled}
      ?page-size-input-disabled=${pageSizeInputDisabled}
      size=${size}
      ?pages-unknown=${pagesUnknown}
      total-items=${totalItems}
      @cds-pagination-changed-current="${onChangedCurrent}"
      @cds-page-sizes-select-changed="${onChangedPageSizesSelect}">
      <cds-select-item value="10">10</cds-select-item>
      <cds-select-item value="20">20</cds-select-item>
      <cds-select-item value="30">30</cds-select-item>
      <cds-select-item value="40">40</cds-select-item>
      <cds-select-item value="50">50</cds-select-item>
    </cds-pagination>
  `;
};

export default {
  title: 'Components/Pagination',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      [`${prefix}-pagination`]: () => ({
        backwardText: text('Backward text', 'Previous page'),
        disabled: boolean('Disabled', false),
        forwardText: text('Forward text', 'Next page'),
        isLastPage: boolean(
          'Explicitly state that the user is at the last page (is-last-page)',
          false
        ),
        itemsPerPage: text('Items per page text', 'Items per page:'),
        page: number('The current page', 1),

        pageSize: number('Number of rows per page (page-size)', 10),
        pageInputDisabled: boolean('Pages input disabled', false),
        pageSizeInputDisabled: boolean('Pages size input disabled', false),
        pagesUnknown: boolean('Pages unknown', false),
        size: select('Size (size)', sizes, PAGINATION_SIZE.MEDIUM),
        totalItems: number('Total item count (total-items)', 103),
        onChangedCurrent: action(`${prefix}-pagination-changed-current`),
        onChangedPageSizesSelect: action(`${prefix}-page-sizes-select-changed`),
      }),
    },
  },
};
