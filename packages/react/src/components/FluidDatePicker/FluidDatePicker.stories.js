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
  <div style={{ width: '288px' }}>
    <FluidDatePicker datePickerType="simple">
      <FluidDatePickerInput
        placeholder="mm/dd/yyyy"
        labelText={ToggleTip}
        id="date-picker-simple"
      />
    </FluidDatePicker>
  </div>
);

export const Single = () => (
  <div style={{ width: '288px' }}>
    <FluidDatePicker datePickerType="single">
      <FluidDatePickerInput
        style={{ width: '288px' }}
        placeholder="mm/dd/yyyy"
        labelText={ToggleTip}
        id="date-picker-single"
      />
    </FluidDatePicker>
  </div>
);

export const RangeWithCalendar = () => {
  return (
    <div style={{ width: '288px' }}>
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
    </div>
  );
};

export const Playground = (args) => {
  const { invalid, invalidText, warn, warnText, disabled } = args;
  return (
    <div style={{ width: '288px' }}>
      <FluidDatePicker
        datePickerType="range"
        invalid={invalid}
        invalidText={invalidText}
        warn={warn}
        warnText={warnText}>
        <FluidDatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          id="date-picker-range-1"
          disabled={disabled}
        />
        <FluidDatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="End date"
          id="date-picker-range-2"
          disabled={disabled}
        />
      </FluidDatePicker>
      <br />
      <br />
      <FluidDatePicker datePickerType="single">
        <FluidDatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          id="date-picker-single"
          invalid={invalid}
          invalidText={invalidText}
          disabled={disabled}
          warn={warn}
          warnText={warnText}
        />
      </FluidDatePicker>
    </div>
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
  value: {
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
