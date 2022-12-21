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

  it('should add the date format as expected', () => {
    render(
      <DatePicker
        onChange={() => {}}
        datePickerType="single"
        value="01/01/2022"
        dateFormat="Y/m/d">
        <DatePickerInput
          id="date-picker-input-id"
          placeholder="yyyy/mm/dd"
          labelText="Date Picker label"
        />
      </DatePicker>
    );
    expect(screen.getByLabelText('Date Picker label')).toHaveValue(
      '2022/01/01'
    );
  });

  it('has the value as expected', () => {
    render(
      <DatePicker
        onChange={() => {}}
        datePickerType="single"
        value="01/03/2018">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          data-testid="input-value"
        />
      </DatePicker>
    );
    expect(screen.getByLabelText('Date Picker label')).toHaveValue(
      '01/03/2018'
    );
  });

  it('should accept a `ref` for the outermost element', () => {
    const ref = jest.fn();
    const { container } = render(<DatePicker ref={ref} />);

    expect(ref).toHaveBeenCalledWith(container.firstChild);
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
  it('sets the locale when it is passed as a prop', () => {
    render(
      <DatePicker
        onChange={() => {}}
        datePickerType="single"
        locale="es"
        value="01/01/2022">
        <DatePickerInput
          id="date-picker-input-id"
          placeholder="mm/dd/yyyy"
          labelText="Date picker label"
        />
      </DatePicker>
    );
    expect(screen.getByText('Enero')).toBeInTheDocument();
  });

  it('should use default locale if one is not passed as a prop', () => {
    render(
      <DatePicker
        onChange={() => {}}
        datePickerType="single"
        value="01/01/2022">
        <DatePickerInput
          id="date-picker-input-id"
          placeholder="mm/dd/yyyy"
          labelText="Date picker label"
        />
      </DatePicker>
    );
    expect(screen.getByText('January')).toBeInTheDocument();
  });
});

describe('Date picker with minDate and maxDate', () => {
  it('should respect minDate', () => {
    render(
      <DatePicker
        onChange={() => {}}
        datePickerType="single"
        minDate="01/01/2018"
        maxDate="01/03/2018"
        value="01/01/2018">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          data-testid="input-min-max"
        />
      </DatePicker>
    );
    const belowMinDate = document.querySelector(
      '[aria-label="December 31, 2017"]'
    );
    userEvent.click(screen.getByTestId('input-min-max'));
    userEvent.click(belowMinDate);
    expect(screen.getByLabelText('Date Picker label')).toHaveValue(
      '01/01/2018'
    );
  });

  it('should respect maxDate', () => {
    render(
      <DatePicker
        onChange={() => {}}
        datePickerType="single"
        minDate="01/01/2018"
        maxDate="01/03/2018"
        value="01/01/2018">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          data-testid="input-min-max-2"
        />
      </DatePicker>
    );

    const aboveMaxDate = document.querySelector(
      '[aria-label="January 4, 2018"]'
    );

    userEvent.click(screen.getByTestId('input-min-max-2'));
    userEvent.click(aboveMaxDate);
    expect(screen.getByLabelText('Date Picker label')).toHaveValue(
      '01/01/2018'
    );
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

  it('should respect readOnly prop', () => {
    const onChange = jest.fn();
    const onClick = jest.fn();

    render(
      <DatePicker
        dateFormat="m/d/Y"
        onClick={onClick}
        onChange={onChange}
        datePickerType="range"
        readOnly={true}>
        <DatePickerInput
          id="date-picker-input-id-start"
          labelText="Start date"
        />
        <DatePickerInput
          id="date-picker-input-id-finish"
          labelText="End date"
        />
      </DatePicker>
    );

    // Click events should fire
    const theStart = screen.getByLabelText('Start date');
    userEvent.click(theStart);
    expect(onClick).toHaveBeenCalledTimes(1);
    const theEnd = screen.getByLabelText('End date');
    userEvent.click(theEnd);
    expect(onClick).toHaveBeenCalledTimes(2);

    userEvent.type(theStart, '01/01/2018{tab}'); // should not be possible to type
    userEvent.type(theEnd, '02/02/2018{enter}'); // should not be possible to type

    expect(onChange).toHaveBeenCalledTimes(0);
  });
});
