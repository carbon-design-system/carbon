/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../toggle-tip/toggletip';
import '../select/select-item';
import './fluid-time-picker';
import './fluid-time-picker-select';
import './fluid-time-picker-skeleton';

const args = {
  defaultWidth: 350,
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

const argTypes = {
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
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

const toggletipLabel = html`
  <cds-toggletip slot="label-text" alignment="top-left" autoalign="true">
    Clock
    <p slot="body-text">Additional field information here.</p>
  </cds-toggletip>
`;

export const Default = {
  args,
  argTypes,
  render: ({
    defaultWidth,
    disabled,
    hideLabel,
    invalid,
    invalidText,
    labelText,
    placeholder,
    maxLength,
    name,
    onInput,
    pattern,
    readOnly,
    required,
    size,
    value,
    warning,
    warningText,
  }) => html`
    <div style="width:${defaultWidth}px;">
      <cds-fluid-time-picker
        id="time-picker-1"
        ?disabled="${disabled}"
        ?hide-label="${hideLabel}"
        ?invalid="${invalid}"
        invalid-text="${ifDefined(invalidText)}"
        label-text="${ifDefined(labelText)}"
        placeholder="${ifDefined(placeholder)}"
        max-length="${ifDefined(maxLength)}"
        name="${ifDefined(name)}"
        pattern="${ifDefined(pattern)}"
        ?readonly="${readOnly}"
        ?required="${required}"
        size="${ifDefined(size)}"
        value="${ifDefined(value)}"
        ?warning="${warning}"
        warning-text="${ifDefined(warningText)}"
        @input="${onInput}">
        <cds-fluid-time-picker-select id="select-1" default-value="am">
          ${toggletipLabel}
          <cds-select-item value="am" selected="true">AM</cds-select-item>
          <cds-select-item value="pm">PM</cds-select-item>
        </cds-fluid-time-picker-select>
        <cds-fluid-time-picker-select
          id="select-2"
          label-text="Timezone"
          default-value="et">
          <cds-select-item value="et" selected="true"
            >Eastern Time (ET)</cds-select-item
          >
          <cds-select-item value="ct">Central Time (CT)</cds-select-item>
          <cds-select-item value="mt">Mountain Time (MT)</cds-select-item>
          <cds-select-item value="pt">Pacific Time (PT)</cds-select-item>
        </cds-fluid-time-picker-select>
      </cds-fluid-time-picker>
      <br />
      <br />
      <cds-fluid-time-picker
        id="time-picker-2"
        label-text="${ifDefined(labelText)}"
        placeholder="${ifDefined(placeholder)}"
        max-length="${ifDefined(maxLength)}"
        name="${ifDefined(name)}"
        pattern="${ifDefined(pattern)}"
        ?disabled="${disabled}"
        ?hide-label="${hideLabel}"
        ?invalid="${invalid}"
        invalid-text="${ifDefined(invalidText)}"
        ?readonly="${readOnly}"
        ?required="${required}"
        size="${ifDefined(size)}"
        value="${ifDefined(value)}"
        ?warning="${warning}"
        warning-text="${ifDefined(warningText)}"
        @input="${onInput}">
        <cds-fluid-time-picker-select id="select-3" default-value="am">
          ${toggletipLabel}
          <cds-select-item value="am" selected="true">AM</cds-select-item>
          <cds-select-item value="pm">PM</cds-select-item>
        </cds-fluid-time-picker-select>
      </cds-fluid-time-picker>
    </div>
  `,
};

export const Skeleton = {
  args: { defaultWidth: 300 },
  argTypes: { defaultWidth: argTypes.defaultWidth },
  render: ({ defaultWidth }) => html`
    <div style="width:${defaultWidth}px;">
      <cds-fluid-time-picker-skeleton> </cds-fluid-time-picker-skeleton>
      <br />
      <br />
      <cds-fluid-time-picker-skeleton is-only-two>
      </cds-fluid-time-picker-skeleton>
    </div>
  `,
};

export default {
  title: 'Components/Fluid Components/FluidTimePicker',
};
