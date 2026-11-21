/**
 * Copyright IBM Corp. 2016, 2026
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
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.cds--label')).toBeDefined();

    rerender(<NumberInputSkeleton className="custom-class" hideLabel />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.cds--label')).toBeNull();
  });

  describe('size', () => {
    it('should apply size class', () => {
      const { container } = render(<NumberInputSkeleton size="xs" />);
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const number = container.querySelector('.cds--number');

      expect(number).toHaveClass('cds--number--xs'); // TODO: V12 - Remove this check
      expect(number).toHaveClass('cds--layout--size-xs');
    });

    it('should not apply a size class when `size` is not provided', () => {
      const { container } = render(<NumberInputSkeleton />);
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const number = container.querySelector('.cds--number');

      expect(
        Array.from(number.classList).some(
          (name) =>
            name.startsWith('cds--number--') || // TODO: V12 - Remove this check
            name.startsWith('cds--layout--size-')
        )
      ).toBe(false);
    });
  });
});
