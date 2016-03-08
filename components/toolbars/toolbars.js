export default class Toolbars {
  constructor(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;
    this.searchFieldNode = this.element.ownerDocument.querySelector(this.element.getAttribute('data-list-icons-search-action-target'));

    Toolbars.components.set(this.element, this);

    this.element.addEventListener('click', (event) => this.handleActionClick(event));
  }

  handleActionClick(event) {
    const searchActionNode = event.currentTarget;

    if (searchActionNode.tagName === 'A') {
      event.preventDefault();
    }

    this.element.classList.toggle('show-search');
    this.searchFieldNode.classList.toggle('show-search');
    this.searchFieldNode.value = '';
  }

  release() {
    Toolbars.components.delete(this.element);
  }

  static create(element) {
    return Toolbars.components.get(element) || new Toolbars(element);
  }
}

Toolbars.components = new WeakMap();
