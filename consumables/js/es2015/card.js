import eventMatches from '../polyfills/event-matches';
import '../polyfills/array-from';
import '../polyfills/element-matches';
import '../polyfills/object-assign';
import '../polyfills/math-sign';

export default class Card {
  /**
   * The container for cards.
   * @implements Component
   * @param {HTMLElement} element The element working as a container.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorCard] The CSS selector to find cards.
   */
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }
    this.element = element;
    this.options = Object.assign(Object.create(this.constructor.options), options);
    this.constructor.components.set(this.element, this);
    this.element.addEventListener('keydown', (event) => this.cardKeyPress(event));
  }

  /**
   * Instantiates card container of the given element.
   * @param {HTMLElement} element The element working as a container.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorCard] The CSS selector to find cards.
   */
  static create(element, options) {
    return this.components.get(element) || new this(element, options);
  }

  /**
   * Instantiates card container in the given node.
   * If the given element indicates that it's an card container, instantiates it.
   * Otherwise, instantiates card containers by searching for card containers in the given node.
   * @param {Node} target The DOM node to instantiate card containers in. Should be a document or an element.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorInit] The CSS selector to find card containers.
   * @param {string} [options.selectorCard] The CSS selector to find cards.
   */
  static init(target = document, options = {}) {
    const effectiveOptions = Object.assign(Object.create(this.options), options);
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
      this.create(target, effectiveOptions);
    } else {
      [... target.querySelectorAll(effectiveOptions.selectorInit)].forEach(element => this.create(element, effectiveOptions));
    }
  }

  /**
   * Goes back/forward among cards,
   * right arrow key for going forward, left arrow key for going backward.
   * @param {Event} event The event triggering this method.
   */
  cardKeyPress(event) {
    const direction = {
      Left: -1,
      Right: 1,
      ArrowLeft: -1,
      ArrowRight: 1,
    }[event.key || event.keyIdentifier];
    const card = eventMatches(event, this.options.selectorCard);

    if (direction && card && card === document.activeElement) {
      const cards = [... this.element.querySelectorAll(this.options.selectorCard)];
      const nextIndex = Math.max(cards.indexOf(card) + direction, -1 /* For `card` not found in `cards` */);
      const nextIndexLooped = nextIndex >= 0 && nextIndex < cards.length ? nextIndex :
        nextIndex - Math.sign(nextIndex) * cards.length;
      cards[nextIndexLooped].focus();
    }
  }

  release() {
    this.constructor.components.delete(this.element);
  }
}

/**
 * The map associating DOM element and card list instance.
 * @type {WeakMap}
 */
Card.components = new WeakMap();

/**
 * The component options.
 * If `options` is specified in the constructor, {@linkcode Card.create .create()}, or {@linkcode Card.init .init()},
 * properties in this object are overriden for the instance being create and how {@linkcode Card.init .init()} works.
 * @property {string} selectorInit The CSS selector to find card containers.
 * @property {string} [selectorCard] The CSS selector to find cards.
 */
Card.options = {
  selectorInit: '[data-card-list]',
  selectorCard: '.bx--card',
};
