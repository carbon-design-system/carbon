import '../polyfills/array-from';
import '../polyfills/element-matches';
import '../polyfills/object-assign';
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

  /**
   * Runs the state change handler associated with the given name, and fires events before/after that.
   * If the event before the state change handler runs is canceled, the state change handler won't run.
   * @param {string} name The name of change in state. The before/after event handlers will have its associated name.
   * @param {Element} element The DOM element triggering this change in state.
   * @param {Event} evt The event triggering this change in state.
   */
  emitEvent = (name, element, evt) => {
    const optionMenu = this.optionMenu;
    const detail = { element, optionMenu, evt };
    const capitalizedName = name[0].toUpperCase() + name.substr(1);

    const eventBefore = new CustomEvent(this.constructor.options[`eventBefore${capitalizedName}`], {
      bubbles: true,
      cancelable: true,
      detail,
    });

    const eventAfter = new CustomEvent(this.constructor.options[`eventAfter${capitalizedName}`], {
      bubbles: true,
      cancelable: true,
      detail,
    });

    const canceled = !this.element.dispatchEvent(eventBefore);

    if (!canceled) {
      this[this.constructor.actionHandlers[name]](detail);
      this.element.dispatchEvent(eventAfter);
    }
  }

  /**
   * Shows this overflow menu.
   */
  show() {
    this.optionMenu.classList.add('bx--overflow-menu--open');
    this.element.classList.add('bx--overflow-menu--open');
  }

  /**
   * Hides this overflow menu.
   */
  hide() {
    this.optionMenu.classList.remove('bx--overflow-menu--open');
    this.element.classList.remove('bx--overflow-menu--open');
  }

  handleDocumentClick(event) {
    const isOfSelf = this.element.contains(event.target);
    const shouldBeOpen = isOfSelf && !this.element.classList.contains('bx--overflow-menu--open');
    const eventName = shouldBeOpen ? 'shown' : 'hidden';

    if (isOfSelf && this.element.tagName === 'A') {
      event.preventDefault();
    }

    this.emitEvent(eventName, this.element, event);
  }

  handleKeyPress(event) {
    const key = event.key || event.which;
    if (key === 'Enter' || key === 13) {
      const isOfSelf = this.element.contains(event.target);
      const shouldBeOpen = isOfSelf && !this.element.classList.contains('bx--overflow-menu--open');
      const eventName = shouldBeOpen ? 'shown' : 'hidden';

      if (isOfSelf && this.element.tagName === 'A') {
        event.preventDefault();
      }

      this.emitEvent(eventName, this.element, event);
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
    eventBeforeShown: 'overflow-menu-beingshown',
    eventAfterShown: 'overflow-menu-shown',
    eventBeforeHidden: 'overflow-menu-beinghidden',
    eventAfterHidden: 'overflow-menu-hidden',
  };

  static actionHandlers = {
    shown: 'show',
    hidden: 'hide',
  };
}
