/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import '../select/index';
import storyDocs from './pagination.mdx';
import { prefix } from '../../globals/settings';
import { PAGINATION_SIZE } from './defs';

const sizes = {
  [`Small size (${PAGINATION_SIZE.SMALL})`]: PAGINATION_SIZE.SMALL,
  [`Medium size (${PAGINATION_SIZE.MEDIUM})`]: PAGINATION_SIZE.MEDIUM,
  [`Large size (${PAGINATION_SIZE.LARGE})`]: PAGINATION_SIZE.LARGE,
};

const args = {
  backwardText: 'Previous page',
  disabled: false,
  forwardText: 'Next page',
  isLastPage: false,
  itemsPerPageText: 'Items per page:',
  page: 1,
  pageSize: 10,
  pageInputDisabled: false,
  pageSizeInputDisabled: false,
  pagesUnknown: false,
  size: PAGINATION_SIZE.MEDIUM,
  totalItems: 103,
};

const argTypes = {
  backwardText: {
    control: 'text',
    description: 'The description for the backward icon.',
  },
  disabled: {
    control: 'boolean',
    description:
      '<code>true</code> if the backward/forward buttons, as well as the page select elements, should be disabled.',
  },
  forwardText: {
    control: 'text',
    description: 'The description for the forward icon.',
  },
  isLastPage: {
    control: 'boolean',
    description:
      '<code>true</code> if the current page should be the last page.',
  },
  itemsPerPageText: {
    control: 'text',
    description: 'The text indicating the number of items per page.',
  },
  page: {
    control: 'number',
    description: 'The current page.',
  },
  pageSize: {
    control: 'number',
    description: 'The number dictating how many items a page contains.',
  },
  pageInputDisabled: {
    control: 'boolean',
    description:
      '<code>true</code> if the select box to change the page should be disabled.',
  },
  pageSizeInputDisabled: {
    control: 'boolean',
    description:
      '<code>true</code> if the select box to change the items per page should be disabled.',
  },
  pagesUnknown: {
    control: 'boolean',
    description: '<code>true</code> if the total number of items is unknown.',
  },
  size: {
    control: 'select',
    description: 'Specify the size of the Pagination.',
    options: sizes,
  },
  totalItems: {
    control: 'number',
    description: 'The total number of items.',
  },
  onChangedCurrent: {
    action: `${prefix}-pagination-changed-current`,
  },
  onChangedPageSizesSelect: {
    action: `${prefix}-page-sizes-select-changed`,
  },
};

export const Default = {
  render: () => {
    return html`
      <cds-pagination start="0" total-items="103">
        <cds-select-item value="10">10</cds-select-item>
        <cds-select-item value="20">20</cds-select-item>
        <cds-select-item value="30">30</cds-select-item>
        <cds-select-item value="40">40</cds-select-item>
        <cds-select-item value="50">50</cds-select-item>
      </cds-pagination>
    `;
  },
};

export const MultiplePaginationComponents = {
  render: () => {
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
  },
};

export const PaginationWithCustomPageSizesLabel = {
  render: () => {
    return html`
      <cds-pagination start="0" total-items="103">
        <cds-select-item value="10">Ten</cds-select-item>
        <cds-select-item value="20">Twenty</cds-select-item>
        <cds-select-item value="30">Thirty</cds-select-item>
        <cds-select-item value="40">Forty</cds-select-item>
        <cds-select-item value="50">Fifty</cds-select-item>
      </cds-pagination>
    `;
  },
};

export const Playground = {
  args,
  argTypes,
  render: (args) => {
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
      pageSize,
      pageSizeInputDisabled,
      pagesUnknown,
      size,
      totalItems,
    } = args ?? {};
    return html`
      <cds-pagination
        backward-text=${backwardText}
        ?disabled=${disabled}
        forward-text=${forwardText}
        ?is-last-page=${isLastPage}
        items-per-page-text=${itemsPerPageText}
        page=${page}
        page-size=${pageSize}
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
  },
};

const meta = {
  title: 'Components/Pagination',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
  decorators: [(story) => html`<div style="max-width: 800px">${story()}</div>`],
};

export default meta;
