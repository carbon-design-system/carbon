export default class OverflowMenu {
  constructor(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }
    this.element = element;
    this.element.addEventListener('click', (e) => this.openMenu(e));
  }

  openMenu(e) {
    if (e.currentTarget.tagName === 'A' || e.currentTarget.querySelector('a')) {
      e.preventDefault();
    }
    this.element.classList.toggle('open');
  }
}
