/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import SkipToContent from '../SkipToContent';

describe('SkipToContent', () => {
  it('should support setting the `href` of the underlying <a> element', () => {
    render(<SkipToContent href="#test-content">test</SkipToContent>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '#test-content');
  });

  it('should support setting the `tabIndex` of the underlying <a> element', () => {
    render(<SkipToContent tabIndex="-1">test</SkipToContent>);
    expect(screen.getByRole('link')).toHaveAttribute('tabIndex', '-1');
  });

  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(<SkipToContent className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread extra props on the outermost element', () => {
    const { container } = render(<SkipToContent data-testid="test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });
});
