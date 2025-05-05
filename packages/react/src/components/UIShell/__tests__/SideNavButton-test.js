/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import SideNavButton from '../SideNavButton';

describe('SideNavButton', () => {
  it('should apply the custom className to the Button element', () => {
    render(<SideNavButton className="test">test</SideNavButton>);
    expect(screen.getByRole('button')).toHaveClass('test');
  });

  it('should spread extra props on the Button element', () => {
    render(<SideNavButton data-testid="test">test</SideNavButton>);
    expect(screen.getByRole('button')).toHaveAttribute('data-testid', 'test');
  });

  it('should set a `ref` on the Button element', () => {
    const ref = jest.fn();
    render(<SideNavButton ref={ref}>test</SideNavButton>);
    expect(ref).toHaveBeenCalledWith(screen.getByRole('button'));
  });

  it('should call the `onClick` handler when clicked', async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();

    render(<SideNavButton onClick={onClick}>test</SideNavButton>);

    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
