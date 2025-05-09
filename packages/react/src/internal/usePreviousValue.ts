/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef } from 'react';

/**
 * Stores the previous value of a given input.
 *
 * @param value - The current value.
 * @returns The value before the current render.
 *
 * @example
 * const [count, setCount] = useState(0);
 * const prevCount = usePreviousValue(count);
 */
export const usePreviousValue = <T>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
