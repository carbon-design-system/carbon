/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import SwitcherDivider from '../SwitcherDivider';
import { render } from '@testing-library/react';

describe('SwitcherDivider', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto the separator element', () => {
      const { container } = render(<SwitcherDivider data-testid="test-id" />);

      // SwitcherDivider renders as `li > hr`, so assert against the separator.
      expect(container.firstChild.firstChild).toHaveAttribute(
        'data-testid',
        'test-id'
      );
    });

    it('should support a custom `className` prop on the separator element', () => {
      const { container } = render(
        <SwitcherDivider className="custom-class" />
      );

      // SwitcherDivider renders as `li > hr`, so assert against the separator.
      expect(container.firstChild.firstChild).toHaveClass('custom-class');
    });
  });
});
