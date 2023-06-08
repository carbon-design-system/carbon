/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { HeaderMenuItem } from '../';

describe('HeaderMenuItem', () => {
  it('should set the current class based on isActive', () => {
    render(
      <HeaderMenuItem data-testid="test" isActive>
        test
      </HeaderMenuItem>
    );
    expect(screen.getByTestId('test')).toHaveClass(
      'cds--header__menu-item--current'
    );
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
});
