/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef } from 'react';

/**
 * Returns the previous value of a value that may be changing over time. Useful
 * to compare a previous value to a current value.
 *
 * @example
 * function MyComponent() {
 *   const [count, updateCount] = useState(0);
 *   const previous = usePrevious(count);
 *
 *   return <span>Current count: {count}, previous count: {previous}</span>;
 * }
 *
 * @param {any} value
 */
export function usePrevious(value) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
