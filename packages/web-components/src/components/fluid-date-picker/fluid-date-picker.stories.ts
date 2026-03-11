/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { iconLoader } from '../../globals/internal/icon-loader';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import './index';
import '../date-picker/date-picker-input';
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
  helperText: { control: 'text' },
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
    description:
      'Whether the DatePicker is to be readOnly if boolean applies to all inputs if array applies to each input in order.',
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
  render: (args) => {
    const {
      disabled,
      invalid,
      invalidText,
      placeholder,
      readonly,
      warn,
      warnText,
    } = args;
    return html`
      <div style="width:288px;">
        <cds-fluid-date-picker
          ?disabled="${disabled}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?readonly="${readonly}"
          ?warn="${warn}"
          warn-text="${warnText}">
          <cds-fluid-date-picker-input
            kind="single"
            label-text="Date Picker label"
            placeholder="${placeholder}">
          </cds-fluid-date-picker-input>
        </cds-fluid-date-picker>
      </div>
    `;
  },
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
        <cds-fluid-date-picker-skeleton />
      </div>
    `;
  },
  decorators: [(story) => html` <div>${story()}</div> `],
  parameters: {
    percy: {
      skip: true,
    },
  },
};

const content = html`
  <div slot="body-text">
    <p class="secondary">AI Explained</p>
    <h2 class="ai-label-heading">84%</h2>
    <p class="secondary bold">Confidence score</p>
    <p class="secondary">
      Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
    </p>
    <hr />
    <p class="secondary">Model type</p>
    <p class="bold">Foundation model</p>
  </div>
`;

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
  <cds-ai-label-action-button>View details</cds-ai-label-action-button>
`;

export const WithAILabel = {
  args: defaultArgs,
  argTypes: controls,
  render: (args) => {
    const {
      allowInput,
      closeOnSelect,
      dateFormat,
      disabled,
      invalid,
      invalidText,
      maxDate,
      minDate,
      placeholder,
      readonly,
      size,
      warn,
      warnText,
    } = args;
    return html`
      <cds-fluid-date-picker
        allow-input="${allowInput}"
        close-on-select="${closeOnSelect}"
        date-format="${dateFormat}"
        ?disabled="${disabled}"
        ?invalid="${invalid}"
        invalid-text="${invalidText}"
        max-date="${maxDate}"
        min-date="${minDate}"
        ?readonly="${readonly}"
        size="${size}"
        ?warn="${warn}"
        warn-text="${warnText}">
        <cds-fluid-date-picker-input
          kind="single"
          label-text="Date Picker label"
          placeholder="${placeholder}">
          <cds-ai-label alignment="bottom-left">
            ${content}${actions}</cds-ai-label
          >
        </cds-fluid-date-picker-input>
      </cds-fluid-date-picker>
    `;
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
