/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import Link from '../Link';

describe('Link', () => {
  it('should render an element with role="link"', () => {
    render(<Link href="/">test</Link>);
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent('test');
  });

  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(
      <Link className="test" href="/">
        test
      </Link>
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread extra props on the outermost element', () => {
    const { container } = render(
      <Link data-testid="test" href="/">
        test
      </Link>
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it('should support a `ref` that is placed on the outermost element', () => {
    const ref = jest.fn();
    const { container } = render(
      <Link ref={ref} href="/">
        test
      </Link>
    );
    expect(ref).toHaveBeenCalledWith(container.firstChild);
  });
});
