/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { prefix } from '../../globals/settings';
import './index';
import '../form/form-item';
import { INPUT_SIZE } from './text-input';

const sizes = {
  [`Small size (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  [`Medium size (${INPUT_SIZE.MEDIUM})`]: INPUT_SIZE.MEDIUM,
  [`Large size (${INPUT_SIZE.LARGE})`]: INPUT_SIZE.LARGE,
};

const args = {
  disabled: false,
  enableCounter: false,
  helperText: 'Helper text',
  hideLabel: false,
  inline: false,
  invalid: false,
  invalidText: 'Error message goes here',
  labelText: 'Label text',
  maxCount: '100',
  placeholder: 'Placeholder text',
  playgroundWidth: 300,
  size: INPUT_SIZE.MEDIUM,
  readonly: false,
  type: 'text',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
  value: '',
  onInput: `${prefix}-select-selected`,
};

const argTypes = {
  disabled: {
    control: 'boolean',
    description: 'Disabled (disabled)',
  },
  enableCounter: {
    control: 'boolean',
    description: 'Enable counter (enable-counter)',
  },
  helperText: {
    control: 'text',
    description: 'Helper text (helper-text)',
  },
  hideLabel: {
    control: 'boolean',
    description: 'Hide label (hide-label)',
  },
  inline: {
    control: 'boolean',
    description: 'Inline (inline)',
  },
  invalid: {
    control: 'boolean',
    description: 'Invalid (invalid)',
  },
  invalidText: {
    control: 'text',
    description: 'Invalid text (invalid-text)',
  },
  labelText: {
    control: 'text',
    description: 'Label text (label)',
  },
  maxCount: {
    control: 'text',
    description: 'Max count (max-count)',
  },
  placeholder: {
    control: 'text',
    description: 'Placeholder (placeholder)',
  },
  playgroundWidth: {
    control: 'number',
    description: 'Playground width',
    options: {
      range: true,
      min: 300,
      max: 800,
      step: 50,
    },
  },
  size: {
    control: 'select',
    description: 'Size (size)',
    options: sizes,
  },
  readonly: {
    control: 'boolean',
    description: 'Read only (readonly)',
  },
  type: {
    control: 'text',
    description: 'Type (type)',
  },
  warn: {
    control: 'boolean',
    description: 'Warn (warn)',
  },
  warnText: {
    control: 'text',
    description: 'Warn text (warn-text)',
  },
  value: {
    control: 'text',
    description: 'Value of input (value)',
  },
  onInput: {
    action: `${prefix}-select-selected`,
    table: {
      disable: true,
    },
  },
};

export const Default = {
  render: () => html`
    <cds-text-input label="Text input label" helper-text="Optional help text">
    </cds-text-input>
  `,
};

export const ReadOnly = {
  render: () => html`
    <cds-text-input
      value="This is read only, you can't type more."
      readonly="true"
      label="Text input label"
      helper-text="Optional help text">
    </cds-text-input>
  `,
};

export const Skeleton = {
  render: () => html` <cds-text-input-skeleton></cds-text-input-skeleton> `,
};

export const TogglePasswordVisibility = {
  render: () => html`
    <cds-text-input
      type="password"
      show-password-visibility-toggle
      label="Text input label"
      helper-text="Optional help text">
    </cds-text-input>
  `,
};

export const WithLayer = {
  render: () => html`
    <sb-template-layers>
      <cds-text-input label="Text input label" helper-text="Optional help text">
      </cds-text-input>
    </sb-template-layers>
  `,
};

export const Playground = {
  args,
  argTypes,
  render: ({
    disabled,
    enableCounter,
    helperText,
    hideLabel,
    inline,
    invalid,
    invalidText,
    labelText,
    maxCount,
    placeholder,
    playgroundWidth,
    readonly,
    size,
    type,
    value,
    warn,
    warnText,
    onInput,
  }) => html`
    <div style="width: ${playgroundWidth}px;">
      <cds-text-input
        ?disabled="${disabled}"
        ?enable-counter="${ifDefined(enableCounter)}"
        helper-text="${ifDefined(helperText)}"
        ?hide-label="${hideLabel}"
        ?inline="${inline}"
        ?invalid="${invalid}"
        invalid-text="${ifDefined(invalidText)}"
        label="${ifDefined(labelText)}"
        max-count="${ifDefined(maxCount)}"
        placeholder="${ifDefined(placeholder)}"
        ?readonly="${ifDefined(readonly)}"
        size="${ifDefined(size)}"
        type="${ifDefined(type)}"
        value="${ifDefined(value)}"
        ?warn="${ifDefined(warn)}"
        warn-text="${ifDefined(warnText)}"
        @input="${onInput}">
      </cds-text-input>
    </div>
  `,
};

export default {
  title: 'Components/Text Input',
  actions: { argTypesRegex: '^on.*' },
};
