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
import { INPUT_SIZE } from '../text-input/text-input';
import './date-picker';
import storyDocs from './date-picker-story.mdx';
import './date-picker-input-skeleton';
import '../layer/index';

const sizes = {
  [`Small (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  [`Medium (${INPUT_SIZE.MEDIUM})`]: INPUT_SIZE.MEDIUM,
  [`Large (${INPUT_SIZE.LARGE})`]: INPUT_SIZE.LARGE,
};

const knobs = {
  [`${prefix}-date-picker`]: () => ({
    dateFormat: textNullable('Date format (date-format)', 'm/d/Y'),
    disabled: boolean('Disabled (disabled)', false),
    allowInput: boolean('Allow input (allow-input)', true),
    closeOnSelect: boolean('Close on select (close-on-select)', true),
    minDate: textNullable('Minimum date in ISO8601 date format (min-date)', ''),
    maxDate: textNullable('Maximum date in ISO8601 date format (max-date)', ''),
    onChange: action(`${prefix}-date-picker-changed`),
  }),
  [`${prefix}-date-picker-input`]: () => ({
    datePickerType: select(
      'Date picker type (date-picker-type)',
      { Single: 'single', Simple: 'simple', Range: 'range' },
      'single'
    ),
    readonly: boolean('ReadOnly (readonly)', false),
    short: boolean('Short (short)', false),
    helperText: textNullable('Helper text (helper-text)', ''),
    warning: boolean('Warning  (warning)', false),
    warningText: textNullable('Warning text (warning-text)', ''),
    invalid: boolean('Invalid  (invalid)', false),
    invalidText: textNullable('Invalid text (invalid-text)', ''),
    placeholder: textNullable('Placeholder text (placeholder)', 'mm/dd/yyyy'),
    size: select('Size (size)', sizes, INPUT_SIZE.MEDIUM),
    onInput: action('input'),
  }),
};
export const Simple = () => {
  return html`
    <cds-date-picker>
      <cds-date-picker-input
        label-text="Date Picker label"
        placeholder="mm/dd/yyyy">
      </cds-date-picker-input>
    </cds-date-picker>
  `;
};

export const SimpleWithLayer = () => {
  return html`
    <cds-layer>
      <cds-date-picker>
        <cds-date-picker-input
          label-text="Date Picker label"
          placeholder="mm/dd/yyyy">
        </cds-date-picker-input>
      </cds-date-picker>
      <cds-layer>
        <cds-date-picker>
          <cds-date-picker-input
            label-text="Date Picker label"
            placeholder="mm/dd/yyyy">
          </cds-date-picker-input>
        </cds-date-picker>
        <cds-layer>
          <cds-date-picker>
            <cds-date-picker-input
              label-text="Date Picker label"
              placeholder="mm/dd/yyyy">
            </cds-date-picker-input>
          </cds-date-picker>
        </cds-layer>
      </cds-layer>
      <cds-layer> </cds-layer
    ></cds-layer>
  `;
};

export const singleWithCalendar = () => {
  return html`
    <cds-date-picker>
      <cds-date-picker-input
        kind="single"
        label-text="Date Picker label"
        placeholder="mm/dd/yyyy">
      </cds-date-picker-input>
    </cds-date-picker>
  `;
};

singleWithCalendar.storyName = 'Single with calendar';

export const singleWithCalendarWithLayer = () => {
  return html`
    <cds-layer>
      <cds-date-picker>
        <cds-date-picker-input
          kind="single"
          label-text="Date Picker label"
          placeholder="mm/dd/yyyy">
        </cds-date-picker-input>
      </cds-date-picker>
      <cds-layer>
        <cds-date-picker>
          <cds-date-picker-input
            kind="single"
            label-text="Date Picker label"
            placeholder="mm/dd/yyyy">
          </cds-date-picker-input>
        </cds-date-picker>
        <cds-layer>
          <cds-date-picker>
            <cds-date-picker-input
              kind="single"
              label-text="Date Picker label"
              placeholder="mm/dd/yyyy">
            </cds-date-picker-input>
          </cds-date-picker>
        </cds-layer>
      </cds-layer>
    </cds-layer>
  `;
};

singleWithCalendarWithLayer.storyName = 'Single with calendar with layer';

export const rangeWithCalendar = () => {
  return html`
    <cds-date-picker>
      <cds-date-picker-input
        kind="from"
        label-text="Start date"
        placeholder="mm/dd/yyyy">
      </cds-date-picker-input>
      <cds-date-picker-input
        kind="to"
        label-text="End date"
        placeholder="mm/dd/yyyy">
      </cds-date-picker-input>
    </cds-date-picker>
  `;
};

rangeWithCalendar.storyName = 'Range with calendar';

export const rangeWithCalendarWithLayer = () => {
  return html`
    <cds-layer>
      <cds-date-picker>
        <cds-date-picker-input
          kind="from"
          label-text="Start date"
          placeholder="mm/dd/yyyy">
        </cds-date-picker-input>
        <cds-date-picker-input
          kind="to"
          label-text="End date"
          placeholder="mm/dd/yyyy">
        </cds-date-picker-input>
      </cds-date-picker>
      <cds-layer>
        <cds-date-picker>
          <cds-date-picker-input
            kind="from"
            label-text="Start date"
            placeholder="mm/dd/yyyy">
          </cds-date-picker-input>
          <cds-date-picker-input
            kind="to"
            label-text="End date"
            placeholder="mm/dd/yyyy">
          </cds-date-picker-input>
        </cds-date-picker>
        <cds-layer>
          <cds-date-picker>
            <cds-date-picker-input
              kind="from"
              label-text="Start date"
              placeholder="mm/dd/yyyy">
            </cds-date-picker-input>
            <cds-date-picker-input
              kind="to"
              label-text="End date"
              placeholder="mm/dd/yyyy">
            </cds-date-picker-input>
          </cds-date-picker>
        </cds-layer>
      </cds-layer>
    </cds-layer>
  `;
};

rangeWithCalendarWithLayer.storyName = 'Range with calendar with layer';

export const Skeleton = () =>
  html`
    <cds-date-picker-input-skeleton
      kind="from"></cds-date-picker-input-skeleton>
    <cds-date-picker-input-skeleton kind="to"></cds-date-picker-input-skeleton>
  `;

Skeleton.storyName = 'Skeleton';

Skeleton.decorators = [(story) => html` <div>${story()}</div> `];

Skeleton.parameters = {
  percy: {
    skip: true,
  },
};

export const Playground = (args) => {
  const { disabled, dateFormat, onChange, minDate, maxDate } =
    args?.['cds-date-picker'] || {};
  const {
    size,
    helperText,
    placeholder,
    invalid,
    invalidText,
    warning,
    warningText,
    short,
    datePickerType,
    readonly,
    onInput,
  } = args?.['cds-date-picker-input'] || {};

  return html`
    <cds-date-picker
      ?disabled="${disabled}"
      date-format="${dateFormat}"
      ?readonly="${readonly}"
      min-date="${minDate}"
      max-date="${maxDate}"
      @cds-date-picker-changed="${onChange}">
      ${datePickerType === 'range'
        ? html`
            <cds-date-picker-input
              kind="from"
              label-text="Date Picker label"
              size="${size}"
              placeholder="${placeholder}"
              ?invalid="${invalid}"
              invalid-text="${invalidText}"
              ?short="${short}"
              ?warn="${warning}"
              warn-text="${warningText}"
              @input="${onInput}">
              ${helperText
                ? html`<span slot="helper-text">${helperText}</span>`
                : html``}
            </cds-date-picker-input>
            <cds-date-picker-input
              kind="to"
              label-text="Date Picker label"
              size="${size}"
              placeholder="${placeholder}"
              ?invalid="${invalid}"
              invalid-text="${invalidText}"
              ?short="${short}"
              ?warn="${warning}"
              warn-text="${warningText}"
              @input="${onInput}">
              ${helperText
                ? html`<span slot="helper-text">${helperText}</span>`
                : html``}
            </cds-date-picker-input>
          `
        : html`
            <cds-date-picker-input
              kind="${datePickerType}"
              label-text="Date Picker label"
              size="${size}"
              placeholder="${placeholder}"
              ?invalid="${invalid}"
              invalid-text="${invalidText}"
              ?short="${short}"
              ?warn="${warning}"
              warn-text="${warningText}"
              @input="${onInput}">
              ${helperText
                ? html`<span slot="helper-text">${helperText}</span>`
                : html``}
            </cds-date-picker-input>
          `}
    </cds-date-picker>
  `;
};

Playground.storyName = 'Playground';

Playground.decorators = [(story) => html` <div>${story()}</div> `];

Playground.parameters = {
  knobs,
};

export default {
  title: 'Components/Date picker',
  parameters: {
    ...storyDocs.parameters,
  },
};
