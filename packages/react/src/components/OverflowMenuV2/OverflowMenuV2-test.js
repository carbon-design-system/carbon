/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { OverflowMenuV2 } from '.';
import { MenuItem } from '../Menu';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('OverflowMenu', () => {
  it('should render closed by default', () => {
    render(
      <OverflowMenuV2>
        <MenuItem label="item" className="test-child">
          one
        </MenuItem>
        <MenuItem label="item" className="test-child">
          two
        </MenuItem>
      </OverflowMenuV2>
    );

    const ul = document.querySelector('ul');
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );

    expect(ul).toBe(null);
  });

  it('should be in an open state after trigger is clicked', () => {
    render(
      <OverflowMenuV2>
        <MenuItem label="item" className="test-child">
          one
        </MenuItem>
        <MenuItem label="item" className="test-child">
          two
        </MenuItem>
      </OverflowMenuV2>
    );

    userEvent.type(screen.getByRole('button'), 'enter');
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');

    const ul = document.querySelector('ul');
    expect(ul).toBeInTheDocument();
  });

  it('should add custom classNames', () => {
    render(
      <OverflowMenuV2 className="extra-class">
        <MenuItem label="item" className="test-child">
          one
        </MenuItem>
        <MenuItem label="item" className="test-child">
          two
        </MenuItem>
      </OverflowMenuV2>
    );

    expect(screen.getByRole('button')).toHaveClass('extra-class');
  });

  it('should set a tab index if one is given', () => {
    render(
      <OverflowMenuV2 tab-index="2">
        <MenuItem label="item" className="test-child">
          one
        </MenuItem>
        <MenuItem label="item" className="test-child">
          two
        </MenuItem>
      </OverflowMenuV2>
    );

    expect(screen.getByRole('button')).toHaveAttribute('tab-index', '2');
  });

  it('should set an aria-label if one is given', () => {
    render(
      <OverflowMenuV2 aria-label="aria-label">
        <MenuItem label="item" className="test-child">
          one
        </MenuItem>
        <MenuItem label="item" className="test-child">
          two
        </MenuItem>
      </OverflowMenuV2>
    );

    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'aria-label'
    );
  });

  it('should set an id if one is given', () => {
    render(
      <OverflowMenuV2 id="custom-id">
        <MenuItem label="item" className="test-child">
          one
        </MenuItem>
        <MenuItem label="item" className="test-child">
          two
        </MenuItem>
      </OverflowMenuV2>
    );

    expect(screen.getByRole('button')).toHaveAttribute('id', 'custom-id');
  });

  it('should close menu on outside click', () => {
    render(
      <OverflowMenuV2>
        <MenuItem label="item" className="test-child">
          one
        </MenuItem>
        <MenuItem label="item" className="test-child">
          two
        </MenuItem>
      </OverflowMenuV2>
    );
    userEvent.type(screen.getByRole('button'), 'enter');
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    userEvent.click(document.body);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });
});
