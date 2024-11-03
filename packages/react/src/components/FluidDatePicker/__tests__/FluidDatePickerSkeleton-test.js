import { render, screen } from '@testing-library/react';

import FluidDatePickerSkeleton from '../FluidDatePicker.Skeleton';
/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

describe('FluidDatePickerSkeleton', () => {
  it('renders the single variant by default', () => {
    render(<FluidDatePickerSkeleton />);
    const skeletonIcon = screen.getByRole('img', { hidden: true });
    expect(skeletonIcon).toBeInTheDocument();
    expect(skeletonIcon).toHaveClass('cds--date-picker__icon');
  });

  it('renders the range variant when specified', () => {
    render(<FluidDatePickerSkeleton datePickerType="range" />);
    const skeletonIcons = screen.getAllByRole('img', { hidden: true });
    expect(skeletonIcons.length).toBe(2);
  });

  it('does not render the calendar icon for simple variant', () => {
    render(<FluidDatePickerSkeleton datePickerType="simple" />);
    const skeletonIcon = screen.queryByRole('img');
    expect(skeletonIcon).toBeNull();
  });
});
