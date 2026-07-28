/**
 * Copyright IBM Corp. 2025, 2026
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
import { withLayers } from '../../../.storybook/decorators/with-layers';

const kinds = ['on-page', 'disclosed'];
const sizes = ['sm', 'md', 'lg', 'xl'];

const sharedArgs = {
  label: 'List title',
  kind: 'on-page',
  isInset: false,
};

const defaultArgs = {
  ...sharedArgs,
  size: 'lg',
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

const sharedParameters = {
  controls: {
    include: Object.keys(controls),
  },
};

const customLabelParameters = {
  controls: {
    include: Object.keys(controls).filter((name) => name !== 'label'),
  },
};

const renderContainedList = (
  { id, label, kind, size, isInset },
  content
) => html`
  <cds-contained-list
    id=${ifDefined(id)}
    label=${ifDefined(label)}
    kind=${ifDefined(kind)}
    size=${ifDefined(size)}
    ?is-inset=${isInset}>
    ${content}
  </cds-contained-list>
`;

export const Default = {
  args: defaultArgs,
  argTypes: controls,
  parameters: sharedParameters,
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
  args: {
    ...sharedArgs,
    kind: 'disclosed',
  },
  argTypes: {
    ...controls,
    kind: {
      ...controls.kind,
      table: { readonly: true },
    },
  },
  parameters: sharedParameters,
  render: (args) => html`
    ${renderContainedList(
      args,
      html`
        <cds-contained-list-item>List item</cds-contained-list-item>
        <cds-contained-list-item>List item</cds-contained-list-item>
        <cds-contained-list-item>List item</cds-contained-list-item>
        <cds-contained-list-item>List item</cds-contained-list-item>
      `
    )}
    ${renderContainedList(
      args,
      html`
        <cds-contained-list-item>List item</cds-contained-list-item>
        <cds-contained-list-item>List item</cds-contained-list-item>
        <cds-contained-list-item>List item</cds-contained-list-item>
        <cds-contained-list-item>List item</cds-contained-list-item>
      `
    )}
  `,
};

export const WithInteractiveItems = {
  args: sharedArgs,
  argTypes: controls,
  parameters: sharedParameters,
  render: (args) =>
    renderContainedList(
      args,
      html`
        <cds-contained-list-item clickable>List item</cds-contained-list-item>
        <cds-contained-list-item clickable disabled>
          List item
        </cds-contained-list-item>
        <cds-contained-list-item clickable>List item</cds-contained-list-item>
        <cds-contained-list-item clickable>List item</cds-contained-list-item>
      `
    ),
};

export const WithActions = {
  args: sharedArgs,
  argTypes: controls,
  parameters: sharedParameters,
  render: (args) =>
    renderContainedList(
      args,
      html`
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
      `
    ),
};

export const WithExpandableSearch = {
  args: sharedArgs,
  argTypes: controls,
  parameters: sharedParameters,
  render: (args) => {
    const listId = 'list-expandable-search';
    const items = ['List item 1', 'List item 2', 'List item 3', 'List item 4'];

    return renderContainedList(
      { ...args, id: listId },
      html`
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
      `
    );
  },
};

export const WithPersistentSearch = {
  args: sharedArgs,
  argTypes: controls,
  parameters: sharedParameters,
  render: (args) => {
    const listId = 'list-persistent-search';
    const items = ['List item 1', 'List item 2', 'List item 3', 'List item 4'];

    return renderContainedList(
      { ...args, id: listId },
      html`
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
      `
    );
  },
};

export const WithInteractiveItemsAndActions = {
  args: sharedArgs,
  argTypes: controls,
  parameters: sharedParameters,
  render: (args) =>
    renderContainedList(
      args,
      html`
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
      `
    ),
};

export const WithListTitleDecorators = {
  args: sharedArgs,
  argTypes: controls,
  parameters: customLabelParameters,
  render: (args) =>
    renderContainedList(
      { ...args, label: undefined },
      html`
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
      `
    ),
};

export const WithIcons = {
  args: sharedArgs,
  argTypes: controls,
  parameters: sharedParameters,
  render: (args) =>
    renderContainedList(
      args,
      html`
        <cds-contained-list-item>
          ${iconLoader(Apple16, { slot: 'icon' })} List item
        </cds-contained-list-item>
        <cds-contained-list-item>
          ${iconLoader(Wheat16, { slot: 'icon' })} List item
        </cds-contained-list-item>
        <cds-contained-list-item>
          ${iconLoader(Strawberry16, { slot: 'icon' })} List item
        </cds-contained-list-item>
        <cds-contained-list-item>
          ${iconLoader(Fish16, { slot: 'icon' })} List item
        </cds-contained-list-item>
      `
    ),
};

export const _WithLayer = {
  decorators: [withLayers],
  parameters: {
    layout: 'fullscreen',
    ...sharedParameters,
  },
  args: sharedArgs,
  argTypes: controls,
  render: (args) =>
    renderContainedList(
      args,
      html`
        <cds-contained-list-item>List item</cds-contained-list-item>
        <cds-contained-list-item>List item</cds-contained-list-item>
      `
    ),
};

export const UsageExamples = {
  args: sharedArgs,
  argTypes: controls,
  parameters: sharedParameters,
  render: (args) => html`
    ${renderContainedList(
      args,
      html`
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
      `
    )}
    ${renderContainedList(
      args,
      html`
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
      `
    )}
    ${renderContainedList(
      args,
      html`
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
      `
    )}
  `,
};

const meta = {
  title: 'Components/Contained list',
  decorators: [
    (story) => html`
      <style>
        cds-contained-list[kind='on-page']
          + cds-contained-list[kind='on-page'] {
          margin-block-start: 1rem;
        }
      </style>
      <div>${story()}</div>
    `,
  ],
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
