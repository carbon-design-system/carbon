/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { GridSettings } from '../';
import { CSSGrid } from '../CSSGrid';

describe('CSSGrid', () => {
  it('should render the non-`subgrid` path with a custom root element', () => {
    const { container } = render(
      <CSSGrid as="section" className="test" fullWidth id="css-grid">
        <span id="child">Test</span>
      </CSSGrid>
    );

    expect(container.firstChild.tagName).toBe('SECTION');
    expect(container.firstChild).toHaveClass(
      'test',
      'cds--css-grid',
      'cds--css-grid--full-width',
      { exact: true }
    );
    expect(container.firstChild).toHaveAttribute('id', 'css-grid');
    expect(container.querySelector('#child')).toBeInstanceOf(HTMLElement);
  });

  it('should render the non-`subgrid` path as a `div` by default', () => {
    const { container } = render(<CSSGrid />);

    expect(container.firstChild.tagName).toBe('DIV');
    expect(container.firstChild).toHaveClass('cds--css-grid', { exact: true });
  });

  it('should render a `narrow` `subgrid` with a custom root element when `subgrid` is enabled', () => {
    const { container } = render(
      <GridSettings mode="css-grid" subgrid>
        <CSSGrid as="section" className="test" id="css-grid" narrow>
          <span id="child">Test</span>
        </CSSGrid>
      </GridSettings>
    );

    expect(container.firstChild.tagName).toBe('SECTION');
    expect(container.firstChild).toHaveClass(
      'test',
      'cds--subgrid',
      'cds--subgrid--narrow',
      { exact: true }
    );
    expect(container.firstChild).toHaveAttribute('id', 'css-grid');
    expect(container.querySelector('#child')).toBeInstanceOf(HTMLElement);
  });

  it('should render a `condensed` `subgrid` as a `div` by default when `subgrid` is enabled', () => {
    const { container } = render(
      <GridSettings mode="css-grid" subgrid>
        <CSSGrid condensed />
      </GridSettings>
    );

    expect(container.firstChild.tagName).toBe('DIV');
    expect(container.firstChild).toHaveClass(
      'cds--subgrid',
      'cds--subgrid--condensed',
      { exact: true }
    );
  });
});
