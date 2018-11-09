import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import handles from '../../globals/js/mixins/handles';
import on from '../../globals/js/misc/on';
import settings from '../../globals/js/settings';
import trackBlur from '../../globals/js/mixins/track-blur';

const forEach = Array.prototype.forEach;

export default class HeaderSubmenu extends mixin(createComponent, initComponentBySearch, handles, trackBlur) {
  constructor(element, options) {
    super(element, options);
    this.manage(on(this.element.ownerDocument, 'click', this._handleClick));
    this.manage(on(this.element, 'keydown', this._handleKeyDown));
  }
  /**
   * The map associating DOM element and HeaderSubmenu instance.
   * @member HeaderSubmenu.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * Opens submenu on user click.
   * @param {Event} event The event triggering this method.
   */
  _handleClick = event => {
    const trigger = this.element.querySelector(this.options.selectorTrigger);
    if (!trigger) {
      return;
    }
    const isOfSelf = this.element.contains(event.target);
    const expanded = trigger.getAttribute(this.options.attribExpanded) === 'true';
    const shouldBeExpanded = isOfSelf && !expanded;
    if (Boolean(expanded) !== Boolean(shouldBeExpanded)) {
      trigger.setAttribute(this.options.attribExpanded, shouldBeExpanded);
    }

    forEach.call(this.element.querySelectorAll(this.options.selectorItem), item => {
      item.tabIndex = shouldBeExpanded ? 0 : -1;
    });
  };

  /**
   * Closes the menu if this component loses focus.
   */
  handleBlur = () => {
    const trigger = this.element.querySelector(this.options.selectorTrigger);
    if (trigger) {
      trigger.setAttribute(this.options.attribExpanded, false);
    }
  };

  /**
   * @returns {Element} Currently highlighted element.
   */
  getCurrentNavigation = () => {
    const focused = this.element.ownerDocument.activeElement;
    return focused.nodeType === Node.ELEMENT_NODE && focused.matches(this.options.selectorItem) ? focused : null;
  };

  /**
   * Moves the focus up/down.
   * @param {number} direction The direction of navigating.
   */
  navigate = direction => {
    const items = [...this.element.querySelectorAll(this.options.selectorItem)];
    const start = this.getCurrentNavigation() || this.element.querySelector(this.options.selectorItemSelected);
    const getNextItem = old => {
      const handleUnderflow = (index, length) => index + (index >= 0 ? 0 : length);
      const handleOverflow = (index, length) => index - (index < length ? 0 : length);

      // `items.indexOf(old)` may be -1 (Scenario of no previous focus)
      const index = Math.max(items.indexOf(old) + direction, -1);
      return items[handleUnderflow(handleOverflow(index, items.length), items.length)];
    };
    for (let current = getNextItem(start); current && current !== start; current = getNextItem(current)) {
      if (
        !current.matches(this.options.selectorItemHidden) &&
        !current.parentNode.matches(this.options.selectorItemHidden) &&
        !current.matches(this.options.selectorItemSelected)
      ) {
        current.focus();
        break;
      }
    }
  };

  /**
   * Handles keydown event.
   * @param {Event} event The event triggering this method.
   */
  _handleKeyDown = event => {
    const trigger = this.element.querySelector(this.options.selectorTrigger);
    if (!trigger) {
      return;
    }
    const expanded = trigger.getAttribute(this.options.attribExpanded) === 'true';
    if (expanded) {
      const direction = {
        38: this.constructor.NAVIGATE.BACKWARD,
        40: this.constructor.NAVIGATE.FORWARD,
      }[event.which];
      switch (event.which) {
        case 38: // up arrow
        case 40: // down arrow
          this.navigate(direction);
          event.preventDefault(); // Prevents up/down keys from scrolling container
          break;
        case 27: // Esc
          this.handleBlur();
          break;
        case 32: // space bar
          this._handleClick(event);
          break;
        default:
          break;
      }
      return;
    }
    switch (event.which) {
      case 32: // space bar
      case 40: // down arrow
        this._handleClick(event);
        break;
      default:
        break;
    }
  };

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode HeaderSubmenu.create .create()}, or
   * {@linkcode HeaderSubmenu.init .init()},
   * properties in this object are overriden for the instance being create and
   * how {@linkcode HeaderSubmenu.init .init()} works.
   * @member HeaderSubmenu.options
   * @type {Object}
   * @property {string} selectorInit The data attribute to find side navs.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-header-submenu]',
      selectorTrigger: `.${prefix}--header__menu-title`,
      selectorItem: `.${prefix}--header__menu .${prefix}--header__menu-item`,
      attribExpanded: 'aria-expanded',
    };
  }

  /**
   * Enum for navigating backward/forward.
   * @readonly
   * @member Dropdown.NAVIGATE
   * @type {Object}
   * @property {number} BACKWARD Navigating backward.
   * @property {number} FORWARD Navigating forward.
   */
  static NAVIGATE = {
    BACKWARD: -1,
    FORWARD: 1,
  };
}
