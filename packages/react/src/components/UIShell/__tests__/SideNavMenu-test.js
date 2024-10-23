/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen, fireEvent, getByTitle } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { SideNavMenu, SideNavMenuItem } from '../';
import { hasActiveDescendant } from '../SideNavMenu';
import { SideNavContext } from '../SideNav';

describe('SideNavMenu', () => {
  let mockRef;

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

  it('should return true if the child is a valid React element, and instance of Array and has isActive and aria-current props', () => {
    const child = [
      <SideNavMenuItem isActive={true} aria-current="page">
        <SideNavMenuItem isActive={false} aria-current="page">
          a
        </SideNavMenuItem>
      </SideNavMenuItem>,
      <SideNavMenuItem isActive={true} aria-current="page">
        b
      </SideNavMenuItem>,
    ];
    expect(hasActiveDescendant(child)).toBe(true);
  });

  it('should return true if the child is a invalid React element and has isActive props set to true', () => {
    const child = <div isActive={true} />;
    expect(hasActiveDescendant(child)).toBe(true);
  });

  it('should return true if the child is a invalid React element and has aria-current props', () => {
    const child = <div aria-current="page"></div>;
    expect(hasActiveDescendant(child)).toBe(true);
  });

  it('should return false if the child is a valid react element but does not have isActive and aria-current props', () => {
    const child = <div />;
    render(
      <SideNavMenu title="test-title">
        <SideNavMenuItem>a</SideNavMenuItem>
        <SideNavMenuItem>b</SideNavMenuItem>
        <SideNavMenuItem>c</SideNavMenuItem>
      </SideNavMenu>
    );
    expect(hasActiveDescendant(child)).toBe(false);
  });

  it('should return false if child is an invalid React element', () => {
    const child = ['abc', 'xyz'];
    render(
      <SideNavMenu title="test-title">
        <SideNavMenuItem>a</SideNavMenuItem>
        <SideNavMenuItem>b</SideNavMenuItem>
        <SideNavMenuItem>c</SideNavMenuItem>
      </SideNavMenu>
    );
    expect(hasActiveDescendant(child)).toBe(false);
  });

  it('sets isExpanded and prevExpanded when sideNav is not expanded and isRail is true', () => {
    mockRef = { current: null };
    render(
      <SideNavContext.Provider value={{ isRail: true }}>
        <SideNavMenu
          isSideNavExpanded={false}
          defaultExpanded={true}
          ref={mockRef}
          title="test-title">
          <SideNavMenuItem>a</SideNavMenuItem>
          <SideNavMenuItem>b</SideNavMenuItem>
          <SideNavMenuItem>c</SideNavMenuItem>
        </SideNavMenu>
      </SideNavContext.Provider>
    );
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  it('sets isExpanded and prevExpanded when sideNav is expanded, prevExpanded is true and isRail is true', () => {
    render(
      <SideNavContext.Provider value={{ isRail: true }}>
        <SideNavMenu
          isSideNavExpanded={true}
          defaultExpanded={true}
          ref={mockRef} //uses the value of mockRef from previous test
          title="test-title">
          <SideNavMenuItem>a</SideNavMenuItem>
          <SideNavMenuItem>b</SideNavMenuItem>
          <SideNavMenuItem>c</SideNavMenuItem>
        </SideNavMenu>
      </SideNavContext.Provider>
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes sideNav on escape key press', () => {
    mockRef = { current: null };
    render(
      <SideNavContext.Provider value={{ isRail: true }}>
        <SideNavMenu
          sSideNavExpanded={true}
          defaultExpanded={true}
          ref={mockRef}
          title="test-title">
          <SideNavMenuItem>a</SideNavMenuItem>
          <SideNavMenuItem>b</SideNavMenuItem>
          <SideNavMenuItem>c</SideNavMenuItem>
        </SideNavMenu>
      </SideNavContext.Provider>
    );

    fireEvent.keyDown(screen.getByText(/a/i), {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });
});
