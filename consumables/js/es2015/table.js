export default class Table {
  constructor(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }
    this.element = element;

    this.constructor.components.set(this.element, this);

    [... this.element.querySelectorAll('.bx--checkbox')].forEach((checkbox) => {
      if (checkbox.checked === true) {
        checkbox.parentElement.parentElement.classList.add('bx--table__row--checked');
      }
      checkbox.addEventListener('click', (event) => this.toggleChecked(event));
    });

    [... this.element.querySelectorAll('.bx--table__column-title')].forEach((columnTitle) => {
      columnTitle.addEventListener('click', (event) => this.toggleSort(event));
    });
  }

  static create(element) {
    return this.components.get(element) || new this(element);
  }

  static init(target = document) {
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.table !== undefined) {
      this.create(target);
    } else {
      [... target.querySelectorAll('[data-table]')].forEach(element => this.create(element));
    }
  }

  toggleChecked(event) {
    const isChecked = event.target.parentElement.parentElement.classList.contains('bx--table__row--checked');

    if (!isChecked) {
      event.target.parentElement.parentElement.classList.toggle('bx--table__row--checked');
    } else {
      event.target.parentElement.parentElement.classList.remove('bx--table__row--checked');
    }
  }

  toggleSort(event) {
    const isSorted = event.target.classList.contains('bx--table__column-title--rotated');

    if (!isSorted) {
      event.target.classList.toggle('bx--table__column-title--rotated');
    } else {
      event.target.classList.remove('bx--table__column-title--rotated');
    }
  }

  release() {
    this.constructor.components.delete(this.element);
  }
}

Table.components = new WeakMap();
