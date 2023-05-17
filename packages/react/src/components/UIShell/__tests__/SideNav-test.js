/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import SideNav from '../SideNav';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
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
});
