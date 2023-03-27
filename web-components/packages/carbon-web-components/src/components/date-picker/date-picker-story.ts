/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import { prefix } from '../../globals/settings';
import textNullable from '../../../.storybook/knob-text-nullable';
import { ifDefined } from 'lit/directives/if-defined.js';
import { INPUT_SIZE } from '../input/input';
import './date-picker';
import {
  DATE_PICKER_INPUT_COLOR_SCHEME,
  DATE_PICKER_INPUT_SIZE_HORIZONTAL,
} from './date-picker-input';
import storyDocs from './date-picker-story.mdx';
import './date-picker-input-skeleton';

const colorSchemes = {
  [`Regular`]: null,
  [`Light (${DATE_PICKER_INPUT_COLOR_SCHEME.LIGHT})`]:
    DATE_PICKER_INPUT_COLOR_SCHEME.LIGHT,
};

const sizes = {
  Regular: null,
  [`Small size (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  [`Extra large size (${INPUT_SIZE.EXTRA_LARGE})`]: INPUT_SIZE.EXTRA_LARGE,
};

const knobs = {
  [`${prefix}-date-picker`]: () => ({
    dateFormat: textNullable('The date format (date-format)', 'm/d/Y'),
    disabled: boolean('Disabled (disabled in <cds-date-picker-input>)', false),
    enabledRange: textNullable(
      'Minimum/maximum dates in ISO8601 date format, separated by `/` (enabled-range)',
      ''
    ),
    open: boolean('Open (open)', false),
    value: textNullable(
      'Value in ISO8601 date format, separated by `/` (value)',
      ''
    ),
    onAfterChanged: action('cds-date-picker-changed'),
    onFlatpickrError: action('cds-date-picker-flatpickr-error'),
  }),
  [`${prefix}-date-picker-input`]: () => ({
    colorScheme: select(
      'Color scheme (color-scheme in <cds-date-picker-input>)',
      colorSchemes,
      null
    ),
    hideLabel: boolean(
      'Hide label (hide-label in <cds-date-picker-input>)',
      false
    ),
    invalid: boolean('Show invalid state  (invalid)', false),
    labelText: textNullable(
      'Label text (label-text in <cds-date-picker-input>)',
      'Date Picker label'
    ),
    placeholder: textNullable(
      'Placeholder text (placeholder in <cds-date-picker-input>)',
      'mm/dd/yyyy'
    ),
    size: select('Input size (size)', sizes, INPUT_SIZE.MEDIUM),
    validityMessage: textNullable(
      'The validity message (validity-message)',
      ''
    ),
    onInput: action('input'),
  }),
};

const sizesHorizontal = {
  'Regular size': null,
  [`Short size (${DATE_PICKER_INPUT_SIZE_HORIZONTAL.SHORT})`]:
    DATE_PICKER_INPUT_SIZE_HORIZONTAL.SHORT,
};

export const Default = (args) => {
  const { disabled, name, value } = args?.[`${prefix}-date-picker`] ?? {};
  const {
    colorScheme,
    hideLabel,
    invalid,
    labelText,
    placeholder,
    size,
    sizeHorizontal,
    validityMessage,
  } = args?.[`${prefix}-date-picker-input`] ?? {};
  return html`
    <cds-date-picker
      ?disabled="${disabled}"
      name="${ifDefined(name)}"
      value="${ifDefined(value)}">
      <cds-date-picker-input
        color-scheme="${ifDefined(colorScheme)}"
        ?hide-label="${hideLabel}"
        ?invalid="${invalid}"
        label-text="${ifDefined(labelText)}"
        placeholder="${ifDefined(placeholder)}"
        size="${ifDefined(size)}"
        size-horizontal="${ifDefined(sizeHorizontal)}"
        validity-message="${ifDefined(validityMessage)}">
      </cds-date-picker-input>
    </cds-date-picker>
  `;
};

Default.storyName = 'Default';

Default.parameters = {
  knobs: {
    [`${prefix}-date-picker-input`]: () => ({
      ...knobs[`${prefix}-date-picker-input`](),
      sizeHorizontal: select(
        'Horizontal size (size-horizontal)',
        sizesHorizontal,
        null
      ),
    }),
  },
};

export const singleWithCalendar = (args) => {
  const {
    dateFormat,
    disabled,
    enabledRange,
    name,
    open,
    value,
    onChanged,
    onFlatpickrError,
  } = args?.[`${prefix}-date-picker`] ?? {};
  const {
    colorScheme,
    hideLabel,
    invalid,
    labelText,
    placeholder,
    size,
    validityMessage,
    onInput,
  } = args?.[`${prefix}-date-picker-input`] ?? {};
  return html`
    <cds-date-picker
      date-format="${ifDefined(dateFormat)}"
      ?disabled="${disabled}"
      enabled-range="${ifDefined(enabledRange)}"
      name="${ifDefined(name)}"
      ?open="${open}"
      value="${ifDefined(value)}"
      @cds-date-picker-changed="${onChanged}"
      @cds-date-picker-flatpickr-error="${onFlatpickrError}">
      <cds-date-picker-input
        color-scheme="${ifDefined(colorScheme)}"
        ?hide-label="${hideLabel}"
        ?invalid="${invalid}"
        kind="single"
        label-text="${ifDefined(labelText)}"
        placeholder="${ifDefined(placeholder)}"
        size="${ifDefined(size)}"
        validity-message="${ifDefined(validityMessage)}"
        @input="${onInput}">
      </cds-date-picker-input>
    </cds-date-picker>
  `;
};

singleWithCalendar.storyName = 'Single with calendar';

singleWithCalendar.parameters = {
  knobs,
};

export const rangeWithCalendar = (args) => {
  const {
    dateFormat,
    disabled,
    enabledRange,
    name,
    open,
    value,
    onChanged,
    onFlatpickrError,
  } = args?.[`${prefix}-date-picker`] ?? {};
  const {
    colorScheme,
    hideLabel,
    invalid,
    labelText,
    placeholder,
    size,
    validityMessage,
    onInput,
  } = args?.[`${prefix}-date-picker-input`] ?? {};
  return html`
    <cds-date-picker
      date-format="${ifDefined(dateFormat)}"
      ?disabled="${disabled}"
      enabled-range="${ifDefined(enabledRange)}"
      name="${ifDefined(name)}"
      ?open="${open}"
      value="${ifDefined(value)}"
      @cds-date-picker-changed="${onChanged}"
      @cds-date-picker-flatpickr-error="${onFlatpickrError}">
      <cds-date-picker-input
        color-scheme="${ifDefined(colorScheme)}"
        ?hide-label="${hideLabel}"
        ?invalid="${invalid}"
        kind="from"
        label-text="${ifDefined(labelText)}"
        placeholder="${ifDefined(placeholder)}"
        size="${ifDefined(size)}"
        validity-message="${ifDefined(validityMessage)}"
        @input="${onInput}">
      </cds-date-picker-input>
      <cds-date-picker-input
        color-scheme="${ifDefined(colorScheme)}"
        ?hide-label="${hideLabel}"
        ?invalid="${invalid}"
        kind="to"
        label-text="${ifDefined(labelText)}"
        placeholder="${ifDefined(placeholder)}"
        size="${ifDefined(size)}"
        validity-message="${ifDefined(validityMessage)}"
        @input="${onInput}">
      </cds-date-picker-input>
    </cds-date-picker>
  `;
};

rangeWithCalendar.storyName = 'Range with calendar';

rangeWithCalendar.parameters = {
  knobs,
};

export const skeletonSimple = () =>
  html` <cds-date-picker-input-skeleton></cds-date-picker-input-skeleton> `;

skeletonSimple.storyName = 'Skeleton simple';

skeletonSimple.parameters = {
  percy: {
    skip: true,
  },
};

export const skeletonSingle = () =>
  html`
    <cds-date-picker-input-skeleton
      kind="single"></cds-date-picker-input-skeleton>
  `;

skeletonSingle.storyName = 'Skeleton single';

skeletonSingle.parameters = {
  percy: {
    skip: true,
  },
};

export const skeletonRange = () =>
  html`
    <cds-date-picker-input-skeleton
      kind="from"></cds-date-picker-input-skeleton>
    <cds-date-picker-input-skeleton kind="to"></cds-date-picker-input-skeleton>
  `;

skeletonRange.storyName = 'Skeleton range';

skeletonRange.decorators = [(story) => html` <div>${story()}</div> `];

skeletonRange.parameters = {
  percy: {
    skip: true,
  },
};

export default {
  title: 'Components/Date picker',
  parameters: {
    ...storyDocs.parameters,
  },
};
