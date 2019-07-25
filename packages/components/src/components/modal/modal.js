/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import warning from 'warning';
import settings from '../../globals/js/settings';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentByLauncher from '../../globals/js/mixins/init-component-by-launcher';
import eventedShowHideState from '../../globals/js/mixins/evented-show-hide-state';
import handles from '../../globals/js/mixins/handles';
import eventMatches from '../../globals/js/misc/event-matches';
import on from '../../globals/js/misc/on';

class Modal extends mixin(
  createComponent,
  initComponentByLauncher,
  eventedShowHideState,
  handles
) {
  /**
   * Modal dialog.
   * @extends CreateComponent
   * @extends InitComponentByLauncher
   * @extends EventedShowHideState
   * @extends Handles
   * @param {HTMLElement} element The element working as a modal dialog.
   * @param {object} [options] The component options.
   * @param {string} [options.classVisible] The CSS class for the visible state.
   * @param {string} [options.classBody] The CSS class for `<body>` with open modal.
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
   * The handle for `focusin` event listener.
   * Used for "focus-wrap" feature.
   * @type {Handle}
   * @private
   */
  _handleFocusinListener;

  /**
   * The handle for `keydown` event listener.
   * Used for "close-on-escape-key" feature.
   * @type {Handle}
   * @private
   */
  _handleKeydownListener;

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
   * @param {object} detail The detail data to be included in the event that will be fired.
   * @param {Function} callback Callback called when change in state completes.
   */
  _changeState(state, detail, callback) {
    let handleTransitionEnd;
    const transitionEnd = () => {
      if (handleTransitionEnd) {
        handleTransitionEnd = this.unmanage(handleTransitionEnd).release();
      }
      if (
        state === 'shown' &&
        this.element.offsetWidth > 0 &&
        this.element.offsetHeight > 0
      ) {
        this.previouslyFocusedNode = this.element.ownerDocument.activeElement;
        const focusableItem =
          this.element.querySelector(this.options.selectorPrimaryFocus) ||
          this.element.querySelector(settings.selectorTabbable);
        focusableItem.focus();
        if (__DEV__) {
          warning(
            focusableItem,
            `Modals need to contain a focusable element by either using ` +
              `\`${this.options.selectorPrimaryFocus}\` or settings.selectorTabbable.`
          );
        }
      }
      callback();
    };

    if (this._handleFocusinListener) {
      this._handleFocusinListener = this.unmanage(
        this._handleFocusinListener
      ).release();
    }

    if (state === 'shown') {
      const hasFocusin = 'onfocusin' in this.element.ownerDocument.defaultView;
      const focusinEventName = hasFocusin ? 'focusin' : 'focus';
      this._handleFocusinListener = this.manage(
        on(
          this.element.ownerDocument,
          focusinEventName,
          this._handleFocusin,
          !hasFocusin
        )
      );
    }

    if (state === 'hidden') {
      this.element.classList.toggle(this.options.classVisible, false);
      this.element.ownerDocument.body.classList.toggle(
        this.options.classBody,
        false
      );
      if (this.options.selectorFocusOnClose || this.previouslyFocusedNode) {
        (
          this.element.ownerDocument.querySelector(
            this.options.selectorFocusOnClose
          ) || this.previouslyFocusedNode
        ).focus();
      }
    } else if (state === 'shown') {
      this.element.classList.toggle(this.options.classVisible, true);
      this.element.ownerDocument.body.classList.toggle(
        this.options.classBody,
        true
      );
    }
    handleTransitionEnd = this.manage(
      on(this.element, 'transitionend', transitionEnd)
    );
  }

  _hookCloseActions() {
    this.manage(
      on(this.element, 'click', evt => {
        const closeButton = eventMatches(evt, this.options.selectorModalClose);
        if (closeButton) {
          evt.delegateTarget = closeButton; // eslint-disable-line no-param-reassign
        }
        if (closeButton || evt.target === this.element) {
          this.hide(evt);
        }
      })
    );

    if (this._handleKeydownListener) {
      this._handleKeydownListener = this.unmanage(
        this._handleKeydownListener
      ).release();
    }

    this._handleKeydownListener = this.manage(
      on(this.element.ownerDocument.body, 'keydown', evt => {
        // Avoid running `evt.stopPropagation()` only when modal is shown
        if (evt.which === 27 && this.shouldStateBeChanged('hidden')) {
          evt.stopPropagation();
          this.hide(evt);
        }
      })
    );
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
      this.options.selectorsFloatingMenus.every(
        selector => !eventMatches(evt, selector)
      )
    ) {
      this.element.querySelector(settings.selectorTabbable).focus();
    }
  };

  /**
   * The map associating DOM element and modal instance.
   * @member Modal.components
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode Modal.create .create()}, or {@linkcode Modal.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode Modal.init .init()} works.
   * @member Modal.options
   * @type {object}
   * @property {string} selectorInit The CSS class to find modal dialogs.
   * @property {string} [selectorModalClose] The selector to find elements that close the modal.
   * @property {string} [selectorPrimaryFocus] The CSS selector to determine the element to put focus when modal gets open.
   * @property {string} [selectorFocusOnClose] The CSS selector to determine the element to put focus when modal closes.
   *   If undefined, focus returns to the previously focused element prior to the modal opening.
   * @property {string} attribInitTarget The attribute name in the launcher buttons to find target modal dialogs.
   * @property {string[]} [selectorsFloatingMenu]
   *   The CSS selectors of floating menus.
   *   Used for detecting if focus-wrap behavior should be disabled temporarily.
   * @property {string} [classVisible] The CSS class for the visible state.
   * @property {string} [classBody] The CSS class for `<body>` with open modal.
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
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-modal]',
      selectorModalClose: '[data-modal-close]',
      selectorPrimaryFocus: '[data-modal-primary-focus]',
      selectorsFloatingMenus: [
        `.${prefix}--overflow-menu-options`,
        `.${prefix}--tooltip`,
        '.flatpickr-calendar',
      ],
      classVisible: 'is-visible',
      classBody: `${prefix}--body--with-modal-open`,
      attribInitTarget: 'data-modal-target',
      initEventNames: ['click'],
      eventBeforeShown: 'modal-beingshown',
      eventAfterShown: 'modal-shown',
      eventBeforeHidden: 'modal-beinghidden',
      eventAfterHidden: 'modal-hidden',
    };
  }
}

export default Modal;
