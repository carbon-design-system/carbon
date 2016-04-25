// This file was moved here as a dependancy of tab-nav.
// It no longer has anything to do with content-switcher, so the name could
// possibly be changed
import '../polyfills/array-from';
import '../polyfills/object-assign';

function toggleClass(element, name, add) {
  if (element.classList.contains(name) === !add) {
    element.classList[add ? 'add' : 'remove'](name);
  }
}

export default class Tab {
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;

    this.options = Object.assign({
      selectorMenu: '.tabs__nav',
      selectorTrigger: '.tabs__trigger',
      selectorTriggerText: '.trigger__text',
      selectorButton: '.nav__item',
      selectorButtonSelected: '.nav__item.selected',
      classActive: 'selected',
      classHidden: 'tabs--hidden',
    }, options);

    this.constructor.components.set(this.element, this);

    [... this.element.querySelectorAll(this.options.selectorButton)].forEach((button) => {
      button.addEventListener('click', (event) => this.handleItemClick(event));
    });

    [... this.element.querySelectorAll(this.options.selectorTrigger)].forEach((trigger) => {
      trigger.addEventListener('click', (event) => this.updateMenuState(event));
    });

    const selected = this.element.querySelector(this.options.selectorButtonSelected);
    if (selected) {
      this.updateTriggerText(selected);
    }
  }

  static init(target = document, options) {
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.tabs !== undefined) {
      this.create(target, options);
    } else {
      [... target.querySelectorAll('[data-tabs]')].forEach(element => this.create(element, options));
    }
  }

  handleItemClick(event) {
    this.setActive(event);
    this.updateMenuState();
    this.updateTriggerText(event.currentTarget);
  }

  setActive(event) {
    [... this.element.querySelectorAll(this.options.selectorButton)].forEach((button) => {
      if (button !== event.currentTarget) {
        toggleClass(button, this.options.classActive, false);
      }
    });
    toggleClass(event.currentTarget, this.options.classActive, true);
  }

  updateMenuState() {
    this.element.querySelector(this.options.selectorMenu).classList.toggle(this.options.classHidden);
  }

  updateTriggerText(target) {
    this.element.querySelector(this.options.selectorTriggerText).textContent = target.textContent;
  }

  release() {
    this.constructor.components.delete(this.element);
  }

  static create(element, options) {
    return this.components.get(element) || new this(element, options);
  }
}

Tab.components = new WeakMap();
