import mixin from '../misc/mixin';
import createComponent from '../mixins/create-component';
import initComponent from '../mixins/init-component-by-search';
import eventMatches from '../polyfills/event-matches';
import '../polyfills/array-from';
import '../polyfills/element-matches';
import '../polyfills/object-assign';
import '../polyfills/math-sign';

class Card extends mixin(createComponent, initComponent) {
  /**
   * The container for cards.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as a container.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorCard] The CSS selector to find cards.
   */
  constructor(element, options) {
    super(element, options);
    this.element.addEventListener('keydown', (event) => { this.cardKeyPress(event); });
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
      const cards = [...this.element.querySelectorAll(this.options.selectorCard)];
      const nextIndex = Math.max(cards.indexOf(card) + direction, -1 /* For `card` not found in `cards` */);
      const nextIndexLooped = nextIndex >= 0 && nextIndex < cards.length ? nextIndex :
        nextIndex - (Math.sign(nextIndex) * cards.length);
      cards[nextIndexLooped].focus();
    }
  }

  /**
   * The map associating DOM element and card list instance.
   * @member Card.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode Card.create .create()}, or {@linkcode Card.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode Card.init .init()} works.
   * @member Card.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find card containers.
   * @property {string} [selectorCard] The CSS selector to find cards.
   */
  static options = {
    selectorInit: '[data-card-list]',
    selectorCard: '.bx--card',
  };
}

export default Card;
