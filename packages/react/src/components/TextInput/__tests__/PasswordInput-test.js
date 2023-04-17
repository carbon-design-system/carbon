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
      render(<PasswordInput id="input-1" labelText="PasswordInput label" />);

      expect(screen.getByLabelText('PasswordInput label')).toHaveClass(
        `${prefix}--text-input`
      );
    });

    it('should support a custom `className` prop on the input element', () => {
      render(
        <PasswordInput
          id="input-1"
          labelText="PasswordInput label"
          className="custom-class"
        />
      );

      expect(screen.getByLabelText('PasswordInput label')).toHaveClass(
        'custom-class'
      );
    });

    it('should respect defaultValue prop', () => {
      render(
        <PasswordInput
          id="input-1"
          labelText="PasswordInput label"
          defaultValue="This is default text"
        />
      );

      expect(screen.getByLabelText('PasswordInput label')).toHaveValue(
        'This is default text'
      );
    });

    it('should respect disabled prop', () => {
      render(
        <PasswordInput id="input-1" labelText="PasswordInput label" disabled />
      );

      expect(screen.getByLabelText('PasswordInput label')).toBeDisabled();
    });

    it('should respect helperText prop', () => {
      render(
        <PasswordInput
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
        <PasswordInput id="input-1" labelText="TextInput label" hideLabel />
      );

      expect(screen.getByText('TextInput label')).toBeInTheDocument();
      expect(screen.getByText('TextInput label')).toHaveClass(
        `${prefix}--visually-hidden`
      );
    });

    it('should respect hidePasswordLabel prop', async () => {
      render(
        <PasswordInput
          id="input-1"
          labelText="TextInput label"
          hidePasswordLabel="Hide Password"
        />
      );

      await userEvent.click(screen.getByRole('button'));

      expect(screen.getByText('Hide Password')).toBeInTheDocument();
    });

    it('should respect id prop', () => {
      render(
        <PasswordInput id="input-1" labelText="PasswordInput label" hideLabel />
      );

      expect(screen.getByLabelText('PasswordInput label')).toHaveAttribute(
        'id',
        'input-1'
      );
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
        <PasswordInput id="input-1" labelText="PasswordInput label" invalid />
      );

      const invalidIcon = container.querySelector(
        `svg.${prefix}--text-input__invalid-icon`
      );

      expect(screen.getByLabelText('PasswordInput label')).toHaveAttribute(
        'data-invalid'
      );
      expect(screen.getByLabelText('PasswordInput label')).toHaveClass(
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
        <PasswordInput id="input-1" labelText="PasswordInput label" size="sm" />
      );

      expect(screen.getByLabelText('PasswordInput label')).toHaveClass(
        `${prefix}--text-input--sm`
      );
    });

    it('should respect type prop', () => {
      render(
        <PasswordInput
          id="input-1"
          labelText="PasswordInput label"
          type="text"
        />
      );

      expect(screen.getByLabelText('PasswordInput label')).toHaveAttribute(
        'type',
        'text'
      );
    });

    it('should respect value prop', () => {
      render(
        <PasswordInput
          id="input-1"
          labelText="PasswordInput label"
          value="This is a test value"
        />
      );

      expect(screen.getByLabelText('PasswordInput label')).toHaveValue(
        'This is a test value'
      );
    });

    it('should respect warn prop', () => {
      const { container } = render(
        <PasswordInput id="input-1" labelText="PasswordInput label" warn />
      );

      const warnIcon = container.querySelector(
        `svg.${prefix}--text-input__invalid-icon--warning`
      );

      expect(screen.getByLabelText('PasswordInput label')).toHaveClass(
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
    it('should call onChange when expected', async () => {
      const onChange = jest.fn();
      render(
        <PasswordInput
          id="input-1"
          labelText="PasswordInput label"
          data-testid="test-id"
          onChange={onChange}
        />
      );

      await userEvent.type(screen.getByLabelText('PasswordInput label'), 'x');
      expect(screen.getByLabelText('PasswordInput label')).toHaveValue('x');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.any(Object),
        })
      );
    });

    it('should call onClick when expected', async () => {
      const onClick = jest.fn();
      render(
        <PasswordInput
          id="input-1"
          labelText="PasswordInput label"
          onClick={onClick}
        />
      );

      await userEvent.click(screen.getByLabelText('PasswordInput label'));
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.any(Object),
        })
      );
    });

    it('should call onTogglePasswordVisibility when visiblity button is clicked', async () => {
      render(<PasswordInput id="input-1" labelText="PasswordInput label" />);

      expect(screen.getByText('Show password')).toBeInTheDocument();
      await userEvent.click(screen.getByRole('button'));
      expect(screen.getByText('Hide password')).toBeInTheDocument();
    });

    it('should not call `onClick` when the `<input>` is clicked but disabled', async () => {
      const onClick = jest.fn();

      render(
        <PasswordInput
          id="input-1"
          labelText="PasswordInput label"
          onClick={onClick}
          disabled
        />
      );

      await userEvent.click(screen.getByLabelText('PasswordInput label'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should not call `onChange` when the `<input>` is clicked but disabled', async () => {
      const onChange = jest.fn();

      render(
        <PasswordInput
          id="input-1"
          labelText="PasswordInput label"
          onChange={onChange}
          disabled
        />
      );

      await userEvent.type(screen.getByLabelText('PasswordInput label'), 'x');
      expect(screen.getByLabelText('PasswordInput label')).not.toHaveValue('x');
      expect(onChange).toHaveBeenCalledTimes(0);
    });

    it('should support a `ref` that is placed on the <input> element', () => {
      const ref = jest.fn();
      render(
        <PasswordInput id="input-1" labelText="PasswordInput label" ref={ref} />
      );

      expect(ref).toHaveBeenCalledWith(
        screen.getByLabelText('PasswordInput label')
      );
    });
  });
});
