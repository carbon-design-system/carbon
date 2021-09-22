/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { LayoutDirection } from '../';

describe('LayoutDirection', () => {
  it('should render its children in a node that has a `dir` attribute', () => {
    render(
      <LayoutDirection dir="rtl" data-testid="test">
        <span>test</span>
      </LayoutDirection>
    );

    const node = screen.getByTestId('test');
    expect(node).toHaveAttribute('dir', 'rtl');
  });

  it('should support customizing the outermost node through the `as` prop', () => {
    render(
      <LayoutDirection as="section" data-testid="test" dir="rtl">
        <span>test</span>
      </LayoutDirection>
    );

    const node = screen.getByTestId('test');
    expect(node.tagName).toBe('SECTION');
  });
});
