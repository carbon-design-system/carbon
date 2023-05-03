/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import SelectItem from '../SelectItem';
import TimePicker from './TimePicker';
import TimePickerSelect from '../TimePickerSelect';
import mdx from './TimePicker.mdx';

export default {
  title: 'Components/TimePicker',
  component: TimePicker,
  subcomponents: {
    TimePickerSelect,
    SelectItem,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  return (
    <TimePicker id="time-picker" labelText="Select a time">
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

export const _WithLayer = () => (
  <WithLayer>
    {(layer) => (
      <TimePicker id={`time-picker-${layer}`} labelText="Select a time">
        <TimePickerSelect id={`time-picker-select-${layer}-1`}>
          <SelectItem value="AM" text="AM" />
          <SelectItem value="PM" text="PM" />
        </TimePickerSelect>
        <TimePickerSelect id={`time-picker-select-${layer}-2`}>
          <SelectItem value="Time zone 1" text="Time zone 1" />
          <SelectItem value="Time zone 2" text="Time zone 2" />
        </TimePickerSelect>
      </TimePicker>
    )}
  </WithLayer>
);

export const Playground = (args) => {
  return (
    <TimePicker id="time-picker" labelText="Select a time" {...args}>
      <TimePickerSelect id="time-picker-select-1" disabled={args.disabled}>
        <SelectItem value="AM" text="AM" />
        <SelectItem value="PM" text="PM" />
      </TimePickerSelect>
      <TimePickerSelect id="time-picker-select-2" disabled={args.disabled}>
        <SelectItem value="Time zone 1" text="Time zone 1" />
        <SelectItem value="Time zone 2" text="Time zone 2" />
      </TimePickerSelect>
    </TimePicker>
  );
};

Playground.argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
  id: {
    table: {
      disable: true,
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  hideLabel: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  invalid: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  invalidText: {
    control: { type: 'text' },
  },
  labelText: {
    control: { type: 'text' },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
  light: {
    table: {
      disable: true,
    },
  },
  pattern: {
    table: {
      disable: true,
    },
  },
};
