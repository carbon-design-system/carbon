/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { PaginationSkeleton } from '../Pagination.Skeleton';
import { render } from '@testing-library/react';

describe('PaginationSkeleton', () => {
  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(
      <PaginationSkeleton aria-label="test" className="test" />
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread additional props on the outermost element', () => {
    const { container } = render(
      <PaginationSkeleton aria-label="test" data-testid="test" />
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });
});
