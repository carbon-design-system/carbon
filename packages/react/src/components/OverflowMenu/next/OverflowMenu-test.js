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

const prefix = 'cds';

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

    // eslint-disable-next-line testing-library/no-node-access
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
    const overFlowButton = screen.getByRole('button');
    await userEvent.click(overFlowButton);
    expect(overFlowButton).toHaveAttribute('aria-expanded', 'true');
    // eslint-disable-next-line testing-library/no-node-access
    const ul = document.querySelector('ul');
    expect(ul).toBeInTheDocument();
  });

  it('should add custom classNames', () => {
    const { container } = render(
      <OverflowMenu className="extra-class">
        <MenuItem label="item" className="test-child">
          one
        </MenuItem>
        <MenuItem label="item" className="test-child">
          two
        </MenuItem>
      </OverflowMenu>
    );

    expect(container.firstChild).toHaveClass('extra-class');
  });

  it('should set an id if one is given', () => {
    const { container } = render(
      <OverflowMenu id="custom-id">
        <MenuItem label="item" className="test-child">
          one
        </MenuItem>
        <MenuItem label="item" className="test-child">
          two
        </MenuItem>
      </OverflowMenu>
    );

    expect(container.firstChild).toHaveAttribute('id', 'custom-id');
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
    const overFlowButton = screen.getByRole('button');
    await userEvent.click(overFlowButton);
    const ul = document.querySelector('ul');
    expect(ul).toBeInTheDocument();
    expect(overFlowButton).toHaveAttribute('aria-expanded', 'true');
    userEvent.click(document.body);
    setTimeout(() => expect(ul).not.toBeInTheDocument(), 100);
  });

  describe('supports props.menuAlignment', () => {
    const alignments = ['top-start', 'top-end', 'bottom-start', 'bottom-end'];

    alignments.forEach((alignment) => {
      it(`menuAlignment="${alignment}"`, async () => {
        render(
          <OverflowMenu label="Actions" menuAlignment={alignment}>
            <MenuItem label="item">one</MenuItem>
          </OverflowMenu>
        );

        await userEvent.click(screen.getByRole('button'));

        expect(screen.getAllByRole('menu')[0]).toHaveClass(
          `${prefix}--overflow-menu__${alignment}`
        );
      });
    });
  });
});
