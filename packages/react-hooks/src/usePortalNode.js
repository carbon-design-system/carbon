/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef, useState } from 'react';

/**
 * @param {string?} id
 * @param {Function?} callback - run side-effects on the created node
 */
export function usePortalNode(id, callback) {
  const [portalNode, setPortalNode] = useState(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const [node, cleanup] = findOrCreateRoot(id);
    setPortalNode(node);

    if (savedCallback.current) {
      savedCallback.current(node);
    }

    return () => {
      cleanup();
      setPortalNode(null);
    };
  }, [id]);

  return portalNode;
}

const activePortals = new Map();

function findOrCreateRoot(id) {
  const node = findOrCreateNode(id);
  if (!id) {
    // eslint-disable-next-line no-inner-declarations
    function cleanup() {
      document.body.removeChild(node);
    }
    return [node, cleanup];
  }

  const currentPortalCount = activePortals.get(id) || 0;
  activePortals.set(id, currentPortalCount + 1);

  function cleanup() {
    const currentPortalCount = activePortals.get(id);
    if (currentPortalCount === 1) {
      document.body.removeChild(node);
      activePortals.delete(id);
    } else {
      activePortals.set(id, currentPortalCount - 1);
    }
  }

  return [node, cleanup];
}

function findOrCreateNode(id) {
  if (!id) {
    const node = document.createElement('div');
    document.body.appendChild(node);
    return node;
  }

  const existingNode = document.getElementById(id);
  if (existingNode) {
    return existingNode;
  }

  const node = document.createElement('div');
  node.id = id;
  document.body.appendChild(node);
  return node;
}
