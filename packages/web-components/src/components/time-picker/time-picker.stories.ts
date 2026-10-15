/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './index';
import '../form/form-item';
import './time-picker-select';
import '../select/select-item';
import './time-picker';
import { withLayers } from '../../../.storybook/decorators/with-layers';

interface TimePickerStoryArgs {
  disabled: boolean;
  hideLabel: boolean;
  invalid: boolean;
  invalidText: string;
  labelText: string;
  maxLength: number;
  onChange: (event: Event) => void;
  placeholder: string;
  readOnly: boolean;
  size: 'sm' | 'md' | 'lg';
  type: string;
  value: string;
  warning: boolean;
  warningText: string;
}

const sharedArgs = {
  disabled: false,
  hideLabel: false,
  invalid: false,
  invalidText: 'Enter a valid time',
  labelText: 'Meeting time',
  maxLength: 5,
  placeholder: 'hh:mm',
  readOnly: false,
  size: 'md',
  type: 'text',
  value: '10:30',
  warning: false,
  warningText: 'The selected time is outside business hours',
};

const sharedArgTypes = {
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
  maxLength: {
    control: 'number',
    description: 'Max length (max-length)',
  },
  onChange: {
    action: 'change',
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
  type: {
    control: 'text',
    description: 'Type (type)',
  },
};

const renderTimePicker = ({
  disabled,
  hideLabel,
  invalid,
  invalidText,
  labelText,
  maxLength,
  onChange,
  placeholder,
  readOnly,
  size,
  type,
  value,
  warning,
  warningText,
}: TimePickerStoryArgs) => html`
  <cds-time-picker
    id="time-picker"
    ?hide-label="${hideLabel}"
    ?invalid="${invalid}"
    invalid-text="${ifDefined(invalidText)}"
    label-text="${ifDefined(labelText)}"
    max-length="${ifDefined(maxLength)}"
    placeholder="${ifDefined(placeholder)}"
    ?readonly="${readOnly}"
    ?disabled="${disabled}"
    size="${ifDefined(size)}"
    type="${ifDefined(type)}"
    .value="${value}"
    ?warning="${warning}"
    warning-text="${ifDefined(warningText)}"
    @change="${onChange}">
    <cds-time-picker-select
      default-value="AM"
      id="time-picker-select-1"
      ?disabled="${disabled}"
      aria-label="Select AM or PM">
      <cds-select-item value="AM" selected="true">AM</cds-select-item>
      <cds-select-item value="PM">PM</cds-select-item>
    </cds-time-picker-select>
    <cds-time-picker-select
      default-value="America/New_York"
      id="time-picker-select-2"
      ?disabled="${disabled}"
      aria-label="Select time zone">
      <cds-select-item value="America/New_York" selected
        >Eastern time</cds-select-item
      >
      <cds-select-item value="America/Chicago">Central time</cds-select-item>
    </cds-time-picker-select>
  </cds-time-picker>
`;

export const Default = {
  args: sharedArgs,
  argTypes: sharedArgTypes,
  render: renderTimePicker,
};

export const WithLayer = {
  args: sharedArgs,
  argTypes: sharedArgTypes,
  decorators: [withLayers],
  parameters: {
    layout: 'fullscreen',
  },
  render: ({
    disabled,
    hideLabel,
    invalid,
    invalidText,
    labelText,
    maxLength,
    onChange,
    placeholder,
    readOnly,
    size,
    type,
    value,
    warning,
    warningText,
  }: TimePickerStoryArgs) => html`
    <cds-time-picker
      id="time-picker"
      ?hide-label="${hideLabel}"
      ?invalid="${invalid}"
      invalid-text="${ifDefined(invalidText)}"
      label-text="${ifDefined(labelText)}"
      max-length="${ifDefined(maxLength)}"
      placeholder="${ifDefined(placeholder)}"
      ?readonly="${readOnly}"
      ?disabled="${disabled}"
      size="${ifDefined(size)}"
      type="${ifDefined(type)}"
      .value="${value}"
      ?warning="${warning}"
      warning-text="${ifDefined(warningText)}"
      @change="${onChange}">
      <cds-time-picker-select
        default-value="AM"
        id="time-picker-select-1"
        ?disabled="${disabled}"
        aria-label="Select AM or PM">
        <cds-select-item value="AM" selected="true">AM</cds-select-item>
        <cds-select-item value="PM">PM</cds-select-item>
      </cds-time-picker-select>
      <cds-time-picker-select
        default-value="America/New_York"
        id="time-picker-select-2"
        ?disabled="${disabled}"
        aria-label="Select time zone">
        <cds-select-item value="America/New_York" selected
          >Eastern time</cds-select-item
        >
        <cds-select-item value="America/Chicago">Central time</cds-select-item>
      </cds-time-picker-select>
    </cds-time-picker>
  `,
};

export default {
  title: 'Components/Time Picker',
};
