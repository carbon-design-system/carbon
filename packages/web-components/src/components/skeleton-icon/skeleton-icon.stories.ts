/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './skeleton-icon';

export const Default = {
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
    },
    size: {
      control: {
        type: 'range',
        min: 16,
        max: 64,
        step: 1,
      },
    },
  },
  args: {
    className: '',
    size: 16,
  },
  render: ({ className, size }) =>
    html`<cds-skeleton-icon
      class=${className}
      style="margin: 50px; width: ${size}px; height: ${size}px;"></cds-skeleton-icon>`,
};

const meta = {
  title: 'Components/Skeleton/Skeleton Icon',
};

export default meta;
