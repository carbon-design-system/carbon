/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import DatePicker from './DatePicker';
import DatePickerInput from '../DatePickerInput';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('DatePicker', () => {
  it('should add extra classes that are passed via className', () => {
    render(
      <DatePicker
        onChange={() => {}}
        className="custom-class"
        dateFormat="m/d/Y"
        data-testid="datePicker-1">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
        <DatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
        />
      </DatePicker>
    );

    expect(screen.getByTestId('datePicker-1')).toHaveClass('custom-class');
  });

  it('should add the correct class when type "simple" is passed as a prop', () => {
    render(
      <DatePicker
        onChange={() => {}}
        dateFormat="m/d/Y"
        datePickerType="simple">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
      </DatePicker>
    );

    expect(
      document.querySelector('.cds--date-picker--simple')
    ).toBeInTheDocument();
  });

  it('should add the correct class when type "single" is passed as a prop', () => {
    render(
      <DatePicker
        onChange={() => {}}
        dateFormat="m/d/Y"
        datePickerType="single">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
      </DatePicker>
    );

    expect(
      document.querySelector('.cds--date-picker--single')
    ).toBeInTheDocument();
  });

  it('should add the correct class when type "range" is passed as a prop', () => {
    render(
      <DatePicker onChange={() => {}} dateFormat="m/d/Y" datePickerType="range">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
        <DatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
        />
      </DatePicker>
    );

    expect(
      document.querySelector('.cds--date-picker--range')
    ).toBeInTheDocument();
  });

  it('should render the children as expected', () => {
    render(
      <DatePicker onChange={() => {}} dateFormat="m/d/Y" datePickerType="range">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
        <DatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
        />
      </DatePicker>
    );

    expect(screen.getByLabelText('Start date')).toBeInTheDocument();
    expect(screen.getByLabelText('End date')).toBeInTheDocument();
  });

  // eslint-disable-next-line
  it('should add the date format as expected', () => {
    //how to test for date format? it's used for a flatpickr config but not a dom attribute or anything...
  });

  // eslint-disable-next-line
  it('has the value as expected', () => {
    //how to test for date value? it's used for a flatpickr config but not a dom attribute or anything...
  });
});

describe('Simple date picker', () => {
  it('should not initialize a calendar', () => {
    render(
      <DatePicker
        onChange={() => {}}
        dateFormat="m/d/Y"
        datePickerType="simple">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
      </DatePicker>
    );

    expect(screen.queryByRole('application')).not.toBeInTheDocument();
  });
});

describe('Single date picker', () => {
  it('should initialize a calendar', () => {
    render(
      <DatePicker
        onChange={() => {}}
        dateFormat="m/d/Y"
        datePickerType="single">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
      </DatePicker>
    );
    expect(screen.getByRole('application')).toBeInTheDocument();
  });

  it('should update the calendar classnames when open', () => {
    render(
      <DatePicker
        onChange={() => {}}
        dateFormat="m/d/Y"
        datePickerType="single">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
      </DatePicker>
    );

    const input = document.querySelector('.cds--date-picker__input');

    expect(screen.getByRole('application')).not.toHaveClass('open');
    userEvent.click(input);
    expect(screen.getByRole('application')).toHaveClass('open');
  });

  it('should support controlled value', () => {
    const DatePickerExample = () => {
      const [date, setDate] = useState('');
      return (
        <>
          <DatePicker
            datePickerType="single"
            value={date}
            onChange={(value) => {
              setDate(value);
            }}>
            <DatePickerInput
              placeholder="mm/dd/yyyy"
              labelText="Date Picker label"
              id="date-picker-simple"
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

    render(<DatePickerExample />);
    expect(screen.getByLabelText('Date Picker label')).toHaveValue('');

    userEvent.type(
      screen.getByLabelText('Date Picker label'),
      '01/20/1989{enter}'
    );
    expect(screen.getByLabelText('Date Picker label')).toHaveValue(
      '01/20/1989'
    );

    userEvent.click(screen.getByText('clear'));
    expect(screen.getByLabelText('Date Picker label')).toHaveValue('');
  });
});

describe('Date picker with locale', () => {
  // eslint-disable-next-line
  it('sets the locale when it is passed as a prop', () => {
    render(
      <DatePicker onChange={() => {}} datePickerType="range" locale="es">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
        <DatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
        />
      </DatePicker>
    );

    //how to test for date locale? it's used for a flatpickr config but not a dom attribute or anything...
  });

  // eslint-disable-next-line
  it('does not define the locale if one is not passed as a prop', () => {
    render(
      <DatePicker onChange={() => {}} datePickerType="range">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
        <DatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
        />
      </DatePicker>
    );

    //how to test for date locale? it's used for a flatpickr config but not a dom attribute or anything...
  });
});

describe('Date picker with minDate and maxDate', () => {
  // eslint-disable-next-line
  it('has the range date picker with min and max dates', () => {
    render(
      <DatePicker
        onChange={() => {}}
        datePickerType="range"
        minDate="01/01/2018"
        maxDate="01/30/2018">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
        <DatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
        />
      </DatePicker>
    );
    //how to test for date min and max? it's used for a flatpickr config but not a dom attribute or anything...
  });

  it('should not have "console.error" being created', () => {
    const mockConsoleError = jest.spyOn(console, 'error');
    render(
      <DatePicker
        onChange={() => {}}
        datePickerType="range"
        minDate="01/01/2018"
        maxDate="01/30/2018">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
        <DatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
        />
      </DatePicker>
    );

    expect(mockConsoleError).not.toHaveBeenCalled();
    jest.restoreAllMocks();
  });
});
