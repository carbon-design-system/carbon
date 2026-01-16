/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './index';
import '../select/index';

import { PAGINATION_SIZE } from './defs';
import { html } from 'lit';

const sizes = {
  [`Small size (${PAGINATION_SIZE.SMALL})`]: PAGINATION_SIZE.SMALL,
  [`Medium size (${PAGINATION_SIZE.MEDIUM})`]: PAGINATION_SIZE.MEDIUM,
  [`Large size (${PAGINATION_SIZE.LARGE})`]: PAGINATION_SIZE.LARGE,
};

const args = {
  backwardText: 'Previous',
  disabled: false,
  forwardText: 'Next',
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
};

export const Default = {
  args,
  argTypes,
  render: (args) => {
    const {
      backwardText,
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
        total-items=${totalItems}>
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
  render: (args) => {
    const {
      backwardText,
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
        total-items=${totalItems}>
        <cds-select-item value="10">10</cds-select-item>
        <cds-select-item value="20">20</cds-select-item>
        <cds-select-item value="30">30</cds-select-item>
        <cds-select-item value="40">40</cds-select-item>
        <cds-select-item value="50">50</cds-select-item>
      </cds-pagination>
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
        total-items=${totalItems}>
        <cds-select-item value="10">10</cds-select-item>
        <cds-select-item value="20">20</cds-select-item>
        <cds-select-item value="30">30</cds-select-item>
        <cds-select-item value="40">40</cds-select-item>
        <cds-select-item value="50">50</cds-select-item>
      </cds-pagination>
    `;
  },
};

export const PaginationUnknownPages = {
  name: 'Unknown pages and items',
  args: {
    pagesUnknown: true,
    totalItems: undefined,
  },
  render: (args) => {
    const {
      backwardText,
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
        total-items=${totalItems}>
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
  render: (args) => {
    const {
      backwardText,
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
        total-items=${totalItems}>
        <cds-select-item value="10">Ten</cds-select-item>
        <cds-select-item value="20">Twenty</cds-select-item>
        <cds-select-item value="30">Thirty</cds-select-item>
        <cds-select-item value="40">Forty</cds-select-item>
        <cds-select-item value="50">Fifty</cds-select-item>
      </cds-pagination>
    `;
  },
};
export const WithEventLogging = {
  name: 'Event Logging (verify single fire)',
  args,
  argTypes,
  render: (args) => {
    const {
      backwardText,
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

    setTimeout(() => {
      let eventCount = 0;
      const counter = document.getElementById('event-counter');
      const log = document.getElementById('event-log');
      const pagination = document.querySelector('cds-pagination');

      if (pagination && counter && log) {
        pagination.addEventListener('cds-pagination-changed-current', (e) => {
          eventCount++;
          counter.textContent = eventCount;
          const time = new Date().toLocaleTimeString();
          log.innerHTML =
            `<div style="padding: 4px; border-bottom: 1px solid #ddd;">
            <strong>Event #${eventCount}</strong> at ${time}<br>
            Page: ${e.detail.page}, Start: ${e.detail.start}
          </div>` + log.innerHTML;
        });
      }
    }, 100);

    return html`
      <div
        style="border: 2px solid #0f62fe; padding: 16px; border-radius: 4px; margin-bottom: 16px; background: #f4f4f4;">
        <h3 style="margin-top: 0;">
          Event Fire Counter:
          <span id="event-counter" style="color: #0f62fe; font-size: 32px;"
            >0</span
          >
        </h3>
        <p style="margin: 8px 0;">
          <strong>✓ Should increment by 1 per click/change</strong>
        </p>
        <p style="margin: 8px 0; color: #da1e28;">
          <strong>✗ If it increments by 2, the bug exists</strong>
        </p>
      </div>
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
        total-items=${totalItems}>
        <cds-select-item value="10">10</cds-select-item>
        <cds-select-item value="20">20</cds-select-item>
        <cds-select-item value="30">30</cds-select-item>
        <cds-select-item value="40">40</cds-select-item>
        <cds-select-item value="50">50</cds-select-item>
      </cds-pagination>
      <div
        style="margin-top: 20px; padding: 16px; background: white; border: 1px solid #ddd; border-radius: 4px;">
        <h4 style="margin-top: 0;">Testing Instructions:</h4>
        <ol style="margin: 0; padding-left: 20px;">
          <li>Watch the counter above</li>
          <li>Click Next button - counter should increase by 1</li>
          <li>Click Previous button - counter should increase by 1</li>
          <li>Change page via dropdown - counter should increase by 1</li>
        </ol>
      </div>
      <div style="margin-top: 16px;">
        <h4>Event Log:</h4>
        <div
          id="event-log"
          style="max-height: 200px; overflow-y: auto; border: 1px solid #ddd; padding: 8px; background: white;"></div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story visually demonstrates that the `cds-pagination-changed-current` event fires only once per user interaction. Watch the counter and event log.',
      },
    },
  },
};

const meta = {
  title: 'Components/Pagination',
  decorators: [(story) => html`<div style="max-width: 800px">${story()}</div>`],
  argTypes,
  args,
};

export default meta;
