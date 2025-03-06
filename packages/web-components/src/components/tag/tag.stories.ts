/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { TAG_SIZE } from './tag';
import View16 from '@carbon/icons/lib/view/16.js';
import FolderOpen16 from '@carbon/icons/lib/folder--open/16.js';
import Folders16 from '@carbon/icons/lib/folders/16.js';
import Asleep16 from '@carbon/icons/lib/asleep/16.js';
import './index';
import '../ai-label';
import '../icon-button';

const content = html`
  <div slot="body-text">
    <p class="secondary">AI Explained</p>
    <h1>84%</h1>
    <p class="secondary bold">Confidence score</p>
    <p class="secondary">
      Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
    </p>
    <hr />
    <p class="secondary">Model type</p>
    <p class="bold">Foundation model</p>
  </div>
`;

const actions = html`
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${View16({ slot: 'icon' })}
    <span slot="tooltip-content"> View </span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${FolderOpen16({ slot: 'icon' })}
    <span slot="tooltip-content"> Open folder</span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${Folders16({ slot: 'icon' })}
    <span slot="tooltip-content"> Folders </span>
  </cds-icon-button>
  <cds-ai-label-action-button>View details</cds-ai-label-action-button>
`;

const sizes = {
  [`sm`]: TAG_SIZE.SMALL,
  [`md`]: TAG_SIZE.MEDIUM,
  [`lg`]: TAG_SIZE.LARGE,
};

const types = [
  'red',
  'magenta',
  'purple',
  'blue',
  'cyan',
  'teal',
  'green',
  'gray',
  'cool-gray',
  'warm-gray',
  'high-contrast',
  'outline',
];

const defaultArgs = {
  disabled: false,
  filter: false,
  title: 'Clear filter',
  size: TAG_SIZE.MEDIUM,
};

const controls = {
  disabled: {
    control: 'boolean',
    description: 'Specify if the Tag is disabled',
  },
  filter: {
    control: 'boolean',
    description: 'Determine if Tag is a filter/chip',
  },
  size: {
    control: 'select',
    description:
      'Specify the size of the Tag. Currently supports either `sm`, `md` (default) or `lg` sizes.',
    options: sizes,
  },
  title: {
    control: 'text',
    description: 'Text to show on clear filters',
  },
  type: {
    control: 'select',
    description: 'Specify the type of the Tag.',
    options: types,
  },
};

export const Dismissible = {
  render: () =>
    html` <cds-dismissible-tag filter type="red">
        ${Asleep16({ slot: 'icon' })} Tag content with a long text description
      </cds-dismissible-tag>
      ${types
        .slice(1)
        .map(
          (e) =>
            html`<cds-dismissible-tag filter type="${e}"
              >${Asleep16({ slot: 'icon' })} Tag content</cds-dismissible-tag
            >`
        )}`,
};

export const Skeleton = {
  argTypes: controls,
  args: defaultArgs,
  render: ({ size }) =>
    html`<cds-tag-skeleton size="${size}">Tag content</cds-tag-skeleton>`,
};

const ReadOnlyArgs = {
  disabled: false,
  size: TAG_SIZE.MEDIUM,
};

export const ReadOnly = {
  argTypes: controls,
  args: ReadOnlyArgs,
  render: ({ size, disabled }) =>
    html` <cds-tag type="red" size="${size}" ?disabled="${disabled}">
        Tag content with a long text description
      </cds-tag>
      ${types
        .slice(1)
        .map(
          (e) =>
            html`<cds-tag type="${e}" size="${size}" ?disabled="${disabled}"
              >Tag content</cds-tag
            >`
        )}`,
};

export const WithAILabel = {
  render: () =>
    html`<cds-tag type="red"
        >Tag
        <cds-ai-label alignment="bottom-left">
          ${content}${actions}</cds-ai-label
        >
      </cds-tag>

      <cds-tag filter type="purple">
        Tag
        <cds-ai-label alignment="bottom-left">
          ${content}${actions}</cds-ai-label
        >
      </cds-tag>

      <cds-tag type="blue">
        ${Asleep16({ slot: 'icon' })} Tag
        <cds-ai-label alignment="bottom-left">
          ${content}${actions}</cds-ai-label
        >
      </cds-tag>
      <cds-tag filter type="green">
        ${Asleep16({ slot: 'icon' })} Tag
        <cds-ai-label alignment="bottom-left">
          ${content}${actions}</cds-ai-label
        >
      </cds-tag>`,
};

const meta = {
  title: 'Components/Tag',
};

export default meta;
