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
  [`Medium size (${TAG_SIZE.MEDIUM})`]: TAG_SIZE.MEDIUM,
  [`Small size (${TAG_SIZE.SMALL})`]: TAG_SIZE.SMALL,
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
      'Specify the size of the Tag. Currently supports either sm or "md" (default) sizes.',
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

export const Default = {
  render: () =>
    html`${types.map((e) => html`<cds-tag type="${e}">Tag content</cds-tag>`)}`,
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

export const Playground = {
  argTypes: controls,
  args: defaultArgs,
  render: ({ filter, size, type, title, disabled }) => html`
    <cds-tag
      ?filter="${filter}"
      size="${size}"
      type="${type}"
      title="${title}"
      ?disabled="${disabled}">
      Tag content
    </cds-tag>
  `,
};

const meta = {
  title: 'Components/Tag',
};

export default meta;
