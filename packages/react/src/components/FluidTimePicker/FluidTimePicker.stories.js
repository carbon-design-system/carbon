/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidTimePicker from '../FluidTimePicker';
import FluidTimePickerSelect from '../FluidTimePickerSelect';
// import FluidTimePickerSkeleton from './FluidTimePicker.Skeleton';
import SelectItem from '../SelectItem';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from '../Toggletip';
import { Information } from '@carbon/icons-react';

export default {
  title: 'Experimental/unstable__FluidTimePicker',
  component: FluidTimePicker,
};

const ToggleTip = (
  <>
    <ToggletipLabel>Clock</ToggletipLabel>
    <Toggletip align="top-left">
      <ToggletipButton label="Show information">
        <Information />
      </ToggletipButton>
      <ToggletipContent>
        <p>Additional field information here.</p>
      </ToggletipContent>
    </Toggletip>
  </>
);

export const Default = () => (
  <div style={{ width: '350px' }}>
    <FluidTimePicker id="time-picker-1" labelText="Time" placeholder="hh:mm">
      <FluidTimePickerSelect id="select-1" labelText={ToggleTip}>
        <SelectItem value="am" text="AM" />
        <SelectItem value="pm" text="PM" />
      </FluidTimePickerSelect>
      <FluidTimePickerSelect id="select-2" labelText="Timezone">
        <SelectItem value="et" text="Eastern Time (ET)" />
        <SelectItem value="ct" text="Central Time (CT)" />
        <SelectItem value="mt" text="Mountain Time (MT)" />
        <SelectItem value="pt" text="Pacific Time (PT)" />
      </FluidTimePickerSelect>
    </FluidTimePicker>
    <br />
    <br />
    <FluidTimePicker id="time-picker-2" labelText="Time" placeholder="hh:mm">
      <FluidTimePickerSelect id="select-3" labelText={ToggleTip}>
        <SelectItem value="am" text="AM" />
        <SelectItem value="pm" text="PM" />
      </FluidTimePickerSelect>
    </FluidTimePicker>
  </div>
);

export const Invalid = () => (
  <>
    <div style={{ width: '350px' }}>
      <FluidTimePicker
        id="time-picker-1"
        labelText="Time"
        placeholder="hh:mm"
        invalid
        invalidText="Error message goes here">
        <FluidTimePickerSelect id="select-1" labelText={ToggleTip}>
          <SelectItem value="am" text="AM" />
          <SelectItem value="pm" text="PM" />
        </FluidTimePickerSelect>
        <FluidTimePickerSelect id="select-2" labelText="Timezone">
          <SelectItem value="et" text="Eastern Time (ET)" />
          <SelectItem value="ct" text="Central Time (CT)" />
          <SelectItem value="mt" text="Mountain Time (MT)" />
          <SelectItem value="pt" text="Pacific Time (PT)" />
        </FluidTimePickerSelect>
      </FluidTimePicker>
    </div>
    <br />
    <br />
    <div style={{ width: '350px' }}>
      <FluidTimePicker
        id="time-picker-2"
        labelText="Time"
        placeholder="hh:mm"
        invalid
        invalidText="Error message goes here">
        <FluidTimePickerSelect id="select-3" labelText={ToggleTip}>
          <SelectItem value="am" text="AM" />
          <SelectItem value="pm" text="PM" />
        </FluidTimePickerSelect>
      </FluidTimePicker>
    </div>
    <br />
    <br />
    <div style={{ width: '350px' }}>
      <FluidTimePicker id="time-picker-3" labelText="Time" placeholder="hh:mm">
        <FluidTimePickerSelect id="select-4" labelText={ToggleTip}>
          <SelectItem value="am" text="AM" />
          <SelectItem value="pm" text="PM" />
        </FluidTimePickerSelect>
        <FluidTimePickerSelect
          id="select-5"
          labelText="Timezone"
          invalid
          invalidText="Error message goes here">
          <SelectItem value="et" text="Eastern Time (ET)" />
          <SelectItem value="ct" text="Central Time (CT)" />
          <SelectItem value="mt" text="Mountain Time (MT)" />
          <SelectItem value="pt" text="Pacific Time (PT)" />
        </FluidTimePickerSelect>
      </FluidTimePicker>
    </div>
    <br />
    <br />
    <div style={{ width: '350px' }}>
      <FluidTimePicker id="time-picker-4" labelText="Time" placeholder="hh:mm">
        <FluidTimePickerSelect
          invalid
          invalidText="Error message goes here"
          id="select-6"
          labelText={ToggleTip}>
          <SelectItem value="am" text="AM" />
          <SelectItem value="pm" text="PM" />
        </FluidTimePickerSelect>
      </FluidTimePicker>
    </div>
  </>
);

