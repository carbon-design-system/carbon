/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { SideNavMenu, SideNavMenuItem } from '../';

describe('SideNavMenu', () => {
  it('should be expanded by default if `defaultExpanded` is true', () => {
    render(
      <SideNavMenu defaultExpanded title="test-title">
        <SideNavMenuItem>a</SideNavMenuItem>
        <SideNavMenuItem>b</SideNavMenuItem>
        <SideNavMenuItem>c</SideNavMenuItem>
      </SideNavMenu>
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('should set the active class if `isActive` is true and the component has an active child', () => {
    const { container } = render(
      <SideNavMenu isActive title="test-title">
        <SideNavMenuItem isActive>a</SideNavMenuItem>
        <SideNavMenuItem>b</SideNavMenuItem>
        <SideNavMenuItem>c</SideNavMenuItem>
      </SideNavMenu>
    );
    expect(container.firstChild).toHaveClass('cds--side-nav__item--active');
  });

  it('should set the large class if `large` is true', () => {
    const { container } = render(
      <SideNavMenu large title="test-title">
        <SideNavMenuItem>a</SideNavMenuItem>
        <SideNavMenuItem>b</SideNavMenuItem>
        <SideNavMenuItem>c</SideNavMenuItem>
      </SideNavMenu>
    );
    expect(container.firstChild).toHaveClass('cds--side-nav__item--large');
  });

  it('should support rendering an icon through `renderIcon`', () => {
    const CustomIcon = jest.fn(() => {
      return <svg data-testid="test-icon" />;
    });
    render(
      <SideNavMenu title="test-title" renderIcon={CustomIcon}>
        <SideNavMenuItem>a</SideNavMenuItem>
        <SideNavMenuItem>b</SideNavMenuItem>
        <SideNavMenuItem>c</SideNavMenuItem>
      </SideNavMenu>
    );
    expect(CustomIcon).toHaveBeenCalled();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('should toggle the menu on click', async () => {
    render(
      <SideNavMenu title="test-title">
        <SideNavMenuItem>a</SideNavMenuItem>
        <SideNavMenuItem>b</SideNavMenuItem>
        <SideNavMenuItem>c</SideNavMenuItem>
      </SideNavMenu>
    );
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );

    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(
      <SideNavMenu className="test" title="test-title">
        <SideNavMenuItem>a</SideNavMenuItem>
        <SideNavMenuItem>b</SideNavMenuItem>
        <SideNavMenuItem>c</SideNavMenuItem>
      </SideNavMenu>
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should support a `ref` on the <button> element', () => {
    const ref = jest.fn();
    render(
      <SideNavMenu ref={ref} title="test-title">
        <SideNavMenuItem>a</SideNavMenuItem>
        <SideNavMenuItem>b</SideNavMenuItem>
        <SideNavMenuItem>c</SideNavMenuItem>
      </SideNavMenu>
    );
    expect(ref).toHaveBeenCalledWith(screen.getByRole('button'));
  });
});
