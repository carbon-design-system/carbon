/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TileGroup from '../TileGroup';
import RadioTile from '../../RadioTile/RadioTile';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('PasswordInput', () => {
  describe('renders as expected - Component API', () => {
    it('should render `legend` in a <legend>', () => {
      render(
        <TileGroup defaultSelected="test-1" legend="TestGroup" name="test">
          <RadioTile id="test-1" value="test-1">
            Option 1
          </RadioTile>
          <RadioTile id="test-2" value="test-2">
            Option 2
          </RadioTile>
        </TileGroup>
      );

      const legend = screen.getByText('TestGroup', {
        selector: 'legend',
      });
      expect(legend).toBeInTheDocument();
    });

    it('should render <RadioTile> as children', () => {
      render(
        <TileGroup defaultSelected="test-1" legend="TestGroup" name="test">
          <RadioTile id="test-1" value="test-1">
            Option 1
          </RadioTile>
          <RadioTile id="test-2" value="test-2">
            Option 2
          </RadioTile>
        </TileGroup>
      );

      const fieldset = screen
        .getByText('TestGroup', {
          selector: 'legend',
        })
        // eslint-disable-next-line testing-library/no-node-access
        .closest('fieldset');
      expect(fieldset).toContainElement(screen.getByDisplayValue('test-1'));
      expect(fieldset).toContainElement(screen.getByDisplayValue('test-2'));
    });

    it('should support a custom `className` on the outermost element', () => {
      const { container } = render(
        <TileGroup
          className="custom-class"
          defaultSelected="test-1"
          legend="TestGroup"
          name="test">
          <RadioTile id="test-1" value="test-1">
            Option 1
          </RadioTile>
          <RadioTile id="test-2" value="test-2">
            Option 2
          </RadioTile>
        </TileGroup>
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should support passing in disabled to disable the <fieldset>', () => {
      render(
        <TileGroup
          defaultSelected="test-1"
          legend="TestGroup"
          name="test"
          disabled>
          <RadioTile id="test-1" value="test-1">
            Option 1
          </RadioTile>
          <RadioTile id="test-2" value="test-2">
            Option 2
          </RadioTile>
        </TileGroup>
      );

      const fieldset = screen
        .getByText('TestGroup', {
          selector: 'legend',
        })
        // eslint-disable-next-line testing-library/no-node-access
        .closest('fieldset');
      expect(fieldset).toBeDisabled();
    });

    it('should support `defaultSelected` as a way to select a radio button', () => {
      render(
        <TileGroup
          defaultSelected="test-1"
          legend="TestGroup"
          name="test"
          disabled>
          <RadioTile id="test-1" value="test-1">
            Option 1
          </RadioTile>
          <RadioTile id="test-2" value="test-2">
            Option 2
          </RadioTile>
        </TileGroup>
      );

      expect(screen.getByDisplayValue('test-1')).toEqual(
        screen.getByRole('radio', {
          checked: true,
        })
      );
    });

    it('should support `valueSelected` as a way to select a radio button', () => {
      const { rerender } = render(
        <TileGroup
          valueSelected="test-1"
          legend="TestGroup"
          name="test"
          disabled>
          <RadioTile id="test-1" value="test-1">
            Option 1
          </RadioTile>
          <RadioTile id="test-2" value="test-2">
            Option 2
          </RadioTile>
        </TileGroup>
      );

      expect(screen.getByDisplayValue('test-1')).toEqual(
        screen.getByRole('radio', {
          checked: true,
        })
      );

      rerender(
        <TileGroup
          valueSelected="test-2"
          legend="TestGroup"
          name="test"
          disabled>
          <RadioTile id="test-1" value="test-1">
            Option 1
          </RadioTile>
          <RadioTile id="test-2" value="test-2">
            Option 2
          </RadioTile>
        </TileGroup>
      );

      expect(screen.getByDisplayValue('test-2')).toEqual(
        screen.getByRole('radio', {
          checked: true,
        })
      );
    });

    it('should set expected props on children', () => {
      render(
        <TileGroup defaultSelected="test-1" legend="TestGroup" name="test">
          <RadioTile id="test-1" value="test-1">
            Option 1
          </RadioTile>
          <RadioTile id="test-2" value="test-2">
            Option 2
          </RadioTile>
        </TileGroup>
      );

      expect(screen.getByDisplayValue('test-1')).toHaveAttribute(
        'name',
        'test'
      );
    });
  });

  describe('behaves as expected', () => {
    it('should set `checked` on correct child when `onChange is called', async () => {
      const onChange = jest.fn();
      render(
        <TileGroup legend="TestGroup" name="test" onChange={onChange}>
          <RadioTile id="test-1" value="test-1">
            Option 1
          </RadioTile>
          <RadioTile id="test-2" value="test-2">
            Option 2
          </RadioTile>
        </TileGroup>
      );

      await userEvent.click(screen.getByDisplayValue('test-1'));
      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith(
        'test-1',
        'test',
        expect.objectContaining({
          target: screen.getByDisplayValue('test-1'),
        })
      );
      expect(screen.getByDisplayValue('test-1')).toEqual(
        screen.getByRole('radio', {
          checked: true,
        })
      );
    });
  });

  describe('Getting derived state from props', () => {
    it('should change the current selection upon change in props', () => {
      const { rerender } = render(
        <TileGroup valueSelected="test-1" legend="TestGroup" name="test">
          <RadioTile id="test-1" value="test-1">
            Option 1
          </RadioTile>
          <RadioTile id="test-2" value="test-2">
            Option 2
          </RadioTile>
        </TileGroup>
      );

      expect(screen.getByDisplayValue('test-1')).toBeChecked();

      rerender(
        <TileGroup valueSelected="test-2" legend="TestGroup" name="test">
          <RadioTile id="test-1" value="test-1">
            Option 1
          </RadioTile>
          <RadioTile id="test-2" value="test-2">
            Option 2
          </RadioTile>
        </TileGroup>
      );

      expect(screen.getByDisplayValue('test-1')).not.toBeChecked();
      expect(screen.getByDisplayValue('test-2')).toBeChecked();
    });
  });
});
