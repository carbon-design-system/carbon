/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './index';
import '../toggle-tip/toggletip';

const args = {
  cols: 0,
  counterMode: '',
  disabled: false,
  enableCounter: true,
  hideLabel: false,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  label: 'Text Area label',
  maxCount: 500,
  onInput: () => {},
  placeholder: 'Placeholder text',
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
  counterMode: {
    control: 'radio',
    options: ['character', 'word'],
    description:
      'Specify the method used for calculating the counter number (character or word)',
  },
  disabled: {
    control: 'boolean',
    description: 'Disabled (disabled)',
  },
  enableCounter: {
    control: 'boolean',
    description: 'Enable character counter (enable-counter)',
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
  args,
  argTypes,
  render: ({
    cols,
    counterMode,
    disabled,
    enableCounter,
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
    <div style="width:300px;">
      <cds-fluid-textarea
        ?enable-counter="${enableCounter}"
        counter-mode="${ifDefined(counterMode)}"
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
      </cds-fluid-textarea>
    </div>
  `,
};

export const Skeleton = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () =>
    html` <div style="width:300px;">
      <cds-fluid-textarea-skeleton></cds-fluid-textarea-skeleton>
    </div>`,
};

export const WithLayer = {
  render: () => html`
    <sb-template-layers>
      <cds-fluid-textarea
        placeholder="Placeholder text"
        label="Text Area label"
        helper-text="Optional helper text">
      </cds-fluid-textarea>
    </sb-template-layers>
  `,
};

export const DefaultWithToggletip = {
  render: () => html`
    <div style="width:300px;">
      <cds-fluid-textarea placeholder="Placeholder text">
        <cds-toggletip slot="label-text" alignment="top-left" autoAlign="true">
          Toggletip label
          <p slot="body-text">Additional field information here.</p>
        </cds-toggletip>
      </cds-fluid-textarea>
    </div>
  `,
};

export default {
  title: 'Components/Fluid Components/FluidTextArea',
};
