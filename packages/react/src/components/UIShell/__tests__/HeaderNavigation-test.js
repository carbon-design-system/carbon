/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { HeaderNavigation } from '../HeaderNavigation';

describe('HeaderNavigation', () => {
  it('should render children that are passed to the component', () => {
    render(
      <HeaderNavigation aria-label="navigation">
        <li data-testid="child" />
      </HeaderNavigation>
    );
    expect(screen.getByTestId('child')).toBeVisible();
  });

  it('should add an accessibility label to the <nav>', () => {
    render(
      <HeaderNavigation aria-label="navigation">
        <li data-testid="child" />
      </HeaderNavigation>
    );

    expect(screen.getByLabelText('navigation')).toBeVisible();

    cleanup();
    render(
      <>
        <span id="label">navigation</span>
        <HeaderNavigation aria-labelledby="label">
          <li data-testid="child" />
        </HeaderNavigation>
      </>
    );

    expect(screen.getByLabelText('navigation')).toBeVisible();
  });

  it('should support a custom className', () => {
    const { container } = render(
      <HeaderNavigation aria-label="navigation" className="test">
        <li data-testid="child" />
      </HeaderNavigation>
    );

    expect(container.firstChild).toHaveClass('test');
  });

  it('should pass additional props to the outermost element', () => {
    const { container } = render(
      <HeaderNavigation aria-label="navigation" data-testid="test">
        <li data-testid="child" />
      </HeaderNavigation>
    );

    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });
});
