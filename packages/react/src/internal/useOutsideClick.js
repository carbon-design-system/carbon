/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef } from 'react';
import { useEvent } from './useEvent';

export function useOutsideClick(ref, callback) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEvent(window, 'click', (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      savedCallback.current(event);
    }
  });
}
