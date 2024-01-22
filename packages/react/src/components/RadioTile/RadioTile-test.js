/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import RadioTile from './RadioTile';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('RadioTile', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      render(
        <RadioTile value="standard" data-testid="test-id">
          Option 1
        </RadioTile>
      );

      // eslint-disable-next-line testing-library/no-node-access
      expect(document.querySelector('.cds--tile')).toHaveAttribute(
        'data-testid',
        'test-id'
      );
    });

    it('should respect checked prop', () => {
      render(
        <RadioTile value="standard" checked data-testid="test-id">
          Option 1
        </RadioTile>
      );

      expect(screen.getByRole('radio')).toBeChecked();
      expect(screen.getByTestId('test-id')).toHaveClass(
        'cds--tile--is-selected'
      );
    });

    it('should support a custom `className` prop on the outermost element', () => {
      render(
        <RadioTile
          value="standard"
          className="custom-class"
          data-testid="test-id">
          Option 1
        </RadioTile>
      );

      expect(screen.getByTestId('test-id')).toHaveClass('custom-class');
    });

    it('should respect disabled prop', () => {
      render(
        <RadioTile value="standard" disabled data-testid="test-id">
          Option 1
        </RadioTile>
      );

      expect(screen.getByRole('radio')).toBeDisabled();
      expect(screen.getByTestId('test-id')).toHaveClass('cds--tile--disabled');
    });

    it('should respect id prop', () => {
      render(
        <RadioTile value="standard" id="tile-1">
          Option 1
        </RadioTile>
      );

      expect(screen.getByRole('radio')).toHaveAttribute('id', 'tile-1');
    });

    it('should add name to input', () => {
      render(
        <RadioTile value="standard" name="tile">
          Option 1
        </RadioTile>
      );

      expect(screen.getByRole('radio')).toHaveAttribute('name', 'tile');
    });

    it('should call onChange when expected', async () => {
      const onChange = jest.fn();
      render(
        <RadioTile value="standard" onChange={onChange}>
          Option 1
        </RadioTile>
      );

      await userEvent.click(screen.getByRole('radio'));

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should respect tabIndex prop', () => {
      render(
        <RadioTile value="standard" tabIndex={-1}>
          Option 1
        </RadioTile>
      );

      expect(screen.getByRole('radio')).toHaveAttribute('tabIndex', '-1');
    });

    it('should respect value prop', () => {
      render(<RadioTile value="standard">Option 1</RadioTile>);

      expect(screen.getByDisplayValue('standard')).toBeInTheDocument();
    });

    it('should pass a given ref to the input element', () => {
      const ref = React.createRef();
      render(
        <RadioTile ref={ref} value="some test value">
          Option 1
        </RadioTile>
      );

      expect(ref.current.type).toEqual('radio');
      expect(ref.current.value).toEqual('some test value');
    });
  });
});
