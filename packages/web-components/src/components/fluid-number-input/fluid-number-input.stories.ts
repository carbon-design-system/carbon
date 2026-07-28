/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../toggle-tip/toggletip';
import './fluid-number-input';
import './fluid-number-input-skeleton';

const args = {
  defaultWidth: 400,
  allowEmpty: false,
  disableWheel: false,
  disabled: false,
  hideSteppers: false,
  iconDescription: 'Adjust number',
  inputMode: 'decimal',
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  label: 'Label',
  locale: 'en-US',
  readOnly: false,
  value: 50,
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
  min: 0,
  max: 100,
  step: 1,
  type: 'number',
};

const argTypes = {
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  allowEmpty: {
    control: 'boolean',
  },
  disableWheel: {
    control: 'boolean',
  },
  invalid: {
    control: {
      type: 'boolean',
    },
  },
  invalidText: {
    control: {
      type: 'text',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  hideSteppers: {
    control: 'boolean',
  },
  iconDescription: {
    control: 'text',
  },
  inputMode: {
    control: 'select',
    options: [
      'none',
      'text',
      'tel',
      'url',
      'email',
      'numeric',
      'decimal',
      'search',
    ],
  },
  label: {
    control: {
      type: 'text',
    },
  },
  locale: {
    control: 'text',
  },
  max: {
    control: 'number',
  },
  min: {
    control: 'number',
  },
  onInput: {
    action: 'input',
  },
  readOnly: {
    control: 'boolean',
  },
  step: {
    control: 'number',
  },
  type: {
    control: 'select',
    options: ['number', 'text'],
  },
  value: {
    control: 'number',
  },
  warn: {
    control: {
      type: 'boolean',
    },
  },
  warnText: {
    control: {
      type: 'text',
    },
  },
};

export const Default = {
  args,
  argTypes,
  render: (args) => {
    const {
      allowEmpty,
      disableWheel,
      disabled,
      hideSteppers,
      iconDescription,
      inputMode,
      invalid,
      defaultWidth,
      invalidText,
      label,
      locale,
      readOnly,
      warn,
      warnText,
      value,
      min,
      max,
      step,
      type,
      onInput,
    } = args ?? {};
    return html`
      <div style="width: ${defaultWidth}px;">
        <cds-fluid-number-input
          ?allow-empty="${allowEmpty}"
          ?disable-wheel="${disableWheel}"
          ?invalid="${invalid}"
          invalid-text="${ifDefined(invalidText)}"
          label="${ifDefined(label)}"
          ?hide-steppers="${hideSteppers}"
          icon-description="${ifDefined(iconDescription)}"
          input-mode="${ifDefined(inputMode)}"
          locale="${ifDefined(locale)}"
          ?readonly="${readOnly}"
          value="${ifDefined(value)}"
          ?warn="${warn}"
          warn-text="${ifDefined(warnText)}"
          ?disabled="${disabled}"
          min="${ifDefined(min)}"
          max="${ifDefined(max)}"
          step="${ifDefined(step)}"
          type="${ifDefined(type)}"
          @input="${onInput}">
        </cds-fluid-number-input>
      </div>
    `;
  },
};

export const DefaultWithToggletip = {
  args,
  argTypes,
  render: (args) => {
    const {
      allowEmpty,
      disableWheel,
      disabled,
      hideSteppers,
      iconDescription,
      inputMode,
      defaultWidth,
      invalid,
      invalidText,
      label,
      locale,
      readOnly,
      warn,
      warnText,
      value,
      min,
      max,
      step,
      type,
      onInput,
    } = args ?? {};
    return html`
      <div style="width: ${defaultWidth}px;">
        <cds-fluid-number-input
          ?allow-empty="${allowEmpty}"
          ?disable-wheel="${disableWheel}"
          ?invalid="${invalid}"
          invalid-text="${ifDefined(invalidText)}"
          label="${ifDefined(label)}"
          ?hide-steppers="${hideSteppers}"
          icon-description="${ifDefined(iconDescription)}"
          input-mode="${ifDefined(inputMode)}"
          locale="${ifDefined(locale)}"
          ?readonly="${readOnly}"
          value="${ifDefined(value)}"
          ?warn="${warn}"
          warn-text="${ifDefined(warnText)}"
          ?disabled="${disabled}"
          min="${ifDefined(min)}"
          max="${ifDefined(max)}"
          step="${ifDefined(step)}"
          type="${ifDefined(type)}"
          @input="${onInput}">
          <cds-toggletip autoalign slot="label-text">
            ${label}
            <p slot="body-text">Additional field information here.</p>
          </cds-toggletip>
        </cds-fluid-number-input>
      </div>
    `;
  },
};

export const Skeleton = {
  args: {
    defaultWidth: 300,
  },
  argTypes: {
    defaultWidth: {
      control: { type: 'range', min: 300, max: 800, step: 50 },
    },
  },
  render: ({ defaultWidth }) => html`
    <div style="width: ${defaultWidth}px;">
      <cds-fluid-number-input-skeleton></cds-fluid-number-input-skeleton>
    </div>
  `,
};

export default {
  title: 'Components/Fluid Components/FluidNumberInput',
};
