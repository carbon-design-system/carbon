/**
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { Grid } from '../';

describe('Grid', () => {
  it('should support a custom element as the root node', () => {
    const { container } = render(<Grid as="section" />);
    expect(container.firstChild.tagName).toBe('SECTION');
  });

  it('should include a custom className', () => {
    const { container } = render(<Grid className="test" />);
    expect(container.firstChild.classList.contains('test')).toBe(true);
  });

  it('should pass un-used props to the top-level node that is rendered', () => {
    const { getByTestId } = render(<Grid data-testid="test" />);
    expect(getByTestId('test')).toBeInTheDocument();
  });

  it('should render `children` that are given', () => {
    const { getByTestId } = render(
      <Grid>
        <span data-testid="test">Test</span>
      </Grid>
    );
    expect(getByTestId('test')).toBeInTheDocument();
  });

  it('should support setting the condensed class through the `condensed` prop', () => {
    const { container } = render(<Grid data-testid="test" condensed />);
    expect(container.firstChild.className).toEqual(
      expect.stringContaining('grid--condensed')
    );
  });

  it('should support setting the full-width class through the `fullWidth` prop', () => {
    const { container } = render(<Grid fullWidth />);
    expect(container.firstChild.className).toEqual(
      expect.stringContaining('grid--full-width')
    );
  });
});
