import eventMatches from '../polyfills/event-matches';
import on from '../misc/on';

export default class FabButton {
  /**
   * Floating action button.
   * @implements Component
   * @param {HTMLElement} element The element working as a floting action button.
   */
  constructor(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }
    this.element = element;

    this.constructor.components.set(this.element, this);

    element.addEventListener('click', (event) => this.toggle(event));
  }

  /**
   * Instantiates floating action buttons in the given element.
   * If the given element indicates that it's an floating action button (having `data-fab` attribute), instantiates it.
   * Otherwise, instantiates floating action buttons by clicking on floating action buttons in the given node.
   * @param {Node} target The DOM node to instantiate floating action buttons in. Should be a document or an element.
   * @returns {Handle} The handle to remove the event listener to handle clicking.
   */
  static init(target = document) {
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.fab !== undefined) {
      this.create(target);
    } else {
      return on(target, 'click', (event) => {
        const element = eventMatches(event, '[data-fab]');
        if (element && !this.components.has(element)) {
          this.create(element).toggle(event);
        }
      });
    }
  }

  /**
   * Toggles this floating action button.
   * @param {Event} event The event triggering this method.
   */
  toggle(event) {
    if (this.element.tagName === 'A') {
      event.preventDefault();
    }

    if (this.element.dataset.state === 'closed') {
      this.element.dataset.state = 'open';
    } else {
      this.element.dataset.state = 'closed';
    }
  }

  release() {
    this.constructor.components.delete(this.element);
  }

  /**
   * Instantiates floating action button of the given element.
   * @param {HTMLElement} element The element.
   */
  static create(element) {
    return this.components.get(element) || new this(element);
  }
}

/**
 * The map associating DOM element and floating action button instance.
 * @type {WeakMap}
 */
FabButton.components = new WeakMap();
