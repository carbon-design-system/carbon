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
    if (event.currentTarget.tagName === 'A' || event.currentTarget.querySelector('a')) {
      event.preventDefault();
    }
    this.element.classList.toggle('fab--close');
  }

  release() {
    FabButton.components.delete(this.element);
  }

  static create(element) {
    return FabButton.components.get(element) || new FabButton(element);
  }
}

FabButton.components = new WeakMap();
