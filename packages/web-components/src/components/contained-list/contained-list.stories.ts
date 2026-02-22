/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './index';
import '../button/index';
import '../search/index';
import '../tag/index';
import '../overflow-menu/index';
import '../icon-button/index';
import storyDocs from './contained-list.mdx';
import { iconLoader } from '../../globals/internal/icon-loader';
import Add16 from '@carbon/icons/es/add/16.js';
import Close16 from '@carbon/icons/es/close/16.js';
import Apple16 from '@carbon/icons/es/apple/16.js';
import Fish16 from '@carbon/icons/es/fish/16.js';
import Strawberry16 from '@carbon/icons/es/strawberry/16.js';
import Wheat16 from '@carbon/icons/es/wheat/16.js';
import OverflowMenuVertical16 from '@carbon/icons/es/overflow-menu--vertical/16.js';
import { prefix } from '../../globals/settings';

const kinds = ['on-page', 'disclosed'];
const sizes = ['sm', 'md', 'lg', 'xl'];

const defaultArgs = {
  label: 'List title',
  kind: 'on-page',
  size: 'lg',
  isInset: false,
};

const controls = {
  label: {
    control: 'text',
    description: 'A label describing the contained list',
  },
  kind: {
    control: 'select',
    options: kinds,
    description: 'The kind of contained list to display',
  },
  size: {
    control: 'select',
    options: sizes,
    description: 'Specify the size of the contained list',
  },
  isInset: {
    control: 'boolean',
    description:
      'Specify whether the dividing lines between list items should be inset',
  },
};

export const Default = {
  args: defaultArgs,
  argTypes: controls,
  render: ({ label, kind, size, isInset }) => html`
    ${Array.from({ length: 4 }).map(
      (_, i) => html`
        <cds-contained-list
          label="${label}"
          kind="${kind}"
          size="${ifDefined(size)}"
          ?is-inset="${isInset}">
          ${Array.from({ length: 8 }).map(
            (_, j) => html`
              <cds-contained-list-item key="${i}-${j}">
                List item
              </cds-contained-list-item>
            `
          )}
        </cds-contained-list>
      `
    )}
  `,
};

export const Disclosed = {
  render: () => html`
    <cds-contained-list label="List title" kind="disclosed">
      <cds-contained-list-item>List item</cds-contained-list-item>
      <cds-contained-list-item>List item</cds-contained-list-item>
      <cds-contained-list-item>List item</cds-contained-list-item>
      <cds-contained-list-item>List item</cds-contained-list-item>
    </cds-contained-list>
    <cds-contained-list label="List title" kind="disclosed">
      <cds-contained-list-item>List item</cds-contained-list-item>
      <cds-contained-list-item>List item</cds-contained-list-item>
      <cds-contained-list-item>List item</cds-contained-list-item>
      <cds-contained-list-item>List item</cds-contained-list-item>
    </cds-contained-list>
  `,
};

export const WithInteractiveItems = {
  render: () => html`
    <cds-contained-list label="List title" kind="on-page">
      <cds-contained-list-item clickable>List item</cds-contained-list-item>
      <cds-contained-list-item clickable disabled>
        List item
      </cds-contained-list-item>
      <cds-contained-list-item clickable>List item</cds-contained-list-item>
      <cds-contained-list-item clickable>List item</cds-contained-list-item>
    </cds-contained-list>
  `,
};

