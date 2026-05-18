/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { DatePickerSkeleton } from './DatePicker.Skeleton';

describe('DatePickerSkeleton', () => {
  it('should support a custom `className` on the date picker element', () => {
    render(<DatePickerSkeleton className="classy" data-testid="skeleton" />);

    expect(screen.getByTestId('skeleton')).toHaveClass(
      'cds--date-picker',
      'cds--date-picker--short',
      'cds--date-picker--simple',
      'cds--skeleton',
      'classy',
      { exact: true }
    );
  });

  it('should spread additional props onto the date picker element', () => {
    render(
      <DatePickerSkeleton
        data-testid="skeleton"
        aria-label="Date picker skeleton"
      />
    );

    expect(screen.getByTestId('skeleton')).toHaveAttribute(
      'aria-label',
      'Date picker skeleton'
    );
  });

  it('should render the single variant by default', () => {
    const { container } = render(<DatePickerSkeleton id="single-label" />);

    expect(
      container.querySelector('.cds--date-picker--short')
    ).toBeInTheDocument();
    expect(
      container.querySelector('.cds--date-picker--simple')
    ).toBeInTheDocument();
    expect(
      container.querySelectorAll('.cds--date-picker-container')
    ).toHaveLength(1);
    expect(container.querySelector('#single-label')).toHaveClass('cds--label', {
      exact: true,
    });
  });

  it('should render the range variant when `range` is true', () => {
    const { container } = render(<DatePickerSkeleton range />);

    expect(
      container.querySelector('.cds--date-picker--range')
    ).toBeInTheDocument();
    expect(
      container.querySelectorAll('.cds--date-picker-container')
    ).toHaveLength(2);
  });

  it('should hide labels when `hideLabel` is true', () => {
    const { container } = render(<DatePickerSkeleton hideLabel />);

    expect(container.querySelector('.cds--label')).not.toBeInTheDocument();
  });
});
