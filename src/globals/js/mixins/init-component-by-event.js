import eventMatches from '../polyfills/event-matches';
import on from '../misc/on';

export default function (ToMix) {
  /**
   * Mix-in class to instantiate components upon events.
   * @class InitComponentByEvent
   */
  class InitComponentByEvent extends ToMix {
    /**
     * Instantiates this component in the given element.
     * If the given element indicates that it's an component of this class, instantiates it.
     * Otherwise, instantiates this component by clicking on this component in the given node.
     * @param {Node} target The DOM node to instantiate this component in. Should be a document or an element.
     * @param {Object} [options] The component options.
     * @param {string} [options.selectorInit] The CSS selector to find this component.
     * @returns {Handle} The handle to remove the event listener to handle clicking.
     */
    static init(target = document, options = {}) {
      const effectiveOptions = Object.assign(Object.create(this.options), options);
      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
      }
      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
        this.create(target, options);
      } else {
        const handles = effectiveOptions.initEventNames.map(name => on(target, name, (event) => {
          const element = eventMatches(event, effectiveOptions.selectorInit);
          if (element && !this.components.has(element)) {
            const component = this.create(element, options);
            if (typeof component.createdByEvent === 'function') {
              component.createdByEvent(event);
            }
          }
        }));
        return {
          release() {
            for (let handle = handles.pop(); handle; handle = handles.pop()) {
              handle.release();
            }
          },
        };
      }
    }
  }
  return InitComponentByEvent;
}
