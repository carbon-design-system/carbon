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
  placeholder: 'Placeholder text',
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  disabled: false,
  labelText: 'Label',
  enableCounter: false,
  maxCount: 500,
  readonly: false,
  value: '',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

const argTypes = {
  placeholder: {
    control: { type: 'text' },
    description: 'Specify the placeholder attribute for the `<input>`.',
    table: { defaultValue: { summary: 'undefined' } },
  },
  invalid: {
    control: { type: 'boolean' },
    description: 'Specify whether the control is currently invalid.',
    table: { defaultValue: { summary: false } },
  },
  invalidText: {
    control: { type: 'text' },
    description:
      'Provide the text that is displayed when the control is in an invalid state.',
    table: { defaultValue: { summary: 'undefined' } },
  },
  disabled: {
    control: { type: 'boolean' },
    description: 'Specify whether the `<input>` should be disabled.',
    table: { defaultValue: { summary: false } },
  },
  labelText: {
    control: { type: 'text' },
    description:
      'Provide the text that will be read by a screen reader when visiting this control.',
    table: { defaultValue: { summary: 'required' } },
  },
  warn: {
    control: { type: 'boolean' },
    description: 'Specify whether the control is currently in warning state.',
    table: { defaultValue: { summary: false } },
  },
  warnText: {
    control: { type: 'text' },
    description:
      'Provide the text that is displayed when the control is in warning state.',
    table: { defaultValue: { summary: 'undefined' } },
  },
  value: {
    control: { type: 'text' },
    description: 'The value of the input.',
    table: { defaultValue: { summary: '""' } },
  },
  onInput: {
    action: `input`,
  },
  onClick: {
    action: `click`,
  },
  maxCount: {
    control: 'number',
    description:
      'Max character count allowed for the textInput. This is needed in order for enableCounter to display.',
    table: { defaultValue: { summary: 'undefined' } },
  },
  enableCounter: {
    control: 'boolean',
    description: 'Specify whether to display the character counter.',
    table: { defaultValue: { summary: false } },
  },
  readonly: {
    control: 'boolean',
    description: 'Whether or not the component is readonly.',
    table: { defaultValue: { summary: false } },
  },
};

const renderTextInput = (
  {
    disabled,
    enableCounter,
    invalid,
    invalidText,
    labelText,
    maxCount,
    onClick,
    onInput,
    placeholder,
    readonly,
    value,
    warn,
    warnText,
  },
  labelSlot
) => html`
  <cds-fluid-text-input
    ?disabled="${disabled}"
    ?enable-counter="${enableCounter}"
    id="input-1"
    ?invalid="${invalid}"
    invalid-text="${ifDefined(invalidText)}"
    label="${ifDefined(labelText)}"
    max-count="${ifDefined(maxCount)}"
    placeholder="${ifDefined(placeholder)}"
    ?readonly="${readonly}"
    value="${ifDefined(value)}"
    ?warn="${warn}"
    warn-text="${ifDefined(warnText)}"
    @click="${onClick}"
    @input="${onInput}">
    ${labelSlot}
  </cds-fluid-text-input>
`;

export const Default = {
  args,
  argTypes,
  parameters: {
    controls: {
      exclude: ['onClick', 'onInput'],
    },
  },
  render: (textInputArgs) => html`${renderTextInput(textInputArgs)}`,
};

export const DefaultWithToggletip = {
  args,
  argTypes,
  parameters: { controls: { exclude: ['labelText', 'onClick', 'onInput'] } },
  render: (textInputArgs) => html`
    ${renderTextInput(
      textInputArgs,
      html`<cds-toggletip autoalign="true" slot="label-text">
        Label
        <p slot="body-text">Additional field information here.</p>
      </cds-toggletip>`
    )}
  `,
};

export const Skeleton = {
  render: () =>
    html`<cds-fluid-text-input-skeleton></cds-fluid-text-input-skeleton>`,
};

export default {
  title: 'Components/Fluid Components/FluidTextInput',
};
