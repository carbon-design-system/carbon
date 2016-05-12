import eventMatches from '../polyfills/event-matches';
import '../polyfills/array-from';
import '../polyfills/object-assign';

function toggleClass(element, name, add) {
  if (element.classList.contains(name) === !add) {
    element.classList[add ? 'add' : 'remove'](name);
  }
}

export default class ContentSwitcher {
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;

    this.options = Object.assign({
      selectorButton: 'input[type="radio"]',
      selectorButtonSelected: 'input[type="radio"].bx--content-switcher--selected',
      classActive: 'bx--content-switcher--selected',
      eventBeforeSelected: 'content-switcher-beingselected',
      eventAfterSelected: 'content-switcher-selected',
    }, options);

    this.constructor.components.set(this.element, this);

    this.element.addEventListener('click', (event) => this.handleClick(event));
  }

  static init(options) {
    [... document.querySelectorAll('[data-content-switcher]')].forEach(element => this.create(element, options));
  }

  handleClick(event) {
    const button = eventMatches(event, this.options.selectorButton);
    if (button) {
      this.setActive(button);
    }
  }

  _changeActive(item) {
    // `options.selectorLink` is not defined in this class itself, code here primary is for inherited classes
    const itemLink = item.querySelector(this.options.selectorLink);
    if (itemLink) {
      [... this.element.querySelectorAll(this.options.selectorLink)].forEach((link) => {
        if (link !== itemLink) {
          link.setAttribute('aria-selected', 'false');
        }
      });
      itemLink.setAttribute('aria-selected', 'true');
    }

    [... this.element.querySelectorAll(this.options.selectorButton)].forEach((button) => {
      if (button !== item) {
        toggleClass(button, this.options.classActive, false);
        [... button.ownerDocument.querySelectorAll(button.dataset.target)].forEach(element => {
          toggleClass(element, this.options.classActive, false);
          element.setAttribute('aria-hidden', 'true');
        });
      }
    });
    toggleClass(item, this.options.classActive, true);
    [... item.ownerDocument.querySelectorAll(item.dataset.target)].forEach(element => {
      toggleClass(element, this.options.classActive, true);
      element.setAttribute('aria-hidden', 'false');
    });
  }

  setActive(item, callback) {
    const eventStart = new CustomEvent(this.options.eventBeforeSelected, {
      bubbles: true,
      cancelable: true,
      detail: { item },
    });

    // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
    if (this.element.dispatchEvent(eventStart)) {
      this._changeActive(item);
      this.element.dispatchEvent(new CustomEvent(this.options.eventAfterSelected, {
        bubbles: true,
        cancelable: true,
        detail: { item },
      }));
      if (callback) {
        callback(null, item);
      }
    } else {
      const error = new Error('Switching active item has been canceled.');
      error.canceled = true;
      error.item = item;
      if (callback) {
        callback(error);
      }
    }
  }

  release() {
    this.constructor.components.delete(this.element);
  }

  static create(element, options) {
    return this.components.get(element) || new this(element, options);
  }
}

ContentSwitcher.components = new WeakMap();
