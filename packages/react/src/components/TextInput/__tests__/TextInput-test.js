/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TextInput from '../TextInput';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { FeatureFlags } from '../../FeatureFlags';

const prefix = 'cds';

describe('TextInput', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto the input element', () => {
      render(
        <TextInput
          data-testid="test-id"
          id="input-1"
          labelText="TextInput label"
        />
      );

      expect(screen.getByRole('textbox')).toHaveAttribute(
        'data-testid',
        'test-id'
      );
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <FeatureFlags flags={{ 'enable-v11-release': true }}>
          <TextInput
            id="input-1"
            labelText="TextInput label"
            className="custom-class"
          />
        </FeatureFlags>
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should support a custom `className` prop on the input element (V10)', () => {
      render(
        <TextInput
          id="input-1"
          labelText="TextInput label"
          className="custom-class"
        />
      );

      expect(screen.getByRole('textbox')).toHaveClass('custom-class');
    });

    it('should respect defaultValue prop', () => {
      render(
        <TextInput
          id="input-1"
          labelText="TextInput label"
          defaultValue="This is default text"
        />
      );

      expect(screen.getByRole('textbox')).toHaveValue('This is default text');
    });

    it('should respect disabled prop', () => {
      render(<TextInput id="input-1" labelText="TextInput label" disabled />);

      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('should respect helperText prop', () => {
      render(
        <TextInput
          id="input-1"
          labelText="TextInput label"
          helperText="This is helper text"
        />
      );

      expect(screen.getByText('This is helper text')).toBeInTheDocument();
      expect(screen.getByText('This is helper text')).toHaveClass(
        `${prefix}--form__helper-text`
      );
    });

    it('should respect hideLabel prop', () => {
      render(<TextInput id="input-1" labelText="TextInput label" hideLabel />);

      expect(screen.getByText('TextInput label')).toBeInTheDocument();
      expect(screen.getByText('TextInput label')).toHaveClass(
        `${prefix}--visually-hidden`
      );
    });

    it('should respect id prop', () => {
      render(<TextInput id="input-1" labelText="TextInput label" />);

      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'input-1');
    });

    it('should respect inline prop', () => {
      const { container } = render(
        <TextInput id="input-1" labelText="TextInput label" inline />
      );

      expect(container.firstChild).toHaveClass(
        `${prefix}--text-input-wrapper--inline`
      );
    });

    it('should respect invalid prop', () => {
      const { container } = render(
        <TextInput id="input-1" labelText="TextInput" invalid />
      );

      const invalidIcon = container.querySelector(
        `svg.${prefix}--text-input__invalid-icon`
      );

      expect(screen.getByRole('textbox')).toHaveAttribute('data-invalid');
      expect(screen.getByRole('textbox')).toHaveClass(
        `${prefix}--text-input--invalid`
      );
      expect(invalidIcon).toBeInTheDocument();
    });

    it('should respect invalidText prop', () => {
      render(
        <TextInput
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
      render(<TextInput id="input-1" labelText="TextInput label" />);

      expect(screen.getByText('TextInput label')).toBeInTheDocument();
      expect(screen.getByText('TextInput label')).toHaveClass(
        `${prefix}--label`
      );
    });

    it('should respect placeholder prop', () => {
      render(
        <TextInput
          id="input-1"
          labelText="TextInput label"
          placeholder="Placeholder text"
        />
      );

      expect(
        screen.getByPlaceholderText('Placeholder text')
      ).toBeInTheDocument();
    });

    it('should respect size prop', () => {
      render(<TextInput id="input-1" labelText="TextInput label" size="sm" />);

      expect(screen.getByRole('textbox')).toHaveClass(
        `${prefix}--text-input--sm`
      );
    });

    it('should respect type prop', () => {
      render(
        <TextInput id="input-1" labelText="TextInput label" type="text" />
      );

      expect(screen.getByRole('textbox')).toHaveAttribute(`type`, 'text');
    });

    it('should respect value prop', () => {
      render(
        <TextInput
          id="input-1"
          labelText="TextInput label"
          value="This is a test value"
        />
      );

      expect(screen.getByRole('textbox')).toHaveValue('This is a test value');
    });

    it('should respect warn prop', () => {
      const { container } = render(
        <TextInput id="input-1" labelText="TextInput label" warn />
      );

      const warnIcon = container.querySelector(
        `svg.${prefix}--text-input__invalid-icon--warning`
      );

      expect(screen.getByRole('textbox')).toHaveClass(
        `${prefix}--text-input--warning`
      );
      expect(warnIcon).toBeInTheDocument();
    });

    it('should respect warnText prop', () => {
      render(
        <TextInput
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

  describe('behaves as expected - Component API', () => {
    it('should respect onChange prop', async () => {
      const onChange = jest.fn();
      render(
        <TextInput
          id="input-1"
          labelText="TextInput label"
          data-testid-="input-1"
          onChange={onChange}
        />
      );

      await userEvent.type(screen.getByRole('textbox'), 'x');
      expect(screen.getByRole('textbox')).toHaveValue('x');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.any(Object),
        })
      );
    });

    it('should respect onClick prop', async () => {
      const onClick = jest.fn();
      render(
        <TextInput
          id="input-1"
          labelText="TextInput label"
          data-testid-="input-1"
          onClick={onClick}
        />
      );

      await userEvent.click(screen.getByRole('textbox'));
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.any(Object),
        })
      );
    });

    it('should not call `onClick` when the `<input>` is clicked but disabled', async () => {
      const onClick = jest.fn();
      render(
        <TextInput
          id="input-1"
          labelText="TextInput label"
          onClick={onClick}
          disabled
        />
      );

      await userEvent.click(screen.getByRole('textbox'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should respect readOnly prop', async () => {
      const onChange = jest.fn();
      const onClick = jest.fn();
      render(
        <TextInput
          id="input-1"
          labelText="TextInput label"
          onClick={onClick}
          onChange={onChange}
          readOnly
        />
      );

      // Click events should fire
      await userEvent.click(screen.getByRole('textbox'));
      expect(onClick).toHaveBeenCalledTimes(1);

      // Change events should *not* fire
      await userEvent.type(screen.getByRole('textbox'), 'x');
      expect(screen.getByRole('textbox')).not.toHaveValue('x');
      expect(onChange).toHaveBeenCalledTimes(0);
    });

    it('should not render counter with only enableCounter prop passed in', () => {
      render(
        <TextInput id="input-1" labelText="TextInput label" enableCounter />
      );

      const counter = screen.queryByText('0/5');

      expect(counter).not.toBeInTheDocument();
    });

    it('should not render counter with only maxCount prop passed in', () => {
      render(
        <TextInput id="input-1" labelText="TextInput label" enableCounter />
      );

      const counter = screen.queryByText('0/5');

      expect(counter).not.toBeInTheDocument();
    });

    it('should have the expected classes for counter', () => {
      render(
        <TextInput
          id="input-1"
          labelText="TextInput label"
          enableCounter
          maxCount={5}
        />
      );

      const counter = screen.queryByText('0/5');

      expect(counter).toBeInTheDocument();
    });
  });
});
