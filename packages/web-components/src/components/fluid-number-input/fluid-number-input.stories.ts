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
  disabled: false,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  label: 'Label',
  readOnly: false,
  value: 50,
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
  min: 0,
  max: 100,
  step: 1,
};

const argTypes = {
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  defaultValue: {
    control: {
      type: 'number',
    },
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
  label: {
    control: {
      type: 'text',
    },
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
      disabled,
      invalid,
      defaultWidth,
      invalidText,
      label,
      readOnly,
      warn,
      warnText,
      value,
      min,
      max,
      step,
      onInput,
    } = args ?? {};
    return html`
      <div style="width: ${defaultWidth}px;">
        <cds-fluid-number-input
          ?allow-empty="${allowEmpty}"
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
          step="${ifDefined(step)}"
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
      disabled,
      defaultWidth,
      invalid,
      invalidText,
      label,
      readOnly,
      warn,
      warnText,
      value,
      min,
      max,
      step,
      onInput,
    } = args ?? {};
    return html`
      <div style="width: ${defaultWidth}px;">
        <cds-fluid-number-input
          ?allow-empty="${allowEmpty}"
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
          step="${ifDefined(step)}"
          @input="${onInput}">
          <cds-toggletip autoAlign="true" slot="label-text">
            Label
            <p slot="body-text">Additional field information here.</p>
          </cds-toggletip>
        </cds-fluid-number-input>
      </div>
    `;
  },
};

export const Skeleton = {
  parameters: {
    percy: {
      skip: true,
    },
  },
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
