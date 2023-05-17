/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import SideNavLink from '../SideNavLink';

describe('SideNavLink', () => {
  it('should set the current class when `isActive` is true', () => {
    render(
      <SideNavLink href="/" isActive>
        test
      </SideNavLink>
    );
    expect(screen.getByRole('link')).toHaveClass(
      'cds--side-nav__link--current'
    );
  });

  it('should support a custom icon through `renderIcon`', () => {
    const CustomIcon = jest.fn(() => {
      return <svg data-testid="custom-icon" />;
    });
    render(
      <SideNavLink href="/" renderIcon={CustomIcon}>
        test
      </SideNavLink>
    );
    expect(CustomIcon).toHaveBeenCalled();
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('should support a custom `className` prop on the element with role="link"', () => {
    render(
      <SideNavLink href="/" className="test">
        test
      </SideNavLink>
    );
    expect(screen.getByRole('link')).toHaveClass('test');
  });

  it('should spread extra props on the element with role="link"', () => {
    render(
      <SideNavLink href="/" data-testid="test">
        test
      </SideNavLink>
    );
    expect(screen.getByRole('link')).toHaveAttribute('data-testid', 'test');
  });

  it('should set a `ref` on the element with role="link"', () => {
    const ref = jest.fn();
    render(
      <SideNavLink href="/" ref={ref}>
        test
      </SideNavLink>
    );
    expect(ref).toHaveBeenCalledWith(screen.getByRole('link'));
  });
});
