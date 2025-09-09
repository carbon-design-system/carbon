/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../toggle-tip/toggletip';
import './fluid-text-input';
import './fluid-text-input-skeleton';

const args = {
  defaultWidth: 300,
  placeholder: 'Placeholder text',
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  disabled: false,
  labelText: 'Label',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

const argTypes = {
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  placeholder: {
    control: { type: 'text' },
  },
  invalid: {
    control: { type: 'boolean' },
  },
  invalidText: {
    control: { type: 'text' },
  },
  disabled: {
    control: { type: 'boolean' },
  },
  labelText: {
    control: { type: 'text' },
  },
  warn: {
    control: { type: 'boolean' },
  },
  warnText: {
    control: { type: 'text' },
  },
  value: {
    control: { type: 'text' },
  },
  onInput: {
    action: `input`,
    table: { disable: true },
  },
  onClick: {
    action: `click`,
    table: { disable: true },
  },
  maxCount: {
    control: 'text',
    description: 'Max count (max-count)',
  },
  enableCounter: {
    control: 'boolean',
    description: 'Enable counter (enable-counter)',
  },
  readonly: {
    control: 'boolean',
    description: 'Read only (readonly)',
  },
};

export const Default = {
  args,
  argTypes,
  render: ({
    defaultWidth,
    placeholder,
    invalid,
    invalidText,
    disabled,
    labelText,
    warn,
    warnText,
    enableCounter,
    maxCount,
    value,
    readonly,
  }) => html`
    <div style="width:${defaultWidth}px;">
      <cds-fluid-text-input
        placeholder="${ifDefined(placeholder)}"
        ?invalid="${invalid}"
        invalid-text="${ifDefined(invalidText)}"
        ?disabled="${disabled}"
        label="${ifDefined(labelText)}"
        ?warn="${warn}"
        warn-text="${ifDefined(warnText)}"
        value="${ifDefined(value)}"
        ?enable-counter="${ifDefined(enableCounter)}"
        max-count="${ifDefined(maxCount)}"
        ?readonly="${ifDefined(readonly)}">
      </cds-fluid-text-input>
    </div>
  `,
};

export const DefaultWithToggletip = {
  render: () => html`
    <cds-fluid-text-input placeholder="Placeholder text">
      <cds-toggletip autoAlign="true" slot="label-text">
        Label
        <p slot="body-text">Additional field information here.</p>
      </cds-toggletip>
    </cds-fluid-text-input>
  `,
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
      <cds-fluid-text-input-skeleton></cds-fluid-text-input-skeleton>
    </div>
  `,
};

export default {
  title: 'Components/Fluid Components/FluidTextInput',
};
