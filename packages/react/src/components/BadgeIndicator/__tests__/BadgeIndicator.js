/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import BadgeIndicator from '../index';

describe('BadgeIndicator', () => {
  it('should set a count', () => {
    render(<BadgeIndicator count={3} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should truncate the count over 999', () => {
    render(<BadgeIndicator count={2342} />);
    expect(screen.getByText('999+')).toBeInTheDocument();
  });

  it('should support a custom class name on the outermost element', () => {
    const { container } = render(<BadgeIndicator className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should support a ref on the outermost element', () => {
    const ref = jest.fn();
    const { container } = render(<BadgeIndicator ref={ref} />);
    expect(ref).toHaveBeenCalledWith(container.firstChild);
  });
});
