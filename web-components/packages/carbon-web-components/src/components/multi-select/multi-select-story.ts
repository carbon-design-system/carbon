/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean, select } from '@storybook/addon-knobs';
import { ifDefined } from 'lit/directives/if-defined.js';
import textNullable from '../../../.storybook/knob-text-nullable';
import { prefix } from '../../globals/settings';
import {
  DROPDOWN_SIZE,
  DROPDOWN_TYPE,
  DROPDOWN_DIRECTION,
  SELECTION_FEEDBACK_OPTION,
} from './multi-select';
import './multi-select-item';
import '../../../.storybook/templates/with-layer';
import storyDocs from './multi-select-story.mdx';

const sizes = {
  [`Small size (${DROPDOWN_SIZE.SMALL})`]: DROPDOWN_SIZE.SMALL,
  [`Medium size (${DROPDOWN_SIZE.MEDIUM})`]: DROPDOWN_SIZE.MEDIUM,
  [`Large size (${DROPDOWN_SIZE.LARGE})`]: DROPDOWN_SIZE.LARGE,
};

const directionOptions = {
  [`Top`]: DROPDOWN_DIRECTION.TOP,
  [`Bottom`]: DROPDOWN_DIRECTION.BOTTOM,
};

const types = {
  Default: null,
  [`Inline (${DROPDOWN_TYPE.INLINE})`]: DROPDOWN_TYPE.INLINE,
};

const selectionFeedbackOptions = {
  [`Top (${SELECTION_FEEDBACK_OPTION.TOP})`]: SELECTION_FEEDBACK_OPTION.TOP,
  [`Fixed (${SELECTION_FEEDBACK_OPTION.FIXED})`]:
    SELECTION_FEEDBACK_OPTION.FIXED,
  [`Top-after-reopen (${SELECTION_FEEDBACK_OPTION.TOP_AFTER_REOPEN})`]:
    SELECTION_FEEDBACK_OPTION.TOP_AFTER_REOPEN,
};

export const Default = () => {
  return html`
    <cds-multi-select
      title-text="Multiselect title"
      label="Multiselect label"
      helper-text="This is helper text">
      <cds-multi-select-item value="example"
        >An example option that is really long to show what should be done to
        handle long text</cds-multi-select-item
      >
      <cds-multi-select-item value="all">Option 1</cds-multi-select-item>
      <cds-multi-select-item value="cloudFoundry"
        >Option 2</cds-multi-select-item
      >
      <cds-multi-select-item disabled value="staging"
        >Option 3 - a disabled item</cds-multi-select-item
      >
      <cds-multi-select-item value="dea">Option 4</cds-multi-select-item>
      <cds-multi-select-item value="router">Option 5</cds-multi-select-item>
    </cds-multi-select>
  `;
};

Default.decorators = [
  (story) => html` <div style="width:300px">${story()}</div> `,
];

export const Filterable = () => {
  return html`
    <cds-multi-select
      filterable="true"
      title-text="Multiselect title"
      helper-text="This is helper text">
      <cds-multi-select-item value="example"
        >An example option that is really long to show what should be done to
        handle long text</cds-multi-select-item
      >
      <cds-multi-select-item value="all">Option 1</cds-multi-select-item>
      <cds-multi-select-item value="cloudFoundry"
        >Option 2</cds-multi-select-item
      >
      <cds-multi-select-item disabled value="staging"
        >Option 3 - a disabled item</cds-multi-select-item
      >
      <cds-multi-select-item value="dea">Option 4</cds-multi-select-item>
      <cds-multi-select-item value="router">Option 5</cds-multi-select-item>
    </cds-multi-select>
  `;
};

Filterable.decorators = [
  (story) => html` <div style="width:300px">${story()}</div> `,
];

export const FilterableWithLayer = () => {
  return html`
    <sb-template-layers>
      <div style="width:300px">
        <cds-multi-select
          filterable="true"
          title-text="Multiselect title"
          helper-text="This is helper text">
          <cds-multi-select-item value="example"
            >An example option that is really long to show what should be done
            to handle long text</cds-multi-select-item
          >
          <cds-multi-select-item value="all">Option 1</cds-multi-select-item>
          <cds-multi-select-item value="cloudFoundry"
            >Option 2</cds-multi-select-item
          >
          <cds-multi-select-item disabled value="staging"
            >Option 3 - a disabled item</cds-multi-select-item
          >
          <cds-multi-select-item value="dea">Option 4</cds-multi-select-item>
          <cds-multi-select-item value="router">Option 5</cds-multi-select-item>
        </cds-multi-select>
      </div>
    </sb-template-layers>
  `;
};