export const WithActions = {
  render: () => html`
    <cds-contained-list label="List title" kind="on-page">
      <cds-contained-list-item>
        List item
        <cds-icon-button slot="action" kind="ghost" size="lg">
          ${iconLoader(Close16, { slot: 'icon' })}
          <span slot="tooltip-content">Dismiss</span>
        </cds-icon-button>
      </cds-contained-list-item>
      <cds-contained-list-item disabled>
        List item
        <cds-icon-button slot="action" kind="ghost" size="lg">
          ${iconLoader(Close16, { slot: 'icon' })}
          <span slot="tooltip-content">Dismiss</span>
        </cds-icon-button>
      </cds-contained-list-item>
      <cds-contained-list-item>
        List item
        <cds-icon-button slot="action" kind="ghost" size="lg">
          ${iconLoader(Close16, { slot: 'icon' })}
          <span slot="tooltip-content">Dismiss</span>
        </cds-icon-button>
      </cds-contained-list-item>
      <cds-contained-list-item>
        List item
        <cds-icon-button slot="action" kind="ghost" size="lg">
          ${iconLoader(Close16, { slot: 'icon' })}
          <span slot="tooltip-content">Dismiss</span>
        </cds-icon-button>
      </cds-contained-list-item>
    </cds-contained-list>
  `,
};

export const WithExpandableSearch = {
  render: () => {
    const listId = 'list-expandable-search';
    const items = ['List item 1', 'List item 2', 'List item 3', 'List item 4'];

    return html`
      <cds-contained-list id="${listId}" label="List title" kind="on-page">
        <cds-search
          slot="action"
          expandable
          placeholder="Filter"
          label-text="Search"
          close-button-label-text="Clear search input"
          size="lg"
          @cds-search-input="${(e) => {
            const searchValue = e.detail.value.toLowerCase();
            const list = document.getElementById(listId);
            const listItems = list?.querySelectorAll('cds-contained-list-item');
            listItems?.forEach((item, index) => {
              const text = items[index].toLowerCase();
              item.style.display = text.includes(searchValue) ? '' : 'none';
            });
          }}">
        </cds-search>
        ${items.map(
          (item) => html`
            <cds-contained-list-item>${item}</cds-contained-list-item>
          `
        )}
      </cds-contained-list>
    `;
  },
};

export const WithPersistentSearch = {
  render: () => {
    const listId = 'list-persistent-search';
    const items = ['List item 1', 'List item 2', 'List item 3', 'List item 4'];

    return html`
      <cds-contained-list id="${listId}" label="List title" kind="on-page">
        <cds-search
          placeholder="Filter"
          label-text="Filter search"
          close-button-label-text="Clear search input"
          size="lg"
          @cds-search-input="${(e) => {
            const searchValue = e.detail.value.toLowerCase();
            const list = document.getElementById(listId);
            const listItems = list?.querySelectorAll('cds-contained-list-item');
            listItems?.forEach((item, index) => {
              const text = items[index].toLowerCase();
              item.style.display = text.includes(searchValue) ? '' : 'none';
            });
          }}">
        </cds-search>
        ${items.map(
          (item) => html`
            <cds-contained-list-item>${item}</cds-contained-list-item>
          `
        )}
      </cds-contained-list>
    `;
  },
};

export const WithInteractiveItemsAndActions = {
  render: () => html`
    <cds-contained-list label="List title" kind="on-page">
      <cds-contained-list-item clickable>
        List item
        <cds-icon-button slot="action" kind="ghost" size="lg">
          ${iconLoader(Close16, { slot: 'icon' })}
          <span slot="tooltip-content">Dismiss</span>
        </cds-icon-button>
      </cds-contained-list-item>
      <cds-contained-list-item clickable>
        List item
        <cds-icon-button slot="action" kind="ghost" size="lg">
          ${iconLoader(Close16, { slot: 'icon' })}
          <span slot="tooltip-content">Dismiss</span>
        </cds-icon-button>
      </cds-contained-list-item>
      <cds-contained-list-item clickable>
        List item
        <cds-icon-button slot="action" kind="ghost" size="lg">
          ${iconLoader(Close16, { slot: 'icon' })}
          <span slot="tooltip-content">Dismiss</span>
        </cds-icon-button>
      </cds-contained-list-item>
      <cds-contained-list-item clickable>
        List item
        <cds-icon-button slot="action" kind="ghost" size="lg">
          ${iconLoader(Close16, { slot: 'icon' })}
          <span slot="tooltip-content">Dismiss</span>
        </cds-icon-button>
      </cds-contained-list-item>
    </cds-contained-list>
  `,
};

