import React from 'react';
import { storiesOf } from '@storybook/react';
import { action, decorateAction } from '@storybook/addon-actions';
import DatePicker from '../DatePicker';
import DatePickerInput from '../DatePickerInput';
import DatePickerSkeleton from '../DatePicker/DatePicker.Skeleton';
import WithState from '../../tools/withState';

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
  locale: 'en',
  onClick: action('onClick'),
  onChange: action('onInputChange'),
  placeholder: 'mm/dd/yyyy',
  pattern: '\\d{1,2}\\/\\d{1,2}\\/\\d{4}',
  id: 'date-picker-input-id',
};

const simpleShortDatePickerInputProps = {
  placeholder: 'mm/yyyy',
  pattern: '\\d{1,2}\\/\\d{4}',
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
  )
  .addWithInfo(
    'range with calendar and min/max dates',
    `
      A range Date Picker consists of two input fields and a calendar, and optionally, the minDate and maxDate fields.
    `,
    () => (
      <DatePicker
        {...datePickerProps}
        minDate="1/10/2020"
        maxDate="1/20/2020"
        datePickerType="range"
        dateFormat="m/d/Y">
        <DatePickerInput {...datePickerInputProps} id="date-picker-input-id" />
        <DatePickerInput
          {...datePickerInputProps}
          id="date-picker-input-id-2"
        />
      </DatePicker>
    )
  )
  .addWithInfo(
    'fully controlled',
    `
      If your application needs to control the value of the date picker and
      be notified of any changes.
    `,
    () => (
      <WithState initialState={{ date: '' }}>
        {({ state, setState }) => (
          <>
            <DatePicker
              datePickerType="single"
              dateFormat="m/d/Y"
              value={state.date}
              onChange={eventOrDates => {
                const value = eventOrDates.target
                  ? eventOrDates.target.value
                  : eventOrDates[0];
                setState({ date: value });
              }}>
              <DatePickerInput
                key="label"
                labelText="Controlled Date"
                id="date-picker-input-id"
              />
            </DatePicker>
            <button onClick={() => setState({ date: '01/01/2011' })}>
              Click me to set to 01/01/2011
            </button>
          </>
        )}
      </WithState>
    )
  )
  .addWithInfo(
    'light',
    `
      A single Date Picker consists of an input field and a calendar.
    `,
    () => (
      <DatePicker
        light
        {...datePickerProps}
        datePickerType="single"
        dateFormat="m/d/Y">
        <DatePickerInput {...datePickerInputProps} />
      </DatePicker>
    )
  )
  .addWithInfo(
    'skeleton',
    `
    Placeholder skeleton state to use when content is loading.
    `,
    () => <DatePickerSkeleton range />
  );
