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
import '../../../layer/index';
import '../../../ai-label';
import { withLayers } from '../../../../../.storybook/decorators/with-layers';

const sizes = {
  [`Small (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  [`Medium (${INPUT_SIZE.MEDIUM})`]: INPUT_SIZE.MEDIUM,
  [`Large (${INPUT_SIZE.LARGE})`]: INPUT_SIZE.LARGE,
};

const defaultArgs = {
  dateFormat: 'm/d/Y',
  disabled: false,
  locale: 'en',
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
  locale: {
    control: 'text',
    description:
      'BCP 47 locale tag used to localize the calendar month and weekday labels. Open the calendar to see the effect.',
  },
  maxDate: {
    control: 'text',
    description:
      'The maximum date that a user can pick to (mm/dd/yyyy format).',
  },
  minDate: {
    control: 'text',
    description:
      'The minimum date that a user can start picking from (mm/dd/yyyy format).',
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
    action: `${prefix}-preview-date-picker-changed`,
  },
  onInput: {
    action: 'input',
  },
};

// Mock events, generated relative to today so the story always shows events
// in the visible month, whenever it is opened.
const eventKinds = {
  meeting: {
    label: 'Meeting',
    color: `var(--${prefix}-support-caution-undefined)`,
  },
  deadline: { label: 'Deadline', color: `var(--${prefix}-support-warning)` },
  reminder: { label: 'Reminder', color: `var(--${prefix}-support-success)` },
};

const mockEventOffsets = {
  '-6': ['meeting'],
  '-3': ['meeting', 'deadline'],
  '-1': ['reminder'],
  '0': ['meeting', 'reminder'],
  '2': ['deadline'],
  '4': ['meeting', 'deadline', 'reminder'],
  '5': ['meeting', 'meeting', 'meeting', 'deadline'],
  '7': ['reminder'],
};

const getMockEvents = () => {
  const today = Temporal.Now.plainDateISO();
  return new Map(
    Object.entries(mockEventOffsets).map(([offset, kinds]) => [
      today.add({ days: Number(offset) }).toString(),
      kinds,
    ])
  );
};

// A day is fully booked when it has three or more events
const fullyBookedThreshold = 3;

const dayContentStyle =
  'position: relative; display: flex; align-items: center; justify-content: center; inline-size: 100%; block-size: 100%;';

const dayRenderers = {
  // 1. Up to three color-coded dots, one per event
  'Event dots': (day, events) => html`
    <span style="${dayContentStyle}">
      ${day.date.day}
      ${events.length > 0
        ? html`<span
            aria-hidden="true"
            style="position: absolute; inset-block-start: 4px; display: flex; gap: 2px;">
            ${events
              .slice(0, 3)
              .map(
                (kind) =>
                  html`<span
                    style="inline-size: 4px; block-size: 4px; border-radius: 50%; background-color: ${day.isSelected
                      ? 'currentColor'
                      : eventKinds[kind].color};"></span>`
              )}
          </span>`
        : ''}
    </span>
  `,
  // 2. Event days get a neutral background behind the number
  'Event background': (day, events) => html`
    <span style="${dayContentStyle}">
      ${events.length > 0 && !day.isSelected
        ? html`<span
            aria-hidden="true"
            style="position: absolute; inline-size: 1.5rem; block-size: 1.25rem; border-radius: 0.25rem; background-color: var(--${prefix}-layer-accent-01);"></span>`
        : ''}
      <span style="position: relative;">${day.date.day}</span>
    </span>
  `,
  // 3. A numeric badge: shows the count as text, not only as color
  'Event count': (day, events) => html`
    <span style="${dayContentStyle}">
      ${day.date.day}
      ${events.length > 0
        ? html`<span
            aria-hidden="true"
            style="position: absolute; inset-block-start: 2px; inset-inline-end: 4px; font-size: 0.625rem; line-height: 1; color: ${day.isSelected
              ? 'currentColor'
              : `var(--${prefix}-text-secondary)`};">
            ${events.length}
          </span>`
        : ''}
    </span>
  `,
  // 4. Fully booked days are struck through but stay selectable
  Availability: (day, events) => html`
    <span
      style="${dayContentStyle} ${events.length >= fullyBookedThreshold
        ? 'text-decoration: line-through;'
        : ''}">
      ${day.date.day}
    </span>
  `,
};

