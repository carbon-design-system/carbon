/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { SideNavItems, SideNavItem } from '../';

describe('SideNavItems', () => {
  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(
      <SideNavItems className="test">
        <SideNavItem>test</SideNavItem>
      </SideNavItems>
    );
    expect(container.firstChild).toHaveClass('test');
  });
});
