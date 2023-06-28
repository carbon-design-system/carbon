/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidTimePicker from '../FluidTimePicker';
import FluidTimePickerSelect from '../FluidTimePickerSelect';
import FluidTimePickerSkeleton from './FluidTimePicker.Skeleton';
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
  subcomponents: {
    FluidTimePickerSelect,
    FluidTimePickerSkeleton,
  },
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
  <div style={{ display: 'flex', flexDirection: 'column' }}>
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
    <br />
    <br />
    <div style={{ width: '350px' }}>
      <FluidTimePicker
        id="time-picker-3"
        labelText="Time"
        placeholder="hh:mm"
        invalid
        invalidText="Error message goes here">
        <FluidTimePickerSelect id="select-56" labelText={ToggleTip}>
          <SelectItem value="am" text="AM" />
          <SelectItem value="pm" text="PM" />
        </FluidTimePickerSelect>
        <FluidTimePickerSelect id="select-32" labelText="Timezone">
          <SelectItem value="et" text="Eastern Time (ET)" />
          <SelectItem value="ct" text="Central Time (CT)" />
          <SelectItem value="mt" text="Mountain Time (MT)" />
          <SelectItem value="pt" text="Pacific Time (PT)" />
        </FluidTimePickerSelect>
      </FluidTimePicker>
      <br />
      <br />
      <FluidTimePicker
        id="time-picker-2322"
        labelText="Time"
        placeholder="hh:mm"
        invalid
        invalidText="Error message goes here">
        <FluidTimePickerSelect id="select-354" labelText={ToggleTip}>
          <SelectItem value="am" text="AM" />
          <SelectItem value="pm" text="PM" />
        </FluidTimePickerSelect>
      </FluidTimePicker>
    </div>
    <br />
    <br />
    <div style={{ width: '350px' }}>
      <FluidTimePicker
        id="time-picker-4454"
        labelText="Time"
        placeholder="hh:mm"
        warn
        warnText="Warning message goes here">
        <FluidTimePickerSelect id="select-6533" labelText={ToggleTip}>
          <SelectItem value="am" text="AM" />
          <SelectItem value="pm" text="PM" />
        </FluidTimePickerSelect>
        <FluidTimePickerSelect id="select-232343" labelText="Timezone">
          <SelectItem value="et" text="Eastern Time (ET)" />
          <SelectItem value="ct" text="Central Time (CT)" />
          <SelectItem value="mt" text="Mountain Time (MT)" />
          <SelectItem value="pt" text="Pacific Time (PT)" />
        </FluidTimePickerSelect>
      </FluidTimePicker>
      <br />
      <br />
      <FluidTimePicker
        id="time-picker-22213"
        labelText="Time"
        placeholder="hh:mm"
        warn
        warnText="Warning message goes here">
        <FluidTimePickerSelect id="select-34354" labelText={ToggleTip}>
          <SelectItem value="am" text="AM" />
          <SelectItem value="pm" text="PM" />
        </FluidTimePickerSelect>
      </FluidTimePicker>
    </div>
  </div>
);

export const Skeleton = () => (
  <div style={{ width: '300px' }}>
    <FluidTimePickerSkeleton />
    <br />
    <br />
    <FluidTimePickerSkeleton isOnlyTwo />
  </div>
);

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
      <br />
      <br />
      <FluidTimePicker
        id="time-picker-2"
        labelText="Time"
        placeholder="hh:mm"
        {...args}>
        <FluidTimePickerSelect id="select-3" labelText={ToggleTip}>
          <SelectItem value="am" text="AM" />
          <SelectItem value="pm" text="PM" />
        </FluidTimePickerSelect>
      </FluidTimePicker>
    </div>
  );
};

Playground.args = {
  labelText: 'Time',
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  placeholder: 'hh:mm',
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
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
  },
  invalid: {
    control: { type: 'boolean' },
  },
  invalidText: {
    control: { type: 'text' },
  },
  placeholder: {
    control: { type: 'text' },
  },
  warn: {
    control: { type: 'boolean' },
  },
  warnText: {
    control: { type: 'text' },
  },
};
