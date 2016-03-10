import eventMatches from '../../global/js/event-matches';

export default class FabButton {
  constructor(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }
    this.element = element;

    FabButton.components.set(this.element, this);

    element.addEventListener('click', (event) => this.toggle(event));
  }

  toggle(event) {
    if (this.element.tagName === 'A') {
      event.preventDefault();
    }
    this.element.classList.toggle('is-closed');
  }

  release() {
    FabButton.components.delete(this.element);
  }

  static create(element) {
    return FabButton.components.get(element) || new FabButton(element);
  }
}

FabButton.components = new WeakMap();

document.addEventListener('click', (event) => {
  const element = eventMatches(event, '[data-fab]');
  if (element && !FabButton.components.has(element)) {
    new FabButton(element).toggle(event);
  }
});
