/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidDatePicker from '../FluidDatePicker';
import FluidDatePickerInput from '../FluidDatePickerInput';
import FluidDatePickerSkeleton from './FluidDatePicker.Skeleton';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from '../Toggletip';
import { Information } from '@carbon/icons-react';

export default {
  title: 'Experimental/Fluid Components/unstable__FluidDatePicker',
  component: FluidDatePicker,
  subcomponents: {
    FluidDatePickerSkeleton,
  },
};

const sharedArgs = {
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

const sharedArgTypes = {
  appendTo: {
    table: {
      disable: true,
    },
  },
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
  disable: {
    table: {
      disable: true,
    },
  },
  enable: {
    table: {
      disable: true,
    },
  },
  inline: {
    table: {
      disable: true,
    },
  },
  light: {
    table: {
      disable: true,
    },
  },
  locale: {
    table: {
      disable: true,
    },
  },
  onChange: {
    action: 'clicked',
    table: {
      disable: true,
    },
  },
  onClose: {
    action: 'clicked',
    table: {
      disable: true,
    },
  },
  onOpen: {
    action: 'clicked',
    table: {
      disable: true,
    },
  },
  disabled: {
    control: { type: 'boolean' },
    table: {
      category: 'DatePickerInput',
    },
  },
  readOnly: {
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
};

const ToggleTip = (
  <>
    <ToggletipLabel>Label</ToggletipLabel>
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

export const Simple = (args) => (
  <div style={{ width: '288px' }}>
    <FluidDatePicker datePickerType="simple" {...args}>
      <FluidDatePickerInput
        placeholder="mm/dd/yyyy"
        labelText={ToggleTip}
        id="date-picker-simple"
        {...args}
      />
    </FluidDatePicker>
  </div>
);

Simple.args = { ...sharedArgs };
Simple.argTypes = { ...sharedArgTypes };

export const Single = (args) => (
  <div style={{ width: '288px' }}>
    <FluidDatePicker datePickerType="single" {...args}>
      <FluidDatePickerInput
        style={{ width: '288px' }}
        placeholder="mm/dd/yyyy"
        labelText={ToggleTip}
        id="date-picker-single"
        {...args}
      />
    </FluidDatePicker>
  </div>
);

Single.args = { ...sharedArgs };
Single.argTypes = { ...sharedArgTypes };

export const RangeWithCalendar = (args) => {
  return (
    <div style={{ width: '288px' }}>
      <FluidDatePicker datePickerType="range" {...args}>
        <FluidDatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText={ToggleTip}
          size="md"
          {...args}
        />
        <FluidDatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
          size="md"
          {...args}
        />
      </FluidDatePicker>
    </div>
  );
};

RangeWithCalendar.args = { ...sharedArgs };
RangeWithCalendar.argTypes = { ...sharedArgTypes };

export const Skeleton = () => (
  <div style={{ width: '300px' }}>
    <FluidDatePickerSkeleton
      datePickerType="simple"
      labelText="Label"
      placeholder="Placeholder text"
      id="input-1"
    />
    <br />
    <br />
    <FluidDatePickerSkeleton
      datePickerType="single"
      labelText="Label"
      placeholder="Placeholder text"
      id="input-2"
    />
    <br />
    <br />
    <FluidDatePickerSkeleton
      datePickerType="range"
      labelText="Label"
      placeholder="Placeholder text"
      id="input-3"
    />
  </div>
);
