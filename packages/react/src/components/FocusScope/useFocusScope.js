/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useRef } from 'react';
import { focus } from '../../internal/focus';

export function useFocusScope(containerRef) {
  const focusScope = useRef(null);

  if (focusScope.current === null) {
    focusScope.current = createFocusScope(containerRef);
  }

  return focusScope;
}

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
