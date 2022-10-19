/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import SelectItem from '../../SelectItem';
import TimePicker from '../';
import TimePickerSelect from '../../TimePickerSelect';
import { Layer } from '../../Layer';

export default {
  title: 'Components/TimePicker',
  component: TimePicker,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    light: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    size: 'md',
  },
  subcomponents: {
    TimePickerSelect,
    SelectItem,
  },
};

export const Default = (args) => {
  return (
    <TimePicker id="time-picker" labelText="Select a time" {...args}>
      <TimePickerSelect id="time-picker-select-1">
        <SelectItem value="AM" text="AM" />
        <SelectItem value="PM" text="PM" />
      </TimePickerSelect>
      <TimePickerSelect id="time-picker-select-2">
        <SelectItem value="Time zone 1" text="Time zone 1" />
        <SelectItem value="Time zone 2" text="Time zone 2" />
      </TimePickerSelect>
    </TimePicker>
  );
};

export const WithLayer = (args) => {
  return (
    <>
      <TimePicker id="time-picker" labelText="First layer" {...args}>
        <TimePickerSelect id="time-picker-select-1">
          <SelectItem value="AM" text="AM" />
          <SelectItem value="PM" text="PM" />
        </TimePickerSelect>
        <TimePickerSelect id="time-picker-select-2">
          <SelectItem value="Time zone 1" text="Time zone 1" />
          <SelectItem value="Time zone 2" text="Time zone 2" />
        </TimePickerSelect>
      </TimePicker>
      <Layer>
        <TimePicker id="time-picker" labelText="Second layer" {...args}>
          <TimePickerSelect id="time-picker-select-1">
            <SelectItem value="AM" text="AM" />
            <SelectItem value="PM" text="PM" />
          </TimePickerSelect>
          <TimePickerSelect id="time-picker-select-2">
            <SelectItem value="Time zone 1" text="Time zone 1" />
            <SelectItem value="Time zone 2" text="Time zone 2" />
          </TimePickerSelect>
        </TimePicker>
        <Layer>
          <TimePicker id="time-picker" labelText="Third layer" {...args}>
            <TimePickerSelect id="time-picker-select-1">
              <SelectItem value="AM" text="AM" />
              <SelectItem value="PM" text="PM" />
            </TimePickerSelect>
            <TimePickerSelect id="time-picker-select-2">
              <SelectItem value="Time zone 1" text="Time zone 1" />
              <SelectItem value="Time zone 2" text="Time zone 2" />
            </TimePickerSelect>
          </TimePicker>
        </Layer>
      </Layer>
    </>
  );
};
