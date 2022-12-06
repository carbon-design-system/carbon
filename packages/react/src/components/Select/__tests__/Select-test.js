/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Select from '../Select';
import SelectItem from '../../SelectItem';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('Select', () => {
  describe('behaves as expected - Component API', () => {
    it.skip('should respect readOnly prop', () => {
      const onChange = jest.fn();
      const onClick = jest.fn();

      render(
        <Select
          id="select-1"
          label="Select label"
          readOnly={true}
          onClick={onClick}
          onChange={onChange}>
          <SelectItem text="Choose an option" value="placeholder-item" />
          <SelectItem text="Option 1" value="option-1" />
          <SelectItem text="Option 2" value="option-2" />
        </Select>
      );

      // Click events should fire
      const theSelect = screen.getByRole('combobox');
      userEvent.click(theSelect);
      expect(onClick).toHaveBeenCalledTimes(1);

      //------------------------------------------------------------------------
      // Testing library - userEvent.type() does not work on <select> elements
      // and using selectOption causes the value to change.
      // Ideally we'd use userEvent.type(theSelect, '{arrowdown}{enter}') to test the readOnly prop
      // or have a way to click on a slotted option.
      // https://github.com/testing-library/user-event/issues/786
      //------------------------------------------------------------------------
      userEvent.selectOptions(theSelect, 'option-1');

      // Change events should *not* fire
      expect(screen.getByText('Option 1').selected).toBe(false);

      expect(onChange).toHaveBeenCalledTimes(0);
    });
  });
});
