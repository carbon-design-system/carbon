/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
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
});
