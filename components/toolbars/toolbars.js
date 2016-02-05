export default class Toolbars {
  constructor(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }

    this.element = element;
    this.searchFieldNode = this.element.ownerDocument.querySelector(this.element.getAttribute('data-list-icons-search-action-target'));

    this.element.addEventListener('click', (e) => this.handleActionClick(e));
  }

  handleActionClick(e) {
    const searchActionNode = e.currentTarget;

    if (searchActionNode.tagName === 'A' || searchActionNode.querySelector('a')) {
      e.preventDefault();
    }

    this.element.classList.toggle('show-search');
    this.searchFieldNode.classList.toggle('show-search');
    this.searchFieldNode.value = '';
  }
}
