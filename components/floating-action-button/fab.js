export default class FabButton {
  constructor(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }
    this.element = element;
    element.addEventListener('click', (e) => this.toggle(e));
  }

  toggle(e) {
    if (e.currentTarget.tagName === 'A' || e.currentTarget.querySelector('a')) {
      e.preventDefault();
    }
    this.element.classList.toggle('fab--close');
  }
}
