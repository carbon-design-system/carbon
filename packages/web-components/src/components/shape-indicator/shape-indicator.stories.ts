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
import { SHAPE_INDICATOR_KIND } from './shape-indicator';

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

export const Default = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: auto auto; column-gap: 1rem; row-gap: .5rem; width: fit-content">
      ${kinds.map(
        (kind) => html`
          <cds-shape-indicator
            kind="${kind}"
            label="${kind}"></cds-shape-indicator>
          <cds-shape-indicator
            kind="${kind}"
            label="${kind}"
            size=${14}></cds-shape-indicator>
        `
      )}
    </div>
  `,
};

const defaultArgs = {
  label: 'Custom label',
  kind: SHAPE_INDICATOR_KIND.FAILED,
  size: 12,
};

const controls = {
  size: {
    control: 'select',
    description:
      'Specify the size of the Shape Indicator. Currently supports either 12 (default) or 14 sizes.',
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

export const Playground = {
  argTypes: controls,
  args: defaultArgs,
  render: ({ label, size, kind }) =>
    html` <cds-shape-indicator
      kind="${kind}"
      size="${size}"
      label="${label}"></cds-shape-indicator>`,
};

const meta = {
  title: 'Experimental/Status Indicators/Shape Indicator',
};

export default meta;
