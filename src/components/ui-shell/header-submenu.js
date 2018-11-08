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
  handleBlur() {
    const trigger = this.element.querySelector(this.options.selectorTrigger);
    if (trigger) {
      trigger.setAttribute(this.options.attribExpanded, false);
    }
  }

  /**
   * Handles keydown event.
   * @param {Event} event The event triggering this method.
   */
  _handleKeyDown(event) {
    const isOpen = this.element.classList.contains(this.options.classOpen);
    const direction = {
      38: this.constructor.NAVIGATE.BACKWARD,
      40: this.constructor.NAVIGATE.FORWARD,
    }[event.which];
    if (isOpen && direction !== undefined) {
      this.navigate(direction);
      event.preventDefault(); // Prevents up/down keys from scrolling container
    } else {
      this._toggle(event);
    }
  }

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
}
