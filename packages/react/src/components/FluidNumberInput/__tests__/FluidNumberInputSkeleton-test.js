/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';

import FluidNumberInputSkeleton from '../FluidNumberInput.Skeleton';
import React from 'react';

describe('FluidNumberInputSkeleton', () => {
  it('should render with the appropriate skeleton classes', () => {
    const { container } = render(<FluidNumberInputSkeleton />);

    const skeletonWrapper = container.firstChild;
    expect(skeletonWrapper).toHaveClass(
      'cds--form-item',
      'cds--text-input--fluid__skeleton'
    );

    const labelSkeleton = container.querySelector('.cds--label.cds--skeleton');
    expect(labelSkeleton).toBeInTheDocument();

    const inputSkeleton = container.querySelector(
      '.cds--skeleton.cds--text-input'
    );
    expect(inputSkeleton).toBeInTheDocument();
  });

  it('should apply custom className to the outermost element', () => {
    const { container } = render(
      <FluidNumberInputSkeleton className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should spread extra props onto the outermost element', () => {
    render(<FluidNumberInputSkeleton data-testid="test-skeleton" />);
    expect(screen.getByTestId('test-skeleton')).toBeInTheDocument();
  });
});
