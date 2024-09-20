/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { INPUT_SIZE } from '../text-input/text-input';
import './number-input';
import './number-input-skeleton';
import '../form/form-item';

const sizes = {
  [`Small size (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  [`Medium size (${INPUT_SIZE.MEDIUM})`]: INPUT_SIZE.MEDIUM,
  [`Large size (${INPUT_SIZE.LARGE})`]: INPUT_SIZE.LARGE,
};

const args = {
  allowEmpty: false,
  decrementButtonDescription: 'decrease number input',
  incrementButtonDescription: 'increase number input',
  disabled: false,
  helperText: 'Optional helper text',
  hideLabel: false,
  hideSteppers: false,
  invalid: false,
  invalidText: 'Number is not valid',
  label: 'number-input label',
  readOnly: false,
  value: 50,
  warn: false,
  warnText: 'Warning text',
  min: 0,
  max: 100,
  step: 1,
  size: INPUT_SIZE.MEDIUM,
};

const argTypes = {
  allowEmpty: {
    control: 'boolean',
    description: '<code>true</code> to allow empty string.',
  },
  decrementButtonDescription: {
    control: 'text',
    description:
      'Decrement button assistive description (decrement-button-assistive-text)',
  },
  incrementButtonDescription: {
    control: 'text',
    description:
      'Increment button assistive description (increment-button-assistive-text)',
  },
  disabled: {
    control: 'boolean',
    description: 'Specify if the control should be disabled, or not.',
  },
  helperText: {
    control: 'text',
    description:
      'Provide text that is used alongside the control label for additional help.',
  },
  hideLabel: {
    control: 'boolean',
    description:
      'Specify whether you want the underlying label to be visually hidden.',
  },
  hideSteppers: {
    control: 'boolean',
    description: 'Specify whether you want the steppers to be hidden.',
  },
  invalid: {
    control: 'boolean',
    description: 'Specify if the currently value is invalid.',
  },
  invalidText: {
    control: 'text',
    description: 'Message which is displayed if the value is invalid.',
  },
  label: {
    control: 'text',
    description:
      'Generic <code>label</code> that will be used as the textual representation of what this field is for.',
  },
  readOnly: {
    control: 'boolean',
    description: 'Specify if the component should be read-only.',
  },
  value: {
    control: 'number',
    description: 'Specify the value of the input.',
  },
  warn: {
    control: 'boolean',
    description: 'Specify whether the control is currently in warning state.',
  },
  warnText: {
    control: 'text',
    description:
      'Provide the text that is displayed when the control is in warning state.',
  },
  min: {
    control: 'number',
    description: 'The minimum value.',
  },
  max: {
    control: 'number',
    description: 'The maximum value.',
  },
  step: {
    control: 'number',
    description:
      'Specify how much the values should increase/decrease upon clicking on up/down button.',
  },
  size: {
    control: 'select',
    description: 'Specify the size of the Number Input.',
    options: sizes,
  },
  onInput: {
    action: 'input',
  },
};

export const Default = {
  render: () => {
    return html`
      <cds-form-item>
        <cds-number-input
          value="50"
          min="0"
          max="100"
          size="${ifDefined(INPUT_SIZE.MEDIUM)}"
          step="1"
          label="number-input label"
          helper-text="Optional helper text">
        </cds-number-input>
      </cds-form-item>
    `;
  },
};

export const Skeleton = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () => html` <cds-number-input-skeleton></cds-number-input-skeleton> `,
};

export const Playground = {
  args,
  argTypes,
  render: (args) => {
    const {
      allowEmpty,
      decrementButtonDescription,
      incrementButtonDescription,
      disabled,
      helperText,
      hideLabel,
      hideSteppers,
      invalid,
      invalidText,
      label,
      readOnly,
      warn,
      warnText,
      value,
      min,
      max,
      size,
      step,
      onInput,
    } = args ?? {};
    return html`
      <cds-form-item>
        <cds-number-input
          ?allow-empty="${allowEmpty}"
          decrement-button-assistive-text="${ifDefined(
            decrementButtonDescription
          )}"
          increment-button-assistive-text="${ifDefined(
            incrementButtonDescription
          )}"
          helper-text="${ifDefined(helperText)}"
          ?hide-steppers="${hideSteppers}"
          ?hide-label="${hideLabel}"
          ?invalid="${invalid}"
          invalid-text="${ifDefined(invalidText)}"
          label="${ifDefined(label)}"
          ?readonly="${readOnly}"
          value="${ifDefined(value)}"
          ?warn="${warn}"
          warn-text="${ifDefined(warnText)}"
          ?disabled="${disabled}"
          min="${ifDefined(min)}"
          max="${ifDefined(max)}"
          size="${ifDefined(size)}"
          step="${ifDefined(step)}"
          @input="${onInput}">
        </cds-number-input>
      </cds-form-item>
    `;
  },
};

export default {
  title: 'Components/Number Input',
};
