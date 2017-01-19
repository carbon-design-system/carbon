import mixin from '../misc/mixin';
import createComponent from '../mixins/create-component';
import initComponent from '../mixins/init-component-by-search';
import eventedState from '../mixins/evented-state';
import '../polyfills/array-from';
import '../polyfills/element-matches';
import '../polyfills/object-assign';
import toggleClass from '../polyfills/toggle-class';
import on from '../misc/on';

class OverflowMenu extends mixin(createComponent, initComponent, eventedState) {
  constructor(element, options) {
    super(element, options);

    this.optionMenu = this.element.querySelector(this.options.selectorOptionMenu);

    /**
     * The handle to release click event listener on document object.
     * @member {Handle}
     */
    this.hDocumentClick = on(this.element.ownerDocument, 'click', (event) => { this.handleDocumentClick(event); });

    /**
     * The handle to release keypress event listener on document object.
     * @member {Handle}
     */
    this.hDocumentKeyPress = on(this.element.ownerDocument, 'keypress', (event) => { this.handleKeyPress(event); });
  }

  /**
   * @param {string} state The new state.
   * @returns {boolean} `true` of the current state is different from the given new state.
   */
  shouldStateBeChanged(state) {
    return state !== (this.element.classList.contains('bx--overflow-menu--open') ? 'shown' : 'hidden');
  }

  /**
   * Changes the shown/hidden state.
   * @private
   * @param {string} state The new state.
   * @param {Object} detail The detail of the event trigging this action.
   * @param {Function} callback Callback called when change in state completes.
   */
  _changeState(state, detail, callback) {
    toggleClass(this.optionMenu, 'bx--overflow-menu--open', state === 'shown');
    toggleClass(this.element, 'bx--overflow-menu--open', state === 'shown');
    callback();
  }

  handleDocumentClick(event) {
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

  handleKeyPress(event) {
    const key = event.key || event.which;
    if (key === 'Enter' || key === 13) {
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
    super.release();
  }

  static components = new WeakMap();

  static options = {
    selectorInit: '[data-overflow-menu]',
    selectorOptionMenu: '.bx--overflow-menu__options',
    eventBeforeShown: 'overflow-menu-beingshown',
    eventAfterShown: 'overflow-menu-shown',
    eventBeforeHidden: 'overflow-menu-beinghidden',
    eventAfterHidden: 'overflow-menu-hidden',
  };
}

export default OverflowMenu;
