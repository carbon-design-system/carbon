import warning from 'warning';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventMatches from '../../globals/js/misc/event-matches';

let didWarnAboutDeprecation = false;

class Card extends mixin(createComponent, initComponentBySearch) {
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
    this.element.addEventListener('keydown', event => {
      this._cardKeyPress(event);
    });
    if (__DEV__) {
      warning(
        didWarnAboutDeprecation,
        'Accessing the `card` component from the `carbon-components` package ' +
          'is deprecated. Use the `carbon-addons-bluemix` package instead.'
      );
      didWarnAboutDeprecation = true;
    }
  }

  /**
   * Goes back/forward among cards,
   * right arrow key for going forward, left arrow key for going backward.
   * @param {Event} event The event triggering this method.
   */
  _cardKeyPress(event) {
    const direction = {
      37: this.constructor.NAVIGATE.BACKWARD,
      39: this.constructor.NAVIGATE.FORWARD,
    }[event.which];
    const card = eventMatches(event, this.options.selectorCard);

    if (direction && card && card === document.activeElement) {
      const cards = [...this.element.querySelectorAll(this.options.selectorCard)];
      const nextIndex = Math.max(cards.indexOf(card) + direction, -1 /* For `card` not found in `cards` */);
      const nextIndexLooped =
        nextIndex >= 0 && nextIndex < cards.length ? nextIndex : nextIndex - Math.sign(nextIndex) * cards.length;
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

  /**
   * Enum for navigating backward/forward.
   * @readonly
   * @member Card.NAVIGATE
   * @type {Object}
   * @property {number} BACKWARD Navigating backward.
   * @property {number} FORWARD Navigating forward.
   */
  static NAVIGATE = {
    BACKWARD: -1,
    FORWARD: 1,
  };
}

export default Card;
