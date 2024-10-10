/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from '@testing-library/react';
import FluidTimePickerSkeleton from '../FluidTimePicker.Skeleton';

const prefix = 'cds';

describe('FluidTimePicker', () => {
  describe('renders as expected - Component API', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<FluidTimePickerSkeleton />);

      await expect(container).toHaveNoAxeViolations();
    });

    it('should have no axe violations with isOnlyTwo', async () => {
      const { container } = render(<FluidTimePickerSkeleton isOnlyTwo />);

      await expect(container).toHaveNoAxeViolations();
    });

    it('should accept a custom className prop on the root node', () => {
      const className = 'test';
      const { container } = render(
        <FluidTimePickerSkeleton className={className} />
      );
      expect(container.firstChild).toHaveClass(className);
    });

    it('should accept a custom isOnlyTwo prop on the root node', () => {
      render(<FluidTimePickerSkeleton isOnlyTwo />);

      expect(
        document.querySelector(`.${prefix}--time-picker--equal-width`)
      ).toBeInTheDocument();
    });
  });
});
