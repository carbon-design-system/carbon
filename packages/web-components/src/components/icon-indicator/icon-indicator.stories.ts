/**
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

export const Default = {
  argTypes: controls,
  args: defaultArgs,
  render: ({ label, size }) => html`
    <div style="display: flex; flex-flow: column; row-gap: .5rem;">
      <cds-icon-indicator
        kind="failed"
        label=${label || 'Failed'}
        size=${size}></cds-icon-indicator>
      <cds-icon-indicator
        kind="caution-major"
        label=${label || 'Caution major'}
        size=${size}></cds-icon-indicator>
      <cds-icon-indicator
        kind="caution-minor"
        label=${label || 'Caution minor'}
        size=${size}></cds-icon-indicator>
      <cds-icon-indicator
        kind="undefined"
        label=${label || 'Undefined'}
        size=${size}></cds-icon-indicator>
      <cds-icon-indicator
        kind="succeeded"
        label=${label || 'Succeeded'}
        size=${size}></cds-icon-indicator>
      <cds-icon-indicator
        kind="normal"
        label=${label || 'Normal'}
        size=${size}></cds-icon-indicator>
      <cds-icon-indicator
        kind="in-progress"
        label=${label || 'In progress'}
        size=${size}></cds-icon-indicator>
      <cds-icon-indicator
        kind="incomplete"
        label=${label || 'Incomplete'}
        size=${size}></cds-icon-indicator>
      <cds-icon-indicator
        kind="not-started"
        label=${label || 'Not started'}
        size=${size}></cds-icon-indicator>
      <cds-icon-indicator
        kind="pending"
        label=${label || 'Pending'}
        size=${size}></cds-icon-indicator>
      <cds-icon-indicator
        kind="unknown"
        label=${label || 'Unknown'}
        size=${size}></cds-icon-indicator>
      <cds-icon-indicator
        kind="informative"
        label=${label || 'Informative'}
        size=${size}></cds-icon-indicator>
    </div>
  `,
};

const meta = {
  title: 'Preview/Status Indicators/Icon Indicator',
};

export default meta;
