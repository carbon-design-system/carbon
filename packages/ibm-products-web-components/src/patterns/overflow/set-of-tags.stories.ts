/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { generateTags } from '../../../examples/set-of-tags/src/example-data';
import '../../../examples/set-of-tags/src';
import styles from './story-styles.scss?lit';
import { TAG_SIZE } from '@carbon/web-components/es/components/tag/defs.js';

const argTypes = {
  tagsCount: {
    control: { type: 'number' },
    description: 'Number of tags to display',
  },
  tagSize: {
    control: { type: 'radio' },
    options: [TAG_SIZE.SMALL, TAG_SIZE.MEDIUM, TAG_SIZE.LARGE],
  },
  dismissible: {
    control: {
      type: 'boolean',
    },
  },
};

const defaultProps = {
  tagsCount: 10,
  tagSize: TAG_SIZE.MEDIUM,
  dismissible: false,
};

const renderTagsTemplate = (args) => {
  const { tagsCount, tagSize, dismissible } = args;
  const tagsData = generateTags({
    count: tagsCount,
    size: tagSize,
    dismissible,
  });

  return html`
    <style>
      ${styles}
    </style>
    <div class="example">
      <div class="annotation parent">
        <div class="annotation__label">Parent container</div>
        <div class="annotation__content">
          <set-of-tags .tagsData=${tagsData}></set-of-tags>
        </div>
      </div>
    </div>
  `;
};

export const SetOfTags = {
  args: {
    ...defaultProps,
  },
  argTypes,
  render: renderTagsTemplate,
};

const meta = {
  title: 'Patterns/Item overflow',
};

export default meta;
