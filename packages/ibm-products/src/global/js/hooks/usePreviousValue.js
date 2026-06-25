/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef } from 'react';

/**
 * Returns the previous state value included in the param
 * @param {object} value - The current value of any type.
 * @returns {T | undefined} - The previous value of the same type, or undefined if there is none
 */
export const usePreviousValue = (value) => {
  const ref = useRef(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
