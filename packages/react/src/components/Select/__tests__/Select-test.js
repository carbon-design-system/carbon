/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Select from '../Select';
import SelectItem from '../../SelectItem';
import SelectSkeleton from '../../Select/Select.Skeleton';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { AILabel } from '../../AILabel';

const prefix = 'cds';

describe('Select', () => {
  describe('renders as expected - Component API', () => {
    it('should render the correct elements by default', () => {
      render(<Select id="select" labelText="Select" />);

      expect(screen.getByText('Select')).toBeInTheDocument();
      expect(screen.getByText('Select')).not.toHaveClass(
        `${prefix}--visually-hidden`
      );
    });

    it('should render the correct classname', () => {
      render(<Select id="select" labelText="Select" />);

      expect(screen.getByRole('combobox')).toHaveClass(
        `${prefix}--select-input`
      );
    });

    it('should spread extra props on the outermost element', () => {
      render(<Select data-testid="test-id" id="select" labelText="Select" />);

      expect(screen.getByRole('combobox')).toHaveAttribute(
        'data-testid',
        'test-id'
      );
    });

    it('should render children as expected', () => {
      render(
        <Select id="select" labelText="Select">
          <SelectItem value="option-1" text="Option 1" />
        </Select>
      );

      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 1')).toHaveClass(
        `${prefix}--select-option`
      );
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <Select id="select" labelText="Select" className="custom-class" />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should respect defaultValue prop', () => {
      render(
        <Select id="select" labelText="Select" defaultValue="option-2">
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
        </Select>
      );

      expect(screen.getByText('Option 2')).toHaveAttribute('selected');
    });

    it('should show SelectItem text as title', () => {
      render(
        <Select id="select" labelText="Select">
          <SelectItem text="Option 1" value="option-1" />
          <SelectItem text="Option 2" value="option-2" />
        </Select>
      );
      expect(screen.getByLabelText('Select').title).toEqual('Option 1');
    });

    it('should show selected option text as title when defaultValue is provided', () => {
      render(
        <Select id="select" labelText="Select" defaultValue="option-2">
          <SelectItem text="Option 1" value="option-1" />
          <SelectItem text="Option 2" value="option-2" />
        </Select>
      );
      expect(screen.getByLabelText('Select').title).toEqual('Option 2');
    });

    it('should show selected option text as title when value is provided', () => {
      render(
        <Select id="select" labelText="Select" value="option-2">
          <SelectItem text="Option 1" value="option-1" />
          <SelectItem text="Option 2" value="option-2" />
        </Select>
      );
      expect(screen.getByLabelText('Select').title).toEqual('Option 2');
    });

    it('should prioritize title prop over value or defaultValue', () => {
      render(
        <Select
          id="select"
          labelText="Select"
          value="option-2"
          title="Custom Title">
          <SelectItem text="Option 1" value="option-1" />
          <SelectItem text="Option 2" value="option-2" />
        </Select>
      );
      expect(screen.getByLabelText('Select').title).toEqual('Custom Title');
    });

    it('should respect title prop when provided', () => {
      render(
        <Select id="select" labelText="Select" title="Custom Title">
          <SelectItem text="Option 1" value="option-1" />
          <SelectItem text="Option 2" value="option-2" />
        </Select>
      );
      expect(screen.getByLabelText('Select').title).toEqual('Custom Title');
    });

    it('should update title when selection changes', async () => {
      render(
        <Select id="select" labelText="Select">
          <SelectItem text="Option 1" value="option-1" />
          <SelectItem text="Option 2" value="option-2" />
        </Select>
      );

      // Initial title should be the first option
      expect(screen.getByLabelText('Select').title).toEqual('Option 1');

      // Change selection
      await userEvent.selectOptions(
        screen.getByLabelText('Select'),
        'option-2'
      );

      // Title should update to the selected option
      expect(screen.getByLabelText('Select').title).toEqual('Option 2');
    });

    it('should respect disabled prop', () => {
      render(<Select id="select" labelText="Select" disabled />);

      expect(screen.getByRole('combobox')).toBeDisabled();
    });

    it('should respect helperText prop', () => {
      render(
        <Select
          id="select"
          labelText="Select"
          helperText="This is some helper text"
        />
      );

      expect(screen.getByText('This is some helper text')).toBeInTheDocument();
      expect(screen.getByText('This is some helper text')).toHaveClass(
        `${prefix}--form__helper-text`
      );
    });

    it('should respect hideLabel prop', () => {
      render(<Select id="select" labelText="Select" hideLabel />);

      expect(screen.getByText('Select')).toBeInTheDocument();
      expect(screen.getByText('Select')).toHaveClass(
        `${prefix}--visually-hidden`
      );
    });

    it('should respect id prop', () => {
      render(<Select id="select" labelText="Select" />);

      expect(screen.getByRole('combobox')).toHaveAttribute('id', 'select');
    });

    it('should respect inline prop', () => {
      const { container } = render(
        <Select id="select" labelText="Select" inline />
      );

      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const selectWrapper = container.querySelector(`.${prefix}--select`);
      expect(selectWrapper).toHaveClass(`${prefix}--select--inline`);
    });

    it('should respect invalid prop', () => {
      const { container } = render(
        <Select id="select" labelText="Select" invalid />
      );

      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const selectWrapper = container.querySelector(`.${prefix}--select`);
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const selectInput = container.querySelector(`.${prefix}--select-input`);

      expect(selectWrapper).toHaveClass(`${prefix}--select--invalid`);
      expect(selectInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('should respect invalidText prop', () => {
      render(
        <Select
          id="select"
          labelText="Select"
          invalid
          invalidText="This is an error message"
        />
      );

      expect(screen.getByText('This is an error message')).toBeInTheDocument();
      expect(screen.getByText('This is an error message')).toHaveClass(
        `${prefix}--form-requirement`
      );
    });

    it('should respect labelText prop', () => {
      render(<Select id="select" labelText="Select" />);

      expect(screen.getByText('Select')).toBeInTheDocument();
      expect(screen.getByText('Select')).toHaveClass(`${prefix}--label`);
    });

    it('should respect noLabel prop', () => {
      const { container } = render(
        <Select id="select" labelText="Select" noLabel />
      );

      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const selectWrapper = container.querySelector('label');

      expect(selectWrapper).not.toBeInTheDocument();
    });

    it.skip('should respect readOnly prop', async () => {
      const onChange = jest.fn();
      const onClick = jest.fn();

      render(
        <Select
          id="select-1"
          labelText="Select label"
          readOnly={true}
          onClick={onClick}
          onChange={onChange}>
          <SelectItem text="Choose an option" value="placeholder-item" />
          <SelectItem text="Option 1" value="option-1" />
          <SelectItem text="Option 2" value="option-2" />
        </Select>
      );

      // Click events should fire
      const theSelect = screen.getByRole('combobox');
      await userEvent.click(theSelect);
      expect(onClick).toHaveBeenCalledTimes(1);

      //------------------------------------------------------------------------
      // Testing library - userEvent.type() does not work on <select> elements
      // and using selectOption causes the value to change.
      // Ideally we'd use userEvent.type(theSelect, '{arrowdown}{enter}') to test the readOnly prop
      // or have a way to click on a slotted option.
      // https://github.com/testing-library/user-event/issues/786
      //------------------------------------------------------------------------
      await userEvent.selectOptions(theSelect, 'option-1');

      // Change events should *not* fire
      expect(screen.getByText('Option 1').selected).toBe(false);

      expect(onChange).toHaveBeenCalledTimes(0);
    });

    it('should respect size prop', () => {
      render(<Select id="select" labelText="Select" size="sm" />);

      expect(screen.getByRole('combobox')).toHaveClass(
        `${prefix}--select-input--sm`
      );
    });

    it('should respect warn prop', () => {
      const { container } = render(
        <Select id="select" labelText="Select" warn warnText="Warning" />
      );

      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const selectWrapper = container.querySelector(`.${prefix}--select`);

      expect(selectWrapper).toHaveClass(`${prefix}--select--warning`);
    });

    it('should respect warnText prop', () => {
      render(
        <Select
          id="select"
          labelText="Select"
          warn
          warnText="This is a warning message"
        />
      );

      expect(screen.getByText('This is a warning message')).toBeInTheDocument();
      expect(screen.getByText('This is a warning message')).toHaveClass(
        `${prefix}--form-requirement`
      );
    });

    it('should respect slug prop', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const { container } = render(
        <Select id="select" labelText="Select" slug={<AILabel />} />
      );

      expect(container.firstChild.firstChild).toHaveClass(
        `${prefix}--select--slug`
      );
      spy.mockRestore();
    });

    it('should respect decorator prop', () => {
      const { container } = render(
        <Select id="select" labelText="Select" decorator={<AILabel />} />
      );

      expect(container.firstChild.firstChild).toHaveClass(
        `${prefix}--select--decorator`
      );
    });

    it('should not display invalid message if disabled', () => {
      render(
        <Select
          id="select"
          labelText="Select"
          disabled
          invalid
          invalidText="This is an error message"
        />
      );

      expect(
        screen.queryByText('This is an error message')
      ).not.toBeInTheDocument();
    });

    it('should not display invalid message if readOnly', () => {
      render(
        <Select
          id="select"
          labelText="Select"
          readOnly
          invalid
          invalidText="This is an error message"
        />
      );

      expect(
        screen.queryByText('This is an error message')
      ).not.toBeInTheDocument();
    });

    it('should not display warning message if disabled', () => {
      render(
        <Select
          id="select"
          labelText="Select"
          disabled
          warn
          warnText="This is a warning message"
        />
      );

      expect(
        screen.queryByText('This is a warning message')
      ).not.toBeInTheDocument();
    });

    it('should not display warning message if readOnly', () => {
      render(
        <Select
          id="select"
          labelText="Select"
          readOnly
          warn
          warnText="This is a warning message"
        />
      );

      expect(
        screen.queryByText('This is a warning message')
      ).not.toBeInTheDocument();
    });

    it('should not display warning styles if disabled', () => {
      const { container } = render(
        <Select id="select" labelText="Select" disabled warn />
      );

      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const selectWrapper = container.querySelector(`.${prefix}--select`);

      expect(selectWrapper).not.toHaveClass(`${prefix}--select--warning`);
    });

    it('should not display warning styles if readOnly', () => {
      const { container } = render(
        <Select id="select" labelText="Select" readOnly warn />
      );

      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const selectWrapper = container.querySelector(`.${prefix}--select`);

      expect(selectWrapper).not.toHaveClass(`${prefix}--select--warning`);
    });
  });

  describe('behaves as expected', () => {
    // Add tests for relevant component behavior. For more information, visit https://github.com/carbon-design-system/carbon/issues/10184#issuecomment-992978122
    it('should call onChange when expected', async () => {
      const onChange = jest.fn();
      render(
        <Select id="select" labelText="Select" onChange={onChange}>
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
        </Select>
      );

      expect(onChange).toHaveBeenCalledTimes(0);
      await userEvent.selectOptions(screen.getByRole('combobox'), 'Option 2');
      await userEvent.selectOptions(screen.getByRole('combobox'), 'Option 1');

      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('should call onClick when expected', async () => {
      const onClick = jest.fn();
      render(
        <Select id="select" labelText="Select" onClick={onClick}>
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
        </Select>
      );

      expect(onClick).toHaveBeenCalledTimes(0);
      await userEvent.click(screen.getByRole('combobox'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', async () => {
      const onClick = jest.fn();
      render(
        <Select id="select" labelText="Select" onClick={onClick} disabled>
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
        </Select>
      );

      expect(onClick).toHaveBeenCalledTimes(0);
      await userEvent.click(screen.getByRole('combobox'));
      expect(onClick).toHaveBeenCalledTimes(0);
    });

    it('should receive focus when tab is pressed', async () => {
      render(
        <Select id="select" labelText="Select">
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
        </Select>
      );

      expect(document.body).toHaveFocus();
      await userEvent.tab();
      expect(screen.getByRole('combobox')).toHaveFocus();
    });

    it('should not receive focus when disabled', async () => {
      render(
        <Select id="select" labelText="Select" disabled>
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
        </Select>
      );

      expect(document.body).toHaveFocus();
      await userEvent.tab();
      expect(document.body).toHaveFocus();
    });

    it('should render with a ref', () => {
      const ref = React.createRef();
      render(
        <Select id="select" labelText="Select" ref={ref}>
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
        </Select>
      );

      expect(ref.current).toHaveClass(`${prefix}--select-input`);
    });

    it('should render a skeleton state', () => {
      const { container } = render(<SelectSkeleton />);

      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const selectWrapper = container.querySelector(`.${prefix}--select`);

      expect(selectWrapper).toHaveClass(`${prefix}--skeleton`);
    });
  });

  describe('automated verification testing', () => {
    it('should have no aXe violations', async () => {
      const { container } = render(
        <Select id="select" labelText="Select">
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
        </Select>
      );
      await expect(container).toHaveNoAxeViolations();
    });

    it('should have no Accessibility Checker violations', async () => {
      const { container } = render(
        <main>
          <Select
            id="select"
            labelText="Select an option"
            aria-label="Select an option">
            <SelectItem value="option-1" text="Option 1" />
            <SelectItem value="option-2" text="Option 2" />
          </Select>
        </main>
      );
      await expect(container).toHaveNoACViolations('Select');
    });

    it('should not set aria-invalid if disabled', () => {
      render(<Select id="select" labelText="Select" disabled invalid />);

      expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-invalid');
    });

    it('should not set aria-invalid if readOnly', () => {
      render(<Select id="select" labelText="Select" readOnly invalid />);

      expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-invalid');
    });
  });
});
