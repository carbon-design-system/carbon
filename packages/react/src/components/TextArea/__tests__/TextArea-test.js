/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TextArea from '../TextArea';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import { render, screen } from '@testing-library/react';

describe('TextArea', () => {
  describe('behaves as expected - Component API', () => {
    it('should respect readOnly prop', async () => {
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
      await userEvent.click(screen.getByRole('textbox'));
      expect(onClick).toHaveBeenCalledTimes(1);

      // Change events should *not* fire
      await userEvent.type(screen.getByRole('textbox'), 'x');
      expect(screen.getByRole('textbox')).not.toHaveValue('x');
      expect(onChange).toHaveBeenCalledTimes(0);
    });
  });

  describe('word counter behaves as expected', () => {
    it('should correctly increase word count', () => {
      render(
        <TextArea
          id="input-1"
          labelText="TextArea label"
          enableCounter
          maxCount={10}
          counterMode="words"
        />
      );

      // by default should show 0
      expect(screen.getByText('0/10')).toBeInTheDocument();

      fireEvent.change(screen.getByRole('textbox'), {
        target: {
          value: 'one two three four five six seven eight nine ten eleven',
        },
      });

      expect(screen.getByText('10/10')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveValue(
        'one two three four five six seven eight nine ten'
      );
    });

    it('should correctly decrease word count', () => {
      render(
        <TextArea
          id="input-1"
          labelText="TextArea label"
          enableCounter
          maxCount={10}
          counterMode="words"
          defaultValue="one two three four"
        />
      );

      // by default should show 4
      expect(screen.getByText('4/10')).toBeInTheDocument();

      fireEvent.change(screen.getByRole('textbox'), {
        target: {
          value: 'one two three',
        },
      });

      expect(screen.getByText('3/10')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveValue('one two three');
    });
  });
});
