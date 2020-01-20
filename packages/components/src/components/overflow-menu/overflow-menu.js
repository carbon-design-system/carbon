/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '../../globals/js/settings';
import eventMatches from '../../globals/js/misc/event-matches';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventedShowHideState from '../../globals/js/mixins/evented-show-hide-state';
import handles from '../../globals/js/mixins/handles';
import FloatingMenu, {
  DIRECTION_TOP,
  DIRECTION_BOTTOM,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
} from '../floating-menu/floating-menu';
import getLaunchingDetails from '../../globals/js/misc/get-launching-details';
import on from '../../globals/js/misc/on';

/**
 * The CSS property names of the arrow keyed by the floating menu direction.
 * @type {object<string, string>}
 */
const triggerButtonPositionProps = /* #__PURE__ */ (() => ({
  [DIRECTION_TOP]: 'bottom',
  [DIRECTION_BOTTOM]: 'top',
  [DIRECTION_LEFT]: 'left',
  [DIRECTION_RIGHT]: 'right',
}))();

/**
 * Determines how the position of arrow should affect the floating menu position.
 * @type {object<string, number>}
 */
const triggerButtonPositionFactors = /* #__PURE__ */ (() => ({
  [DIRECTION_TOP]: -2,
  [DIRECTION_BOTTOM]: -1,
  [DIRECTION_LEFT]: -2,
  [DIRECTION_RIGHT]: -1,
}))();

/**
 * @param {Element} menuBody The menu body with the menu arrow.
 * @param {string} direction The floating menu direction.
 * @param {Element} trigger The trigger button.
 * @returns {FloatingMenu~offset} The adjustment of the floating menu position, upon the position of the menu arrow.
 * @private
 */
export const getMenuOffset = (menuBody, direction, trigger) => {
  const triggerButtonPositionProp = triggerButtonPositionProps[direction];
  const triggerButtonPositionFactor = triggerButtonPositionFactors[direction];
  if (!triggerButtonPositionProp || !triggerButtonPositionFactor) {
    console.warn('Wrong floating menu direction:', direction); // eslint-disable-line no-console
  }

  const menuWidth = menuBody.offsetWidth;
  const menuHeight = menuBody.offsetHeight;

  // eslint-disable-next-line no-use-before-define
  const menu = OverflowMenu.components.get(trigger);
  if (!menu) {
    throw new TypeError('Overflow menu instance cannot be found.');
  }
  const flip = menuBody.classList.contains(menu.options.classMenuFlip);

  if (
    triggerButtonPositionProp === 'top' ||
    triggerButtonPositionProp === 'bottom'
  ) {
    const triggerWidth = trigger.offsetWidth;
    return {
      left: (!flip ? 1 : -1) * (menuWidth / 2 - triggerWidth / 2),
      top: 0,
    };
  }

  if (
    triggerButtonPositionProp === 'left' ||
    triggerButtonPositionProp === 'right'
  ) {
    const triggerHeight = trigger.offsetHeight;
    return {
      left: 0,
      top: (!flip ? 1 : -1) * (menuHeight / 2 - triggerHeight / 2),
    };
  }

  return undefined;
};

