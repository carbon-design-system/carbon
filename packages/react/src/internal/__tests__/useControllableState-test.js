/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import { useControllableState } from '../useControllableState';

const TextInput = ({ onChange, value: controlledValue }) => {
  const [value, setValue] = useControllableState({
    value: controlledValue,
    defaultValue: '',
    onChange,
  });

  return (
    <input
      data-testid="input"
      type="text"
      onChange={(event) => {
        setValue(event.target.value);
      }}
      value={value}
    />
  );
};

const ControlledTextInput = () => {
  const [value, setValue] = useState('');

  return <TextInput value={value} onChange={setValue} />;
};

const Toggle = ({ defaultControlled }) => {
  const [value, setValue] = useState('');
  const [controlled, setControlled] = useState(defaultControlled);

  return (
    <>
      <TextInput
        value={controlled ? value : undefined}
        onChange={controlled ? setValue : undefined}
      />
      <button
        data-testid="toggle"
        type="button"
        onClick={() => {
          setControlled(!controlled);
        }}>
        toggle
      </button>
    </>
  );
};

const FunctionalInput = () => {
  const [value, setValue] = useControllableState({ defaultValue: 0 });

  return (
    <>
      <div data-testid="display">{value}</div>
      <button
        data-testid="increment"
        onClick={() => {
          setValue((prev) => prev + 1);
        }}>
        Increment
      </button>
    </>
  );
};

const UncontrolledInput = ({ onChange }) => {
  const [value, setValue] = useControllableState({
    defaultValue: '',
    onChange,
  });

  return (
    <input
      data-testid="input"
      type="text"
      onChange={(event) => {
        setValue(event.target.value);
      }}
      value={value}
    />
  );
};

const DefaultValueInput = ({ defaultValue }) => {
  const [value, setValue] = useControllableState({ defaultValue });

  return (
    <input
      data-testid="input"
      type="text"
      onChange={(event) => {
        setValue(event.target.value);
      }}
      value={value}
    />
  );
};

const NoOnChangeInput = () => {
  const [value, setValue] = useControllableState({ defaultValue: '' });

  return (
    <input
      data-testid="input"
      type="text"
      onChange={(event) => {
        setValue(event.target.value);
      }}
      value={value}
    />
  );
};

describe('useControllableState', () => {
  test('uncontrolled', async () => {
    render(<TextInput />);
    await userEvent.type(screen.getByTestId('input'), 'test');
    expect(screen.getByTestId('input').value).toBe('test');
  });

  test('controlled', async () => {
    render(<ControlledTextInput />);
    await userEvent.type(screen.getByTestId('input'), 'test');
    expect(screen.getByTestId('input').value).toBe('test');
  });

  test('controlled to uncontrolled', async () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(<Toggle defaultControlled />);
    await userEvent.click(screen.getByTestId('toggle'));

    expect(error).toHaveBeenCalled();
    expect(warn).toHaveBeenCalled();

    error.mockRestore();
    warn.mockRestore();
  });

  test('uncontrolled to controlled', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(<Toggle defaultControlled={false} />);
    await userEvent.click(screen.getByTestId('toggle'));

    expect(warn).toHaveBeenCalled();

    warn.mockRestore();
  });

  test('should handle functional updater correctly', async () => {
    render(<FunctionalInput />);

    expect(screen.getByTestId('display').textContent).toBe('0');
    await userEvent.click(screen.getByTestId('increment'));
    expect(screen.getByTestId('display').textContent).toBe('1');
    await userEvent.click(screen.getByTestId('increment'));
    expect(screen.getByTestId('display').textContent).toBe('2');
  });

  test('should call `onChange` with cumulative values for each character typed (uncontrolled)', async () => {
    const onChangeMock = jest.fn();
    const text = '🟦 ⬜ ⬛ 👁️ 🐝 Ⓜ️ 🟦 ⬜ ⬛';

    render(<UncontrolledInput onChange={onChangeMock} />);

    const input = screen.getByTestId('input');

    await userEvent.type(input, text);
    expect(onChangeMock).toHaveBeenCalledTimes(text.length);

    [...text].forEach((_, i) => {
      const expected = text.slice(0, i + 1);

      expect(onChangeMock.mock.calls[i][0]).toBe(expected);
    });
  });

  test('should maintain `defaultValue` after re-render (uncontrolled)', () => {
    const { rerender } = render(<DefaultValueInput defaultValue="initial" />);
    const input = screen.getByTestId('input');

    expect(input.value).toBe('initial');

    fireEvent.change(input, { target: { value: 'changed' } });
    expect(input.value).toBe('changed');

    rerender(<DefaultValueInput defaultValue="initial" />);
    expect(input.value).toBe('changed');
  });

  test('should work without `onChange` callback', async () => {
    render(<NoOnChangeInput />);

    const input = screen.getByTestId('input');

    await userEvent.type(input, 'test');
    expect(input.value).toBe('test');
  });
});
