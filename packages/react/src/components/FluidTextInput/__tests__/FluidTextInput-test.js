/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidTextInput from '../FluidTextInput';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { FeatureFlags } from '../../FeatureFlags';

const prefix = 'cds';

describe('FluidTextInput', () => {
  describe('renders as expected - Component API', () => {
    it('should render as expected', () => {
      const { container } = render(
        <FeatureFlags flags={{ 'enable-v11-release': true }}>
          <FluidTextInput id="input-1" labelText="FluidTextInput label" />
        </FeatureFlags>
      );

      expect(container.firstChild).toHaveClass(`${prefix}--text-input--fluid`);
    });

    it('should spread extra props onto the input element', () => {
      render(
        <FluidTextInput
          data-testid="test-id"
          id="input-1"
          labelText="FluidTextInput label"
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
          <FluidTextInput
            id="input-1"
            labelText="FluidTextInput label"
            className="custom-class"
          />
        </FeatureFlags>
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should support a custom `className` prop on the input element (V10)', () => {
      render(
        <FluidTextInput
          id="input-1"
          labelText="FluidTextInput label"
          className="custom-class"
        />
      );

      expect(screen.getByRole('textbox')).toHaveClass('custom-class');
    });

    it('should respect defaultValue prop', () => {
      render(
        <FluidTextInput
          id="input-1"
          labelText="FluidTextInput label"
          defaultValue="This is default text"
        />
      );

      expect(screen.getByRole('textbox')).toHaveAttribute(
        'value',
        'This is default text'
      );
    });

    it('should respect disabled prop', () => {
      render(
        <FluidTextInput
          id="input-1"
          labelText="FluidTextInput label"
          disabled
        />
      );

      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('should respect id prop', () => {
      render(<FluidTextInput id="input-1" labelText="FluidTextInput label" />);

      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'input-1');
    });

    it('should respect invalid prop', () => {
      const { container } = render(
        <FluidTextInput id="input-1" labelText="FluidTextInput" invalid />
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
        <FluidTextInput
          id="input-1"
          labelText="FluidTextInput"
          invalid
          invalidText="This is invalid text"
        />
      );

      expect(screen.getByText('This is invalid text')).toBeInTheDocument();
      expect(screen.getByText('This is invalid text')).toHaveClass(
        `${prefix}--form-requirement`
      );
    });

    it('should respect isPassword prop', () => {
      const { container } = render(
        <FluidTextInput id="input-1" labelText="FluidTextInput" isPassword />
      );

      expect(container.firstChild).toHaveClass(
        `${prefix}--password-input-wrapper`
      );
      expect(container.firstChild).toHaveClass(`${prefix}--text-input--fluid`);
    });

    it('should respect labelText prop', () => {
      render(<FluidTextInput id="input-1" labelText="FluidTextInput label" />);

      expect(screen.getByText('FluidTextInput label')).toBeInTheDocument();
      expect(screen.getByText('FluidTextInput label')).toHaveClass(
        `${prefix}--label`
      );
    });

    it('should respect placeholder prop', () => {
      render(
        <FluidTextInput
          id="input-1"
          labelText="FluidTextInput label"
          placeholder="Placeholder text"
        />
      );

      expect(
        screen.getByPlaceholderText('Placeholder text')
      ).toBeInTheDocument();
    });

    it('should respect type prop', () => {
      render(
        <FluidTextInput
          id="input-1"
          labelText="FluidTextInput label"
          type="text"
        />
      );

      expect(screen.getByRole('textbox')).toHaveAttribute(`type`, 'text');
    });

    it('should respect value prop', () => {
      render(
        <FluidTextInput
          id="input-1"
          labelText="FluidTextInput label"
          value="This is a test value"
        />
      );

      expect(screen.getByRole('textbox')).toHaveAttribute(
        'value',
        'This is a test value'
      );
    });

    it('should respect warn prop', () => {
      const { container } = render(
        <FluidTextInput id="input-1" labelText="FluidTextInput label" warn />
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
        <FluidTextInput
          id="input-1"
          labelText="FluidTextInput label"
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
    it('should respect onChange prop', () => {
      const onChange = jest.fn();
      render(
        <FluidTextInput
          id="input-1"
          labelText="FluidTextInput label"
          data-testid-="input-1"
          onChange={onChange}
        />
      );

      userEvent.type(screen.getByRole('textbox'), 'x');
      expect(screen.getByRole('textbox')).toHaveValue('x');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.any(Object),
        })
      );
    });

    it('should respect onClick prop', () => {
      const onClick = jest.fn();
      render(
        <FluidTextInput
          id="input-1"
          labelText="FluidTextInput label"
          data-testid-="input-1"
          onClick={onClick}
        />
      );

      userEvent.click(screen.getByRole('textbox'));
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.any(Object),
        })
      );
    });

    it('should not call `onClick` when the `<input>` is clicked but disabled', () => {
      const onClick = jest.fn();
      render(
        <FluidTextInput
          id="input-1"
          labelText="FluidTextInput label"
          onClick={onClick}
          disabled
        />
      );

      userEvent.click(screen.getByRole('textbox'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should respect readOnly prop', () => {
      const onChange = jest.fn();
      const onClick = jest.fn();
      render(
        <FluidTextInput
          id="input-1"
          labelText="FluidTextInput label"
          onClick={onClick}
          onChange={onChange}
          readOnly
        />
      );

      // Click events should fire
      userEvent.click(screen.getByRole('textbox'));
      expect(onClick).toHaveBeenCalledTimes(1);

      // Change events should *not* fire
      userEvent.type(screen.getByRole('textbox'), 'x');
      expect(screen.getByRole('textbox')).not.toHaveValue('x');
      expect(onChange).toHaveBeenCalledTimes(0);
    });
  });
});
