/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Ref, RefCallback } from 'react';

/**
 * @param refs Refs to merge.
 * @returns Merged ref.
 */
export const mergeRefs = <T>(
  ...refs: (Ref<T> | null | undefined)[]
): RefCallback<T> => {
  return (value: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return;

      // https://github.com/facebook/react/issues/13029#issuecomment-410002316
      if (typeof ref === 'function') {
        ref(value);
      } else if (typeof ref === 'object' && 'current' in ref) {
        ref.current = value;
      }
    });
  };
};
