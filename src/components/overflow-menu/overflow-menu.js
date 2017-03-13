import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventedState from '../../globals/js/mixins/evented-state';
import { initMenu, placeMenu } from '../../globals/js/misc/menu-placement';
import on from '../../globals/js/misc/on';

class OverflowMenu extends mixin(createComponent, initComponentBySearch, eventedState) {
  constructor(element, options) {
    super(element, options);

    this.optionMenu = this.element.querySelector(this.options.selectorOptionMenu);

    this.menuPlacementScope = this.element.ownerDocument.querySelector(this.options.selectorPlacementScope);

    initMenu(this.element, this.optionMenu, this.menuPlacementScope);

    this.resizeEvent = on(this.menuPlacementScope, 'resizeEvent', () => {
      placeMenu(this.element, this.optionMenu, this.options.objMenuOffset, this.options.menuDirection);
    });
    /**
     * The handle to release click event listener on document object.
     * @member {Handle}
     */
    this.hDocumentClick = on(this.element.ownerDocument, 'click', (event) => { this._handleDocumentClick(event); });

    /**
     * The handle to release keypress event listener on document object.
     * @member {Handle}
     */
    this.hDocumentKeyPress = on(this.element.ownerDocument, 'keypress', (event) => { this._handleKeyPress(event); });
  }

  /**
   * @param {string} state The new state.
   * @returns {boolean} `true` of the current state is different from the given new state.
   */
  shouldStateBeChanged(state) {
    return state !== (this.element.classList.contains('bx--overflow-menu--open') ? 'shown' : 'hidden');
  }

  /**
   * Checks if flip class is present if so use the flip offset option.
   * @private
   */
  _checkMenuFlip() {
    if (this.optionMenu.classList.contains('bx--overflow-menu--flip')) {
      this.options.objMenuOffset = this.options.objMenuOffsetFlip;
    }
  }
  /**
   * Changes the shown/hidden state.
   * @private
   * @param {string} state The new state.
   * @param {Object} detail The detail of the event trigging this action.
   * @param {Function} callback Callback called when change in state completes.
   */
  _changeState(state, detail, callback) {
    this.element.classList.toggle('bx--overflow-menu--open', state === 'shown');
    this.optionMenu.classList.toggle('bx--overflow-menu-options--open');
    this._checkMenuFlip();
    placeMenu(this.element, this.optionMenu, this.options.objMenuOffset, this.options.menuDirection);
    callback();
  }

  _handleDocumentClick(event) {
    const isOfSelf = this.element.contains(event.target);
    const shouldBeOpen = isOfSelf && !this.element.classList.contains('bx--overflow-menu--open');
    const state = shouldBeOpen ? 'shown' : 'hidden';

    if (isOfSelf && this.element.tagName === 'A') {
      event.preventDefault();
    }

    this.changeState(state, {
      element: this.element,
      optionMenu: this.optionMenu,
      evt: event,
    });
  }

  _handleKeyPress(event) {
    const key = event.which;
    if (key === 13) {
      const isOfSelf = this.element.contains(event.target);
      const shouldBeOpen = isOfSelf && !this.element.classList.contains('bx--overflow-menu--open');
      const state = shouldBeOpen ? 'shown' : 'hidden';

      if (isOfSelf && this.element.tagName === 'A') {
        event.preventDefault();
      }

      this.changeState(state, {
        element: this.element,
        optionMenu: this.optionMenu,
        evt: event,
      });
    }
  }

  release() {
    if (this.hDocumentClick) {
      this.hDocumentClick = this.hDocumentClick.release();
    }
    if (this.hDocumentKeyPress) {
      this.hDocumentKeyPress = this.hDocumentKeyPress.release();
    }
    if (this.resizeEvent) {
      this.resizeEvent = this.resizeEvent.release();
    }
    super.release();
  }

  static components = new WeakMap();

  static options = {
    selectorInit: '[data-overflow-menu]',
    selectorPlacementScope: 'body',
    selectorOptionMenu: '.bx--overflow-menu-options',
    eventBeforeShown: 'overflow-menu-beingshown',
    eventAfterShown: 'overflow-menu-shown',
    eventBeforeHidden: 'overflow-menu-beinghidden',
    eventAfterHidden: 'overflow-menu-hidden',
    objMenuOffset: { top: 3, left: 61 },
    objMenuOffsetFlip: { top: 3, left: -61 },
    menuDirection: 'bottom',
  };
}

export default OverflowMenu;
