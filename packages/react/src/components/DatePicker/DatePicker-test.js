/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import DatePicker from './DatePicker';
import DatePickerInput from '../DatePickerInput';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Slug } from '../Slug';

const prefix = 'cds';

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
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(`.${prefix}--date-picker--simple`)
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
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(`.${prefix}--date-picker--single`)
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
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(`.${prefix}--date-picker--range`)
    ).toBeInTheDocument();
  });

  it('should not fire onChange handler when clicking outside the datepicker in range mode', () => {
    const handleChange = jest.fn();
    const { getByLabelText, getByText } = render(
      <DatePicker
        onChange={handleChange}
        dateFormat="m/d/Y"
        datePickerType="range">
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
    const startDateInput = getByLabelText('Start date');
    const endDateInput = getByLabelText('End date');
    // Change the dates
    fireEvent.change(startDateInput, { target: { value: '01/01/2023' } });
    fireEvent.change(endDateInput, { target: { value: '01/07/2023' } });
    // Simulate a click event outside the datepicker
    fireEvent.click(document.body);
    fireEvent.focus(startDateInput);
    fireEvent.click(document.body);
    expect(handleChange).not.toHaveBeenCalled();
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

  it('should respect slug prop', () => {
    render(
      <DatePickerInput
        id="date-picker-input-id-start"
        placeholder="mm/dd/yyyy"
        labelText="Date Picker label"
        data-testid="input-value"
        slug={<Slug />}
      />
    );

    expect(screen.getByRole('button')).toHaveClass(`${prefix}--slug__button`);
  });

  it('should respect parseDate prop', async () => {
    const parseDate = jest.fn();
    parseDate.mockReturnValueOnce(new Date('1989/01/20'));
    render(
      <DatePicker
        onChange={() => {}}
        datePickerType="single"
        parseDate={parseDate}>
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          data-testid="input-value"
        />
      </DatePicker>
    );
    await userEvent.type(
      screen.getByLabelText('Date Picker label'),
      '01/20/1989{enter}'
    );
    expect(parseDate).toHaveBeenCalled();
  });

  it('invalid date month/day is correctly parsed when using the default format', async () => {
    render(
      <DatePicker onChange={() => {}} datePickerType="single">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          data-testid="input-value"
        />
      </DatePicker>
    );

    expect(screen.getByLabelText('Date Picker label')).toHaveValue('');

    // Invalid month
    await userEvent.type(
      screen.getByLabelText('Date Picker label'),
      '99/20/1989{enter}'
    );
    expect(screen.getByLabelText('Date Picker label')).toHaveValue(
      '01/20/1989'
    );
    await userEvent.clear(screen.getByLabelText('Date Picker label'));

    // Invalid day
    await userEvent.type(
      screen.getByLabelText('Date Picker label'),
      '01/99/1989{enter}'
    );
    expect(screen.getByLabelText('Date Picker label')).toHaveValue(
      '01/01/1989'
    );
    await userEvent.clear(screen.getByLabelText('Date Picker label'));

    // Invalid month and day
    await userEvent.type(
      screen.getByLabelText('Date Picker label'),
      '99/99/1989{enter}'
    );
    expect(screen.getByLabelText('Date Picker label')).toHaveValue(
      '01/01/1989'
    );
    await userEvent.clear(screen.getByLabelText('Date Picker label'));

    expect(screen.getByLabelText('Date Picker label')).toHaveValue('');
  });

  it('invalid date month/day is parsed by flatpickr when using a custom format', async () => {
    render(
      <DatePicker
        onChange={() => {}}
        datePickerType="single"
        dateFormat="d/m/Y">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          data-testid="input-value"
        />
      </DatePicker>
    );

    expect(screen.getByLabelText('Date Picker label')).toHaveValue('');

    await userEvent.type(
      screen.getByLabelText('Date Picker label'),
      '34/34/3434{enter}'
    );
    // More on how this value is calculated by flatpickr:
    // https://github.com/carbon-design-system/carbon/issues/15432#issuecomment-1967447677
    expect(screen.getByLabelText('Date Picker label')).toHaveValue(
      '03/10/3436'
    );
    await userEvent.clear(screen.getByLabelText('Date Picker label'));
  });

  it('the input is cleared when given a completely invalid date', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <DatePicker onChange={() => {}} datePickerType="single">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          data-testid="input-value"
        />
      </DatePicker>
    );

    await userEvent.type(
      screen.getByLabelText('Date Picker label'),
      'a1/0a/a999{enter}'
    );
    expect(warn).toHaveBeenCalled();
    expect(screen.getByLabelText('Date Picker label')).toHaveValue('');
    warn.mockRestore();
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

  describe('react.lazy', () => {
    let cleanup;
    let render;
    let screen;
    let LazyDatePicker;
    let LazyDatePickerInput;

    beforeEach(() => {
      jest.resetModules();
      cleanup = require('@testing-library/react/pure').cleanup;
      render = require('@testing-library/react/pure').render;
      screen = require('@testing-library/react/pure').screen;
    });

    afterEach(() => {
      cleanup();
    });

    it('should initialize a calendar when using react.lazy', async () => {
      LazyDatePicker = React.lazy(() =>
        import('@carbon/react').then((module) => ({
          default: module.DatePicker,
        }))
      );

      LazyDatePickerInput = React.lazy(() =>
        import('@carbon/react').then((module) => ({
          default: module.DatePickerInput,
        }))
      );

      render(
        <React.Suspense fallback="Loading">
          <LazyDatePicker datePickerType="single">
            <LazyDatePickerInput
              placeholder="mm/dd/yyyy"
              labelText="Date Picker label"
              id="date-picker-simple"
            />
          </LazyDatePicker>
        </React.Suspense>
      );

      const labeledElement = await screen.findByLabelText(
        'Date Picker label',
        {},
        { timeout: 5000 }
      );
      expect(labeledElement).toBeInTheDocument();

      const input = screen.getByRole('textbox');

      expect(screen.getByRole('application')).not.toHaveClass('open');
      await userEvent.click(input);
      expect(screen.getByRole('application')).toHaveClass('open');
    });
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

  it('should update the calendar classnames when open', async () => {
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

    // eslint-disable-next-line testing-library/no-node-access
    const input = document.querySelector(`.${prefix}--date-picker__input`);

    expect(screen.getByRole('application')).not.toHaveClass('open');
    await userEvent.click(input);
    expect(screen.getByRole('application')).toHaveClass('open');
  });

  it('should support controlled value', async () => {
    const DatePickerExample = () => {
      const [date, setDate] = useState();
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

    await userEvent.type(
      screen.getByLabelText('Date Picker label'),
      '01/20/1989{enter}'
    );
    expect(screen.getByLabelText('Date Picker label')).toHaveValue(
      '01/20/1989'
    );

    await userEvent.click(screen.getByText('clear'));
    expect(screen.getByLabelText('Date Picker label')).toHaveValue('');
  });

  it('should respect closeOnSelect prop', async () => {
    const DatePickerExample = () => {
      const [date, setDate] = useState();
      return (
        <DatePicker
          datePickerType="single"
          value={date}
          closeOnSelect={false}
          minDate="11/25/2023"
          maxDate="11/28/2023"
          onChange={(value) => {
            setDate(value);
          }}>
          <DatePickerInput
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
            id="date-picker-simple"
          />
        </DatePicker>
      );
    };
    render(<DatePickerExample />);
    const input = screen.getByLabelText('Date Picker label');
    expect(screen.getByRole('application')).not.toHaveClass('open');

    await userEvent.click(input);
    expect(screen.getByRole('application')).toHaveClass('open');

    // eslint-disable-next-line testing-library/no-node-access
    const belowMinDate = document.querySelector(
      '[aria-label="November 26, 2023"]'
    );
    await userEvent.click(belowMinDate);

    expect(screen.getByLabelText('Date Picker label')).toHaveValue(
      '11/26/2023'
    );
    expect(screen.getByRole('application')).toHaveClass('open');
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
  it('should respect minDate', async () => {
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
    // eslint-disable-next-line testing-library/no-node-access
    const belowMinDate = document.querySelector(
      '[aria-label="December 31, 2017"]'
    );
    await userEvent.click(screen.getByTestId('input-min-max'));
    await userEvent.click(belowMinDate);
    expect(screen.getByLabelText('Date Picker label')).toHaveValue(
      '01/01/2018'
    );
  });

  it('should respect maxDate', async () => {
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

    // eslint-disable-next-line testing-library/no-node-access
    const aboveMaxDate = document.querySelector(
      '[aria-label="January 4, 2018"]'
    );

    await userEvent.click(screen.getByTestId('input-min-max-2'));
    await userEvent.click(aboveMaxDate);
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

  it('should respect readOnly prop', async () => {
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
    await userEvent.click(theStart);
    expect(onClick).toHaveBeenCalledTimes(1);
    const theEnd = screen.getByLabelText('End date');
    await userEvent.click(theEnd);
    expect(onClick).toHaveBeenCalledTimes(2);

    await userEvent.type(theStart, '01/01/2018{tab}'); // should not be possible to type
    await userEvent.type(theEnd, '02/02/2018{enter}'); // should not be possible to type

    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('should work with ISO 8601 format or others', async () => {
    const onChange = jest.fn();

    render(
      <DatePicker dateFormat="Y-m-d" onChange={onChange} datePickerType="range">
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
    const theStart = screen.getByLabelText('Start date');
    const theEnd = screen.getByLabelText('End date');

    await userEvent.type(theStart, '2023-01-05{tab}');
    await userEvent.type(theEnd, '2023-01-19{enter}');
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(screen.getByRole('application')).toHaveClass('open');
    await userEvent.keyboard('{escape}');
    expect(screen.getByRole('application')).not.toHaveClass('open');
  });
});
