export default class Card {
  constructor(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }
    this.element = element;
    this.constructor.components.set(this.element, this);
    this.element.setAttribute('aria-labelledby', '#card__title--' + Card.cards.indexOf(this.element));
    this.cardLocation = this.element.querySelector('.bx--about__title--name') || this.element.querySelector('.bx--overview__description');
    this.cardLocation.setAttribute('id', '#card__title--' + Card.cards.indexOf(this.element));
    this.element.addEventListener('keydown', (event) => this.cardKeyPress(event));
  }

  static create(element) {
    return this.components.get(element) || new this(element);
  }

  static init(target = document) {
    // const cardIndex = 0;
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.overflowMenu !== undefined) {
      this.create(target);
    } else {
      this.cards = [...document.querySelectorAll('.bx--card')];
      this.cards.forEach(element => this.create(element));
    }
  }

  cardKeyPress(event) {
    if (this.element === document.activeElement) {
      const direction = this.cardKeyboardNavigation(event);
      Card.cardIndex = Card.cards.indexOf(this.element) + direction;
      if (Card.cardIndex < 0) Card.cardIndex = Card.cards.length - 1;
      if (Card.cardIndex > Card.cards.length - 1) Card.cardIndex = 0;
      if (direction === 0) return;
      Card.cards[Card.cardIndex].focus();
    }
  }

  cardKeyboardNavigation(event) {
    const key = event.key || event.which;

    switch (key) {
      case 'ArrowLeft':
      case 37:
        event.preventDefault();
        return -1;
      case 'ArrowRight':
      case 39:
        event.preventDefault();
        return 1;
      default:
        return 0;
    }
  }
}

Card.components = new WeakMap();
Card.cards = [];
Card.cardIndex = 0;
