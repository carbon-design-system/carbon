/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import SideNavMenuItem from '../SideNavMenuItem';

describe('SideNavMenuItem', () => {
  it('should set the current class and aria-current when `isActive` is true', () => {
    render(
      <SideNavMenuItem data-testid="test" isActive>
        test
      </SideNavMenuItem>
    );
    expect(screen.getByTestId('test')).toHaveClass(
      'cds--side-nav__link--current'
    );
    expect(screen.getByTestId('test')).toHaveAttribute('aria-current', 'page');
  });

  it('should not set aria-current when `isActive` is not true', () => {
    render(<SideNavMenuItem data-testid="test">test</SideNavMenuItem>);
    expect(screen.getByTestId('test')).not.toHaveAttribute('aria-current');
  });

  it('should keep a consumer-provided `aria-current` when `isActive` is true', () => {
    render(
      <SideNavMenuItem data-testid="test" isActive aria-current="true">
        test
      </SideNavMenuItem>
    );
    expect(screen.getByTestId('test')).toHaveAttribute('aria-current', 'true');
  });

  it('should set aria-current on a button rendered through `as` when `isActive` is true', () => {
    render(
      <SideNavMenuItem as="button" type="button" isActive>
        test
      </SideNavMenuItem>
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-current', 'page');
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

  it('should support rendering a button through the `as` prop', () => {
    const onClick = jest.fn();

    render(
      <SideNavMenuItem as="button" type="button" onClick={onClick}>
        test
      </SideNavMenuItem>
    );

    screen.getByRole('button').click();

    expect(screen.getByRole('button')).toHaveClass('cds--side-nav__link', {
      exact: true,
    });
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