export const WithListTitleDecorators = {
  render: () => html`
    <cds-contained-list kind="on-page">
      <div
        slot="label"
        style="display: flex; align-items: center; justify-content: space-between;">
        <span>List title</span>
        <cds-tag size="sm">4</cds-tag>
      </div>
      <cds-contained-list-item>List item</cds-contained-list-item>
      <cds-contained-list-item>List item</cds-contained-list-item>
      <cds-contained-list-item>List item</cds-contained-list-item>
      <cds-contained-list-item>List item</cds-contained-list-item>
    </cds-contained-list>
  `,
};

export const WithIcons = {
  render: () => html`
    <cds-contained-list label="List title" kind="on-page">
      <cds-contained-list-item>
        <div slot="icon">${iconLoader(Apple16)}</div>
        List item
      </cds-contained-list-item>
      <cds-contained-list-item>
        <div slot="icon">${iconLoader(Wheat16)}</div>
        List item
      </cds-contained-list-item>
      <cds-contained-list-item>
        <div slot="icon">${iconLoader(Strawberry16)}</div>
        List item
      </cds-contained-list-item>
      <cds-contained-list-item>
        <div slot="icon">${iconLoader(Fish16)}</div>
        List item
      </cds-contained-list-item>
    </cds-contained-list>
  `,
};

export const _WithLayer = {
  render: () => html`
    <sb-template-layers>
      <cds-contained-list label="List title" kind="on-page">
        <cds-contained-list-item>List item</cds-contained-list-item>
        <cds-contained-list-item>List item</cds-contained-list-item>
      </cds-contained-list>
    </sb-template-layers>
  `,
};

export const UsageExamples = {
  render: () => html`
    <cds-contained-list label="List title">
      <cds-icon-button slot="action" kind="primary" align="left" size="lg">
        ${iconLoader(Add16, { slot: 'icon' })}
        <span slot="tooltip-content">Add</span>
      </cds-icon-button>
      ${[...Array(3)].map(
        () => html`
          <cds-contained-list-item>
            List item
            <cds-overflow-menu slot="action" size="lg">
              ${iconLoader(OverflowMenuVertical16, {
                class: `${prefix}--overflow-menu__icon`,
                slot: 'icon',
              })}
              <span slot="tooltip-content">Options</span>
              <cds-overflow-menu-body flipped>
                <cds-overflow-menu-item>View details</cds-overflow-menu-item>
                <cds-overflow-menu-item>Edit</cds-overflow-menu-item>
                <cds-overflow-menu-item danger>
                  <div class="${prefix}--overflow-menu-item__divider"></div>
                  Remove
                </cds-overflow-menu-item>
              </cds-overflow-menu-body>
            </cds-overflow-menu>
          </cds-contained-list-item>
        `
      )}
    </cds-contained-list>

    <cds-contained-list label="List title">
      <cds-icon-button slot="action" kind="ghost" size="lg" align="left">
        ${iconLoader(Add16, { slot: 'icon' })}
        <span slot="tooltip-content">Add</span>
      </cds-icon-button>
      ${[...Array(3)].map(
        () => html`
          <cds-contained-list-item>
            <div>
              List item<br />
              <cds-contained-list-description>
                Description text
              </cds-contained-list-description>
            </div>
          </cds-contained-list-item>
        `
      )}
    </cds-contained-list>

    <cds-contained-list label="List title">
      ${[...Array(3)].map(
        () => html`
          <cds-contained-list-item>
            <div
              style="display: grid; grid-template-columns: repeat(3, 1fr); column-gap: 1rem;">
              <span>List item</span>
              <span>List item details</span>
              <span>List item details</span>
            </div>
          </cds-contained-list-item>
        `
      )}
    </cds-contained-list>
  `,
};

const meta = {
  title: 'Components/Contained list',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
