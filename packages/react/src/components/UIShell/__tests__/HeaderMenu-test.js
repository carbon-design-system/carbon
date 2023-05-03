/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { HeaderMenu, HeaderMenuItem } from '../';

describe('HeaderMenu', () => {
  it('should set the current class if `isActive` is true', () => {
    render(
      <HeaderMenu
        data-testid="test"
        aria-label="test"
        menuLinkName="test"
        isActive>
        <HeaderMenuItem href="/a">a</HeaderMenuItem>
        <HeaderMenuItem href="/b">b</HeaderMenuItem>
        <HeaderMenuItem href="/c">c</HeaderMenuItem>
      </HeaderMenu>
    );
    expect(screen.getByTestId('test').firstChild).toHaveClass(
      'cds--header__menu-item--current'
    );
  });

  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(
      <HeaderMenu
        className="test"
        aria-label="test-label"
        menuLinkName="test-link">
        <HeaderMenuItem href="/a">a</HeaderMenuItem>
        <HeaderMenuItem href="/b">b</HeaderMenuItem>
        <HeaderMenuItem href="/c">c</HeaderMenuItem>
      </HeaderMenu>
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread extra props on the outermost element', () => {
    const { container } = render(
      <HeaderMenu
        data-testid="test"
        aria-label="test-label"
        menuLinkName="test-link">
        <HeaderMenuItem href="/a">a</HeaderMenuItem>
        <HeaderMenuItem href="/b">b</HeaderMenuItem>
        <HeaderMenuItem href="/c">c</HeaderMenuItem>
      </HeaderMenu>
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it('should support a `ref` on the menu button', () => {
    const ref = jest.fn();
    render(
      <HeaderMenu ref={ref} aria-label="test-label" menuLinkName="test-link">
        <HeaderMenuItem href="/a">a</HeaderMenuItem>
        <HeaderMenuItem href="/b">b</HeaderMenuItem>
        <HeaderMenuItem href="/c">c</HeaderMenuItem>
      </HeaderMenu>
    );
    expect(ref).toHaveBeenCalledWith(screen.getByText('test-link'));
  });
});
