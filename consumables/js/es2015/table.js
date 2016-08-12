import eventMatches from '../polyfills/event-matches';
import '../polyfills/object-assign';
import toggleClass from '../polyfills/toggle-class';
import on from '../misc/on';

export default class Table {
  /**
   * Data table.
   * @implements Component
   * @param {HTMLElement} element The element working as a data table.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorTitle] The CSS selector to find column titles.
   * @param {string} [options.selectorRow] The CSS selector to find rows.
   * @param {string} [options.selectorCheckbox] The CSS selector to find check boxes.
   * @param {string} [options.classSortState] The CSS class for the sorting state.
   * @param {string} [options.classCheckState] The CSS class for the checked state.
   * @param {string} [options.eventBeforeSortToggled] The name of the custom event fired before a column's sorting is toggled.
   * @param {string} [options.eventAfterSortToggled] The name of the custom event fired after a column's sorting is toggled.
   * @param {string} [options.eventBeforeCheckToggled] The name of the custom event fired before a check box is toggled.
   * @param {string} [options.eventAfterCheckToggled] The name of the custom event fired after a check box is toggled.
   */
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

  /**
   * Instantiates a data table of the given element.
   * @param {HTMLElement} element The element working as a data table.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorTitle] The CSS selector to find column titles.
   * @param {string} [options.selectorRow] The CSS selector to find rows.
   * @param {string} [options.selectorCheckbox] The CSS selector to find check boxes.
   * @param {string} [options.classSortState] The CSS class for the sorting state.
   * @param {string} [options.classCheckState] The CSS class for the checked state.
   * @param {string} [options.eventBeforeSortToggled] The name of the custom event fired before a column's sorting is toggled.
   * @param {string} [options.eventAfterSortToggled] The name of the custom event fired after a column's sorting is toggled.
   * @param {string} [options.eventBeforeCheckToggled] The name of the custom event fired before a check box is toggled.
   * @param {string} [options.eventAfterCheckToggled] The name of the custom event fired after a check box is toggled.
   */
  static create(element, options) {
    return this.components.get(element) || new this(element, options);
  }

  /**
   * Sets up the given node to instantiate data tables in.
   * If the given element indicates that it's an data table (having `data-table` attribute), instantiates it.
   * Otherwise, lazily instantiates data table when it's clicked on.
   * @param {Node} target The DOM node to instantiate data tables in. Should be a document or an element.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorTitle] The CSS selector to find column titles.
   * @param {string} [options.selectorRow] The CSS selector to find rows.
   * @param {string} [options.selectorCheckbox] The CSS selector to find check boxes.
   * @param {string} [options.classSortState] The CSS class for the sorting state.
   * @param {string} [options.classCheckState] The CSS class for the checked state.
   * @param {string} [options.eventBeforeSortToggled] The name of the custom event fired before a column's sorting is toggled.
   * @param {string} [options.eventAfterSortToggled] The name of the custom event fired after a column's sorting is toggled.
   * @param {string} [options.eventBeforeCheckToggled] The name of the custom event fired before a check box is toggled.
   * @param {string} [options.eventAfterCheckToggled] The name of the custom event fired after a check box is toggled.
   * @returns {Handle} The handle to remove the event listener to handle clicking.
   */
  static init(target = document, options) {
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.table !== undefined) {
      this.create(target, options);
    } else {
      return on(target, 'click', (event) => {
        const element = eventMatches(event, '[data-table]');
        if (element && !this.components.has(element)) {
          this.create(element, options).handleClick(event);
        }
      });
    }
  }

  /**
   * Handles click on data table.
   * * If the click is on a column title, toggles its sorting state.
   * * If the click is on a check box, toggles the check box.
   * @param {Event} event The event triggering this method.
   */
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

  /**
   * The callback called once toggling is finished or is canceled.
   * @callback Table~toggleStateCallback
   * @param {Error} error
   *   An error object with `true` in its `canceled` property if the toggling is canceled.
   *   Cancellation happens if the handler of a custom event, that is fired before toggling happens,
   *   calls `.preventDefault()` against the event.
   * @param {HTMLElement} element The toggled element.
   * @param {boolean} newState The new toggle state.
   */

  /**
   * Toggles a sorting state or a check box's state.
   * @param {string} type
   *   Specifies what state to toggle:
   *   * `"Sort"` for toggling a sorting state.
   *   * `"Check"` for toggling a check box's state.
   * @param {HTMLElement} element The DOM element to toggle its state.
   * @param {Table~toggleStateCallback} callback The callback called once toggling is finished or is canceled.
   */
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

/**
 * The component options.
 * @member {Object} Table#options
 * @property {string} [selectorTitle] The CSS selector to find column titles.
 * @property {string} [selectorRow] The CSS selector to find rows.
 * @property {string} [selectorCheckbox] The CSS selector to find check boxes.
 * @property {string} [classSortState] The CSS class for the sorting state.
 * @property {string} [classCheckState] The CSS class for the checked state.
 * @property {string} [eventBeforeSortToggled] The name of the custom event fired before a column's sorting is toggled.
 * @property {string} [eventAfterSortToggled] The name of the custom event fired after a column's sorting is toggled.
 * @property {string} [eventBeforeCheckToggled] The name of the custom event fired before a check box is toggled.
 * @property {string} [eventAfterCheckToggled] The name of the custom event fired after a check box is toggled.
 */

/**
 * The map associating DOM element and data table instance.
 * @type {WeakMap}
 */
Table.components = new WeakMap();
