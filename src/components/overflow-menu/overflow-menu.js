import settings from '../../globals/js/settings';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventedShowHideState from '../../globals/js/mixins/evented-show-hide-state';
import handles from '../../globals/js/mixins/handles';
import FloatingMenu from '../floating-menu/floating-menu';
import getLaunchingDetails from '../../globals/js/misc/get-launching-details';
import on from '../../globals/js/misc/on';

/**
 * @param {Element} menuBody The menu body with the menu arrow.
 * @returns {FloatingMenu~offset} The adjustment of the floating menu position, upon the position of the menu arrow.
 * @private
 */
export const getMenuOffset = menuBody => {
  const menuWidth = menuBody.offsetWidth;
  const arrowStyle = menuBody.ownerDocument.defaultView.getComputedStyle(menuBody, ':before');
  const values = ['top', 'left', 'width', 'height', 'border-top-width'].reduce(
    (o, name) => ({
      ...o,
      [name]: Number((/^([\d-]+)px$/.exec(arrowStyle.getPropertyValue(name)) || [])[1]),
    }),
    {}
  );
  if (Object.keys(values).every(name => !isNaN(values[name]))) {
    const { top, left, width, height, 'border-top-width': borderTopWidth } = values;
    return {
      left: menuWidth / 2 - (left + Math.sqrt(width ** 2 + height ** 2) / 2),
      top: Math.sqrt(borderTopWidth ** 2 * 2) - top,
    };
  }
  return undefined;
};

class OverflowMenu extends mixin(createComponent, initComponentBySearch, eventedShowHideState, handles) {
  /**
   * Overflow menu.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a modal dialog.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorOptionMenu] The CSS selector to find the menu.
   * @param {string} [options.classShown] The CSS class for the shown state, for the trigger UI.
   * @param {string} [options.classMenuShown] The CSS class for the shown state, for the menu.
   * @param {string} [options.classMenuFlip] The CSS class for the flipped state of the menu.
   * @param {Object} [options.objMenuOffset] The offset locating the menu for the non-flipped state.
   * @param {Object} [options.objMenuOffsetFlip] The offset locating the menu for the flipped state.
   */
  constructor(element, options) {
    super(element, options);
    this.manage(
      on(this.element.ownerDocument, 'click', event => {
        this._handleDocumentClick(event);
        this.wasOpenBeforeClick = undefined;
      })
    );
    this.manage(
      on(this.element.ownerDocument, 'keypress', event => {
        this._handleKeyPress(event);
      })
    );
    this.manage(
      on(this.element, 'mousedown', () => {
        this.wasOpenBeforeClick = element.classList.contains(this.options.classShown);
      })
    );
  }

  /**
   * Changes the shown/hidden state.
   * @param {string} state The new state.
   * @param {Object} detail The detail of the event trigging this action.
   * @param {Function} callback Callback called when change in state completes.
   */
  changeState(state, detail, callback) {
    if (!this.optionMenu) {
      const optionMenu = this.element.querySelector(this.options.selectorOptionMenu);
      if (!optionMenu) {
        throw new Error('Cannot find the target menu.');
      }

      // Lazily create a component instance for menu
      this.optionMenu = FloatingMenu.create(optionMenu, {
        refNode: this.element,
        classShown: this.options.classMenuShown,
        classRefShown: this.options.classShown,
        offset: this.options.objMenuOffset,
      });
      this.children.push(this.optionMenu);
    }
    if (this.optionMenu.element.classList.contains(this.options.classMenuFlip)) {
      this.optionMenu.options.offset = this.options.objMenuOffsetFlip;
    }

    // Delegates the action of changing state to the menu.
    // (And thus the before/after shown/hidden events are fired from the menu)
    this.optionMenu.changeState(state, Object.assign(detail, { delegatorNode: this.element }), callback);
  }

  /**
   * Handles click on document.
   * @param {Event} event The triggering event.
   * @private
   */
  _handleDocumentClick(event) {
    const { element, optionMenu, wasOpenBeforeClick } = this;
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

    this.changeState(state, getLaunchingDetails(event), () => {
      if (state === 'hidden' && isOfMenu) {
        element.focus();
      }
    });
  }

  /**
   * Handles key press on document.
   * @param {Event} event The triggering event.
   * @private
   */
  _handleKeyPress(event) {
    const key = event.which;
    if (key === 13) {
      const { element, optionMenu, options } = this;
      const isOfSelf = element.contains(event.target);
      const isOfMenu = optionMenu && optionMenu.element.contains(event.target);
      const shouldBeOpen = isOfSelf && !element.classList.contains(options.classShown);
      const state = shouldBeOpen ? 'shown' : 'hidden';

      if (isOfSelf) {
        if (element.tagName === 'A') {
          event.preventDefault();
        }
        event.delegateTarget = element; // eslint-disable-line no-param-reassign
      }

      this.changeState(state, getLaunchingDetails(event), () => {
        if (state === 'hidden' && isOfMenu) {
          element.focus();
        }
      });
    }
  }

  static components = new WeakMap();

  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-overflow-menu]',
      selectorOptionMenu: `.${prefix}--overflow-menu-options`,
      classShown: `${prefix}--overflow-menu--open`,
      classMenuShown: `${prefix}--overflow-menu-options--open`,
      classMenuFlip: `${prefix}--overflow-menu--flip`,
      objMenuOffset: getMenuOffset,
      objMenuOffsetFlip: getMenuOffset,
    };
  }
}

export default OverflowMenu;
