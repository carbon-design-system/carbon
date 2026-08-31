/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditInPlace } from '..';

const componentName = EditInPlace.displayName;
const prefix = 'cds';
const blockClass = `${prefix}--edit-in-place`;

const defaultProps = {
  cancelLabel: 'Cancel',
  className: 'edit-in-place-test',
  editLabel: 'Edit',
  id: 'test-id',
  invalid: false,
  invalidText: 'This field is required',
  labelText: 'test label',
  onCancel: () => {},
  onChange: () => {},
  onSave: () => {},
  saveLabel: 'Save',
  value: 'default',
};

describe(componentName, () => {
  it('renders EditInPlace', async () => {
    render(<EditInPlace {...defaultProps} />);
  });

  it('renders in readOnly mode', async () => {
    const readOnlyProps = {
      ...defaultProps,
      readOnly: true,
      readOnlyLabel: 'Edit off',
      readOnlyToggleTipText: 'This field is read-only',
    };
    const { container } = render(<EditInPlace {...readOnlyProps} />);
    const input = screen.getByDisplayValue(defaultProps.value);
    expect(input).toHaveAttribute('readOnly');
    const inputContainer = container.querySelector(`.${blockClass}`);
    await userEvent.click(inputContainer);
    expect(screen.getByText('This field is read-only')).toBeInTheDocument();
  });

  it('renders in invalid mode', async () => {
    render(<EditInPlace {...defaultProps} invalid />);
    const input = screen.getByDisplayValue(defaultProps.value);
    await userEvent.click(input);
    expect(screen.getByText(defaultProps.invalidText)).toBeVisible();
  });

  it('focuses the input when the component is clicked', async () => {
    render(<EditInPlace {...defaultProps} />);
    const input = screen.getByDisplayValue(defaultProps.value);
    await userEvent.click(input);
    expect(screen.getByLabelText(defaultProps.cancelLabel)).toBeVisible();
  });

  it('focuses the input when the edit button is clicked', async () => {
    render(<EditInPlace {...defaultProps} />);
    const editBtn = screen.getByLabelText(defaultProps.editLabel);
    await userEvent.click(editBtn);
    expect(screen.getByLabelText(defaultProps.cancelLabel)).toBeVisible();
  });

  it('handles onChange', async () => {
    const onChange = jest.fn();
    const props = {
      ...defaultProps,
      onChange,
    };
    render(<EditInPlace {...props} />);
    const input = screen.getByDisplayValue(props.value);
    fireEvent.change(input, {
      target: { value: 'new value' },
    });
    expect(onChange).toHaveBeenCalledWith('new value');

    // for coverage- dirtyInput check in onChangeHandler
    fireEvent.change(input, {
      target: { value: 'new value 2' },
    });
  });

  it('handles onSave', async () => {
    const onSave = jest.fn();
    const props = {
      ...defaultProps,
      onSave,
    };
    const { rerender } = render(<EditInPlace {...props} />);
    rerender(<EditInPlace {...props} value="new value" />);
    await userEvent.click(screen.getByLabelText(props.editLabel));
    await userEvent.click(screen.getByLabelText(props.saveLabel));
    expect(onSave).toHaveBeenCalled();
  });

  it('handles onCancel', async () => {
    const onCancel = jest.fn();
    const props = {
      ...defaultProps,
      onCancel,
    };
    const { rerender } = render(<EditInPlace {...props} />);
    rerender(<EditInPlace {...props} value="new value" />);
    await userEvent.click(screen.getByLabelText(props.editLabel));
    await userEvent.click(screen.getByLabelText(props.cancelLabel));
    expect(onCancel).toHaveBeenCalled();
  });

  it('disables cancel button when no value change', async () => {
    const props = {
      ...defaultProps,
    };
    render(<EditInPlace {...props} />);
    await userEvent.click(screen.getByLabelText(props.editLabel));
    const cancelBtn = screen.getByLabelText(props.cancelLabel);
    expect(cancelBtn).toBeDisabled();
  });

  it('enables cancel button when value changes', async () => {
    const props = {
      ...defaultProps,
    };
    const { rerender } = render(<EditInPlace {...props} />);
    await userEvent.click(screen.getByLabelText(props.editLabel));

    // Change the value
    rerender(<EditInPlace {...props} value="new value" />);

    const cancelBtn = screen.getByLabelText(props.cancelLabel);
    expect(cancelBtn).not.toBeDisabled();
  });

  it('disables cancel button when value changes to whitespace only', async () => {
    const props = {
      ...defaultProps,
      value: 'test',
    };
    const { rerender } = render(<EditInPlace {...props} />);
    await userEvent.click(screen.getByLabelText(props.editLabel));

    // Change to whitespace only (trimmed values are the same)
    rerender(<EditInPlace {...props} value="test   " />);

    const cancelBtn = screen.getByLabelText(props.cancelLabel);
    expect(cancelBtn).toBeDisabled();
  });

  it('enables cancel button when trimmed value actually changes', async () => {
    const props = {
      ...defaultProps,
      value: 'test',
    };
    const { rerender } = render(<EditInPlace {...props} />);
    await userEvent.click(screen.getByLabelText(props.editLabel));

    // Change to different value with whitespace
    rerender(<EditInPlace {...props} value="  new value  " />);

    const cancelBtn = screen.getByLabelText(props.cancelLabel);
    expect(cancelBtn).not.toBeDisabled();
  });

  it('disables save button when value is invalid even if changed', async () => {
    const props = {
      ...defaultProps,
      invalid: true,
    };
    const { rerender } = render(<EditInPlace {...props} />);
    await userEvent.click(screen.getByLabelText(props.editLabel));

    // Change the value
    rerender(<EditInPlace {...props} value="new value" invalid={true} />);

    const saveBtn = screen.getByLabelText(props.saveLabel);
    const cancelBtn = screen.getByLabelText(props.cancelLabel);

    // Save should be disabled due to invalid state
    expect(saveBtn).toBeDisabled();
    // Cancel should be enabled since value changed
    expect(cancelBtn).not.toBeDisabled();
  });

  it('handles blur save', async () => {
    const onSave = jest.fn();
    const props = {
      ...defaultProps,
      onSave,
    };
    const { rerender } = render(<EditInPlace {...props} />);
    rerender(<EditInPlace {...props} value="new value" />);
    await userEvent.click(screen.getByLabelText(props.editLabel));
    const input = screen.getByDisplayValue('new value');
    fireEvent.blur(input);
    expect(onSave).toHaveBeenCalled();
  });

  it('handles blur cancel', async () => {
    const onCancel = jest.fn();
    const props = {
      ...defaultProps,
      onCancel,
    };
    render(<EditInPlace {...props} />);
    await userEvent.click(screen.getByLabelText(props.editLabel));
    const input = screen.getByDisplayValue(props.value);
    fireEvent.blur(input);
    expect(onCancel).toHaveBeenCalled();
  });

  it('handles keydown', async () => {
    render(<EditInPlace {...defaultProps} />);
    const input = screen.getByDisplayValue(defaultProps.value);

    // for coverage- default switch statement case
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'M' });
  });

  it('handles escape key', async () => {
    const onCancel = jest.fn();
    const props = {
      ...defaultProps,
      onCancel,
    };
    const { rerender } = render(<EditInPlace {...props} />);
    const input = screen.getByDisplayValue(props.value);

    // clicks escape without making changes
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(onCancel).toHaveBeenCalled();

    // clicks escape with new value
    rerender(<EditInPlace {...props} value="new value" />);
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(onCancel).toHaveBeenCalled();
  });

  it('handles enter key', async () => {
    const onSave = jest.fn();
    const props = {
      ...defaultProps,
      onSave,
    };
    const { rerender } = render(<EditInPlace {...props} />);
    const input = screen.getByDisplayValue(props.value);

    // clicks enter without making changes
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSave).not.toHaveBeenCalled();

    // clicks enter with new value
    rerender(<EditInPlace {...props} value="new value" />);
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSave).toHaveBeenCalled();
  });

  it('applies className to the containing node', async () => {
    const { container } = render(<EditInPlace {...defaultProps} />);
    expect(container.firstChild).toHaveClass(defaultProps.className);
  });

  const dataTestId = 'data-testid';

  it('adds additional properties to the containing node', async () => {
    render(<EditInPlace {...defaultProps} data-testid={dataTestId} />);
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    render(<EditInPlace {...defaultProps} ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it('adds the data-component-name attribute to the containing node', async () => {
    render(<EditInPlace {...defaultProps} data-testid={dataTestId} />);

    expect(screen.getByTestId(dataTestId)).toHaveAttribute(
      'data-component-name',
      componentName
    );
  });
});
