/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { prefix } from '../../globals/settings';
import { RADIO_BUTTON_ORIENTATION } from './radio-button-group';
import { RADIO_BUTTON_LABEL_POSITION } from './radio-button';
import './index';
import storyDocs from './radio-button.mdx';

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

const args = {
  disabled: false,
  readOnly: false,
  helperText: 'Helper text',
  invalid: false,
  invalidText: 'Invalid selection',
  labelPosition: RADIO_BUTTON_LABEL_POSITION.RIGHT,
  orientation: RADIO_BUTTON_ORIENTATION.HORIZONTAL,
  name: 'radio-group',
  value: '',
  warn: false,
  warnText: 'Please notice the warning',
  checked: false,
  hideLabel: false,
  labelText: 'Radio button label',
};

const argTypes = {
  disabled: {
    control: 'boolean',
    description: 'Disabled (disabled)',
  },
  readOnly: {
    control: 'boolean',
    description: 'read only (readOnly)',
  },
  helperText: {
    control: 'text',
    description: 'Helper text (helper-text)',
  },
  invalid: {
    control: 'boolean',
    description: 'Invalid (invalid)',
  },
  invalidText: {
    control: 'text',
    description: 'Invalid text (invalid-text)',
  },
  labelPosition: {
    control: 'select',
    description: 'Label position (label-position)',
    options: labelPositions,
  },
  orientation: {
    control: 'select',
    description: 'Orientation (orientation)',
    options: orientations,
  },
  name: {
    control: 'text',
    description: 'Name (name)',
  },
  value: {
    control: 'text',
    description: 'Value (value)',
  },
  warn: {
    control: 'boolean',
    description: 'Warn (warn)',
  },
  warnText: {
    control: 'text',
    description: 'Warn text (warn-text)',
  },
  checked: {
    control: 'boolean',
    description: 'Checked (checked)',
  },
  hideLabel: {
    control: 'boolean',
    description: 'Hide label (hide-label)',
  },
  labelText: {
    control: 'text',
    description: 'Label text (label-text)',
  },
  onChange: {
    action: `${prefix}-radio-button-group-changed`,
  },
};

export const Default = {
  render: () => {
    return html`
      <cds-radio-button-group
        legend-text="Group label"
        name="radio-group"
        value="radio-1">
        <cds-radio-button
          label-text="Radio button label"
          value="radio-1"></cds-radio-button>
        <cds-radio-button
          label-text="Radio button label"
          value="radio-2"></cds-radio-button>
        <cds-radio-button
          label-text="Radio button label"
          value="radio-3"
          disabledItem></cds-radio-button>
      </cds-radio-button-group>
    `;
  },
};

export const Skeleton = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () => html`<cds-radio-button-skeleton></cds-radio-button-skeleton>`,
};

export const Playground = {
  args,
  argTypes,
  render: (args) => {
    const {
      disabled,
      readOnly,
      helperText,
      invalid,
      invalidText,
      labelPosition,
      orientation,
      name,
      value,
      warn,
      warnText,
      onChange,
      checked,
      hideLabel,
      labelText,
    } = args ?? {};
    return html`
      <cds-radio-button-group
        ?readOnly="${readOnly}"
        ?disabled="${disabled}"
        helper-text="${ifDefined(helperText)}"
        ?invalid="${invalid}"
        invalid-text="${ifDefined(invalidText)}"
        label-position="${ifDefined(labelPosition)}"
        legend-text="Radio Button group"
        orientation="${ifDefined(orientation)}"
        name="${ifDefined(name)}"
        value="${ifDefined(value)}"
        ?warn="${warn}"
        warn-text="${ifDefined(warnText)}"
        @cds-radio-button-group-changed="${onChange}">
        <cds-radio-button
          ?checked="${checked}"
          ?hide-label="${hideLabel}"
          label-text="${ifDefined(labelText)}"
          value="radio-1"></cds-radio-button>
        <cds-radio-button
          ?hide-label="${hideLabel}"
          label-text="${ifDefined(labelText)}"
          value="radio-2"></cds-radio-button>
        <cds-radio-button
          ?hide-label="${hideLabel}"
          label-text="${ifDefined(labelText)}"
          value="radio-3"></cds-radio-button>
      </cds-radio-button-group>
    `;
  },
};

const meta = {
  title: 'Components/Radio Button',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
