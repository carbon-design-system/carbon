/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './skeleton-placeholder';

export const Default = {
  argTypes: {
    height: {
      control: {
        type: 'range',
        min: 16,
        max: 400,
        step: 4,
      },
    },
    optionalClasses: {
      control: {
        type: 'text',
      },
    },
    width: {
      control: {
        type: 'range',
        min: 16,
        max: 400,
        step: 4,
      },
    },
  },
  args: {
    height: 100,
    optionalClasses: '',
    width: 100,
  },
  render: ({ height, optionalClasses, width }) => html`
    <style>
      #skeleton-placeholder-story::part(placeholder) {
        block-size: ${height}px;
        inline-size: ${width}px;
      }
    </style>
    <cds-skeleton-placeholder
      id="skeleton-placeholder-story"
      optional-classes=${optionalClasses}></cds-skeleton-placeholder>
  `,
};

const meta = {
  title: 'Components/Skeleton/Skeleton Placeholder',
};

export default meta;
