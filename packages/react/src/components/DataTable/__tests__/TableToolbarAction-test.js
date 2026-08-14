/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { TableToolbarAction } from '../';

describe('TableToolbarAction', () => {
  it('should render the `children` text and forward props to the menu item', () => {
    render(
      <TableToolbarAction
        className="🪑"
        closeMenu={jest.fn()}
        data-testid="toolbar-action"
        onClick={jest.fn()}>
        Delete
      </TableToolbarAction>
    );

    expect(screen.getByTestId('toolbar-action')).toHaveClass(
      'cds--overflow-menu-options__btn',
      '🪑',
      { exact: true }
    );
    expect(screen.getByTestId('toolbar-action')).toHaveTextContent('Delete');
    expect(screen.getByRole('menuitem')).toBe(
      screen.getByTestId('toolbar-action')
    );
  });

  it('should forward the `ref` and call `onClick` when activated', async () => {
    const onClick = jest.fn();
    const ref = React.createRef();

    render(
      <TableToolbarAction closeMenu={jest.fn()} onClick={onClick} ref={ref}>
        Edit
      </TableToolbarAction>
    );

    await userEvent.click(screen.getByRole('menuitem'));

    expect(ref.current).toBe(screen.getByRole('menuitem'));
    expect(onClick).toHaveBeenCalled();
  });
});
