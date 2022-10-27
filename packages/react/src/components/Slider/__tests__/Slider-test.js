/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Slider from '../Slider';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('Slider', () => {
  describe('behaves as expected - Component API', () => {
    it('should respect work normally when not readonly prop', () => {
      const onChange = jest.fn();
      const onClick = jest.fn();

      render(
        <Slider
          id="Slider-1"
          className="extra-class"
          label="Slider label"
          onClick={onClick}
          onChange={onChange}
          value={1}
          min={1}
          max={3}
          step={1}
        />
      );

      // Click events should fire
      const theSlider = screen.getByRole('slider');
      userEvent.click(theSlider);
      expect(onClick).toHaveBeenCalledTimes(1);

      userEvent.type(theSlider, '{arrowright}');

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          value: 2,
        })
      );

      const theInput = screen.getByRole('spinbutton');
      userEvent.type(theInput, '{selectall}3');
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          value: 3,
        })
      );
    });

    it('should respect readOnly prop', () => {
      const onChange = jest.fn();
      const onClick = jest.fn();

      render(
        <Slider
          id="Slider-1"
          className="extra-class"
          label="Slider label"
          readOnly={true}
          onClick={onClick}
          onChange={onChange}
          value={1}
          min={1}
          max={3}
          step={1}
        />
      );

      // Click events should fire
      const theSlider = screen.getByRole('slider');
      userEvent.click(theSlider);
      expect(onClick).toHaveBeenCalledTimes(1);

      userEvent.type(theSlider, '{arrowright}');

      const theInput = screen.getByRole('spinbutton');
      userEvent.type(theInput, '{selectall}3');

      expect(onChange).toHaveBeenCalledTimes(0);
    });
  });
});
