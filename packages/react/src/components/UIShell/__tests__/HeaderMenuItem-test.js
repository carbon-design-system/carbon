/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { HeaderMenuItem } from '../';
import { HeaderMenu } from '../HeaderMenu';
import userEvent from '@testing-library/user-event';

describe('HeaderMenuItem', () => {
  it('should set the current class and aria-current based on isActive', () => {
    render(
      <HeaderMenuItem data-testid="test" isActive>
        test
      </HeaderMenuItem>
    );
    expect(screen.getByTestId('test')).toHaveClass(
      'cds--header__menu-item--current'
    );
    expect(screen.getByTestId('test')).toHaveAttribute('aria-current', 'true');
  });

  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(
      <HeaderMenuItem className="test">test</HeaderMenuItem>
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread extra props on the <a> element', () => {
    render(<HeaderMenuItem data-testid="test">test</HeaderMenuItem>);
    expect(screen.getByTestId('test').tagName).toBe('A');
  });

  it('should support a `ref` on the <a> element', () => {
    const ref = jest.fn();
    render(
      <HeaderMenuItem ref={ref} data-testid="test">
        test
      </HeaderMenuItem>
    );
    expect(ref).toHaveBeenCalledWith(screen.getByTestId('test'));
  });
  it('should call onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(
      <HeaderMenuItem data-testid="test" onClick={onClick}>
        test
      </HeaderMenuItem>
    );
    await user.click(screen.getByTestId('test'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should call onClick handler when clicked within HeaderMenu', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(
      <HeaderMenu aria-label="test-label" menuLinkName="test-link">
        <HeaderMenuItem data-testid="test" onClick={onClick}>
          test
        </HeaderMenuItem>
      </HeaderMenu>
    );
    await user.click(screen.getByTestId('test'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('should be focusable via keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<HeaderMenuItem data-testid="test">test</HeaderMenuItem>);
    const menuItem = screen.getByTestId('test');
    await user.tab();
    expect(menuItem).toHaveFocus();
  });

  it('should be focusable via keyboard navigation within HeaderMenu', async () => {
    const user = userEvent.setup();

    render(
      <HeaderMenu aria-label="test-menu" menuLinkName="Menu">
        <HeaderMenuItem data-testid="test-item-1">Item 1</HeaderMenuItem>
      </HeaderMenu>
    );
    const firstItem = screen.getByTestId('test-item-1');
    firstItem.focus();
    expect(firstItem).toHaveFocus();
  });
});