const describeEvents = (dayRenderer, events) => {
  if (events.length === 0) {
    return '';
  }
  if (dayRenderer === 'Availability') {
    return events.length >= fullyBookedThreshold ? 'fully booked' : '';
  }
  const kinds = events
    .filter((kind, index) => events.indexOf(kind) === index)
    .map((kind) => eventKinds[kind].label);
  return `${events.length} ${events.length === 1 ? 'event' : 'events'}: ${kinds.join(', ')}`;
};

// Returns the `renderDay` and `getDayLabel` for the `dayRenderer` control
const getDayRendererProps = (dayRenderer) => {
  if (!dayRenderers[dayRenderer]) {
    return {};
  }
  const events = getMockEvents();
  const getEvents = (day) => events.get(day.date.toString()) ?? [];
  return {
    renderDay: (day) => dayRenderers[dayRenderer](day, getEvents(day)),
    getDayLabel: (day) =>
      [day.label, describeEvents(dayRenderer, getEvents(day))]
        .filter(Boolean)
        .join(', '),
  };
};

export const Default = {
  args: {
    ...defaultArgs,
    kind: 'single',
    dateFormat: 'm/d/Y',
  },
  argTypes: {
    ...controls,
    dayRenderer: {
      description:
        'Example `renderDay` and `getDayLabel` implementations using mock events around today. Event dots: purple for meetings, yellow for deadlines, green for reminders. Event background: event days get a neutral background. Event count: number of events. Availability: struck-through days are fully booked.',
      options: Object.keys(dayRenderers),
      control: 'select',
    },
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
  render: ({
    dateFormat,
    dayRenderer,
    disabled,
    invalid,
    invalidText,
    kind,
    locale,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }) => {
    const { renderDay, getDayLabel } = getDayRendererProps(dayRenderer);
    return html`
      <cds-preview-date-picker
        date-format="${dateFormat}"
        ?disabled="${disabled}"
        locale="${locale}"
        max-date="${maxDate}"
        min-date="${minDate}"
        ?readonly="${readonly}"
        .renderDay="${renderDay}"
        .getDayLabel="${getDayLabel}">
        <cds-preview-date-picker-input
          kind="${kind === 'range' ? 'from' : kind}"
          label-text="Date Picker label"
          placeholder="${placeholder}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-preview-date-picker-input>
        ${kind === 'range'
          ? html`
              <cds-preview-date-picker-input
                kind="to"
                label-text="End date"
                placeholder="${placeholder}"
                size="${size}"
                ?invalid="${invalid}"
                invalid-text="${invalidText}"
                ?warn="${warn}"
                warn-text="${warnText}">
              </cds-preview-date-picker-input>
            `
          : null}
      </cds-preview-date-picker>
    `;
  },
};

export const RangeWithCalendar = {
  args: defaultArgs,
  argTypes: controls,
  render: ({
    dateFormat,
    disabled,
    invalid,
    invalidText,
    locale,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }) => {
    return html`
      <cds-preview-date-picker
        date-format="${dateFormat}"
        ?disabled="${disabled}"
        locale="${locale}"
        max-date="${maxDate}"
        min-date="${minDate}"
        ?readonly="${readonly}">
        <cds-preview-date-picker-input
          kind="from"
          label-text="Start date"
          placeholder="${placeholder}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-preview-date-picker-input>
        <cds-preview-date-picker-input
          kind="to"
          label-text="End date"
          placeholder="${placeholder}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-preview-date-picker-input>
      </cds-preview-date-picker>
    `;
  },
};

export const RangeWithCalendarWithLayer = {
  decorators: [withLayers],
  args: defaultArgs,
  argTypes: controls,
  render: ({
    dateFormat,
    disabled,
    invalid,
    invalidText,
    locale,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }) => {
    return html`
      <cds-preview-date-picker
        date-format="${dateFormat}"
        ?disabled="${disabled}"
        locale="${locale}"
        max-date="${maxDate}"
        min-date="${minDate}"
        ?readonly="${readonly}">
        <cds-preview-date-picker-input
          kind="from"
          label-text="Start date"
          placeholder="${placeholder}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-preview-date-picker-input>
        <cds-preview-date-picker-input
          kind="to"
          label-text="End date"
          placeholder="${placeholder}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-preview-date-picker-input>
      </cds-preview-date-picker>
    `;
  },
};

export const Simple = {
  args: defaultArgs,
  argTypes: controls,
  render: ({
    dateFormat,
    disabled,
    invalid,
    invalidText,
    locale,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }) => {
    return html`
      <cds-preview-date-picker
        date-format="${dateFormat}"
        locale="${locale}"
        max-date="${maxDate}"
        min-date="${minDate}">
        <cds-preview-date-picker-input
          ?disabled="${disabled}"
          label-text="Date Picker label"
          placeholder="${placeholder}"
          ?readonly="${readonly}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-preview-date-picker-input>
      </cds-preview-date-picker>
    `;
  },
};

export const SimpleWithLayer = {
  decorators: [withLayers],
  args: defaultArgs,
  argTypes: controls,
  render: ({
    dateFormat,
    disabled,
    invalid,
    invalidText,
    locale,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }) => {
    return html`
      <cds-preview-date-picker
        date-format="${dateFormat}"
        locale="${locale}"
        max-date="${maxDate}"
        min-date="${minDate}">
        <cds-preview-date-picker-input
          ?disabled="${disabled}"
          label-text="Date Picker label"
          placeholder="${placeholder}"
          ?readonly="${readonly}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-preview-date-picker-input>
      </cds-preview-date-picker>
    `;
  },
};

export const SingleWithCalendar = {
  args: defaultArgs,
  argTypes: controls,
  render: ({
    dateFormat,
    disabled,
    invalid,
    invalidText,
    locale,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }) => {
    return html`
      <cds-preview-date-picker
        date-format="${dateFormat}"
        ?disabled="${disabled}"
        locale="${locale}"
        max-date="${maxDate}"
        min-date="${minDate}"
        ?readonly="${readonly}">
        <cds-preview-date-picker-input
          kind="single"
          label-text="Date Picker label"
          placeholder="${placeholder}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-preview-date-picker-input>
      </cds-preview-date-picker>
    `;
  },
};

export const SingleWithCalendarWithLayer = {
  decorators: [withLayers],
  args: defaultArgs,
  argTypes: controls,
  render: ({
    disabled,
    dateFormat,
    invalid,
    invalidText,
    locale,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }) => {
    return html`
      <cds-preview-date-picker
        date-format="${dateFormat}"
        ?disabled="${disabled}"
        locale="${locale}"
        max-date="${maxDate}"
        min-date="${minDate}"
        ?readonly="${readonly}">
        <cds-preview-date-picker-input
          kind="single"
          label-text="Date Picker label"
          placeholder="${placeholder}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-preview-date-picker-input>
      </cds-preview-date-picker>
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
  render: ({ hideLabel, range }) => html`
    <cds-preview-date-picker-input-skeleton
      ?hide-label="${hideLabel}"
      ?range="${range}">
    </cds-preview-date-picker-input-skeleton>
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
  render: ({
    dateFormat,
    disabled,
    invalid,
    invalidText,
    locale,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }) => {
    return html`
      <cds-preview-date-picker
        date-format="${dateFormat}"
        ?disabled="${disabled}"
        locale="${locale}"
        max-date="${maxDate}"
        min-date="${minDate}"
        ?readonly="${readonly}">
        <cds-preview-date-picker-input
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
        </cds-preview-date-picker-input>
      </cds-preview-date-picker>
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
