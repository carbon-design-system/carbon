/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { BreadcrumbSkeleton } from '../';
import { render } from '@testing-library/react';

describe('BreadcrumbSkeleton', () => {
  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(<BreadcrumbSkeleton className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread additional props on the outermost element', () => {
    const { container } = render(<BreadcrumbSkeleton data-testid="test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });
});
