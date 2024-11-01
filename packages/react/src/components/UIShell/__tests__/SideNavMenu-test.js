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
import { SideNavContext } from '../SideNav';

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
      <SideNavMenu title="test-title" tabIndex={1}>
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

  it('sets isExpanded and prevExpanded when sideNav is not expanded and isRail is true', () => {
    render(
      <SideNavContext.Provider value={{ isRail: true }}>
        <SideNavMenu
          isSideNavExpanded={false}
          defaultExpanded={true}
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
          title="test-title">
          <SideNavMenuItem>a</SideNavMenuItem>
          <SideNavMenuItem>b</SideNavMenuItem>
          <SideNavMenuItem>c</SideNavMenuItem>
        </SideNavMenu>
      </SideNavContext.Provider>
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes sideNav on escape key press', async () => {
    render(
      <SideNavContext.Provider value={{ isRail: true }}>
        <SideNavMenu
          isSideNavExpanded={true}
          defaultExpanded={true}
          title="test-title">
          <SideNavMenuItem>a</SideNavMenuItem>
          <SideNavMenuItem>b</SideNavMenuItem>
          <SideNavMenuItem>c</SideNavMenuItem>
        </SideNavMenu>
      </SideNavContext.Provider>
    );

    await userEvent.click(screen.getByRole('button'));
    await userEvent.keyboard('{Escape}');

    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });
});

describe('properly detects active descendants and applies active styling', () => {
  it('when a child in children array has isActive', () => {
    const { container } = render(
      <SideNavMenu title="test-title">
        <SideNavMenuItem isActive={true} key={'child1'}>
          a
        </SideNavMenuItem>
        <SideNavMenuItem key={'child2'}>b</SideNavMenuItem>
        <SideNavMenuItem key={'child3'}>c</SideNavMenuItem>
      </SideNavMenu>
    );
    expect(container.firstChild).toHaveClass(`cds--side-nav__item--active`);
  });

  it('when a child in children array has aria-current', () => {
    const { container } = render(
      <SideNavMenu title="test-title">
        <SideNavMenuItem aria-current="true" key={'child1'}>
          a
        </SideNavMenuItem>
        <SideNavMenuItem key={'child2'}>b</SideNavMenuItem>
        <SideNavMenuItem key={'child3'}>c</SideNavMenuItem>
      </SideNavMenu>
    );
    expect(container.firstChild).toHaveClass(`cds--side-nav__item--active`);
  });

  it('when a child in nested children array has isActive', () => {
    const { container } = render(
      <SideNavMenu title="test-title">
        <SideNavMenuItem isActive={true} key={'child1'}>
          {[<div key={'subChild1'}>a1</div>, <div key={'subChild2'}>a2</div>]}
        </SideNavMenuItem>
        <SideNavMenuItem key={'child2'}>b</SideNavMenuItem>
        <SideNavMenuItem key={'child3'}>c</SideNavMenuItem>
      </SideNavMenu>
    );
    expect(container.firstChild).toHaveClass(`cds--side-nav__item--active`);
  });

  it('when a child in nested children array has aria-current', () => {
    const { container } = render(
      <SideNavMenu title="test-title">
        <SideNavMenuItem aria-current="true" key={'child1'}>
          {[<div key={'subChild1'}>a1</div>, <div key={'subChild2'}>a2</div>]}
        </SideNavMenuItem>
        <SideNavMenuItem key={'child2'}>b</SideNavMenuItem>
        <SideNavMenuItem key={'child3'}>c</SideNavMenuItem>
      </SideNavMenu>
    );
    expect(container.firstChild).toHaveClass(`cds--side-nav__item--active`);
  });

  it('when a single child has isActive', () => {
    const { container } = render(
      <SideNavMenu title="test-title">
        <SideNavMenuItem isActive={true} key={'child1'}>
          a
        </SideNavMenuItem>
      </SideNavMenu>
    );
    expect(container.firstChild).toHaveClass(`cds--side-nav__item--active`);
  });

  it('when a single child has aria-current', () => {
    const { container } = render(
      <SideNavMenu title="test-title">
        <SideNavMenuItem aria-current="true" key={'child1'}>
          a
        </SideNavMenuItem>
      </SideNavMenu>
    );
    expect(container.firstChild).toHaveClass(`cds--side-nav__item--active`);
  });
});

describe('properly detects non-active descendants and does not apply active styling', () => {
  it('when a child in children array is not a valid element', () => {
    const { container } = render(
      <SideNavMenu title="test-title">
        {[null, <SideNavMenuItem key={'validChild'}>a</SideNavMenuItem>]}
      </SideNavMenu>
    );
    expect(container.firstChild).not.toHaveClass(`cds--side-nav__item--active`);
  });

  it('when all children have no props given', () => {
    const { container } = render(
      <SideNavMenu title="test-title">
        <SideNavMenuItem>a</SideNavMenuItem>
        <SideNavMenuItem>b</SideNavMenuItem>
      </SideNavMenu>
    );
    expect(container.firstChild).not.toHaveClass(`cds--side-nav__item--active`);
  });

  it('when a single child has no props', () => {
    const { container } = render(
      <SideNavMenu title="test-title">
        <SideNavMenuItem>a</SideNavMenuItem>
      </SideNavMenu>
    );
    expect(container.firstChild).not.toHaveClass(`cds--side-nav__item--active`);
  });
});
