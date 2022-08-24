/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import NumberInputSkeleton from '../NumberInput.Skeleton';

describe('NumberInputSkeleton', () => {
  it('should place className on the outermost element', () => {
    const { container } = render(
      <NumberInputSkeleton className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should spread additional props on the outermost element', () => {
    const { container } = render(<NumberInputSkeleton data-testid="test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it('should support hiding the label through `hideLabel`', () => {
    const { container, rerender } = render(
      <NumberInputSkeleton className="custom-class" />
    );
    expect(container.querySelector('.cds--label')).toBeDefined();

    rerender(<NumberInputSkeleton className="custom-class" hideLabel />);
    expect(container.querySelector('.cds--label')).toBeNull();
  });
});
