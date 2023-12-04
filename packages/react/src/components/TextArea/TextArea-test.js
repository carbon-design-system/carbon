/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TextArea from './TextArea';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('TextArea', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      render(
        <TextArea data-testid="test-id" id="testing" labelText="testLabel" />
      );
      expect(screen.getByLabelText('testLabel')).toHaveAttribute(
        'data-testid',
        'test-id'
      );
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <TextArea className="custom-class" id="testing" labelText="testLabel" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should have default cols settings as expected', () => {
      render(<TextArea id="testing" labelText="testLabel" />);
      expect(screen.getByLabelText('testLabel')).toHaveStyle({ width: '100%' });
      expect(screen.getByLabelText('testLabel')).not.toHaveAttribute('cols');
    });

    it('should set cols as expected', () => {
      render(<TextArea cols={200} id="testing" labelText="testLabel" />);
      expect(screen.getByLabelText('testLabel')).toHaveAttribute('cols', '200');
    });

    it('should set defaultValue as expected', () => {
      render(
        <TextArea
          defaultValue="default value"
          id="testing"
          labelText="testLabel"
        />
      );
      expect(screen.getByLabelText('testLabel')).toHaveValue('default value');
    });

    it('should not be disabled by default', () => {
      render(<TextArea id="testing" labelText="testLabel" />);
      expect(screen.getByLabelText('testLabel')).toBeEnabled();
    });

    it('should be disabled as expected', () => {
      render(<TextArea disabled id="testing" labelText="testLabel" />);
      expect(screen.getByLabelText('testLabel')).toBeDisabled();
    });

    it('should respect hideLabel prop', () => {
      render(<TextArea hideLabel id="testing" labelText="testLabel" />);
      expect(screen.getByText('testLabel')).toHaveClass(
        `${prefix}--visually-hidden`
      );
    });

    it('should respect id prop', () => {
      render(<TextArea id="text-area-id" labelText="testLabel" />);
      expect(screen.getByLabelText('testLabel')).toHaveAttribute(
        'id',
        'text-area-id'
      );
    });

    it('should respect invalid and invalidText prop', () => {
      render(
        <TextArea
          id="testing"
          invalid
          invalidText={'Error: incorrect characters'}
          labelText="testLabel"
        />
      );
      expect(screen.getByLabelText('testLabel')).toHaveAttribute(
        'aria-invalid'
      );
      expect(screen.getByLabelText('testLabel')).toHaveClass(
        `${prefix}--text-area--invalid`
      );
      expect(
        screen.getByText('Error: incorrect characters')
      ).toBeInTheDocument();
    });

    it('should respect placeholder prop', () => {
      render(
        <TextArea id="testing" labelText="testLabel" placeholder="Type here" />
      );
      expect(screen.getByLabelText('testLabel')).toHaveAttribute(
        'placeholder',
        'Type here'
      );
    });

    it('should have the default rows as expected', () => {
      render(<TextArea id="testing" labelText="testLabel" />);
      expect(screen.getByLabelText('testLabel')).toHaveAttribute('rows', '4');
    });

    it('should set rows as expected', () => {
      render(<TextArea id="testing" labelText="testLabel" rows={10} />);
      expect(screen.getByLabelText('testLabel')).toHaveAttribute('rows', '10');
    });

    it('should set value as expected', () => {
      render(
        <TextArea id="testing" labelText="testLabel" value="Lorem Ipsum" />
      );
      expect(screen.getByLabelText('testLabel')).toHaveValue('Lorem Ipsum');
    });
  });

  describe('label', () => {
    it('renders a label with the expected text', () => {
      render(<TextArea id="testing" labelText="testLabel" />);
      expect(screen.getByText('testLabel')).toBeInTheDocument();
    });

    it('has the expected classes', () => {
      render(<TextArea id="testing" labelText="testLabel" />);
      expect(screen.getByText('testLabel')).toHaveClass(`${prefix}--label`);
    });
  });

  describe('helper', () => {
    it('renders a helper', () => {
      render(
        <TextArea
          helperText="It must be 3 characters"
          id="testing"
          labelText="testLabel"
        />
      );
      expect(screen.getByText('It must be 3 characters')).toHaveClass(
        `${prefix}--form__helper-text`
      );
    });

    it('renders children as expected', () => {
      render(
        <TextArea
          helperText={<span>This is helper text.</span>}
          id="testing"
          labelText="testLabel"
        />
      );
      expect(screen.getByText('This is helper text.')).not.toHaveClass(
        `${prefix}--form__helper-text`
      );
      expect(screen.getByText('This is helper text.').tagName).toBe('SPAN');
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        screen.getByText('This is helper text.').parentElement
      ).toHaveClass(`${prefix}--form__helper-text`);
    });
  });

  describe('counter', () => {
    it('should set enableCounter and maxCount as expected', () => {
      render(
        <TextArea
          enableCounter
          id="testing"
          labelText="testLabel"
          maxCount={500}
        />
      );
      expect(screen.getByText('0/500')).toBeInTheDocument();
    });

    it('should not render counter with only enableCounter prop passed in', () => {
      render(<TextArea enableCounter id="testing" labelText="testLabel" />);
      // The label and the counter both have the same label class.
      // The label exists, but not the counter.
      expect(screen.getByText('testLabel')).toHaveClass(`${prefix}--label`);
      expect(
        screen
          .getByText('testLabel')
          // eslint-disable-next-line testing-library/no-node-access
          .closest(`.${prefix}--text-area__label-wrapper`)
          // eslint-disable-next-line testing-library/no-node-access
          .getElementsByClassName(`${prefix}--label`).length
      ).toEqual(1);
    });

    it('should not render counter with only maxCount prop passed in', () => {
      render(<TextArea id="testing" labelText="testLabel" maxCount={500} />);
      // The label and the counter both have the same label class.
      // The label exists, but not the counter.
      expect(screen.getByText('testLabel')).toHaveClass(`${prefix}--label`);
      expect(
        screen
          .getByText('testLabel')
          // eslint-disable-next-line testing-library/no-node-access
          .closest(`.${prefix}--text-area__label-wrapper`)
          // eslint-disable-next-line testing-library/no-node-access
          .getElementsByClassName(`${prefix}--label`).length
      ).toEqual(1);
    });

    describe('word counter', () => {
      it('should not render element with only counterMode prop passed in', () => {
        render(
          <TextArea
            id="wordCounterTestWrapper1"
            labelText="testLabel"
            counterMode={'word'}
          />
        );
        expect(
          // eslint-disable-next-line testing-library/no-node-access
          screen.getByText('testLabel').closest(`${prefix}--text-area__counter`)
        ).toEqual(null);
      });
    });
  });

  it('should have label and counter disabled', () => {
    render(
      <TextArea
        disabled
        enableCounter
        id="testing"
        labelText="testLabel"
        maxCount={100}
      />
    );
    expect(screen.getByText('testLabel')).toHaveClass(
      `${prefix}--label--disabled`
    );
    expect(screen.getByText('0/100')).toHaveClass(`${prefix}--label--disabled`);
  });
});

