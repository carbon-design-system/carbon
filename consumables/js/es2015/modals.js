import mixin from '../misc/mixin';
import createComponent from '../mixins/create-component';
import initComponent from '../mixins/init-component-by-launcher';
import eventedState from '../mixins/evented-state';
import '../polyfills/array-from';
import '../polyfills/element-matches';
import '../polyfills/object-assign';
import '../polyfills/custom-event';
import toggleClass from '../polyfills/toggle-class';

/**
 * @param {Element} element The element to obtain transition duration from.
 * @returns {number} The transition duration of the given property set in the given element.
 */
function getTransitionDuration(element) {
  const computedStyle = element.ownerDocument.defaultView.getComputedStyle(element);
  const durations = computedStyle.transitionDuration.split(/,\s*/)
    .map(transitionDuration => parseFloat(transitionDuration))
    .filter(duration => !isNaN(duration));
  return durations.length > 0 ? Math.max(...durations) : 0;
}

class Modal extends mixin(createComponent, initComponent, eventedState) {
  /**
   * Modal dialog.
   * @extends CreateComponent
   * @extends InitComponentByLauncher
   * @extends EventedState
   * @param {HTMLElement} element The element working as a modal dialog.
   * @param {Object} [options] The component options.
   * @param {string} [options.classVisible] The CSS class for the visible state.
   * @param {string} [options.classNoScroll] The CSS class for hiding scroll bar in body element while modal is shown.
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
    this.hookCloseActions();
  }

  /**
   * A method called when this widget is created upon clicking on launcher button.
   * @param {Event} event The event triggering the creation.
   */
  createdByLauncher(event) {
    this.show(event);
  }

  /**
   * Adds event listeners for closing this dialog.
   */
  hookCloseActions() {
    this.element.addEventListener('click', (event) => {
      if (event.currentTarget === event.target) this.hide(event);
    });

    if (this.keydownHandler) {
      this.element.ownerDocument.body.removeEventListener('keydown', this.keydownHandler);
      this.keydownHandler = null;
    }

    this.keydownHandler = (event) => {
      if (event.which === 27) {
        this.hide(event);
      }
    };

    this.element.ownerDocument.body.addEventListener('keydown', this.keydownHandler);

    [...this.element.querySelectorAll('[data-modal-close]')].forEach((element) => {
      element.addEventListener('click', (event) => {
        this.hide(event);
      });
    });
  }

  /**
   * @param {string} state The new state.
   * @returns {boolean} `true` of the current state is different from the given new state.
   */
  shouldStateBeChanged(state) {
    return state !== (this.element.classList.contains(this.options.classVisible) ? 'shown' : 'hidden');
  }

  /**
   * Changes the shown/hidden state.
   * @private
   * @param {string} state The new state.
   * @param {Object} detail The detail of the event trigging this action.
   * @param {Function} callback Callback called when change in state completes.
   */
  _changeState(state, detail, callback) {
    let finished;
    const visible = state === 'shown';
    const finishedTransition = () => {
      if (!finished) {
        finished = true;
        this.element.removeEventListener('transitionend', finishedTransition);
        if (visible && this.element.offsetWidth > 0 && this.element.offsetHeight > 0) {
          // Sets focus to modal's container element so that hitting tab navigates user to first navigable element in modal.
          // Application can override this behavior by hooking to `modal-shown` event and setting focus to an element.
          // (e.g. default input box, default button)
          this.element.focus();
        }
        callback();
      }
    };

    this.element.addEventListener('transitionend', finishedTransition);
    const transitionDuration = getTransitionDuration(this.element);
    toggleClass(this.element, this.options.classVisible, visible);
    toggleClass(this.element.ownerDocument.body, this.options.classNoScroll, visible);
    if (transitionDuration === 0) {
      finishedTransition();
    }
  }

  /**
   * Shows this modal dialog.
   * @param {HTMLElement} [launchingElement] The DOM element that triggered calling this function.
   * @param {EventedState~changeStateCallback} [callback] The callback called once showing this dialog is finished or is canceled.
   */
  show(launchingElementOrEvent, callback) {
    const launchingElementOrEventOmitted = !launchingElementOrEvent || typeof launchingElementOrEvent === 'function';
    if (launchingElementOrEventOmitted) {
      callback = launchingElementOrEvent; // eslint-disable-line no-param-reassign
    }

    const launchingElement = launchingElementOrEventOmitted ? null :
      launchingElementOrEvent.delegateTarget || launchingElementOrEvent.currentTarget || launchingElementOrEvent;

    const launchingEvent = launchingElementOrEventOmitted ? null :
      launchingElementOrEvent.currentTarget && launchingElementOrEvent;

    if (launchingElement && !launchingElement.nodeType) {
      throw new TypeError('DOM Node should be given for launching element.');
    }

    if (launchingEvent && !launchingEvent.type) {
      throw new TypeError('DOM event should be given for launching event.');
    }

    this.changeState('shown', { launchingElement, launchingEvent }, callback);
  }

  /**
   * Hides this modal dialog.
   * @param {EventedState~changeStateCallback} [callback] The callback called once showing this dialog is finished or is canceled.
   */
  hide(launchingElementOrEvent, callback) {
    const launchingElementOrEventOmitted = !launchingElementOrEvent || typeof launchingElementOrEvent === 'function';
    if (launchingElementOrEventOmitted) {
      callback = launchingElementOrEvent; // eslint-disable-line no-param-reassign
    }

    const launchingElement = launchingElementOrEventOmitted ? null :
      launchingElementOrEvent.currentTarget || launchingElementOrEvent;

    const launchingEvent = launchingElementOrEventOmitted ? null :
      launchingElementOrEvent.currentTarget && launchingElementOrEvent;

    if (launchingElement && !launchingElement.nodeType) {
      throw new TypeError('DOM Node should be given for launching element.');
    }

    if (launchingEvent && !launchingEvent.type) {
      throw new TypeError('DOM event should be given for launching event.');
    }

    this.changeState('hidden', { launchingElement, launchingEvent }, callback);
  }

  release() {
    if (this.keydownHandler) {
      this.element.ownerDocument.body.removeEventListener('keydown', this.keydownHandler);
      this.keydownHandler = null;
    }
    super.release();
  }

  /**
   * @deprecated
   */
  static hook() {
    console.warn('Modals.hook() is deprecated. Use Modals.init() instead.'); // eslint-disable-line no-console
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
    attribInitTarget: 'data-modal-target',
    classVisible: 'is-visible',
    classNoScroll: 'bx--noscroll',
    eventBeforeShown: 'modal-beingshown',
    eventAfterShown: 'modal-shown',
    eventBeforeHidden: 'modal-beinghidden',
    eventAfterHidden: 'modal-hidden',
    initEventNames: ['click'],
  };
}

export default Modal;
