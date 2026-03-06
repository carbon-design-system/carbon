/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './index';

const args = {
  defaultWidth: 300,
  placeholder: 'Placeholder text',
  showPasswordLabel: 'Show password label',
  hidePasswordLabel: 'Hide password label',
  readonly: false,
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
  showPasswordLabel: {
    description: 'Show password" tooltip text on password visibility toggle',
  },
  hidePasswordLabel: {
    description: 'Hide password" tooltip text on password visibility toggle',
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
    hideLabel,
    hidePasswordLabel,
    inline,
    invalid,
    invalidText,
    labelText,
    placeholder,
    readonly,
    showPasswordLabel,
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
        ?hide-label="${hideLabel}"
        hide-password-label="${ifDefined(hidePasswordLabel)}"
        ?inline="${inline}"
        ?invalid="${invalid}"
        invalid-text="${ifDefined(invalidText)}"
        label="${ifDefined(labelText)}"
        placeholder="${ifDefined(placeholder)}"
        ?readonly="${ifDefined(readonly)}"
        show-password-label="${ifDefined(showPasswordLabel)}"
        tooltip-alignment="${ifDefined(tooltipAlignment)}"
        tooltip-position="${ifDefined(tooltipPosition)}"
        type="${ifDefined(type)}"
        value="${ifDefined(value)}"
        ?warn="${ifDefined(warn)}"
        warn-text="${ifDefined(warnText)}">
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
