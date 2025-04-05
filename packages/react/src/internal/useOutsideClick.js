/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef } from 'react';
import { useEvent } from './useEvent';
import { canUseDOM } from './environment';

export function useOutsideClick(ref, callback) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  // We conditionally guard the `useEvent` hook for SSR. `canUseDOM` can be
  // treated as a constant as it will be false when executed in a Node.js
  // environment and true when executed in the browser
  if (canUseDOM) {
    // TODO: https://github.com/carbon-design-system/carbon/issues/19005
    /*
    // eslint-disable-next-line react-hooks/rules-of-hooks
    */
    useEvent(window, 'click', (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        savedCallback.current(event);
      }
    });
  }
}
