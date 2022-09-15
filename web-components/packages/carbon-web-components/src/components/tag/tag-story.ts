/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import { TAG_SIZE, TAG_TYPE } from './tag';
import './filter-tag';
import storyDocs from './tag-story.mdx';

const noop = () => {};

const sizes = {
  'Regular size': null,
  [`Small size (${TAG_SIZE.SMALL})`]: TAG_SIZE.SMALL,
};

export const Default = args => {
  const { size, type, title, disabled } = args?.['bx-tag'] ?? {};
  return html`
    <bx-tag size="${ifNonNull(size)}" type="${ifNonNull(type)}" title="${ifNonNull(title)}" ?disabled="${disabled}">
      This is a tag
    </bx-tag>
  `;
};

Default.storyName = 'Default';

Default.parameters = {
  knobs: {
    'bx-tag': () => ({
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
    }),
  },
};

export const filter = args => {
  const {
    open,
    size,
    type,
    title,
    disabled,
    disableClose,
    onClick,
    onBeforeClose = noop,
    onClose = noop,
  } = args?.['bx-filter-tag'] ?? {};
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return html`
    <bx-filter-tag
      ?open="${open}"
      size="${ifNonNull(size)}"
      type="${ifNonNull(type)}"
      title="${ifNonNull(title)}"
      ?disabled="${disabled}"
      @click="${onClick}"
      @bx-filter-tag-beingclosed="${handleBeforeClose}"
      @bx-filter-tag-closed="${onClose}">
      This is a tag
    </bx-filter-tag>
  `;
};

filter.parameters = {
  knobs: {
    'bx-filter-tag': () => ({
      ...Default.parameters.knobs['bx-tag'](),
      open: boolean('Open (open)', true),
      disableClose: boolean(
        'Disable user-initiated close action (Call event.preventDefault() in bx-filter-tag-beingclosed event)',
        false
      ),
      onClick: action('click'),
      onBeforeClose: action('bx-filter-tag-beingclosed'),
      onClose: action('bx-filter-tag-closed'),
    }),
  },
};

export default {
  parameters: {
    ...storyDocs.parameters,
  },
  title: 'Components/Tag',
};
