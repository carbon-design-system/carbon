import '../polyfills/array-from';
import '../polyfills/element-matches';
import '../polyfills/object-assign';
import '../polyfills/custom-event';
import eventMatches from '../polyfills/event-matches';

export default class HeaderNav {
  /**
   * Header with taxonomy menu.
   * @implements Component
   * @param {HTMLElement} element The element working as a taxonomy menu.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorTriggerLabel] The CSS selector to find the label for the selected menu item.
   * @param {string} [options.selectorMenu] The CSS selector to find the container of the menu items.
   * @param {string} [options.selectorItem] The CSS selector to find the menu items.
   * @param {string} [options.selectorItemLink] The CSS selector to find the link in the menu items.
   * @param {string} [options.selectorLabel] The CSS selector to find the label of the menu items.
   * @param {string} [options.classActive] The CSS class for the visible state.
   * @param {string} [options.eventBeforeShown]
   *   The name of the custom event fired before this taxonomy menu is shown.
   *   Cancellation of this event stops showing the taxonomy menu.
   * @param {string} [options.eventAfterShown] The name of the custom event fired after this taxonomy menu is shown.
   * @param {string} [options.eventBeforeHidden]
   *   The name of the custom event fired before this taxonomy menu is hidden.
   *   Cancellation of this event stops hiding the taxonomy menu.
   * @param {string} [options.eventAfterHidden] The name of the custom event fired after this taxonomy menu is hidden.
   * @param {string} [options.eventBeforeSelected]
   *   The name of the custom event fired before a menu item is selected.
   *   Cancellation of this event stops the selection.
   * @param {string} [options.eventAfterSelected] The name of the custom event fired after a menu item is selected.
   */
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;

    this.options = Object.assign(Object.create(this.constructor.options), options);

    this.constructor.components.set(this.element, this);

    this.menuNode = this.element.querySelector(this.options.selectorMenu);

    this.element.addEventListener('keydown', (event) => this.toggleNav(event));

