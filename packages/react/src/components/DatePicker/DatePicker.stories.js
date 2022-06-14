/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import DatePicker from './DatePicker';
import DatePickerSkeleton from './DatePicker.Skeleton';
import DatePickerInput from '../DatePickerInput';
import { Layer } from '../Layer';
import mdx from './DatePicker.mdx';

const props = {
  datePicker: () => ({
    dateFormat: 'm/d/Y',
    id: 'date-picker',
    light: false,
    datePickerType: 'single',
    minDate: '11/15/2020',
    maxDate: '11/01/2040',
    disable: ['07/15/2021'],
    onClose: action('onClose'),
    onOpen: action('onOpen'),
  }),
  datePickerInput: () => ({
    id: 'date-picker-input-id',
    className: 'some-class',
    size: undefined,
    labelText: 'Date Picker label',
    pattern: 'd{1,2}/d{4}',
    placeholder: 'mm/dd/yyyy',
    disabled: false,
    invalid: false,
    invalidText: 'A valid date is required',
    warn: false,
    warnText: 'Selected dates may cause conflicts',
    iconDescription: 'Icon description',
  }),
};

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
      table: {
        category: 'DatePickerInput',
      },
    },
  },
  args: {
    size: 'md',
  },
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

export const ForTesting = () => {
  const [date, setDate] = useState(null);
  return (
    <>
      <DatePicker datePickerType="single">
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          id="date-picker-simple"
          value={date}
          onChange={(value) => {
            setDate(value);
          }}
        />
      </DatePicker>
      <button
        type="button"
        onClick={() => {
          setDate('');
        }}>
        clear
      </button>
    </>
  );
};

export const Simple = (args) => (
  <DatePicker datePickerType="simple" {...args}>
    <DatePickerInput
      placeholder="mm/dd/yyyy"
      labelText="Date Picker label"
      id="date-picker-simple"
      {...args}
    />
  </DatePicker>
);

export const SingleWithCalendar = (args) => (
  <DatePicker datePickerType="single" {...args}>
    <DatePickerInput
      placeholder="mm/dd/yyyy"
      labelText="Date Picker label"
      id="date-picker-single"
      {...args}
    />
  </DatePicker>
);

export const RangeWithCalendar = (args) => {
  return (
    <DatePicker datePickerType="range" {...args}>
      <DatePickerInput
        id="date-picker-input-id-start"
        placeholder="mm/dd/yyyy"
        labelText="Start date"
        {...args}
      />
      <DatePickerInput
        id="date-picker-input-id-finish"
        placeholder="mm/dd/yyyy"
        labelText="End date"
        {...args}
      />
    </DatePicker>
  );
};

export const SimpleWithLayer = (args) => {
  return (
    <>
      <DatePicker datePickerType="simple" {...args}>
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          id="date-picker-simple"
          {...args}
        />
      </DatePicker>
      <Layer {...args}>
        <DatePicker datePickerType="simple" {...args}>
          <DatePickerInput
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
            id="date-picker-simple"
            {...args}
          />
        </DatePicker>
        <Layer {...args}>
          <DatePicker datePickerType="simple" {...args}>
            <DatePickerInput
              placeholder="mm/dd/yyyy"
              labelText="Date Picker label"
              id="date-picker-simple"
              {...args}
            />
          </DatePicker>
        </Layer>
      </Layer>
    </>
  );
};

export const SingleWithCalendarWithLayer = (args) => {
  return (
    <>
      <DatePicker datePickerType="single" {...args}>
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          id="date-picker-single"
          {...args}
        />
      </DatePicker>
      <Layer {...args}>
        <DatePicker datePickerType="single" {...args}>
          <DatePickerInput
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
            id="date-picker-single"
            {...args}
          />
        </DatePicker>
        <Layer {...args}>
          <DatePicker datePickerType="single" {...args}>
            <DatePickerInput
              placeholder="mm/dd/yyyy"
              labelText="Date Picker label"
              id="date-picker-single"
              {...args}
            />
          </DatePicker>
        </Layer>
      </Layer>
    </>
  );
};

export const RangeWithCalendarWithLayer = (args) => {
  return (
    <>
      <DatePicker datePickerType="range" {...args}>
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
          {...args}
        />
        <DatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
          {...args}
        />
      </DatePicker>
      <Layer {...args}>
        <DatePicker datePickerType="range" {...args}>
          <DatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Start date"
            {...args}
          />
          <DatePickerInput
            id="date-picker-input-id-finish"
            placeholder="mm/dd/yyyy"
            labelText="End date"
            {...args}
          />
        </DatePicker>
        <Layer {...args}>
          <DatePicker datePickerType="range" {...args}>
            <DatePickerInput
              id="date-picker-input-id-start"
              placeholder="mm/dd/yyyy"
              labelText="Start date"
              {...args}
            />
            <DatePickerInput
              id="date-picker-input-id-finish"
              placeholder="mm/dd/yyyy"
              labelText="End date"
              {...args}
            />
          </DatePicker>
        </Layer>
      </Layer>
    </>
  );
};

/* eslint-disable react/prop-types */
export const DatePickerPlayground = () => (
  <DatePicker {...props.datePicker()}>
    <DatePickerInput {...props.datePickerInput()} />
    {props.datePicker().datePickerType === 'range' && (
      <DatePickerInput {...props.datePickerInput()} id="date-picker-input-2" />
    )}
  </DatePicker>
);
/* eslint-enable react/prop-types */

export const Skeleton = () => <DatePickerSkeleton range />;
