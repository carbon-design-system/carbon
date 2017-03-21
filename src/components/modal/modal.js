import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentByLauncher from '../../globals/js/mixins/init-component-by-launcher';
import eventedState from '../../globals/js/mixins/evented-state';
import eventMatches from '../../globals/js/misc/event-matches';

class Modal extends mixin(createComponent, initComponentByLauncher, eventedState) {
  /**
   * Modal dialog.
   * @extends CreateComponent
   * @extends InitComponentByLauncher
   * @extends EventedState
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

  // when .init() is called from initComponentByLauncher, run this method
  createdByLauncher(evt) {
    this.show(evt);
  }

  // when .changeState() is called from eventedState, determine whether or
  // not to emit events and callback function
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
        this.element.focus();
      }
      callback();
    };

    if (state === 'hidden') {
      this.element.classList.toggle(this.options.classVisible, false);
    } else if (state === 'shown') {
      this.element.classList.toggle(this.options.classVisible, true);
    }
    this.element.addEventListener('transitionend', transitionEnd);
  }

  _getLaunchingDetails(evt) {
    if (evt === null || evt === undefined || typeof evt === 'function') {
      return {
        launchingElement: null,
        launchingEvent: null,
      };
    }

    const launchingElement = evt.delegateTarget || evt.currentTarget || evt;
    const launchingEvent = evt.currentTarget && evt;

    if (launchingElement && !launchingElement.nodeType) {
      throw new TypeError('DOM Node should be given for launching element.');
    }

    if (launchingEvent && !launchingEvent.type) {
      throw new TypeError('DOM event should be given for launching event.');
    }

    return {
      launchingElement,
      launchingEvent,
    };
  }

  _hookCloseActions() {
    this.element.addEventListener('click', (evt) => {
      const closeButton = eventMatches(evt, this.options.selectorModalClose);
      if (closeButton || evt.target === this.element) {
        this.hide(evt);
      }
    });

    if (this.keydownHandler) {
      this.element.ownerDocument.body.removeEventListener('keydown', this.keydownHandler);
      this.keydownHandler = null;
    }

    this.keydownHandler = (evt) => {
      if (evt.which === 27) {
        this.hide(evt);
      }
    };

    this.element.ownerDocument.body.addEventListener('keydown', this.keydownHandler);
  }

  /**
   * Shows this modal dialog.
   */
  show(evt, callback) {
    if (!evt || typeof evt === 'function') {
      callback = evt; // eslint-disable-line no-param-reassign
    }

    const launchingDetails = this._getLaunchingDetails(evt);

    if (callback && typeof callback === 'function') {
      this.changeState('shown', launchingDetails, callback);
    } else {
      this.changeState('shown', launchingDetails);
    }
  }

  /**
   * Hides this modal dialog.
   */
  hide(evt, callback) {
    if (!evt || typeof evt === 'function') {
      callback = evt; // eslint-disable-line no-param-reassign
    }

    const launchingDetails = this._getLaunchingDetails(evt);

    if (callback && typeof callback === 'function') {
      this.changeState('hidden', launchingDetails, callback);
    } else {
      this.changeState('hidden', launchingDetails);
    }
  }

  release() {
    if (this.keydownHandler) {
      this.element.ownerDocument.body.removeEventListener('keydown', this.keydownHandler);
      this.keydownHandler = null;
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
