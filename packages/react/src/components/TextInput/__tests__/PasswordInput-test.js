/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PasswordInput from '../PasswordInput';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('PasswordInput', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto input element', () => {
      render(
        <PasswordInput
          data-testid="test-id"
          id="input-1"
          labelText="TextInput label"
        />
      );

      expect(screen.getByTestId('test-id')).toHaveClass(
        `${prefix}--text-input`
      );
    });

    it('should support a custom `className` prop on the input element', () => {
      render(
        <PasswordInput
          data-testid="test-id"
          id="input-1"
          labelText="PasswordInput label"
          className="custom-class"
        />
      );

      expect(screen.getByTestId('test-id')).toHaveClass('custom-class');
    });

    it('should respect defaultValue prop', () => {
      render(
        <PasswordInput
          data-testid="test-id"
          id="input-1"
          labelText="PasswordInput label"
          defaultValue="This is default text"
        />
      );

      expect(screen.getByTestId('test-id')).toHaveAttribute(
        'value',
        'This is default text'
      );
    });

    it('should respect disabled prop', () => {
      render(
        <PasswordInput
          data-testid="test-id"
          id="input-1"
          labelText="PasswordInput label"
          disabled
        />
      );

      expect(screen.getByTestId('test-id')).toBeDisabled();
    });

    it('should respect helperText prop', () => {
      render(
        <PasswordInput
          data-testid="test-id"
          id="input-1"
          labelText="PasswordInput label"
          helperText="This is helper text"
        />
      );

      expect(screen.getByText('This is helper text')).toBeInTheDocument();
      expect(screen.getByText('This is helper text')).toHaveClass(
        `${prefix}--form__helper-text`
      );
    });

    it('should respect hideLabel prop', () => {
      render(
        <PasswordInput
          data-testid="test-id"
          id="input-1"
          labelText="TextInput label"
          hideLabel
        />
      );

      expect(screen.getByText('TextInput label')).toBeInTheDocument();
      expect(screen.getByText('TextInput label')).toHaveClass(
        `${prefix}--visually-hidden`
      );
    });

    it('should respect hidePasswordLabel prop', () => {
      render(
        <PasswordInput
          data-testid="test-id"
          id="input-1"
          labelText="TextInput label"
          hidePasswordLabel="Hide Password"
        />
      );

      userEvent.click(screen.getByRole('button'));

      expect(screen.getByText('Hide Password')).toBeInTheDocument();
    });

    it('should respect id prop', () => {
      render(
        <PasswordInput
          data-testid="test-id"
          id="input-1"
          labelText="TextInput label"
          hideLabel
        />
      );

      expect(screen.getByTestId('test-id')).toHaveAttribute('id', 'input-1');
    });

    it('should respect inline prop', () => {
      const { container } = render(
        <PasswordInput id="input-1" labelText="TextInput label" inline />
      );

      expect(container.firstChild).toHaveClass(
        `${prefix}--text-input-wrapper--inline`
      );
    });

    it('should respect invalid prop', () => {
      const { container } = render(
        <PasswordInput
          data-testid="test-id"
          id="input-1"
          labelText="TextInput"
          invalid
        />
      );

      const invalidIcon = container.querySelector(
        `svg.${prefix}--text-input__invalid-icon`
      );

      expect(screen.getByTestId('test-id')).toHaveAttribute('data-invalid');
      expect(screen.getByTestId('test-id')).toHaveClass(
        `${prefix}--text-input--invalid`
      );
      expect(invalidIcon).toBeInTheDocument();
    });

    it('should respect invalidText prop', () => {
      render(
        <PasswordInput
          id="input-1"
          labelText="TextInput"
          invalid
          invalidText="This is invalid text"
        />
      );

      expect(screen.getByText('This is invalid text')).toBeInTheDocument();
      expect(screen.getByText('This is invalid text')).toHaveClass(
        `${prefix}--form-requirement`
      );
    });

    it('should respect labelText prop', () => {
      render(<PasswordInput id="input-1" labelText="TextInput label" />);

      expect(screen.getByText('TextInput label')).toBeInTheDocument();
      expect(screen.getByText('TextInput label')).toHaveClass(
        `${prefix}--label`
      );
    });

    it('should respect placeholder prop', () => {
      render(
        <PasswordInput
          id="input-1"
          labelText="TextInput label"
          placeholder="custom placeholder"
        />
      );

      expect(
        screen.getByPlaceholderText('custom placeholder')
      ).toBeInTheDocument();
    });

    it('should respect showPasswordLabel prop', () => {
      render(
        <PasswordInput
          id="input-1"
          labelText="TextInput label"
          showPasswordLabel="Show password test"
        />
      );

      expect(screen.getByText('Show password test')).toBeInTheDocument();
    });

    it('should respect size prop', () => {
      render(
        <PasswordInput
          data-testid="test-id"
          id="input-1"
          labelText="TextInput label"
          size="sm"
        />
      );

      expect(screen.getByTestId('test-id')).toHaveClass(
        `${prefix}--text-input--sm`
      );
    });

    it('should respect type prop', () => {
      render(
        <PasswordInput
          data-testid="test-id"
          id="input-1"
          labelText="TextInput label"
          type="text"
        />
      );

      expect(screen.getByTestId('test-id')).toHaveAttribute('type', 'text');
    });

    it('should respect value prop', () => {
      render(
        <PasswordInput
          data-testid="test-id"
          id="input-1"
          labelText="TextInput label"
          value="This is a test value"
        />
      );

      expect(screen.getByTestId('test-id')).toHaveAttribute(
        'value',
        'This is a test value'
      );
    });

    it('should respect warn prop', () => {
      const { container } = render(
        <PasswordInput
          data-testid="test-id"
          id="input-1"
          labelText="TextInput label"
          warn
        />
      );

      const warnIcon = container.querySelector(
        `svg.${prefix}--text-input__invalid-icon--warning`
      );

      expect(screen.getByTestId('test-id')).toHaveClass(
        `${prefix}--text-input--warning`
      );
      expect(warnIcon).toBeInTheDocument();
    });

    it('should respect warnText prop', () => {
      render(
        <PasswordInput
          id="input-1"
          labelText="TextInput label"
          warn
          warnText="This is warning text"
        />
      );

      expect(screen.getByText('This is warning text')).toBeInTheDocument();
      expect(screen.getByText('This is warning text')).toHaveClass(
        `${prefix}--form-requirement`
      );
    });
  });

  describe('behaves as expected', () => {
    it('should call onChange when expected', () => {
      const onChange = jest.fn();
      render(
        <PasswordInput
          id="input-1"
          labelText="TextInput label"
          data-testid="test-id"
          onChange={onChange}
        />
      );

      userEvent.type(screen.getByTestId('test-id'), 'x');
      expect(screen.getByTestId('test-id')).toHaveValue('x');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.any(Object),
        })
      );
    });

    it('should call onClick when expected', () => {
      const onClick = jest.fn();
      render(
        <PasswordInput
          id="input-1"
          labelText="TextInput label"
          data-testid="test-id"
          onClick={onClick}
        />
      );

      userEvent.click(screen.getByTestId('test-id'));
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.any(Object),
        })
      );
    });

    it('should call onTogglePasswordVisibility when visiblity button is clicked', () => {
      render(
        <PasswordInput
          data-testid="test-id"
          id="input-1"
          labelText="TextInput label"
        />
      );

      expect(screen.getByText('Show password')).toBeInTheDocument();
      userEvent.click(screen.getByRole('button'));
      expect(screen.getByText('Hide password')).toBeInTheDocument();
    });
  });
});
