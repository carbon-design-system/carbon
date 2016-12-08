import '../polyfills/array-from';
import '../polyfills/element-matches';
import '../polyfills/object-assign';
import toggleClass from '../polyfills/toggle-class';
import on from '../misc/on';

export default class OverflowMenu {
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;
    this.options = Object.assign(Object.create(this.constructor.options), options);
    this.optionMenu = this.element.querySelector(this.options.selectorOptionMenu);
    this.constructor.components.set(this.element, this);

    /**
     * The handle to release click event listener on document object.
     * @member {Handle}
     */
    this.hDocumentClick = on(this.element.ownerDocument, 'click', (event) => this.handleDocumentClick(event));

    /**
     * The handle to release keypress event listener on document object.
     * @member {Handle}
     */
    this.hDocumentKeyPress = on(this.element.ownerDocument, 'keypress', (event) => this.handleKeyPress(event));
  }

  static create(element) {
    return this.components.get(element) || new this(element);
  }

  static init(target = document, options = {}) {
    const effectiveOptions = Object.assign(Object.create(this.options), options);
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
      this.create(target);
    } else {
      [... target.querySelectorAll(effectiveOptions.selectorInit)].forEach(element => this.create(element));
    }
  }

  emitEvent = (element, evt) => {
    const detail = {
      element,
      optionMenu: this.optionMenu,
      evt,
    };

    const eventAfter = new CustomEvent('overflow', {
      bubbles: true,
      cancelable: true,
      detail,
    });

    this.element.ownerDocument.dispatchEvent(eventAfter);
  }

  handleDocumentClick(event) {
    const isOfSelf = this.element.contains(event.target);
    const shouldBeOpen = isOfSelf && !this.element.classList.contains('bx--overflow-menu--open');

    if (isOfSelf && this.element.tagName === 'A') {
      event.preventDefault();
    }

    toggleClass(this.optionMenu, 'bx--overflow-menu--open', shouldBeOpen);
    toggleClass(this.element, 'bx--overflow-menu--open', shouldBeOpen);

    if (shouldBeOpen) {
      this.emitEvent(this.element, event);
    }
  }

  handleKeyPress(event) {
    const key = event.key || event.which;
    if (key === 'Enter' || key === 13) {
      const isOfSelf = this.element.contains(event.target);
      const shouldBeOpen = isOfSelf && !this.element.classList.contains('bx--overflow-menu--open');

      if (isOfSelf && this.element.tagName === 'A') {
        event.preventDefault();
      }

      if (shouldBeOpen) {
        this.emitEvent(this.element, event);
      }

      toggleClass(this.optionMenu, 'bx--overflow-menu--open', shouldBeOpen);
      toggleClass(this.element, 'bx--overflow-menu--open', shouldBeOpen);
    }
  }

  release() {
    if (this.hDocumentClick) {
      this.hDocumentClick = this.hDocumentClick.release();
    }
    if (this.hDocumentKeyPress) {
      this.hDocumentKeyPress = this.hDocumentKeyPress.release();
    }
    this.constructor.components.delete(this.element);
  }

  static components = new WeakMap();

  static options = {
    selectorInit: '[data-overflow-menu]',
    selectorOptionMenu: '.bx--overflow-menu__options',
  };
}
