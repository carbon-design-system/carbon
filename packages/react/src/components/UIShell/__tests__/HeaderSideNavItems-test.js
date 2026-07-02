/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import HeaderSideNavItems from '../HeaderSideNavItems';
import { render, screen } from '@testing-library/react';
import HeaderMenuItem from '../HeaderMenuItem';

describe('HeaderSideNavItems', () => {
  describe('renders as expected - Component API', () => {
    it('should render children as expected', () => {
      render(
        <HeaderSideNavItems>
          <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
          <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
        </HeaderSideNavItems>
      );

      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <HeaderSideNavItems className="custom-class" />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should respect hasDivider prop', () => {
      const { container } = render(<HeaderSideNavItems hasDivider />);

      expect(container.firstChild).toHaveClass('cds--side-nav__header-divider');
    });
  });
});
