/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import CheckboxGroup from '../CheckboxGroup';
import Checkbox from '../Checkbox/Checkbox';
import { render, screen } from '@testing-library/react';
import { Slug } from '../Slug';

const prefix = 'cds';

describe('CheckboxGroup', () => {
  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(
      <CheckboxGroup className="test" legendText="Checkbox heading" />
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should render helperText', () => {
    render(
      <CheckboxGroup
        className="test"
        legendText="Checkbox heading"
        helperText="Helper text"
      />
    );

    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('should set data-invalid when invalid prop is true', () => {
    const { container } = render(
      <CheckboxGroup
        className="some-class"
        legendText="Checkbox heading"
        invalid>
        <Checkbox
          defaultChecked
          labelText="Checkbox label"
          id="checkbox-label-1"
        />
        <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
      </CheckboxGroup>
    );

    expect(container.firstChild).toHaveAttribute('data-invalid', 'true');
  });

  it('should display invalidText if invalid prop is true', () => {
    render(
      <CheckboxGroup
        className="some-class"
        legendText="Checkbox heading"
        invalid
        invalidText="Invalid text">
        <Checkbox
          defaultChecked
          labelText="Checkbox label"
          id="checkbox-label-1"
        />
        <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
      </CheckboxGroup>
    );

    expect(screen.getByText('Invalid text')).toBeInTheDocument();
  });

  it('should render legendText', () => {
    render(<CheckboxGroup className="test" legendText="Checkbox heading" />);

    expect(screen.getByText('Checkbox heading')).toBeInTheDocument();
  });

  it('should set the id for legend based on legendId', () => {
    render(<CheckboxGroup legendId="legend-testid" legendText="legendtest" />);

    expect(screen.getByText('legendtest')).toHaveAttribute(
      'id',
      'legend-testid'
    );
  });

  it('should respect readOnly prop', () => {
    const { container } = render(
      <CheckboxGroup
        className="some-class"
        legendText="Checkbox heading"
        readOnly>
        <Checkbox
          defaultChecked
          labelText="Checkbox label"
          id="checkbox-label-1"
        />
        <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
      </CheckboxGroup>
    );

    expect(container.firstChild).toHaveClass(
      `${prefix}--checkbox-group--readonly`
    );
  });

  it('should respect warn prop', () => {
    const { container } = render(
      <CheckboxGroup className="some-class" legendText="Checkbox heading" warn>
        <Checkbox
          defaultChecked
          labelText="Checkbox label"
          id="checkbox-label-1"
        />
        <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
      </CheckboxGroup>
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const warnIcon = container.querySelector(
      `svg.${prefix}--checkbox__invalid-icon--warning`
    );

    expect(container.firstChild).toHaveClass(
      `${prefix}--checkbox-group--warning`
    );
    expect(warnIcon).toBeInTheDocument();
  });

  it('should display warnText if warn prop is true', () => {
    render(
      <CheckboxGroup
        className="some-class"
        legendText="Checkbox heading"
        warn
        warnText="Warn text">
        <Checkbox
          defaultChecked
          labelText="Checkbox label"
          id="checkbox-label-1"
        />
        <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
      </CheckboxGroup>
    );

    expect(screen.getByText('Warn text')).toBeInTheDocument();
    expect(screen.getByText('Warn text')).toHaveClass(
      `${prefix}--form-requirement`
    );
  });

  it('should respect slug prop', () => {
    const { container } = render(
      <CheckboxGroup
        className="some-class"
        legendText="Checkbox heading"
        slug={<Slug />}
      />
    );

    expect(container.firstChild).toHaveClass(`${prefix}--checkbox-group--slug`);
  });
});
