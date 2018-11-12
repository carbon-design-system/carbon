import NavigationMenuPanel from './navigation-menu-panel';
import settings from '../../globals/js/settings';

export default class ProductSwitcher extends NavigationMenuPanel {
  /**
   * id of currently active trigger button
   * @type {string}
   */
  current = '';
  /**
   * A magic string indicting that no product switcher should be selected.
   * @type {string}
   */
  static SELECT_NONE = '__carbon-product-switcher-launcher-NONE';
  /**
   * The list of the IDs of the trigger buttons that have been used.
   * @type {Set}
   */
  triggerButtonIds = new Set();

  createdByLauncher = event => {
    const isExpanded = this.element.classList.contains(this.options.classProductSwitcherExpanded);
    const launcher = event.delegateTarget;
    if (!launcher.id) {
      launcher.id = `__carbon-product-switcher-launcher-${Math.random()
        .toString(36)
        .substr(2)}`;
    }
    const current = launcher.id;
    this.changeState(isExpanded && this.current === current ? this.constructor.SELECT_NONE : current);
  };

  /**
   *
   * @param {string} current
   * @returns {boolean} true if given state is different from current state
   */
  shouldStateBeChanged = current => this.current !== current;

  /**
   * Changes the expanded/collapsed state.
   * @private
   * @param {string} state The new state.
   * @param {Function} callback Callback called when change in state completes.
   */
  _changeState = (state, callback) => {
    this.element.classList.toggle(this.options.classProductSwitcherExpanded, state !== this.constructor.SELECT_NONE);
    this.current = state;
    if (this.current !== this.constructor.SELECT_NONE) {
      this.triggerButtonIds.add(this.current);
    }

    // deactivate all other trigger buttons
    this.triggerButtonIds.forEach(id => {
      const button = this.element.ownerDocument.getElementById(id);
      const label = button.getAttribute(this.options.attribLabelExpand);
      button.classList.remove(this.options.classNavigationMenuPanelHeaderActionActive);
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
    });

    // set active trigger button attributes
    const currentTriggerButton = this.element.ownerDocument.getElementById(this.current);
    if (currentTriggerButton) {
      const label = currentTriggerButton.getAttribute(this.options.attribLabelCollapse);
      currentTriggerButton.classList.toggle(this.options.classNavigationMenuPanelHeaderActionActive);
      currentTriggerButton.setAttribute('aria-label', label);
      currentTriggerButton.setAttribute('title', label);
    }

    callback();
  };

  release() {
    this.triggerButtonIds.clear();
    return super.release();
  }

  /**
   * The map associating DOM element and ProductSwitcher instance.
   * @member ProductSwitcher.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode ProductSwitcher.create .create()}, or
   * {@linkcode ProductSwitcher.init .init()},
   * properties in this object are overriden for the instance being create and
   * how {@linkcode ProductSwitcher.init .init()} works.
   * @member ProductSwitcher.options
   * @type {Object}
   * @property {string} selectorInit The CSS class to find popup navs.
   * @property {string} attribInitTarget The attribute name in the
   * launcher buttons to find target popup nav.
   * @property {string[]} initEventNames The events that the component
   * will handles
   */
  static get options() {
    const { prefix } = settings;
    return Object.assign(Object.create(NavigationMenuPanel.options), {
      selectorInit: '[data-product-switcher]',
      attribInitTarget: 'data-product-switcher-target',
      classProductSwitcherExpanded: `${prefix}--panel--expanded`,
    });
  }
}
