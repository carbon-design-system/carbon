/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { HeaderName } from '../';

describe('HeaderName', () => {
  it('should render `children` in an element with role="link"', () => {
    render(<HeaderName href="/test">test</HeaderName>);
    expect(screen.getByRole('link')).toHaveTextContent('IBM test');
  });

  it('should support a custom prefix', () => {
    render(
      <HeaderName href="/test" prefix="custom">
        test
      </HeaderName>
    );
    expect(screen.getByRole('link')).toHaveTextContent('custom test');
  });

  it('should support no prefix', () => {
    render(
      <HeaderName href="/test" prefix={null}>
        test
      </HeaderName>
    );
    expect(screen.getByRole('link')).toHaveTextContent('test');
  });

  it('should support specifying the href for the link with `href`', () => {
    render(<HeaderName href="/test">test</HeaderName>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test');
  });

  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(
      <HeaderName className="test" href="/test">
        test
      </HeaderName>
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread extra props on the outermost element', () => {
    const { container } = render(
      <HeaderName data-testid="test" href="/test">
        test
      </HeaderName>
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });
});
