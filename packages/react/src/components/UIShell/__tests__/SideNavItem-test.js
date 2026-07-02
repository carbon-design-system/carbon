/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import SideNavItem from '../SideNavItem';

describe('SideNavItem', () => {
  it('should set the large class when `large` is true', () => {
    const { container } = render(<SideNavItem large>test</SideNavItem>);
    expect(container.firstChild).toHaveClass('cds--side-nav__item--large');
  });

  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(
      <SideNavItem className="test">test</SideNavItem>
    );
    expect(container.firstChild).toHaveClass('test');
  });
});
