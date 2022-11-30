/**
 * Copyright IBM Corp. 2016, 2018, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TextArea from '../TextArea';

const prefix = 'cds';

describe('TextArea', () => {
  const renderTextArea = (props) => {
    render(
      <TextArea
        className="extra-class"
        data-testid="element"
        id="testing"
        labelText="testlabel"
        {...props}
      />
    );
  };

  describe('textarea', () => {
    it('renders a textarea', () => {
      renderTextArea();
      expect(screen.getByLabelText('testlabel')).toBeInTheDocument();
    });

    it('has the expected classes', () => {
      renderTextArea();
      expect(screen.getByLabelText('testlabel')).toHaveClass(
        `${prefix}--text-area`
      );
    });

    it('applies extra classes specified via className', () => {
      renderTextArea();
      expect(screen.getByLabelText('testlabel')).toHaveClass('extra-class');
    });

    it('should have the default rows as expected', () => {
      renderTextArea();
      expect(screen.getByLabelText('testlabel')).toHaveAttribute('rows', '4');
    });

    it('should set rows as expected', () => {
      renderTextArea({ rows: 10 });
      expect(screen.getByLabelText('testlabel')).toHaveAttribute('rows', '10');
    });

    it('should have default cols settings as expected', () => {
      renderTextArea();
      expect(screen.getByLabelText('testlabel')).toHaveStyle({ width: '100%' });
      expect(screen.getByLabelText('testlabel')).not.toHaveAttribute('cols');
    });

    it('should set cols as expected', () => {
      renderTextArea({ cols: 200 });
      expect(screen.getByLabelText('testlabel')).toHaveAttribute('cols', '200');
    });

    it('should not be disabled by default', () => {
      renderTextArea();
      expect(screen.getByLabelText('testlabel')).not.toHaveAttribute(
        'disabled'
      );
    });

    it('should be disabled as expected', () => {
      renderTextArea({ disabled: true });
      expect(screen.getByLabelText('testlabel')).toHaveAttribute('disabled');
    });

    it('should set placeholder as expected', () => {
      renderTextArea({ placeholder: 'Type here' });
      expect(screen.getByLabelText('testlabel')).toHaveAttribute(
        'placeholder',
        'Type here'
      );
    });

    it('should set value as expected', () => {
      renderTextArea({ value: 'Lorem Ipsum' });
      expect(screen.getByLabelText('testlabel')).toHaveValue('Lorem Ipsum');
    });

    it('should set defaultValue as expected', () => {
      renderTextArea({ defaultValue: 'default value' });
      expect(screen.getByLabelText('testlabel')).toHaveValue('default value');
    });
  });

  describe('label', () => {
    it('renders a label with the expected text', () => {
      renderTextArea({ labelText: 'testLabel' });
      expect(screen.getByText('testLabel')).toBeInTheDocument();
    });

    it('has the expected classes', () => {
      renderTextArea({ labelText: 'testLabel' });
      expect(screen.getByText('testLabel')).toHaveClass(`${prefix}--label`);
    });
  });

  describe('helper', () => {
    it('renders a helper', () => {
      renderTextArea({ helperText: 'It must be 3 characters' });
      expect(screen.getByText('It must be 3 characters')).toHaveClass(
        `${prefix}--form__helper-text`
      );
    });

    it('renders children as expected', () => {
      renderTextArea({ helperText: <span>This is helper text.</span> });
      expect(screen.getByText('This is helper text.')).not.toHaveClass(
        `${prefix}--form__helper-text`
      );
      expect(screen.getByText('This is helper text.').tagName).toBe('SPAN');
      expect(
        screen.getByText('This is helper text.').parentElement
      ).toHaveClass(`${prefix}--form__helper-text`);
    });
  });

  describe('counter', () => {
    it('should set enableCounter and maxCount as expected', () => {
      renderTextArea({ enableCounter: true, maxCount: 500 });
      expect(screen.getByText('0/500')).toBeInTheDocument();
    });

    it('should not render counter with only enableCounter prop passed in', () => {
      renderTextArea({ enableCounter: true });
      // The label and the counter both have the same label class.
      // The label exists, but not the counter.
      expect(screen.getByText('testlabel')).toHaveClass(`${prefix}--label`);
      expect(
        screen
          .getByText('testlabel')
          .closest(`.${prefix}--text-area__label-wrapper`)
          .getElementsByClassName(`${prefix}--label`).length
      ).toEqual(1);
    });

    it('should not render counter with only maxCount prop passed in', () => {
      renderTextArea({ maxCount: 500 });
      // The label and the counter both have the same label class.
      // The label exists, but not the counter.
      expect(screen.getByText('testlabel')).toHaveClass(`${prefix}--label`);
      expect(
        screen
          .getByText('testlabel')
          .closest(`.${prefix}--text-area__label-wrapper`)
          .getElementsByClassName(`${prefix}--label`).length
      ).toEqual(1);
    });

    it('should have label and counter disabled', () => {
      renderTextArea({ disabled: true, enableCounter: true, maxCount: 100 });
      expect(screen.getByText('testlabel')).toHaveClass(
        `${prefix}--label--disabled`
      );
      expect(screen.getByText('0/100')).toHaveClass(
        `${prefix}--label--disabled`
      );
    });
  });

  describe('events', () => {
    describe('disabled textarea', () => {
      it('should not invoke onClick when textarea is clicked', () => {
        const onClick = jest.fn();
        renderTextArea({ disabled: true, onClick });
        userEvent.click(screen.getByLabelText('testlabel'));
        expect(onClick).not.toHaveBeenCalled();
      });

      it('should not invoke onChange', () => {
        const onChange = jest.fn();
        renderTextArea({ disabled: true, onChange });
        userEvent.click(screen.getByLabelText('testlabel'));
        userEvent.keyboard('big blue');
        expect(onChange).not.toHaveBeenCalled();
      });
    });

    describe('enabled textarea', () => {
      it('should invoke onClick when textarea is clicked', async () => {
        const onClick = jest.fn();
        renderTextArea({ disabled: false, onClick });
        await userEvent.click(screen.getByLabelText('testlabel'));
        expect(onClick).toHaveBeenCalled();
      });

      it('should invoke onChange when textarea value is changed', async () => {
        const onChange = jest.fn();
        renderTextArea({ disabled: false, onChange });
        await userEvent.click(screen.getByLabelText('testlabel'));
        userEvent.keyboard('big blue');
        expect(onChange).toHaveBeenCalled();
      });
    });
  });
});
