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
    controls: {
      exclude: ['children', 'inputClassName', 'pickerClassName', 'id', 'light'],
    },
  },
};

const sharedArgs = {
  className: '',
  disabled: false,
  hideLabel: false,
  invalid: false,
  invalidText: 'Enter a valid time',
  labelText: 'Meeting time',
  maxLength: 5,
  pattern: `(1[012]|[1-9]):[0-5][0-9](\\s)?`,
  placeholder: 'hh:mm',
  readOnly: false,
  size: 'md',
  type: 'text',
  value: '10:30',
  warning: false,
  warningText: 'The selected time is outside business hours',
};

const sharedArgTypes = {
  className: {
    control: { type: 'text' },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  hideLabel: {
    control: {
      type: 'boolean',
    },
  },
  invalid: {
    control: {
      type: 'boolean',
    },
  },
  invalidText: {
    control: { type: 'text' },
  },
  labelText: {
    control: { type: 'text' },
  },
  maxLength: {
    control: { type: 'number' },
  },
  onBlur: {
    action: 'onBlur',
  },
  onChange: {
    action: 'onChange',
  },
  onClick: {
    action: 'onClick',
  },
  pattern: {
    control: { type: 'text' },
  },
  placeholder: {
    control: { type: 'text' },
  },
  readOnly: {
    control: {
      type: 'boolean',
    },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
  type: {
    control: { type: 'text' },
  },
  value: {
    control: { type: 'text' },
  },
  warning: {
    control: {
      type: 'boolean',
    },
  },
  warningText: {
    control: { type: 'text' },
  },
};

export const Default = (args) => {
  return (
    <TimePicker id="time-picker" {...args}>
      <TimePickerSelect id="time-picker-select-1">
        <SelectItem value="AM" text="AM" />
        <SelectItem value="PM" text="PM" />
      </TimePickerSelect>
      <TimePickerSelect id="time-picker-select-2">
        <SelectItem value="America/New_York" text="Eastern time" />
        <SelectItem value="America/Chicago" text="Central time" />
      </TimePickerSelect>
    </TimePicker>
  );
};

Default.args = sharedArgs;

Default.argTypes = sharedArgTypes;

export const _WithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <TimePicker id={`time-picker-${layer}`} {...args}>
        <TimePickerSelect id={`time-picker-select-${layer}-1`}>
          <SelectItem value="AM" text="AM" />
          <SelectItem value="PM" text="PM" />
        </TimePickerSelect>
        <TimePickerSelect id={`time-picker-select-${layer}-2`}>
          <SelectItem value="America/New_York" text="Eastern time" />
          <SelectItem value="America/Chicago" text="Central time" />
        </TimePickerSelect>
      </TimePicker>
    )}
  </WithLayer>
);

_WithLayer.args = sharedArgs;

_WithLayer.argTypes = sharedArgTypes;
