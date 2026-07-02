/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createRoot } from 'react-dom/client';

const containers = new Set();

export function render(
  element,
  { container = document.createElement('div') } = {}
) {
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(element);
  containers.add({ container, root });
  return {
    container,
    rerender() {
      const root = createRoot(container);
      root.render(element);
    },
  };
}

export function cleanup() {
  for (const node of containers) {
    node.root.unmount();
    node.container.parentNode.removeChild(node);
    containers.delete(node);
  }
}
