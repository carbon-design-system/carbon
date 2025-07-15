/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { prefix } from '../../globals/settings';
import View16 from '@carbon/icons/lib/view/16.js';
import FolderOpen16 from '@carbon/icons/lib/folder--open/16.js';
import Folders16 from '@carbon/icons/lib/folders/16.js';
import '../ai-label/index';
import './index';
import { CHECKBOX_ORIENTATION } from './defs';

const checkboxLabel = 'Checkbox label';

const defaultArgs = {
  disabled: false,
  helperText: 'Helper text goes here',
  invalid: false,
  invalidText: 'Invalid message goes here',
  legendText: 'Group label',
  readonly: false,
  warn: false,
  warnText: 'Warn message goes here',
  orientation: 'vertical',
};

const controls = {
  disabled: {
    control: 'boolean',
    description: 'Specify whether the checkbox should be disabled.',
  },
  helperText: {
    control: 'text',
    description: 'Provide text for the form group for additional help.',
  },
  invalid: {
    control: 'boolean',
    description: 'Specify whether the form group is currently invalid.',
  },
  invalidText: {
    control: 'text',
    description:
      'Provide the text that is displayed when the form group is in an invalid state.',
  },
  legendText: {
    control: 'text',
    description: 'Provide the text to be rendered inside of the fieldset.',
  },
  orientation: {
    control: 'select',
    description: 'Provide how checkbox should be displayed.',
    options: CHECKBOX_ORIENTATION,
  },
  readonly: {
    control: 'boolean',
    description: 'Specify whether the checkbox group is read-only.',
  },
  warn: {
    control: 'boolean',
    description:
      'Specify whether the form group is currently in warning state.',
  },
  warnText: {
    control: 'text',
    description:
      'Provide the text that is displayed when the form group is in warning state.',
  },
};

export const Default = {
  args: defaultArgs,
  argTypes: controls,
  render: ({
    disabled,
    readonly,
    onChange,
    helperText,
    invalid,
    invalidText,
    legendText,
    orientation,
    warn,
    warnText,
  }) => html`
    <cds-checkbox-group
      legend-text="Group label"
      helper-text="${helperText}"
      ?disabled="${disabled}"
      ?invalid="${invalid}"
      invalid-text="${invalidText}"
      legend-text="${legendText}"
      orientation="${orientation}"
      ?readonly="${readonly}"
      ?warn="${warn}"
      warn-text="${warnText}">
      <cds-checkbox @cds-checkbox-changed="${onChange}"
        >${checkboxLabel}</cds-checkbox
      >
      <cds-checkbox @cds-checkbox-changed="${onChange}"
        >${checkboxLabel}</cds-checkbox
      >
    </cds-checkbox-group>
  `,
};

export const Horizontal = {
  args: defaultArgs,
  argTypes: controls,
  render: ({
    disabled,
    readonly,
    onChange,
    helperText,
    invalid,
    invalidText,
    legendText,
    warn,
    warnText,
  }) => html`
    <cds-checkbox-group
      helper-text="${helperText}"
      ?disabled="${disabled}"
      ?invalid="${invalid}"
      invalid-text="${invalidText}"
      legend-text="${legendText}"
      orientation="horizontal"
      ?readonly="${readonly}"
      ?warn="${warn}"
      warn-text="${warnText}">
      <cds-checkbox @cds-checkbox-changed="${onChange}"
        >${checkboxLabel}</cds-checkbox
      >
      <cds-checkbox @cds-checkbox-changed="${onChange}"
        >${checkboxLabel}</cds-checkbox
      >
    </cds-checkbox-group>
  `,
};

export const Single = {
  args: defaultArgs,
  render: () => html`
    <cds-checkbox helper-text="Helper text goes here"
      >${checkboxLabel}</cds-checkbox
    >
    <br /><br />
    <cds-checkbox invalid invalid-text="Invalid test goes here"
      >${checkboxLabel}</cds-checkbox
    >
    <br /><br />
    <cds-checkbox warn warn-text="Warning test goes here"
      >${checkboxLabel}</cds-checkbox
    >
    <br /><br />
    <cds-checkbox readonly>${checkboxLabel}</cds-checkbox>
  `,
};

