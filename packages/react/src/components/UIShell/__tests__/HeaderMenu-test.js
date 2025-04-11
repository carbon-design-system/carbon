/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { HeaderMenu, HeaderMenuItem } from '../';
import userEvent from '@testing-library/user-event';

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

  it('should handle on click on the menu', async () => {
    const { container } = render(
      <HeaderMenu aria-label="test-label" menuLinkName="test-link">
        <HeaderMenuItem href="/a">a</HeaderMenuItem>
        <HeaderMenuItem href="/b">b</HeaderMenuItem>
        <HeaderMenuItem href="/c">c</HeaderMenuItem>
      </HeaderMenu>
    );

    expect(container.firstChild.firstChild).toHaveAttribute(
      'aria-expanded',
      'false'
    );
    await userEvent.click(container.firstChild);
    expect(container.firstChild.firstChild).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });

  it('should handle on key down on the menu', async () => {
    const { container } = render(
      <HeaderMenu aria-label="test-label" menuLinkName="test-link">
        <HeaderMenuItem href="/a">a</HeaderMenuItem>
        <HeaderMenuItem href="/b">b</HeaderMenuItem>
        <HeaderMenuItem href="/c">c</HeaderMenuItem>
      </HeaderMenu>
    );

    expect(container.firstChild.firstChild).toHaveAttribute(
      'aria-expanded',
      'false'
    );
    await userEvent.tab();
    await userEvent.keyboard('[Enter]');
    expect(container.firstChild.firstChild).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    await userEvent.keyboard('[Escape]');
    expect(container.firstChild.firstChild).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  it('should handle blur on the menu', async () => {
    const { container } = render(
      <HeaderMenu aria-label="test-label" menuLinkName="test-link">
        <HeaderMenuItem href="/a">a</HeaderMenuItem>
        <HeaderMenuItem href="/b">b</HeaderMenuItem>
        <HeaderMenuItem href="/c">c</HeaderMenuItem>
      </HeaderMenu>
    );

    // tab and open the menu
    await userEvent.tab();
    await userEvent.keyboard('[Enter]');

    // tab through items
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();

    // tab and close the menu
    await userEvent.tab();

    expect(container.firstChild.firstChild).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  it('should close after clicking redirect menu', async () => {
    const { container } = render(
      <HeaderMenu aria-label="test-aria" menuLinkName="test-link">
        <HeaderMenuItem key={'menu'} href="/">
          test
        </HeaderMenuItem>
      </HeaderMenu>
    );

    // clicks to open container/menu
    await userEvent.click(container.firstChild);
    expect(container.firstChild.firstChild).toHaveAttribute(
      'aria-expanded',
      'true'
    );

    // clicks on actual submenu to go to href / link
    await userEvent.click(container.firstChild.firstChild);
    expect(container.firstChild.firstChild).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });
});
