/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidDatePicker from '../FluidDatePicker';
import FluidDatePickerInput from '../../FluidDatePickerInput';
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
  });
});
