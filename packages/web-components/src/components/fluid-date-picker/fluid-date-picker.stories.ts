/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import '../ai-label';
import '../icon-button';

const defaultArgs = {
  disabled: false,
  readonly: false,
  invalid: false,
  invalidText: 'Invalid date format.',
  warn: false,
  warnText: 'Warning message.',
  placeholder: 'mm/dd/yyyy',
};

const controls = {
  disabled: { control: 'boolean' },
  invalid: {
    control: 'boolean',
    description: 'Specify if the currently value is invalid.',
  },
  invalidText: {
    control: 'text',
    description: 'Message which is displayed if the value is invalid.',
  },
  placeholder: { control: 'text' },
  readonly: {
    control: 'boolean',
    description: 'Whether the DatePicker is to be readOnly.',
  },
  warn: {
    control: 'boolean',
    description: 'Specify whether the control is currently in warning state.',
  },
  warnText: {
    control: 'text',
    description:
      'Provide the text that is displayed when the control is in warning state.',
  },
};

export const Simple = {
  args: defaultArgs,
  argTypes: controls,
  render: ({
    disabled,
    invalid,
    invalidText,
    placeholder,
    readonly,
    warn,
    warnText,
  }) => {
    return html`
      <div style="width:288px;">
        <cds-fluid-date-picker>
          <cds-fluid-date-picker-input
            kind="simple"
            ?disabled="${disabled}"
            label-text="Label"
            placeholder="${placeholder}"
            ?readonly="${readonly}"
            ?invalid="${invalid}"
            invalid-text="${invalidText}"
            ?warn="${warn}"
            warn-text="${warnText}">
          </cds-fluid-date-picker-input>
        </cds-fluid-date-picker>
      </div>
    `;
  },
};

export const Single = {
  args: defaultArgs,
  argTypes: controls,
  render: ({
    disabled,
    invalid,
    invalidText,
    placeholder,
    readonly,
    warn,
    warnText,
  }) => {
    return html`
      <div style="width:288px;">
        <cds-fluid-date-picker ?disabled="${disabled}" ?readonly="${readonly}">
          <cds-fluid-date-picker-input
            kind="single"
            label-text="Date Picker label"
            placeholder="${placeholder}"
            ?invalid="${invalid}"
            invalid-text="${invalidText}"
            ?warn="${warn}"
            warn-text="${warnText}">
          </cds-fluid-date-picker-input>
        </cds-fluid-date-picker>
      </div>
    `;
  },
};

export const RangeWithCalendar = {
  args: defaultArgs,
  argTypes: controls,
  render: ({
    disabled,
    invalid,
    invalidText,
    placeholder,
    readonly,
    warn,
    warnText,
  }) => html`
    <div style="width:288px;">
      <cds-fluid-date-picker ?disabled="${disabled}" ?readonly="${readonly}">
        <cds-fluid-date-picker-input
          kind="from"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}"
          label-text="Start date"
          placeholder="${placeholder}">
        </cds-fluid-date-picker-input>
        <cds-fluid-date-picker-input
          kind="to"
          label-text="End date"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}"
          placeholder="${placeholder}">
        </cds-fluid-date-picker-input>
      </cds-fluid-date-picker>
    </div>
  `,
};

// const skeletonControls = {
//   hideLabel: {
//     control: 'boolean',
//     description: 'Specify whether the label should be hidden, or not',
//   },
//   range: {
//     control: 'boolean',
//     description: 'Specify whether the skeleton should be of range date picker.',
//   },
// };

export const Skeleton = {
  args: { defaultWidth: 300 },

  // argTypes: skeletonControls,
  render: (args) => {
    const { defaultWidth } = args;
    return html`
      <div style="width:${defaultWidth}px;">
        <cds-fluid-date-picker-skeleton
          date-picker-type="simple"></cds-fluid-date-picker-skeleton>
        <br /><br />
        <cds-fluid-date-picker-skeleton
          date-picker-type="single"></cds-fluid-date-picker-skeleton>
        <br /><br />
        <cds-fluid-date-picker-skeleton
          date-picker-type="range"></cds-fluid-date-picker-skeleton>
      </div>
    `;
  },
  parameters: {
    percy: {
      skip: true,
    },
  },
};

const meta = {
  title: 'Components/Fluid Components/Fluid Date picker',
  parameters: {
    docs: {
      controls: { exclude: ['calendar'] },
    },
  },
};

export default meta;
