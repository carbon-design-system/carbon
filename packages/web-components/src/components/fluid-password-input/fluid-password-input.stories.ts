/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './index';

const args = {
  defaultWidth: 300,
  disabled: false,
  helperText: '',
  hideLabel: false,
  hidePasswordLabel: 'Hide password',
  inline: false,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  labelText: 'Label',
  placeholder: 'Placeholder text',
  readonly: false,
  showPasswordLabel: 'Show password',
  size: 'md',
  tooltipAlignment: 'end',
  tooltipPosition: 'bottom',
  type: 'password',
  value: '',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

const argTypes = {
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  showPasswordLabel: {
    control: 'text',
    description: '"Show password" tooltip text on password visibility toggle',
  },
  hidePasswordLabel: {
    control: 'text',
    description: '"Hide password" tooltip text on password visibility toggle',
  },
  helperText: {
    control: 'text',
  },
  hideLabel: {
    control: 'boolean',
  },
  inline: {
    control: 'boolean',
  },
  placeholder: {
    control: {
      type: 'text',
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
  labelText: {
    control: {
      type: 'text',
    },
  },
  onInput: {
    action: 'input',
  },
  size: {
    control: 'select',
    options: ['xs', 'sm', 'md', 'lg'],
  },
  tooltipAlignment: {
    control: 'radio',
    options: ['start', 'center', 'end'],
  },
  tooltipPosition: {
    control: 'radio',
    options: ['top', 'right', 'bottom', 'left'],
  },
  type: {
    control: 'radio',
    options: ['password', 'text'],
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
  value: {
    control: {
      type: 'text',
    },
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
    disabled,
    helperText,
    hideLabel,
    hidePasswordLabel,
    inline,
    invalid,
    invalidText,
    labelText,
    onInput,
    placeholder,
    readonly,
    showPasswordLabel,
    size,
    tooltipAlignment,
    tooltipPosition,
    type,
    value,
    warn,
    warnText,
  }) => html`
    <div style="width: ${defaultWidth}px;">
      <cds-fluid-password-input
        ?disabled="${disabled}"
        helper-text="${ifDefined(helperText)}"
        ?hide-label="${hideLabel}"
        hide-password-label="${ifDefined(hidePasswordLabel)}"
        ?inline="${inline}"
        ?invalid="${invalid}"
        invalid-text="${ifDefined(invalidText)}"
        label="${ifDefined(labelText)}"
        placeholder="${ifDefined(placeholder)}"
        ?readonly="${readonly}"
        show-password-label="${ifDefined(showPasswordLabel)}"
        size="${ifDefined(size)}"
        tooltip-alignment="${ifDefined(tooltipAlignment)}"
        tooltip-position="${ifDefined(tooltipPosition)}"
        type="${ifDefined(type)}"
        value="${ifDefined(value)}"
        ?warn="${warn}"
        warn-text="${ifDefined(warnText)}"
        @input="${onInput}">
      </cds-fluid-password-input>
    </div>
  `,
};
const meta = {
  decorators: [
    (story) => {
      return html`<div style="width: 400px">${story()}</div>`;
    },
  ],
  title: 'Components/Fluid Components/FluidPasswordInput',
};

export default meta;
