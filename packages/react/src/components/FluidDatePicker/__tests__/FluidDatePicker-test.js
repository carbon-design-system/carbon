/**
 * Copyright IBM Corp. 2022, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidDatePicker from '../FluidDatePicker';
import FluidDatePickerInput from '../../FluidDatePickerInput';
import DatePickerInput from '../../DatePickerInput';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('FluidDatePicker', () => {
  describe('renders as expected - Component API', () => {
    it('should add extra classes that are passed via className', () => {
      render(
        <FluidDatePicker
          onChange={() => {}}
          className="custom-class"
          dateFormat="m/d/Y"
          data-testid="datePicker-1">
          <FluidDatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Start date"
          />
          <FluidDatePickerInput
            id="date-picker-input-id-finish"
            placeholder="mm/dd/yyyy"
            labelText="End date"
          />
        </FluidDatePicker>
      );

      expect(screen.getByTestId('datePicker-1')).toHaveClass('custom-class');
    });

    it('should add fluid classes by default', () => {
      render(
        <FluidDatePicker
          onChange={() => {}}
          className="custom-class"
          dateFormat="m/d/Y"
          data-testid="datePicker-1">
          <FluidDatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Start date"
          />
          <FluidDatePickerInput
            id="date-picker-input-id-finish"
            placeholder="mm/dd/yyyy"
            labelText="End date"
          />
        </FluidDatePicker>
      );

      expect(screen.getByTestId('datePicker-1')).toHaveClass(
        `${prefix}--date-picker--fluid`
      );
    });

    it('should add disabled classes when disabled', () => {
      render(
        <FluidDatePicker disabled data-testid="datePicker">
          <FluidDatePickerInput labelText="Start date" id="start" />
        </FluidDatePicker>
      );

      expect(screen.getByTestId('datePicker')).toHaveClass(
        `${prefix}--date-picker--fluid--disabled`
      );
      expect(screen.getByLabelText('Start date')).toBeDisabled();
    });

    it.each([FluidDatePickerInput, DatePickerInput])(
      'should disable both range inputs when only the wrapper is disabled (%#)',
      (Input) => {
        const { rerender } = render(
          <FluidDatePicker disabled datePickerType="range">
            <Input labelText="Start date" id="start" disabled={false} />
            <Input labelText="End date" id="end" />
          </FluidDatePicker>
        );

        expect(screen.getByLabelText('Start date')).toBeDisabled();
        expect(screen.getByLabelText('End date')).toBeDisabled();

        rerender(
          <FluidDatePicker disabled={false} datePickerType="range">
            <Input labelText="Start date" id="start" disabled={false} />
            <Input labelText="End date" id="end" />
          </FluidDatePicker>
        );

        expect(screen.getByLabelText('Start date')).toBeEnabled();
        expect(screen.getByLabelText('End date')).toBeEnabled();
      }
    );

    it.each([undefined, false])(
      'should preserve individually disabled inputs when disabled is %s',
      (disabled) => {
        render(
          <FluidDatePicker disabled={disabled} datePickerType="range">
            <FluidDatePickerInput labelText="Start date" id="start" disabled />
            <FluidDatePickerInput labelText="End date" id="end" />
          </FluidDatePicker>
        );

        expect(screen.getByLabelText('Start date')).toBeDisabled();
        expect(screen.getByLabelText('End date')).toBeEnabled();
      }
    );
  });
});
