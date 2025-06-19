/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useCallback, type ForwardedRef, type Ref } from 'react';

/**
 * Merges multiple refs into a single callback ref.
 *
 * This hook is useful when you need to attach multiple refs (for example, a ref
 * passed from `forwardRef` and a local ref from `useRef`) to the same node. It
 * accepts an array of refs and returns a callback ref that, when attached to a
 * node, assigns that node to every ref in the array.
 */
export const useMergedRefs = <T>(
  refs: (ForwardedRef<T> | undefined)[]
): Ref<T> => {
  return useCallback(
    (node: T | null) => {
      refs.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      });
    },
    [refs]
  );
};
