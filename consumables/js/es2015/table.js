import eventMatches from '../polyfills/event-matches';
import toggleClass from '../polyfills/toggle-class';

export default class Table {
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }
    this.element = element;

    this.options = Object.assign({
      selectorTitle: '.bx--table__column-title',
      selectorRow: '.bx--table__row',
      selectorCheckbox: '.bx--checkbox',
      classSortState: 'bx--table__column-title--rotated',
      classCheckState: 'bx--table__row--checked',
      eventBeforeSortToggled: 'table-sort-beingtoggled',
      eventAfterSortToggled: 'table-sort-toggled',
      eventBeforeCheckToggled: 'table-check-beingtoggled',
      eventAfterCheckToggled: 'table-check-toggled',
    }, options);

    this.constructor.components.set(this.element, this);

    this.element.addEventListener('click', (event) => this.handleClick(event));
  }

  static create(element, options) {
    return this.components.get(element) || new this(element, options);
  }

  static init(target = document, options) {
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.table !== undefined) {
      this.create(target, options);
    } else {
      const handler = (event) => {
        const element = eventMatches(event, '[data-table]');
        if (element && !this.components.has(element)) {
          this.create(element, options).handleClick(event);
        }
      };
      target.addEventListener('click', handler);
      return {
        release: () => target.removeEventListener('click', handler),
      };
    }
  }

  handleClick(event) {
    const title = eventMatches(event, this.options.selectorTitle);
    const row = eventMatches(event, this.options.selectorRow);
    const checkbox = eventMatches(event, this.options.selectorCheckbox);
    if (title) {
      this.toggleState('Sort', title);
    }
    if (row && checkbox) {
      this.toggleState('Check', row);
    }
  }

  toggleState(type, element, callback) {
    const newState = !element.classList.contains(this.options[`class${type}State`]);
    const eventStart = new CustomEvent(this.options[`eventBefore${type}Toggled`], {
      bubbles: true,
      cancelable: true,
      detail: { newState },
    });

    // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
    if (element.dispatchEvent(eventStart)) {
      toggleClass(element, this.options[`class${type}State`], newState);
      // this._changeActive(item);
      element.dispatchEvent(new CustomEvent(this.options[`eventAfter${type}Toggled`], {
        bubbles: true,
        cancelable: true,
        detail: { newState },
      }));
      if (callback) {
        callback(null, element, newState);
      }
    } else {
      const error = new Error('Toggling on table has been canceled.');
      error.canceled = true;
      error.element = element;
      error.newState = newState;
      if (callback) {
        callback(error);
      }
    }
  }

  release() {
    this.constructor.components.delete(this.element);
  }
}

Table.components = new WeakMap();
