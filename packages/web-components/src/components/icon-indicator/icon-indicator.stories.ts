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
import { ICON_INDICATOR_KIND } from './defs';

const kinds = [
  'failed',
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
  'informative',
];

export const Default = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: auto auto; column-gap: 1rem; row-gap: .5rem; width: fit-content">
      ${kinds.map(
        (kind) => html`
          <cds-icon-indicator
            kind="${kind}"
            label="${kind}"></cds-icon-indicator>
          <cds-icon-indicator
            kind="${kind}"
            label="${kind}"
            size=${20}></cds-icon-indicator>
        `
      )}
    </div>
  `,
};

const defaultArgs = {
  label: 'Custom label',
  kind: ICON_INDICATOR_KIND.FAILED,
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
  kind: {
    control: 'select',
    description: 'Specify the kind of the Icon Indicator.',
    options: kinds,
  },
};

export const Playground = {
  argTypes: controls,
  args: defaultArgs,
  render: ({ label, size, kind }) =>
    html` <cds-icon-indicator
      kind="${kind}"
      size="${size}"
      label="${label}"></cds-icon-indicator>`,
};

const meta = {
  title: 'Experimental/Status Indicators/Icon Indicator',
};

export default meta;
