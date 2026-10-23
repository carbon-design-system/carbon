/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useCallback, useEffect, useRef } from 'react';
import type { UseFloatingReturn } from '@floating-ui/react';

type FloatingRefs = Pick<
  UseFloatingReturn['refs'],
  'setFloating' | 'setReference'
>;

/**
 * React 19 calls ref callbacks synchronously during the commit phase — both on
 * unmount (null, via safelyDetachRef) and on mount (real node, via
 * commitAttachRef). The `setFloating` and `setReference` functions returned by
 * `useFloating()` are backed by `useState` setters, so calling them during
 * commit triggers setState during commit → "Maximum update depth exceeded".
 *
 * This hook wraps both setters in stable `useCallback` ref callbacks that
 * capture the incoming node (including null detach signals) in a ref, then
 * forward the value to the floating-ui setter inside a passive `useEffect`
 * that runs after the commit phase.
 *
 * A `{ pending, node }` sentinel distinguishes "nothing queued" from
 * "null detach queued", so unmount cleanup (autoUpdate teardown, etc.) is
 * always forwarded correctly.
 */
export function useSafeFloatingRefs(refs: FloatingRefs): {
  setFloatingSafe: (node: Element | null) => void;
  setReferenceSafe: (node: Element | null) => void;
} {
  const pendingFloatingRef = useRef<{ pending: boolean; node: Element | null }>(
    {
      pending: false,
      node: null,
    }
  );
  const setFloatingSafe = useCallback((node: Element | null) => {
    pendingFloatingRef.current = { pending: true, node };
  }, []);
  useEffect(() => {
    if (pendingFloatingRef.current.pending) {
      const { node } = pendingFloatingRef.current;
      pendingFloatingRef.current = { pending: false, node: null };
      refs.setFloating(node as HTMLElement | null);
    }
  });

  const pendingReferenceRef = useRef<{
    pending: boolean;
    node: Element | null;
  }>({
    pending: false,
    node: null,
  });
  const setReferenceSafe = useCallback((node: Element | null) => {
    pendingReferenceRef.current = { pending: true, node };
  }, []);
  useEffect(() => {
    if (pendingReferenceRef.current.pending) {
      const { node } = pendingReferenceRef.current;
      pendingReferenceRef.current = { pending: false, node: null };
      refs.setReference(node);
    }
  });

  return { setFloatingSafe, setReferenceSafe };
}
