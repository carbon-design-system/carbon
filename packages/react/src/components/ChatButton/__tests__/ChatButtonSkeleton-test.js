/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import ChatButtonSkeleton from '../ChatButton.Skeleton';

describe('ButtonSkeleton', () => {
  it.each([
    ['sm', 'cds--layout--size-sm'],
    ['md', 'cds--layout--size-md'],
    ['lg', 'cds--layout--size-lg'],
  ])(
    'should set the expected classes for the size: `%s`',
    (size, className) => {
      render(<ChatButtonSkeleton data-testid="test" size={size} />);
      expect(screen.getByTestId('test')).toHaveClass(className);
    }
  );

  it('should support a custom className on the outermost element', () => {
    const { container } = render(<ChatButtonSkeleton className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread props onto the outermost element', () => {
    const { container } = render(<ChatButtonSkeleton data-testid="test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });
});
