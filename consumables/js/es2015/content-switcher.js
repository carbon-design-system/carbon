import eventMatches from '../polyfills/event-matches';
import '../polyfills/array-from';
import '../polyfills/custom-event';
import '../polyfills/element-matches';
import '../polyfills/object-assign';
import toggleClass from '../polyfills/toggle-class';

export default class ContentSwitcher {
  /**
   * Set of content switcher buttons.
   * @implements Component
   * @param {HTMLElement} element The element working as a set of content switcher buttons.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorButton] The CSS selector to find switcher buttons.
   * @param {string} [options.selectorButtonSelected] The CSS selector to find the selected switcher button.
   * @param {string} [options.classActive] The CSS class for switcher button's selected state.
   * @param {string} [options.eventBeforeSelected]
   *   The name of the custom event fired before a switcher button is selected.
   *   Cancellation of this event stops selection of content switcher button.
   * @param {string} [options.eventAfterSelected] The name of the custom event fired after a switcher button is selected.
   */
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;

    this.options = Object.assign(Object.create(this.constructor.options), options);

    this.constructor.components.set(this.element, this);

    this.element.addEventListener('click', (event) => this.handleClick(event));

    [... element.querySelectorAll('input')].forEach((input) => {
      if (input.checked) this._changeActive(input);
    });
  }

  /**
   * Instantiates a set of content switcher buttons of the given element.
   * @param {HTMLElement} element The element working as a set of content switcher buttons.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorButton] The CSS selector to find switcher buttons.
   * @param {string} [options.selectorButtonSelected] The CSS selector to find the selected switcher button.
   * @param {string} [options.classActive] The CSS class for switcher button's selected state.
   * @param {string} [options.eventBeforeSelected]
   *   The name of the custom event fired before a switcher button is selected.
   *   Cancellation of this event stops selection of content switcher button.
   * @param {string} [options.eventAfterSelected] The name of the custom event fired after a switcher button is selected.
   */
  static create(element, options) {
    return this.components.get(element) || new this(element, options);
  }

  /**
   * Instantiates content switcher button sets in the given node.
   * If the given element indicates that it's an content switcher button set, instantiates it.
   * Otherwise, instantiates content switcher button sets by searching for content switcher button sets in the given node.
   * @param {Node} target The DOM node to instantiate content switcher button sets in. Should be a document or an element.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorInit] The CSS selector to find content switcher button set.
   * @param {string} [options.selectorButton] The CSS selector to find switcher buttons.
   * @param {string} [options.selectorButtonSelected] The CSS selector to find the selected switcher button.
   * @param {string} [options.classActive] The CSS class for switcher button's selected state.
   * @param {string} [options.eventBeforeSelected]
   *   The name of the custom event fired before a switcher button is selected.
   *   Cancellation of this event stops selection of content switcher button.
   * @param {string} [options.eventAfterSelected] The name of the custom event fired after a switcher button is selected.
   */
  static init(target = document, options = {}) {
    const effectiveOptions = Object.assign(Object.create(this.options), options);
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
      this.create(target, effectiveOptions);
    } else {
      [... document.querySelectorAll(effectiveOptions.selectorInit)].forEach(element => this.create(element, effectiveOptions));
    }
  }

  /**
   * Handles click on content switcher button set.
   * If the click is on a content switcher button, activates it.
   * @param {Event} event The event triggering this method.
   */
  handleClick(event) {
    const button = eventMatches(event, this.options.selectorButton);

    if (button) {
      this.setActive(button);
    }
  }

  /**
   * Internal method of {@linkcode ContentSwitcher#setActive .setActive()}, to select a content switcher button.
   * @private
   * @param {HTMLElement} item The button to be selected.
   */
  _changeActive(item) {
    // `options.selectorLink` is not defined in this class itself, code here primary is for inherited classes
    const itemLink = item.querySelector(this.options.selectorLink);
    if (itemLink) {
      [... this.element.querySelectorAll(this.options.selectorLink)].forEach((link) => {
        if (link !== itemLink) {
          link.setAttribute('aria-selected', 'false');
        }
      });
      itemLink.setAttribute('aria-selected', 'true');
    }

    const selectorButtons = [... this.element.querySelectorAll(this.options.selectorButton)];

    selectorButtons.forEach((button) => {
      if (button !== item) {
        toggleClass(button, this.options.classActive, false);
        [... button.ownerDocument.querySelectorAll(button.dataset.target)].forEach(element => element.setAttribute('hidden', ''));
      }
    });

    toggleClass(item, this.options.classActive, true);
    [... item.ownerDocument.querySelectorAll(item.dataset.target)].forEach(element => element.removeAttribute('hidden'));
  }

  /**
   * Error thrown when selection (upon clicking on a content switcher button, etc.) is canceled.
   * @typedef {Object} ContentSwitcher~cancelError
   * @property {boolean} canceled `true` always.
   * @property {boolean} item The content switcher button that was about to be selected.
   */

  /**
   * The callback called once switching is finished or is canceled.
   * @callback ContentSwitcher~setActiveCallback
   * @param {ContentSwitcher~cancelError} error Error thrown when selection (upon clicking on a content switcher button, etc.) is canceled.
   * @param {HTMLElement} item The newly selected button. `null` if when selection is canceled.
   */

  /**
   * Selects a content switcher button.
   * If the selected button has `data-target` attribute, DOM elements it points to as a CSS selector will be shown.
   * DOM elements associated with unselected buttons in the same way will be hidden.
   * @param {HTMLElement} item The button to be selected.
   * @param {ContentSwitcher~setActiveCallback} callback The callback called once selection is finished or is canceled.
   */
  setActive(item, callback) {
    const eventStart = new CustomEvent(this.options.eventBeforeSelected, {
      bubbles: true,
      cancelable: true,
      detail: { item },
    });

    // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
    if (this.element.dispatchEvent(eventStart)) {
      this._changeActive(item);
      this.element.dispatchEvent(new CustomEvent(this.options.eventAfterSelected, {
        bubbles: true,
        cancelable: true,
        detail: { item },
      }));
      if (callback) {
        callback(null, item);
      }
    } else {
      const error = new Error('Switching active item has been canceled.');
      error.canceled = true;
      error.item = item;
      if (callback) {
        callback(error);
      }
    }
  }

  release() {
    this.constructor.components.delete(this.element);
  }

  /**
   * The map associating DOM element and content switcher set instance.
   * @member ContentSwitcher.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode ContentSwitcher.create .create()}, or {@linkcode ContentSwitcher.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode ContentSwitcher.init .init()} works.
   * @member ContentSwitcher.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find content switcher button set.
   * @property {string} [selectorButton] The CSS selector to find switcher buttons.
   * @property {string} [selectorButtonSelected] The CSS selector to find the selected switcher button.
   * @property {string} [classActive] The CSS class for switcher button's selected state.
   * @property {string} [eventBeforeSelected]
   *   The name of the custom event fired before a switcher button is selected.
   *   Cancellation of this event stops selection of content switcher button.
   * @property {string} [eventAfterSelected] The name of the custom event fired after a switcher button is selected.
   */
  static options = {
    selectorInit: '[data-content-switcher]',
    selectorButton: 'input[type="radio"], .bx--content-switcher__btn',
    selectorButtonSelected: 'input[type="radio"].bx--content-switcher--selected',
    classActive: 'bx--content-switcher--selected',
    eventBeforeSelected: 'content-switcher-beingselected',
    eventAfterSelected: 'content-switcher-selected',
  };
}
