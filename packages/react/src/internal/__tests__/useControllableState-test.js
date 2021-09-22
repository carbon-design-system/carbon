/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import { useControllableState } from '../useControllableState';

describe('useControllableState', () => {
  afterEach(cleanup);

  test('uncontrolled', () => {
    render(<TextInput />);
    userEvent.type(screen.getByTestId('input'), 'test');
    expect(screen.getByTestId('input').value).toBe('test');
  });

  test('controlled', () => {
    render(<ControlledTextInput />);
    userEvent.type(screen.getByTestId('input'), 'test');
    expect(screen.getByTestId('input').value).toBe('test');
  });

  test('controlled to uncontrolled', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(<Toggle defaultControlled={true} />);

    userEvent.click(screen.getByTestId('toggle'));
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test('uncontrolled to controlled', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(<Toggle defaultControlled={false} />);

    userEvent.click(screen.getByTestId('toggle'));
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

function TextInput({ onChange, value: controlledValue }) {
  const [value, setValue] = useControllableState(controlledValue, onChange, '');

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
