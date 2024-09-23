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
import './index';
import '../form/form-item';

const args = {
  cols: 0,
  disabled: false,
  enableCounter: true,
  helperText: 'Textarea helper text',
  hideLabel: false,
  invalid: false,
  invalidText: 'Invalid text',
  label: 'Textarea label',
  maxCount: 500,
  onInput: 'input',
  placeholder: '',
  readonly: false,
  rows: 4,
  value: '',
  warn: false,
  warnText: 'This is a warning message.',
};

const argTypes = {
  cols: {
    control: 'number',
    description: 'Number of columns (cols)',
  },
  disabled: {
    control: 'boolean',
    description: 'Disabled (disabled)',
  },
  enableCounter: {
    control: 'boolean',
    description: 'Enable character counter (enable-counter)',
  },
  helperText: {
    control: 'text',
    description: 'Helper text (helper-text)',
  },
  hideLabel: {
    control: 'boolean',
    description: 'Hide label (hide-label)',
  },
  invalid: {
    control: 'boolean',
    description: 'Invalid (invalid)',
  },
  invalidText: {
    control: 'text',
    description: 'Invalid text (invalid-text)',
  },
  label: {
    control: 'text',
    description: 'Label (label)',
  },
  maxCount: {
    control: 'number',
    description: 'Max character count (max-count)',
  },
  onInput: {
    action: `input`,
    table: {
      disable: true,
    },
  },
  placeholder: {
    control: 'text',
    description: 'Placeholder text (placeholder)',
  },
  readonly: {
    control: 'boolean',
    description: 'Read only (readonly)',
  },
  rows: {
    control: 'number',
    description: 'Number of rows (rows)',
  },
  value: {
    control: 'text',
    description: 'Value (value)',
  },
  warn: {
    control: 'boolean',
    description: 'Warn (warn)',
  },
  warnText: {
    control: 'text',
    description: 'Warn text (warn-text)',
  },
};

export const Default = {
  render: () => html`
    <cds-form-item>
      <cds-textarea label="Textarea label" helper-text="Optional helper text">
      </cds-textarea>
    </cds-form-item>
  `,
};

export const skeleton = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () => html` <cds-textarea-skeleton></cds-textarea-skeleton> `,
};

export const WithLayer = {
  render: () => html`
    <sb-template-layers>
      <cds-textarea label="Text Area label" helper-text="Optional helper text">
      </cds-textarea>
    </sb-template-layers>
  `,
};

export const Playground = {
  args,
  argTypes,
  render: ({
    cols,
    disabled,
    enableCounter,
    helperText,
    hideLabel,
    invalid,
    invalidText,
    label,
    maxCount,
    onInput,
    placeholder,
    readonly,
    rows,
    value,
    warn,
    warnText,
  }) => html`
    <cds-form-item>
      <cds-textarea
        ?enable-counter="${enableCounter}"
        helper-text="${ifDefined(helperText)}"
        ?hide-label="${hideLabel}"
        ?invalid="${invalid}"
        invalid-text="${ifDefined(invalidText)}"
        label="${ifDefined(label)}"
        ?readonly="${readonly}"
        value="${ifDefined(value)}"
        ?warn="${warn}"
        warn-text="${ifDefined(warnText)}"
        ?disabled="${disabled}"
        max-count="${ifDefined(maxCount)}"
        placeholder="${ifDefined(placeholder)}"
        @input="${onInput}"
        rows="${ifDefined(rows)}"
        cols="${ifDefined(cols)}">
        ${value}
      </cds-textarea>
    </cds-form-item>
  `,
};

export default {
  title: 'Components/Text Area',
};
