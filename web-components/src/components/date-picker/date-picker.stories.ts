/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { prefix } from '../../globals/settings';
import { INPUT_SIZE } from '../text-input/text-input';
import './date-picker';
import './date-picker-input-skeleton';
import '../layer/index';
import '../../../.storybook/templates/with-layer';

const sizes = {
  [`Small (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  [`Medium (${INPUT_SIZE.MEDIUM})`]: INPUT_SIZE.MEDIUM,
  [`Large (${INPUT_SIZE.LARGE})`]: INPUT_SIZE.LARGE,
};

const defaultArgs = {
  dateFormat: 'm/d/Y',
  disabled: false,
  allowInput: true,
  closeOnSelect: true,
  minDate: '',
  maxDate: '',
  datePickerType: 'single',
  readonly: false,
  short: false,
  helperText: '',
  warning: false,
  warningText: '',
  invalid: false,
  invalidText: '',
  placeholder: 'mm/dd/yyyy',
  size: INPUT_SIZE.MEDIUM,
};

const argTypes = {
  allowInput: {
    control: 'boolean',
    description:
      'Flatpickr prop passthrough enables direct date input, and when set to false, we must clear dates manually by resetting the value prop to empty string making it a controlled input.',
  },
  closeOnSelect: {
    control: 'boolean',
    description:
      'Flatpickr prop passthrough. Controls whether the calendar dropdown closes upon selection.',
  },
  dateFormat: {
    control: 'text',
    description: 'The date format.',
  },
  datePickerType: {
    control: 'radio',
    options: { Single: 'single', Simple: 'simple', Range: 'range' },
    description: `The type of the date picker:
    <ul>
      <li><code>simple</code>
        <ul><li>Without calendar dropdown.</li></ul>
      </li>
      <li><code>single</code>
        <ul><li>With calendar dropdown and single date.</li></ul>
      </li>
      <li><code>range</code>
        <ul><li>With calendar dropdown and a date range.</li></ul>
      </li>
    </ul>`,
  },
  disabled: { control: 'boolean' },
  helperText: { control: 'text' },
  invalid: {
    control: 'boolean',
    description: 'Specify whether or not the control is invalid (Fluid only).',
  },
  invalidText: {
    control: 'text',
    description:
      'Provide the text that is displayed when the control is in error state (Fluid Only).',
  },
  maxDate: {
    control: 'text',
    description: 'The maximum date that a user can pick to.',
  },
  minDate: {
    control: 'text',
    description: 'The minimum date that a user can start picking from.',
  },
  placeholder: { control: 'text' },
  readonly: {
    control: 'boolean',
    description:
      'Whether the DatePicker is to be readOnly if boolean applies to all inputs if array applies to each input in order.',
  },
  short: {
    control: 'boolean',
    description: '<code>true</code> to use the short version.',
  },
  size: { control: 'select', options: sizes },
  warning: {
    control: 'boolean',
    description:
      'Specify whether the control is currently in warning state (Fluid only).',
  },
  warningText: {
    control: 'text',
    description:
      'Provide the text that is displayed when the control is in warning state (Fluid only).',
  },
  onChange: {
    action: `${prefix}-date-picker-changed`,
  },
  onInput: {
    action: 'input',
  },
};

export const Simple = {
  render: () => {
    return html`
      <cds-date-picker>
        <cds-date-picker-input
          label-text="Date Picker label"
          placeholder="mm/dd/yyyy">
        </cds-date-picker-input>
      </cds-date-picker>
    `;
  },
};

export const SimpleWithLayer = {
  render: () => {
    return html`
  <sb-template-layers>
    <cds-date-picker>
    <cds-date-picker-input
      label-text="Date Picker label"
      placeholder="mm/dd/yyyy">
    </cds-date-picker-input>
  </sb-template-layers>
  `;
  },
};

export const SingleWithCalendar = {
  render: () => {
    return html`
      <cds-date-picker>
        <cds-date-picker-input
          kind="single"
          label-text="Date Picker label"
          placeholder="mm/dd/yyyy">
        </cds-date-picker-input>
      </cds-date-picker>
    `;
  },
};

export const SingleWithCalendarWithLayer = {
  render: () => {
    return html`
      <sb-template-layers>
        <cds-date-picker>
          <cds-date-picker-input
            kind="single"
            label-text="Date Picker label"
            placeholder="mm/dd/yyyy">
          </cds-date-picker-input>
        </cds-date-picker>
      </sb-template-layers>
    `;
  },
};

export const RangeWithCalendar = {
  render: () => {
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
  },
};

export const RangeWithCalendarWithLayer = {
  render: () => {
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
  },
};

export const Skeleton = {
  render: () =>
    html`
      <cds-date-picker-input-skeleton
        kind="from"></cds-date-picker-input-skeleton>
      <cds-date-picker-input-skeleton
        kind="to"></cds-date-picker-input-skeleton>
    `,
  decorators: [(story) => html` <div>${story()}</div> `],
  parameters: {
    percy: {
      skip: true,
    },
  },
};

export const Playground = {
  decorators: [(story) => html` <div>${story()}</div> `],
  argTypes,
  args: defaultArgs,
  render: (args) => {
    const {
      disabled,
      dateFormat,
      onChange,
      minDate,
      maxDate,
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
    } = args || {};

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
  },
};

const meta = {
  title: 'Components/Date picker',
};

export default meta;
