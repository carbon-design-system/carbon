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
import { IconIndicatorComponent } from '@carbon/angular/icon-indicator';

// ─── WC-parity stories (one-for-one with @carbon/web-components IconIndicator) ─

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
  iconDescription: 'Icon',
  compact: false,
  kind: 'failed',
  size: 16,
};

const controls: ArgTypes = {
  align: {
    control: 'select',
    description:
      'Specify how the tooltip should align with the icon in compact mode',
    options: Object.values(alignments),
  },
  autoalign: {
    control: 'boolean',
    description: 'Will auto-align the tooltip in compact mode',
  },
  compact: {
    control: 'boolean',
    description:
      'When true, displays only the icon with the label in a tooltip',
  },
  iconDescription: {
    control: 'text',
    description:
      'Additional Description for the icon, used for screen readers in compact mode.',
  },
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

const meta: Meta = {
  title: 'Preview/Status Indicators/Icon Indicator',
  decorators: [
    moduleMetadata({
      imports: [IconIndicatorComponent, NgFor],
    }),
  ],
};

export default meta;
type Story = StoryObj;

// TODO(parity): `kind` and `size` do not style the icon yet (no status color,
// size 20 not applied). The web component selects on the `kind` and `size`
// attributes, which its non-reflecting properties never set, and the wrapper only
// forwards properties. See https://github.com/carbon-design-system/carbon/issues/24093
// WC: Default
export const Default: Story = {
  argTypes: controls,
  args: defaultArgs,
  render: ({ align, iconDescription, autoalign, compact, label, size }) => ({
    props: {
      align,
      iconDescription,
      autoalign,
      compact,
      label,
      size,
      indicators: [
        { kind: 'failed', label: 'Failed' },
        { kind: 'caution-major', label: 'Caution major' },
        { kind: 'caution-minor', label: 'Caution minor' },
        { kind: 'undefined', label: 'Undefined' },
        { kind: 'succeeded', label: 'Succeeded' },
        { kind: 'normal', label: 'Normal' },
        { kind: 'in-progress', label: 'In progress' },
        { kind: 'incomplete', label: 'Incomplete' },
        { kind: 'not-started', label: 'Not started' },
        { kind: 'pending', label: 'Pending' },
        { kind: 'unknown', label: 'Unknown' },
        { kind: 'informative', label: 'Informative' },
      ],
    },
    template: `
      <div style="display: inline-flex; flex-flow: column; row-gap: .5rem;">
        <cds-ng-icon-indicator
          *ngFor="let indicator of indicators"
          [kind]="indicator.kind"
          [label]="label || indicator.label"
          [size]="size"
          [align]="align"
          [iconDescription]="iconDescription"
          [autoalign]="autoalign"
          [compact]="compact"></cds-ng-icon-indicator>
      </div>
    `,
  }),
};
