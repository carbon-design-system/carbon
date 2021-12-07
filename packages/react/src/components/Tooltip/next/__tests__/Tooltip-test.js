/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { Tooltip } from '../../next';

describe('Tooltip', () => {
  it('should support a custom className with the `className` prop', () => {
    const { container } = render(
      <Tooltip className="test" label="Close">
        <button type="button">X</button>
      </Tooltip>
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should apply additional props to the outermost element', () => {
    const { container } = render(
      <Tooltip data-testid="test" label="Close">
        <button type="button">X</button>
      </Tooltip>
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it('should support initially showing the tooltip with `defaultOpen`', () => {
    render(
      <Tooltip defaultOpen label="Close">
        <button type="button">X</button>
      </Tooltip>
    );
    expect(screen.getByLabelText('Close')).toBeVisible();
  });

  it('should support labeling an element by its tooltip', () => {
    render(
      <Tooltip label="Close">
        <button type="button">X</button>
      </Tooltip>
    );
    expect(screen.getByText('X')).toHaveAttribute('aria-labelledby');
  });

  it('should support describing an element by its tooltip', () => {
    render(
      <Tooltip description="test description">
        <button type="button">test</button>
      </Tooltip>
    );
    expect(screen.getByText('test')).toHaveAttribute('aria-describedby');
  });
});
