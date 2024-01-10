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
import './index';
import storyDocs from './tag.mdx';

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
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
