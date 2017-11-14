import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentByLauncher from '../../globals/js/mixins/init-component-by-launcher';
import eventedShowHideState from '../../globals/js/mixins/evented-show-hide-state';
import eventMatches from '../../globals/js/misc/event-matches';
import on from '../../globals/js/misc/on';

class Modal extends mixin(createComponent, initComponentByLauncher, eventedShowHideState) {
  /**
   * Modal dialog.
   * @extends CreateComponent
   * @extends InitComponentByLauncher
   * @extends EventedShowHideState
   * @param {HTMLElement} element The element working as a modal dialog.
   * @param {Object} [options] The component options.
   * @param {string} [options.classVisible] The CSS class for the visible state.
   * @param {string} [options.eventBeforeShown]
   *   The name of the custom event fired before this modal is shown.
   *   Cancellation of this event stops showing the modal.
   * @param {string} [options.eventAfterShown]
   *   The name of the custom event telling that modal is sure shown
   *   without being canceled by the event handler named by `eventBeforeShown` option (`modal-beingshown`).
   * @param {string} [options.eventBeforeHidden]
   *   The name of the custom event fired before this modal is hidden.
   *   Cancellation of this event stops hiding the modal.
   * @param {string} [options.eventAfterHidden]
   *   The name of the custom event telling that modal is sure hidden
   *   without being canceled by the event handler named by `eventBeforeHidden` option (`modal-beinghidden`).
   */
  constructor(element, options) {
    super(element, options);
    this._hookCloseActions();
  }

  /**
   * A method that runs when `.init()` is called from `initComponentByLauncher`.
   * @param {Event} evt The event fired on the launcher button.
   */
  createdByLauncher(evt) {
    this.show(evt);
  }

  /**
   * Determines whether or not to emit events and callback function when `.changeState()` is called from `eventedState`.
   * @param {string} state The new state.
   * @returns {boolean} `true` if the given `state` is different from current state.
   */
  shouldStateBeChanged(state) {
    if (state === 'shown') {
      return !this.element.classList.contains(this.options.classVisible);
    }

    return this.element.classList.contains(this.options.classVisible);
  }

  /**
   * Changes the shown/hidden state.
   * @private
   * @param {string} state The new state.
   * @param {Function} callback Callback called when change in state completes.
   */
  _changeState(state, detail, callback) {
    const transitionEnd = () => {
      this.element.removeEventListener('transitionend', transitionEnd);
      if (state === 'shown' && this.element.offsetWidth > 0 && this.element.offsetHeight > 0) {
        (this.element.querySelector(this.options.selectorPrimaryFocus) || this.element).focus();
      }
      callback();
    };

    if (this._handleFocusinListener) {
      this._handleFocusinListener = this._handleFocusinListener.release();
    }

    if (state === 'shown') {
      const hasFocusin = 'onfocusin' in this.element.ownerDocument.defaultView;
      const focusinEventName = hasFocusin ? 'focusin' : 'focus';
      this._handleFocusinListener = on(this.element.ownerDocument, focusinEventName, this._handleFocusin, !hasFocusin);
    }

    if (state === 'hidden') {
      this.element.classList.toggle(this.options.classVisible, false);
    } else if (state === 'shown') {
      this.element.classList.toggle(this.options.classVisible, true);
    }
    this.element.addEventListener('transitionend', transitionEnd);
  }

  _hookCloseActions() {
    this.element.addEventListener('click', evt => {
      const closeButton = eventMatches(evt, this.options.selectorModalClose);
      if (closeButton) {
        evt.delegateTarget = closeButton; // eslint-disable-line no-param-reassign
      }
      if (closeButton || evt.target === this.element) {
        this.hide(evt);
      }
    });

    if (this.keydownHandler) {
      this.element.ownerDocument.body.removeEventListener('keydown', this.keydownHandler);
      this.keydownHandler = null;
    }

    this.keydownHandler = evt => {
      if (evt.which === 27) {
        this.hide(evt);
      }
    };

    this.element.ownerDocument.body.addEventListener('keydown', this.keydownHandler);
  }

  /**
   * Handles `focusin` (or `focus` depending on browser support of `focusin`) event to do wrap-focus behavior.
   * @param {Event} evt The event.
   * @private
   */
  _handleFocusin = evt => {
    if (
      this.element.classList.contains(this.options.classVisible) &&
      !this.element.contains(evt.target) &&
      this.options.selectorsFloatingMenus.every(selector => !eventMatches(evt, selector))
    ) {
      this.element.focus();
    }
  };

  release() {
    if (this.keydownHandler) {
      this.element.ownerDocument.body.removeEventListener('keydown', this.keydownHandler);
      this.keydownHandler = null;
    }
    if (this._handleFocusinListener) {
      this._handleFocusinListener = this._handleFocusinListener.release();
    }
    super.release();
  }

  /**
   * The map associating DOM element and modal instance.
   * @member Modal.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode Modal.create .create()}, or {@linkcode Modal.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode Modal.init .init()} works.
   * @member Modal.options
   * @type {Object}
   * @property {string} selectorInit The CSS class to find modal dialogs.
   * @property {string} attribInitTarget The attribute name in the launcher buttons to find target modal dialogs.
   * @property {string[]} [selectorsFloatingMenu]
   *   The CSS selectors of floating menus.
   *   Used for detecting if focus-wrap behavior should be disabled temporarily.
   * @property {string} [classVisible] The CSS class for the visible state.
   * @property {string} [classNoScroll] The CSS class for hiding scroll bar in body element while modal is shown.
   * @property {string} [eventBeforeShown]
   *   The name of the custom event fired before this modal is shown.
   *   Cancellation of this event stops showing the modal.
   * @property {string} [eventAfterShown]
   *   The name of the custom event telling that modal is sure shown
   *   without being canceled by the event handler named by `eventBeforeShown` option (`modal-beingshown`).
   * @property {string} [eventBeforeHidden]
   *   The name of the custom event fired before this modal is hidden.
   *   Cancellation of this event stops hiding the modal.
   * @property {string} [eventAfterHidden]
   *   The name of the custom event telling that modal is sure hidden
   *   without being canceled by the event handler named by `eventBeforeHidden` option (`modal-beinghidden`).
   */
  static options = {
    selectorInit: '[data-modal]',
    selectorModalClose: '[data-modal-close]',
    selectorPrimaryFocus: '[data-modal-primary-focus]',
    selectorsFloatingMenus: ['.bx--overflow-menu-options', '.bx-tooltip'],
    classVisible: 'is-visible',
    attribInitTarget: 'data-modal-target',
    initEventNames: ['click'],
    eventBeforeShown: 'modal-beingshown',
    eventAfterShown: 'modal-shown',
    eventBeforeHidden: 'modal-beinghidden',
    eventAfterHidden: 'modal-hidden',
  };
}

export default Modal;
