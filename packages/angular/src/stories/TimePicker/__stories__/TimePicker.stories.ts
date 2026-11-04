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
  TimePickerComponent,
  TimePickerSelectComponent,
} from '@carbon/angular/time-picker';
import { SelectItemComponent } from '@carbon/angular/select';
import { LayerComponent } from '@carbon/angular/layer';

// ─── WC-parity stories (one-for-one with @carbon/web-components Time Picker) ───

const args = {
  disabled: false,
  hideLabel: false,
  invalid: false,
  invalidText: 'Error message goes here',
  warningText: 'Warning message goes here',
  labelText: 'Select a time',
  placeholder: 'hh:mm',
  readOnly: false,
  size: 'md',
  value: '',
  warning: false,
  maxLength: 5,
  type: 'text',
};

const argTypes: ArgTypes = {
  disabled: {
    control: 'boolean',
    description: 'Disabled (disabled)',
  },
  hideLabel: {
    control: 'boolean',
    description: 'Hide label (hide-label)',
  },
  invalid: {
    control: 'boolean',
    description: 'Invalid (invalid)',
  },
  invalidText: {
    control: 'text',
    description: 'Invalid text (invalid-text)',
  },
  labelText: {
    control: 'text',
    description: 'Label text (label)',
  },
  placeholder: {
    control: 'text',
    description: 'Placeholder text (placeholder)',
  },
  readOnly: {
    control: 'boolean',
    description: 'Read only (readOnly)',
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: 'select',
    description: 'Size (size)',
  },
  value: {
    control: 'text',
    description: 'Value (value)',
  },
  warning: {
    control: 'boolean',
    description: 'Warning (warning)',
  },
  warningText: {
    control: 'text',
    description: 'Warn text (warning-text)',
  },
  maxLength: {
    control: 'number',
    description: 'Max length (max-length)',
  },
  type: {
    control: 'text',
    description: 'Type (type)',
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Time Picker',
  decorators: [
    moduleMetadata({
      imports: [
        TimePickerComponent,
        TimePickerSelectComponent,
        SelectItemComponent,
        LayerComponent,
      ],
    }),
  ],
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
      <cds-ng-time-picker
        id="time-picker"
        [hideLabel]="hideLabel"
        [invalid]="invalid"
        [invalidText]="invalidText"
        [labelText]="labelText"
        [placeholder]="placeholder"
        [readOnly]="readOnly"
        [disabled]="disabled"
        [size]="size"
        [value]="value"
        [warning]="warning"
        [maxLength]="maxLength"
        [type]="type"
        [warningText]="warningText">
        <cds-ng-time-picker-select
          defaultValue="AM"
          id="time-picker-select-1"
          [disabled]="disabled"
          ariaLabel="Select AM/PM">
          <cds-ng-select-item value="AM" [selected]="true">AM</cds-ng-select-item>
          <cds-ng-select-item value="PM">PM</cds-ng-select-item>
        </cds-ng-time-picker-select>
        <cds-ng-time-picker-select
          defaultValue="Time zone 1"
          id="time-picker-select-2"
          [disabled]="disabled"
          ariaLabel="Select timezone">
          <cds-ng-select-item value="Time zone 1">Time zone 1</cds-ng-select-item>
          <cds-ng-select-item value="Time zone 2" [selected]="true">Time zone 2</cds-ng-select-item>
        </cds-ng-time-picker-select>
      </cds-ng-time-picker>
    `,
  }),
};

// WC: WithLayer
export const WithLayer: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args,
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div class="cds--with-layer__background">
        <div class="cds--with-layer__label">$background</div>
        <div class="cds--with-layer__content">
          <cds-ng-time-picker
            id="time-picker"
            [labelText]="labelText"
            [placeholder]="placeholder">
            <cds-ng-time-picker-select
              id="time-picker-select-1"
              defaultValue="AM"
              ariaLabel="Select AM/PM">
              <cds-ng-select-item value="AM">AM</cds-ng-select-item>
              <cds-ng-select-item value="PM" [selected]="true">PM</cds-ng-select-item>
            </cds-ng-time-picker-select>
            <cds-ng-time-picker-select
              id="time-picker-select-2"
              ariaLabel="Select timezone"
              defaultValue="Time zone 1">
              <cds-ng-select-item value="Time zone 1">Time zone 1</cds-ng-select-item>
              <cds-ng-select-item value="Time zone 2" [selected]="true">Time zone 2</cds-ng-select-item>
            </cds-ng-time-picker-select>
          </cds-ng-time-picker>
          <cds-ng-layer [withBackground]="true">
            <div class="cds--with-layer__layer">
              <div class="cds--with-layer__label">$layer-01</div>
              <div class="cds--with-layer__content">
                <cds-ng-time-picker
                  id="time-picker-1"
                  [labelText]="labelText"
                  [placeholder]="placeholder">
                  <cds-ng-time-picker-select
                    id="time-picker-select-3"
                    defaultValue="AM"
                    ariaLabel="Select AM/PM">
                    <cds-ng-select-item value="AM">AM</cds-ng-select-item>
                    <cds-ng-select-item value="PM" [selected]="true">PM</cds-ng-select-item>
                  </cds-ng-time-picker-select>
                  <cds-ng-time-picker-select
                    id="time-picker-select-4"
                    ariaLabel="Select timezone"
                    defaultValue="Time zone 1">
                    <cds-ng-select-item value="Time zone 1">Time zone 1</cds-ng-select-item>
                    <cds-ng-select-item value="Time zone 2" [selected]="true">Time zone 2</cds-ng-select-item>
                  </cds-ng-time-picker-select>
                </cds-ng-time-picker>
                <cds-ng-layer [withBackground]="true">
                  <div class="cds--with-layer__layer">
                    <div class="cds--with-layer__label">$layer-02</div>
                    <div class="cds--with-layer__content">
                      <cds-ng-time-picker
                        id="time-picker-2"
                        [labelText]="labelText"
                        [placeholder]="placeholder">
                        <cds-ng-time-picker-select
                          id="time-picker-select-5"
                          defaultValue="AM"
                          ariaLabel="Select AM/PM">
                          <cds-ng-select-item value="AM">AM</cds-ng-select-item>
                          <cds-ng-select-item value="PM" [selected]="true">PM</cds-ng-select-item>
                        </cds-ng-time-picker-select>
                        <cds-ng-time-picker-select
                          id="time-picker-select-6"
                          ariaLabel="Select timezone"
                          defaultValue="Time zone 1">
                          <cds-ng-select-item value="Time zone 1">Time zone 1</cds-ng-select-item>
                          <cds-ng-select-item value="Time zone 2" [selected]="true">Time zone 2</cds-ng-select-item>
                        </cds-ng-time-picker-select>
                      </cds-ng-time-picker>
                    </div>
                  </div>
                </cds-ng-layer>
              </div>
            </div>
          </cds-ng-layer>
        </div>
      </div>
    `,
  }),
};
