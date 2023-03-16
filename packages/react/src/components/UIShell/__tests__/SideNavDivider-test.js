/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import SideNavDivider from '../SideNavDivider';
import { render } from '@testing-library/react';

describe('SideNavDivider', () => {
  describe('renders as expected - Component API', () => {
    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(<SideNavDivider className="custom-class" />);

      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
