/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { prefix } from '../../../../globals/settings';
import { iconLoader } from '../../../../globals/internal/icon-loader';
import { INPUT_SIZE } from '../../defs';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import '../components/date-picker';
import '../components/date-picker-input';
import '../components/date-picker-input-skeleton';
import '../components/calendar-renderer';
import '@carbon/web-components/es/components/layer/index.js';
import '@carbon/web-components/es/components/ai-label/index.js';
import { withLayers } from '../../../../../.storybook/decorators/with-layers';

const sizes = {
  [`Small (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  [`Medium (${INPUT_SIZE.MEDIUM})`]: INPUT_SIZE.MEDIUM,
  [`Large (${INPUT_SIZE.LARGE})`]: INPUT_SIZE.LARGE,
};

const defaultArgs = {
  dateFormat: 'm/d/Y',
  disabled: false,
  minDate: '',
  maxDate: '',
  readonly: false,
  short: false,
  helperText: '',
  invalid: false,
  invalidText: '',
  warn: false,
  warnText: '',
  placeholder: 'mm/dd/yyyy',
  size: INPUT_SIZE.MEDIUM,
};

const controls = {
  dateFormat: {
    control: 'text',
    description: 'The date format (e.g., m/d/Y, Y-m-d).',
  },
  disabled: {
    control: 'boolean',
    description: 'Specify whether the date picker should be disabled.',
  },
  helperText: {
    control: 'text',
    description: 'Helper text to display below the input.',
  },
  invalid: {
    control: 'boolean',
    description: 'Specify if the currently value is invalid.',
  },
  invalidText: {
    control: 'text',
    description: 'Message which is displayed if the value is invalid.',
  },
  maxDate: {
    control: 'text',
    description:
      'The maximum date that a user can pick to (ISO format: YYYY-MM-DD).',
  },
  minDate: {
    control: 'text',
    description:
      'The minimum date that a user can start picking from (ISO format: YYYY-MM-DD).',
  },
  placeholder: {
    control: 'text',
    description: 'Placeholder text for the input field.',
  },
  readonly: {
    control: 'boolean',
    description:
      'Whether the DatePicker is to be readOnly. If boolean, applies to all inputs; if array, applies to each input in order.',
  },
  short: {
    control: 'boolean',
    description: '<code>true</code> to use the short version.',
  },
  size: {
    control: 'select',
    options: sizes,
    description: 'Specify the size of the input.',
  },
  warn: {
    control: 'boolean',
    description: 'Specify whether the control is currently in warning state.',
  },
  warnText: {
    control: 'text',
    description:
      'Provide the text that is displayed when the control is in warning state.',
  },
  onChange: {
    action: `${prefix}-date-picker-changed`,
  },
  onInput: {
    action: 'input',
  },
};

export const Default = {
  args: {
    ...defaultArgs,
    kind: 'single',
    dateFormat: 'm/d/Y',
  },
  argTypes: {
    ...controls,
    kind: {
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
  },
  /**
   * Renders the default date picker story
   * @param root0
   * @param root0.dateFormat
   * @param root0.disabled
   * @param root0.invalid
   * @param root0.invalidText
   * @param root0.kind
   * @param root0.maxDate
   * @param root0.minDate
   * @param root0.placeholder
   * @param root0.readonly
   * @param root0.size
   * @param root0.warn
   * @param root0.warnText
   */
  render: ({
    dateFormat,
    disabled,
    invalid,
    invalidText,
    kind,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }) => {
    return html`
      <cds-date-picker
        date-format="${dateFormat}"
        ?disabled="${disabled}"
        max-date="${maxDate}"
        min-date="${minDate}"
        ?readonly="${readonly}">
        <cds-date-picker-input
          kind="${kind === 'range' ? 'from' : kind}"
          label-text="Date Picker label"
          placeholder="${placeholder}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-date-picker-input>
        ${kind === 'range'
          ? html`
              <cds-date-picker-input
                kind="to"
                label-text="End date"
                placeholder="${placeholder}"
                size="${size}"
                ?invalid="${invalid}"
                invalid-text="${invalidText}"
                ?warn="${warn}"
                warn-text="${warnText}">
              </cds-date-picker-input>
            `
          : null}
      </cds-date-picker>
    `;
  },
};

export const RangeWithCalendar = {
  args: defaultArgs,
  argTypes: controls,
  /**
   * Renders the range with calendar date picker story
   * @param root0
   * @param root0.dateFormat
   * @param root0.disabled
   * @param root0.invalid
   * @param root0.invalidText
   * @param root0.maxDate
   * @param root0.minDate
   * @param root0.placeholder
   * @param root0.readonly
   * @param root0.size
   * @param root0.warn
   * @param root0.warnText
   */
  render: ({
    dateFormat,
    disabled,
    invalid,
    invalidText,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }) => {
    return html`
      <cds-date-picker
        date-format="${dateFormat}"
        ?disabled="${disabled}"
        max-date="${maxDate}"
        min-date="${minDate}"
        ?readonly="${readonly}">
        <cds-date-picker-input
          kind="from"
          label-text="Start date"
          placeholder="${placeholder}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-date-picker-input>
        <cds-date-picker-input
          kind="to"
          label-text="End date"
          placeholder="${placeholder}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-date-picker-input>
      </cds-date-picker>
    `;
  },
};

export const RangeWithCalendarWithLayer = {
  decorators: [withLayers],
  args: defaultArgs,
  argTypes: controls,
  /**
   * Renders the range with calendar and layer date picker story
   * @param root0
   * @param root0.dateFormat
   * @param root0.disabled
   * @param root0.invalid
   * @param root0.invalidText
   * @param root0.maxDate
   * @param root0.minDate
   * @param root0.placeholder
   * @param root0.readonly
   * @param root0.size
   * @param root0.warn
   * @param root0.warnText
   */
  render: ({
    dateFormat,
    disabled,
    invalid,
    invalidText,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }) => {
    return html`
      <sb-template-layers>
        <cds-date-picker
          date-format="${dateFormat}"
          ?disabled="${disabled}"
          max-date="${maxDate}"
          min-date="${minDate}"
          ?readonly="${readonly}">
          <cds-date-picker-input
            kind="from"
            label-text="Start date"
            placeholder="${placeholder}"
            size="${size}"
            ?invalid="${invalid}"
            invalid-text="${invalidText}"
            ?warn="${warn}"
            warn-text="${warnText}">
          </cds-date-picker-input>
          <cds-date-picker-input
            kind="to"
            label-text="End date"
            placeholder="${placeholder}"
            size="${size}"
            ?invalid="${invalid}"
            invalid-text="${invalidText}"
            ?warn="${warn}"
            warn-text="${warnText}">
          </cds-date-picker-input>
        </cds-date-picker>
      </sb-template-layers>
    `;
  },
};

export const Simple = {
  args: defaultArgs,
  argTypes: controls,
  /**
   *
   * @param root0
   * @param root0.dateFormat
   * @param root0.disabled
   * @param root0.invalid
   * @param root0.invalidText
   * @param root0.maxDate
   * @param root0.minDate
   * @param root0.placeholder
   * @param root0.readonly
   * @param root0.size
   * @param root0.warn
   * @param root0.warnText
   */
  render: ({
    dateFormat,
    disabled,
    invalid,
    invalidText,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }) => {
    return html`
      <cds-date-picker
        date-format="${dateFormat}"
        max-date="${maxDate}"
        min-date="${minDate}">
        <cds-date-picker-input
          ?disabled="${disabled}"
          label-text="Date Picker label"
          placeholder="${placeholder}"
          ?readonly="${readonly}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-date-picker-input>
      </cds-date-picker>
    `;
  },
};

export const SimpleWithLayer = {
  decorators: [withLayers],
  args: defaultArgs,
  argTypes: controls,
  /**
   *
   * @param root0
   * @param root0.dateFormat
   * @param root0.disabled
   * @param root0.invalid
   * @param root0.invalidText
   * @param root0.maxDate
   * @param root0.minDate
   * @param root0.placeholder
   * @param root0.readonly
   * @param root0.size
   * @param root0.warn
   * @param root0.warnText
   */
  render: ({
    dateFormat,
    disabled,
    invalid,
    invalidText,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }) => {
    return html`
      <sb-template-layers>
        <cds-date-picker
          date-format="${dateFormat}"
          max-date="${maxDate}"
          min-date="${minDate}">
          <cds-date-picker-input
            ?disabled="${disabled}"
            label-text="Date Picker label"
            placeholder="${placeholder}"
            ?readonly="${readonly}"
            size="${size}"
            ?invalid="${invalid}"
            invalid-text="${invalidText}"
            ?warn="${warn}"
            warn-text="${warnText}">
          </cds-date-picker-input>
        </cds-date-picker>
      </sb-template-layers>
    `;
  },
};

export const SingleWithCalendar = {
  args: defaultArgs,
  argTypes: controls,
  /**
   *
   * @param root0
   * @param root0.dateFormat
   * @param root0.disabled
   * @param root0.invalid
   * @param root0.invalidText
   * @param root0.maxDate
   * @param root0.minDate
   * @param root0.placeholder
   * @param root0.readonly
   * @param root0.size
   * @param root0.warn
   * @param root0.warnText
   */
  render: ({
    dateFormat,
    disabled,
    invalid,
    invalidText,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }) => {
    return html`
      <cds-date-picker
        date-format="${dateFormat}"
        ?disabled="${disabled}"
        max-date="${maxDate}"
        min-date="${minDate}"
        ?readonly="${readonly}">
        <cds-date-picker-input
          kind="single"
          label-text="Date Picker label"
          placeholder="${placeholder}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-date-picker-input>
      </cds-date-picker>
    `;
  },
};

export const SingleWithCalendarWithLayer = {
  decorators: [withLayers],
  args: defaultArgs,
  argTypes: controls,
  /**
   *
   * @param root0
   * @param root0.disabled
   * @param root0.dateFormat
   * @param root0.invalid
   * @param root0.invalidText
   * @param root0.maxDate
   * @param root0.minDate
   * @param root0.placeholder
   * @param root0.readonly
   * @param root0.size
   * @param root0.warn
   * @param root0.warnText
   */
  render: ({
    disabled,
    dateFormat,
    invalid,
    invalidText,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }) => {
    return html`
      <sb-template-layers>
        <cds-date-picker
          date-format="${dateFormat}"
          ?disabled="${disabled}"
          max-date="${maxDate}"
          min-date="${minDate}"
          ?readonly="${readonly}">
          <cds-date-picker-input
            kind="single"
            label-text="Date Picker label"
            placeholder="${placeholder}"
            size="${size}"
            ?invalid="${invalid}"
            invalid-text="${invalidText}"
            ?warn="${warn}"
            warn-text="${warnText}">
          </cds-date-picker-input>
        </cds-date-picker>
      </sb-template-layers>
    `;
  },
};

const skeletonControls = {
  hideLabel: {
    control: 'boolean',
    description: 'Specify whether the label should be hidden, or not',
  },
  range: {
    control: 'boolean',
    description: 'Specify whether the skeleton should be of range date picker.',
  },
};

export const Skeleton = {
  args: { hideLabel: false, range: true },
  argTypes: skeletonControls,
  /**
   *
   * @param root0
   * @param root0.hideLabel
   * @param root0.range
   */
  render: ({ hideLabel, range }) => html`
    <cds-date-picker-input-skeleton
      ?hide-label="${hideLabel}"
      ?range="${range}">
    </cds-date-picker-input-skeleton>
  `,
  decorators: [(story) => html` <div>${story()}</div> `],
  parameters: {
    percy: {
      skip: true,
    },
  },
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
  args: defaultArgs,
  argTypes: controls,
  /**
   *
   * @param root0
   * @param root0.dateFormat
   * @param root0.disabled
   * @param root0.invalid
   * @param root0.invalidText
   * @param root0.maxDate
   * @param root0.minDate
   * @param root0.placeholder
   * @param root0.readonly
   * @param root0.size
   * @param root0.warn
   * @param root0.warnText
   */
  render: ({
    dateFormat,
    disabled,
    invalid,
    invalidText,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }) => {
    return html`
      <cds-date-picker
        date-format="${dateFormat}"
        ?disabled="${disabled}"
        max-date="${maxDate}"
        min-date="${minDate}"
        ?readonly="${readonly}">
        <cds-date-picker-input
          kind="single"
          label-text="Date Picker label"
          placeholder="${placeholder}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
          <cds-ai-label alignment="bottom-left">
            ${content}${actions}</cds-ai-label
          >
        </cds-date-picker-input>
      </cds-date-picker>
    `;
  },
};

const meta = {
  title: 'Preview/Date Picker',
  parameters: {
    docs: {
      controls: { exclude: ['calendar'] },
    },
  },
};

export default meta;
