/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../../feature-flags';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { NumberInput } from '../NumberInput';

function translateWithId(id) {
  if (id === 'increment.number') {
    return 'increment';
  }

  if (id === 'decrement.number') {
    return 'decrement';
  }

  throw new Error(`Unknown message id: ${id}`);
}

describe('NumberInput', () => {
  it('should render an <input> with type="number"', () => {
    render(<NumberInput label="test-label" id="test" />);
    // Note: an input with type="number" is considered a `spinbutton`
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  it('should place className on the outermost element', () => {
    const { container } = render(
      <NumberInput className="custom-class" label="test-label" id="test" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should set `min` on the underyling <input>', () => {
    render(<NumberInput label="test-label" id="test" min={0} />);
    expect(screen.getByLabelText('test-label')).toHaveAttribute('min', '0');
  });

  it('should set `max` on the underyling <input>', () => {
    render(<NumberInput label="test-label" id="test" max={10} />);
    expect(screen.getByLabelText('test-label')).toHaveAttribute('max', '10');
  });

  it('should set `step` on the underyling <input>', () => {
    render(<NumberInput label="test-label" id="test" step={5} />);
    expect(screen.getByLabelText('test-label')).toHaveAttribute('step', '5');
  });

  it('should set `disabled` on the underyling <input>', () => {
    render(<NumberInput label="test-label" id="test" disabled />);
    expect(screen.getByLabelText('test-label')).toBeDisabled();
  });

  it('should set the defaultValue of the <input> with `defaultValue`', () => {
    render(<NumberInput label="test-label" id="test" defaultValue={5} />);
    expect(screen.getByLabelText('test-label')).toHaveValue(5);
  });

  it('should set the given `value` on <input> when value > min', () => {
    render(<NumberInput label="test-label" id="test" min={0} value={5} />);
    expect(screen.getByLabelText('test-label')).toHaveValue(5);
  });

  it('should allow an empty string as input to the underlying <input>', () => {
    render(<NumberInput label="test-label" id="test" value="" />);
    expect(screen.getByLabelText('test-label')).toHaveValue(null);
  });

  it('should set the input as invalid when value < min', () => {
    render(
      <NumberInput
        label="test-label"
        id="test"
        value={5}
        min={10}
        invalidText="test-invalid-text"
      />
    );
    expect(screen.getByLabelText('test-label')).toHaveValue(5);
    expect(screen.getByText('test-invalid-text')).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toHaveAttribute('data-invalid');
  });

  it('should render invalidText when value is empty string', () => {
    render(
      <NumberInput
        label="test-label"
        id="test"
        value=""
        invalidText="test-invalid-text"
      />
    );
    expect(screen.getByLabelText('test-label')).toHaveValue(null);
    expect(screen.getByText('test-invalid-text')).toBeInTheDocument();
  });

  it('should describe the <input> through `helperText`', () => {
    render(
      <NumberInput label="test-label" id="test" helperText="test-helper-text" />
    );
    // Note: is aria-describedby correctly set up here?
    expect(screen.getByText('test-helper-text')).toBeInTheDocument();
  });

  it('should call `onClick` when the `<input>` is clicked', async () => {
    const onClick = jest.fn();
    render(
      <NumberInput
        label="test-label"
        id="test"
        onClick={onClick}
        min={0}
        value={10}
        max={100}
      />
    );

    await userEvent.click(screen.getByLabelText('test-label'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should not call `onClick` when the `<input>` is clicked but disabled', async () => {
    const onClick = jest.fn();
    render(
      <NumberInput
        disabled
        label="test-label"
        id="test"
        onClick={onClick}
        min={0}
        value={10}
        max={100}
      />
    );

    await userEvent.click(screen.getByLabelText('test-label'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should call `onChange` when the value changes', async () => {
    const onChange = jest.fn();
    render(
      <NumberInput
        label="test-label"
        id="test"
        onChange={onChange}
        min={0}
        value={10}
        max={100}
        translateWithId={translateWithId}
      />
    );

    await userEvent.click(screen.getByLabelText('increment'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.any(Object),
      }),
      expect.objectContaining({
        value: 11,
        direction: 'up',
      })
    );

    await userEvent.click(screen.getByLabelText('decrement'));
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  describe('steppers', () => {
    it('should call `onClick` when up or down arrows are clicked', async () => {
      const onClick = jest.fn();

      render(
        <NumberInput
          label="test-label"
          id="test"
          onClick={onClick}
          min={0}
          value={10}
          max={100}
          translateWithId={translateWithId}
        />
      );

      await userEvent.click(screen.getByLabelText('increment'));
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(screen.getByLabelText('test-label')).toHaveValue(11);

      await userEvent.click(screen.getByLabelText('decrement'));
      expect(onClick).toHaveBeenCalledTimes(2);
      expect(screen.getByLabelText('test-label')).toHaveValue(10);
    });

    it('should set up and down arrows as disabled if `disabled` is true', () => {
      render(
        <NumberInput
          label="test-label"
          id="test"
          min={0}
          value={10}
          max={100}
          disabled
          translateWithId={translateWithId}
        />
      );

      expect(screen.getByLabelText('increment')).toBeDisabled();
      expect(screen.getByLabelText('decrement')).toBeDisabled();
    });

    it('should not call `onClick` when up or down arrows are clicked but the <input> is disabled', async () => {
      const onClick = jest.fn();

      render(
        <NumberInput
          label="test-label"
          id="test"
          onClick={onClick}
          min={0}
          value={10}
          max={100}
          disabled
          translateWithId={translateWithId}
        />
      );

      await userEvent.click(screen.getByLabelText('increment'));
      expect(onClick).not.toHaveBeenCalled();
      expect(screen.getByLabelText('test-label')).toHaveValue(10);

      await userEvent.click(screen.getByLabelText('decrement'));
      expect(onClick).not.toHaveBeenCalled();
      expect(screen.getByLabelText('test-label')).toHaveValue(10);
    });

    it('should only increase the value on up arrow click if value is less than max', async () => {
      render(
        <NumberInput
          label="test-label"
          id="test"
          min={0}
          value={5}
          max={10}
          step={5}
          translateWithId={translateWithId}
        />
      );

      expect(screen.getByLabelText('test-label')).toHaveValue(5);

      await userEvent.click(screen.getByLabelText('increment'));
      expect(screen.getByLabelText('test-label')).toHaveValue(10);

      await userEvent.click(screen.getByLabelText('increment'));
      expect(screen.getByLabelText('test-label')).toHaveValue(10);
    });

    it('should only decrease the value on down arrow click if value is greater than min', async () => {
      render(
        <NumberInput
          label="test-label"
          id="test"
          min={0}
          value={5}
          max={10}
          step={5}
          translateWithId={translateWithId}
        />
      );

      expect(screen.getByLabelText('test-label')).toHaveValue(5);

      await userEvent.click(screen.getByLabelText('decrement'));
      expect(screen.getByLabelText('test-label')).toHaveValue(0);

      await userEvent.click(screen.getByLabelText('decrement'));
      expect(screen.getByLabelText('test-label')).toHaveValue(0);
    });

    it('should increase by the value of step', async () => {
      render(
        <NumberInput
          label="test-label"
          id="test"
          min={0}
          value={5}
          max={10}
          step={5}
          translateWithId={translateWithId}
        />
      );

      expect(screen.getByLabelText('test-label')).toHaveValue(5);

      await userEvent.click(screen.getByLabelText('increment'));
      expect(screen.getByLabelText('test-label')).toHaveValue(10);
    });

    it('should decrease by the value of step', async () => {
      render(
        <NumberInput
          label="test-label"
          id="test"
          min={0}
          value={5}
          max={10}
          step={5}
          translateWithId={translateWithId}
        />
      );

      expect(screen.getByLabelText('test-label')).toHaveValue(5);

      await userEvent.click(screen.getByLabelText('decrement'));
      expect(screen.getByLabelText('test-label')).toHaveValue(0);
    });
  });

  it('should respect readOnly prop', async () => {
    const onChange = jest.fn();
    const onClick = jest.fn();

    render(
      <NumberInput
        id="input-1"
        label="Number label"
        onClick={onClick}
        onChange={onChange}
        readOnly
        translateWithId={translateWithId}
      />
    );

    const input = screen.getByRole('spinbutton');

    // Click events should fire
    await userEvent.click(input);
    expect(onClick).toHaveBeenCalledTimes(1);

    // Change events should *not* fire
    await userEvent.type(input, '3');
    expect(input).not.toHaveValue('3');

    expect(screen.getByLabelText('increment')).toBeDisabled();
    expect(screen.getByLabelText('decrement')).toBeDisabled();

    await userEvent.click(screen.getByLabelText('increment'));
    await userEvent.click(screen.getByLabelText('decrement'));

    expect(onChange).toHaveBeenCalledTimes(0);
  });
});
