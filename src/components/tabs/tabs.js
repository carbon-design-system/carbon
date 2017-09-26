import eventMatches from '../../globals/js/misc/event-matches';
import ContentSwitcher from '../content-switcher/content-switcher';

class Tab extends ContentSwitcher {
  /**
   * Container of tabs.
   * @extends ContentSwitcher
   * @param {HTMLElement} element The element working as a container of tabs.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorMenu] The CSS selector to find the drop down menu used in narrow mode.
   * @param {string} [options.selectorTrigger] The CSS selector to find the button to open the drop down menu used in narrow mode.
   * @param {string} [options.selectorTriggerText]
   *   The CSS selector to find the element used in narrow mode showing the selected tab item.
   * @param {string} [options.selectorButton] The CSS selector to find tab containers.
   * @param {string} [options.selectorButtonSelected] The CSS selector to find the selected tab.
   * @param {string} [options.selectorLink] The CSS selector to find the links in tabs.
   * @param {string} [options.classActive] The CSS class for tab's selected state.
   * @param {string} [options.classHidden] The CSS class for the drop down menu's hidden state used in narrow mode.
   * @param {string} [options.eventBeforeSelected]
   *   The name of the custom event fired before a tab is selected.
   *   Cancellation of this event stops selection of tab.
   * @param {string} [options.eventAfterSelected] The name of the custom event fired after a tab is selected.
   */
  constructor(element, options) {
    super(element, options);

    this.element.addEventListener('keydown', event => {
      this._handleKeyDown(event);
    });

    const selected = this.element.querySelector(this.options.selectorButtonSelected);
    if (selected) {
      this._updateTriggerText(selected);
    }
  }

  /**
   * Internal method of {@linkcode Tab#setActive .setActive()}, to select a tab item.
   * @private
   * @param {Object} detail The detail of the event trigging this action.
   * @param {HTMLElement} detail.item The tab item to be selected.
   * @param {Function} callback Callback called when change in state completes.
   */
  _changeState(detail, callback) {
    super._changeState(detail, (error, ...data) => {
      if (!error) {
        this._updateTriggerText(detail.item);
      }
      callback(error, ...data);
    });
  }

  /**
   * Handles click on tab container.
   * * If the click is on a tab, activates it.
   * * If the click is on the button to open the drop down menu, does so.
   * @param {Event} event The event triggering this method.
   */
  _handleClick(event) {
    super._handleClick(event);
    const button = eventMatches(event, this.options.selectorButton);
    const trigger = eventMatches(event, this.options.selectorTrigger);
    if (button) {
      super._handleClick(event);
      this._updateMenuState();
    }
    if (trigger) {
      this._updateMenuState();
    }
  }

  /**
   * Handles arrow keys on tab container.
   * * Left keys are used to go to previous tab.
   * * Right keys are used to go to next tab.
   * @param {Event} event The event triggering this method.
   */
  _handleKeyDown(event) {
    const triggerNode = this.element.querySelector(this.options.selectorTrigger);
    if (triggerNode && triggerNode.offsetParent) {
      if (event.which === 13) {
        this._updateMenuState();
      }
    }

    const direction = {
      37: this.constructor.NAVIGATE.BACKWARD,
      39: this.constructor.NAVIGATE.FORWARD,
    }[event.which];

    if (direction) {
      const buttons = [...this.element.querySelectorAll(this.options.selectorButton)];
      const button = this.element.querySelector(this.options.selectorButtonSelected);
      const nextIndex = Math.max(buttons.indexOf(button) + direction, -1 /* For `button` not found in `buttons` */);
      const nextIndexLooped =
        nextIndex >= 0 && nextIndex < buttons.length ? nextIndex : nextIndex - Math.sign(nextIndex) * buttons.length;
      this.setActive(buttons[nextIndexLooped], (error, item) => {
        if (item) {
          const link = item.querySelector(this.options.selectorLink);
          if (link) {
            link.focus();
          }
        }
      });
      event.preventDefault();
    }
  }

  /**
   * Shows/hides the drop down menu used in narrow mode.
   */
  _updateMenuState() {
    const menu = this.element.querySelector(this.options.selectorMenu);
    if (menu) {
      menu.classList.toggle(this.options.classHidden);
    }
  }

  /**
   * Updates the text indicating the currently selected tab item.
   * @param {HTMLElement} target The newly selected tab item.
   */
  _updateTriggerText(target) {
    const triggerText = this.element.querySelector(this.options.selectorTriggerText);
    if (triggerText) {
      triggerText.textContent = target.textContent;
    }
  }

  /**
   * The map associating DOM element and tab container instance.
   * @member Tab.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode ContentSwitcher.create .create()}, or {@linkcode Tab.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode Tab.init .init()} works.
   * @member Tab.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find tab containers.
   * @property {string} [selectorMenu] The CSS selector to find the drop down menu used in narrow mode.
   * @property {string} [selectorTrigger] The CSS selector to find the button to open the drop down menu used in narrow mode.
   * @property {string} [selectorTriggerText]
   *   The CSS selector to find the element used in narrow mode showing the selected tab item.
   * @property {string} [selectorButton] The CSS selector to find tab containers.
   * @property {string} [selectorButtonSelected] The CSS selector to find the selected tab.
   * @property {string} [selectorLink] The CSS selector to find the links in tabs.
   * @property {string} [classActive] The CSS class for tab's selected state.
   * @property {string} [classHidden] The CSS class for the drop down menu's hidden state used in narrow mode.
   * @property {string} [eventBeforeSelected]
   *   The name of the custom event fired before a tab is selected.
   *   Cancellation of this event stops selection of tab.
   * @property {string} [eventAfterSelected] The name of the custom event fired after a tab is selected.
   */
  static options = Object.assign(Object.create(ContentSwitcher.options), {
    selectorInit: '[data-tabs]',
    selectorMenu: '.bx--tabs__nav',
    selectorTrigger: '.bx--tabs-trigger',
    selectorTriggerText: '.bx--tabs-trigger-text',
    selectorButton: '.bx--tabs__nav-item',
    selectorButtonSelected: '.bx--tabs__nav-item--selected',
    selectorLink: '.bx--tabs__nav-link',
    classActive: 'bx--tabs__nav-item--selected',
    classHidden: 'bx--tabs__nav--hidden',
    eventBeforeSelected: 'tab-beingselected',
    eventAfterSelected: 'tab-selected',
  });

  /**
   * Enum for navigating backward/forward.
   * @readonly
   * @member Tab.NAVIGATE
   * @type {Object}
   * @property {number} BACKWARD Navigating backward.
   * @property {number} FORWARD Navigating forward.
   */
  static NAVIGATE = {
    BACKWARD: -1,
    FORWARD: 1,
  };
}

export default Tab;
