import React from 'react';
import { storiesOf } from '@storybook/react';
import { action, decorateAction } from '@storybook/addon-actions';
import DatePicker from '../DatePicker';
import DatePickerInput from '../DatePickerInput';

// Datepickers last argument contains an instance of flatpickr
// and will cause action logger to enter an infinite loop. Just don't log that argument
const datePickerOnChangeActions = decorateAction([
  args => args.slice(0, args.length - 2),
]);

const datePickerProps = {
  id: 'date-picker',
  onChange: datePickerOnChangeActions('onPickerChange'),
};

const datePickerInputProps = {
  className: 'some-class',
  labelText: 'Date Picker label',
  onClick: action('onClick'),
  onChange: action('onInputChange'),
  placeholder: 'mm/dd/yyyy',
  pattern: 'd{1,2}/d{1,2}/d{4}',
  id: 'date-picker-input-id',
};

const simpleShortDatePickerInputProps = {
  placeholder: 'mm/yyyy',
  pattern: 'd{1,2}/d{4}',
};

storiesOf('DatePicker', module)
  .addWithInfo(
    'simple and short',
    `
      A simple Date Picker consists of an input field and no calendar.
    `,
    () => (
      <DatePicker {...datePickerProps} short datePickerType="simple">
        <DatePickerInput
          {...datePickerInputProps}
          {...simpleShortDatePickerInputProps}
        />
      </DatePicker>
    )
  )
  .addWithInfo(
    'simple and normal',
    `
      A simple Date Picker consists of an input field and no calendar.
    `,
    () => (
      <DatePicker id="date-picker" datePickerType="simple">
        <DatePickerInput {...datePickerInputProps} />
      </DatePicker>
    )
  )
  .addWithInfo(
    'single with calendar',
    `
      A single Date Picker consists of an input field and a calendar.
    `,
    () => (
      <DatePicker
        {...datePickerProps}
        datePickerType="single"
        dateFormat="m/d/Y">
        <DatePickerInput {...datePickerInputProps} />
      </DatePicker>
    )
  )
  .addWithInfo(
    'range with calendar',
    `
      A range Date Picker consists of two input fields and a calendar.
    `,
    () => (
      <DatePicker
        {...datePickerProps}
        datePickerType="range"
        dateFormat="m/d/Y">
        <DatePickerInput {...datePickerInputProps} id="date-picker-input-id" />
        <DatePickerInput
          {...datePickerInputProps}
          id="date-picker-input-id-2"
        />
      </DatePicker>
    )
  );
