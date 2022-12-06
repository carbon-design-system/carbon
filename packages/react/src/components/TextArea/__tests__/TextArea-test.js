/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TextArea from '../TextArea';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('TextArea', () => {
  describe('behaves as expected - Component API', () => {
    it('should respect readOnly prop', () => {
      const onChange = jest.fn();
      const onClick = jest.fn();
      render(
        <TextArea
          id="input-1"
          labelText="TextArea label"
          onClick={onClick}
          onChange={onChange}
          readOnly
          value="test"
        />
      );

      // Click events should fire
      userEvent.click(screen.getByRole('textbox'));
      expect(onClick).toHaveBeenCalledTimes(1);

      // Change events should *not* fire
      userEvent.type(screen.getByRole('textbox'), 'x');
      expect(screen.getByRole('textbox')).not.toHaveValue('x');
      expect(onChange).toHaveBeenCalledTimes(0);
    });
  });
});
