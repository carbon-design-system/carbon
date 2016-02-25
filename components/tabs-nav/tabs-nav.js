// This file was moved here as a dependancy of tab-nav.
// It no longer has anything to do with content-switcher, so the name could
// possibly be changed
import '../../global/js/array-from';
import '../../global/js/object-assign';

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

    Tab.components.set(this.element, this);

    [... this.element.querySelectorAll(this.options.selectorButton)].forEach((button) => {
      button.addEventListener('click', (event) => this.handleItemClick(event));
    });

    [... this.element.querySelectorAll(this.options.selectorTrigger)].forEach((trigger) => {
      trigger.addEventListener('click', (event) => this.updateMenuState(event));
    });

    this.updateTriggerText(this.element.querySelector(this.options.selectorButtonSelected));
  }

  handleItemClick(event) {
    if (event.currentTarget.tagName === 'A' || event.currentTarget.querySelector('a')) {
      event.preventDefault();
    }
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
    Tab.components.delete(this.element);
  }

  static create(element, options) {
    return Tab.components.get(element) || new Tab(element, options);
  }
}

Tab.components = new WeakMap();
