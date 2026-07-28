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
  helperText: '',
  hideLabel: false,
  inline: false,
  id: 'input-1',
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
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  helperText: { control: 'text' },
  hideLabel: { control: 'boolean' },
  inline: { control: 'boolean' },
  id: { control: 'text' },
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
  },
  onClick: {
    action: `click`,
  },
  maxCount: {
    control: 'number',
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
  size: {
    control: 'select',
    options: ['xs', 'sm', 'md', 'lg'],
  },
};

const renderTextInput = (
  {
    disabled,
    enableCounter,
    helperText,
    hideLabel,
    inline,
    id,
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
    id="${ifDefined(id)}"
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
  render: ({ defaultWidth, ...textInputArgs }) => html`
    <div style="width:${defaultWidth}px;">
      ${renderTextInput(textInputArgs)}
    </div>
  `,
};

export const DefaultWithToggletip = {
  args,
  argTypes,
  parameters: { controls: { exclude: ['labelText', 'onClick', 'onInput'] } },
  render: ({ defaultWidth, ...textInputArgs }) => html`
    <div style="width:${defaultWidth}px;">
      ${renderTextInput(
        textInputArgs,
        html`<cds-toggletip autoAlign="true" slot="label-text">
          Label
          <p slot="body-text">Additional field information here.</p>
        </cds-toggletip>`
      )}
    </div>
  `,
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
      <cds-fluid-text-input-skeleton></cds-fluid-text-input-skeleton>
    </div>
  `,
};

export default {
  title: 'Components/Fluid Components/FluidTextInput',
};
