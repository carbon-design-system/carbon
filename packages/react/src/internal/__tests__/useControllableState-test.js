/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import { useControllableState } from '../useControllableState';

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
});

function TextInput({ onChange, value: controlledValue }) {
  const [value, setValue] = useControllableState({
    value: controlledValue,
    defaultValue: '',
    onChange,
  });

  function handleOnChange(event) {
    setValue(event.target.value);
  }

  return (
    <input
      data-testid="input"
      type="text"
      onChange={handleOnChange}
      value={value}
    />
  );
}

function ControlledTextInput() {
  const [value, setValue] = useState('');
  return <TextInput value={value} onChange={setValue} />;
}

function Toggle({ defaultControlled }) {
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
}
