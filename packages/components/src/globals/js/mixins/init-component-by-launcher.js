/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import eventMatches from '../misc/event-matches';
import on from '../misc/on';

export default function(ToMix) {
  /**
   * Mix-in class to instantiate components events on launcher button.
   * @class InitComponentByLauncher
   */
  class InitComponentByLauncher extends ToMix {
    /**
     * `true` suggests that this component is lazily initialized upon an action/event, etc.
     * @type {boolean}
     */
    static forLazyInit /* #__PURE_CLASS_PROPERTY__ */ = true;

    /**
     * Instantiates this component in the given element.
     * If the given element indicates that it's an component of this class, instantiates it.
     * Otherwise, instantiates this component by clicking on launcher buttons
     * (buttons with attribute that `options.attribInitTarget` points to) of this component in the given node.
     * @param {Node} target The DOM node to instantiate this component in. Should be a document or an element.
     * @param {object} [options] The component options.
     * @param {string} [options.selectorInit] The CSS selector to find this component.
     * @param {string} [options.attribInitTarget] The attribute name in the launcher buttons to find target component.
     * @returns {Handle} The handle to remove the event listener to handle clicking.
     */
    static init(target = document, options = {}) {
      const effectiveOptions = Object.assign(
        Object.create(this.options),
        options
      );
      if (
        !target ||
        (target.nodeType !== Node.ELEMENT_NODE &&
          target.nodeType !== Node.DOCUMENT_NODE)
      ) {
        throw new TypeError(
          'DOM document or DOM element should be given to search for and initialize this widget.'
        );
      }
      if (
        target.nodeType === Node.ELEMENT_NODE &&
        target.matches(effectiveOptions.selectorInit)
      ) {
        this.create(target, options);
      } else {
        const handles = effectiveOptions.initEventNames.map(name =>
          on(target, name, event => {
            const launcher = eventMatches(
              event,
              `[${effectiveOptions.attribInitTarget}]`
            );

            if (launcher) {
              event.delegateTarget = launcher; // eslint-disable-line no-param-reassign
              const elements = launcher.ownerDocument.querySelectorAll(
                launcher.getAttribute(effectiveOptions.attribInitTarget)
              );
              if (elements.length > 1) {
                throw new Error('Target widget must be unique.');
              }

              if (elements.length === 1) {
                if (launcher.tagName === 'A') {
                  event.preventDefault();
                }

                const component = this.create(elements[0], options);
                if (typeof component.createdByLauncher === 'function') {
                  component.createdByLauncher(event);
                }
              }
            }
          })
        );
        return {
          release() {
            for (let handle = handles.pop(); handle; handle = handles.pop()) {
              handle.release();
            }
          },
        };
      }
      return '';
    }
  }
  return InitComponentByLauncher;
}
