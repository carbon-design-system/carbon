export default class Toolbars {
  constructor(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;
    this.searchFieldNode = this.element.ownerDocument.querySelector(this.element.getAttribute('data-list-icons-search-action-target'));

    this.element.addEventListener('click', (event) => this.handleActionClick(event));
  }

  handleActionClick(event) {
    const searchActionNode = event.currentTarget;

    if (searchActionNode.tagName === 'A' || searchActionNode.querySelector('a')) {
      event.preventDefault();
    }

    this.element.classList.toggle('show-search');
    this.searchFieldNode.classList.toggle('show-search');
    this.searchFieldNode.value = '';
  }
}
