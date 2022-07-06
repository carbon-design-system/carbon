/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import RadioButtonGroup from '../RadioButtonGroup';
import RadioButton from '../RadioButton';

describe('RadioButtonGroup', () => {
  it('should render `legendText` in a <label>', () => {
    render(
      <RadioButtonGroup defaultSelected="test-1" name="test" legendText="test">
        <RadioButton labelText="test-1" value="test-1" />
        <RadioButton labelText="test-2" value="test-2" />
      </RadioButtonGroup>
    );

    const legend = screen.getByText('test', {
      selector: 'legend',
    });
    expect(legend).toBeInTheDocument();
  });

  it('should render `legendText` in a <fieldset>', () => {
    render(
      <RadioButtonGroup defaultSelected="test-1" name="test" legendText="test">
        <RadioButton labelText="test-1" value="test-1" />
        <RadioButton labelText="test-2" value="test-2" />
      </RadioButtonGroup>
    );

    const fieldset = screen
      .getByText('test', {
        selector: 'legend',
      })
      .closest('fieldset');
    expect(fieldset).toBeDefined();
  });

  it('should render <RadioButton> as children', () => {
    render(
      <RadioButtonGroup defaultSelected="test-1" name="test" legendText="test">
        <RadioButton labelText="test-1" value="test-1" />
        <RadioButton labelText="test-2" value="test-2" />
      </RadioButtonGroup>
    );

    const fieldset = screen
      .getByText('test', {
        selector: 'legend',
      })
      .closest('fieldset');
    expect(fieldset).toContainElement(screen.getByLabelText('test-1'));
    expect(fieldset).toContainElement(screen.getByLabelText('test-2'));
  });

  describe('Component API', () => {
    it('should support a custom className on the outermost element', () => {
      const { container } = render(
        <RadioButtonGroup
          className="custom-class"
          defaultSelected="test-1"
          name="test"
          legendText="test">
          <RadioButton labelText="test-1" value="test-1" />
          <RadioButton labelText="test-2" value="test-2" />
        </RadioButtonGroup>
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should support passing in disabled to disable the <fieldset>', () => {
      render(
        <RadioButtonGroup
          defaultSelected="test-1"
          disabled
          name="test"
          legendText="test">
          <RadioButton labelText="test-1" value="test-1" />
          <RadioButton labelText="test-2" value="test-2" />
        </RadioButtonGroup>
      );
      const fieldset = screen
        .getByText('test', {
          selector: 'legend',
        })
        .closest('fieldset');
      expect(fieldset).toBeDisabled();
    });

    it('should support `defaultSelected` as a way to select a radio button', () => {
      render(
        <RadioButtonGroup
          defaultSelected="test-1"
          name="test"
          legendText="test">
          <RadioButton labelText="test-1" value="test-1" />
          <RadioButton labelText="test-2" value="test-2" />
        </RadioButtonGroup>
      );

      expect(screen.getByLabelText('test-1')).toEqual(
        screen.getByRole('radio', {
          checked: true,
        })
      );
    });

    it('should support `valueSelected` as a way to select a radio button', () => {
      const { rerender } = render(
        <RadioButtonGroup valueSelected="test-1" name="test" legendText="test">
          <RadioButton labelText="test-1" value="test-1" />
          <RadioButton labelText="test-2" value="test-2" />
        </RadioButtonGroup>
      );

      expect(screen.getByLabelText('test-1')).toEqual(
        screen.getByRole('radio', {
          checked: true,
        })
      );

      rerender(
        <RadioButtonGroup valueSelected="test-2" name="test" legendText="test">
          <RadioButton labelText="test-1" value="test-1" />
          <RadioButton labelText="test-2" value="test-2" />
        </RadioButtonGroup>
      );

      expect(screen.getByLabelText('test-2')).toEqual(
        screen.getByRole('radio', {
          checked: true,
        })
      );
    });

    it('should support a 0 value for `valueSelected` (#9041)', () => {
      render(
        <RadioButtonGroup valueSelected={0} name="test" legendText="test">
          <RadioButton labelText="test-1" value={1} />
          <RadioButton labelText="test-0" value={0} />
        </RadioButtonGroup>
      );

      expect(screen.getByLabelText('test-0')).toEqual(
        screen.getByRole('radio', {
          checked: true,
        })
      );
    });

    describe('onChange event', () => {
      it('should not set the first child to checked', () => {
        render(
          <RadioButtonGroup name="test">
            <RadioButton labelText="option-one" value="one" />
            <RadioButton labelText="option-two" value="two" />
          </RadioButtonGroup>
        );
        expect(screen.getByLabelText('option-one')).not.toBeChecked();
      });

      it('should call onChange when a radio button is selected', () => {
        const onChange = jest.fn();
        render(
          <RadioButtonGroup name="test" onChange={onChange}>
            <RadioButton labelText="option-one" value="one" />
            <RadioButton labelText="option-two" value="two" />
          </RadioButtonGroup>
        );

        userEvent.click(screen.getByLabelText('option-one'));
        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledWith(
          'one',
          'test',
          expect.objectContaining({
            target: screen.getByLabelText('option-one'),
          })
        );
      });
    });

    describe('Getting derived state from props', () => {
      it('should initialize the current selection from props', () => {
        render(
          <RadioButtonGroup valueSelected="one" name="test">
            <RadioButton labelText="option-one" value="one" />
            <RadioButton labelText="option-two" value="two" />
          </RadioButtonGroup>
        );
        expect(screen.getByLabelText('option-one')).toBeChecked();
      });

      it('should change the current selection upon change in props', () => {
        const { rerender } = render(
          <RadioButtonGroup valueSelected="one" name="test">
            <RadioButton labelText="option-one" value="one" />
            <RadioButton labelText="option-two" value="two" />
          </RadioButtonGroup>
        );
        expect(screen.getByLabelText('option-one')).toBeChecked();

        rerender(
          <RadioButtonGroup valueSelected="two" name="test">
            <RadioButton labelText="option-one" value="one" />
            <RadioButton labelText="option-two" value="two" />
          </RadioButtonGroup>
        );
        expect(screen.getByLabelText('option-two')).toBeChecked();
      });
    });
  });
});
