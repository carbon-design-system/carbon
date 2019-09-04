/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState } from 'react';
import { usePrevious } from './usePrevious';
import { useWindowScroll } from './useWindowScroll';

/**
 * Provides the vertical scroll direction, can be one of DOWN or UP.
 */
export function useScrollDirection() {
  const { scrollY } = useWindowScroll();
  const prevScrollY = usePrevious(scrollY);
  const [direction, updateDirection] = useState('DOWN');

  if (scrollY === prevScrollY) {
    return direction;
  }

  const currentDirection = scrollY > prevScrollY ? 'DOWN' : 'UP';
  if (currentDirection !== direction) {
    updateDirection(currentDirection);
  }

  return direction;
}
