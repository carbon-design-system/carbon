/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import ListBox from '../';

describe('ListBoxMenu', () => {
  it('should render an element with role="listbox"', () => {
    render(<ListBox.Menu id="test" />);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('should spread extra props on the outermost element', () => {
    const { container } = render(<ListBox.Menu id="test" data-testid="test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it('should support a `ref` on the element with role="listbox"', () => {
    const ref = jest.fn();
    render(<ListBox.Menu id="test" ref={ref} />);
    expect(ref).toHaveBeenCalledWith(screen.getByRole('listbox'));
  });
});
