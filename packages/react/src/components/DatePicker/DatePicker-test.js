/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import DatePicker from './DatePicker';
import DatePickerInput from '../DatePickerInput';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AILabel } from '../AILabel';
import { FormContext } from '../FluidForm';

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

  it('should respect decorator prop', () => {
    render(
      <DatePickerInput
        id="date-picker-input-id-start"
        placeholder="mm/dd/yyyy"
        labelText="Date Picker label"
        data-testid="input-value"
        decorator={<AILabel />}
      />
    );

    expect(screen.getByRole('button')).toHaveClass(
      `${prefix}--ai-label__button`
    );
  });

  it('should respect deprecated slug prop', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <DatePickerInput
        id="date-picker-input-id-start"
        placeholder="mm/dd/yyyy"
        labelText="Date Picker label"
        data-testid="input-value"
        slug={<AILabel />}
      />
    );

    expect(screen.getByRole('button')).toHaveClass(
      `${prefix}--ai-label__button`
    );
    spy.mockRestore();
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

  it('should show only invalid text when both invalid and warn are true in fluid mode', () => {
    render(
      <FormContext.Provider value={{ isFluid: true }}>
        <DatePicker
          datePickerType="single"
          invalid={true}
          invalidText="Invalid date"
          warn={true}
          warnText="Warning message">
          <DatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
          />
        </DatePicker>
      </FormContext.Provider>
    );
    expect(screen.getByText('Invalid date')).toBeInTheDocument();
    expect(screen.queryByText('Warning message')).not.toBeInTheDocument();
  });

  it('should show only warning text when warn is true and invalid is false in fluid mode', () => {
    render(
      <FormContext.Provider value={{ isFluid: true }}>
        <DatePicker
          datePickerType="single"
          invalid={false}
          invalidText="Invalid date"
          warn={true}
          warnText="Warning message">
          <DatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
          />
        </DatePicker>
      </FormContext.Provider>
    );
    expect(screen.getByText('Warning message')).toBeInTheDocument();
    expect(screen.queryByText('Invalid date')).not.toBeInTheDocument();
  });

  it('should not show any error text when both invalid and warn are false in fluid mode', () => {
    render(
      <FormContext.Provider value={{ isFluid: true }}>
        <DatePicker
          datePickerType="single"
          invalid={false}
          invalidText="Invalid date"
          warn={false}
          warnText="Warning message">
          <DatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
          />
        </DatePicker>
      </FormContext.Provider>
    );
    expect(screen.queryByText('Invalid date')).not.toBeInTheDocument();
    expect(screen.queryByText('Warning message')).not.toBeInTheDocument();
  });

  describe('Invalid and Warning States with Disabled/ReadOnly', () => {
    it('should not show invalid state when disabled', () => {
      render(
        <DatePicker datePickerType="single">
          <DatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
            invalid={true}
            invalidText="Invalid date"
            disabled={true}
          />
        </DatePicker>
      );

      expect(screen.queryByText('Invalid date')).not.toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-node-access
      expect(
        document.querySelector(`.${prefix}--date-picker__icon--invalid`)
      ).not.toBeInTheDocument();
    });

    it('should not show warning state when disabled', () => {
      render(
        <DatePicker datePickerType="single">
          <DatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
            warn={true}
            warnText="Warning message"
            disabled={true}
          />
        </DatePicker>
      );

      expect(screen.queryByText('Warning message')).not.toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-node-access
      expect(
        document.querySelector(`.${prefix}--date-picker__icon--warn`)
      ).not.toBeInTheDocument();
    });

    it('should not show invalid state when readOnly', () => {
      render(
        <DatePicker datePickerType="single" readOnly={true}>
          <DatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
            invalid={true}
            invalidText="Invalid date"
          />
        </DatePicker>
      );

      expect(screen.queryByText('Invalid date')).not.toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-node-access
      expect(
        document.querySelector(`.${prefix}--date-picker__icon--invalid`)
      ).not.toBeInTheDocument();
    });

    it('should not show warning state when readOnly', () => {
      render(
        <DatePicker datePickerType="single" readOnly={true}>
          <DatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
            warn={true}
            warnText="Warning message"
          />
        </DatePicker>
      );

      expect(screen.queryByText('Warning message')).not.toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-node-access
      expect(
        document.querySelector(`.${prefix}--date-picker__icon--warn`)
      ).not.toBeInTheDocument();
    });
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

  it('should remove the calendar if changed from another type to simple', () => {
    const { rerender } = render(
      <DatePicker datePickerType="single">
        <DatePickerInput
          id="date-picker-input-id-start"
          labelText="Start date"
        />
      </DatePicker>
    );
    expect(screen.getByRole('application')).toBeInTheDocument();
    rerender(
      <DatePicker datePickerType="simple">
        <DatePickerInput
          id="date-picker-input-id-start"
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

    it.skip('should initialize a calendar when using react.lazy', async () => {
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

  it('should add the calendar if changed from simple type to single', () => {
    const { rerender } = render(
      <DatePicker datePickerType="simple">
        <DatePickerInput
          id="date-picker-input-id-start"
          labelText="Start date"
        />
      </DatePicker>
    );
    expect(screen.queryByRole('application')).not.toBeInTheDocument();
    rerender(
      <DatePicker datePickerType="single">
        <DatePickerInput
          id="date-picker-input-id-start"
          labelText="Start date"
        />
      </DatePicker>
    );
    expect(screen.getByRole('application')).toBeInTheDocument();
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

  it('should clear calendar when value is set to null', async () => {
    const DatePickerExample = () => {
      const [date, setDate] = useState('01/20/1989');
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
              setDate(null);
            }}>
            clear
          </button>
        </>
      );
    };

    render(<DatePickerExample />);
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

  it('should close calendar with single type on focus loss', async () => {
    const onClose = jest.fn();
    render(
      <DatePicker datePickerType="single" onClose={onClose}>
        <DatePickerInput id="input-id" labelText="Date input" />
      </DatePicker>
    );

    const dateInput = screen.getByLabelText('Date input');

    // close on pressing TAB from calendar
    expect(document.body).toHaveFocus();
    await userEvent.tab();
    expect(dateInput).toHaveFocus();
    await userEvent.tab();
    expect(document.activeElement).toHaveClass(`flatpickr-day`);
    await userEvent.tab();
    expect(document.body).toHaveFocus();
    expect(onClose).toHaveBeenCalledTimes(1);

    // close on pressing SHIFT+TAB from date input
    await userEvent.tab();
    expect(dateInput).toHaveFocus();
    await userEvent.tab();
    expect(document.activeElement).toHaveClass(`flatpickr-day`);
    await userEvent.tab({ shift: true });
    expect(dateInput).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(document.body).toHaveFocus();
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});

describe('Range date picker', () => {
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

    await userEvent.type(theStart, '2023-01-05{enter}');
    await userEvent.type(theEnd, '2023-01-19{enter}');
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(screen.getByRole('application')).toHaveClass('open');
    await userEvent.keyboard('{escape}');
    expect(screen.getByRole('application')).not.toHaveClass('open');
  });

  it('clearing end date should not cause console warnings', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <DatePicker onChange={() => {}} datePickerType="range" dateFormat="m/d/Y">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start Date"
          data-testid="input-value-start"
        />
        <DatePickerInput
          id="date-picker-input-id-end"
          placeholder="mm/dd/yyyy"
          labelText="End Date"
          data-testid="input-value-end"
        />
      </DatePicker>
    );
    await userEvent.type(
      screen.getByLabelText('Start Date'),
      '01/01/2024{enter}'
    );
    await userEvent.type(
      screen.getByLabelText('End Date'),
      '01/15/2024{enter}'
    );

    // Ensure the dates are correctly populated
    expect(screen.getByLabelText('Start Date')).toHaveValue('01/01/2024');
    expect(screen.getByLabelText('End Date')).toHaveValue('01/15/2024');

    // Clear the end date
    await userEvent.clear(screen.getByLabelText('End Date'));
    expect(screen.getByLabelText('End Date')).toHaveValue('');

    // Click on the start date input after clearing the end date
    await userEvent.click(screen.getByLabelText('Start Date'));
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('should add the calendar if changed from simple type to range', () => {
    const { rerender } = render(
      <DatePicker datePickerType="simple">
        <DatePickerInput
          id="date-picker-input-id-start"
          labelText="Start date"
        />
      </DatePicker>
    );
    expect(screen.queryByRole('application')).not.toBeInTheDocument();
    rerender(
      <DatePicker datePickerType="range">
        <DatePickerInput
          id="date-picker-input-id-start"
          labelText="Start date"
        />
        <DatePickerInput id="date-picker-input-id-end" labelText="End date" />
      </DatePicker>
    );
    expect(screen.getByRole('application')).toBeInTheDocument();
  });

  it('end date in range mode should not retain old value after setting to null', async () => {
    const DatePickerExample = () => {
      const resetValues = { fromDate: null, toDate: null };
      const [dateRange, setDateRange] = useState(resetValues);
      const onChange = ({ fromDate, toDate }) => {
        setDateRange({ fromDate, toDate });
      };
      return (
        <>
          <DatePicker
            datePickerType="range"
            onChange={(dates) => {
              const [start, end] = dates;
              onChange({ fromDate: start, toDate: end });
            }}
            value={
              dateRange ? [dateRange.fromDate, dateRange.toDate] : [null, null]
            }>
            <DatePickerInput
              id="fromDate"
              placeholder="mm/dd/yyyy"
              labelText="FromDate"
            />
            <DatePickerInput
              id="toDate"
              placeholder="mm/dd/yyyy"
              labelText="ToDate"
            />
          </DatePicker>
          <button type="button" onClick={() => setDateRange(resetValues)}>
            reset
          </button>
        </>
      );
    };
    render(<DatePickerExample />);

    // populate fromDate and toDate values
    await userEvent.type(
      screen.getByLabelText('FromDate'),
      '01/14/2025{enter}'
    );
    await userEvent.type(screen.getByLabelText('ToDate'), '02/10/2025{enter}');

    // reset both values
    await userEvent.click(screen.getByText('reset'));

    // assert that toDate is empty
    expect(screen.getByLabelText('ToDate')).toHaveValue('');

    // populate fromDate
    await userEvent.type(
      screen.getByLabelText('FromDate'),
      '01/14/2025{enter}'
    );

    // assert that toDate is still empty
    expect(screen.getByLabelText('ToDate')).toHaveValue('');
  });

  it('should clear calendar when value is set to empty array', async () => {
    const DatePickerExample = () => {
      const [dateRange, setDateRange] = useState(['01/14/2025', '02/10/2025']);
      return (
        <>
          <DatePicker
            datePickerType="range"
            value={dateRange}
            onChange={(dates) => {
              setDateRange(dates);
            }}>
            <DatePickerInput
              id="fromDate"
              placeholder="mm/dd/yyyy"
              labelText="FromDate"
            />
            <DatePickerInput
              id="toDate"
              placeholder="mm/dd/yyyy"
              labelText="ToDate"
            />
          </DatePicker>
          <button type="button" onClick={() => setDateRange([])}>
            clear
          </button>
        </>
      );
    };
    render(<DatePickerExample />);

    expect(screen.getByLabelText('FromDate')).toHaveValue('01/14/2025');
    expect(screen.getByLabelText('ToDate')).toHaveValue('02/10/2025');

    await userEvent.click(screen.getByText('clear'));

    expect(screen.getByLabelText('FromDate')).toHaveValue('');
    expect(screen.getByLabelText('ToDate')).toHaveValue('');
  });

  it('should clear calendar when value is set to array of empty strings', async () => {
    const DatePickerExample = () => {
      const [dateRange, setDateRange] = useState(['01/14/2025', '02/10/2025']);
      return (
        <>
          <DatePicker
            datePickerType="range"
            value={dateRange}
            onChange={(dates) => {
              setDateRange(dates);
            }}>
            <DatePickerInput
              id="fromDate"
              placeholder="mm/dd/yyyy"
              labelText="FromDate"
            />
            <DatePickerInput
              id="toDate"
              placeholder="mm/dd/yyyy"
              labelText="ToDate"
            />
          </DatePicker>
          <button type="button" onClick={() => setDateRange(['', ''])}>
            clear
          </button>
        </>
      );
    };
    render(<DatePickerExample />);

    expect(screen.getByLabelText('FromDate')).toHaveValue('01/14/2025');
    expect(screen.getByLabelText('ToDate')).toHaveValue('02/10/2025');

    await userEvent.click(screen.getByText('clear'));

    expect(screen.getByLabelText('FromDate')).toHaveValue('');
    expect(screen.getByLabelText('ToDate')).toHaveValue('');
  });

  it('should clear calendar when value is set to array of undefined', async () => {
    const DatePickerExample = () => {
      const [dateRange, setDateRange] = useState(['01/14/2025', '02/10/2025']);
      return (
        <>
          <DatePicker
            datePickerType="range"
            value={dateRange}
            onChange={(dates) => {
              setDateRange(dates);
            }}>
            <DatePickerInput
              id="fromDate"
              placeholder="mm/dd/yyyy"
              labelText="FromDate"
            />
            <DatePickerInput
              id="toDate"
              placeholder="mm/dd/yyyy"
              labelText="ToDate"
            />
          </DatePicker>
          <button
            type="button"
            onClick={() => setDateRange([undefined, undefined])}>
            clear
          </button>
        </>
      );
    };
    render(<DatePickerExample />);

    expect(screen.getByLabelText('FromDate')).toHaveValue('01/14/2025');
    expect(screen.getByLabelText('ToDate')).toHaveValue('02/10/2025');

    await userEvent.click(screen.getByText('clear'));

    expect(screen.getByLabelText('FromDate')).toHaveValue('');
    expect(screen.getByLabelText('ToDate')).toHaveValue('');
  });

  it('should close calendar with range type on focus loss', async () => {
    const onClose = jest.fn();
    render(
      <DatePicker datePickerType="range" onClose={onClose}>
        <DatePickerInput id="start-input-id" labelText="Start input" />
        <DatePickerInput id="end-input-id" labelText="End input" />
      </DatePicker>
    );

    const startInput = screen.getByLabelText('Start input');
    const endInput = screen.getByLabelText('End input');

    // close on pressing TAB from calendar after navigating past end date input
    expect(document.body).toHaveFocus();
    await userEvent.tab();
    expect(startInput).toHaveFocus();
    await userEvent.tab();
    expect(document.activeElement).toHaveClass(`flatpickr-day`);
    await userEvent.tab();
    expect(endInput).toHaveFocus();
    await userEvent.tab();
    expect(document.activeElement).toHaveClass(`flatpickr-day`);
    await userEvent.tab();
    expect(document.body).toHaveFocus();
    expect(onClose).toHaveBeenCalledTimes(1);

    // close on pressing SHIFT+TAB from start date input
    await userEvent.tab();
    expect(startInput).toHaveFocus();
    await userEvent.tab();
    expect(document.activeElement).toHaveClass(`flatpickr-day`);
    await userEvent.tab({ shift: true });
    expect(startInput).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(document.body).toHaveFocus();
    expect(onClose).toHaveBeenCalledTimes(2);
  });
  it('should log a one-time warning when `value` prop is passed directly to DatePickerInput', () => {
    const consoleWarnSpy = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    render(
      <DatePickerInput
        id="test-input-1"
        labelText="Test Label 1"
        placeholder="mm/dd/yyyy"
        value="2023-01-01"
      />
    );
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    consoleWarnSpy.mockRestore();
  });

  describe('rangePlugin', () => {
    it('should set start and end input values correctly when calling setDate with triggerChange=false', async () => {
      const ref = React.createRef();

      render(
        <DatePicker ref={ref} datePickerType="range" value={undefined}>
          <DatePickerInput
            id="start"
            placeholder="mm/dd/yyyy"
            labelText="Start date"
            data-testid="start-input"
          />
          <DatePickerInput
            id="end"
            placeholder="mm/dd/yyyy"
            labelText="End date"
            data-testid="end-input"
          />
        </DatePicker>
      );

      const fp = ref.current.calendar;
      const start = await screen.findByTestId('start-input');
      const end = await screen.findByTestId('end-input');

      // Call `setDate` with two dates and `triggerChange` equal to `false`,
      // which is where the `rangePlugin` logic should be triggered to set
      // values on both inputs.
      fp.setDate(['01/05/2025', '01/10/2025'], false, 'm/d/Y');

      expect(start.value).toBe('01/05/2025');
      expect(end.value).toBe('01/10/2025');

      // Verify clearing the end date keeps the start date while clearing the
      // end date.
      fp.setDate(['01/15/2025', null], false, 'm/d/Y');

      expect(start.value).toBe('01/15/2025');
      expect(end.value).toBe('');

      // Verify that calling `setDate` again with both dates updates both
      // fields.
      fp.setDate(['02/01/2025', '02/14/2025'], false, 'm/d/Y');

      expect(start.value).toBe('02/01/2025');
      expect(end.value).toBe('02/14/2025');
    });

    it('should not write both dates into the first input', async () => {
      const ref = React.createRef();

      render(
        <DatePicker ref={ref} datePickerType="range" value={undefined}>
          <DatePickerInput
            id="start-2"
            placeholder="mm/dd/yyyy"
            labelText="Start date"
            data-testid="start-input-2"
          />
          <DatePickerInput
            id="end-2"
            placeholder="mm/dd/yyyy"
            labelText="End date"
            data-testid="end-input-2"
          />
        </DatePicker>
      );

      const fp = ref.current.calendar;
      const start = await screen.findByTestId('start-input-2');
      const end = await screen.findByTestId('end-input-2');

      // When `triggerChange` is `false`, flatpickr's default behavior could
      // leave both dates reflected only in the first input. The plugin should
      // ensure each input is updated correctly.
      fp.setDate(['03/03/2025', '03/09/2025'], false, 'm/d/Y');

      expect(start.value).toBe('03/03/2025');
      expect(end.value).toBe('03/09/2025');
    });
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

  it('should render in month-year order per en locale rules', async () => {
    render(
      <DatePicker
        onChange={() => {}}
        datePickerType="single"
        locale="en"
        value="01/01/2022">
        <DatePickerInput
          id="date-picker-input-id"
          placeholder="mm/dd/yyyy"
          labelText="Date picker label"
          data-testid="input"
        />
      </DatePicker>
    );

    await userEvent.click(screen.getByTestId('input'));
    const year = screen.getByDisplayValue('2022');
    const month = screen.getByText('January');
    expect(year).toBeInTheDocument();
    expect(month).toBeInTheDocument();
    expect(month.compareDocumentPosition(year)).toBe(4);
  });
  it('should render in year-month order per japanese locale rules', async () => {
    render(
      <DatePicker
        onChange={() => {}}
        datePickerType="single"
        locale="ja"
        value="01/01/2022">
        <DatePickerInput
          id="date-picker-input-id"
          placeholder="mm/dd/yyyy"
          labelText="Date picker label"
          data-testid="input"
        />
      </DatePicker>
    );

    await userEvent.click(screen.getByTestId('input'));
    const year = screen.getByDisplayValue('2022');
    const month = screen.getByText('1月');
    expect(year).toBeInTheDocument();
    expect(month).toBeInTheDocument();
    expect(month.compareDocumentPosition(year)).toBe(2);
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

  it('should append the calendar to a custom container using the `appendTo` prop', async () => {
    const customContainer = document.createElement('div');

    document.body.appendChild(customContainer);

    render(
      <DatePicker
        datePickerType="single"
        appendTo={customContainer}
        value="01/01/2025">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Label"
          data-testid="date-picker-1"
        />
      </DatePicker>
    );

    const input = screen.getByTestId('date-picker-1');

    expect(screen.getByRole('application').parentElement).toBe(customContainer);

    await userEvent.click(input);

    expect(screen.getByRole('application').parentElement).toBe(customContainer);

    document.body.removeChild(customContainer);
  });
});
