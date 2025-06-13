/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useRef, useState } from 'react';
import { usePresence } from '../usePresence';

const TestComponent = () => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { isPresent, isExiting } = usePresence(ref, isOpen);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>
      {isPresent ? (
        <div ref={ref} role="dialog" data-exiting={isExiting}>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      ) : null}
    </>
  );
};

describe('usePresence', () => {
  it('dialog is not mounted initially', () => {
    render(<TestComponent />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('dialog is mounted on open', async () => {
    render(<TestComponent />);

    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toHaveAttribute(
      'data-exiting',
      'true'
    );
  });

  it('dialog is unmounted on close', async () => {
    render(<TestComponent />);

    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.queryByRole('dialog')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
