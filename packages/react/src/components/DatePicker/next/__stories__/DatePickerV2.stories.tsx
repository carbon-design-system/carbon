/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { WithLayer } from '../../../../../.storybook/templates/WithLayer';
import { AILabel, AILabelContent, AILabelActions } from '../../../AILabel';
import { IconButton } from '../../../IconButton';
import Button from '../../../Button';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import { DatePicker } from '../components/DatePicker';
import { DatePickerInput } from '../components/DatePickerInput';
import { DatePickerSkeleton } from '../components/DatePickerSkeleton';
import mdx from './DatePickerV2.mdx';

export default {
  title: 'Preview/preview__DatePicker',
  component: DatePicker,
  subcomponents: {
    DatePickerInput,
  },

  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
  },
};

const sharedArgTypes = {
  onChange: {
    action: 'onChange',
  },
  onClose: {
    action: 'onClose',
  },
  onOpen: {
    action: 'onOpen',
  },
  readOnly: {
    control: {
      type: 'boolean',
    },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
    table: {
      category: 'DatePickerInput',
    },
  },
  disabled: {
    control: { type: 'boolean' },
    table: {
      category: 'DatePickerInput',
    },
  },
  invalid: {
    control: { type: 'boolean' },
    table: {
      category: 'DatePickerInput',
    },
  },
  invalidText: {
    control: { type: 'text' },
    table: {
      category: 'DatePickerInput',
    },
  },
  placeholder: {
    control: { type: 'text' },
    table: {
      category: 'DatePickerInput',
    },
  },
  warn: {
    control: { type: 'boolean' },
    table: {
      category: 'DatePickerInput',
    },
  },
  warnText: {
    control: { type: 'text' },
    table: {
      category: 'DatePickerInput',
    },
  },
  helperText: {
    control: { type: 'text' },
    table: {
      category: 'DatePickerInput',
    },
  },
};

// Mock events, generated relative to today so the story always shows events
// in the visible month, whenever it is opened.
const eventKinds = {
  meeting: { label: 'Meeting', color: 'var(--cds-support-info)' },
  deadline: { label: 'Deadline', color: 'var(--cds-support-error)' },
  reminder: { label: 'Reminder', color: 'var(--cds-support-success)' },
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

const dayContentStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  inlineSize: '100%',
  blockSize: '100%',
} as const;

const dayRenderers = {
  // 1. Up to three color-coded dots, one per event
  'Event dots': (day, events) => (
    <span style={dayContentStyle}>
      {day.date.day}
      {events.length > 0 && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            insetBlockStart: 4,
            display: 'flex',
            gap: 2,
          }}>
          {events.slice(0, 3).map((kind, index) => (
            <span
              key={index}
              style={{
                inlineSize: 4,
                blockSize: 4,
                borderRadius: '50%',
                backgroundColor: day.isSelected
                  ? 'currentColor'
                  : eventKinds[kind].color,
              }}
            />
          ))}
        </span>
      )}
    </span>
  ),
  // 2. A numeric badge: shows the count as text, not only as color
  'Event count': (day, events) => (
    <span style={dayContentStyle}>
      {day.date.day}
      {events.length > 0 && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            insetBlockStart: 2,
            insetInlineEnd: 4,
            fontSize: '0.625rem',
            lineHeight: 1,
            color: day.isSelected
              ? 'currentColor'
              : 'var(--cds-text-secondary)',
          }}>
          {events.length}
        </span>
      )}
    </span>
  ),
  // 3. Fully booked days are struck through but stay selectable
  Availability: (day, events) => (
    <span
      style={{
        ...dayContentStyle,
        textDecoration:
          events.length >= fullyBookedThreshold ? 'line-through' : undefined,
      }}>
      {day.date.day}
    </span>
  ),
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

export const Default = (args) => {
  const { readOnly, dayRenderer, ...restArgs } = args;

  return (
    <DatePicker
      datePickerType="single"
      {...restArgs}
      {...getDayRendererProps(dayRenderer)}
      readOnly={readOnly}>
      <DatePickerInput
        placeholder="mm/dd/yyyy"
        labelText="Date Picker label"
        id="date-picker-single"
        {...restArgs}
      />
      {restArgs.datePickerType === 'range' && (
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="End date"
          size="md"
          id="date-picker-input-2"
          {...restArgs}
        />
      )}
    </DatePicker>
  );
};

