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
import { boolean, select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import { ifDefined } from 'lit/directives/if-defined.js';
import { TAG_SIZE, TAG_TYPE } from './tag';
import './index';
import storyDocs from './tag-story.mdx';
import { prefix } from '../../globals/settings';

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

export const Default = () => {
  return html`
    ${types.map(
      (e) => html`<cds-tag size="sm" type="${e}">Tag content</cds-tag>`
    )}
  `;
};

export const Playground = (args) => {
  const { open, filter, size, type, title, disabled } =
    args?.[`${prefix}-tag`] ?? {};

  return html`
    <cds-tag
      ?filter="${filter}"
      ?open="${open}"
      size="${ifDefined(size)}"
      type="${ifDefined(type)}"
      title="${ifDefined(title)}"
      ?disabled="${disabled}">
      This is a tag
    </cds-tag>
  `;
};

Playground.parameters = {
  knobs: {
    [`${prefix}-tag`]: () => ({
      disabled: boolean('Disabled (disabled)', false),
      title: textNullable('Title (title)', 'Clear Selection'),
      size: select('Tag size (size)', sizes, null),
      type: select(
        'Tag type (type)',
        Object.values(TAG_TYPE).reduce(
          (acc, type) => ({
            ...acc,
            [`${type} (${type})`]: type,
          }),
          {}
        ),
        'gray'
      ),
      open: boolean('Open', true),
      filter: boolean('Filter', false),
      onClick: action('click'),
      onBeforeClose: action(`${prefix}-tag-beingclosed`),
      onClose: action(`${prefix}-tag-closed`),
    }),
  },
};

export default {
  parameters: {
    ...storyDocs.parameters,
  },
  title: 'Components/Tag',
};
