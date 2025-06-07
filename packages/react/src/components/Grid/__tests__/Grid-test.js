/**
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { Grid, FlexGrid } from '../';

describe('FlexGrid', () => {
  it('should support a custom element as the root node', () => {
    const { container } = render(<FlexGrid as="section" />);
    expect(container.firstChild.tagName).toBe('SECTION');
  });

  it('should include a custom className', () => {
    const { container } = render(<FlexGrid className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('should pass un-used props to the top-level node that is rendered', () => {
    const { container } = render(<FlexGrid id="test" />);
    expect(container.firstChild).toHaveAttribute('id', 'test');
  });

  it('should render `children` that are given', () => {
    const { container } = render(
      <FlexGrid>
        <span id="test">Test</span>
      </FlexGrid>
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const testNode = container.querySelector('#test');
    expect(testNode).toBeInstanceOf(HTMLElement);
  });

  it('should support setting the condensed class through the `condensed` prop', () => {
    const { container } = render(<FlexGrid condensed />);
    expect(container.firstChild.className).toEqual(
      expect.stringContaining('grid--condensed')
    );
  });

  it('should support setting the full-width class through the `fullWidth` prop', () => {
    const { container } = render(<FlexGrid fullWidth />);
    expect(container.firstChild.className).toEqual(
      expect.stringContaining('grid--full-width')
    );
  });
});

describe('Grid', () => {
  let Grid;
  let cleanup;
  let render;
  let screen;

  beforeEach(() => {
    jest.resetModules();
    const FeatureFlags = require('@carbon/feature-flags');
    FeatureFlags.enable('enable-css-grid');

    cleanup = require('@testing-library/react/pure').cleanup;
    render = require('@testing-library/react/pure').render;
    screen = require('@testing-library/react/pure').screen;
    Grid = require('../Grid').Grid;
  });

  afterEach(() => {
    cleanup();
  });

  it('should support a custom element as the root node', () => {
    const { container } = render(<Grid as="section" />);
    expect(container.firstChild.tagName).toBe('SECTION');
  });

  it('should include a custom className', () => {
    const { container } = render(<Grid className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('should pass un-used props to the top-level node that is rendered', () => {
    const { container } = render(<Grid id="test" />);
    expect(container.firstChild).toHaveAttribute('id', 'test');
  });

  it('should render `children` that are given', () => {
    const { container } = render(
      <Grid>
        <span id="test">Test</span>
      </Grid>
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
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

  it('should support setting the align class through the `align` prop as start', () => {
    const { container } = render(<Grid align="start" />);
    expect(container.firstChild.className).toEqual(
      expect.stringContaining('grid--start')
    );
  });

  it('should support setting the align class through the `align` prop as end', () => {
    const { container } = render(<Grid align="end" />);
    expect(container.firstChild.className).toEqual(
      expect.stringContaining('grid--end')
    );
  });
});
