/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { TableContainer } from '../';

describe('TableContainer', () => {
  it('should set the max-width class if stickyHeader is true', () => {
    const { container } = render(<TableContainer stickyHeader />);
    expect(container.firstChild).toHaveClass('cds--data-table--max-width');
  });

  it('should set the static class if useStaticWidth is true', () => {
    const { container } = render(<TableContainer useStaticWidth />);
    expect(container.firstChild).toHaveClass(
      'cds--data-table-container--static'
    );
  });

  it('should support a custom className on the outermost element', () => {
    const { container } = render(<TableContainer className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should spread props onto the <table> element', () => {
    const { container } = render(<TableContainer data-testid="test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });
});
