/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React, { type RefCallback } from 'react';
import ListBox from '../';

describe('ListBoxMenuItem', () => {
  it('should set the active class when `isActive` is true', () => {
    const { container } = render(<ListBox.MenuItem isActive />);
    expect(container.firstChild).toHaveClass(
      'cds--list-box__menu-item--active'
    );
  });

  it('should set the highlighted class when `isHighlighted` is true', () => {
    const { container } = render(<ListBox.MenuItem isHighlighted />);
    expect(container.firstChild).toHaveClass(
      'cds--list-box__menu-item--highlighted'
    );
  });

  it('should spread extra props on the outermost element', () => {
    const { container } = render(<ListBox.MenuItem data-testid="test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it('should forward `ref` to the outer `li` element', () => {
    const ref = jest.fn<RefCallback<HTMLLIElement>>();
    render(<ListBox.MenuItem ref={ref} />);

    expect(ref.mock.calls).toContainEqual([
      screen.getByRole<HTMLLIElement>('listitem'),
    ]);
  });

  it('should set the title when the inner option is truncated', () => {
    const { container, rerender } = render(
      <ListBox.MenuItem title="Item title">Item</ListBox.MenuItem>
    );
    const expectedDiv = container.querySelector<HTMLDivElement>(
      '.cds--list-box__menu-item__option'
    );

    Object.defineProperties(expectedDiv, {
      offsetWidth: { configurable: true, value: 10 },
      scrollWidth: { configurable: true, value: 20 },
    });

    rerender(
      <ListBox.MenuItem title="Item title">Updated item</ListBox.MenuItem>
    );

    expect(screen.getByRole('listitem')).toHaveAttribute('title', 'Item title');
  });
});
