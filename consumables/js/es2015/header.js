import mixin from '../misc/mixin';
import createComponent from '../mixins/create-component';
import initComponent from '../mixins/init-component-by-launcher';
import eventedState from '../mixins/evented-state';
import '../polyfills/array-from';
import '../polyfills/element-matches';
import '../polyfills/object-assign';
import '../polyfills/custom-event';
import toggleClass from '../polyfills/toggle-class';
import eventMatches from '../polyfills/event-matches';

class HeaderNav extends mixin(createComponent, initComponent, eventedState) {
  /**
   * Header with taxonomy menu.
   * @deprecated
   * @extends CreateComponent
   * @extends InitComponentByLauncher
   * @extends EventedState
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
  constructor(element, options) {
    super(element, options);

    this.menuNode = this.element.querySelector(this.options.selectorMenu);

    this.element.addEventListener('keydown', (event) => { this.toggleNav(event); });

    [...this.element.querySelectorAll(this.options.selectorItemLink)].forEach((item) => {
      item.addEventListener('click', (e) => { this.select(e); });
    });
  }

  /**
   * A method called when this widget is created upon clicking on launcher button.
   * @param {Event} event The event triggering the creation.
   */
  createdByLauncher(event) {
    this.toggleNav(event);
  }

  /**
   * @param {string} state The new state.
   * @returns {boolean} `true` of the current state is different from the given new state.
   */
  shouldStateBeChanged(state) {
    return state !== (this.element.classList.contains(this.options.classActive) ? 'shown' : 'hidden');
  }

  /**
   * Changes the shown/hidden state.
   * @private
   * @param {string} state The new state.
   * @param {Object} detail The detail of the event trigging this action.
   * @param {EventedState~changeStateCallback} callback Callback called when change in state completes.
   */
  _changeState(state, detail, callback) {
    toggleClass(this.element, this.options.classActive, state === 'shown');
    callback();
  }

  /**
   * Shows/hides this taxonomy menu.
   * @param {Event} event The event triggering this function.
   */
  toggleNav(event) {
    const isActive = this.element.classList.contains(this.options.classActive);
    let add;
    if (event.type === 'click' || (event.type === 'keydown' && event.which === 40)) {
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

    if (add) {
      this.triggerNode = launchingElement;
      this.triggerLabelNode = this.triggerNode.querySelector(this.options.selectorTriggerLabel);
    }

    this.changeState(add ? 'shown' : 'hidden', { launchingElement }, (error) => {
      if (!error) {
        (this.element.classList.contains(this.options.classActive) ? this.menuNode : this.triggerNode).focus();
      }
    });
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
      [...this.element.querySelectorAll(this.options.selectorItem)].forEach((element) => {
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

  /**
   * @deprecated
   */
  static hook() {
    console.warn('HeaderNav.hook() is deprecated. Use HeaderNav.init() instead.'); // eslint-disable-line no-console
  }

  /**
   * The map associating DOM element and taxonomy menu instance.
   * @member HeaderNav.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode HeaderNav.create .create()}, or {@linkcode HeaderNav.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode HeaderNav.init .init()} works.
   * @member HeaderNav.options
   * @type {Object}
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
  static options = {
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
    initEventNames: ['click', 'keydown'],
  };
}

export default HeaderNav;
