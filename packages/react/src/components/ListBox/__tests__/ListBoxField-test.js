/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import ListBox from '../';

describe('ListBoxField', () => {
  it('should set tabIndex to -1 when disabled', () => {
    const { container } = render(<ListBox.Field disabled />);
    expect(container.firstChild).toHaveAttribute('tabindex', '-1');
  });

  it('should set tabIndex to the `tabIndex` prop', () => {
    const { container } = render(<ListBox.Field tabIndex="0" />);
    expect(container.firstChild).toHaveAttribute('tabindex', '0');
  });

  it('should spread extra props on the outermost element', () => {
    const { container } = render(<ListBox.Field data-testid="test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });
});
