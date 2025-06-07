/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import useContextMenu from './useContextMenu';

const TestComponent = () => {
  const { open, x, y, onClose } = useContextMenu();

  return (
    <>
      {open && (
        <div
          role="menu"
          style={{ position: 'absolute', top: y, left: x }}
          data-testid="context-menu">
          Context Menu
        </div>
      )}
      <div
        data-testid="trigger"
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'lightgray',
        }}
        onClick={onClose}>
        Right Click Here
      </div>
    </>
  );
};

describe('useContextMenu', () => {
  it('should open the context menu on right-click', async () => {
    render(<TestComponent />);
    fireEvent.contextMenu(screen.getByTestId('trigger'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('should close context menu when calling onClose', async () => {
    render(<TestComponent />);
    const triggerElement = screen.getByTestId('trigger');

    fireEvent.contextMenu(triggerElement);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.click(triggerElement);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
