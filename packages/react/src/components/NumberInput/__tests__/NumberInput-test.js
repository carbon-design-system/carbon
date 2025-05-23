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
import { AILabel } from '../../AILabel';

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

  it('should set `min` on the underlying <input>', () => {
    render(<NumberInput label="test-label" id="test" min={0} />);
    expect(screen.getByLabelText('test-label')).toHaveAttribute('min', '0');
  });

  it('should set `max` on the underlying <input>', () => {
    render(<NumberInput label="test-label" id="test" max={10} />);
    expect(screen.getByLabelText('test-label')).toHaveAttribute('max', '10');
  });

  it('should set `step` on the underlying <input>', () => {
    render(<NumberInput label="test-label" id="test" step={5} />);
    expect(screen.getByLabelText('test-label')).toHaveAttribute('step', '5');
  });

  it('should set `disabled` on the underlying <input>', () => {
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

  it('should respect decorator prop', () => {
    render(
      <NumberInput label="test-label" id="test" decorator={<AILabel />} />
    );

    expect(
      screen.getByRole('button', { name: 'AI Show information' })
    ).toBeInTheDocument();
  });

  it('should respect the deprecated slug prop', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<NumberInput label="test-label" id="test" slug={<AILabel />} />);

    expect(
      screen.getByRole('button', { name: 'AI Show information' })
    ).toBeInTheDocument();
    spy.mockRestore();
  });

  it('should allow an empty string as input to the underlying <input>', () => {
    render(
      <NumberInput
        label="test-label"
        id="test"
        value=""
        invalidText="test-invalid-text"
      />
    );
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
  it('should increase by the value of large step', async () => {
    render(
      <NumberInput
        label="test-label"
        id="test"
        min={-9999}
        value={1000}
        max={10000}
        step={1000}
        translateWithId={translateWithId}
      />
    );
    expect(screen.getByLabelText('test-label')).toHaveValue(1000);
    await userEvent.click(screen.getByLabelText('increment'));
    expect(screen.getByLabelText('test-label')).toHaveValue(2000);
  });
  it('should decrease by the value of large step', async () => {
    render(
      <NumberInput
        label="test-label"
        id="test"
        min={-9999}
        value={1000}
        max={10000}
        step={1000}
        translateWithId={translateWithId}
      />
    );

    expect(screen.getByLabelText('test-label')).toHaveValue(1000);

    await userEvent.click(screen.getByLabelText('decrement'));
    expect(screen.getByLabelText('test-label')).toHaveValue(0);
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

  it('should update value to empty when allowEmpty is true & input value becomes empty', async () => {
    const onChange = jest.fn();
    render(
      <NumberInput
        id="carbon-number"
        min={-100}
        max={100}
        value={50}
        label="NumberInput label"
        helperText="Optional helper text."
        invalidText="Number is not valid"
        allowEmpty={true}
        onChange={onChange}
      />
    );

    const input = screen.getByLabelText('NumberInput label');

    await userEvent.clear(input);

    userEvent.type(input, '{backspace}');
    expect(input.value).toBe('');
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.any(Object),
      }),
      expect.objectContaining({
        value: '',
      })
    );
  });

  it('should increment and decrement decimal numbers without floating-point precision errors', async () => {
    render(
      <NumberInput
        label="NumberInput label"
        id="number-input"
        min={0}
        value={15.01}
        step={1}
        max={100}
        translateWithId={translateWithId}
      />
    );

    const input = screen.getByLabelText('NumberInput label');

    expect(input).toHaveValue(15.01);

    await userEvent.click(screen.getByLabelText('increment'));
    expect(input).toHaveValue(16.01);

    await userEvent.click(screen.getByLabelText('decrement'));
    expect(input).toHaveValue(15.01);
  });

  describe('with type="text"', () => {
    it('should render an <input> with type="text"', () => {
      render(<NumberInput type="text" label="test-label" id="test" />);
      // Note: an input with type="text" is considered a `textbox`
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should place className on the outermost element', () => {
      const { container } = render(
        <NumberInput
          type="text"
          className="custom-class"
          label="test-label"
          id="test"
        />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should set `min` on the underlying <input>', () => {
      render(<NumberInput type="text" label="test-label" id="test" min={0} />);
      expect(screen.getByLabelText('test-label')).toHaveAttribute('min', '0');
    });

    it('should set `max` on the underlying <input>', () => {
      render(<NumberInput type="text" label="test-label" id="test" max={10} />);
      expect(screen.getByLabelText('test-label')).toHaveAttribute('max', '10');
    });

    it('should set `step` on the underlying <input>', () => {
      render(<NumberInput type="text" label="test-label" id="test" step={5} />);
      expect(screen.getByLabelText('test-label')).toHaveAttribute('step', '5');
    });

    it('should set `disabled` on the underlying <input>', () => {
      render(<NumberInput type="text" label="test-label" id="test" disabled />);
      expect(screen.getByLabelText('test-label')).toBeDisabled();
    });

    it('should set the defaultValue of the <input> with `defaultValue`', () => {
      render(
        <NumberInput
          type="text"
          label="test-label"
          id="test"
          defaultValue={5}
        />
      );
      expect(screen.getByLabelText('test-label')).toHaveValue('5');
    });

    it('should set the given `value` on <input> when value > min', () => {
      render(
        <NumberInput
          type="text"
          label="test-label"
          id="test"
          min={0}
          value={5}
        />
      );
      expect(screen.getByLabelText('test-label')).toHaveValue('5');
    });

    it('should respect decorator prop', () => {
      render(
        <NumberInput
          type="text"
          label="test-label"
          id="test"
          decorator={<AILabel />}
        />
      );

      expect(
        screen.getByRole('button', { name: 'AI Show information' })
      ).toBeInTheDocument();
    });

    it('should respect the deprecated slug prop', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <NumberInput
          type="text"
          label="test-label"
          id="test"
          slug={<AILabel />}
        />
      );

      expect(
        screen.getByRole('button', { name: 'AI Show information' })
      ).toBeInTheDocument();
      spy.mockRestore();
    });

    it('should allow an empty string as input to the underlying <input>', () => {
      render(
        <NumberInput
          type="text"
          label="test-label"
          id="test"
          value=""
          invalidText="test-invalid-text"
        />
      );
      expect(screen.getByLabelText('test-label')).toHaveValue('');
    });

    it('should set the input as invalid when value < min', () => {
      render(
        <NumberInput
          type="text"
          label="test-label"
          id="test"
          value={5}
          min={10}
          invalidText="test-invalid-text"
        />
      );
      expect(screen.getByLabelText('test-label')).toHaveValue('5');
      expect(screen.getByText('test-invalid-text')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveAttribute('data-invalid');
    });

    it('should not render invalidText when value is empty string', () => {
      render(
        <NumberInput
          type="text"
          label="test-label"
          id="test"
          value=""
          invalidText="test-invalid-text"
        />
      );
      expect(screen.getByLabelText('test-label')).toHaveValue('');
      expect(screen.queryByText('test-invalid-text')).not.toBeInTheDocument();
    });

    it('should describe the <input> through `helperText`', () => {
      render(
        <NumberInput
          type="text"
          label="test-label"
          id="test"
          helperText="test-helper-text"
        />
      );
      // Note: is aria-describedby correctly set up here?
      expect(screen.getByText('test-helper-text')).toBeInTheDocument();
    });

    it('should call `onClick` when the `<input>` is clicked', async () => {
      const onClick = jest.fn();
      render(
        <NumberInput
          type="text"
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
          type="text"
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
          type="text"
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
          value: '11',
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
            type="text"
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
        expect(screen.getByLabelText('test-label')).toHaveValue('11');

        await userEvent.click(screen.getByLabelText('decrement'));
        expect(onClick).toHaveBeenCalledTimes(2);
        expect(screen.getByLabelText('test-label')).toHaveValue('10');
      });

      it('should set up and down arrows as disabled if `disabled` is true', () => {
        render(
          <NumberInput
            type="text"
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
            type="text"
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
        expect(screen.getByLabelText('test-label')).toHaveValue('10');

        await userEvent.click(screen.getByLabelText('decrement'));
        expect(onClick).not.toHaveBeenCalled();
        expect(screen.getByLabelText('test-label')).toHaveValue('10');
      });

      it('should only increase the value on up arrow click if value is less than max', async () => {
        render(
          <NumberInput
            type="text"
            label="test-label"
            id="test"
            min={0}
            value={5}
            max={10}
            step={5}
            translateWithId={translateWithId}
          />
        );

        expect(screen.getByLabelText('test-label')).toHaveValue('5');

        await userEvent.click(screen.getByLabelText('increment'));
        expect(screen.getByLabelText('test-label')).toHaveValue('10');

        await userEvent.click(screen.getByLabelText('increment'));
        expect(screen.getByLabelText('test-label')).toHaveValue('10');
      });

      it('should only decrease the value on down arrow click if value is greater than min', async () => {
        render(
          <NumberInput
            type="text"
            label="test-label"
            id="test"
            min={0}
            value={5}
            max={10}
            step={5}
            translateWithId={translateWithId}
          />
        );

        expect(screen.getByLabelText('test-label')).toHaveValue('5');

        await userEvent.click(screen.getByLabelText('decrement'));
        expect(screen.getByLabelText('test-label')).toHaveValue('0');

        await userEvent.click(screen.getByLabelText('decrement'));
        expect(screen.getByLabelText('test-label')).toHaveValue('0');
      });

      it('should increase by the value of step', async () => {
        render(
          <NumberInput
            type="text"
            label="test-label"
            id="test"
            min={0}
            value={5}
            max={10}
            step={5}
            translateWithId={translateWithId}
          />
        );

        expect(screen.getByLabelText('test-label')).toHaveValue('5');

        await userEvent.click(screen.getByLabelText('increment'));
        expect(screen.getByLabelText('test-label')).toHaveValue('10');
      });

      it('should decrease by the value of step', async () => {
        render(
          <NumberInput
            type="text"
            label="test-label"
            id="test"
            min={0}
            value={5}
            max={10}
            step={5}
            translateWithId={translateWithId}
          />
        );
        expect(screen.getByLabelText('test-label')).toHaveValue('5');
        await userEvent.click(screen.getByLabelText('decrement'));
        expect(screen.getByLabelText('test-label')).toHaveValue('0');
      });
    });
    it('should increase by the value of large step and format to the default locale', async () => {
      render(
        <NumberInput
          type="text"
          label="test-label"
          id="test"
          min={-9999}
          value={1000}
          max={10000}
          step={1000}
          translateWithId={translateWithId}
        />
      );
      expect(screen.getByLabelText('test-label')).toHaveValue('1,000');
      await userEvent.click(screen.getByLabelText('increment'));
      expect(screen.getByLabelText('test-label')).toHaveValue('2,000');
    });
    it('should decrease by the value of large step and format to the default locale', async () => {
      render(
        <NumberInput
          type="text"
          label="test-label"
          id="test"
          min={-9999}
          value={1000}
          max={10000}
          step={1000}
          translateWithId={translateWithId}
        />
      );

      expect(screen.getByLabelText('test-label')).toHaveValue('1,000');

      await userEvent.click(screen.getByLabelText('decrement'));
      expect(screen.getByLabelText('test-label')).toHaveValue('0');
    });

    it('should respect readOnly prop', async () => {
      const onChange = jest.fn();
      const onClick = jest.fn();

      render(
        <NumberInput
          type="text"
          id="input-1"
          label="Number label"
          onClick={onClick}
          onChange={onChange}
          readOnly
          translateWithId={translateWithId}
        />
      );

      const input = screen.getByRole('textbox');

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

      expect(onChange).toHaveBeenCalledTimes(1); // due to onblur/locale formatting
    });

    it('should update value to empty when allowEmpty is true & input value becomes empty', async () => {
      const onChange = jest.fn();
      render(
        <NumberInput
          type="text"
          id="carbon-number"
          min={-100}
          max={100}
          value={50}
          label="NumberInput label"
          helperText="Optional helper text."
          invalidText="Number is not valid"
          allowEmpty={true}
          onChange={onChange}
        />
      );

      const input = screen.getByLabelText('NumberInput label');

      await userEvent.clear(input);

      await userEvent.type(input, '{backspace}');
      expect(input.value).toBe('');
      await userEvent.tab();
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.any(Object),
        }),
        expect.objectContaining({
          value: '',
        })
      );
    });

    it('should increment and decrement decimal numbers without floating-point precision errors', async () => {
      render(
        <NumberInput
          type="text"
          label="NumberInput label"
          id="number-input"
          min={0}
          value={15.01}
          step={1}
          max={100}
          translateWithId={translateWithId}
        />
      );

      const input = screen.getByLabelText('NumberInput label');

      expect(input).toHaveValue('15.01');

      await userEvent.click(screen.getByLabelText('increment'));
      expect(input).toHaveValue('16.01');

      await userEvent.click(screen.getByLabelText('decrement'));
      expect(input).toHaveValue('15.01');
    });

    describe('locale parsing and formatting', () => {
      it('should parse and format numbers based on the default locale', async () => {
        render(
          <NumberInput
            type="text"
            label="NumberInput label"
            id="number-input"
            min={0}
            value={15.01}
            step={1}
            max={100}
            translateWithId={translateWithId}
          />
        );

        const input = screen.getByLabelText('NumberInput label');

        expect(input).toHaveValue('15.01');

        await userEvent.click(screen.getByLabelText('increment'));
        expect(input).toHaveValue('16.01');

        await userEvent.click(screen.getByLabelText('decrement'));
        expect(input).toHaveValue('15.01');

        await userEvent.clear(input);

        await userEvent.type(input, '3');
        expect(input).toHaveValue('3');

        await userEvent.type(input, '4');
        expect(input).toHaveValue('34');

        await userEvent.type(input, ',');
        expect(input).toHaveValue('34,');

        await userEvent.type(input, '8');
        expect(input).toHaveValue('34,8');

        await userEvent.type(input, '9');
        expect(input).toHaveValue('34,89');

        await userEvent.tab();
        expect(input).toHaveValue('3,489');

        await userEvent.clear(input);
        await userEvent.type(input, '1234,567');
        await userEvent.tab();
        expect(input).toHaveValue('1,234,567');

        await userEvent.clear(input);
        await userEvent.type(input, '34.56');
        await userEvent.tab();
        expect(input).toHaveValue('34.56');

        await userEvent.type(input, '99999');
        await userEvent.tab();
        expect(input).toHaveValue('34.57');
      });
      it('should parse and format numbers based on the given locale', async () => {
        render(
          <NumberInput
            type="text"
            locale="DE"
            label="NumberInput label"
            id="number-input"
            min={0}
            value={15.01}
            step={1}
            max={100}
            translateWithId={translateWithId}
          />
        );

        const input = screen.getByLabelText('NumberInput label');

        expect(input).toHaveValue('15,01');

        await userEvent.click(screen.getByLabelText('increment'));
        expect(input).toHaveValue('16,01');

        await userEvent.click(screen.getByLabelText('decrement'));
        expect(input).toHaveValue('15,01');

        await userEvent.clear(input);

        await userEvent.type(input, '3');
        expect(input).toHaveValue('3');

        await userEvent.type(input, '4');
        expect(input).toHaveValue('34');

        await userEvent.type(input, ',');
        expect(input).toHaveValue('34,');

        await userEvent.type(input, '8');
        expect(input).toHaveValue('34,8');

        await userEvent.type(input, '9');
        expect(input).toHaveValue('34,89');

        await userEvent.tab();

        expect(input).toHaveValue('34,89');

        await userEvent.clear(input);

        await userEvent.type(input, '1234,567');

        await userEvent.tab();

        expect(input).toHaveValue('1.234,567');

        await userEvent.clear(input);

        await userEvent.type(input, '34.56');

        await userEvent.tab();

        expect(input).toHaveValue('3.456');
      });
      it('should not call onChange until onBlur when input is parsed and formatted ', async () => {
        const onChange = jest.fn();
        render(
          <NumberInput
            type="text"
            label="NumberInput label"
            id="number-input"
            min={0}
            value={15.01}
            step={1}
            max={100}
            onChange={onChange}
            translateWithId={translateWithId}
          />
        );

        const input = screen.getByLabelText('NumberInput label');

        expect(input).toHaveValue('15.01');
        await userEvent.type(input, '9');
        expect(onChange).not.toHaveBeenCalled();
        await userEvent.type(input, '9');
        expect(onChange).not.toHaveBeenCalled();

        await userEvent.tab();
        expect(input).toHaveValue('15.02');
        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.any(Object),
          }),
          expect.objectContaining({
            value: '15.02',
            direction: 'up',
          })
        );
        expect(onChange).toHaveBeenCalledTimes(1);

        await userEvent.click(screen.getByLabelText('increment'));
        expect(input).toHaveValue('16.02');
        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.any(Object),
          }),
          expect.objectContaining({
            value: '16.02',
            direction: 'up',
          })
        );
        expect(onChange).toHaveBeenCalledTimes(2);

        await userEvent.click(screen.getByLabelText('decrement'));
        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.any(Object),
          }),
          expect.objectContaining({
            value: '15.02',
            direction: 'down',
          })
        );
        expect(input).toHaveValue('15.02');
        expect(onChange).toHaveBeenCalledTimes(3);
      });
      it('supports formatOptions prop', async () => {
        render(
          <NumberInput
            type="text"
            label="NumberInput label"
            id="number-input"
            min={0}
            value={0.15}
            step={0.05}
            max={100}
            formatOptions={{ style: 'percent' }}
            translateWithId={translateWithId}
          />
        );

        const input = screen.getByLabelText('NumberInput label');

        expect(input).toHaveValue('15%');

        await userEvent.click(screen.getByLabelText('increment'));
        expect(input).toHaveValue('20%');
      });
    });
  });
});
