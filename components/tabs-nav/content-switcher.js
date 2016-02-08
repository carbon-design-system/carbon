import '../../global/js/array-from';
import '../../global/js/object-assign';

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
      selectorButton: '.content-switcher__btn',
      classActive: 'active',
    }, options);

    [... this.element.querySelectorAll(this.options.selectorButton)].forEach((button) => {
      button.addEventListener('click', (e) => this.setActive(e));
    });
  }

  setActive(e) {
    [... this.element.querySelectorAll(this.options.selectorButton)].forEach((button) => {
      if (button !== e.currentTarget) {
        toggleClass(button, this.options.classActive, false);
      }
    });
    toggleClass(e.currentTarget, this.options.classActive, true);
  }
}
