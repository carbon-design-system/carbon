/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { prefix } from '../../globals/settings';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import '../ai-label/index';
import './index';
import { CHECKBOX_ORIENTATION } from './defs';
import { iconLoader } from '../../globals/internal/icon-loader';
import { useArgs } from 'storybook/preview-api';

const checkboxLabel = 'Checkbox label';

const groupArgs = {
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

const groupArgTypes = {
  disabled: {
    control: 'boolean',
    description: 'Specify whether the checkbox group should be disabled.',
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
    options: Object.values(CHECKBOX_ORIENTATION),
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

const groupControls = Object.keys(groupArgTypes);

const checkboxArgs = {
  checked: false,
  disabled: false,
  helperText: 'Helper text goes here',
  hideLabel: false,
  indeterminate: false,
  invalid: false,
  invalidText: 'Invalid test goes here',
  labelText: checkboxLabel,
  readonly: false,
  title: '',
  warn: false,
  warnText: 'Warning test goes here',
};

const checkboxArgTypes = {
  checked: {
    control: 'boolean',
    description: 'Specify whether the checkbox is checked.',
  },
  disabled: {
    control: 'boolean',
    description: 'Specify whether the checkbox is disabled.',
  },
  helperText: {
    control: 'text',
    description: 'Provide additional help text for the checkbox.',
  },
  hideLabel: {
    control: 'boolean',
    description: 'Specify whether the checkbox label should be hidden.',
  },
  indeterminate: {
    control: 'boolean',
    description: 'Specify whether the checkbox is in an indeterminate state.',
  },
  invalid: {
    control: 'boolean',
    description: 'Specify whether the checkbox is invalid.',
  },
  invalidText: {
    control: 'text',
    description:
      'Provide the text displayed when the checkbox is in an invalid state.',
  },
  labelText: {
    control: 'text',
    description: 'Provide a label that describes the checkbox.',
  },
  readonly: {
    control: 'boolean',
    description: 'Specify whether the checkbox is read-only.',
  },
  title: {
    control: 'text',
    description: 'Provide a title for the checkbox label.',
  },
  warn: {
    control: 'boolean',
    description: 'Specify whether the checkbox is in a warning state.',
  },
  warnText: {
    control: 'text',
    description:
      'Provide the text displayed when the checkbox is in a warning state.',
  },
};

const checkboxControls = Object.keys(checkboxArgTypes);

const SingleStory = (args) => {
  const [{ checked }, updateArgs] = useArgs();
  const {
    disabled,
    helperText,
    hideLabel,
    indeterminate,
    invalid,
    invalidText,
    labelText,
    onChange,
    readonly,
    title,
    warn,
    warnText,
  } = args;

  const handleChange = (event) => {
    updateArgs({ checked: event.detail.checked });
    onChange?.(event);
  };

  return html`
    <cds-checkbox
      ?checked="${checked}"
      ?disabled="${disabled}"
      helper-text="${helperText}"
      ?hide-label="${hideLabel}"
      ?indeterminate="${indeterminate}"
      ?invalid="${invalid}"
      invalid-text="${invalidText}"
      label-text="${labelText}"
      @cds-checkbox-changed="${handleChange}"
      ?readonly="${readonly}"
      title="${title}"
      ?warn="${warn}"
      warn-text="${warnText}">
    </cds-checkbox>
  `;
};

export const Default = {
  args: groupArgs,
  argTypes: groupArgTypes,
  parameters: {
    controls: {
      include: groupControls,
    },
  },
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
  args: {
    ...groupArgs,
    orientation: 'horizontal',
  },
  argTypes: {
    ...groupArgTypes,
    orientation: {
      ...groupArgTypes.orientation,
      table: {
        readonly: true,
      },
    },
  },
  parameters: {
    controls: {
      include: groupControls,
    },
  },
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

export const Single = {
  args: checkboxArgs,
  argTypes: checkboxArgTypes,
  parameters: {
    controls: {
      include: checkboxControls,
    },
  },
  render: SingleStory,
};

export const Skeleton = {
  parameters: {
    controls: {
      disable: true,
    },
  },
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
  args: groupArgs,
  argTypes: groupArgTypes,
  parameters: {
    controls: {
      include: groupControls,
    },
  },
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
        <cds-checkbox @cds-checkbox-changed="${onChange}"
          >${checkboxLabel}</cds-checkbox
        >
        <cds-checkbox @cds-checkbox-changed="${onChange}"
          >${checkboxLabel}</cds-checkbox
        >
        <cds-checkbox @cds-checkbox-changed="${onChange}"
          >${checkboxLabel}</cds-checkbox
        >
      </cds-checkbox-group>
      <br></br>
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
        <cds-checkbox @cds-checkbox-changed="${onChange}">
          ${checkboxLabel}
          <cds-ai-label alignment="bottom-left">
            ${content}${actions}</cds-ai-label
          >
        </cds-checkbox>
        <cds-checkbox @cds-checkbox-changed="${onChange}">
          ${checkboxLabel}
          <cds-ai-label alignment="bottom-left">
            ${content}${actions}</cds-ai-label
          >
        </cds-checkbox>
        <cds-checkbox @cds-checkbox-changed="${onChange}"
          >${checkboxLabel}</cds-checkbox
        >
      </cds-checkbox-group>
       <br></br>
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
        <cds-checkbox @cds-checkbox-changed="${onChange}">
          ${checkboxLabel}
          <cds-ai-label alignment="bottom-left" kind="inline">
            ${content}${actions}
          </cds-ai-label>
        </cds-checkbox>
        <cds-checkbox @cds-checkbox-changed="${onChange}">
          ${checkboxLabel}
          <cds-ai-label alignment="bottom-left" kind="inline">
            ${content}${actions}
          </cds-ai-label>
        </cds-checkbox>
        <cds-checkbox @cds-checkbox-changed="${onChange}"
          >${checkboxLabel}</cds-checkbox
        >
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
