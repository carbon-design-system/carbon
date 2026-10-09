/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, act } from '@testing-library/react';
import React, { useState } from 'react';
import { useSafeFloatingRefs } from '../useSafeFloatingRefs';

/**
 * Test harness: renders a component that uses the hook and exposes a
 * `triggerWith(node)` function that sets pending node state AND forces a
 * re-render so the internal useEffect fires and forwards to the mock setters.
 */
function TestHarness({ refs, onReady }) {
  const [pendingNode, setPendingNode] = useState(undefined);
  const { setFloatingSafe, setReferenceSafe } = useSafeFloatingRefs(refs);

  // Call the safe callbacks whenever pendingNode changes
  if (pendingNode !== undefined) {
    setFloatingSafe(pendingNode);
    setReferenceSafe(pendingNode);
  }

  // Expose trigger to tests via callback
  React.useEffect(() => {
    if (onReady) onReady(setPendingNode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

function makeMockRefs() {
  return {
    setFloating: jest.fn(),
    setReference: jest.fn(),
  };
}

describe('useSafeFloatingRefs', () => {
  it('forwards a mounted node to refs.setFloating after the commit phase', async () => {
    const refs = makeMockRefs();
    let trigger;
    await act(async () => {
      render(
        <TestHarness
          refs={refs}
          onReady={(fn) => {
            trigger = fn;
          }}
        />
      );
    });

    const node = document.createElement('div');
    await act(async () => {
      trigger(node);
    });

    expect(refs.setFloating).toHaveBeenCalledWith(node);
  });

  it('forwards null (detach signal) to refs.setFloating on unmount', async () => {
    const refs = makeMockRefs();
    let trigger;
    await act(async () => {
      render(
        <TestHarness
          refs={refs}
          onReady={(fn) => {
            trigger = fn;
          }}
        />
      );
    });

    const node = document.createElement('div');
    await act(async () => {
      trigger(node);
    });
    refs.setFloating.mockClear();

    await act(async () => {
      trigger(null);
    });

    expect(refs.setFloating).toHaveBeenCalledWith(null);
  });

  it('forwards a mounted node to refs.setReference after the commit phase', async () => {
    const refs = makeMockRefs();
    let trigger;
    await act(async () => {
      render(
        <TestHarness
          refs={refs}
          onReady={(fn) => {
            trigger = fn;
          }}
        />
      );
    });

    const node = document.createElement('div');
    await act(async () => {
      trigger(node);
    });

    expect(refs.setReference).toHaveBeenCalledWith(node);
  });

  it('forwards null (detach signal) to refs.setReference on unmount', async () => {
    const refs = makeMockRefs();
    let trigger;
    await act(async () => {
      render(
        <TestHarness
          refs={refs}
          onReady={(fn) => {
            trigger = fn;
          }}
        />
      );
    });

    const node = document.createElement('div');
    await act(async () => {
      trigger(node);
    });
    refs.setReference.mockClear();

    await act(async () => {
      trigger(null);
    });

    expect(refs.setReference).toHaveBeenCalledWith(null);
  });

  it('does not call refs.setFloating when no node has been queued', async () => {
    const refs = makeMockRefs();
    await act(async () => {
      render(<TestHarness refs={refs} onReady={() => {}} />);
    });
    expect(refs.setFloating).not.toHaveBeenCalled();
  });

  it('does not call refs.setReference when no node has been queued', async () => {
    const refs = makeMockRefs();
    await act(async () => {
      render(<TestHarness refs={refs} onReady={() => {}} />);
    });
    expect(refs.setReference).not.toHaveBeenCalled();
  });
});
