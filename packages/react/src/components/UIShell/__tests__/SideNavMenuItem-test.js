/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import SideNavMenuItem from '../SideNavMenuItem';

describe('SideNavMenuItem', () => {
  it('should set the current class when `isActive` is true', () => {
    render(
      <SideNavMenuItem data-testid="test" isActive>
        test
      </SideNavMenuItem>
    );
    expect(screen.getByTestId('test')).toHaveClass(
      'cds--side-nav__link--current'
    );
  });

  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(
      <SideNavMenuItem className="test">test</SideNavMenuItem>
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread extra props on the <a> element', () => {
    render(
      <SideNavMenuItem data-testid="test" href="/">
        test
      </SideNavMenuItem>
    );
    expect(screen.getByRole('link')).toHaveAttribute('data-testid', 'test');
  });

  it('should support a `ref` on the <a> element', () => {
    const ref = jest.fn();
    render(
      <SideNavMenuItem ref={ref} href="/">
        test
      </SideNavMenuItem>
    );
    expect(ref).toHaveBeenCalledWith(screen.getByRole('link'));
  });
});
