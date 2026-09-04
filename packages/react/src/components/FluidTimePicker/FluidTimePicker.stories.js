/**
 * Copyright IBM Corp. 2022, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidTimePicker from '../FluidTimePicker';
import FluidTimePickerSelect from '../FluidTimePickerSelect';
import FluidTimePickerSkeleton from './FluidTimePicker.Skeleton';
import SelectItem from '../SelectItem';
import { Toggletip, ToggletipButton, ToggletipContent } from '../Toggletip';
import { Information } from '@carbon/icons-react';
import './fluid-time-picker-story.scss';
import mdx from './FluidTimePicker.mdx';

export default {
  title: 'Components/Fluid Components/FluidTimePicker',
  component: FluidTimePicker,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  subcomponents: {
    FluidTimePickerSelect,
    FluidTimePickerSkeleton,
  },
};

const ClockToggletip = ({ className }) => (
  // Keep the toggletip outside `labelText`; interactive content is invalid in labels.
  <span className={`fluid-time-picker-story__toggletip ${className}`}>
    <Toggletip align="top-left">
      <ToggletipButton label="Show information">
        <Information />
      </ToggletipButton>
      <ToggletipContent>
        <p>Additional field information here.</p>
      </ToggletipContent>
    </Toggletip>
  </span>
);

export const Skeleton = () => (
  <div style={{ width: 300 }}>
    <FluidTimePickerSkeleton />
    <br />
    <br />
    <FluidTimePickerSkeleton isOnlyTwo />
  </div>
);

export const Default = (timePickerArgs) => {
  return (
    <div style={{ width: '350px' }}>
      <div className="fluid-time-picker-story">
        <FluidTimePicker id="time-picker-1" {...timePickerArgs}>
          <FluidTimePickerSelect id="select-1" labelText="Clock">
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
        <ClockToggletip className="fluid-time-picker-story__toggletip--three-inputs" />
      </div>
      <br />
      <br />
      <div className="fluid-time-picker-story">
        <FluidTimePicker
          id="time-picker-2"
          labelText="Time"
          placeholder="hh:mm"
          {...timePickerArgs}>
          <FluidTimePickerSelect id="select-3" labelText="Clock">
            <SelectItem value="am" text="AM" />
            <SelectItem value="pm" text="PM" />
          </FluidTimePickerSelect>
        </FluidTimePicker>
        <ClockToggletip className="fluid-time-picker-story__toggletip--two-inputs" />
      </div>
    </div>
  );
};

Default.args = {
  className: 'test-class',
  disabled: false,
  invalid: false,
  labelText: 'Time',
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  placeholder: 'hh:mm',
  readOnly: false,
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

Default.argTypes = {
  className: {
    control: { type: 'text' },
  },
  defaultValue: {
    control: { type: 'text' },
  },
  disabled: {
    control: { type: 'boolean' },
  },
  labelText: {
    control: { type: 'text' },
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
  onChange: {
    action: 'onChange',
  },
  onClick: {
    action: 'onClick',
  },
  readOnly: {
    control: { type: 'boolean' },
  },
  value: {
    control: { type: 'text' },
  },
  warn: {
    control: { type: 'boolean' },
  },
  warnText: {
    control: { type: 'text' },
  },
};

Default.parameters = {
  controls: {
    include: [...Object.keys(Default.argTypes)],
  },
};
