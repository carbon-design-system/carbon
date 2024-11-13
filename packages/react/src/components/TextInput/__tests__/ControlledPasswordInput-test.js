import { fireEvent, render, screen } from '@testing-library/react';

import ControlledPasswordInput from '../ControlledPasswordInput';
import React from 'react';

describe('ControlledPasswordInput Component', () => {
  beforeEach(() => {
    // Mock console.warn before each test
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the component properly', () => {
    render(
      <ControlledPasswordInput
        id="password-input"
        labelText="Password"
        placeholder="Enter password"
      />
    );

    const input = screen.getByPlaceholderText('Enter password');
    expect(input).toBeInTheDocument();
  });

  it('renders the component with initial type as password', () => {
    render(
      <ControlledPasswordInput
        id="password-input"
        labelText="Password"
        placeholder="Enter password"
        showPasswordLabel="Show password"
        hidePasswordLabel="Hide password"
      />
    );

    const input = screen.getByPlaceholderText('Enter password');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
  });

  it('allows user to enter text into the input field', () => {
    render(
      <ControlledPasswordInput
        id="password-input"
        labelText="Password"
        placeholder="Enter password"
        showPasswordLabel="Show password"
        hidePasswordLabel="Hide password"
      />
    );

    const input = screen.getByPlaceholderText('Enter password');
    fireEvent.change(input, { target: { value: 'mypassword' } });

    expect(input).toHaveValue('mypassword');
  });

  it('calls onChange handler when value changes', () => {
    const handleChange = jest.fn();

    render(
      <ControlledPasswordInput
        id="password-input"
        labelText="Password"
        placeholder="Enter password"
        showPasswordLabel="Show password"
        hidePasswordLabel="Hide password"
        onChange={handleChange}
      />
    );

    const input = screen.getByPlaceholderText('Enter password');
    fireEvent.change(input, { target: { value: 'newpassword' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur handler when input loses focus', () => {
    const handleBlur = jest.fn();

    render(
      <ControlledPasswordInput
        id="password-input"
        labelText="Password"
        placeholder="Enter password"
        showPasswordLabel="Show password"
        hidePasswordLabel="Hide password"
        onBlur={handleBlur}
      />
    );

    const input = screen.getByPlaceholderText('Enter password');
    input.focus();
    input.blur();

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('has a button with accessible role and label', () => {
    render(
      <ControlledPasswordInput
        id="password-input"
        labelText="Password"
        placeholder="Enter password"
        showPasswordLabel="Show password"
        hidePasswordLabel="Hide password"
      />
    );

    const toggleButton = screen.getByRole('button', { name: /show password/i });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAccessibleName('Show password');
  });

  it('renders controlled input with value from props', () => {
    const { rerender } = render(
      <ControlledPasswordInput
        id="password-input"
        labelText="Password"
        placeholder="Enter password"
        showPasswordLabel="Show password"
        hidePasswordLabel="Hide password"
        value="initialValue"
      />
    );

    const input = screen.getByPlaceholderText('Enter password');
    expect(input).toHaveValue('initialValue');

    rerender(
      <ControlledPasswordInput
        id="password-input"
        labelText="Password"
        placeholder="Enter password"
        showPasswordLabel="Show password"
        hidePasswordLabel="Hide password"
        value="newValue"
      />
    );

    expect(input).toHaveValue('newValue');
  });

  it('does not toggle visibility when disabled', () => {
    render(
      <ControlledPasswordInput
        id="password-input"
        labelText="Password"
        placeholder="Enter password"
        showPasswordLabel="Show password"
        hidePasswordLabel="Hide password"
        disabled
      />
    );

    const input = screen.getByPlaceholderText('Enter password');
    const toggleButton = screen.getByRole('button', { name: /show password/i });

    fireEvent.click(toggleButton);

    expect(input).toHaveAttribute('type', 'password');
    expect(toggleButton).toHaveTextContent('Show password');
  });

  it('handles input without value prop (uncontrolled)', () => {
    render(
      <ControlledPasswordInput
        id="password-input"
        labelText="Password"
        placeholder="Enter password"
        showPasswordLabel="Show password"
        hidePasswordLabel="Hide password"
      />
    );

    const input = screen.getByPlaceholderText('Enter password');
    fireEvent.change(input, { target: { value: 'uncontrolledValue' } });

    expect(input).toHaveValue('uncontrolledValue');
  });

  it('associates the label with the input field', () => {
    render(
      <ControlledPasswordInput
        id="password-input"
        labelText="Password"
        placeholder="Enter password"
      />
    );

    const label = screen.getByText('Password');
    const input = screen.getByPlaceholderText('Enter password');

    expect(label).toHaveAttribute('for', 'password-input');
    expect(input).toHaveAttribute('id', 'password-input');
  });

  it('calls onFocus handler when input gains focus', () => {
    const handleFocus = jest.fn();

    render(
      <ControlledPasswordInput
        id="password-input"
        labelText="Password"
        placeholder="Enter password"
        showPasswordLabel="Show password"
        hidePasswordLabel="Hide password"
        onFocus={handleFocus}
      />
    );

    const input = screen.getByPlaceholderText('Enter password');
    input.focus();

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('renders correctly without show/hide password labels', () => {
    render(
      <ControlledPasswordInput
        id="password-input"
        labelText="Password"
        placeholder="Enter password"
      />
    );

    const input = screen.getByPlaceholderText('Enter password');
    expect(input).toBeInTheDocument();

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
  });

  it('does not call onChange when input is disabled', () => {
    const handleChange = jest.fn();

    render(
      <ControlledPasswordInput
        id="password-input"
        labelText="Password"
        placeholder="Enter password"
        showPasswordLabel="Show password"
        hidePasswordLabel="Hide password"
        disabled
        onChange={handleChange}
      />
    );

    const input = screen.getByPlaceholderText('Enter password');
    fireEvent.change(input, { target: { value: 'newpassword' } });

    expect(handleChange).not.toHaveBeenCalled();
  });
});
