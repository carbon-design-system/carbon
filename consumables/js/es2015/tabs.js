import eventMatches from '../polyfills/event-matches';
import '../polyfills/array-from';
import '../polyfills/math-sign';
import '../polyfills/object-assign';
import ContentSwitcher from './content-switcher';

export default class Tab extends ContentSwitcher {
  constructor(element, options = {}) {
    super(element, Object.assign({
      selectorMenu: '.bx--tabs__nav',
      selectorTrigger: '.bx--tabs__trigger',
      selectorTriggerText: '.bx--tabs__trigger-text',
      selectorButton: '.bx--tabs__nav-item',
      selectorButtonSelected: '.bx--tabs__nav-item.bx--tabs--selected',
      selectorLink: '.bx--tabs__nav-link',
      classActive: 'bx--tabs--selected',
      classHidden: 'bx--tabs--hidden',
      eventBeforeSelected: 'tab-beingselected',
      eventAfterSelected: 'tab-selected',
    }, options));

    this.element.addEventListener('keydown', (event) => this.handleKeyDown(event));

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

  _changeActive(item) {
    super._changeActive(item);
    this.updateTriggerText(item);
  }

  handleClick(event) {
    super.handleClick(event);
    const button = eventMatches(event, this.options.selectorButton);
    const trigger = eventMatches(event, this.options.selectorTrigger);
    if (button) {
      super.handleClick(event);
      this.updateMenuState();
    }
    if (trigger) {
      this.updateMenuState();
    }
  }

  handleKeyDown(event) {
    const triggerNode = this.element.querySelector(this.options.selectorTrigger);
    if (triggerNode && triggerNode.offsetParent) {
      return;
    }

    const direction = {
      Left: -1,
      Right: 1,
      ArrowLeft: -1,
      ArrowRight: 1,
    }[event.key || event.keyIdentifier];

    if (direction) {
      const buttons = [... this.element.querySelectorAll(this.options.selectorButton)];
      const button = this.element.querySelector(this.options.selectorButtonSelected);
      const nextIndex = Math.max(buttons.indexOf(button) + direction, -1 /* For `button` not found in `buttons` */);
      const nextIndexLooped = nextIndex >= 0 && nextIndex < buttons.length ? nextIndex :
        nextIndex - Math.sign(nextIndex) * buttons.length;
      this.setActive(buttons[nextIndexLooped], (error, item) => {
        if (item) {
          const link = item.querySelector(this.options.selectorLink);
          if (link) {
            link.focus();
          }
        }
      });
      event.preventDefault();
    }
  }

  updateMenuState() {
    this.element.querySelector(this.options.selectorMenu).classList.toggle(this.options.classHidden);
  }

  updateTriggerText(target) {
    this.element.querySelector(this.options.selectorTriggerText).textContent = target.textContent;
  }
}

Tab.components = new WeakMap();
