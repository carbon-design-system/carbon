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
import '../form/form-item';
import '../ai-label';
import '../icon-button';
import { iconLoader } from '../../globals/internal/icon-loader';
import '../select/select-item';
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

const args = {
  defaultWidth: 400,
  disabled: false,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long',
  labelText: 'Select an option',
  readOnly: false,
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
  invalid: {
    control: 'boolean',
    description: 'Specify if the currently value is invalid.',
  },
  invalidText: {
    control: 'text',
    description: 'Message which is displayed if the value is invalid.',
  },
  labelText: {
    control: 'text',
    description:
      'Provide label text to be read by screen readers when interacting with the control.',
  },
  readOnly: {
    control: 'boolean',
    description: 'Whether the select should be read-only.',
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
  render: (args) => {
    const {
      defaultWidth,
      disabled,
      invalid,
      invalidText,
      labelText,
      name,
      readOnly,
      warn,
      warnText,
    } = args ?? {};
    return html`
      <div style="width:${defaultWidth}px;">
        <cds-fluid-select
          ?disabled="${disabled}"
          ?invalid="${invalid}"
          invalid-text="${ifDefined(invalidText)}"
          label-text="${ifDefined(labelText)}"
          name="${ifDefined(name)}"
          ?readonly="${readOnly}"
          ?warn="${warn}"
          warn-text="${ifDefined(warnText)}">
          <cds-select-item value=""></cds-select-item>
          <cds-select-item value="option-1">Option 1</cds-select-item>
          <cds-select-item value="option-2">Option 2</cds-select-item>
          <cds-select-item value="option-3">Option 3</cds-select-item>
          <cds-select-item value="option-4">Option 4</cds-select-item>
        </cds-fluid-select>
        <div></div>
      </div>
    `;
  },
};

export const WithToggletip = {
  render: () => {
    return html`
      <div style="width:400px;">
        <cds-fluid-select>
          <cds-toggletip autoAlign="true" slot="label-text">
            Label
            <p slot="body-text">Additional field information here.</p>
          </cds-toggletip>
          <cds-select-item
            value="An example option that is really long to show what should be done to handle long text"
            >An example option that is really long to show what should be done
            to handle long text</cds-select-item
          >
          <cds-select-item value="option-1">Option 1</cds-select-item>
          <cds-select-item value="option-2">Option 2</cds-select-item>
          <cds-select-item value="option-3">Option 3</cds-select-item>
          <cds-select-item value="option-4">Option 4</cds-select-item>
        </cds-fluid-select>
        <div></div>
      </div>
    `;
  },
};

export const Skeleton = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () =>
    html` <div style="width:400px;">
      <cds-fluid-select-skeleton></cds-fluid-select-skeleton>
      <div style="width:400px;"></div>
    </div>`,
};

export const WithAILabel = {
  args,
  argTypes: {
    ...argTypes,
  },
  render: (args) => {
    const {
      disabled,
      invalid,
      invalidText,
      labelText,
      name,
      readOnly,
      warn,
      warnText,
      defaultWidth,
    } = args ?? {};

    return html` <div style="width:${defaultWidth}px;">
      <cds-fluid-select
        ?disabled="${disabled}"
        ?invalid="${invalid}"
        invalid-text="${ifDefined(invalidText)}"
        label-text="${ifDefined(labelText)}"
        name="${ifDefined(name)}"
        ?readonly="${readOnly}"
        ?warn="${warn}"
        warn-text="${ifDefined(warnText)}">
        <cds-ai-label alignment="bottom-left">
          ${content}${actions}</cds-ai-label
        >
        <cds-select-item value=""></cds-select-item>
        <cds-select-item value="all"
          >An example option that is really long to show what should be done to
          handle long text</cds-select-item
        >
        <cds-select-item value="cloudFoundry">Option 2</cds-select-item>
        <cds-select-item value="staging">Option 3</cds-select-item>
        <cds-select-item value="dea">Option 4</cds-select-item>
      </cds-fluid-select>
    </div>`;
  },
};

const meta = {
  decorators: [
    (story) => {
      return html`<div style="width: 400px">${story()}</div>`;
    },
  ],
  title: 'Components/Fluid Components/FluidSelect',
};

export default meta;
