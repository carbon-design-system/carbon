/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useContext } from 'react';
import { LayoutDirectionContext } from './LayoutDirectionContext';

/**
 * Get access to the current layout direction in context
 */
export function useLayoutDirection() {
  return useContext(LayoutDirectionContext);
}
