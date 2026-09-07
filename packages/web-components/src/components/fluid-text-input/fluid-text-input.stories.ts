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
  helperText: '',
  hideLabel: false,
  inline: false,
  placeholder: 'Placeholder text',
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  disabled: false,
  labelText: 'Label',
  enableCounter: false,
  maxCount: 500,
  readonly: false,
  size: 'md',
  value: '',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

const argTypes = {
  helperText: {
    control: 'text',
    description: 'The helper text.',
    table: { defaultValue: { summary: '""' } },
  },
  hideLabel: {
    control: 'boolean',
    description:
      'Specify whether you want the underlying label to be visually hidden.',
    table: { defaultValue: { summary: false } },
  },
  inline: {
    control: 'boolean',
    description: 'Specify whether to use the inline version.',
    table: { defaultValue: { summary: false } },
  },
  placeholder: {
    control: { type: 'text' },
    description: 'Specify the placeholder attribute for the `<input>`.',
    table: { defaultValue: { summary: '""' } },
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
    table: { defaultValue: { summary: '""' } },
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
    table: { defaultValue: { summary: '""' } },
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
    table: { defaultValue: { summary: '""' } },
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
      'Max character count allowed for input. This is needed in order for enableCounter to display.',
    table: { defaultValue: { summary: 'undefined' } },
  },
  enableCounter: {
    control: 'boolean',
    description: 'Specify whether to display the character counter.',
    table: { defaultValue: { summary: false } },
  },
  readonly: {
    control: 'boolean',
    description: 'Specify if the component should be read-only.',
    table: { defaultValue: { summary: false } },
  },
  size: {
    control: 'select',
    options: ['xs', 'sm', 'md', 'lg'],
    description: 'The input box size.',
    table: { defaultValue: { summary: 'undefined' } },
  },
};

const renderTextInput = (
  {
    disabled,
    enableCounter,
    helperText,
    hideLabel,
    inline,
    invalid,
    invalidText,
    labelText,
    maxCount,
    onClick,
    onInput,
    placeholder,
    readonly,
    size,
    value,
    warn,
    warnText,
  },
  labelSlot
) => html`
  <cds-fluid-text-input
    ?disabled="${disabled}"
    ?enable-counter="${enableCounter}"
    helper-text="${ifDefined(helperText)}"
    ?hide-label="${hideLabel}"
    ?inline="${inline}"
    id="input-1"
    ?invalid="${invalid}"
    invalid-text="${ifDefined(invalidText)}"
    label="${ifDefined(labelText)}"
    max-count="${ifDefined(maxCount)}"
    placeholder="${ifDefined(placeholder)}"
    ?readonly="${readonly}"
    size="${ifDefined(size)}"
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
