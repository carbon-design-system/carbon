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
  FluidTimePickerComponent,
  FluidTimePickerSelectComponent,
  FluidTimePickerSkeletonComponent,
} from '@carbon/angular/fluid-time-picker';
import { SelectItemComponent } from '@carbon/angular/select';
import { ToggletipComponent } from '@carbon/angular/toggle-tip';

// ─── WC-parity stories (one-for-one with @carbon/web-components Fluid Time Picker) ───

const args = {
  disabled: false,
  hideLabel: false,
  invalid: false,
  invalidText: 'Error message goes here',
  labelText: 'Time',
  placeholder: 'hh:mm',
  maxLength: 5,
  name: 'time',
  pattern: '[0-9]{1,2}:[0-9]{2}',
  readOnly: false,
  required: false,
  size: 'md',
  value: '',
  warning: false,
  warningText: 'Warning message goes here',
};

const argTypes: ArgTypes = {
  disabled: {
    control: 'boolean',
    description: 'Specify whether the `<input>` should be disabled.',
  },
  labelText: {
    control: 'text',
    description:
      'Provide the text that will be read by a screen reader when visiting this control.',
  },
  hideLabel: {
    control: 'boolean',
    description: 'Specify whether the label should be visually hidden.',
  },
  invalid: {
    control: 'boolean',
    description: 'Specify whether the control is currently invalid.',
  },
  invalidText: {
    control: 'text',
    description:
      'Provide the text that is displayed when the control is in an invalid state.',
  },
  placeholder: {
    control: 'text',
    description: 'Specify the placeholder text for the input.',
  },
  maxLength: {
    control: 'number',
    description: 'Specify the maximum input length.',
  },
  name: {
    control: 'text',
    description: 'Specify the input name.',
  },
  onInput: {
    action: 'input',
  },
  pattern: {
    control: 'text',
    description: 'Specify the input validation pattern.',
  },
  readOnly: {
    control: 'boolean',
    description: 'Whether or not the component is readonly.',
  },
  required: {
    control: 'boolean',
    description: 'Specify whether the input is required.',
  },
  size: {
    control: 'select',
    options: ['sm', 'md', 'lg'],
    description: 'Specify the component size.',
  },
  value: {
    control: 'text',
    description: 'Specify the input value.',
  },
  warning: {
    control: 'boolean',
    description: 'Specify whether the control is currently in warning state.',
  },
  warningText: {
    control: 'text',
    description:
      'Provide the text that is displayed when the control is in warning state.',
  },
};

const toggletipLabel = `
  <cds-ng-toggletip slot="label-text" alignment="top-left" [autoalign]="true">
    Clock
    <p slot="body-text">Additional field information here.</p>
  </cds-ng-toggletip>
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Fluid Components/FluidTimePicker',
  decorators: [
    moduleMetadata({
      imports: [
        FluidTimePickerComponent,
        FluidTimePickerSelectComponent,
        FluidTimePickerSkeletonComponent,
        SelectItemComponent,
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
      <div style="width: 350px;">
        <cds-ng-fluid-time-picker
          id="time-picker-1"
          [disabled]="disabled"
          [hideLabel]="hideLabel"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [labelText]="labelText"
          [placeholder]="placeholder"
          [maxLength]="maxLength"
          [name]="name"
          [pattern]="pattern"
          [readOnly]="readOnly"
          [required]="required"
          [size]="size"
          [value]="value"
          [warning]="warning"
          [warningText]="warningText">
          <cds-ng-fluid-time-picker-select id="select-1" defaultValue="am">
            ${toggletipLabel}
            <cds-ng-select-item value="am" [selected]="true">AM</cds-ng-select-item>
            <cds-ng-select-item value="pm">PM</cds-ng-select-item>
          </cds-ng-fluid-time-picker-select>
          <cds-ng-fluid-time-picker-select
            id="select-2"
            labelText="Timezone"
            defaultValue="et">
            <cds-ng-select-item value="et" [selected]="true">
              Eastern Time (ET)
            </cds-ng-select-item>
            <cds-ng-select-item value="ct">Central Time (CT)</cds-ng-select-item>
            <cds-ng-select-item value="mt">Mountain Time (MT)</cds-ng-select-item>
            <cds-ng-select-item value="pt">Pacific Time (PT)</cds-ng-select-item>
          </cds-ng-fluid-time-picker-select>
        </cds-ng-fluid-time-picker>
        <br />
        <br />
        <cds-ng-fluid-time-picker
          id="time-picker-2"
          [labelText]="labelText"
          [placeholder]="placeholder"
          [maxLength]="maxLength"
          [name]="name"
          [pattern]="pattern"
          [disabled]="disabled"
          [hideLabel]="hideLabel"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [readOnly]="readOnly"
          [required]="required"
          [size]="size"
          [value]="value"
          [warning]="warning"
          [warningText]="warningText">
          <cds-ng-fluid-time-picker-select id="select-3" defaultValue="am">
            ${toggletipLabel}
            <cds-ng-select-item value="am" [selected]="true">AM</cds-ng-select-item>
            <cds-ng-select-item value="pm">PM</cds-ng-select-item>
          </cds-ng-fluid-time-picker-select>
        </cds-ng-fluid-time-picker>
      </div>
    `,
  }),
};

// WC: Skeleton
export const Skeleton: StoryObj<Record<string, unknown>> = {
  render: () => ({
    template: `
      <div style="width: 300px;">
        <cds-ng-fluid-time-picker-skeleton></cds-ng-fluid-time-picker-skeleton>
        <br />
        <br />
        <cds-ng-fluid-time-picker-skeleton [isOnlyTwo]="true">
        </cds-ng-fluid-time-picker-skeleton>
      </div>
    `,
  }),
};