export const WithInitialSelectedItems = () => {
  return html`
    <cds-multi-select
      title-text="Multiselect title"
      label="Multiselect label"
      helper-text="This is helper text">
      <cds-multi-select-item value="example"
        >An example option that is really long to show what should be done to
        handle long text</cds-multi-select-item
      >
      <cds-multi-select-item selected value="all"
        >Option 1</cds-multi-select-item
      >
      <cds-multi-select-item selected value="cloudFoundry"
        >Option 2</cds-multi-select-item
      >
      <cds-multi-select-item disabled value="staging"
        >Option 3 - a disabled item</cds-multi-select-item
      >
      <cds-multi-select-item value="dea">Option 4</cds-multi-select-item>
      <cds-multi-select-item value="router">Option 5</cds-multi-select-item>
    </cds-multi-select>
  `;
};

WithInitialSelectedItems.decorators = [
  (story) => html` <div style="width:300px">${story()}</div> `,
];

export const WithLayer = () => {
  return html`
    <sb-template-layers>
      <div style="width:300px">
        <cds-multi-select
          title-text="Multiselect title"
          label="Multiselect label"
          helper-text="This is helper text">
          <cds-multi-select-item value="example"
            >An example option that is really long to show what should be done
            to handle long text</cds-multi-select-item
          >
          <cds-multi-select-item value="all">Option 1</cds-multi-select-item>
          <cds-multi-select-item value="cloudFoundry"
            >Option 2</cds-multi-select-item
          >
          <cds-multi-select-item disabled value="staging"
            >Option 3 - a disabled item</cds-multi-select-item
          >
          <cds-multi-select-item value="dea">Option 4</cds-multi-select-item>
          <cds-multi-select-item value="router">Option 5</cds-multi-select-item>
        </cds-multi-select>
      </div>
    </sb-template-layers>
  `;
};

export const Playground = (args) => {
  const {
    clearSelectionLabel,
    direction,
    disabled,
    helperText,
    hideLabel,
    locale,
    invalid,
    invalidText,
    readOnly,
    titleText,
    selectionFeedback,
    size,
    label,
    type,
    value,
    warn,
    warnText,
  } = args?.[`${prefix}-multi-select`] ?? {};
  return html`
    <cds-multi-select
      direction=${ifDefined(direction)}
      ?disabled=${disabled}
      ?invalid=${invalid}
      invalid-text=${ifDefined(invalidText)}
      clear-selection-label=${ifDefined(clearSelectionLabel)}
      helper-text=${ifDefined(helperText)}
      ?hide-label=${hideLabel}
      locale=${ifDefined(locale)}
      ?read-only=${readOnly}
      title-text=${ifDefined(titleText)}
      selection-feedback=${ifDefined(selectionFeedback)}
      size=${ifDefined(size)}
      ?warn=${warn}
      warn-text=${ifDefined(warnText)}
      label=${ifDefined(label)}
      type=${ifDefined(type)}
      value="${ifDefined(value)}">
      <cds-multi-select-item value="example"
        >An example option that is really long to show what should be done to
        handle long text</cds-multi-select-item
      >
      <cds-multi-select-item value="all">Option 1</cds-multi-select-item>
      <cds-multi-select-item value="cloudFoundry"
        >Option 2</cds-multi-select-item
      >
      <cds-multi-select-item disabled value="staging"
        >Option 3 - a disabled item</cds-multi-select-item
      >
      <cds-multi-select-item value="dea">Option 4</cds-multi-select-item>
      <cds-multi-select-item value="router">Option 5</cds-multi-select-item>
    </cds-multi-select>
  `;
};

Playground.decorators = [
  (story) => html` <div style="width:300px">${story()}</div> `,
];

export default {
  title: 'Components/Multi select',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      [`${prefix}-multi-select`]: () => ({
        clearSelectionDescription: textNullable(
          'Clear selection description for a11y (clear-selection-description)',
          'Total items selected: '
        ),
        clearSelectionText: textNullable(
          'Clear selection text for a11y (clear-selection-text)',
          'To clear selection, press Delete or Backspace.'
        ),
        disabled: boolean('Disabled (disabled)', false),
        direction: select(
          'Direction',
          directionOptions,
          DROPDOWN_DIRECTION.BOTTOM
        ),
        helperText: textNullable(
          'Helper text (helper-text)',
          'Optional helper text'
        ),
        hideLabel: boolean('Hide label (hide-label)', false),
        locale: textNullable('Locale (locale)', 'en'),
        invalid: boolean('Show invalid state  (invalid)', false),
        invalidText: textNullable('Invalid text  (invalid-text)', 'whoopsie!'),
        titleText: textNullable(
          'Title text (title-text)',
          'This is a MultiSelect Title'
        ),
        label: textNullable('Label of field (label)', 'This is a label'),
        size: select('Size (size)', sizes, DROPDOWN_SIZE.MEDIUM),
        selectionFeedback: select(
          'Selection feedback (selection-feedback)',
          selectionFeedbackOptions,
          SELECTION_FEEDBACK_OPTION.TOP_AFTER_REOPEN
        ),
        readOnly: boolean('Read only (read-only)', false),
        type: select('Type (type)', types, null),
        warn: boolean('Warn (warn)', false),
        warnText: textNullable('Warn text (warn-text)', 'whoopsie!'),
      }),
    },
  },
};
