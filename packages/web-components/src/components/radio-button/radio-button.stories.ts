/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { prefix } from '../../globals/settings';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import { RADIO_BUTTON_ORIENTATION } from './radio-button-group';
import { RADIO_BUTTON_LABEL_POSITION } from './radio-button';
import './index';
import '../ai-label';
import '../icon-button';
import { iconLoader } from '../../globals/internal/icon-loader';
import { useArgs } from 'storybook/preview-api';

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

const orientations = {
  [`Horizontal (${RADIO_BUTTON_ORIENTATION.HORIZONTAL})`]:
    RADIO_BUTTON_ORIENTATION.HORIZONTAL,
  [`Vertical (${RADIO_BUTTON_ORIENTATION.VERTICAL})`]:
    RADIO_BUTTON_ORIENTATION.VERTICAL,
};

const labelPositions = {
  [`Left (${RADIO_BUTTON_LABEL_POSITION.LEFT})`]:
    RADIO_BUTTON_LABEL_POSITION.LEFT,
  [`Right (${RADIO_BUTTON_LABEL_POSITION.RIGHT})`]:
    RADIO_BUTTON_LABEL_POSITION.RIGHT,
};

const radioButtonOptions = [
  { label: 'Radio button label', value: 'radio-1' },
  { label: 'Radio button label', value: 'radio-2' },
  { label: 'Radio button label', value: 'radio-3' },
];

const groupArgs = {
  disabled: false,
  readOnly: false,
  helperText: 'Helper text',
  invalid: false,
  invalidText: 'Invalid selection',
  labelPosition: RADIO_BUTTON_LABEL_POSITION.RIGHT,
  orientation: RADIO_BUTTON_ORIENTATION.HORIZONTAL,
  legendText: 'Radio Button group',
  name: 'radio-group',
  required: false,
  value: radioButtonOptions[1].value,
  warn: false,
  warnText: 'Please notice the warning',
  hideLabel: false,
  labelText: radioButtonOptions[0].label,
};

const groupArgTypes = {
  disabled: {
    control: 'boolean',
    description: 'Specify whether the radio button group is disabled.',
  },
  readOnly: {
    control: 'boolean',
    description: 'Specify whether the radio button group is read-only.',
  },
  required: {
    control: 'boolean',
    description: 'Specify whether a radio button selection is required.',
  },
  helperText: {
    control: 'text',
    description: 'Provide text for the radio button group for additional help.',
  },
  invalid: {
    control: 'boolean',
    description: 'Specify whether the radio button group is invalid.',
  },
  invalidText: {
    control: 'text',
    description:
      'Provide the text displayed when the group is in an invalid state.',
  },
  labelPosition: {
    control: 'select',
    description: 'Provide where radio button labels should be placed.',
    options: labelPositions,
  },
  legendText: {
    control: 'text',
    description: 'Provide the text rendered inside the fieldset legend.',
  },
  orientation: {
    control: 'select',
    description: 'Provide how radio buttons should be displayed.',
    options: orientations,
  },
  name: {
    control: 'text',
    description: 'Provide a name for the underlying radio button inputs.',
  },
  value: {
    control: 'select',
    description: 'Specify the selected radio button.',
    options: radioButtonOptions.map(({ value }) => value),
  },
  warn: {
    control: 'boolean',
    description: 'Specify whether the group is currently in a warning state.',
  },
  warnText: {
    control: 'text',
    description:
      'Provide the text displayed when the group is in a warning state.',
  },
  hideLabel: {
    control: 'boolean',
    description:
      'Specify whether radio button labels are visually hidden but still available to screen readers.',
  },
  labelText: {
    control: 'text',
    description: 'Provide the label text for the first radio button.',
  },
  onChange: {
    action: `${prefix}-radio-button-group-changed`,
  },
};

const groupControls = Object.keys(groupArgTypes);

const GroupStory = (args) => {
  const [{ value }, updateArgs] = useArgs();
  const {
    disabled,
    readOnly,
    helperText,
    invalid,
    invalidText,
    labelPosition,
    legendText,
    orientation,
    name,
    warn,
    warnText,
    onChange,
    hideLabel,
    labelText,
    required,
  } = args;

  const handleChange = (event) => {
    updateArgs({ value: event.detail.value });
    onChange?.(event);
  };

  return html`
    <cds-radio-button-group
      ?readOnly="${readOnly}"
      ?disabled="${disabled}"
      helper-text="${ifDefined(helperText)}"
      ?invalid="${invalid}"
      invalid-text="${ifDefined(invalidText)}"
      label-position="${ifDefined(labelPosition)}"
      legend-text="${ifDefined(legendText)}"
      orientation="${ifDefined(orientation)}"
      name="${ifDefined(name)}"
      .value="${value}"
      ?required="${required}"
      ?warn="${warn}"
      warn-text="${ifDefined(warnText)}"
      @cds-radio-button-group-changed="${handleChange}">
      ${radioButtonOptions.map(
        (option, index) => html`
          <cds-radio-button
            ?hide-label="${hideLabel}"
            label-text="${ifDefined(index === 0 ? labelText : option.label)}"
            value="${option.value}"></cds-radio-button>
        `
      )}
    </cds-radio-button-group>
  `;
};

