/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { ColumnHang } from '../';

describe('ColumnHang', () => {
  it('should render a `div` by default with the column hang class', () => {
    const { container } = render(<ColumnHang />);

    expect(container.firstChild.tagName).toBe('DIV');
    expect(container.firstChild).toHaveClass('cds--grid-column-hang', {
      exact: true,
    });
  });

  it('should support a custom element as the root node', () => {
    const { container } = render(<ColumnHang as="section" />);

    expect(container.firstChild.tagName).toBe('SECTION');
  });

  it('should include a custom `className` and pass through unused props', () => {
    const { container } = render(
      <ColumnHang className="🧇" id="column-hang" />
    );

    expect(container.firstChild).toHaveAttribute('id', 'column-hang');
    expect(container.firstChild).toHaveClass('🧇', 'cds--grid-column-hang', {
      exact: true,
    });
  });

  it('should render `children`', () => {
    const { container } = render(
      <ColumnHang>
        <span id="test">Test</span>
      </ColumnHang>
    );

    const testNode = container.querySelector('#test');

    expect(testNode).toBeInstanceOf(HTMLElement);
  });
});