class OverflowMenu extends mixin(
  createComponent,
  initComponentBySearch,
  eventedShowHideState,
  handles
) {
  /**
   * Overflow menu.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a modal dialog.
   * @param {object} [options] The component options.
   * @param {string} [options.selectorOptionMenu] The CSS selector to find the menu.
   * @param {string} [options.selectorTrigger] The CSS selector to find the trigger button.
   * @param {string} [options.classShown] The CSS class for the shown state, for the trigger UI.
   * @param {string} [options.classMenuShown] The CSS class for the shown state, for the menu.
   * @param {string} [options.classMenuFlip] The CSS class for the flipped state of the menu.
   * @param {object} [options.objMenuOffset] The offset locating the menu for the non-flipped state.
   * @param {object} [options.objMenuOffsetFlip] The offset locating the menu for the flipped state.
   */
  constructor(element, options) {
    super(element, options);

    if (this.element.getAttribute('role') !== 'button') {
      // Would prefer to use the aria-controls with a specific ID but we
      // don't have the menuOptions list at this point to pull the ID from
      this.triggerNode = this.element.querySelector(
        this.options.selectorTrigger
      );
    }
    this.manage(
      on(this.element.ownerDocument, 'click', event => {
        this._handleDocumentClick(event);
        this.wasOpenBeforeClick = undefined;
      })
    );
    this.manage(
      on(this.element.ownerDocument, 'keydown', event => {
        this._handleKeyPress(event);
      })
    );
    this.manage(
      on(this.element, 'mousedown', () => {
        this.wasOpenBeforeClick = element.classList.contains(
          this.options.classShown
        );
      })
    );
  }

  /**
   * Changes the shown/hidden state.
   * @param {string} state The new state.
   * @param {object} detail The detail of the event trigging this action.
   * @param {Function} callback Callback called when change in state completes.
   */
  changeState(state, detail, callback) {
    if (!this.optionMenu) {
      const optionMenu = this.element.querySelector(
        this.options.selectorOptionMenu
      );
      if (!optionMenu) {
        throw new Error('Cannot find the target menu.');
      }

      // Lazily create a component instance for menu
      this.optionMenu = FloatingMenu.create(optionMenu, {
        refNode: this.element,
        classShown: this.options.classMenuShown,
        classRefShown: this.options.classShown,
        offset: this.options.objMenuOffset,
        triggerNode: this.triggerNode,
        contentNode: this.element.querySelector(this.options.selectorContent),
      });
      this.children.push(this.optionMenu);
    }
    if (
      this.optionMenu.element.classList.contains(this.options.classMenuFlip)
    ) {
      this.optionMenu.options.offset = this.options.objMenuOffsetFlip;
    }

    // Delegates the action of changing state to the menu.
    // (And thus the before/after shown/hidden events are fired from the menu)
    this.optionMenu.changeState(
      state,
      Object.assign(detail, { delegatorNode: this.element }),
      callback
    );
  }

  /**
   * Handles click on document.
   * @param {Event} event The triggering event.
   * @private
   */
  _handleDocumentClick(event) {
    const { element, optionMenu, wasOpenBeforeClick, triggerNode } = this;
    const isOfSelf = element.contains(event.target);
    const isOfMenu = optionMenu && optionMenu.element.contains(event.target);
    const shouldBeOpen = isOfSelf && !wasOpenBeforeClick;
    const state = shouldBeOpen ? 'shown' : 'hidden';

    if (isOfSelf) {
      if (element.tagName === 'A') {
        event.preventDefault();
      }
      event.delegateTarget = element; // eslint-disable-line no-param-reassign
    }

    if (!isOfMenu || eventMatches(event, this.options.selectorItem)) {
      this.changeState(state, getLaunchingDetails(event), () => {
        if (state === 'hidden' && isOfMenu) {
          // @todo Can clean up to use `this.triggerNode` once non-compliant code is deprecated
          this[triggerNode ? 'triggerNode' : 'element'].focus();
        }
      });
    }
  }

  /**
   * Provides the element to move focus from
   * @returns {Element} Currently highlighted element.
   */
  getCurrentNavigation = () => {
    const focused = this.element.ownerDocument.activeElement;
    return focused.nodeType === Node.ELEMENT_NODE &&
      focused.matches(this.options.selectorItem)
      ? focused
      : null;
  };

  /**
   * Moves the focus up/down.
   * @param {number} direction The direction of navigating.
   */
  navigate = direction => {
    const items = [
      ...this.element.ownerDocument.querySelectorAll(this.options.selectorItem),
    ];
    const start =
      this.getCurrentNavigation() ||
      this.element.querySelector(this.options.selectorItemSelected);
    const getNextItem = old => {
      const handleUnderflow = (index, length) =>
        index + (index >= 0 ? 0 : length);
      const handleOverflow = (index, length) =>
        index - (index < length ? 0 : length);

      // `items.indexOf(old)` may be -1 (Scenario of no previous focus)
      const index = Math.max(items.indexOf(old) + direction, -1);
      return items[
        handleUnderflow(handleOverflow(index, items.length), items.length)
      ];
    };
    for (
      let current = getNextItem(start);
      current && current !== start;
      current = getNextItem(current)
    ) {
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
   * Handles key press on document.
   * @param {Event} event The triggering event.
   * @private
   */
  _handleKeyPress(event) {
    const key = event.which;
    const { element, optionMenu, options, triggerNode } = this;
    const isOfMenu = optionMenu && optionMenu.element.contains(event.target);
    const isExpanded = this.element.classList.contains(this.options.classShown);
    // @todo Can clean up to use `this.triggerNode` once non-compliant code is deprecated
    const triggerElement = triggerNode ? 'triggerNode' : 'element';

    switch (key) {
      // Enter || Space bar
      case 13:
      case 32: {
        if (
          !isExpanded &&
          this.element.ownerDocument.activeElement !== this.element
        ) {
          return;
        }
        const isOfSelf = element.contains(event.target);
        const shouldBeOpen =
          isOfSelf && !element.classList.contains(options.classShown);
        const state = shouldBeOpen ? 'shown' : 'hidden';

        if (isOfSelf) {
          event.delegateTarget = element; // eslint-disable-line no-param-reassign
          event.preventDefault(); // prevent scrolling
          this.changeState(state, getLaunchingDetails(event), () => {
            if (state === 'hidden' && isOfMenu) {
              this[triggerElement].focus();
            }
          });
        }
        break;
      }
      case 38: // up arrow
      case 40: // down arrow
        {
          if (!isExpanded) {
            return;
          }
          event.preventDefault(); // prevent scrolling
          const direction = {
            38: -1,
            40: 1,
          }[event.which];
          this.navigate(direction);
        }
        break;
      default:
        break;
    }
  }

  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-overflow-menu]',
      selectorOptionMenu: `.${prefix}--overflow-menu-options`,
      selectorTrigger: 'button[aria-haspopup]',
      selectorContent: `.${prefix}--overflow-menu-options__content`,
      selectorItem: `
        .${prefix}--overflow-menu-options--open
        .${prefix}--overflow-menu-options__option:not(.${prefix}--overflow-menu-options__option--disabled) >
        .${prefix}--overflow-menu-options__btn
      `,
      classShown: `${prefix}--overflow-menu--open`,
      classMenuShown: `${prefix}--overflow-menu-options--open`,
      classMenuFlip: `${prefix}--overflow-menu--flip`,
      objMenuOffset: getMenuOffset,
      objMenuOffsetFlip: getMenuOffset,
    };
  }
}

export default OverflowMenu;
