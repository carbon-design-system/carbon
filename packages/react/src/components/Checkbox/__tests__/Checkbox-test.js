/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Checkbox from '../Checkbox';
import { Slug } from '../../Slug';

const prefix = 'cds';

describe('Checkbox', () => {
  it('should set the `id` on the <input> element', () => {
    render(<Checkbox id="test" labelText="test-label" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'test');
  });

  it('should label the input by the given labelText', () => {
    render(<Checkbox id="test" labelText="test-label" />);
    expect(screen.getByLabelText('test-label')).toBeInTheDocument();
  });

  it('should use defaultChecked to set the default value of the <input> checkbox', () => {
    render(<Checkbox id="test" labelText="test-label" defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(
      <Checkbox id="test" labelText="test-label" className="test" />
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should support a `ref` that is placed on the <input> element', () => {
    const ref = jest.fn();
    render(<Checkbox id="test" labelText="test-label" ref={ref} />);
    expect(ref).toHaveBeenCalledWith(screen.getByRole('checkbox'));
  });

  it('should disable the <input> if disabled is provided as a prop', () => {
    const { rerender } = render(<Checkbox id="test" labelText="test-label" />);
    expect(screen.getByRole('checkbox')).toBeEnabled();

    rerender(<Checkbox id="test" labelText="test-label" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('should set checked on the <input> if checked is provided as a prop', () => {
    render(<Checkbox id="test1" labelText="test-label-1" />);
    expect(screen.getByLabelText('test-label-1')).not.toBeChecked();

    render(<Checkbox id="test2" labelText="test-label-2" checked />);
    expect(screen.getByLabelText('test-label-2')).toBeChecked();
  });

  it('should hide the label if hideLabel is provided as a prop', () => {
    render(<Checkbox id="test" labelText="test-label" hideLabel />);
    expect(screen.getByText('test-label')).toHaveClass(
      `${prefix}--visually-hidden`
    );
  });

  it('should render helperText', () => {
    render(
      <Checkbox
        defaultChecked
        labelText="Checkbox label"
        id="checkbox-label-1"
        helperText="Helper text"
      />
    );

    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('should set data-invalid when invalid prop is true', () => {
    render(
      <Checkbox
        defaultChecked
        labelText="Checkbox label"
        id="checkbox-label-1"
        invalid
      />
    );

    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'data-invalid',
      'true'
    );
  });

  it('should display invalidText if invalid prop is true', () => {
    render(
      <Checkbox
        defaultChecked
        labelText="Checkbox label"
        id="checkbox-label-1"
        invalid
        invalidText="Invalid text"
      />
    );

    expect(screen.getByText('Invalid text')).toBeInTheDocument();
  });

  it('should respect readOnly prop', () => {
    const { container } = render(
      <Checkbox
        defaultChecked
        labelText="Checkbox label"
        id="checkbox-label-1"
        readOnly
      />
    );

    expect(container.firstChild).toHaveClass(
      `${prefix}--checkbox-wrapper--readonly`
    );
  });

  it('should respect warn prop', () => {
    const { container } = render(
      <Checkbox
        defaultChecked
        labelText="Checkbox label"
        id="checkbox-label-1"
        warn
      />
    );

    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    const warnIcon = container.querySelector(
      `svg.${prefix}--checkbox__invalid-icon--warning`
    );

    expect(container.firstChild).toHaveClass(
      `${prefix}--checkbox-wrapper--warning`
    );
    expect(warnIcon).toBeInTheDocument();
  });

  it('should display warnText if warn prop is true', () => {
    render(
      <Checkbox
        defaultChecked
        labelText="Checkbox label"
        id="checkbox-label-1"
        warn
        warnText="Warn text"
      />
    );

    expect(screen.getByText('Warn text')).toBeInTheDocument();
    expect(screen.getByText('Warn text')).toHaveClass(
      `${prefix}--form-requirement`
    );
  });

  it('should call the `onChange` prop when the <input> value changes', async () => {
    const onChange = jest.fn();
    render(<Checkbox id="test" labelText="test-label" onChange={onChange} />);

    await userEvent.click(screen.getByLabelText('test-label'));

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'change',
      }),
      {
        checked: true,
        id: 'test',
      }
    );
  });

  it('should NOT call the `onChange` prop when readonly', async () => {
    const onChange = jest.fn();
    const onClick = jest.fn();
    render(
      <Checkbox
        id="test"
        labelText="test-label"
        onChange={onChange}
        onClick={onClick}
        checked={false}
        readOnly={true}
      />
    );

    await userEvent.click(screen.getByLabelText('test-label'));
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onClick).toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should respect slug prop', () => {
    const { container } = render(
      <Checkbox
        defaultChecked
        labelText="Checkbox label"
        id="checkbox-label-1"
        slug={<Slug />}
      />
    );

    expect(container.firstChild).toHaveClass(
      `${prefix}--checkbox-wrapper--slug`
    );
  });
});