export const Skeleton = {
  args: defaultArgs,
  render: () => html`
    <fieldset class="${prefix}--fieldset">
      <cds-checkbox-skeleton></cds-checkbox-skeleton>
    </fieldset>
  `,
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
    ${View16({ slot: 'icon' })}
    <span slot="tooltip-content"> View </span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${FolderOpen16({ slot: 'icon' })}
    <span slot="tooltip-content"> Open folder</span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${Folders16({ slot: 'icon' })}
    <span slot="tooltip-content"> Folders </span>
  </cds-icon-button>
  <cds-ai-label-action-button>View details</cds-ai-label-action-button>
`;

export const WithAILabel = {
  args: defaultArgs,
  argTypes: controls,
  render: ({
    disabled,
    readonly,
    onChange,
    helperText,
    legendText,
    invalid,
    invalidText,
    orientation,
    warn,
    warnText,
  }) => html`
    <div style="width: 400px">
      <cds-checkbox-group
      legend-text="${legendText}"
      helper-text="${helperText}"
      ?disabled="${disabled}"
      ?invalid="${invalid}"
      invalid-text="${invalidText}"
      orientation="${orientation}"
      ?readonly="${readonly}"
      ?warn="${warn}"
      warn-text="${warnText}">
        <cds-ai-label alignment="bottom-left">
          ${content}${actions}</cds-ai-label
        >
        <cds-checkbox @cds-checkbox-changed="${onChange}">Checkbox label</cds-checkbox>
        <cds-checkbox @cds-checkbox-changed="${onChange}">Checkbox label</cds-checkbox>
        <cds-checkbox @cds-checkbox-changed="${onChange}">Checkbox label</cds-checkbox>
      </cds-checkbox-group>
      <br></br>
      <cds-checkbox-group
      legend-text="Group label"
      helper-text="${helperText}"
      ?disabled="${disabled}"
      ?invalid="${invalid}"
      invalid-text="${invalidText}"
      orientation="${orientation}"
      ?readonly="${readonly}"
      ?warn="${warn}"
      warn-text="${warnText}">
        <cds-checkbox @cds-checkbox-changed="${onChange}">
          Checkbox label
          <cds-ai-label alignment="bottom-left">
            ${content}${actions}</cds-ai-label
          >
        </cds-checkbox>
        <cds-checkbox @cds-checkbox-changed="${onChange}">
          Checkbox label
          <cds-ai-label alignment="bottom-left">
            ${content}${actions}</cds-ai-label
          >
        </cds-checkbox>
        <cds-checkbox @cds-checkbox-changed="${onChange}">Checkbox label</cds-checkbox>
      </cds-checkbox-group>
       <br></br>
      <cds-checkbox-group
      legend-text="Group label"
      helper-text="${helperText}"
      ?disabled="${disabled}"
      ?invalid="${invalid}"
      invalid-text="${invalidText}"
      orientation="${orientation}"
      ?readonly="${readonly}"
      ?warn="${warn}"
      warn-text="${warnText}">
        <cds-checkbox @cds-checkbox-changed="${onChange}">
          Checkbox label
          <cds-ai-label alignment="bottom-left" kind="inline">
            ${content}${actions}
          </cds-ai-label>
        </cds-checkbox>
        <cds-checkbox @cds-checkbox-changed="${onChange}">
          Checkbox label
          <cds-ai-label alignment="bottom-left" kind="inline">
            ${content}${actions}
          </cds-ai-label>
        </cds-checkbox>
        <cds-checkbox @cds-checkbox-changed="${onChange}">Checkbox label</cds-checkbox>
      </cds-checkbox-group>
    </div>
  `,
};

const meta = {
  title: 'Components/Checkbox',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

export default meta;
