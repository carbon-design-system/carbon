import '../polyfills/array-from';
import '../polyfills/object-assign';
import '../polyfills/custom-event';

export default class Modal {
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;

    this.options = Object.assign({
      classVisible: 'is-visible',
    }, options);

    this.constructor.components.set(this.element, this);

    this.hookCloseActions();
  }

  static init(target = document, options) {
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.modalTarget !== undefined) {
      this.hook(target, options);
    } else if (target.nodeType === Node.ELEMENT_NODE && target.dataset.modal !== undefined) {
      this.create(target, options);
    } else {
      [... target.querySelectorAll('[data-modal-target]')].forEach(element => this.hook(element, options));
      [... target.querySelectorAll('[data-modal]')].forEach(element => this.create(element, options));
    }
  }

  hookCloseActions() {
    this.element.addEventListener('click', (event) => {
      if (event.currentTarget === event.target) this.hide();
    });

    if (this.keydownHandler) {
      this.element.ownerDocument.body.removeEventListener('keydown', this.keydownHandler);
      this.keydownHandler = null;
    }

    this.keydownHandler = (event) => {
      if (event.which === 27) {
        this.hide();
      }
    };

    this.element.ownerDocument.body.addEventListener('keydown', this.keydownHandler);

    [... this.element.querySelectorAll('[data-modal-close]')].forEach((element) => {
      element.addEventListener('click', () => {
        this.hide();
      });
    });
  }

  _changeState(visible, callback) {
    let finished;
    const finishedTransition = () => {
      if (!finished) {
        finished = true;
        this.element.removeEventListener('transitionend', finishedTransition);
        callback();
      }
    };

    this.element.addEventListener('transitionend', finishedTransition);
    this.element.classList[visible ? 'add' : 'remove'](this.options.classVisible);
    const transitionDuration = parseFloat(this.element.ownerDocument.defaultView.getComputedStyle(this.element).transitionDuration);
    if (isNaN(transitionDuration) || transitionDuration === 0) {
      finishedTransition();
    }
  }

  show(launchingElement, callback) {
    if (typeof launchingElement === 'function') {
      callback = launchingElement; // eslint-disable-line no-param-reassign
      launchingElement = null; // eslint-disable-line no-param-reassign
    }

    if (launchingElement && !launchingElement.nodeType) {
      throw new TypeError('DOM Node should be given for launchingElement.');
    }

    if (this.element.classList.contains(this.options.classVisible)) {
      if (callback) {
        callback(null, true);
      }
      return;
    }

    const eventStart = new CustomEvent('modal-beingshown', {
      bubbles: true,
      cancelable: true,
      detail: { launchingElement: launchingElement },
    });

    // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
    if (this.element.dispatchEvent(eventStart)) {
      this._changeState(true, () => {
        this.element.dispatchEvent(new CustomEvent('modal-shown', {
          bubbles: true,
          cancelable: true,
          detail: { launchingElement: launchingElement },
        }));
        if (callback) {
          callback();
        }
      });
    } else {
      const error = new Error('Showing dialog has been canceled.');
      error.canceled = true;
      if (callback) {
        callback(error);
      }
    }
  }

  hide(callback) {
    if (!this.element.classList.contains(this.options.classVisible)) {
      if (callback) {
        callback(null, true);
      }
      return;
    }

    const eventStart = new CustomEvent('modal-beinghidden', {
      bubbles: true,
      cancelable: true,
    });

    // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
    if (this.element.dispatchEvent(eventStart)) {
      this._changeState(false, () => {
        this.element.dispatchEvent(new CustomEvent('modal-hidden'), {
          bubbles: true,
          cancelable: true,
        });
        if (callback) {
          callback();
        }
      });
    } else {
      const error = new Error('Hiding dialog has been canceled.');
      error.canceled = true;
      if (callback) {
        callback(error);
      }
    }
  }

  release() {
    if (this.keydownHandler) {
      this.element.ownerDocument.body.removeEventListener('keydown', this.keydownHandler);
      this.keydownHandler = null;
    }
    this.constructor.components.delete(this.element);
  }

  static create(element, options) {
    return this.components.get(element) || new this(element, options);
  }

  static hook(element, options) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    const modalElements = [... element.ownerDocument.querySelectorAll(element.getAttribute('data-modal-target'))];
    if (modalElements.length > 1) {
      throw new Error('Target modal must be unique.');
    }

    const modal = this.create(modalElements[0], options);

    element.addEventListener('click', (event) => {
      if (event.currentTarget.tagName === 'A') {
        event.preventDefault();
      }
      modal.show(event.currentTarget, (error, shownAlready) => {
        if (!error && !shownAlready && modal.element.offsetWidth > 0 && modal.element.offsetHeight > 0) {
          modal.element.focus();
        }
      });
    });

    return modal;
  }
}

Modal.components = new WeakMap();
