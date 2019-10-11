/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ReactDOM from 'react-dom';

const containers = new Set();

export function render(
  element,
  { container = document.createElement('div') } = {}
) {
  containers.add(container);
  document.body.appendChild(container);
  ReactDOM.render(element, container);
  return {
    container,
    rerender() {
      ReactDOM.render(element, container);
    },
  };
}

export function cleanup() {
  for (const node of containers) {
    ReactDOM.unmountComponentAtNode(node);
    node.parentNode.removeChild(node);
    containers.delete(node);
  }
}
