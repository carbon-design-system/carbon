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
import './filter-tag';
import storyDocs from './tag-story.mdx';
import { prefix } from '../../globals/settings';

const noop = () => {};

const sizes = {
  'Regular size': null,
  [`Small size (${TAG_SIZE.SMALL})`]: TAG_SIZE.SMALL,
};

export const Default = (args) => {
  const { size, type, title, disabled } = args?.[`${prefix}-tag`] ?? {};
  return html`
    <cds-tag
      size="${ifDefined(size)}"
      type="${ifDefined(type)}"
      title="${ifDefined(title)}"
      ?disabled="${disabled}">
      This is a tag
    </cds-tag>
  `;
};

Default.storyName = 'Default';

Default.parameters = {
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
    }),
  },
};

export const filter = (args) => {
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
  } = args?.[`${prefix}-filter-tag`] ?? {};
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return html`
    <cds-filter-tag
      ?open="${open}"
      size="${ifDefined(size)}"
      type="${ifDefined(type)}"
      title="${ifDefined(title)}"
      ?disabled="${disabled}"
      @click="${onClick}"
      @cds-filter-tag-beingclosed="${handleBeforeClose}"
      @cds-filter-tag-closed="${onClose}">
      This is a tag
    </cds-filter-tag>
  `;
};

filter.parameters = {
  knobs: {
    [`${prefix}-filter-tag`]: () => ({
      ...Default.parameters.knobs[`${prefix}-tag`](),
      open: boolean('Open (open)', true),
      disableClose: boolean(
        `Disable user-initiated close action (Call event.preventDefault() in ${prefix}-filter-tag-beingclosed event)`,
        false
      ),
      onClick: action('click'),
      onBeforeClose: action(`${prefix}-filter-tag-beingclosed`),
      onClose: action(`${prefix}-filter-tag-closed`),
    }),
  },
};

export default {
  parameters: {
    ...storyDocs.parameters,
  },
  title: 'Components/Tag',
};
