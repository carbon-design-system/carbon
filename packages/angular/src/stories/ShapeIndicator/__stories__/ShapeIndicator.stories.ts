/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NgFor } from '@angular/common';
import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  type ArgTypes,
} from '@storybook/angular';
import { ShapeIndicatorComponent } from '@carbon/angular/shape-indicator';

// ─── WC-parity stories (one-for-one with @carbon/web-components ShapeIndicator) ─

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

const alignments = {
  top: 'top',
  'top-start': 'top-start',
  'top-end': 'top-end',
  bottom: 'bottom',
  'bottom-start': 'bottom-start',
  'bottom-end': 'bottom-end',
  left: 'left',
  'left-start': 'left-start',
  'left-end': 'left-end',
  right: 'right',
  'right-start': 'right-start',
  'right-end': 'right-end',
};

const defaultArgs = {
  align: 'right',
  shapeDescription: 'Shape',
  compact: false,
  textSize: 12,
};

const controls: ArgTypes = {
  align: {
    control: 'select',
    description:
      'Specify how the tooltip should align with the shape in compact mode',
    options: Object.values(alignments),
  },
  autoAlign: {
    control: 'boolean',
    description: 'Will auto-align the tooltip in compact mode',
  },
  compact: {
    control: 'boolean',
    description:
      'When true, displays only the shape with the label in a tooltip',
  },
  shapeDescription: {
    control: 'text',
    description:
      'Additional Description for the shape, used for screen readers in compact mode',
  },
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

const meta: Meta = {
  title: 'Preview/Status Indicators/Shape Indicator',
  decorators: [
    moduleMetadata({
      imports: [ShapeIndicatorComponent, NgFor],
    }),
  ],
};

export default meta;
type Story = StoryObj;

// TODO(parity): `kind` and `textSize` do not style the shape yet (no status
// color, text size 14 not applied). The web component selects on the `kind` and
// `text-size` attributes, which its non-reflecting properties never set, and the
// wrapper only forwards properties.
// See https://github.com/carbon-design-system/carbon/issues/24093
// WC: Default
export const Default: Story = {
  argTypes: controls,
  args: defaultArgs,
  render: ({
    align,
    shapeDescription,
    autoAlign,
    compact,
    label,
    textSize,
  }) => ({
    props: {
      align,
      shapeDescription,
      autoAlign,
      compact,
      label,
      textSize,
      indicators: [
        { kind: 'failed', label: 'Failed' },
        { kind: 'critical', label: 'Critical' },
        { kind: 'high', label: 'High' },
        { kind: 'medium', label: 'Medium' },
        { kind: 'low', label: 'Low' },
        { kind: 'cautious', label: 'Cautious' },
        { kind: 'undefined', label: 'Undefined' },
        { kind: 'stable', label: 'Stable' },
        { kind: 'informative', label: 'Informative' },
        { kind: 'incomplete', label: 'Incomplete' },
        { kind: 'draft', label: 'Draft' },
      ],
    },
    template: `
      <div style="display: inline-flex; flex-flow: column; row-gap: .5rem;">
        <cds-ng-shape-indicator
          *ngFor="let indicator of indicators"
          [kind]="indicator.kind"
          [label]="label || indicator.label"
          [textSize]="textSize"
          [align]="align"
          [shapeDescription]="shapeDescription"
          [autoalign]="autoAlign"
          [compact]="compact"></cds-ng-shape-indicator>
      </div>
    `,
  }),
};
