import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventedShowHideState from '../../globals/js/mixins/evented-show-hide-state';
import FloatingMenu from '../floating-menu/floating-menu';
import getLaunchingDetails from '../../globals/js/misc/get-launching-details';
import on from '../../globals/js/misc/on';

class OverflowMenu extends mixin(createComponent, initComponentBySearch, eventedShowHideState) {
  /**
   * Overflow menu.
   * @extends CreateComponent
   * @extends InitComponentBySearch
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

    /**
     * The handle to release click event listener on document object.
     * @member {Handle}
     */
    this.hDocumentClick = on(this.element.ownerDocument, 'click', event => {
      this._handleDocumentClick(event);
    });

    /**
     * The handle to release keypress event listener on document object.
     * @member {Handle}
     */
    this.hDocumentKeyPress = on(this.element.ownerDocument, 'keypress', event => {
      this._handleKeyPress(event);
    });
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
    const element = this.element;
    const isOfSelf = element.contains(event.target);
    const shouldBeOpen = isOfSelf && !element.classList.contains(this.options.classShown);
    const state = shouldBeOpen ? 'shown' : 'hidden';

    if (isOfSelf) {
      if (element.tagName === 'A') {
        event.preventDefault();
      }
      event.delegateTarget = element; // eslint-disable-line no-param-reassign
    }

    this.changeState(state, getLaunchingDetails(event));
  }

  /**
   * Handles key press on document.
   * @param {Event} event The triggering event.
   * @private
   */
  _handleKeyPress(event) {
    const key = event.which;
    if (key === 13) {
      const element = this.element;
      const isOfSelf = element.contains(event.target);
      const shouldBeOpen = isOfSelf && !element.classList.contains(this.options.classShown);
      const state = shouldBeOpen ? 'shown' : 'hidden';

      if (isOfSelf) {
        if (element.tagName === 'A') {
          event.preventDefault();
        }
        event.delegateTarget = element; // eslint-disable-line no-param-reassign
      }

      this.changeState(state, getLaunchingDetails(event));
    }
  }

  release() {
    if (this.hDocumentClick) {
      this.hDocumentClick = this.hDocumentClick.release();
    }
    if (this.hDocumentKeyPress) {
      this.hDocumentKeyPress = this.hDocumentKeyPress.release();
    }
    super.release();
  }

  static components = new WeakMap();

  static options = {
    selectorInit: '[data-overflow-menu]',
    selectorOptionMenu: '.bx--overflow-menu-options',
    classShown: 'bx--overflow-menu--open',
    classMenuShown: 'bx--overflow-menu-options--open',
    classMenuFlip: 'bx--overflow-menu--flip',
    objMenuOffset: { top: 3, left: 61 },
    objMenuOffsetFlip: { top: 3, left: -61 },
  };
}

export default OverflowMenu;
