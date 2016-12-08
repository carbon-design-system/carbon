import eventMatches from '../polyfills/event-matches';
import '../polyfills/array-from';
import '../polyfills/element-matches';
import '../polyfills/object-assign';
import '../polyfills/custom-event';
import optimizedResize from '../misc/resize';

export default class ResponsiveTable {
  /**
   * Responsive Table
   * @implements components
   * @param {HTMLElement} element The root element of tables
   * @param {Object} [options] the... options
   * @param {string} [options.selectorInit] selector initialization
   * @param {string} [options.selectorExpandCells] css selector for expand
   * @param {string} [options.expandableRow] css selector for expand
   * @param {string} [options.selectorParentRows] css selector for rows housing expansion
   * @param {string} [options.selectorTableBody] root css for table body
   * @param {string} [options.overflowMenu] any overflow menus
   * @param {string} [options.eventTrigger] selector for event bubble capture points
   * @param {string} [options.eventParentContainer] used find the bubble container
   */
  constructor(element, options = {}) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('Responsive Tables requires a DOM element');
    }

    this.element = element;

    this.options = Object.assign(Object.create(this.constructor.options), options);

    this.container = element.parentNode; // requires the immediate parent to be the container
    this.expandCells = [...this.element.querySelectorAll(this.options.selectorExpandCells)];
    this.expandableRows = [...this.element.querySelectorAll(this.options.selectorExpandableRows)];
    this.parentRows = [...this.element.querySelectorAll(this.options.selectorParentRows)];
    this.tableBody = this.element.querySelector(this.options.selectorTableBody);

    this.zebraStripe();
    this.initExpandableRows();
    this.initOverflowMenus();

    this.eventHandlers = {
      expand: this.toggleRowExpand,
      sort: this.toggleSort,
      'select-all': this.toggleSelectAll,
    };

    this.element.addEventListener('click', evt => {
      const eventElement = eventMatches(evt, this.options.eventTrigger);
      if (eventElement) {
        this.emitEvent(eventElement, evt);
      }
    });

    this.constructor.components.set(this.element, this);
  }

  /**
   * Create an object to be used in event emission
   */
  getEventDetails = (element, data, evt) => {
    const { event } = data;
    const label = (data.label) ? data.label : '';
    const previousValue = (data.previousValue) ? data.previousValue : '';
    const initialEvt = evt;

    return {
      element,
      event,
      label,
      previousValue,
      initialEvt,
    };
  }

  /**
   * Standardize way to emit events
   */
  emitEvent = (element, evt) => {
    const detail = this.getEventDetails(element, element.dataset, evt);

    const eventBefore = new CustomEvent(`before${detail.event}`, {
      bubbles: true,
      cancelable: true,
      detail,
    });

    const eventAfter = new CustomEvent(`${detail.event}`, {
      bubbles: true,
      cancelable: true,
      detail,
    });

    const canceled = !this.element.dispatchEvent(eventBefore);

    if (!canceled) {
      this.eventHandlers[detail.event](detail);
      this.element.dispatchEvent(eventAfter);
    }
  }

  /**
   * Zebra stripes - done in javascript to handle expandable rows
   */
  zebraStripe = () => {
    this.parentRows.forEach((item, index) => {
      if (index % 2 === 0) {
        item.classList.add(this.options.classParentRowEven);
        if (item.nextElementSibling.classList.contains(this.options.classExpandableRow)) {
          item.nextElementSibling.classList.add(this.options.classExpandableRowEven);
        }
      }
    });
  }

  /**
   * Find all expandable rows and remove them from the DOM
   */
  initExpandableRows = () => {
    this.expandableRows.forEach(item => {
      item.classList.remove(this.options.classExpandableRowHidden);
      this.tableBody.removeChild(item);
    });
  }

  /**
   * Because tables has an overflow-x on it, we need to pop the overflow
   * options outside of the table. This appends to the body and tags a resize
   * listener to reposition when needed
   */
  initOverflowMenus = () => {
    if (!this.element.querySelector(this.options.selectorOverflowMenu)) {
      return false;
    }

    const menuMap = [...this.element.querySelectorAll(this.options.selectorOverflowMenu)].map(menu => {
      return {
        element: menu,
        optionMenu: menu.querySelector(this.options.selectorOverflowMenuOptions),
      };
    });

    optimizedResize.add(() => {
      menuMap.forEach(menu => {
        this.placeOverflow({
          detail: menu,
        });
      });
    });

    menuMap.forEach(menu => {
      document.body.appendChild(menu.optionMenu);
      this.placeOverflow({
        detail: menu,
      });
    });
  }

  /**
   * When called, finds the position of the icon supplied and positions
   * the menu relative to that
   *
   * Uses fixed because getBoundingClientRect is relative to viewport
   */
  placeOverflow = (evt) => {
    const { element, optionMenu } = evt.detail;

    const icon = element.querySelector(this.options.selectorOverflowMenuIcon);
    const position = icon.getBoundingClientRect();

    optionMenu.style.position = 'fixed';
    optionMenu.style.top = `${position.top}px`;
    optionMenu.style.left = `${position.right}px`;
    optionMenu.style.right = 'auto';
  }

  /**
   * On trigger, insert the expandable row back in
   */
  toggleRowExpand = (detail) => {
    const element = detail.element;
    const parent = eventMatches(detail.initialEvt, this.options.eventParentContainer);

    const index = this.expandCells.indexOf(element);
    if (element.dataset.previousValue === undefined || element.dataset.previousValue === 'expanded') {
      element.dataset.previousValue = 'collapsed';
      this.tableBody.insertBefore(this.expandableRows[index], this.parentRows[index + 1]);
    } else {
      this.tableBody.removeChild(parent.nextElementSibling);
      element.dataset.previousValue = 'expanded';
    }
  }

  /**
   * On trigger, flip the sort icon
   */
  toggleSort = (detail) => {
    const { element, previousValue } = detail;

    if (!previousValue || previousValue === 'descending') {
      element.dataset.previousValue = 'ascending';
      element.classList.add(this.options.classTableSortAscending);
    } else {
      element.dataset.previousValue = 'descending';
      element.classList.remove(this.options.classTableSortAscending);
    }
  }

  /**
   * On trigger, check all checkboxes
   */
  toggleSelectAll = (detail) => {
    const { element, previousValue } = detail;
    const inputs = [...this.element.querySelectorAll(this.options.selectorCheckbox)];
    if (!previousValue || previousValue === 'toggled') {
      inputs.forEach(item => item.checked = true);
      element.dataset.previousValue = 'off';
    } else {
      inputs.forEach(item => item.checked = false);
      element.dataset.previousValue = 'toggled';
    }
  }

  release() {
    this.constructor.components.delete(this.element);
  }

  static components = new WeakMap();

  static create(element) {
    return this.components.get(element) || new this(element);
  }

  static init(target = document, options = {}) {
    const effectiveOptions = Object.assign(Object.create(this.options), options);
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
      this.create(target);
    } else {
      [... target.querySelectorAll(effectiveOptions.selectorInit)].forEach(element => this.create(element));
    }
  }

  static options = {
    selectorInit: '[data-responsive-table]',
    selectorExpandCells: '.bx--table-expand',
    selectorExpandableRows: '.bx--expandable-row',
    selectorParentRows: '.bx--parent-row',
    selectorTableBody: '.bx--table-body',
    selectorOverflowMenu: '[data-overflow-menu]',
    selectorCheckbox: '.bx--checkbox',
    selectorOverflowMenuIcon: '.bx--overflow-menu__icon',
    selectorOverflowMenuOptions: '.bx--overflow-menu__options',
    classParentRowEven: 'bx--parent-row--even',
    classExpandableRow: 'bx--expandable-row',
    classExpandableRowEven: 'bx--expandable-row--even',
    classExpandableRowHidden: 'bx--expandable-row--hidden',
    classTableSortAscending: 'bx--table-sort--ascending',
    eventTrigger: '[data-event]',
    eventParentContainer: '[data-parent-row]',
  }
}
