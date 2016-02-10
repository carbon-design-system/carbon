export default class FabButton {
  constructor(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }
    this.element = element;
    element.addEventListener('click', (event) => this.toggle(event));
  }

  toggle(event) {
    if (event.currentTarget.tagName === 'A' || event.currentTarget.querySelector('a')) {
      event.preventDefault();
    }
    this.element.classList.toggle('fab--close');
  }
}
