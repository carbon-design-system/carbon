/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from '@testing-library/react';
import TimePickerSkeleton from '../TimePicker.Skeleton';

const prefix = 'cds';

describe('TimePickerSkeleton', () => {
  describe('renders as expected - Component API', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<TimePickerSkeleton />);

      await expect(container).toHaveNoAxeViolations();
    });

    it('should have no axe violations with isOnlyTwo', async () => {
      const { container } = render(<TimePickerSkeleton isOnlyTwo />);

      await expect(container).toHaveNoAxeViolations();
    });

    it('should accept a custom className prop on the root node', () => {
      const className = 'test';
      const { container } = render(
        <TimePickerSkeleton className={className} />
      );
      expect(container.firstChild).toHaveClass(className);
    });

    it('should accept a custom isOnlyTwo prop on the root node', () => {
      render(<TimePickerSkeleton isOnlyTwo />);

      expect(
        document.querySelector(`.${prefix}--time-picker--equal-width`)
      ).toBeInTheDocument();
    });
  });
});
