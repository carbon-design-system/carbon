import '../../global/js/array-from';
import '../../global/js/object-assign';

import ContentSwitcher from '../content-switcher/content-switcher';

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
      trigger.addEventListener('click', (e) => this.updateMenuState(e));
    });

    this.updateTriggerText(this.element.querySelector(this.options.selectorButtonSelected));
  }

  setActive(e) {
    if (e.currentTarget.tagName === 'A' || e.currentTarget.querySelector('a')) {
      e.preventDefault();
    }
    super.setActive(e);
    this.updateMenuState();
    this.updateTriggerText(e.currentTarget);
  }

  updateMenuState() {
    this.element.querySelector(this.options.selectorMenu).classList.toggle('tabs--hidden');
  }

  updateTriggerText(target) {
    this.element.querySelector(this.options.selectorTriggerText).textContent = target.textContent;
  }
}
