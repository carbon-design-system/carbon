/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { Content } from '../';

describe('Content', () => {
  it('should support customizing the tag of the outermost element with `tagName`', () => {
    const { container, rerender } = render(<Content />);
    expect(container.firstChild.tagName).toBe('MAIN');

    rerender(<Content tagName="section" />);
    expect(container.firstChild.tagName).toBe('SECTION');
  });

  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(<Content className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread extra props on the outermost element', () => {
    const { container } = render(<Content data-testid="test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });
});
