/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidTextArea from '../FluidTextArea';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('FluidTextArea', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto the input element', () => {
      render(
        <FluidTextArea
          data-testid="test-id"
          id="input-1"
          labelText="FluidTextArea label"
          value="Value"
        />
      );

      expect(screen.getByText('Value')).toHaveAttribute(
        'data-testid',
        'test-id'
      );
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <FluidTextArea
          id="input-1"
          labelText="FluidTextArea label"
          className="custom-class"
        />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should respect defaultValue prop', () => {
      render(
        <FluidTextArea
          id="input-1"
          labelText="FluidTextArea label"
          defaultValue="This is default text"
        />
      );

      expect(screen.getByText('This is default text')).toBeInTheDocument();
    });

    it('should respect disabled prop', () => {
      render(
        <FluidTextArea
          id="input-1"
          labelText="FluidTextArea label"
          disabled
          data-testid="test-id-2"
        />
      );

      expect(screen.getByTestId('test-id-2')).toBeDisabled();
    });

    it('should respect id prop', () => {
      render(
        <FluidTextArea
          id="input-1"
          labelText="FluidTextArea label"
          data-testid="test-id-3"
        />
      );

      expect(screen.getByTestId('test-id-3')).toHaveAttribute('id', 'input-1');
    });

    it('should respect invalid prop', () => {
      const { container } = render(
        <FluidTextArea
          id="input-1"
          labelText="FluidTextArea"
          invalid
          data-testid="test-id-4"
        />
      );

      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const invalidIcon = container.querySelector(
        `svg.${prefix}--text-area__invalid-icon`
      );

      expect(screen.getByTestId('test-id-4')).toHaveAttribute('aria-invalid');
      expect(screen.getByTestId('test-id-4')).toHaveClass(
        `${prefix}--text-area--invalid`
      );
      expect(invalidIcon).toBeInTheDocument();
    });

    it('should respect invalidText prop', () => {
      render(
        <FluidTextArea
          id="input-1"
          labelText="FluidTextArea"
          invalid
          invalidText="This is invalid text"
        />
      );

      expect(screen.getByText('This is invalid text')).toBeInTheDocument();
      expect(screen.getByText('This is invalid text')).toHaveClass(
        `${prefix}--form-requirement`
      );
    });

    // Tests for disabled/readonly state normalization
    describe('disabled and readonly state normalization', () => {
      describe('invalid state', () => {
        it('should not set aria-invalid when disabled with invalid prop', () => {
          render(
            <FluidTextArea
              id="input-1"
              labelText="FluidTextArea"
              disabled
              invalid
              invalidText="Invalid"
              data-testid="test-disabled-invalid"
            />
          );

          expect(screen.getByTestId('test-disabled-invalid')).not.toHaveAttribute('aria-invalid');
          expect(screen.getByTestId('test-disabled-invalid')).not.toHaveClass(`${prefix}--text-area--invalid`);
        });

        it('should not set aria-invalid when readOnly with invalid prop', () => {
          render(
            <FluidTextArea
              id="input-1"
              labelText="FluidTextArea"
              readOnly
              invalid
              invalidText="Invalid"
              data-testid="test-readonly-invalid"
            />
          );

          expect(screen.getByTestId('test-readonly-invalid')).not.toHaveAttribute('aria-invalid');
          expect(screen.getByTestId('test-readonly-invalid')).not.toHaveClass(`${prefix}--text-area--invalid`);
        });

        it('should not display invalid message if disabled', () => {
          const { container } = render(
            <FluidTextArea
              id="input-1"
              labelText="FluidTextArea"
              disabled
              invalid
              invalidText="This should not be displayed"
            />
          );

          expect(screen.queryByText('This should not be displayed')).not.toBeInTheDocument();
          // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
          const invalidIcon = container.querySelector(`svg.${prefix}--text-area__invalid-icon`);
          expect(invalidIcon).not.toBeInTheDocument();
        });

        it('should not display invalid message if readOnly', () => {
          const { container } = render(
            <FluidTextArea
              id="input-1"
              labelText="FluidTextArea"
              readOnly
              invalid
              invalidText="This should not be displayed"
            />
          );

          expect(screen.queryByText('This should not be displayed')).not.toBeInTheDocument();
          // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
          const invalidIcon = container.querySelector(`svg.${prefix}--text-area__invalid-icon`);
          expect(invalidIcon).not.toBeInTheDocument();
        });
      });

      describe('warning state', () => {
        it('should not display warning styles when disabled with warn prop', () => {
          render(
            <FluidTextArea
              id="input-1"
              labelText="FluidTextArea"
              disabled
              warn
              warnText="Warning"
              data-testid="test-disabled-warn"
            />
          );

          expect(screen.getByTestId('test-disabled-warn')).not.toHaveClass(`${prefix}--text-area--warning`);
        });

        it('should not display warning styles when readOnly with warn prop', () => {
          render(
            <FluidTextArea
              id="input-1"
              labelText="FluidTextArea"
              readOnly
              warn
              warnText="Warning"
              data-testid="test-readonly-warn"
            />
          );

          expect(screen.getByTestId('test-readonly-warn')).not.toHaveClass(`${prefix}--text-area--warning`);
        });

        it('should not display warning message if disabled', () => {
          render(
            <FluidTextArea
              id="input-1"
              labelText="FluidTextArea"
              disabled
              warn
              warnText="This warning should not be displayed"
            />
          );

          expect(screen.queryByText('This warning should not be displayed')).not.toBeInTheDocument();
        });

        it('should not display warning message if readOnly', () => {
          render(
            <FluidTextArea
              id="input-1"
              labelText="FluidTextArea"
              readOnly
              warn
              warnText="This warning should not be displayed"
            />
          );

          expect(screen.queryByText('This warning should not be displayed')).not.toBeInTheDocument();
        });
      });
    });

    it('should respect labelText prop', () => {
      render(<FluidTextArea id="input-1" labelText="FluidTextArea label" />);

      expect(screen.getByText('FluidTextArea label')).toBeInTheDocument();
      expect(screen.getByText('FluidTextArea label')).toHaveClass(
        `${prefix}--label`
      );
    });

    it('should respect placeholder prop', () => {
      render(
        <FluidTextArea
          id="input-1"
          labelText="FluidTextArea label"
          placeholder="Placeholder text"
        />
      );

      expect(
        screen.getByPlaceholderText('Placeholder text')
      ).toBeInTheDocument();
    });
  });

  describe('behaves as expected - Component API', () => {
    it('should respect onChange prop', async () => {
      const onChange = jest.fn();
      render(
        <FluidTextArea
          id="input-1"
          labelText="FluidTextArea label"
          data-testid="test-id-6"
          onChange={onChange}
        />
      );

      await userEvent.type(screen.getByTestId('test-id-6'), 'x');
      expect(screen.getByTestId('test-id-6')).toHaveValue('x');
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
        <FluidTextArea
          id="input-1"
          labelText="FluidTextArea label"
          data-testid="test-id-7"
          onClick={onClick}
        />
      );

      await userEvent.click(screen.getByTestId('test-id-7'));
      expect(onClick).toHaveBeenCalled();
    });

    it('should not call `onClick` when the `<input>` is clicked but disabled', async () => {
      const onClick = jest.fn();
      render(
        <FluidTextArea
          id="input-1"
          labelText="FluidTextArea label"
          onClick={onClick}
          disabled
          data-testid="test-id-8"
        />
      );

      await userEvent.click(screen.getByTestId('test-id-8'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
