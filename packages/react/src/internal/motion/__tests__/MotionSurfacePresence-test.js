/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext } from 'react';
import { render, screen, waitFor } from '@testing-library/react';

jest.mock('../useMotionEnabled', () => ({
  useMotionEnabled: jest.fn(() => true),
}));

// The global test setup stubs requestAnimationFrame synchronously, which
// sends Motion's frame loop into infinite recursion. Motion captures the
// reference when its module loads, so restore a timer-based implementation
// before requiring anything that imports `motion/react`.
if (typeof global.performance === 'undefined') {
  global.performance = { now: () => Date.now() };
}
global.requestAnimationFrame = (callback) =>
  setTimeout(() => callback(performance.now()), 16);
global.cancelAnimationFrame = (id) => clearTimeout(id);

const { MotionSurface } = require('../MotionSurface');
const { useMotionEnabled } = require('../useMotionEnabled');
const {
  ModalPresence,
  ModalPresenceContext,
} = require('../../../components/Modal/ModalPresence');

// Attach the presence ref the way Modal does, so usePresence can resolve.
function PresenceNode({ children }) {
  const context = useContext(ModalPresenceContext);
  return <div ref={context?.presenceRef}>{children}</div>;
}

const Demo = ({ open }) => (
  <ModalPresence open={open}>
    <PresenceNode>
      <MotionSurface surface="contextual" open={open}>
        content
      </MotionSurface>
    </PresenceNode>
  </ModalPresence>
);

describe('MotionSurface inside a Carbon presence', () => {
  afterEach(() => {
    useMotionEnabled.mockReturnValue(true);
  });

  it('holds the presence open until the surface exit finishes', async () => {
    const { rerender } = render(<Demo open />);
    expect(screen.getByText('content')).toBeInTheDocument();

    rerender(<Demo open={false} />);

    // The presence cannot observe Motion's rAF-driven exit, so without the
    // exit hold this would unmount immediately and cut the animation.
    expect(screen.getByText('content')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByText('content')).not.toBeInTheDocument()
    );
  });

  it('does not hold the presence when the surface reopens mid-exit', async () => {
    const { rerender } = render(<Demo open />);

    rerender(<Demo open={false} />);
    rerender(<Demo open />);

    // Reopening released the hold; the surface stays mounted with content.
    expect(screen.getByText('content')).toBeInTheDocument();

    // A later close must still finish and unmount.
    rerender(<Demo open={false} />);
    await waitFor(() =>
      expect(screen.queryByText('content')).not.toBeInTheDocument()
    );
  });

  it('unmounts without waiting when the user prefers reduced motion', async () => {
    useMotionEnabled.mockReturnValue(false);
    const { rerender } = render(<Demo open />);
    expect(screen.getByText('content')).toBeInTheDocument();

    rerender(<Demo open={false} />);

    // No hold is registered; the presence falls back to its CSS-only path.
    await waitFor(() =>
      expect(screen.queryByText('content')).not.toBeInTheDocument()
    );
  });
});
