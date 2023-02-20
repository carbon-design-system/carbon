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
import { FeatureFlags } from '../../FeatureFlags';

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
        <FeatureFlags flags={{ 'enable-v11-release': true }}>
          <Select id="select" labelText="Select" className="custom-class" />
        </FeatureFlags>
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

    it('should respect disabled prop', () => {
      render(<Select id="select" labelText="Select" disabled />);

      expect(screen.getByRole('combobox')).toHaveAttribute('disabled');
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

      const selectWrapper = container.querySelector(`.${prefix}--select`);
      expect(selectWrapper).toHaveClass(`${prefix}--select--inline`);
    });

    it('should respect invalid prop', () => {
      const { container } = render(
        <Select id="select" labelText="Select" invalid />
      );

      const selectWrapper = container.querySelector(`.${prefix}--select`);
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

      const selectWrapper = container.querySelector('label');

      expect(selectWrapper).not.toBeInTheDocument();
    });

    it.skip('should respect readOnly prop', () => {
      const onChange = jest.fn();
      const onClick = jest.fn();

      render(
        <Select
          id="select-1"
          label="Select label"
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
      userEvent.click(theSelect);
      expect(onClick).toHaveBeenCalledTimes(1);

      //------------------------------------------------------------------------
      // Testing library - userEvent.type() does not work on <select> elements
      // and using selectOption causes the value to change.
      // Ideally we'd use userEvent.type(theSelect, '{arrowdown}{enter}') to test the readOnly prop
      // or have a way to click on a slotted option.
      // https://github.com/testing-library/user-event/issues/786
      //------------------------------------------------------------------------
      userEvent.selectOptions(theSelect, 'option-1');

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
        <Select id="select" labelText="Select" warn />
      );

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
  });

  describe('behaves as expected', () => {
    // Add tests for relevant component behavior. For more information, visit https://github.com/carbon-design-system/carbon/issues/10184#issuecomment-992978122
    it('should call onChange when expected', () => {
      const onChange = jest.fn();
      render(
        <Select id="select" labelText="Select" onChange={onChange}>
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
        </Select>
      );

      expect(onChange).toHaveBeenCalledTimes(0);
      userEvent.selectOptions(screen.getByRole('combobox'), 'Option 2');
      userEvent.selectOptions(screen.getByRole('combobox'), 'Option 1');

      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('should call onClick when expected', () => {
      const onClick = jest.fn();
      render(
        <Select id="select" labelText="Select" onClick={onClick}>
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
        </Select>
      );

      expect(onClick).toHaveBeenCalledTimes(0);
      userEvent.click(screen.getByRole('combobox'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', () => {
      const onClick = jest.fn();
      render(
        <Select id="select" labelText="Select" onClick={onClick} disabled>
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
        </Select>
      );

      expect(onClick).toHaveBeenCalledTimes(0);
      userEvent.click(screen.getByRole('combobox'));
      expect(onClick).toHaveBeenCalledTimes(0);
    });

    it('should receive focus when tab is pressed', () => {
      render(
        <Select id="select" labelText="Select">
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
        </Select>
      );

      expect(document.body).toHaveFocus();
      userEvent.tab();
      expect(screen.getByRole('combobox')).toHaveFocus();
    });

    it('should not receive focus when disabled', () => {
      render(
        <Select id="select" labelText="Select" disabled>
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
        </Select>
      );

      expect(document.body).toHaveFocus();
      userEvent.tab();
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
          <Select id="select" labelText="Select">
            <SelectItem value="option-1" text="Option 1" />
            <SelectItem value="option-2" text="Option 2" />
          </Select>
        </main>
      );
      await expect(container).toHaveNoACViolations('Select');
    });
  });
});
