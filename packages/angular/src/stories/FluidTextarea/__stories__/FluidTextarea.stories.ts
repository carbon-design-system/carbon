/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  type ArgTypes,
} from '@storybook/angular';
import {
  FluidTextareaComponent,
  FluidTextareaSkeletonComponent,
} from '@carbon/angular/fluid-textarea';
import { withLayers } from '../../../../.storybook/decorators/with-layers';
import { ToggletipComponent } from '@carbon/angular/toggle-tip';

// ─── WC-parity stories (one-for-one with @carbon/web-components Fluid Textarea) ───

const args = {
  cols: 0,
  counterMode: '',
  defaultWidth: 300,
  disabled: false,
  enableCounter: true,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  label: 'Text Area label',
  maxCount: 500,
  placeholder: 'Placeholder text',
  readonly: false,
  rows: 4,
  value: '',
  warn: false,
  warnText: 'This is a warning message.',
};

const argTypes: ArgTypes = {
  cols: {
    control: 'number',
    description: 'Number of columns (cols)',
  },
  counterMode: {
    control: 'radio',
    options: ['character', 'word'],
    description:
      'Specify the method used for calculating the counter number (character or word)',
  },
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  disabled: {
    control: 'boolean',
    description: 'Disabled (disabled)',
  },
  enableCounter: {
    control: 'boolean',
    description: 'Enable character counter (enable-counter)',
  },
  invalid: {
    control: 'boolean',
    description: 'Invalid (invalid)',
  },
  invalidText: {
    control: 'text',
    description: 'Invalid text (invalid-text)',
  },
  label: {
    control: 'text',
    description: 'Label (label)',
  },
  maxCount: {
    control: 'number',
    description: 'Max character count (max-count)',
  },
  onInput: {
    action: `input`,
  },
  placeholder: {
    control: 'text',
    description: 'Placeholder text (placeholder)',
  },
  readonly: {
    control: 'boolean',
    description: 'Read only (readonly)',
  },
  rows: {
    control: 'number',
    description: 'Number of rows (rows)',
  },
  value: {
    control: 'text',
    description: 'Value (value)',
  },
  warn: {
    control: 'boolean',
    description: 'Warn (warn)',
  },
  warnText: {
    control: 'text',
    description: 'Warn text (warn-text)',
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Fluid Components/FluidTextArea',
  decorators: [
    moduleMetadata({
      imports: [
        FluidTextareaComponent,
        FluidTextareaSkeletonComponent,
        ToggletipComponent,
      ],
    }),
  ],
  parameters: {
    controls: {
      exclude: ['onInput'],
    },
  },
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

// WC: Default
export const Default: Story = {
  args,
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div [style.width.px]="defaultWidth">
        <cds-ng-fluid-textarea
          [enableCounter]="enableCounter"
          [counterMode]="counterMode"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [label]="label"
          [readonly]="readonly"
          [value]="value"
          [warn]="warn"
          [warnText]="warnText"
          [disabled]="disabled"
          [maxCount]="maxCount"
          [placeholder]="placeholder"
          [rows]="rows"
          [cols]="cols">
        </cds-ng-fluid-textarea>
      </div>
    `,
  }),
};

// WC: Skeleton
export const Skeleton: StoryObj<Record<string, unknown>> = {
  args: { defaultWidth: 300 },
  argTypes: { defaultWidth: argTypes.defaultWidth },
  render: (args) => ({
    props: args,
    template: `
      <div [style.width.px]="defaultWidth">
        <cds-ng-fluid-textarea-skeleton></cds-ng-fluid-textarea-skeleton>
      </div>
    `,
  }),
};

// WC: WithLayer
export const WithLayer: Story = {
  decorators: [withLayers],
  args,
  argTypes,
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => ({
    props: args,
    template: `
      <div [style.width.px]="defaultWidth">
        <cds-ng-fluid-textarea
          [enableCounter]="enableCounter"
          [counterMode]="counterMode"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [label]="label"
          [readonly]="readonly"
          [value]="value"
          [warn]="warn"
          [warnText]="warnText"
          [disabled]="disabled"
          [maxCount]="maxCount"
          [placeholder]="placeholder"
          [rows]="rows"
          [cols]="cols">
        </cds-ng-fluid-textarea>
      </div>
    `,
  }),
};

// WC: DefaultWithToggletip
export const DefaultWithToggletip: Story = {
  args,
  argTypes,
  parameters: { controls: { exclude: ['label', 'onInput'] } },
  render: (args) => ({
    props: args,
    template: `
      <div [style.width.px]="defaultWidth">
        <cds-ng-fluid-textarea
          [enableCounter]="enableCounter"
          [counterMode]="counterMode"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [readonly]="readonly"
          [value]="value"
          [warn]="warn"
          [warnText]="warnText"
          [disabled]="disabled"
          [maxCount]="maxCount"
          [placeholder]="placeholder"
          [rows]="rows"
          [cols]="cols">
          <cds-ng-toggletip
            slot="label-text"
            alignment="top-left"
            [autoalign]="true">
            Toggletip label
            <p slot="body-text">Additional field information here.</p>
          </cds-ng-toggletip>
        </cds-ng-fluid-textarea>
      </div>
    `,
  }),
};
