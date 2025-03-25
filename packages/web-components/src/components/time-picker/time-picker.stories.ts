/**
 * @license
 *
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

const args = {
  disabled: false,
  hideLabel: false,
  invalid: false,
  invalidText: 'Invalid time format',
  labelText: 'Select a time',
  placeholder: 'hh:mm',
  readOnly: false,
  size: 'md',
  value: '',
  warning: false,
  warningText: 'This is a warning message.',
  maxLength: 5,
  type: 'text',
};

const argTypes = {
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

export const Default = {
  args,
  argTypes,
  render: ({
    disabled,
    hideLabel,
    invalid,
    invalidText,
    labelText,
    placeholder,
    readOnly,
    size,
    value,
    warning,
    warningText,
    maxLength,
    type,
  }) => html`
    <cds-time-picker
      id="time-picker"
      ?hide-label="${hideLabel}"
      ?invalid="${invalid}"
      invalid-text="${ifDefined(invalidText)}"
      label-text="${ifDefined(labelText)}"
      placeholder="${ifDefined(placeholder)}"
      ?readonly="${readOnly}"
      ?disabled="${disabled}"
      size="${ifDefined(size)}"
      value="${ifDefined(value)}"
      ?warning="${warning}"
      max-length="${ifDefined(maxLength)}"
      type="${ifDefined(type)}"
      warning-text="${ifDefined(warningText)}">
      <cds-time-picker-select
        default-value="AM"
        id="time-picker-select-1"
        ?disabled="${disabled}"
        aria-label="Select AM/PM">
        <cds-select-item value="AM" selected="true">AM</cds-select-item>
        <cds-select-item value="PM">PM</cds-select-item>
      </cds-time-picker-select>
      <cds-time-picker-select
        default-value="Time zone 1"
        id="time-picker-select-2"
        ?disabled="${disabled}"
        aria-label="Select timezone">
        <cds-select-item value="Time zone 1" text="Time zone 1"
          >Time zone 1</cds-select-item
        >
        <cds-select-item value="Time zone 2" text="Time zone 2" selected
          >Time zone 2</cds-select-item
        >
      </cds-time-picker-select>
    </cds-time-picker>
  `,
};

export const WithLayer = {
  render: () => html`
    <sb-template-layers>
      <cds-time-picker
        id="time-picker"
        labelText="Select a time"
        placeholder="hh:mm">
        <cds-time-picker-select
          id="time-picker-select-1"
          default-value="AM"
          aria-label="Select AM/PM">
          <cds-select-item value="AM">AM</cds-select-item>
          <cds-select-item value="PM" selected>PM</cds-select-item>
        </cds-time-picker-select>
        <cds-time-picker-select
          id="time-picker-select-2"
          aria-label="Select timezone"
          default-value="Time zone 1">
          <cds-select-item value="Time zone 1" text="Time zone 1"
            >Time zone 1</cds-select-item
          >
          <cds-select-item value="Time zone 2" text="Time zone 2" selected
            >Time zone 2</cds-select-item
          >
        </cds-time-picker-select>
      </cds-time-picker>
    </sb-template-layers>
  `,
};

export default {
  title: 'Components/Time Picker',
};
