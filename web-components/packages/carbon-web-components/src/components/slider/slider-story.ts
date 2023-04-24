/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { boolean, number, text } from '@storybook/addon-knobs';
import { ifDefined } from 'lit/directives/if-defined.js';
import './slider';
import './slider-input';
import './slider-skeleton';
import '../form/form-item';
import '../layer';
import storyDocs from './slider-story.mdx';
import { prefix } from '../../globals/settings';
import '../../../.storybook/templates/with-layer';

export const Default = () => {
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
};

export const ControlledSlider = () => {
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
};

export const ControlledSliderWithLayer = () => {
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
};

export const WithLayer = () => {
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
};

export const skeleton = () =>
  html`
    <cds-form-item><cds-slider-skeleton></cds-slider-skeleton></cds-form-item>
  `;

skeleton.parameters = {
  percy: {
    skip: true,
  },
};

export const Playground = (args) => {
  const {
    ariaLabelInput,
    disabled,
    hideTextInput,
    invalid,
    inputType,
    labelText,
    max,
    min,
    maxLabel,
    minLabel,
    name,
    readonly,
    required,
    step,
    stepMultiplier,
    value,
    onChange,
  } = args?.[`${prefix}-slider`] || {};
  return html`
    <cds-form-item>
      <cds-slider
        ?disabled="${disabled}"
        ?hide-text-input="${hideTextInput}"
        ?invalid="${invalid}"
        label-text="${labelText}"
        max="${ifDefined(max)}"
        min="${ifDefined(min)}"
        max-label="${ifDefined(maxLabel)}"
        min-label="${ifDefined(minLabel)}"
        ?readonly="${ifDefined(readonly)}"
        step="${ifDefined(step)}"
        step-multiplier="${ifDefined(stepMultiplier)}"
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
};

Playground.storyName = 'Playground';

Playground.parameters = {
  knobs: {
    [`${prefix}-slider`]: () => ({
      ariaLabelInput: text('Aria label for input (aria-label-input)', ''),
      disabled: boolean('Disabled (disabled)', false),
      hideTextInput: boolean('Hide text input (hide-text-input)', false),
      labelText: text(
        'Label text (label-text)',
        'Slider (must be an increment of 5)'
      ),
      inputType: text('Input type (type)', 'number'),
      invalid: boolean('Invalid (invalid)', false),
      name: text('Name (name)', ''),
      max: number('Maximum value (max)', 100),
      min: number('Minimum value (min)', 0),
      maxLabel: text('Maximum value label (max-label)', ''),
      minLabel: text('Minimum value label (min-label)', ''),
      readonly: boolean('Readonly (readonly)', false),
      required: boolean('Required (required)', false),
      step: number('Step (step)', 5),
      stepMultiplier: number('Step multiplier (step-multiplier)', 5),
      value: number('Value (value)', 50),
      onAfterChange: action(`${prefix}-slider-changed`),
    }),
  },
};

export default {
  title: 'Components/Slider',
  parameters: {
    ...storyDocs.parameters,
  },
};
