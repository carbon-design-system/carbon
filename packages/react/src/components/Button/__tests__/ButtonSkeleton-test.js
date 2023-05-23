/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import ButtonSkeleton from '../Button.Skeleton';

describe('ButtonSkeleton', () => {
  it.each([
    ['sm', 'cds--btn--sm'],
    ['md', 'cds--btn--md'],
    ['lg', 'cds--btn--lg'],
    ['xl', 'cds--btn--xl'],
    ['2xl', 'cds--btn--2xl'],
  ])(
    'should set the expected classes for the size: `%s`',
    (size, className) => {
      render(<ButtonSkeleton data-testid="test" size={size} />);
      expect(screen.getByTestId('test')).toHaveClass(className);
    }
  );

  describe('link variant', () => {
    it('should render an <a> when `href` is passed as a prop', () => {
      render(<ButtonSkeleton href="/" />);
      expect(screen.getByRole('button').tagName).toBe('A');
    });

    it('should render with [role="button"]', () => {
      render(<ButtonSkeleton href="/" />);
      expect(screen.getByRole('button').tagName).toBe('A');
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('deprecated', () => {
    it('should set the small class name when the small prop is set', () => {
      render(<ButtonSkeleton data-testid="test" small />);
      expect(screen.getByTestId('test')).toHaveClass('cds--btn--sm');
    });
  });
});
