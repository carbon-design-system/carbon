/**
 * Copyright IBM Corp. 2019, 2026
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
import { withLayers } from '../../../.storybook/decorators/with-layers';

const sharedArgs = {
  ariaLabelInput: 'Slider value',
  disabled: false,
  hideLabel: false,
  hideTextInput: false,
  inputType: 'number',
  invalid: false,
  invalidText: 'Enter a value within the allowed range',
  labelText: 'Storage allocation',
  max: 100,
  maxLabel: ' GB',
  min: 0,
  minLabel: ' GB',
  name: 'storage-allocation',
  readOnly: false,
  required: false,
  step: 1,
  stepMultiplier: 10,
  value: 50,
  warn: false,
  warnText: 'Storage allocation is approaching the recommended limit',
};

const twoHandleArgs = {
  ...sharedArgs,
  ariaLabelInput: 'Minimum storage allocation',
  labelText: 'Storage allocation range',
  name: 'minimum-storage-allocation',
  unstable_ariaLabelInputUpper: 'Maximum storage allocation',
  unstable_nameUpper: 'maximum-storage-allocation',
  unstable_valueUpper: 90,
  value: 10,
};

const sharedArgTypes = {
  ariaLabelInput: {
    control: 'text',
    description:
      'The <code>ariaLabel</code> for the <code>&lt;input&gt;</code>.',
  },
  disabled: {
    control: 'boolean',
    description: '<code>true</code> to disable this slider.',
  },
  formatLabel: {
    control: false,
    description:
      'The callback to format the label associated with the minimum/maximum value and the value tooltip when hideTextInput is true.',
  },
  hideLabel: {
    control: 'boolean',
    description: 'Hide the visible slider label.',
  },
  hideTextInput: {
    control: 'boolean',
    description: '<code>true</code> to hide the number input box.',
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
  labelText: {
    control: 'text',
    description: 'Provide the text for the slider label.',
  },
  max: {
    control: 'number',
    description: 'The maximum value.',
  },
  maxLabel: {
    control: 'text',
    description: 'The label associated with the maximum value.',
  },
  min: {
    control: 'number',
    description: 'The minimum value.',
  },
  minLabel: {
    control: 'text',
    description: 'The label associated with the minimum value.',
  },
  name: {
    control: 'text',
    description: 'The name attribute of the <code>&lt;input&gt;</code>.',
  },
  onChange: {
    action: `${prefix}-slider-changed`,
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
  unstable_ariaLabelInputUpper: {
    control: 'text',
    description:
      'The <code>ariaLabel</code> for the upper bound <code>&lt;input&gt;</code> and handle when there are two handles.',
  },
  unstable_nameUpper: {
    control: 'text',
    description:
      'The name attribute of the upper bound <code>&lt;input&gt;</code> when there are two handles.',
  },
  unstable_valueUpper: {
    control: 'number',
    description: 'The upper bound when there are two handles.',
  },
  value: {
    control: 'number',
    description:
      'The value of the slider. When there are two handles, value is the lower bound.',
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
};

const singleHandleParameters = {
  controls: {
    include: Object.keys(sharedArgs),
  },
};

const twoHandleParameters = {
  controls: {
    include: Object.keys(twoHandleArgs),
  },
};

const hiddenInputArgTypes = {
  ...sharedArgTypes,
  hideTextInput: {
    ...sharedArgTypes.hideTextInput,
    table: {
      readonly: true,
    },
  },
};

const defaultFormatLabel = (value, label) => `${value}${label ?? ''}`;

const renderSlider = (
  args,
  { controlled = false, formatLabel = defaultFormatLabel } = {}
) => {
  const {
    ariaLabelInput,
    disabled,
    hideLabel,
    hideTextInput,
    inputType,
    invalid,
    invalidText,
    labelText,
    max,
    maxLabel,
    min,
    minLabel,
    name,
    onChange,
    readOnly,
    required,
    step,
    stepMultiplier,
    unstable_ariaLabelInputUpper,
    unstable_nameUpper,
    unstable_valueUpper,
    value,
    warn,
    warnText,
  } = args;
  const hasTwoHandles = typeof unstable_valueUpper !== 'undefined';

  return html`
    <cds-form-item>
      <cds-slider
        ?controlled="${controlled}"
        ?disabled="${disabled}"
        ?hide-label="${hideLabel}"
        ?hide-text-input="${hideTextInput}"
        ?invalid="${invalid}"
        invalid-text="${ifDefined(invalidText)}"
        label-text="${ifDefined(labelText)}"
        max="${ifDefined(max)}"
        max-label="${ifDefined(maxLabel)}"
        min="${ifDefined(min)}"
        min-label="${ifDefined(minLabel)}"
        ?readonly="${readOnly}"
        step="${ifDefined(step)}"
        step-multiplier="${ifDefined(stepMultiplier)}"
        value="${ifDefined(value)}"
        value-upper="${ifDefined(unstable_valueUpper)}"
        ?warn="${warn}"
        warn-text="${ifDefined(warnText)}"
        .formatLabel=${formatLabel}
        @cds-slider-changed=${onChange}>
        <cds-slider-input
          aria-label="${ifDefined(ariaLabelInput)}"
          name="${ifDefined(name)}"
          type="${ifDefined(inputType)}"
          ?required="${required}"
          slot="${ifDefined(hasTwoHandles ? 'lower-input' : undefined)}">
        </cds-slider-input>
        ${hasTwoHandles
          ? html`
              <cds-slider-input
                aria-label="${ifDefined(unstable_ariaLabelInputUpper)}"
                name="${ifDefined(unstable_nameUpper)}"
                type="${ifDefined(inputType)}"
                ?required="${required}">
              </cds-slider-input>
            `
          : undefined}
      </cds-slider>
    </cds-form-item>
  `;
};

const randomValue = ({ max, min, step }) => {
  const range = max - min;
  if (range <= 0 || step <= 0) {
    return min;
  }

  return Math.min(max, min + Math.round((Math.random() * range) / step) * step);
};

const renderControlledSlider = (args) => {
  let value = args.value;

  const updateValue = (container, nextValue) => {
    value = nextValue;
    const slider = container?.querySelector('cds-slider');
    slider?.setAttribute('value', `${value}`);
    const output = container?.querySelector('.slider-current-value');
    if (output) {
      output.textContent = `Current value: ${value}`;
    }
  };

  const handleClick = (event) => {
    updateValue(
      event.currentTarget.closest('.controlled-slider'),
      randomValue(args)
    );
  };

  const handleChange = (event) => {
    updateValue(
      event.currentTarget.closest('.controlled-slider'),
      event.detail.value
    );
    args.onChange?.(event);
  };

  return html`
    <div class="controlled-slider">
      <button type="button" @click=${handleClick}>Randomize value</button>
      ${renderSlider(
        {
          ...args,
          onChange: handleChange,
          value,
        },
        { controlled: true }
      )}
      <p class="slider-current-value">Current value: ${value}</p>
    </div>
  `;
};

export const Default = {
  args: { ...sharedArgs },
  argTypes: { ...sharedArgTypes },
  parameters: singleHandleParameters,
  render: (args) => renderSlider(args),
};

export const SliderWithHiddenInputs = {
  args: {
    ...sharedArgs,
    hideTextInput: true,
  },
  argTypes: hiddenInputArgTypes,
  parameters: singleHandleParameters,
  render: (args) => renderSlider(args),
};

export const SliderWithCustomValueLabel = {
  args: {
    ...sharedArgs,
    hideTextInput: true,
    labelText: 'Storage usage',
    stepMultiplier: 50,
  },
  argTypes: {
    ...hiddenInputArgTypes,
  },
  parameters: singleHandleParameters,
  render: (args) =>
    renderSlider(args, {
      formatLabel: (value) => {
        if (value < 25) {
          return 'Low';
        } else if (value > 75) {
          return 'High';
        }
        return 'Medium';
      },
    }),
};

export const ControlledSlider = {
  args: {
    ...sharedArgs,
    value: 87,
  },
  argTypes: { ...sharedArgTypes },
  parameters: singleHandleParameters,
  render: (args) => renderControlledSlider(args),
};

export const WithLayer = {
  decorators: [withLayers],
  parameters: {
    ...singleHandleParameters,
    layout: 'fullscreen',
  },
  args: { ...sharedArgs },
  argTypes: { ...sharedArgTypes },
  render: (args) => renderSlider(args),
};

export const ControlledSliderWithLayer = {
  decorators: [withLayers],
  parameters: {
    ...singleHandleParameters,
    layout: 'fullscreen',
  },
  args: {
    ...sharedArgs,
    value: 87,
  },
  argTypes: { ...sharedArgTypes },
  render: (args) => renderControlledSlider(args),
};

export const TwoHandleSlider = {
  args: { ...twoHandleArgs },
  argTypes: { ...sharedArgTypes },
  parameters: twoHandleParameters,
  render: (args) => renderSlider(args),
};

export const TwoHandleSliderWithHiddenInputs = {
  args: {
    ...twoHandleArgs,
    hideTextInput: true,
  },
  argTypes: {
    ...hiddenInputArgTypes,
  },
  parameters: twoHandleParameters,
  render: (args) => renderSlider(args),
};

const skeletonArgTypes = {
  twoHandles: {
    control: 'boolean',
    description: 'Turn the skeleton into a range slider.',
  },
};

const skeletonParameters = {
  controls: {
    include: ['twoHandles'],
  },
};

export const Skeleton = {
  args: {
    twoHandles: false,
  },
  argTypes: skeletonArgTypes,
  parameters: skeletonParameters,
  render: ({ twoHandles }) => html`
    <cds-form-item>
      <cds-slider-skeleton ?twoHandles="${twoHandles}"> </cds-slider-skeleton>
    </cds-form-item>
  `,
};

export const TwoHandleSkeleton = {
  args: {
    twoHandles: true,
  },
  argTypes: {
    twoHandles: {
      ...skeletonArgTypes.twoHandles,
      table: {
        readonly: true,
      },
    },
  },
  parameters: skeletonParameters,
  render: ({ twoHandles }) => html`
    <cds-form-item>
      <cds-slider-skeleton ?twoHandles="${twoHandles}"> </cds-slider-skeleton>
    </cds-form-item>
  `,
};

export default {
  title: 'Components/Slider',
};
