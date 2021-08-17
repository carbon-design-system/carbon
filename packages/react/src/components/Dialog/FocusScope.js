/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { useEvent } from '../../internal/useEvent';
import { match, keys } from '../../internal/keyboard';

function createFocusWalker(container) {
  return document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      if (node.tabIndex >= 0 && !node.disabled) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_SKIP;
    },
  });
}

function createFocusScope(root) {
  const focusScope = {
    getFirstDescendant() {
      const walker = createFocusWalker(root.current);
      return walker.firstChild();
    },
    focusFirstDescendant() {
      const walker = createFocusWalker(root.current);
      const firstChild = walker.firstChild();
      if (firstChild) {
        focus(firstChild);
      }
    },
    focusLastDescendant() {
      const walker = createFocusWalker(root.current);
      const lastChild = walker.lastChild();
      if (lastChild) {
        focus(lastChild);
      }
    },
  };

  return focusScope;
}

function useFocusScope(containerRef) {
  const focusScope = React.useRef(null);

  if (focusScope.current === null) {
    focusScope.current = createFocusScope(containerRef);
  }

  return focusScope;
}

function useRestoreFocus(container) {
  const containsFocus = React.useRef(false);

  React.useEffect(() => {
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
  }, []);
}

function useRefs(refs) {
  return React.useCallback((node) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref !== null && ref !== undefined) {
        ref.current = node;
      }
    });
  }, refs);
}

function useAutoFocus(getElementOrRef) {
  const callbackRef = React.useRef(getElementOrRef);

  React.useEffect(() => {
    if (callbackRef.current) {
      const elementOrRef = callbackRef.current();
      const element = elementOrRef.current || elementOrRef;
      if (element) {
        focus(element);
      }
    }
  }, []);
}

const FocusScope = React.forwardRef(function FocusScope(props, forwardRef) {
  const {
    as: BaseComponent = 'div',
    children,
    initialFocusRef,
    ...rest
  } = props;
  const containerRef = React.useRef(null);
  const focusScope = useFocusScope(containerRef);
  const ref = useRefs([forwardRef, containerRef]);

  useRestoreFocus(containerRef);
  useAutoFocus(() => {
    if (initialFocusRef) {
      return initialFocusRef;
    }
    return focusScope.current.getFirstDescendant();
  });

  return (
    <>
      <span
        data-dialog-bumper=""
        tabIndex="0"
        style={{
          outline: 'none',
          opacity: '0',
          position: 'fixed',
          pointerEvents: 'none',
        }}
        onFocus={() => {
          focusScope.current.focusLastDescendant();
        }}
      />
      <BaseComponent {...rest} ref={ref}>
        {children}
      </BaseComponent>
      <span
        data-dialog-bumper=""
        tabIndex="0"
        style={{
          outline: 'none',
          opacity: '0',
          position: 'fixed',
          pointerEvents: 'none',
        }}
        onFocus={() => {
          focusScope.current.focusFirstDescendant();
        }}
      />
    </>
  );
});

if (__DEV__) {
  FocusScope.displayName = 'FocusScope';
}

function focus(elementOrRef) {
  const element = elementOrRef.current || elementOrRef;
  if (element && element.focus && document.activeElement !== element) {
    element.focus();
  }
}

export { FocusScope };
