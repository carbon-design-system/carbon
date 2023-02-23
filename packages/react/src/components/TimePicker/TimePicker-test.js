/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { default as TimePicker } from './TimePicker';
import SelectItem from '../SelectItem';
import TimePickerSelect from '../TimePickerSelect/TimePickerSelect.js';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('TimePicker', () => {
  describe('input', () => {
    it('renders as expected', () => {
      render(<TimePicker id="time-picker" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('passes classNames as expected', () => {
      render(<TimePicker id="time-picker" className="🚀" />);
      expect(screen.getByRole('textbox')).toHaveClass('🚀');
    });

    it('should set type as expected', () => {
      render(<TimePicker id="time-picker" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('should set value as expected', () => {
      render(<TimePicker id="time-picker" value="🐶" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('value', '🐶');
    });

    it('should set disabled as expected', () => {
      const onClick = jest.fn();
      render(<TimePicker id="time-picker" onClick={onClick} disabled />);
      fireEvent.click(screen.getByRole('textbox'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should behave readonly as expected', () => {
      const onClick = jest.fn();
      const onChange = jest.fn();

      render(
        <TimePicker
          id="time-picker"
          onClick={onClick}
          onChange={onChange}
          readOnly={true}>
          <TimePickerSelect id="time-picker-select-1">
            <SelectItem value="AM" text="AM" />
            <SelectItem value="PM" text="PM" />
          </TimePickerSelect>
          <TimePickerSelect id="time-picker-select-2">
            <SelectItem value="Time zone 1" text="Time zone 1" />
            <SelectItem value="Time zone 2" text="Time zone 2" />
          </TimePickerSelect>
        </TimePicker>
      );

      const input = screen.getByRole('textbox');
      userEvent.click(input);
      expect(onClick).toHaveBeenCalled();
      expect(input).toHaveAttribute('readonly');

      userEvent.type(input, '01:50');
      expect(onChange).not.toHaveBeenCalled();

      screen.getByDisplayValue('AM');
      screen.getByDisplayValue('Time zone 1');

      //------------------------------------------------------------------------
      // Testing library - userEvent.type() does not work on <select> elements
      // and using selectOption causes the value to change.
      // Ideally we'd use userEvent.type(theSelect, '{arrowdown}{enter}') to test the readOnly prop
      // or have a way to click on a slotted option.
      // https://github.com/testing-library/user-event/issues/786
      //------------------------------------------------------------------------
      // userEvent.selectOptions(theSelect, 'option-1'); // unfortunately this bypasses the readOnly prop

      // Change events should *not* fire
      // expect(screen.getByText('Option 1').selected).toBe(false);
    });

    it('should set placeholder as expected', () => {
      render(<TimePicker id="time-picker" placeholder="🧸" />);
      expect(screen.getByPlaceholderText('🧸')).toBeInTheDocument();
    });
  });

  describe('label', () => {
    it('does not render a label by default', () => {
      render(<TimePicker id="time-picker" />);
      expect(screen.queryByLabelText('🐳')).not.toBeInTheDocument();
    });

    it('renders a label as expected', () => {
      render(<TimePicker id="time-picker" labelText="🐳" />);
      expect(screen.getByLabelText('🐳')).toBeInTheDocument();
    });
  });

  describe('events', () => {
    it('should write text inside the textbox', () => {
      render(<TimePicker id="time-picker" />);
      userEvent.type(screen.getByRole('textbox'), '🧛');
      expect(screen.getByRole('textbox')).toHaveValue('🧛');
    });
  });
});
