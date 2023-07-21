/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import { prefix } from '../../globals/settings';
import { RADIO_BUTTON_ORIENTATION } from './radio-button-group';
import { RADIO_BUTTON_LABEL_POSITION } from './radio-button';
import './index';
import storyDocs from './radio-button-story.mdx';

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

export const Default = () => {
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
};

export const skeleton = () =>
  html`<cds-radio-button-skeleton></cds-radio-button-skeleton>`;

skeleton.parameters = {
  percy: {
    skip: true,
  },
};

export const Playground = (args) => {
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
  } = args?.[`${prefix}-radio-button-group`] ?? {};
  const { checked, hideLabel, labelText } =
    args?.[`${prefix}-radio-button`] ?? {};
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
};

Playground.parameters = {
  knobs: {
    [`${prefix}-radio-button-group`]: () => ({
      disabled: boolean('Disabled (disabled)', false),
      readOnly: boolean('read only (readOnly)', false),
      helperText: textNullable('Helper text (helper-text)', 'Helper text'),
      invalid: boolean('Invalid (invalid)', false),
      invalidText: textNullable(
        'Invalid text (invalid-text)',
        'Invalid selection'
      ),
      labelPosition: select(
        'Label position (label-position)',
        labelPositions,
        RADIO_BUTTON_LABEL_POSITION.RIGHT
      ),
      orientation: select(
        'Orientation (orientation)',
        orientations,
        RADIO_BUTTON_ORIENTATION.HORIZONTAL
      ),
      name: textNullable('Name (name)', 'radio-group'),
      value: textNullable('Value (value)', ''),
      warn: boolean('Warn (warn)', false),
      warnText: textNullable(
        'Warn text (warn-text)',
        'Please notice the warning'
      ),
      onChange: action(`${prefix}-radio-button-group-changed`),
    }),
    [`${prefix}-radio-button`]: () => ({
      checked: boolean('Checked (checked)', false),
      hideLabel: boolean('Hide label (hide-label)', false),
      labelText: textNullable('Label text (label-text)', 'Radio button label'),
    }),
  },
};

export default {
  title: 'Components/Radio button',
  parameters: {
    ...storyDocs.parameters,
  },
};
