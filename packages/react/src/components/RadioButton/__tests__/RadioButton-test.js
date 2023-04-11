/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import RadioButton from '../RadioButton';

describe('RadioButton', () => {
  it('should render an input with type="radio"', () => {
    render(
      <RadioButton name="test-name" value="test-value" labelText="test-label" />
    );
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('should set an id on the <input> by default', () => {
    render(
      <RadioButton name="test-name" value="test-value" labelText="test-label" />
    );
    expect(screen.getByRole('radio')).toHaveAttribute('id');
  });

  it('should set checked on the <input> when checked is provided', () => {
    render(
      <RadioButton
        name="test-name"
        value="test-value"
        labelText="test-label"
        checked
      />
    );
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('should label the <input> with labelText', () => {
    render(
      <RadioButton name="test-name" value="test-value" labelText="test-label" />
    );
    expect(screen.getByRole('radio')).toEqual(
      screen.getByLabelText('test-label')
    );
  });

  it('should set defaultChecked as expected', () => {
    render(
      <RadioButton
        name="test-name"
        value="test-value"
        labelText="test-label"
        defaultChecked
      />
    );

    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('should set id on the <input> if one is passed in', () => {
    render(
      <RadioButton
        name="test-name"
        value="test-value"
        labelText="test-label"
        id="test-id"
      />
    );

    expect(screen.getByRole('radio')).toHaveAttribute('id', 'test-id');
  });

  it('should invoke onChange with expected arguments', async () => {
    const onChange = jest.fn();

    render(
      <RadioButton
        name="test-name"
        value="test-value"
        labelText="test-label"
        onChange={onChange}
      />
    );

    await userEvent.click(screen.getByRole('radio'));

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(
      'test-value',
      'test-name',
      expect.objectContaining({
        target: screen.getByRole('radio'),
      })
    );
  });

  it('should place className on the outermost element', () => {
    const { container } = render(
      <RadioButton
        name="test-name"
        value="test-value"
        labelText="test-label"
        className="custom-class"
      />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should spread additional props on the <input> element', () => {
    render(
      <RadioButton
        name="test-name"
        value="test-value"
        labelText="test-label"
        data-testid="test"
      />
    );
    expect(screen.getByRole('radio')).toHaveAttribute('data-testid', 'test');
  });

  it('should support a `ref` on the <input> element', () => {
    const ref = jest.fn();
    render(
      <RadioButton
        name="test-name"
        value="test-value"
        labelText="test-label"
        ref={ref}
      />
    );
    expect(ref).toHaveBeenCalledWith(screen.getByRole('radio'));
  });
});
