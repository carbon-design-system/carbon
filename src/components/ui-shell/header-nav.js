import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import handles from '../../globals/js/mixins/handles';
import on from '../../globals/js/misc/on';
import settings from '../../globals/js/settings';
import HeaderSubmenu from './header-submenu';

export default class HeaderNav extends mixin(createComponent, initComponentBySearch, handles) {
  constructor(element, options) {
    super(element, options);
    this.manage(on(this.element, 'keydown', this._handleKeyDown));
  }
  /**
   * The map associating DOM element and Header instance.
   * @member HeaderNav.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * @returns {Element} Currently highlighted element.
   */
  getCurrentNavigation = () => {
    const activeElement = this.element.ownerDocument.activeElement;
    if (!activeElement) {
      return null;
    }
    const focused = activeElement.closest(this.options.selectorSubmenu);
    if (activeElement.matches(this.options.selectorNavAnchor) && !focused) {
      return activeElement;
    }
    if (focused && focused.nodeType === Node.ELEMENT_NODE) {
      return focused.querySelector(this.options.selectorSubmenuLink);
    }
    return null;
  };

  /**
   * Gets the next focusable element
   * @param {Object} options
   * @param {Element} options.start The element from which focus is moving away
   * @param {number} options.direction The direction of navigating.
   * @returns {Element} The element to which focus is moving
   */
  getNextFocusTarget = ({ start, direction }) => {
    const items = [...this.element.querySelectorAll(this.options.selectorTopLevelNavAnchor)];
    const handleUnderflow = (index, length) => index + (index >= 0 ? 0 : length);
    const handleOverflow = (index, length) => index - (index < length ? 0 : length);

    // `items.indexOf(start)` may be -1 (Scenario of no previous focus)
    const index = Math.max(items.indexOf(start) + direction, -1);
    return items[handleUnderflow(handleOverflow(index, items.length), items.length)];
  };

  /**
   * Handles keydown event.
   * @param {Event} event The event triggering this method.
   */
  _handleKeyDown = event => {
    const keyCodes = {
      37: this.constructor.NAVIGATE.BACKWARD, // left arrow
      39: this.constructor.NAVIGATE.FORWARD, // right arrow
    };
    const keyCodeMatches = keyCodes[event.which];
    if (!keyCodeMatches) {
      return;
    }
    const start = this.getCurrentNavigation();

    const nextFocusTarget = this.getNextFocusTarget({ start, direction: keyCodeMatches });
    const nextHeaderSubmenuDOMNode = nextFocusTarget.closest('[data-header-submenu]');
    if (!nextHeaderSubmenuDOMNode) {
      nextFocusTarget.focus();
      return;
    }
    const startHeaderSubmenuDOMNode = start.closest('[data-header-submenu]');
    if (!startHeaderSubmenuDOMNode) {
      nextFocusTarget.focus();
      return;
    }
    const startHeaderSubmenuClass = HeaderSubmenu.create(startHeaderSubmenuDOMNode);
    const menuPreviouslyOpen = startHeaderSubmenuClass.getCurrentState();
    if (!menuPreviouslyOpen) {
      nextFocusTarget.focus();
      return;
    }
    const nextHeaderSubmenuClass = HeaderSubmenu.create(nextHeaderSubmenuDOMNode);
    nextHeaderSubmenuClass.setState({ shouldBeExpanded: true, shouldFocusOnOpen: true });
  };

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode HeaderNav.create .create()}, or
   * {@linkcode HeaderNav.init .init()},
   * properties in this object are overriden for the instance being create and
   * how {@linkcode HeaderNav.init .init()} works.
   * @member HeaderNav.options
   * @type {Object}
   * @property {string} selectorInit The data attribute to find side navs.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-header-nav]',
      selectorNavKind: '[data-header-nav-kind]',
      selectorSubmenu: `.${prefix}--header__submenu`,
      selectorSubmenuLink: `.${prefix}--header__menu-title`,
      selectorSubmenuItem: `.${prefix}--header__menu-title > .${prefix}--header__menu-item`,
      selectorNavAnchor: `.${prefix}--header__menu-item`,
      selectorTopLevelNavAnchor: `.${prefix}--header__menu-bar > li > .${prefix}--header__menu-item`,
    };
  }

  /**
   * Enum for navigating backward/forward.
   * @readonly
   * @member Header.NAVIGATE
   * @type {Object}
   * @property {number} BACKWARD Navigating backward.
   * @property {number} FORWARD Navigating forward.
   */
  static NAVIGATE = {
    BACKWARD: -1,
    FORWARD: 1,
  };
}
