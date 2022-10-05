/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidDatePicker from '../FluidDatePicker';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { FeatureFlags } from '../../FeatureFlags';

const prefix = 'cds';

describe('FluidDatePicker', () => {
  describe('renders as expected - Component API', () => {
    it('should render as expected', () => {
      const { container } = render(
        <FeatureFlags flags={{ 'enable-v11-release': true }}>
          <FluidDatePicker id="input-1" labelText="FluidDatePicker label" />
        </FeatureFlags>
      );

      expect(container.firstChild).toHaveClass(`${prefix}--text-input--fluid`);
    });

    it('should spread extra props onto the input element', () => {
      render(
        <FluidDatePicker
          data-testid="test-id"
          id="input-1"
          labelText="FluidDatePicker label"
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
          <FluidDatePicker
            id="input-1"
            labelText="FluidDatePicker label"
            className="custom-class"
          />
        </FeatureFlags>
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should support a custom `className` prop on the input element (V10)', () => {
      render(
        <FluidDatePicker
          id="input-1"
          labelText="FluidDatePicker label"
          className="custom-class"
        />
      );

      expect(screen.getByRole('textbox')).toHaveClass('custom-class');
    });

    it('should respect defaultValue prop', () => {
      render(
        <FluidDatePicker
          id="input-1"
          labelText="FluidDatePicker label"
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
        <FluidDatePicker
          id="input-1"
          labelText="FluidDatePicker label"
          disabled
        />
      );

      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('should respect id prop', () => {
      render(
        <FluidDatePicker id="input-1" labelText="FluidDatePicker label" />
      );

      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'input-1');
    });

    it('should respect invalid prop', () => {
      const { container } = render(
        <FluidDatePicker id="input-1" labelText="FluidDatePicker" invalid />
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
        <FluidDatePicker
          id="input-1"
          labelText="FluidDatePicker"
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
        <FluidDatePicker id="input-1" labelText="FluidDatePicker" isPassword />
      );

      expect(container.firstChild).toHaveClass(
        `${prefix}--password-input-wrapper`
      );
      expect(container.firstChild).toHaveClass(`${prefix}--text-input--fluid`);
    });

    it('should respect labelText prop', () => {
      render(
        <FluidDatePicker id="input-1" labelText="FluidDatePicker label" />
      );

      expect(screen.getByText('FluidDatePicker label')).toBeInTheDocument();
      expect(screen.getByText('FluidDatePicker label')).toHaveClass(
        `${prefix}--label`
      );
    });

    it('should respect placeholder prop', () => {
      render(
        <FluidDatePicker
          id="input-1"
          labelText="FluidDatePicker label"
          placeholder="Placeholder text"
        />
      );

      expect(
        screen.getByPlaceholderText('Placeholder text')
      ).toBeInTheDocument();
    });

    it('should respect type prop', () => {
      render(
        <FluidDatePicker
          id="input-1"
          labelText="FluidDatePicker label"
          type="text"
        />
      );

      expect(screen.getByRole('textbox')).toHaveAttribute(`type`, 'text');
    });

    it('should respect value prop', () => {
      render(
        <FluidDatePicker
          id="input-1"
          labelText="FluidDatePicker label"
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
        <FluidDatePicker id="input-1" labelText="FluidDatePicker label" warn />
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
        <FluidDatePicker
          id="input-1"
          labelText="FluidDatePicker label"
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
        <FluidDatePicker
          id="input-1"
          labelText="FluidDatePicker label"
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
        <FluidDatePicker
          id="input-1"
          labelText="FluidDatePicker label"
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
        <FluidDatePicker
          id="input-1"
          labelText="FluidDatePicker label"
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
      const { container } = render(
        <FluidDatePicker
          id="input-1"
          labelText="FluidDatePicker label"
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

      // Should display the "read-only" icon
      const icon = container.querySelector(
        `svg.${prefix}--text-input__readonly-icon`
      );
      expect(icon).toBeInTheDocument();
    });
  });
});