export const Warning = () => (
  <>
    <div style={{ width: '350px' }}>
      <FluidTimePicker
        id="time-picker-1"
        labelText="Time"
        placeholder="hh:mm"
        warn
        warnText="Warning message goes here">
        <FluidTimePickerSelect id="select-1" labelText={ToggleTip}>
          <SelectItem value="am" text="AM" />
          <SelectItem value="pm" text="PM" />
        </FluidTimePickerSelect>
        <FluidTimePickerSelect id="select-2" labelText="Timezone">
          <SelectItem value="et" text="Eastern Time (ET)" />
          <SelectItem value="ct" text="Central Time (CT)" />
          <SelectItem value="mt" text="Mountain Time (MT)" />
          <SelectItem value="pt" text="Pacific Time (PT)" />
        </FluidTimePickerSelect>
      </FluidTimePicker>
    </div>
    <br />
    <br />

    <div style={{ width: '350px' }}>
      <FluidTimePicker
        id="time-picker-2"
        labelText="Time"
        placeholder="hh:mm"
        warn
        warnText="Warning message goes here">
        <FluidTimePickerSelect id="select-3" labelText={ToggleTip}>
          <SelectItem value="am" text="AM" />
          <SelectItem value="pm" text="PM" />
        </FluidTimePickerSelect>
      </FluidTimePicker>
    </div>
    <br />
    <br />
    <div style={{ width: '350px' }}>
      <FluidTimePicker id="time-picker-3" labelText="Time" placeholder="hh:mm">
        <FluidTimePickerSelect id="select-4" labelText={ToggleTip}>
          <SelectItem value="am" text="AM" />
          <SelectItem value="pm" text="PM" />
        </FluidTimePickerSelect>
        <FluidTimePickerSelect
          id="select-5"
          labelText="Timezone"
          warn
          warnText="Warning message goes here">
          <SelectItem value="et" text="Eastern Time (ET)" />
          <SelectItem value="ct" text="Central Time (CT)" />
          <SelectItem value="mt" text="Mountain Time (MT)" />
          <SelectItem value="pt" text="Pacific Time (PT)" />
        </FluidTimePickerSelect>
      </FluidTimePicker>
    </div>
    <br />
    <br />
    <div style={{ width: '350px' }}>
      <FluidTimePicker id="time-picker-4" labelText="Time" placeholder="hh:mm">
        <FluidTimePickerSelect
          warn
          warnText="Warning message goes here"
          id="select-6"
          labelText={ToggleTip}>
          <SelectItem value="am" text="AM" />
          <SelectItem value="pm" text="PM" />
        </FluidTimePickerSelect>
      </FluidTimePicker>
    </div>
  </>
);

// export const Skeleton = () => (
//   <div style={{ width: '300px' }}>
//     <FluidTimePickerSkeleton />
//   </div>
// );

export const Playground = (args) => {
  return (
    <div style={{ width: '350px' }}>
      <FluidTimePicker id="time-picker-1" {...args}>
        <FluidTimePickerSelect id="select-1" labelText={ToggleTip}>
          <SelectItem value="am" text="AM" />
          <SelectItem value="pm" text="PM" />
        </FluidTimePickerSelect>
        <FluidTimePickerSelect id="select-2" labelText="Timezone">
          <SelectItem value="et" text="Eastern Time (ET)" />
          <SelectItem value="ct" text="Central Time (CT)" />
          <SelectItem value="mt" text="Mountain Time (MT)" />
          <SelectItem value="pt" text="Pacific Time (PT)" />
        </FluidTimePickerSelect>
      </FluidTimePicker>
    </div>
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
  disabled: {
    control: { type: 'boolean' },
  },
  labelText: {
    control: { type: 'string' },
    defaultValue: 'Time',
  },
  invalid: {
    control: { type: 'boolean' },
  },
  invalidText: {
    control: { type: 'text' },
    defaultValue:
      'Error message that is really long can wrap to more lines but should not be excessively long.',
  },
  placeholder: {
    control: { type: 'text' },
    defaultValue: 'hh:mm',
  },
  warn: {
    control: { type: 'boolean' },
  },
  warnText: {
    control: { type: 'text' },
    defaultValue:
      'Warning message that is really long can wrap to more lines but should not be excessively long.',
  },
};
