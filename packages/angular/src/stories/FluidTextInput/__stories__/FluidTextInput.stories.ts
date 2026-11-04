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
  FluidTextInputComponent,
  FluidTextInputSkeletonComponent,
} from '@carbon/angular/fluid-text-input';
import { ToggletipComponent } from '@carbon/angular/toggle-tip';

// ─── WC-parity stories (one-for-one with @carbon/web-components Fluid Text Input) ───

const args = {
  placeholder: 'Placeholder text',
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  disabled: false,
  labelText: 'Label',
  enableCounter: false,
  maxCount: 500,
  readonly: false,
  value: '',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

const argTypes: ArgTypes = {
  placeholder: {
    control: { type: 'text' },
    description: 'Specify the placeholder attribute for the `<input>`.',
    table: { defaultValue: { summary: 'undefined' } },
  },
  invalid: {
    control: { type: 'boolean' },
    description: 'Specify whether the control is currently invalid.',
    table: { defaultValue: { summary: 'false' } },
  },
  invalidText: {
    control: { type: 'text' },
    description:
      'Provide the text that is displayed when the control is in an invalid state.',
    table: { defaultValue: { summary: 'undefined' } },
  },
  disabled: {
    control: { type: 'boolean' },
    description: 'Specify whether the `<input>` should be disabled.',
    table: { defaultValue: { summary: 'false' } },
  },
  labelText: {
    control: { type: 'text' },
    description:
      'Provide the text that will be read by a screen reader when visiting this control.',
    table: { defaultValue: { summary: 'required' } },
  },
  warn: {
    control: { type: 'boolean' },
    description: 'Specify whether the control is currently in warning state.',
    table: { defaultValue: { summary: 'false' } },
  },
  warnText: {
    control: { type: 'text' },
    description:
      'Provide the text that is displayed when the control is in warning state.',
    table: { defaultValue: { summary: 'undefined' } },
  },
  value: {
    control: { type: 'text' },
    description: 'The value of the input.',
    table: { defaultValue: { summary: '""' } },
  },
  onInput: {
    action: 'input',
  },
  onClick: {
    action: 'click',
  },
  maxCount: {
    control: 'number',
    description:
      'Max character count allowed for the textInput. This is needed in order for enableCounter to display.',
    table: { defaultValue: { summary: 'undefined' } },
  },
  enableCounter: {
    control: 'boolean',
    description: 'Specify whether to display the character counter.',
    table: { defaultValue: { summary: 'false' } },
  },
  readonly: {
    control: 'boolean',
    description: 'Whether or not the component is readonly.',
    table: { defaultValue: { summary: 'false' } },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Fluid Components/FluidTextInput',
  decorators: [
    moduleMetadata({
      imports: [
        FluidTextInputComponent,
        FluidTextInputSkeletonComponent,
        ToggletipComponent,
      ],
    }),
  ],
  parameters: {
    controls: {
      exclude: ['onClick', 'onInput'],
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
      <div style="width: 400px">
        <cds-ng-fluid-text-input
          id="input-1"
          [disabled]="disabled"
          [enableCounter]="enableCounter"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [label]="labelText"
          [maxCount]="maxCount"
          [placeholder]="placeholder"
          [readonly]="readonly"
          [value]="value"
          [warn]="warn"
          [warnText]="warnText">
        </cds-ng-fluid-text-input>
      </div>
    `,
  }),
};

// WC: DefaultWithToggletip
export const DefaultWithToggletip: Story = {
  args,
  argTypes,
  parameters: {
    controls: {
      exclude: ['labelText', 'onClick', 'onInput'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px">
        <cds-ng-fluid-text-input
          id="input-1"
          [disabled]="disabled"
          [enableCounter]="enableCounter"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [maxCount]="maxCount"
          [placeholder]="placeholder"
          [readonly]="readonly"
          [value]="value"
          [warn]="warn"
          [warnText]="warnText">
          <cds-ng-toggletip [autoalign]="true" slot="label-text">
            Label
            <p slot="body-text">Additional field information here.</p>
          </cds-ng-toggletip>
        </cds-ng-fluid-text-input>
      </div>
    `,
  }),
};

// WC: Skeleton
export const Skeleton: StoryObj<Record<string, unknown>> = {
  render: () => ({
    template: `
      <div style="width: 400px">
        <cds-ng-fluid-text-input-skeleton></cds-ng-fluid-text-input-skeleton>
      </div>
    `,
  }),
};
