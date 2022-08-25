/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DatePicker from './DatePicker';
import DatePickerSkeleton from './DatePicker.Skeleton';
import DatePickerInput from '../DatePickerInput';
import { Layer } from '../Layer';
import mdx from './DatePicker.mdx';

// const props = {
//   datePicker: () => ({
//     dateFormat: 'm/d/Y',
//     id: 'date-picker',
//     light: false,
//     datePickerType: 'single',
//     minDate: '11/15/2020',
//     maxDate: '11/01/2040',
//     disable: ['07/15/2021'],
//     onClose: action('onClose'),
//     onOpen: action('onOpen'),
//   }),
//   datePickerInput: () => ({
//     id: 'date-picker-input-id',
//     className: 'some-class',
//     size: undefined,
//     labelText: 'Date Picker label',
//     pattern: 'd{1,2}/d{4}',
//     placeholder: 'mm/dd/yyyy',
//     disabled: false,
//     invalid: false,
//     invalidText: 'A valid date is required',
//     warn: false,
//     warnText: 'Selected dates may cause conflicts',
//     iconDescription: 'Icon description',
//   }),
// };

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  subcomponents: {
    DatePickerInput,
    DatePickerSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Simple = () => (
  <DatePicker datePickerType="simple">
    <DatePickerInput
      placeholder="mm/dd/yyyy"
      labelText="Date Picker label"
      id="date-picker-simple"
    />
  </DatePicker>
);

export const SingleWithCalendar = () => (
  <DatePicker datePickerType="single">
    <DatePickerInput
      placeholder="mm/dd/yyyy"
      labelText="Date Picker label"
      id="date-picker-single"
      size="md"
    />
  </DatePicker>
);

export const RangeWithCalendar = () => {
  return (
    <DatePicker datePickerType="range">
      <DatePickerInput
        id="date-picker-input-id-start"
        placeholder="mm/dd/yyyy"
        labelText="Start date"
        size="md"
      />
      <DatePickerInput
        id="date-picker-input-id-finish"
        placeholder="mm/dd/yyyy"
        labelText="End date"
        size="md"
      />
    </DatePicker>
  );
};

export const SimpleWithLayer = () => {
  return (
    <>
      <DatePicker datePickerType="simple">
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          id="date-picker-simple"
          size="md"
        />
      </DatePicker>
      <Layer>
        <DatePicker datePickerType="simple">
          <DatePickerInput
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
            id="date-picker-simple"
            size="md"
          />
        </DatePicker>
        <Layer>
          <DatePicker datePickerType="simple">
            <DatePickerInput
              placeholder="mm/dd/yyyy"
              labelText="Date Picker label"
              id="date-picker-simple"
              size="md"
            />
          </DatePicker>
        </Layer>
      </Layer>
    </>
  );
};

export const SingleWithCalendarWithLayer = () => {
  return (
    <>
      <DatePicker datePickerType="single">
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          id="date-picker-single"
          size="md"
        />
      </DatePicker>
      <Layer>
        <DatePicker datePickerType="single">
          <DatePickerInput
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
            id="date-picker-single"
            size="md"
          />
        </DatePicker>
        <Layer>
          <DatePicker datePickerType="single">
            <DatePickerInput
              placeholder="mm/dd/yyyy"
              labelText="Date Picker label"
              id="date-picker-single"
              size="md"
            />
          </DatePicker>
        </Layer>
      </Layer>
    </>
  );
};

export const RangeWithCalendarWithLayer = () => {
  return (
    <>
      <DatePicker datePickerType="range">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
          size="md"
        />
        <DatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
          size="md"
        />
      </DatePicker>
      <Layer>
        <DatePicker datePickerType="range">
          <DatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Start date"
            size="md"
          />
          <DatePickerInput
            id="date-picker-input-id-finish"
            placeholder="mm/dd/yyyy"
            labelText="End date"
            size="md"
          />
        </DatePicker>
        <Layer>
          <DatePicker datePickerType="range">
            <DatePickerInput
              id="date-picker-input-id-start"
              placeholder="mm/dd/yyyy"
              labelText="Start date"
              size="md"
            />
            <DatePickerInput
              id="date-picker-input-id-finish"
              placeholder="mm/dd/yyyy"
              labelText="End date"
              size="md"
            />
          </DatePicker>
        </Layer>
      </Layer>
    </>
  );
};

export const Skeleton = () => <DatePickerSkeleton range />;

/* eslint-disable react/prop-types */
export const Playground = (args) => {
  console.log(args);
  return (
    <DatePicker datePickerType="single" {...args}>
      <DatePickerInput
        placeholder="mm/dd/yyyy"
        labelText="Date Picker label"
        id="date-picker-single"
        {...args}
      />
      {args.datePickerType === 'range' && (
        <DatePickerInput
          {...args}
          placeholder="mm/dd/yyyy"
          labelText="End date"
          size="md"
          id="date-picker-input-2"
        />
      )}
    </DatePicker>
  );
};
/* eslint-enable react/prop-types */

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
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
    table: {
      category: 'DatePickerInput',
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
