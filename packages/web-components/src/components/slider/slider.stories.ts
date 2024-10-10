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
import './index';
import '../form/form-item';
import '../layer';
import { prefix } from '../../globals/settings';
import '../../../.storybook/templates/with-layer';

const args = {
  ariaLabelInput: 'Lower bound',
  disabled: false,
  hideTextInput: false,
  labelText: 'Slider (must be an increment of 5)',
  invalid: false,
  invalidText: 'Invalid message goes here',
  max: 100,
  min: 0,
  readOnly: false,
  required: false,
  step: 5,
  stepMultiplier: 5,
  warn: false,
  warnText: 'Warning message goes here',
  value: 50,
};

const argTypes = {
  ariaLabelInput: {
    control: 'text',
    description:
      'The <code>ariaLabel</code> for the <code>&lt;input&gt;</code>.',
  },
  disabled: {
    control: 'boolean',
    description: '<code>true</code> to disable this slider.',
  },
  hideTextInput: {
    control: 'boolean',
    description: '<code>true</code> to hide the number input box.',
  },
  labelText: {
    control: 'text',
    description: 'Provide the text for the slider label.',
  },
  inputType: {
    control: 'text',
    description: 'The type attribute of the <code>&lt;input&gt;</code>.',
  },
  invalid: {
    control: 'boolean',
    description: 'Specify whether the Slider is currently invalid.',
  },
  invalidText: {
    control: 'text',
    description:
      'Provide the text that is displayed when the Slider is in an invalid state.',
  },
  name: {
    control: 'text',
    description: 'The name attribute of the <code>&lt;input&gt;</code>.',
  },
  max: {
    control: 'number',
    description: 'The maximum value.',
  },
  min: {
    control: 'number',
    description: 'The minimum value.',
  },
  maxLabel: {
    control: 'text',
    description: 'The label associated with the maximum value.',
  },
  minLabel: {
    control: 'text',
    description: 'The label associated with the minimum value.',
  },
  readOnly: {
    control: 'boolean',
    description: 'Whether the slider should be read-only.',
  },
  required: {
    control: 'boolean',
    description: '<code>true</code> to specify if the control is required.',
  },
  step: {
    control: 'number',
    description:
      'A value determining how much the value should increase/decrease by moving the thumb by mouse. If a value other than 1 is provided and the input is <em>not</em> hidden, the new step requirement should be added to a visible label. Values outside the <code>step</code> increment will be considered invalid.',
  },
  stepMultiplier: {
    control: 'number',
    description:
      'A value determining how much the value should increase/decrease by Shift+arrow keys, which will be <code>(max - min) / stepMultiplier</code>.',
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
  value: {
    control: 'number',
    description:
      'The value of the slider. When there are two handles, value is the lower bound.',
  },
  onAfterChange: {
    action: `${prefix}-slider-changed`,
    table: {
      disable: true,
    },
  },
};

export const Default = {
  render: () => {
    return html`
      <cds-form-item>
        <cds-slider
          label-text="Slider Label"
          max="100"
          min="0"
          step="1"
          value="50">
          <cds-slider-input
            aria-label="Slider value"
            type="number"></cds-slider-input>
        </cds-slider>
      </cds-form-item>
    `;
  },
};

export const ControlledSlider = {
  render: () => {
    let value = 87;
    function onClick() {
      value = Math.round(Math.random() * 100);
      const sliders = document.getElementsByTagName('cds-slider');
      for (const slider of sliders) {
        slider.setAttribute('value', `${value}`);
      }

      const headers = document.getElementsByClassName('slider-headers');
      for (const header of headers) {
        header.innerHTML = `${value}`;
      }
    }
    return html`
      <button type="button" @click="${onClick}">randomize value</button>
      <cds-form-item>
        <cds-slider max="100" min="0" step="1" value="${ifDefined(value)}">
          <cds-slider-input
            aria-label="Slider value"
            type="number"></cds-slider-input>
        </cds-slider>
      </cds-form-item>
      <h1 class="slider-headers">${value}</h1>
    `;
  },
};

export const ControlledSliderWithLayer = {
  render: () => {
    let value = 87;
    function onClick() {
      value = Math.round(Math.random() * 100);
      const sliders = document.getElementsByTagName('cds-slider');
      for (const slider of sliders) {
        slider.setAttribute('value', `${value}`);
      }

      const headers = document.getElementsByClassName('slider-headers');
      for (const header of headers) {
        header.innerHTML = `${value}`;
      }
    }

    return html`
      <sb-template-layers>
        <div>
          <button type="button" @click="${onClick}">randomize value</button>
          <cds-form-item>
            <cds-slider max="100" min="0" step="1" value="${ifDefined(value)}">
              <cds-slider-input
                aria-label="Slider value"
                type="number"></cds-slider-input>
            </cds-slider>
          </cds-form-item>
          <h1 class="slider-headers">${value}</h1>
        </div>
      </sb-template-layers>
    `;
  },
};

export const WithLayer = {
  render: () => {
    return html`
      <sb-template-layers>
        <cds-form-item>
          <cds-slider
            label-text="Slider label"
            max="100"
            min="0"
            step="1"
            value="50">
            <cds-slider-input
              aria-label="Slider value"
              type="number"></cds-slider-input>
          </cds-slider>
        </cds-form-item>
      </sb-template-layers>
    `;
  },
};

export const Skeleton = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () =>
    html`
      <cds-form-item><cds-slider-skeleton></cds-slider-skeleton></cds-form-item>
    `,
};

export const Playground = {
  args,
  argTypes,
  render: (args) => {
    const {
      ariaLabelInput,
      disabled,
      hideTextInput,
      invalid,
      invalidText,
      inputType,
      labelText,
      max,
      min,
      maxLabel,
      minLabel,
      name,
      readOnly,
      required,
      step,
      stepMultiplier,
      warn,
      warnText,
      value,
      onChange,
    } = args || {};
    return html`
      <cds-form-item>
        <cds-slider
          ?disabled="${disabled}"
          ?hide-text-input="${hideTextInput}"
          ?invalid="${invalid}"
          invalid-text="${ifDefined(invalidText)}"
          label-text="${labelText}"
          max="${ifDefined(max)}"
          min="${ifDefined(min)}"
          max-label="${ifDefined(maxLabel)}"
          min-label="${ifDefined(minLabel)}"
          ?readonly="${ifDefined(readOnly)}"
          step="${ifDefined(step)}"
          step-multiplier="${ifDefined(stepMultiplier)}"
          ?warn="${warn}"
          warn-text="${warnText}"
          value="${ifDefined(value)}"
          @cds-slider-changed="${onChange}">
          ${!hideTextInput
            ? html`<cds-slider-input
                aria-label="${ifDefined(ariaLabelInput)}"
                type="${ifDefined(inputType)}"
                ?required="${ifDefined(required)}"
                ?name="${ifDefined(name)}"></cds-slider-input>`
            : null}
        </cds-slider>
      </cds-form-item>
    `;
  },
};

export default {
  title: 'Components/Slider',
};
