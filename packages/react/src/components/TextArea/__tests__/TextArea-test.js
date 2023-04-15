/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TextArea from '../TextArea';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('TextArea', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto the text area element', () => {
      render(
        <TextArea
          data-testid="test-id"
          id="area-1"
          labelText="TextArea label"
        />
      );

      expect(screen.getByRole('textbox')).toHaveAttribute(
        'data-testid',
        'test-id'
      );
    });

    it('should respect defaultValue prop', () => {
      render(
        <TextArea
          id="textarea-1"
          labelText="TextArea label"
          defaultValue="This is default text"
        />
      );

      expect(screen.getByText('This is default text')).toBeInTheDocument();
    });

    it('should respect disabled prop', () => {
      render(<TextArea id="textarea-1" labelText="TextArea label" disabled />);

      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('should respect helperText prop', () => {
      render(
        <TextArea
          id="textarea-1"
          labelText="TextArea label"
          helperText="This is helper text"
        />
      );

      expect(screen.getByText('This is helper text')).toBeInTheDocument();
      expect(screen.getByText('This is helper text')).toHaveClass(
        `${prefix}--form__helper-text`
      );
    });

    it('should respect hideLabel prop', () => {
      render(<TextArea id="textarea-1" labelText="TextArea label" hideLabel />);

      expect(screen.getByText('TextArea label')).toBeInTheDocument();
      expect(screen.getByText('TextArea label')).toHaveClass(
        `${prefix}--visually-hidden`
      );
    });

    it('should respect id prop', () => {
      render(<TextArea id="textarea-1" labelText="TextArea label" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'textarea-1');
    });

    it('should respect invalid prop', () => {
      const { container } = render(
        <TextArea id="textarea-1" labelText="TextArea" invalid />
      );

      const invalidIcon = container.querySelector(
        `svg.${prefix}--text-area__invalid-icon`
      );

      expect(screen.getByRole('textbox')).toHaveClass(
        `${prefix}--text-area--invalid`
      );
      expect(invalidIcon).toBeInTheDocument();
    });

    it('should respect invalidText prop', () => {
      render(
        <TextArea
          id="textarea-1"
          labelText="TextArea"
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
      render(<TextArea id="textarea-1" labelText="TextArea label" />);

      expect(screen.getByText('TextArea label')).toBeInTheDocument();
      expect(screen.getByText('TextArea label')).toHaveClass(
        `${prefix}--label`
      );
    });

    it('should respect placeholder prop', () => {
      render(
        <TextArea
          id="textarea-1"
          labelText="TextArea label"
          placeholder="Placeholder text"
        />
      );

      expect(
        screen.getByPlaceholderText('Placeholder text')
      ).toBeInTheDocument();
    });

    it('should respect value prop', () => {
      render(
        <TextArea
          id="textarea-1"
          labelText="TextArea label"
          value="This is a test value"
        />
      );

      expect(screen.getByText('This is a test value')).toBeInTheDocument();
    });

    it('should respect warn prop', () => {
      const { container } = render(
        <TextArea id="textarea-1" labelText="TextArea label" warn />
      );

      const warnIcon = container.querySelector(
        `svg.${prefix}--text-area__invalid-icon--warning`
      );

      expect(screen.getByRole('textbox')).toHaveClass(
        `${prefix}--text-area--warn`
      );
      expect(warnIcon).toBeInTheDocument();
    });

    it('should respect warnText prop', () => {
      render(
        <TextArea
          id="textarea-1"
          labelText="TextArea label"
          warn
          warnText="This is warning text"
        />
      );

      expect(screen.getByText('This is warning text')).toBeInTheDocument();
      expect(screen.getByText('This is warning text')).toHaveClass(
        `${prefix}--form-requirement`
      );
    });

    it('should respect rows prop', () => {
      render(<TextArea id="textarea-1" labelText="TextArea label" rows={25} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('rows', '25');
    });

    it('should respect enableCounter and maxCount prop', () => {
      render(
        <TextArea
          id="textarea-1"
          labelText="TextArea label"
          enableCounter={true}
          maxCount={500}
        />
      );
      expect(screen.getByRole('textbox')).toHaveAttribute('maxlength', '500');
      expect(screen.getByText('0/500')).toBeInTheDocument();
    });

    describe('behaves as expected - Component API', () => {
      it('should respect onChange prop', async () => {
        const onChange = jest.fn();
        render(
          <TextArea
            id="textarea-1"
            labelText="TextArea label"
            data-testid-="textarea-1"
            onChange={onChange}
          />
        );

        const component = screen.getByRole('textbox');

        await userEvent.type(component, 'x');
        expect(component).toHaveValue('x');
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
          <TextArea
            id="textarea-1"
            labelText="TextArea label"
            data-testid-="textarea-1"
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

      it('should not call `onClick` when the `<input>` is clicked but disabled', () => {
        const onClick = jest.fn();
        render(
          <TextArea
            id="textarea-1"
            labelText="TextArea label"
            onClick={onClick}
            disabled
          />
        );

        userEvent.click(screen.getByRole('textbox'));
        expect(onClick).not.toHaveBeenCalled();
      });

      it('should respect readOnly prop', async () => {
        const onChange = jest.fn();
        const onClick = jest.fn();
        render(
          <TextArea
            id="textarea-1"
            labelText="TextArea label"
            onClick={onClick}
            onChange={onChange}
            readOnly
          />
        );

        await userEvent.click(screen.getByRole('textbox'));
        expect(onClick).toHaveBeenCalledTimes(1);

        userEvent.type(screen.getByRole('textbox'), 'x');
        expect(screen.getByRole('textbox')).not.toHaveValue('x');
        expect(onChange).toHaveBeenCalledTimes(0);
      });

      it('should not render counter with only enableCounter prop passed in', () => {
        render(
          <TextArea id="textarea-1" labelText="TextArea label" enableCounter />
        );

        const counter = screen.queryByText('0/5');

        expect(counter).not.toBeInTheDocument();
      });

      it('should not render counter with only maxCount prop passed in', () => {
        render(
          <TextArea id="textarea-1" labelText="TextArea label" enableCounter />
        );

        const counter = screen.queryByText('0/5');

        expect(counter).not.toBeInTheDocument();
      });

      it('should have the expected classes for counter', () => {
        render(
          <TextArea
            id="textarea-1"
            labelText="TextArea label"
            enableCounter
            maxCount={5}
          />
        );

        const counter = screen.queryByText('0/5');

        expect(counter).toBeInTheDocument();
      });
    });
  });
});