describe('events', () => {
  describe('disabled textarea', () => {
    it('should not invoke onClick when textarea is clicked', async () => {
      const onClick = jest.fn();
      render(
        <TextArea
          disabled
          id="testing"
          labelText="testLabel"
          onClick={onClick}
        />
      );
      await userEvent.click(screen.getByLabelText('testLabel'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should not invoke onChange', async () => {
      const onChange = jest.fn();
      render(
        <TextArea
          disabled
          id="testing"
          labelText="testLabel"
          onChange={onChange}
        />
      );
      await userEvent.click(screen.getByLabelText('testLabel'));
      await userEvent.keyboard('big blue');
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('events', () => {
    describe('disabled textarea', () => {
      it('should not invoke onClick when textarea is clicked', async () => {
        const onClick = jest.fn();
        render(
          <TextArea
            disabled
            id="testing"
            labelText="testLabel"
            onClick={onClick}
          />
        );
        await userEvent.click(screen.getByLabelText('testLabel'));
        expect(onClick).not.toHaveBeenCalled();
      });

      it('should not invoke onChange', async () => {
        const onChange = jest.fn();
        render(
          <TextArea
            disabled
            id="testing"
            labelText="testLabel"
            onChange={onChange}
          />
        );
        await userEvent.click(screen.getByLabelText('testLabel'));
        await userEvent.keyboard('big blue');
        expect(onChange).not.toHaveBeenCalled();
      });
    });

    describe('enabled textarea', () => {
      it('should invoke onClick when textarea is clicked', async () => {
        const onClick = jest.fn();
        render(
          <TextArea
            disabled={false}
            id="testing"
            labelText="testLabel"
            onClick={onClick}
          />
        );
        await userEvent.click(screen.getByLabelText('testLabel'));
        expect(onClick).toHaveBeenCalled();
      });

      it('should invoke onChange when textarea value is changed', async () => {
        const onChange = jest.fn();
        render(
          <TextArea
            disabled={false}
            id="testing"
            labelText="testLabel"
            onChange={onChange}
          />
        );
        await userEvent.click(screen.getByLabelText('testLabel'));
        await userEvent.keyboard('big blue');
        expect(onChange).toHaveBeenCalled();
      });
    });
  });
});