const VerticalStory = (args) => {
  const [{ value }, updateArgs] = useArgs();
  const {
    disabled,
    readOnly,
    helperText,
    invalid,
    invalidText,
    labelPosition,
    legendText,
    orientation,
    name,
    warn,
    warnText,
    onChange,
    hideLabel,
    labelText,
    required,
  } = args;

  const handleChange = (event) => {
    updateArgs({ value: event.detail.value });
    onChange?.(event);
  };

  return html`
    <cds-radio-button-group
      ?readOnly="${readOnly}"
      ?disabled="${disabled}"
      helper-text="${ifDefined(helperText)}"
      ?invalid="${invalid}"
      invalid-text="${ifDefined(invalidText)}"
      label-position="${ifDefined(labelPosition)}"
      legend-text="${ifDefined(legendText)}"
      orientation="${ifDefined(orientation)}"
      name="${ifDefined(name)}"
      .value="${value}"
      ?required="${required}"
      ?warn="${warn}"
      warn-text="${ifDefined(warnText)}"
      @cds-radio-button-group-changed="${handleChange}">
      ${radioButtonOptions.map(
        (option, index) => html`
          <cds-radio-button
            ?hide-label="${hideLabel}"
            label-text="${ifDefined(index === 0 ? labelText : option.label)}"
            .disabledItem="${index === 2}"
            value="${option.value}"></cds-radio-button>
        `
      )}
    </cds-radio-button-group>
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
  render: GroupStory,
};

export const Vertical = {
  args: {
    ...groupArgs,
    legendText: 'Group label',
    orientation: RADIO_BUTTON_ORIENTATION.VERTICAL,
    value: radioButtonOptions[0].value,
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
  render: VerticalStory,
};

export const Skeleton = {
  args: {
    class: '',
  },
  argTypes: {
    class: {
      control: 'text',
      description: 'Specify an optional class name to add to the skeleton.',
    },
  },
  parameters: {
    controls: {
      include: ['class'],
    },
  },
  render: ({ class: className }) => html`
    <cds-radio-button-skeleton class="${className}"></cds-radio-button-skeleton>
  `,
};

export const WithAILabel = {
  args: {
    ...groupArgs,
    legendText: 'Group label',
    orientation: RADIO_BUTTON_ORIENTATION.VERTICAL,
    value: radioButtonOptions[0].value,
  },
  argTypes: {
    ...groupArgTypes,
    orientation: {
      ...groupArgTypes.orientation,
      table: {
        readonly: true,
      },
    },
    value: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    controls: {
      include: groupControls.filter((control) => control !== 'value'),
    },
  },
  render: ({
    disabled,
    readOnly,
    helperText,
    invalid,
    invalidText,
    labelPosition,
    legendText,
    orientation,
    name,
    warn,
    warnText,
    onChange,
    hideLabel,
    labelText,
    required,
  }) => {
    const renderRadioButton = (option, index, aiLabel) => html`
      <cds-radio-button
        ?hide-label="${hideLabel}"
        label-text="${ifDefined(index === 0 ? labelText : option.label)}"
        value="${option.value}">
        ${aiLabel}
      </cds-radio-button>
    `;
    const renderGroup = (groupNumber, aiLabels, groupAILabel) => {
      return html`
        <cds-radio-button-group
          ?readOnly="${readOnly}"
          ?disabled="${disabled}"
          helper-text="${ifDefined(helperText)}"
          ?invalid="${invalid}"
          invalid-text="${ifDefined(invalidText)}"
          label-position="${ifDefined(labelPosition)}"
          legend-text="${ifDefined(legendText)}"
          orientation="${ifDefined(orientation)}"
          name="${name}-group-${groupNumber}"
          value="${radioButtonOptions[0].value}"
          ?required="${required}"
          ?warn="${warn}"
          warn-text="${ifDefined(warnText)}"
          @cds-radio-button-group-changed="${onChange}">
          ${groupAILabel}
          ${radioButtonOptions.map((option, index) =>
            renderRadioButton(option, index, aiLabels[index])
          )}
        </cds-radio-button-group>
      `;
    };

    return html`
      ${renderGroup(
        1,
        {},
        html`<cds-ai-label alignment="bottom-left"
          >${content}${actions}</cds-ai-label
        >`
      )}
      ${renderGroup(2, {
        0: html`<cds-ai-label alignment="bottom-left"
          >${content}${actions}</cds-ai-label
        >`,
        1: html`<cds-ai-label alignment="bottom-left"
          >${content}${actions}</cds-ai-label
        >`,
      })}
      ${renderGroup(3, {
        0: html`<cds-ai-label
          slot="ai-label"
          alignment="bottom-left"
          kind="inline"
          >${content}${actions}</cds-ai-label
        >`,
        1: html`<cds-ai-label
          slot="ai-label"
          alignment="bottom-left"
          kind="inline"
          >${content}${actions}</cds-ai-label
        >`,
      })}
    `;
  },
};

const meta = {
  title: 'Components/Radio Button',
};

export default meta;
