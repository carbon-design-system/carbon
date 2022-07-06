/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import RadioButton from '../RadioButton';

describe('RadioButton', () => {
  it('should render an <input> with type="radio"', () => {
    render(<RadioButton labelText="test-label" value="test-value" />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('should automatically generate an id for the <input> and <label> if none is provided', () => {
    render(<RadioButton labelText="test-label" value="test-value" />);
    expect(screen.getByRole('radio')).toEqual(
      screen.getByLabelText('test-label')
    );
  });

  it('should set the `id` on the element with role="radio"', () => {
    render(
      <RadioButton labelText="test-label" value="test-value" id="test-id" />
    );
    expect(screen.getByRole('radio')).toHaveAttribute('id', 'test-id');
  });

  it('should set defaultChecked as expected', () => {
    render(
      <RadioButton labelText="test-label" value="test-value" defaultChecked />
    );

    expect(screen.getByLabelText('test-label')).toBeChecked();
  });

  it('should use checked to control the value of the <input>', () => {
    const { rerender } = render(
      <RadioButton labelText="test-label" value="test-value" checked={false} />
    );
    expect(screen.getByLabelText('test-label')).not.toBeChecked();

    rerender(
      <RadioButton labelText="test-label" value="test-value" checked={true} />
    );
    expect(screen.getByLabelText('test-label')).toBeChecked();
  });

  it('should set the name of the <input> through the `name` prop', () => {
    render(
      <RadioButton labelText="test-label" name="test-name" value="test-value" />
    );
    expect(screen.getByLabelText('test-label')).toHaveAttribute(
      'name',
      'test-name'
    );
  });

  it('should call onChange when the <input> is changed', () => {
    const onChange = jest.fn();

    render(
      <RadioButton
        labelText="test-label"
        value="test-value"
        name="test-name"
        onChange={onChange}
      />
    );

    userEvent.click(screen.getByLabelText('test-label'));

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(
      'test-value',
      'test-name',
      expect.objectContaining({
        target: screen.getByLabelText('test-label'),
      })
    );
  });

  it('should place className on the outermost element', () => {
    const { container } = render(
      <RadioButton
        className="custom-class"
        labelText="test-label"
        value="test-value"
      />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should place the ref on the <input> element', () => {
    const ref = jest.fn();
    render(<RadioButton labelText="test-label" ref={ref} value="test-value" />);
    expect(ref).toHaveBeenCalledWith(screen.getByLabelText('test-label'));
  });
});
