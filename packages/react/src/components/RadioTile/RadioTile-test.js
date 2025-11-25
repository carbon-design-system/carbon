/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import RadioTile from './RadioTile';
import { AILabel } from '../AILabel';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { FeatureFlags } from '../FeatureFlags';

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
      await userEvent.keyboard('{Enter}');

      expect(onChange).toHaveBeenCalledTimes(2);
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
    it('should pass "required" prop to the input element', () => {
      render(
        <RadioTile required value="some test value">
          Option 1
        </RadioTile>
      );
      expect(screen.getByRole('radio')).toHaveAttribute('required');
    });

    it('should apply "aria-describedby" to the input element', () => {
      render(
        <RadioTile value="standard" aria-describedby="description-id">
          Option 1
        </RadioTile>
      );

      expect(screen.getByRole('radio')).toHaveAttribute(
        'aria-describedby',
        'description-id'
      );
    });

    it('should apply "aria-labelledby" to the input element', () => {
      render(
        <RadioTile value="standard" aria-labelledby="label-id">
          Option 1
        </RadioTile>
      );

      expect(screen.getByRole('radio')).toHaveAttribute(
        'aria-labelledby',
        'label-id'
      );
    });

    it('should apply both "aria-describedby" and "aria-labelledby" to the input element', () => {
      render(
        <RadioTile
          value="standard"
          aria-describedby="description-id"
          aria-labelledby="label-id">
          Option 1
        </RadioTile>
      );

      const input = screen.getByRole('radio');
      expect(input).toHaveAttribute('aria-describedby', 'description-id');
      expect(input).toHaveAttribute('aria-labelledby', 'label-id');
    });

    it('should not apply "aria-describedby" to the label element', () => {
      render(
        <RadioTile
          value="standard"
          aria-describedby="description-id"
          data-testid="test-id">
          Option 1
        </RadioTile>
      );

      expect(screen.getByTestId('test-id')).not.toHaveAttribute(
        'aria-describedby'
      );
    });

    it('should not apply "aria-labelledby" to the label element', () => {
      render(
        <RadioTile
          value="standard"
          aria-labelledby="label-id"
          data-testid="test-id">
          Option 1
        </RadioTile>
      );

      expect(screen.getByTestId('test-id')).not.toHaveAttribute(
        'aria-labelledby'
      );
    });
  });

  it('should check decorator prop and if AILabel exists on radio tile and is xs', async () => {
    render(
      <RadioTile value="standard" decorator={<AILabel />}>
        {' '}
        Option 1{' '}
      </RadioTile>
    );
    expect(screen.getByRole('button')).toHaveClass(`cds--ai-label__button--xs`);
  });

  it('should check deprecated slug prop and if AILabel exists on radio tile and is xs', async () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <RadioTile value="standard" slug={<AILabel />}>
        {' '}
        Option 1{' '}
      </RadioTile>
    );
    expect(screen.getByRole('button')).toHaveClass(`cds--ai-label__button--xs`);
    spy.mockRestore();
  });

  //Feature flag : enable-v12-tile-radio-icons
  it('should have a checked attribute if the prop checked is provided', () => {
    render(
      <FeatureFlags enableV12TileRadioIcons>
        <RadioTile id="test-1" value="test-1" checked>
          Option 1
        </RadioTile>
      </FeatureFlags>
    );

    expect(screen.getByDisplayValue('test-1')).toEqual(
      screen.getByRole('radio', {
        checked: true,
        name: 'Option 1',
      })
    );
  });
});
