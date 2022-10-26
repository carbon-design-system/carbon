/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidDatePicker from '../FluidDatePicker';
import FluidDatePickerInput from '../FluidDatePickerInput';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from '../Toggletip';
import { Information } from '@carbon/icons-react';

export default {
  title: 'Experimental/unstable__FluidDatePicker',
  component: FluidDatePicker,
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

export const Simple = () => (
  <>
    <FluidDatePicker datePickerType="simple">
      <FluidDatePickerInput
        placeholder="mm/dd/yyyy"
        labelText={ToggleTip}
        id="date-picker-simple"
      />
    </FluidDatePicker>
    <br />
    <br />
    <FluidDatePicker datePickerType="simple">
      <FluidDatePickerInput
        invalid
        invalidText="Error message goes here that goes to two"
        placeholder="mm/dd/yyyy"
        labelText={ToggleTip}
        id="date-picker-simple"
      />
    </FluidDatePicker>
    <br />
    <br />
    <FluidDatePicker datePickerType="simple">
      <FluidDatePickerInput
        warn
        warnText="Error message goes here that goes to two"
        placeholder="mm/dd/yyyy"
        labelText={ToggleTip}
        id="date-picker-simple"
      />
    </FluidDatePicker>
  </>
);

export const SingleWithCalendar = () => (
  <>
    <FluidDatePicker datePickerType="single">
      <FluidDatePickerInput
        placeholder="mm/dd/yyyy"
        labelText={ToggleTip}
        id="date-picker-single"
        size="md"
      />
    </FluidDatePicker>
    <br />
    <br />
    <FluidDatePicker datePickerType="single">
      <FluidDatePickerInput
        invalid
        invalidText="Error message goes here that goes to two"
        placeholder="mm/dd/yyyy"
        labelText={ToggleTip}
        id="date-picker-single"
        size="md"
      />
    </FluidDatePicker>
    <br />
    <br />
    <FluidDatePicker datePickerType="single">
      <FluidDatePickerInput
        warn
        warnText="Error message goes here that goes to two"
        placeholder="mm/dd/yyyy"
        labelText={ToggleTip}
        id="date-picker-single"
        size="md"
      />
    </FluidDatePicker>
  </>
);

export const RangeWithCalendar = () => {
  return (
    <>
      <FluidDatePicker datePickerType="range">
        <FluidDatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText={ToggleTip}
          size="md"
        />
        <FluidDatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
          size="md"
        />
      </FluidDatePicker>
      <br />
      <br />
      <FluidDatePicker
        invalid
        invalidText="Error message goes here that goes to two"
        datePickerType="range">
        <FluidDatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText={ToggleTip}
          size="md"
        />
        <FluidDatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
          size="md"
        />
      </FluidDatePicker>
      <br />
      <br />
      <FluidDatePicker datePickerType="range">
        <FluidDatePickerInput
          invalid
          invalidText="Error message goes here that goes to two"
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText={ToggleTip}
        />
        <FluidDatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
        />
      </FluidDatePicker>
      <br />
      <br />
      <FluidDatePicker datePickerType="range">
        <FluidDatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText={ToggleTip}
        />
        <FluidDatePickerInput
          invalid
          invalidText="Error message goes here that goes to two"
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
        />
      </FluidDatePicker>
      <br />
      <br />
      <FluidDatePicker
        datePickerType="range"
        warn
        warnText="Warning message goes here">
        <FluidDatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText={ToggleTip}
        />
        <FluidDatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
        />
      </FluidDatePicker>
      <br />
      <br />
      <FluidDatePicker datePickerType="range">
        <FluidDatePickerInput
          warn
          warnText="Warning message goes here"
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText={ToggleTip}
        />
        <FluidDatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
        />
      </FluidDatePicker>
      <br />
      <br />
      <FluidDatePicker datePickerType="range">
        <FluidDatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText={ToggleTip}
        />
        <FluidDatePickerInput
          warn
          warnText="Warning message goes here"
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
        />
      </FluidDatePicker>
    </>
  );
};

export const Playground = (args) => {
  const { invalid, invalidText, warn, warnText, disabled, datePickerType } =
    args;
  return (
    <FluidDatePicker
      datePickerType={datePickerType}
      invalid={invalid}
      invalidText={invalidText}
      warn={warn}
      warnText={warnText}>
      <FluidDatePickerInput
        placeholder="mm/dd/yyyy"
        labelText="Date Picker label"
        id="date-picker-single"
        disabled={disabled}
      />
      {args.datePickerType === 'range' && (
        <FluidDatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="End date"
          id="date-picker-input-2"
          disabled={disabled}
        />
      )}
    </FluidDatePicker>
  );
};

Playground.argTypes = {
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
  },
  onClose: {
    action: 'clicked',
  },
  onOpen: {
    action: 'clicked',
  },
  value: {
    table: {
      disable: true,
    },
  },
  datePickerType: {
    control: {
      type: 'select',
    },
    options: ['single', 'range'],
    defaultValue: 'range',
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
    defaultValue:
      'Error message that is really long can wrap to more lines but should not be excessively long.',
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
    defaultValue:
      'Warning message that is really long can wrap to more lines but should not be excessively long.',
  },
};