Default.args = { dayRenderer: 'undefined' };

Default.argTypes = {
  ...sharedArgTypes,
  dayRenderer: {
    description:
      'Example `renderDay` and `getDayLabel` implementations using mock events around today. Event dots: blue for meetings, red for deadlines, green for reminders. Event count: number of events. Availability: struck-through days are fully booked.',
    options: ['undefined', ...Object.keys(dayRenderers)],
    control: { type: 'select' },
  },
  datePickerType: {
    options: ['single', 'simple', 'range'],
    control: { type: 'select' },
  },
};

export const RangeWithCalendar = (args) => {
  return (
    <DatePicker datePickerType="range" {...args}>
      <DatePickerInput
        id="date-picker-input-id-start"
        placeholder="mm/dd/yyyy"
        labelText="Start date"
        size="md"
        {...args}
      />
      <DatePickerInput
        id="date-picker-input-id-finish"
        placeholder="mm/dd/yyyy"
        labelText="End date"
        size="md"
        {...args}
      />
    </DatePicker>
  );
};

RangeWithCalendar.argTypes = { ...sharedArgTypes };

export const RangeWithCalendarWithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <DatePicker datePickerType="range" {...args}>
        <DatePickerInput
          id={`date-picker-input-id-start-${layer}`}
          placeholder="mm/dd/yyyy"
          labelText="Start date"
          size="md"
          {...args}
        />
        <DatePickerInput
          id={`date-picker-input-id-finish-${layer}`}
          placeholder="mm/dd/yyyy"
          labelText="End date"
          size="md"
          {...args}
        />
      </DatePicker>
    )}
  </WithLayer>
);

RangeWithCalendarWithLayer.argTypes = { ...sharedArgTypes };

export const Simple = (args) => (
  <DatePicker datePickerType="simple" {...args}>
    <DatePickerInput
      placeholder="mm/dd/yyyy"
      labelText="Date Picker label"
      id="date-picker-simple"
      {...args}
    />
  </DatePicker>
);

Simple.argTypes = { ...sharedArgTypes };

export const SimpleWithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <DatePicker datePickerType="simple" {...args}>
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          id={`date-picker-simple-${layer}`}
          size="md"
          {...args}
        />
      </DatePicker>
    )}
  </WithLayer>
);

SimpleWithLayer.argTypes = { ...sharedArgTypes };

export const SingleWithCalendar = (args) => (
  <DatePicker datePickerType="single" {...args}>
    <DatePickerInput
      placeholder="mm/dd/yyyy"
      labelText="Date Picker label"
      id="date-picker-single"
      size="md"
      {...args}
    />
  </DatePicker>
);

SingleWithCalendar.argTypes = { ...sharedArgTypes };

export const SingleWithCalendarWithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <DatePicker datePickerType="single" {...args}>
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          id={`date-picker-single-${layer}`}
          size="md"
          {...args}
        />
      </DatePicker>
    )}
  </WithLayer>
);

SingleWithCalendarWithLayer.argTypes = { ...sharedArgTypes };

export const Skeleton = () => <DatePickerSkeleton range />;

Skeleton.parameters = {
  percy: {
    skip: true,
  },
};

export const withAILabel = (args) => {
  const aiLabel = (
    <AILabel className="ai-label-container">
      <AILabelContent>
        <div>
          <p className="secondary">AI Explained</p>
          <h2 className="ai-label-heading">84%</h2>
          <p className="secondary bold">Confidence score</p>
          <p className="secondary">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
          </p>
          <hr />
          <p className="secondary">Model type</p>
          <p className="bold">Foundation model</p>
        </div>
        <AILabelActions>
          <IconButton kind="ghost" label="View">
            <View />
          </IconButton>
          <IconButton kind="ghost" label="Open Folder">
            <FolderOpen />
          </IconButton>
          <IconButton kind="ghost" label="Folders">
            <Folders />
          </IconButton>
          <Button>View details</Button>
        </AILabelActions>
      </AILabelContent>
    </AILabel>
  );
  return (
    <div style={{ width: 400 }}>
      <DatePicker datePickerType="single" {...args}>
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          size="md"
          id="date-picker"
          decorator={aiLabel}
          {...args}
        />
      </DatePicker>
    </div>
  );
};

withAILabel.argTypes = { ...sharedArgTypes };
