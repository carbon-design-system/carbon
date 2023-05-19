/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { OverflowMenu } from '.';
import { MenuItem } from '../../Menu';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('OverflowMenu (enable-v12-overflowmenu)', () => {
  it('should render closed by default', () => {
    render(
      <OverflowMenu>
        <MenuItem label="item" className="test-child">
          one
        </MenuItem>
        <MenuItem label="item" className="test-child">
          two
        </MenuItem>
      </OverflowMenu>
    );

    const ul = document.querySelector('ul');
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );

    expect(ul).toBe(null);
  });

  it('should be in an open state after trigger is clicked', async () => {
    render(
      <OverflowMenu>
        <MenuItem label="item" className="test-child">
          one
        </MenuItem>
        <MenuItem label="item" className="test-child">
          two
        </MenuItem>
      </OverflowMenu>
    );

    await userEvent.type(screen.getByRole('button'), 'enter');
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');

    const ul = document.querySelector('ul');
    expect(ul).toBeInTheDocument();
  });

  it('should add custom classNames', () => {
    render(
      <OverflowMenu className="extra-class">
        <MenuItem label="item" className="test-child">
          one
        </MenuItem>
        <MenuItem label="item" className="test-child">
          two
        </MenuItem>
      </OverflowMenu>
    );

    expect(screen.getByRole('button')).toHaveClass('extra-class');
  });

  it('should set a tab index if one is given', () => {
    render(
      <OverflowMenu tab-index="2">
        <MenuItem label="item" className="test-child">
          one
        </MenuItem>
        <MenuItem label="item" className="test-child">
          two
        </MenuItem>
      </OverflowMenu>
    );

    expect(screen.getByRole('button')).toHaveAttribute('tab-index', '2');
  });

  it('should set an aria-label if one is given', () => {
    render(
      <OverflowMenu aria-label="aria-label">
        <MenuItem label="item" className="test-child">
          one
        </MenuItem>
        <MenuItem label="item" className="test-child">
          two
        </MenuItem>
      </OverflowMenu>
    );

    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'aria-label'
    );
  });

  it('should set an id if one is given', () => {
    render(
      <OverflowMenu id="custom-id">
        <MenuItem label="item" className="test-child">
          one
        </MenuItem>
        <MenuItem label="item" className="test-child">
          two
        </MenuItem>
      </OverflowMenu>
    );

    expect(screen.getByRole('button')).toHaveAttribute('id', 'custom-id');
  });

  it('should close menu on outside click', async () => {
    render(
      <OverflowMenu>
        <MenuItem label="item" className="test-child">
          one
        </MenuItem>
        <MenuItem label="item" className="test-child">
          two
        </MenuItem>
      </OverflowMenu>
    );
    await userEvent.type(screen.getByRole('button'), 'enter');
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(document.body);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });
});
