import eventMatches from '../misc/event-matches';
import on from '../misc/on';

export default function(ToMix) {
  /**
   * Mix-in class to instantiate components upon events.
   * @class InitComponentByEvent
   */
  class InitComponentByEvent extends ToMix {
    /**
     * `true` suggests that this component is lazily initialized upon an action/event, etc.
     * @type {boolean}
     */
    static forLazyInit = true;

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
        // To work around non-bubbling `focus` event, use `focusin` event instead of it's available, and "capture mode" otherwise
        const hasFocusin = 'onfocusin' in (target.nodeType === Node.ELEMENT_NODE ? target.ownerDocument : target).defaultView;
        const handles = effectiveOptions.initEventNames.map(name => {
          const eventName = name === 'focus' && hasFocusin ? 'focusin' : name;
          return on(
            target,
            eventName,
            event => {
              const element = eventMatches(event, effectiveOptions.selectorInit);
              // Instantiated components handles events by themselves
              if (element && !this.components.has(element)) {
                const component = this.create(element, options);
                if (typeof component.createdByEvent === 'function') {
                  component.createdByEvent(event);
                }
              }
            },
            name === 'focus' && !hasFocusin
          );
        });
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
  return InitComponentByEvent;
}
