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
      selectorButtonSelected: 'input[type="radio"].selected',
      classActive: 'selected',
      eventBeforeSelected: 'content-switcher-beingselected',
      eventAfterSelected: 'content-switcher-selected',
    }, options);

    this.constructor.components.set(this.element, this);

    [... this.element.querySelectorAll(this.options.selectorButton)].forEach((button) => {
      button.addEventListener('click', (event) => this.handleItemClick(event));
    });
  }

  static init(options) {
    [... document.querySelectorAll('[data-content-switcher]')].forEach(element => this.create(element, options));
  }

  handleItemClick(event) {
    this.setActive(event.currentTarget);
  }

  setActive(item) {
    const eventStart = new CustomEvent(this.options.eventBeforeSelected, {
      bubbles: true,
      cancelable: true,
      detail: { item },
    });

    // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
    if (this.element.dispatchEvent(eventStart)) {
      [... this.element.querySelectorAll(this.options.selectorButton)].forEach((button) => {
        if (button !== item) {
          [button, ... button.ownerDocument.querySelectorAll(button.dataset.target)].forEach(element => {
            toggleClass(element, this.options.classActive, false);
          });
        }
      });
      [item, ... item.ownerDocument.querySelectorAll(item.dataset.target)].forEach(element => {
        toggleClass(element, this.options.classActive, true);
      });
      this.element.dispatchEvent(new CustomEvent(this.options.eventAfterSelected, {
        bubbles: true,
        cancelable: true,
        detail: { item },
      }));
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
