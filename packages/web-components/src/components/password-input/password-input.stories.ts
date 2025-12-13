/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './index';
import { iconLoader } from '../../globals/internal/icon-loader';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import '../form/form-item';
import '../icon-button';
import {
  INPUT_SIZE,
  INPUT_TOOLTIP_ALIGNMENT,
  INPUT_TOOLTIP_DIRECTION,
} from './password-input';

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
const actions = html`
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(View16, { slot: 'icon' })}
    <span slot="tooltip-content"> View </span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(FolderOpen16, { slot: 'icon' })}
    <span slot="tooltip-content"> Open folder</span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(Folders16, { slot: 'icon' })}
    <span slot="tooltip-content"> Folders </span>
  </cds-icon-button>
`;

const sizes = {
  [`Small size (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  [`Medium size (${INPUT_SIZE.MEDIUM})`]: INPUT_SIZE.MEDIUM,
  [`Large size (${INPUT_SIZE.LARGE})`]: INPUT_SIZE.LARGE,
};

const args = {
  defaultWidth: 300,
  disabled: false,
  helperText: 'Optional help text',
  hideLabel: false,
  hidePasswordLabel: 'Hide Password',
  inline: false,
  invalid: false,
  invalidText: 'Error message goes here',
  labelText: 'Text input label',
  placeholder: 'Placeholder text',
  readonly: false,
  showPasswordLabel: 'Show Password',
  size: INPUT_SIZE.MEDIUM,
  tooltipAlignment: INPUT_TOOLTIP_ALIGNMENT.END,
  tooltipPosition: INPUT_TOOLTIP_DIRECTION.BOTTOM,
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
  disabled: {
    control: 'boolean',
    description: 'Specify whether the control is disabled',
  },

  helperText: {
    control: 'text',
    description:
      'Provide text that is used alongside the control label for additional help',
  },
  hideLabel: {
    control: 'boolean',
    description:
      'Specify whether or not the underlying label is visually hidden',
  },

  hidePasswordLabel: {
    control: 'text',
    description: '"Hide password" tooltip text on password visibility toggle',
  },

  inline: {
    control: 'boolean',
    description: 'true to use the inline version',
  },
  invalid: {
    control: 'boolean',
    description: 'Specify whether the control is currently invalid',
  },
  invalidText: {
    control: 'text',
    description:
      'Provide the text that is displayed when the control is in an invalid state',
  },
  labelText: {
    control: 'text',
    description:
      'Provide the text that will be read by a screen reader when visiting this control',
  },
  placeholder: {
    control: 'text',
    description: 'Placeholder (placeholder)',
  },
  readonly: {
    control: 'boolean',
    description: 'Read only (readonly)',
  },
  showPasswordLabel: {
    control: 'text',
    description: '"Hide password" tooltip text on password visibility toggle',
  },
  size: {
    control: 'select',
    description: 'Size (size)',
    options: sizes,
  },
  tooltipAlignment: {
    options: ['start', 'center', 'end'],
    control: { type: 'radio' },
    description:
      'Specify the alignment of the tooltip to the icon-only button. Can be one of: `start`, `center`, or `end`.',
  },
  tooltipPosition: {
    options: ['top', 'right', 'bottom', 'left'],
    control: { type: 'radio' },
    description:
      'Specify the direction of the tooltip for the icon-only button. Can be either `top`, `right`, `bottom`, or `left`',
  },
  type: {
    options: ['password', 'text'],
    control: { type: 'radio' },
    description: 'The input type, either `password` or `text`',
  },
  value: {
    control: 'text',
    description: 'Provide the current value of the `<input>`',
  },
  warn: {
    control: 'boolean',
    description: 'Specify whether the control is currently in warning state',
  },
  warnText: {
    control: 'text',
    description:
      'Provide the text that is displayed when the control is in warning state',
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
      <cds-password-input
        ?disabled="${disabled}"
        helper-text="${ifDefined(helperText)}"
        ?hide-label="${hideLabel}"
        hide-password-label="${ifDefined(hidePasswordLabel)}"
        ?inline="${inline}"
        ?invalid="${invalid}"
        invalid-text="${ifDefined(invalidText)}"
        label="${ifDefined(labelText)}"
        placeholder="${ifDefined(placeholder)}"
        ?readonly="${ifDefined(readonly)}"
        show-password-label="${ifDefined(showPasswordLabel)}"
        size="${ifDefined(size)}"
        tooltip-alignment="${ifDefined(tooltipAlignment)}"
        tooltip-position="${ifDefined(tooltipPosition)}"
        type="${ifDefined(type)}"
        value="${ifDefined(value)}"
        ?warn="${ifDefined(warn)}"
        warn-text="${ifDefined(warnText)}">
      </cds-password-input>
    </div>
  `,
};

export default {
  title: 'Components/Password Input',
  actions: { argTypesRegex: '^on.*' },
};
