/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useReducer } from 'react';

function forcedReducer(state) {
  return !state;
}

/**
 * Programmatically force an update for your component. This should be used
 * sparingly and is a last-resort in almost all cases.
 *
 * @example
 * function MyComponent() {
 *   const forceUpdate = useForceUpdate();
 *   ...
 * }
 */
export function useForceUpdate() {
  return useReducer(forcedReducer, false)[1];
}