    [... this.element.querySelectorAll(this.options.selectorItemLink)].forEach((item) => {
      item.addEventListener('click', (e) => this.select(e));
    });
  }

  /**
   * Instantiates taxonomy menus in the given element.
   * If the given element indicates that it's an taxonomy menu, instantiates it.
   * Otherwise, instantiates taxonomy menus by clicking on launcher buttons
   * (buttons with `data-nav-target` attribute) of taxonomy menus in the given node.
   * @implements Component
   * @param {Node} target The DOM node to instantiate taxonomy menus in. Should be a document or an element.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorInit] The CSS selector to find taxonomy menus.
   * @param {string} [options.attribInitTarget] The attribute name in the lancher buttons to find taxonomy menus.
   * @param {string} [options.selectorTriggerLabel] The CSS selector to find the label for the selected menu item.
   * @param {string} [options.selectorMenu] The CSS selector to find the container of the menu items.
   * @param {string} [options.selectorItem] The CSS selector to find the menu items.
   * @param {string} [options.selectorItemLink] The CSS selector to find the link in the menu items.
   * @param {string} [options.selectorLabel] The CSS selector to find the label of the menu items.
   * @param {string} [options.classActive] The CSS class for the visible state.
   * @param {string} [options.eventBeforeShown]
   *   The name of the custom event fired before this taxonomy menu is shown.
   *   Cancellation of this event stops showing the taxonomy menu.
   * @param {string} [options.eventAfterShown] The name of the custom event fired after this taxonomy menu is shown.
   * @param {string} [options.eventBeforeHidden]
   *   The name of the custom event fired before this taxonomy menu is hidden.
   *   Cancellation of this event stops hiding the taxonomy menu.
   * @param {string} [options.eventAfterHidden] The name of the custom event fired after this taxonomy menu is hidden.
   * @param {string} [options.eventBeforeSelected]
   *   The name of the custom event fired before a menu item is selected.
   *   Cancellation of this event stops the selection.
   * @param {string} [options.eventAfterSelected] The name of the custom event fired after a menu item is selected.
   * @returns {Handle} The handle to remove the event listener to handle clicking.
   */
  static init(target = document, options = {}) {
    const effectiveOptions = Object.assign(Object.create(this.options), options);
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
      this.create(target, effectiveOptions);
    } else {
      const handler = (event) => {
        const element = eventMatches(event, `[${effectiveOptions.attribInitTarget}]`);

        if (element) {
          const headerElements = [... element.ownerDocument.querySelectorAll(element.getAttribute(effectiveOptions.attribInitTarget))];
          if (headerElements.length > 1) {
            throw new Error('Target header must be unique.');
          }

          if (headerElements.length === 1) {
            if (element.tagName === 'A') {
              event.preventDefault();
            }
            this.create(headerElements[0], effectiveOptions).toggleNav(event);
          }
        }
      };

      target.addEventListener('click', handler);
      target.addEventListener('keydown', handler);

      return {
        release: () => {
          target.removeEventListener('keydown', handler);
          target.removeEventListener('click', handler);
        },
      };
    }
  }

  /**
   * Instantiates taxonomy menu of the given element.
   * @param {HTMLElement} element The element working as a taxonomy menu.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorTriggerLabel] The CSS selector to find the label for the selected menu item.
   * @param {string} [options.selectorMenu] The CSS selector to find the container of the menu items.
   * @param {string} [options.selectorItem] The CSS selector to find the menu items.
   * @param {string} [options.selectorItemLink] The CSS selector to find the link in the menu items.
   * @param {string} [options.selectorLabel] The CSS selector to find the label of the menu items.
   * @param {string} [options.classActive] The CSS class for the visible state.
   * @param {string} [options.eventBeforeShown]
   *   The name of the custom event fired before this taxonomy menu is shown.
   *   Cancellation of this event stops showing the taxonomy menu.
   * @param {string} [options.eventAfterShown] The name of the custom event fired after this taxonomy menu is shown.
   * @param {string} [options.eventBeforeHidden]
   *   The name of the custom event fired before this taxonomy menu is hidden.
   *   Cancellation of this event stops hiding the taxonomy menu.
   * @param {string} [options.eventAfterHidden] The name of the custom event fired after this taxonomy menu is hidden.
   * @param {string} [options.eventBeforeSelected]
   *   The name of the custom event fired before a menu item is selected.
   *   Cancellation of this event stops the selection.
   * @param {string} [options.eventAfterSelected] The name of the custom event fired after a menu item is selected.
   */
  static create(element, options) {
    return this.components.get(element) || new this(element, options);
  }

  /**
   * Shows/hides this taxonomy menu.
   * @param {Event} event The event triggering this function.
   */
  toggleNav(event) {
    const isActive = this.element.classList.contains(this.options.classActive);
    let add;
    if (event.type === 'click' || event.type === 'keydown' && event.which === 40) {
      // Toggle button or ESC key on nav
      add = !isActive;
    } else if (event.type === 'keydown' && event.which === 27) {
      // Down arrow on launch button
      add = false;
    } else {
      return;
    }

    const launchingElement = eventMatches(event, '[data-nav-target]') || event.currentTarget;
    if (launchingElement.tagName === 'A') {
      event.preventDefault();
    }

    const eventStart = new CustomEvent(this.options[add ? 'eventBeforeShown' : 'eventBeforeHidden'], {
      bubbles: true,
      cancelable: true,
      detail: { launchingElement: launchingElement },
    });
    const defaultNotPrevented = this.element.dispatchEvent(eventStart);

    if (add) {
      this.triggerNode = launchingElement;
      this.triggerLabelNode = this.triggerNode.querySelector(this.options.selectorTriggerLabel);
    }

    if (defaultNotPrevented) {
      this.element.classList[add ? 'add' : 'remove'](this.options.classActive);
      (this.element.classList.contains(this.options.classActive) ? this.menuNode : this.triggerNode).focus();
      this.element.dispatchEvent(new CustomEvent(this.options[add ? 'eventAfterShown' : 'eventAfterHidden'], {
        bubbles: true,
        cancelable: true,
        detail: { launchingElement: launchingElement },
      }));
    }
  }

  /**
   * Selects a menu item.
   * @param {Event} event The event triggering this function.
   */
  select(event) {
    const activatedElement = event.currentTarget;
    const eventStart = new CustomEvent(this.options.eventBeforeSelected, {
      bubbles: true,
      cancelable: true,
      detail: {
        initiatingEvent: event,
        itemElement: activatedElement,
      },
    });

    if (this.element.dispatchEvent(eventStart)) {
      [... this.element.querySelectorAll(this.options.selectorItem)].forEach((element) => {
        if (element.contains(activatedElement)) {
          element.classList.add('selected');
        } else if (element.classList.contains('selected')) {
          element.classList.remove('selected');
        }
      });
      activatedElement.classList.add('selected');
      if (this.triggerLabelNode) {
        this.triggerLabelNode.textContent = activatedElement.querySelector(this.options.selectorLabel).textContent;
      }
      this.element.dispatchEvent(new CustomEvent(this.options.eventAfterSelected, {
        bubbles: true,
        cancelable: true,
        detail: { itemElement: activatedElement },
      }));
    }
  }

  release() {
    this.constructor.components.delete(this.element);
  }

  /**
   * @deprecated
   */
  static hook() {
    console.warn('HeaderNav.hook() is deprecated. Use HeaderNav.init() instead.'); // eslint-disable-line no-console
  }
}

