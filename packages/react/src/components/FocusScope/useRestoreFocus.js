/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef } from 'react';
import { focus } from '../../internal/focus';

export function useRestoreFocus(container) {
  const containsFocus = useRef(false);

  useEffect(() => {
    const initialActiveElement = document.activeElement;

    if (container.current && container.current.contains) {
      containsFocus.current = container.current.contains(
        document.activeElement
      );
    }

    function onFocusIn() {
      containsFocus.current = true;
    }

    function onFocusOut(event) {
      if (container.current && container.current.contains) {
        containsFocus.current = container.current.contains(event.relatedTarget);
      }
    }

    const { current: element } = container;

    element.addEventListener('focusin', onFocusIn);
    element.addEventListener('focusout', onFocusOut);

    return () => {
      element.removeEventListener('focusin', onFocusIn);
      element.removeEventListener('focusout', onFocusOut);

      if (containsFocus.current === true) {
        setTimeout(() => {
          focus(initialActiveElement);
        }, 0);
      }
    };
  }, [container]);
}
