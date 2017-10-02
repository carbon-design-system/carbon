import initCheckbox from '../../components/checkbox/checkbox';
import { componentClasses } from '../../index';

const forEach = Array.prototype.forEach;

const createAndReleaseComponentsUponDOMMutation = (records, componentClassesForWatchInit, options) => {
  records.forEach(record => {
    forEach.call(record.addedNodes, node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        componentClassesForWatchInit.forEach(Clz => {
          Clz.init(node, options);
        });
      }
    });
    forEach.call(record.removedNodes, node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        componentClasses.forEach(Clz => {
          if (node.matches(Clz.options.selectorInit)) {
            const instance = Clz.components.get(node);
            if (instance) {
              instance.release();
            }
          } else {
            forEach.call(node.querySelectorAll(Clz.options.selectorInit), element => {
              const instance = Clz.components.get(element);
              if (instance) {
                instance.release();
              }
            });
          }
        });
      }
    });
  });
};

/**
 * Automatically instantiates/destroys components in the given element, by watching for DOM additions/removals.
 * @param {Node} target The DOM node to instantiate components in. Should be a document or an element.
 * @param {Object} [options] The component options.
 * @returns {Handle} The handle to stop watching.
 */
export default function(target = document, options = {}) {
  if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
    throw new TypeError('DOM document or DOM element should be given to watch for DOM node to create/release components.');
  }

  const handles = componentClasses.map(Clz => Clz.init(target, options)).filter(Boolean);
  handles.push(initCheckbox());

  const componentClassesForWatchInit = componentClasses.filter(Clz => !Clz.forLazyInit);

  let observer = new MutationObserver(records => {
    createAndReleaseComponentsUponDOMMutation(records, componentClassesForWatchInit, options);
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
