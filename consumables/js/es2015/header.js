import '../polyfills/array-from';
import '../polyfills/object-assign';
import '../polyfills/custom-event';

export default class HeaderNav {
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;

    this.options = Object.assign({
      selectorTriggerLabel: '.current-taxonomy',
      classActive: 'taxonomy-nav--active',
      selectorMenu: '.taxonomy-menu',
      selectorItem: '.taxonomy-item',
      selectorItemLink: '.taxonomy-item--taxonomy-menu',
      selectorLabel: '.taxonomy-item__label',
    }, options);

    this.constructor.components.set(this.element, this);

    this.menuNode = this.element.querySelector(this.options.selectorMenu);

    this.element.addEventListener('keydown', (event) => this.toggleNav(event));

    [... this.element.querySelectorAll(this.options.selectorItemLink)].forEach((item) => {
      item.addEventListener('click', (e) => this.select(e));
    });
  }

  static init(target = document, options) {
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.navTarget !== undefined) {
      this.hook(target, options);
    } else if (target.nodeType === Node.ELEMENT_NODE && target.dataset.nav !== undefined) {
      this.create(target, options);
    } else {
      [... target.querySelectorAll('[data-nav-target]')].forEach(element => this.hook(element, options));
      [... target.querySelectorAll('[data-nav]')].forEach(element => this.create(element, options));
    }
  }

  toggleNav(event) {
    const isActive = this.element.classList.contains(this.options.classActive);
    let add;
    if (event.type === 'click' || event.type === 'keydown' && event.which === 40) {
      // Toggle button or ESC key on nav
      add = !isActive;
    } else if (event.type === 'keydown' && event.which === 27) {
      // Down arrow on launch button
      add = false;
    } else {
      return;
    }
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    const launchingElement = event.currentTarget;
    const typeSuffix = add ? 'shown' : 'hidden';
    const eventStart = new CustomEvent(`header-being${typeSuffix}`, {
      bubbles: true,
      cancelable: true,
      detail: { launchingElement: launchingElement },
    });
    const defaultNotPrevented = this.element.dispatchEvent(eventStart);

    if (add) {
      this.triggerNode = event.currentTarget;
      this.triggerLabelNode = this.triggerNode.querySelector(this.options.selectorTriggerLabel);
    }

    if (defaultNotPrevented) {
      this.element.classList[add ? 'add' : 'remove'](this.options.classActive);
      (this.element.classList.contains(this.options.classActive) ? this.menuNode : this.triggerNode).focus();
      this.element.dispatchEvent(new CustomEvent(`header-${typeSuffix}`, {
        bubbles: true,
        cancelable: true,
        detail: { launchingElement: launchingElement },
      }));
    }
  }

  select(event) {
    const activatedElement = event.currentTarget;
    const eventStart = new CustomEvent('header-beingselected', {
      bubbles: true,
      cancelable: true,
      detail: {
        initiatingEvent: event,
        itemElement: activatedElement,
      },
    });

    if (this.element.dispatchEvent(eventStart)) {
      [... this.element.querySelectorAll(this.options.selectorItem)].forEach((element) => {
        if (element.contains(activatedElement)) {
          element.classList.add('selected');
        } else if (element.classList.contains('selected')) {
          element.classList.remove('selected');
        }
      });
      activatedElement.classList.add('selected');
      if (this.triggerLabelNode) {
        this.triggerLabelNode.textContent = activatedElement.querySelector(this.options.selectorLabel).textContent;
      }
      this.element.dispatchEvent(new CustomEvent('header-selected', {
        bubbles: true,
        cancelable: true,
        detail: { itemElement: activatedElement },
      }));
    }
  }

  release() {
    this.constructor.components.delete(this.element);
  }

  static create(element, options) {
    return this.components.get(element) || new this(element, options);
  }

  static hook(element, options) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    const navs = [... element.ownerDocument.querySelectorAll(element.dataset.navTarget)].map((target) => {
      return this.create(target, options);
    });

    ['keydown', 'click'].forEach((name) => {
      element.addEventListener(name, (event) => {
        navs.forEach((nav) => nav.toggleNav(event));
      });
    });

    return navs;
  }
}

HeaderNav.components = new WeakMap();
