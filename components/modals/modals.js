import '../../global/js/array-from';
import '../../global/js/object-assign';
import '../../global/js/custom-event';

export default class Modal {
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;
    this.id = element.getAttribute('data-modal-id');

    this.options = Object.assign({
      classVisible: 'modal-visible',
    }, options);

    Modal.components.push(this);

    this.hookCloseActions();
  }

  hookCloseActions() {
    this.element.addEventListener('click', (event) => {
      if (event.currentTarget === event.target) this.hide();
    });

    this.element.ownerDocument.body.addEventListener('keydown', (event) => {
      if (event.keyCode === 27 && this.element.ownerDocument === document) {
        this.hide();
      }
    });

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
        callback();
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
        callback();
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

  static hook(element, options) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    const modalElement = [... element.ownerDocument.querySelectorAll(`[data-modal-id="${element.getAttribute('data-modal-target')}"]`)];

    if (modalElement.length > 1) {
      throw new Error('data-modal-id must be unique.');
    }

    const modal = Modal.components.filter((modal) => modalElement[0] === modal.element)[0] || new Modal(modalElement[0], options);

    element.addEventListener('click', (event) => {
      if (event.currentTarget.tagName === 'A' || event.currentTarget.querySelector('a')) {
        event.preventDefault();
      }
      modal.show(event.currentTarget, () => {
        if (modal.element.offsetWidth > 0 && modal.element.offsetHeight > 0) {
          modal.element.focus();
        }
      });
    });

    return modal;
  }

  static getTarget(id) {
    return Modal.components.filter((modal) => modal.id === id)[0];
  }
}

Modal.components = [];
