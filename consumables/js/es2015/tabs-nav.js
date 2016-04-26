import '../polyfills/array-from';
import '../polyfills/object-assign';
import ContentSwitcher from './content-switcher';

export default class Tab extends ContentSwitcher {
  constructor(element, options = {}) {
    super(element, Object.assign({
      selectorMenu: '.tabs__nav',
      selectorTrigger: '.tabs__trigger',
      selectorTriggerText: '.trigger__text',
      selectorButton: '.nav__item',
      selectorButtonSelected: '.nav__item.selected',
      classActive: 'selected',
      classHidden: 'tabs--hidden',
      eventBeforeSelected: 'tab-beingselected',
      eventAfterSelected: 'tab-selected',
    }, options));

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
    super.handleItemClick(event);
    this.updateMenuState();
    this.updateTriggerText(event.currentTarget);
  }

  updateMenuState() {
    this.element.querySelector(this.options.selectorMenu).classList.toggle(this.options.classHidden);
  }

  updateTriggerText(target) {
    this.element.querySelector(this.options.selectorTriggerText).textContent = target.textContent;
  }
}

Tab.components = new WeakMap();
