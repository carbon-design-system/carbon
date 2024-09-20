/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidTimePicker from '../FluidTimePicker';
import FluidTimePickerSelect from '../../FluidTimePickerSelect';
import SelectItem from '../../SelectItem';
import { fireEvent, render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('FluidTimePicker', () => {
  describe('renders as expected - Component API', () => {
    it('should add extra classes that are passed via className', () => {
      const { container } = render(
        <FluidTimePicker
          className="custom-class"
          id="time=picker-1"
          data-testid="timePicker-1"
          labelText="Time">
          <FluidTimePickerSelect id="select-1" labelText="Clock">
            <SelectItem value="am" text="AM" />
            <SelectItem value="pm" text="PM" />
          </FluidTimePickerSelect>
          <FluidTimePickerSelect id="select-2" labelText="Timezone">
            <SelectItem value="et" text="Eastern Time (ET)" />
            <SelectItem value="ct" text="Central Time (CT)" />
            <SelectItem value="mt" text="Mountain Time (MT)" />
            <SelectItem value="pt" text="Pacific Time (PT)" />
          </FluidTimePickerSelect>
        </FluidTimePicker>
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should add fluid classes by default', () => {
      const { container } = render(
        <FluidTimePicker
          className="custom-class"
          id="time=picker-1"
          data-testid="timePicker-1"
          labelText="Time">
          <FluidTimePickerSelect id="select-1" labelText="Clock">
            <SelectItem value="am" text="AM" />
            <SelectItem value="pm" text="PM" />
          </FluidTimePickerSelect>
          <FluidTimePickerSelect id="select-2" labelText="Timezone">
            <SelectItem value="et" text="Eastern Time (ET)" />
            <SelectItem value="ct" text="Central Time (CT)" />
            <SelectItem value="mt" text="Mountain Time (MT)" />
            <SelectItem value="pt" text="Pacific Time (PT)" />
          </FluidTimePickerSelect>
        </FluidTimePicker>
      );

      expect(container.firstChild).toHaveClass(`${prefix}--time-picker--fluid`);
    });

    it('returns invalidText when invalid is true', async () => {
      render(
        <FluidTimePicker
          className="custom-class"
          id="time=picker-1"
          data-testid="timePicker-1"
          labelText="Time"
          invalid
          invalidText="Invalid text">
          <FluidTimePickerSelect id="select-1" labelText="Clock">
            <SelectItem value="am" text="AM" />
            <SelectItem value="pm" text="PM" />
          </FluidTimePickerSelect>
          <FluidTimePickerSelect id="select-2" labelText="Timezone">
            <SelectItem value="et" text="Eastern Time (ET)" />
            <SelectItem value="ct" text="Central Time (CT)" />
            <SelectItem value="mt" text="Mountain Time (MT)" />
            <SelectItem value="pt" text="Pacific Time (PT)" />
          </FluidTimePickerSelect>
        </FluidTimePicker>
      );
      await expect(screen.getByText('Invalid text')).toBeInTheDocument();
    });

    it('returns warnText when warn is true', async () => {
      render(
        <FluidTimePicker
          className="custom-class"
          id="time=picker-1"
          data-testid="timePicker-1"
          labelText="Time"
          warn
          warnText="Warn text">
          <FluidTimePickerSelect id="select-1" labelText="Clock">
            <SelectItem value="am" text="AM" />
            <SelectItem value="pm" text="PM" />
          </FluidTimePickerSelect>
          <FluidTimePickerSelect id="select-2" labelText="Timezone">
            <SelectItem value="et" text="Eastern Time (ET)" />
            <SelectItem value="ct" text="Central Time (CT)" />
            <SelectItem value="mt" text="Mountain Time (MT)" />
            <SelectItem value="pt" text="Pacific Time (PT)" />
          </FluidTimePickerSelect>
        </FluidTimePicker>
      );
      await expect(screen.getByText('Warn text')).toBeInTheDocument();
    });

    it('should set disabled as expected', () => {
      const onClick = jest.fn();

      render(
        <FluidTimePicker
          className="custom-class"
          id="time=picker-1"
          data-testid="timePicker-1"
          labelText="Time"
          onClick={onClick}
          disabled>
          <FluidTimePickerSelect id="select-1" labelText="Clock">
            <SelectItem value="am" text="AM" />
            <SelectItem value="pm" text="PM" />
          </FluidTimePickerSelect>
          <FluidTimePickerSelect id="select-2" labelText="Timezone">
            <SelectItem value="et" text="Eastern Time (ET)" />
            <SelectItem value="ct" text="Central Time (CT)" />
            <SelectItem value="mt" text="Mountain Time (MT)" />
            <SelectItem value="pt" text="Pacific Time (PT)" />
          </FluidTimePickerSelect>
        </FluidTimePicker>
      );

      fireEvent.click(screen.getByRole('textbox'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
