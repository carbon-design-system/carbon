// This file was moved here as a dependancy of tab-nav.
// It no longer has anything to do with content-switcher, so the name could
// possibly be changed
import '../../global/js/array-from';
import '../../global/js/object-assign';

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
    }, options));

    [... this.element.querySelectorAll(this.options.selectorTrigger)].forEach((trigger) => {
      trigger.addEventListener('click', (event) => this.updateMenuState(event));
    });

    this.updateTriggerText(this.element.querySelector(this.options.selectorButtonSelected));
  }

  setActive(event) {
    if (event.currentTarget.tagName === 'A' || event.currentTarget.querySelector('a')) {
      event.preventDefault();
    }
    super.setActive(event);
    this.updateMenuState();
    this.updateTriggerText(event.currentTarget);
  }

  updateMenuState() {
    this.element.querySelector(this.options.selectorMenu).classList.toggle('tabs--hidden');
  }

  updateTriggerText(target) {
    this.element.querySelector(this.options.selectorTriggerText).textContent = target.textContent;
  }
}
