import React from 'react';
import { storiesOf } from '@storybook/react';
import TimePicker from '../TimePicker';
import TimePickerSelect from '../TimePickerSelect';
import SelectItem from '../SelectItem';

storiesOf('TimePicker', module)
  .addWithInfo(
    'Default',
    `
      The time picker allow users to select a time.
    `,
    () => (
      <TimePicker id="time-picker" labelText="Select a time">
        <TimePickerSelect id="time-picker-select-1" labelText="Choose AM or PM">
          <SelectItem value="AM" text="AM" />
          <SelectItem value="PM" text="PM" />
        </TimePickerSelect>
        <TimePickerSelect
          id="time-picker-select-2"
          labelText="Choose a timezone">
          <SelectItem value="Timezone 1" text="Timezone 1" />
          <SelectItem value="Timezone 2" text="Timezone 2" />
        </TimePickerSelect>
      </TimePicker>
    )
  )
  .addWithInfo(
    'light',
    `
      The time picker allow users to select a time.
    `,
    () => (
      <TimePicker id="time-picker" labelText="Select a time" light>
        <TimePickerSelect id="time-picker-select-1" labelText="Choose AM or PM">
          <SelectItem value="AM" text="AM" />
          <SelectItem value="PM" text="PM" />
        </TimePickerSelect>
        <TimePickerSelect
          id="time-picker-select-2"
          labelText="Choose a timezone">
          <SelectItem value="Timezone 1" text="Timezone 1" />
          <SelectItem value="Timezone 2" text="Timezone 2" />
        </TimePickerSelect>
      </TimePicker>
    )
  );
