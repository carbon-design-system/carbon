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
import { boolean, select, number } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import storyDocs from './text-input-story.mdx';
import { prefix } from '../../globals/settings';
import './index';
import '../layer';
import '../form/form-item';

import { action } from '@storybook/addon-actions';
import { INPUT_SIZE } from './text-input';

const sizes = {
  [`Small size (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  Regular: null,
  [`Large size (${INPUT_SIZE.LARGE})`]: INPUT_SIZE.LARGE,
};

export const Default = () => {
  return html`
    <cds-text-input label="Text input label" helper-text="Optional help text">
    </cds-text-input>
  `;
};

Default.storyName = 'Default';

export const ReadOnly = () => {
  return html`
    <cds-text-input
      value="This is read only, you can't type more."
      readonly="true"
      label="Text input label"
      helper-text="Optional help text">
    </cds-text-input>
  `;
};

export const Skeleton = () => {
  return html` <cds-text-input-skeleton></cds-text-input-skeleton> `;
};

export const TogglePasswordVisibility = () => {
  return html`
    <cds-text-input
      type="password"
      show-password-visibility-toggle
      label="Text input label"
      helper-text="Optional help text">
    </cds-text-input>
  `;
};

export const WithLayer = () => {
  return html`
    <cds-layer>
      <cds-text-input label="First layer" helper-text="Optional help text">
      </cds-text-input>
      <cds-layer>
        <cds-text-input label="Second layer" helper-text="Optional help text">
        </cds-text-input>
        <cds-layer>
          <cds-text-input label="Third layer" helper-text="Optional help text">
          </cds-text-input>
        </cds-layer>
      </cds-layer>
    </cds-layer>
  `;
};

export const Playground = (args) => {
  const {
    disabled,
    enableCounter,
    helperText,
    hideLabel,
    inline,
    invalid,
    invalidText,
    labelText,
    maxCount,
    placeholder,
    playgroundWidth,
    readonly,
    size,
    type,
    value,
    warn,
    warnText,
    onInput,
  } = args?.[`${prefix}-input`] ?? {};
  return html`
    <div style="width: ${playgroundWidth}px;">
      <cds-text-input
        ?disabled="${disabled}"
        ?enable-counter="${ifDefined(enableCounter)}"
        helper-text="${ifDefined(helperText)}"
        ?hide-label="${hideLabel}"
        ?inline="${inline}"
        ?invalid="${invalid}"
        invalid-text="${ifDefined(invalidText)}"
        label="${ifDefined(labelText)}"
        max-count="${ifDefined(maxCount)}"
        placeholder="${ifDefined(placeholder)}"
        ?readonly="${ifDefined(readonly)}"
        size="${ifDefined(size)}"
        type="${ifDefined(type)}"
        value="${ifDefined(value)}"
        ?warn="${ifDefined(warn)}"
        warn-text="${ifDefined(warnText)}"
        @input="${onInput}">
      </cds-text-input>
    </div>
  `;
};

Playground.parameters = {
  knobs: {
    [`${prefix}-input`]: () => ({
      disabled: boolean('Disabled (disabled)', false),
      enableCounter: boolean('Enable counter (enable-counter)', false),
      helperText: textNullable('Helper text (helper-text)', 'Helper text'),
      hideLabel: boolean('Hide label (hide-label)', false),
      inline: boolean('Inline (inline)', false),
      invalid: boolean('Invalid (invalid)', false),
      invalidText: textNullable(
        'Invalid text (invalid-text)',
        'Error message goes here'
      ),
      labelText: textNullable('Label text (label)', 'Label text'),
      maxCount: textNullable('Max count (max-count)', '100'),
      placeholder: textNullable(
        'Placeholder (placeholder)',
        'Placeholder text'
      ),
      playgroundWidth: number('Playground width', 300, {
        range: true,
        min: 300,
        max: 800,
        step: 50,
      }),
      size: select('Dropdown size (size)', sizes, INPUT_SIZE.MEDIUM),
      readonly: boolean('Read only (readonly)', false),
      type: textNullable('Type (type)', 'text'),
      warn: boolean('Warn (warn)', false),
      warnText: textNullable(
        'Warn text (warn-text)',
        'Warning message that is really long can wrap to more lines but should not be excessively long.'
      ),
      value: textNullable('Value of input (value)', ''),
      onInput: action(`${prefix}-select-selected`),
    }),
  },
};

export default {
  title: 'Components/Text Input',
  parameters: {
    ...storyDocs.parameters,
  },
};
