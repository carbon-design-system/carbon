/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import { ICON_INDICATOR_TYPE } from './defs';

const types = [
  'error',
  'caution-major',
  'caution-minor',
  'undefined',
  'succeeded',
  'normal',
  'in-progress',
  'incomplete',
  'not-started',
  'pending',
  'unknown',
  'information',
];

export const Default = {
  render: () => html`
    ${types.map(
      (type) => html`
        <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
          <cds-icon-indicator
            type="${type}"
            label="${type}"></cds-icon-indicator>
          <cds-icon-indicator
            type="${type}"
            label="${type}"
            size=${20}></cds-icon-indicator>
        </div>
      `
    )}
  `,
};

const defaultArgs = {
  label: 'Label',
  type: ICON_INDICATOR_TYPE.ERROR,
  size: 16,
};

const controls = {
  size: {
    control: 'select',
    description:
      'Specify the size of the Icon Indicator. Currently supports either 16 (default) or 20  sizes.',
    options: [16, 20],
  },
  label: {
    control: 'text',
    description: 'Label next to the icon.',
  },
  type: {
    control: 'select',
    description: 'Specify the type of the Icon Indicator.',
    options: types,
  },
};

export const Playground = {
  argTypes: controls,
  args: defaultArgs,
  render: ({ label, size, type }) =>
    html` <cds-icon-indicator
      type="${type}"
      size="${size}"
      label="${label}"></cds-icon-indicator>`,
};

const meta = {
  title: 'Components/Icon Indicator',
};

export default meta;
