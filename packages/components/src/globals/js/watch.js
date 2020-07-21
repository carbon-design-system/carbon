/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as components from './components';

const { forEach } = Array.prototype;

const createAndReleaseComponentsUponDOMMutation = (
  records,
  componentClasses,
  componentClassesForWatchInit,
  options
) => {
  records.forEach((record) => {
    forEach.call(record.addedNodes, (node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        componentClassesForWatchInit.forEach((Clz) => {
          Clz.init(node, options);
        });
      }
    });
    forEach.call(record.removedNodes, (node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        componentClasses.forEach((Clz) => {
          if (node.matches(Clz.options.selectorInit)) {
            const instance = Clz.components.get(node);
            if (instance) {
              instance.release();
            }
          } else {
            forEach.call(
              node.querySelectorAll(Clz.options.selectorInit),
              (element) => {
                const instance = Clz.components.get(element);
                if (instance) {
                  instance.release();
                }
              }
            );
          }
        });
      }
    });
  });
};

/**
 * Automatically instantiates/destroys components in the given element, by watching for DOM additions/removals.
 * @param {Node} target The DOM node to instantiate components in. Should be a document or an element.
 * @param {object} [options] The component options.
 * @returns {Handle} The handle to stop watching.
 */
export default function (target = document, options = {}) {
  if (
    target.nodeType !== Node.ELEMENT_NODE &&
    target.nodeType !== Node.DOCUMENT_NODE
  ) {
    throw new TypeError(
      'DOM document or DOM element should be given to watch for DOM node to create/release components.'
    );
  }

  const componentClasses = Object.keys(components)
    .map((key) => components[key])
    .filter((component) => typeof component.init === 'function');

  const handles = componentClasses
    .map((Clz) => Clz.init(target, options))
    .filter(Boolean);

  const componentClassesForWatchInit = componentClasses.filter(
    (Clz) => !Clz.forLazyInit
  );

  let observer = new MutationObserver((records) => {
    createAndReleaseComponentsUponDOMMutation(
      records,
      componentClasses,
      componentClassesForWatchInit,
      options
    );
  });
  observer.observe(target, {
    childList: true,
    subtree: true,
  });
  return {
    release() {
      for (let handle = handles.pop(); handle; handle = handles.pop()) {
        handle.release();
      }
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    },
  };
}
