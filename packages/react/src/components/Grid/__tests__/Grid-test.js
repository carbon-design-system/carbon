/**
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, cleanup } from '@carbon/test-utils/react';
import React from 'react';
import { Grid } from '../';

describe('Grid', () => {
  afterEach(cleanup);

  it('should support a custom element as the root node', () => {
    const { container } = render(<Grid as="section" />);
    expect(container.firstChild.tagName).toBe('SECTION');
  });

  it('should include a custom className', () => {
    const { container } = render(<Grid className="test" />);
    expect(container.firstChild.classList.contains('test')).toBe(true);
  });

  it('should pass un-used props to the top-level node that is rendered', () => {
    const { container } = render(<Grid id="test" />);
    expect(container.firstChild.getAttribute('id')).toBe('test');
  });

  it('should render `children` that are given', () => {
    const { container } = render(
      <Grid>
        <span id="test">Test</span>
      </Grid>
    );
    const testNode = container.querySelector('#test');
    expect(testNode).toBeInstanceOf(HTMLElement);
  });

  it('should support setting the condensed class through the `condensed` prop', () => {
    const { container } = render(<Grid condensed />);
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
