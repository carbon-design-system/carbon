/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './index';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import '../dropdown/dropdown-item';
import '../ai-label';
import '../icon-button';
import { iconLoader } from '../../globals/internal/icon-loader';
import '../toggle-tip/toggletip';

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

const items = [
  {
    value: 'option-0',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    value: 'option-1',
    text: 'Option 1',
  },
  {
    value: 'option-2',
    text: 'Option 2',
  },
  {
    value: 'option-3',
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    value: 'option-4',
    text: 'Option 4',
  },
];

const args = {
  defaultWidth: 400,
  disabled: false,
  helperText: '',
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long',
  label: 'Choose an option',
  readOnly: false,
  titleText: 'Label',
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
    description: 'Specify whether the control is disabled.',
  },
  helperText: {
    control: 'text',
    description:
      'Provide helper text that is used alongside the control label for additional help.',
  },
  invalid: {
    control: 'boolean',
    description: 'Specify if the currently value is invalid.',
  },
  invalidText: {
    control: 'text',
    description: 'Message which is displayed if the value is invalid.',
  },
  label: {
    control: 'text',
    description: 'The default content of the trigger button.',
  },
  readOnly: {
    control: 'boolean',
    description: 'Whether or not the Dropdown is readonly.',
  },
  titleText: {
    control: 'text',
    description:
      'Provide the title text that will be read by a screen reader when visiting this control.',
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

export const Default = {
  args,
  argTypes,
  render: ({
    defaultWidth,
    disabled,
    helperText,
    invalid,
    invalidText,
    label,
    readOnly,
    titleText,
    warn,
    warnText,
  }) => html`
    <div style="width:${defaultWidth}px;">
      <cds-fluid-dropdown
        ?disabled="${disabled}"
        helper-text="${ifDefined(helperText)}"
        ?invalid="${invalid}"
        invalid-text="${ifDefined(invalidText)}"
        label="${ifDefined(label)}"
        ?read-only="${readOnly}"
        title-text="${ifDefined(titleText)}"
        ?warn="${warn}"
        warn-text="${ifDefined(warnText)}">
        ${items.map(
          (elem) => html`
            <cds-dropdown-item ?disabled=${elem.disabled} value="${elem.value}"
              >${elem.text}</cds-dropdown-item
            >
          `
        )}
      </cds-fluid-dropdown>
    </div>
  `,
};

export const Condensed = {
  args,
  argTypes,
  render: ({
    defaultWidth,
    disabled,
    helperText,
    invalid,
    invalidText,
    label,
    readOnly,
    titleText,
    warn,
    warnText,
  }) => html`
    <div style="width:${defaultWidth}px;">
      <cds-fluid-dropdown
        is-condensed
        ?disabled="${disabled}"
        helper-text="${ifDefined(helperText)}"
        ?invalid="${invalid}"
        invalid-text="${ifDefined(invalidText)}"
        label="${ifDefined(label)}"
        ?read-only="${readOnly}"
        title-text="${ifDefined(titleText)}"
        ?warn="${warn}"
        warn-text="${ifDefined(warnText)}">
        ${items.map(
          (elem) => html`
            <cds-dropdown-item ?disabled=${elem.disabled} value="${elem.value}"
              >${elem.text}</cds-dropdown-item
            >
          `
        )}
      </cds-fluid-dropdown>
    </div>
  `,
};

export const Skeleton = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  args: {
    defaultWidth: 400,
  },
  argTypes: {
    defaultWidth: {
      control: { type: 'range', min: 300, max: 800, step: 50 },
    },
  },
  render: ({ defaultWidth }) => html`
    <div style="width: ${defaultWidth}px;">
      <cds-fluid-dropdown-skeleton></cds-fluid-dropdown-skeleton>
    </div>
  `,
};

export const WithAILabel = {
  args,
  argTypes: {
    ...argTypes,
  },
  render: ({
    defaultWidth,
    disabled,
    helperText,
    invalid,
    invalidText,
    label,
    readOnly,
    titleText,
    warn,
    warnText,
  }) => {
    return html` <div style="width:${defaultWidth}px;">
      <cds-fluid-dropdown
        ?disabled="${disabled}"
        helper-text="${ifDefined(helperText)}"
        ?invalid="${invalid}"
        invalid-text="${ifDefined(invalidText)}"
        label="${ifDefined(label)}"
        ?read-only="${readOnly}"
        title-text="${ifDefined(titleText)}"
        ?warn="${warn}"
        warn-text="${ifDefined(warnText)}">
        <cds-ai-label alignment="bottom-left">
          ${content}${actions}</cds-ai-label
        >
        ${items.map(
          (elem) => html`
            <cds-dropdown-item ?disabled=${elem.disabled} value="${elem.value}"
              >${elem.text}</cds-dropdown-item
            >
          `
        )}
      </cds-fluid-dropdown>
    </div>`;
  },
};

const meta = {
  decorators: [
    (story) => {
      return html`<div style="width: 400px">${story()}</div>`;
    },
  ],
  title: 'Components/Fluid Components/FluidDropdown',
};

export default meta;
