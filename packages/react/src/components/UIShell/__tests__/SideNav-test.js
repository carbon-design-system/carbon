/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import SideNav from '../SideNav';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('SideNav', () => {
  it('should label the <nav> through `aria-label`', () => {
    render(<SideNav aria-label="test" />);
    expect(screen.getByRole('navigation')).toEqual(
      screen.getByLabelText('test')
    );
  });

  it('should render an overlay if `isFixedNav` is false', () => {
    const { container } = render(<SideNav aria-label="test" />);
    expect(container.childNodes.length).toBe(2);
  });

  it('should not render an overlay if `isFixedNav` is true', () => {
    const { container } = render(<SideNav aria-label="test" isFixedNav />);
    expect(container.childNodes.length).toBe(1);
  });

  it('should toggle the overlay-active class when `expanded` is true', () => {
    const { container } = render(<SideNav aria-label="test" expanded />);
    expect(container.firstChild).toHaveClass('cds--side-nav__overlay-active');
  });

  it('should toggle the overlay-active class when `defaultExpanded` is true', () => {
    const { container } = render(<SideNav aria-label="test" defaultExpanded />);
    expect(container.firstChild).toHaveClass('cds--side-nav__overlay-active');
  });

  it('should support a custom `className` prop on the element with role="navigation"', () => {
    render(<SideNav aria-label="test" className="test" />);
    expect(screen.getByRole('navigation')).toHaveClass('test');
  });

  it('should spread extra props on the outermost element', () => {
    render(<SideNav aria-label="test" data-testid="test" />);
    expect(screen.getByRole('navigation')).toHaveAttribute(
      'data-testid',
      'test'
    );
  });

  it('should support a `ref` on the element with role="navigation"', () => {
    const ref = jest.fn();
    render(<SideNav aria-label="test" ref={ref} />);
    expect(ref).toHaveBeenCalledWith(screen.getByRole('navigation'));
  });

  it('should call onOverlayClick when overlay is clicked', () => {
    const onOverlayClick = jest.fn();
    const { container } = render(
      <SideNav aria-label="test" expanded onOverlayClick={onOverlayClick} />
    );
    const overlay = container.firstChild;
    fireEvent.click(overlay);
    expect(onOverlayClick).toHaveBeenCalledTimes(1);
  });

  it('should not add focus or mouse listeners when disabled', () => {
    const onToggle = jest.fn();
    render(
      <SideNav
        aria-label="test"
        addFocusListeners={false}
        addMouseListeners={false}
        onToggle={onToggle}
      />
    );
    const sideNav = screen.getByRole('navigation');
    fireEvent.focus(sideNav);
    fireEvent.mouseEnter(sideNav);
    expect(onToggle).not.toHaveBeenCalled();
  });

  it('should handle keyboard events like Escape', () => {
    const onToggle = jest.fn();
    render(
      <SideNav
        aria-label="test"
        expanded
        onToggle={onToggle}
        href="#main-content"
      />
    );
    const sideNav = screen.getByRole('navigation');
    fireEvent.keyDown(sideNav, { key: 'Escape', keyCode: 27 });
    expect(onToggle).toHaveBeenCalledWith(expect.anything(), false);
  });

  it('should correctly handle `isRail` when true', () => {
    render(<SideNav aria-label="test" isRail />);
    const sideNav = screen.getByRole('navigation');
    expect(sideNav).toHaveClass('cds--side-nav--rail');
  });

  it('should correctly handle `isRail` when false', () => {
    render(<SideNav aria-label="test" isRail={false} />);
    const sideNav = screen.getByRole('navigation');
    expect(sideNav).not.toHaveClass('cds--side-nav--rail');
  });

  it('should toggle the expanded state when uncontrolled', () => {
    const { container } = render(<SideNav aria-label="test" />);
    const sideNav = screen.getByRole('navigation');
    fireEvent.focus(sideNav);
    expect(container.firstChild).toHaveClass('cds--side-nav__overlay');
  });

  it('should handle children without throwing error', () => {
    const { container } = render(
      <SideNav aria-label="test">
        <div>No Errors Here!</div>
      </SideNav>
    );
    expect(container).toBeInTheDocument();
  });

  it('should pass isSideNavExpanded to Carbon SideNav children', () => {
    const TestChild = React.forwardRef(({ isSideNavExpanded }, ref) => (
      <div data-testid="child" ref={ref}>
        {isSideNavExpanded ? 'Expanded' : 'Collapsed'}
      </div>
    ));
    render(
      <SideNav aria-label="test" expanded>
        <TestChild />
      </SideNav>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Collapsed');
  });

  it('should not pass isSideNavExpanded to non-CarbsideNav children', () => {
    const NonCarbonChild = () => <div data-testid="non-carbon-child" />;
    render(
      <SideNav aria-label="test" expanded>
        <NonCarbonChild />
      </SideNav>
    );
    expect(screen.getByTestId('non-carbon-child')).toBeInTheDocument();
  });

  it('should pass isSideNavExpanded correctly based on controlled state', () => {
    const TestChild = React.forwardRef(({ isSideNavExpanded }, ref) => (
      <div data-testid="child" ref={ref}>
        {isSideNavExpanded ? 'Expanded' : 'Collapsed'}
      </div>
    ));
    const { rerender } = render(
      <SideNav aria-label="test" expanded>
        <TestChild />
      </SideNav>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Collapsed');
    rerender(
      <SideNav aria-label="test">
        <TestChild />
      </SideNav>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Collapsed');
  });

  it('should call handleToggle and onSideNavBlur when blurred', () => {
    const onSideNavBlurMock = jest.fn();
    const TestChild = () => <div data-testid="child">Child</div>;
    const { getByRole } = render(
      <SideNav aria-label="test" onSideNavBlur={onSideNavBlurMock}>
        <TestChild />
      </SideNav>
    );
    const sideNav = getByRole('navigation');
    fireEvent.focus(sideNav);
    fireEvent.blur(sideNav);
    expect(onSideNavBlurMock).not.toHaveBeenCalled();
  });

  it('should not call onSideNavBlur if not expanded and isFixedNav is true', () => {
    const onSideNavBlurMock = jest.fn();
    const TestChild = () => <div data-testid="child">Child</div>;
    const { getByRole } = render(
      <SideNav aria-label="test" isFixedNav onSideNavBlur={onSideNavBlurMock}>
        <TestChild />
      </SideNav>
    );
    const sideNav = getByRole('navigation');
    fireEvent.focus(sideNav);
    fireEvent.blur(sideNav);
    expect(onSideNavBlurMock).not.toHaveBeenCalled();
  });

  it('should call onSideNavBlur when blurred, is not fixed, and is expanded', () => {
    const onSideNavBlurMock = jest.fn();
    const TestChild = () => <div data-testid="child">Child</div>;
    const { getByRole } = render(
      <SideNav
        aria-label="test"
        onSideNavBlur={onSideNavBlurMock}
        defaultExpanded>
        <TestChild />
      </SideNav>
    );
    const sideNav = getByRole('navigation');
    fireEvent.focus(sideNav);
    const unrelatedElement = document.createElement('div');
    document.body.appendChild(unrelatedElement);
    fireEvent.blur(sideNav, { relatedTarget: unrelatedElement });
    expect(onSideNavBlurMock).toHaveBeenCalled();
    document.body.removeChild(unrelatedElement);
  });

  it('should not call onSideNavBlur when isFixedNav is true', () => {
    const onSideNavBlurMock = jest.fn();
    const TestChild = () => <div data-testid="child">Child</div>;
    const { getByRole } = render(
      <SideNav
        aria-label="test"
        isFixedNav
        onSideNavBlur={onSideNavBlurMock}
        defaultExpanded>
        <TestChild />
      </SideNav>
    );
    const sideNav = getByRole('navigation');
    fireEvent.focus(sideNav);
    const unrelatedElement = document.createElement('div');
    document.body.appendChild(unrelatedElement);
    fireEvent.blur(sideNav, { relatedTarget: unrelatedElement });
    expect(onSideNavBlurMock).not.toHaveBeenCalled();
    document.body.removeChild(unrelatedElement);
  });

  it('should set expanded state to false on mouse leave', () => {
    const onToggleMock = jest.fn();
    const TestChild = () => <div data-testid="child">Child</div>;
    const { getByRole } = render(
      <SideNav aria-label="test" defaultExpanded onToggle={onToggleMock}>
        <TestChild />
      </SideNav>
    );
    const sideNav = getByRole('navigation');
    expect(sideNav).toHaveClass('cds--side-nav__navigation');
    fireEvent.mouseLeave(sideNav);
    expect(sideNav).toHaveClass('cds--side-nav__navigation');
  });

  it('should handleToggle if isRail is true', () => {
    const onToggleMock = jest.fn();
    const TestChild = () => <div data-testid="child">Child</div>;
    const { getByRole } = render(
      <SideNav aria-label="test" onToggle={onToggleMock} isRail>
        <TestChild />
      </SideNav>
    );
    const sideNav = getByRole('navigation');
    fireEvent.focus(sideNav);
    expect(onToggleMock).toHaveBeenCalled();
    fireEvent.mouseLeave(sideNav);
    expect(onToggleMock).toHaveBeenCalledWith(false, false);
    fireEvent.mouseEnter(sideNav);
    expect(onToggleMock).toHaveBeenCalledWith(true, true);
  });

  it('should not call handleToggle if isRail is false', () => {
    const onToggleMock = jest.fn();
    const TestChild = () => <div data-testid="child">Child</div>;
    const { getByRole } = render(
      <SideNav
        aria-label="test"
        defaultExpanded
        onToggle={onToggleMock}
        isRail={false}>
        <TestChild />
      </SideNav>
    );
    const sideNav = getByRole('navigation');
    fireEvent.mouseLeave(sideNav);
    expect(onToggleMock).not.toHaveBeenCalled();
  });

  it('should expand the SideNav immediately on click', () => {
    const TestChild = () => <div data-testid="child">Child</div>;
    const onToggleMock = jest.fn();
    const { getByRole } = render(
      <SideNav aria-label="test" onToggle={onToggleMock} isRail>
        <TestChild />
      </SideNav>
    );
    const sideNav = getByRole('navigation');
    expect(sideNav).not.toHaveClass('cds--side-nav--expanded');
    fireEvent.click(sideNav);
    expect(onToggleMock).toHaveBeenCalledWith(true, true);
    expect(sideNav).toHaveClass('cds--side-nav--expanded');
  });

  it('should focus SideNav after tabbing from headerMenuButton', () => {
    render(
      <>
        <button className="cds--header__menu-toggle"></button>
        <SideNav
          aria-label="test"
          expanded
          isFixedNav={false}
          defaultExpanded
        />
      </>
    );
    const mockHeaderMenuButton = screen.getByRole('button');
    const sideNav = screen.getByRole('navigation');

    mockHeaderMenuButton.focus();
    fireEvent.keyDown(window, { key: 'Tab' });
    expect(document.activeElement).toBe(sideNav);
  });
});
