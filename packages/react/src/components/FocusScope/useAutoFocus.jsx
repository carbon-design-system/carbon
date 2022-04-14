/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef } from 'react';
import { focus } from '../../internal/focus';

export function useAutoFocus(getElementOrRef) {
  const callbackRef = useRef(getElementOrRef);

  useEffect(() => {
    if (callbackRef.current) {
      const elementOrRef = callbackRef.current();
      const element = elementOrRef.current || elementOrRef;
      if (element) {
        focus(element);
      }
    }
  }, []);
}
