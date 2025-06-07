/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { html } from 'lit';
import './index';

const kinds = [
  'failed',
  'critical',
  'high',
  'medium',
  'low',
  'cautious',
  'undefined',
  'stable',
  'informative',
  'incomplete',
  'draft',
];

const defaultArgs = {
  textSize: 12,
};

const controls = {
  textSize: {
    control: 'select',
    description:
      'Specify the "text-size" of the Shape Indicator. Currently supports either 12 (default) or 14 sizes.',
    options: [12, 14],
  },
  label: {
    control: 'text',
    description: 'Label next to the shape.',
  },
  kind: {
    control: 'select',
    description: 'Specify the kind of the Shape Indicator.',
    options: kinds,
  },
};

export const Default = {
  argTypes: controls,
  args: defaultArgs,
  render: ({ label, textSize }) => html`
    <div style="display: flex; flex-flow: column; row-gap: .5rem;">
      <cds-shape-indicator
        kind="failed"
        label=${label || 'Failed'}
        text-size=${textSize}></cds-shape-indicator>
      <cds-shape-indicator
        kind="critical"
        label=${label || 'Critical'}
        text-size=${textSize}></cds-shape-indicator>
      <cds-shape-indicator
        kind="high"
        label=${label || 'High'}
        text-size=${textSize}></cds-shape-indicator>
      <cds-shape-indicator
        kind="medium"
        label=${label || 'Medium'}
        text-size=${textSize}></cds-shape-indicator>
      <cds-shape-indicator
        kind="low"
        label=${label || 'Low'}
        text-size=${textSize}></cds-shape-indicator>
      <cds-shape-indicator
        kind="cautious"
        label=${label || 'Cautious'}
        text-size=${textSize}></cds-shape-indicator>
      <cds-shape-indicator
        kind="undefined"
        label=${label || 'Undefined'}
        text-size=${textSize}></cds-shape-indicator>
      <cds-shape-indicator
        kind="stable"
        label=${label || 'Stable'}
        text-size=${textSize}></cds-shape-indicator>
      <cds-shape-indicator
        kind="informative"
        label=${label || 'Informative'}
        text-size=${textSize}></cds-shape-indicator>
      <cds-shape-indicator
        kind="incomplete"
        label=${label || 'Incomplete'}
        text-size=${textSize}></cds-shape-indicator>
      <cds-shape-indicator
        kind="draft"
        label=${label || 'Draft'}
        text-size=${textSize}></cds-shape-indicator>
    </div>
  `,
};

const meta = {
  title: 'Experimental/Status Indicators/Shape Indicator',
};

export default meta;