/**
 * The map associating DOM element and taxonomy menu instance.
 * @type {WeakMap}
 */
HeaderNav.components = new WeakMap();

/**
 * The component options.
 * If `options` is specified in the constructor, {@linkcode HeaderNav.create .create()}, or {@linkcode HeaderNav.init .init()},
 * properties in this object are overriden for the instance being create and how {@linkcode HeaderNav.init .init()} works.
 * @property {string} selectorInit The CSS selector to find taxonomy menus.
 * @property {string} attribInitTarget The attribute name in the lancher buttons to find taxonomy menus.
 * @property {string} [selectorTriggerLabel] The CSS selector to find the label for the selected menu item.
 * @property {string} [selectorMenu] The CSS selector to find the container of the menu items.
 * @property {string} [selectorItem] The CSS selector to find the menu items.
 * @property {string} [selectorItemLink] The CSS selector to find the link in the menu items.
 * @property {string} [selectorLabel] The CSS selector to find the label of the menu items.
 * @property {string} [classActive] The CSS class for the visible state.
 * @property {string} [eventBeforeShown]
 *   The name of the custom event fired before this taxonomy menu is shown.
 *   Cancellation of this event stops showing the taxonomy menu.
 * @property {string} [eventAfterShown] The name of the custom event fired after this taxonomy menu is shown.
 * @property {string} [eventBeforeHidden]
 *   The name of the custom event fired before this taxonomy menu is hidden.
 *   Cancellation of this event stops hiding the taxonomy menu.
 * @property {string} [eventAfterHidden] The name of the custom event fired after this taxonomy menu is hidden.
 * @property {string} [eventBeforeSelected]
 *   The name of the custom event fired before a menu item is selected.
 *   Cancellation of this event stops the selection.
 * @property {string} [eventAfterSelected] The name of the custom event fired after a menu item is selected.
 */
HeaderNav.options = {
  selectorInit: '[data-nav]',
  attribInitTarget: 'data-nav-target',
  selectorTriggerLabel: '.current-taxonomy',
  classActive: 'taxonomy-nav--active',
  selectorMenu: '.taxonomy-menu',
  selectorItem: '.taxonomy-item',
  selectorItemLink: '.taxonomy-item--taxonomy-menu',
  selectorLabel: '.taxonomy-item__label',
  eventBeforeShown: 'header-beingshown',
  eventAfterShown: 'header-shown',
  eventBeforeHidden: 'header-beinghidden',
  eventAfterHidden: 'header-hidden',
  eventBeforeSelected: 'header-beingselected',
  eventAfterSelected: 'header-selected',
};
