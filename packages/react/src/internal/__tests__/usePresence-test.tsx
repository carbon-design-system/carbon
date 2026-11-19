/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, expect, it, jest } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { render, screen, waitFor } from '@testing-library/react';
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

const createDeferred = () => {
  let resolvePromise: (() => void) | undefined;

  const promise = new Promise<void>((res) => {
    resolvePromise = res;
  });

  const resolve = () => {
    if (!resolvePromise) {
      throw new Error('Deferred promise resolver is unavailable.');
    }

    resolvePromise();
  };

  return { promise, resolve };
};

const mockPresenceAnimations = () => {
  const originalGetAnimations = Element.prototype.getAnimations;
  const originalCSSAnimation = global.CSSAnimation;
  const deferredAnimations: ReturnType<typeof createDeferred>[] = [];

  class MockCSSAnimation {
    finished: Promise<void>;

    constructor(readonly animationName: string) {
      const deferred = createDeferred();
      this.finished = deferred.promise;
      deferredAnimations.push(deferred);
    }
  }

  Object.defineProperty(globalThis, 'CSSAnimation', {
    configurable: true,
    writable: true,
    value: MockCSSAnimation,
  });
  Object.defineProperty(Element.prototype, 'getAnimations', {
    configurable: true,
    writable: true,
    value: jest.fn(() => [new MockCSSAnimation('cds--presence-modal__exit')]),
  });

  const cleanup = () => {
    if (originalGetAnimations) {
      Element.prototype.getAnimations = originalGetAnimations;
    } else {
      Reflect.deleteProperty(Element.prototype, 'getAnimations');
    }

    if (originalCSSAnimation) {
      global.CSSAnimation = originalCSSAnimation;
    } else {
      Reflect.deleteProperty(globalThis, 'CSSAnimation');
    }
  };

  return { deferredAnimations, cleanup };
};

describe('usePresence', () => {
  it('dialog is not mounted initially', () => {
    render(<TestComponent />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('dialog is mounted on open', async () => {
    render(<TestComponent />);

    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).not.toHaveAttribute(
      'data-exiting',
      'true'
    );
  });

  it('dialog is unmounted on close', async () => {
    render(<TestComponent />);

    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should keep dialog mounted when exit is interrupted', async () => {
    const { deferredAnimations, cleanup } = mockPresenceAnimations();

    try {
      render(<TestComponent />);

      await userEvent.click(screen.getByRole('button', { name: 'Open' }));
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      await userEvent.click(screen.getByRole('button', { name: 'Close' }));
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByRole('dialog')).toHaveAttribute(
        'data-exiting',
        'true'
      );
      await waitFor(() => expect(deferredAnimations.length).toBe(1));

      await userEvent.click(screen.getByRole('button', { name: 'Open' }));
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByRole('dialog')).not.toHaveAttribute(
        'data-exiting',
        'true'
      );

      deferredAnimations[0].resolve();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    } finally {
      cleanup();
    }
  });
});
