/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  cloneElement,
  useEffect,
  useRef,
  type ReactElement,
} from 'react';

interface ClickListenerProps {
  children: ReactElement;
  onClickOutside: (event: MouseEvent) => void;
}

export const ClickListener = ({
  children,
  onClickOutside,
}: ClickListenerProps) => {
  const elementRef = useRef<HTMLElement | null>(null);

  const getEventTarget = (event: MouseEvent) => {
    if (event.composed && typeof event.composedPath === 'function') {
      return event.composedPath()[0];
    }

    return event.target;
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (elementRef.current?.contains) {
      const eventTarget = getEventTarget(event);

      if (
        eventTarget instanceof Node &&
        !elementRef.current.contains(eventTarget)
      ) {
        onClickOutside(event);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [onClickOutside]);

  const handleRef = (el: HTMLElement | null) => {
    elementRef.current = el;

    if ('ref' in children && typeof children.ref === 'function') {
      children.ref(el);
    }
  };

  return cloneElement(children, { ref: handleRef });
};
