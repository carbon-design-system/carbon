/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './add-select';
import './add-select-body';
import './add-select-content';
import './add-select-row';
import styles from './story-styles.scss?lit';

const items = [
  {
    id: '1',
    title: 'Item 1',
    subtitle: 'Description for item 1',
    value: 'item-1',
  },
  {
    id: '2',
    title: 'Item 2',
    subtitle: 'Description for item 2',
    value: 'item-2',
  },
  {
    id: '3',
    title: 'Item 3',
    subtitle: 'Description for item 3',
    value: 'item-3',
  },
  {
    id: '4',
    title: 'Item 4',
    subtitle: 'Description for item 4',
    value: 'item-4',
  },
  {
    id: '5',
    title: 'Item 5',
    subtitle: 'Description for item 5',
    value: 'item-5',
  },
];

/**
 * Default story - Basic multi-select
 */
export const Default = {
  render: () => {
    return html`
      <style>
        ${styles}
      </style>
      <c4p-add-select multi>
        <c4p-add-select-body
          items-label="All items"
          global-search-label="Search"
          global-search-placeholder="Search items"
          .itemCount=${items.length}
        >
          <c4p-add-select-content>
            ${items.map(
              (item) => html`
                <c4p-add-select-row
                  item-id=${item.id}
                  title=${item.title}
                  subtitle=${item.subtitle}
                  value=${item.value}
                >
                </c4p-add-select-row>
              `
            )}
          </c4p-add-select-content>
        </c4p-add-select-body>
      </c4p-add-select>
    `;
  },
};

/**
 * Single select story - Radio button selection
 */
export const SingleSelect = {
  render: () => {
    return html`
      <style>
        ${styles}
      </style>
      <c4p-add-select>
        <c4p-add-select-body
          items-label="Select one item"
          global-search-label="Search"
          .itemCount=${items.length}
        >
          <c4p-add-select-content>
            ${items.map(
              (item) => html`
                <c4p-add-select-row
                  item-id=${item.id}
                  title=${item.title}
                  subtitle=${item.subtitle}
                  value=${item.value}
                >
                </c4p-add-select-row>
              `
            )}
          </c4p-add-select-content>
        </c4p-add-select-body>
      </c4p-add-select>
    `;
  },
};

/**
 * With search functionality
 */
export const WithSearch = {
  render: () => {
    return html`
      <style>
        ${styles}
      </style>
      <c4p-add-select multi>
        <c4p-add-select-body
          items-label="Items"
          global-search-label="Search"
          global-search-placeholder="Search items"
          .itemCount=${items.length}
        >
          <c4p-add-select-content>
            ${items.map(
              (item) => html`
                <c4p-add-select-row
                  item-id=${item.id}
                  title=${item.title}
                  subtitle=${item.subtitle}
                  value=${item.value}
                >
                </c4p-add-select-row>
              `
            )}
          </c4p-add-select-content>
        </c4p-add-select-body>
      </c4p-add-select>
    `;
  },
};

const meta = {
  title: 'Preview/Add and select/AddSelect',
  tags: ['autodocs'],
  decorators: [
    (story) => html` <div class="add-select-story-container">${story()}</div> `,
  ],
  parameters: {
    styles,
  },
};

export default meta;
