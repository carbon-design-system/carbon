import eventMatches from '../polyfills/event-matches';
import '../polyfills/math-sign';

export default class Card {
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }
    this.element = element;
    this.options = Object.assign({
      selectorCard: '.bx--card',
    }, options);
    this.constructor.components.set(this.element, this);
    this.element.addEventListener('keydown', (event) => this.cardKeyPress(event));
  }

  static create(element, options) {
    return this.components.get(element) || new this(element, options);
  }

  static init(target = document, options) {
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.cardList !== undefined) {
      this.create(target, options);
    } else {
      [... target.querySelectorAll('[data-card-list]')].forEach(element => this.create(element, options));
    }
  }

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
}

Card.components = new WeakMap();
