import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventedState from '../../globals/js/mixins/evented-state';
import eventMatches from '../../globals/js/misc/event-matches';

class DataTable extends mixin(createComponent, initComponentBySearch, eventedState) {
  /**
   * Data Table
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends EventedState
   * @param {HTMLElement} element The root element of tables
   * @param {Object} [options] the... options
   * @param {string} [options.selectorInit] selector initialization
   * @param {string} [options.selectorExpandCells] css selector for expand
   * @param {string} [options.expandableRow] css selector for expand
   * @param {string} [options.selectorParentRows] css selector for rows housing expansion
   * @param {string} [options.selectorTableBody] root css for table body
   * @param {string} [options.eventTrigger] selector for event bubble capture points
   * @param {string} [options.eventParentContainer] used find the bubble container
   */
  constructor(element, options) {
    super(element, options);

    this.container = element.parentNode; // requires the immediate parent to be the container
    this.tableBody = this.element.querySelector(this.options.selectorTableBody);
    this.expandCells = [];
    this.expandableRows = [];
    this.parentRows = [];
    this.overflowInitialized = false;

    this.refreshRows();

    this.element.addEventListener('click', evt => {
      const eventElement = eventMatches(evt, this.options.eventTrigger);
      if (eventElement) {
        this._toggleState(eventElement, evt);
      }
    });

    this.element.addEventListener('keydown', evt => {
      if (evt.which === 13) {
        const eventElement = eventMatches(evt, this.options.eventTrigger);
        if (eventElement) {
          this._toggleState(eventElement, evt);
        }
      }
    });
  }

  /**
   * Toggles the given state.
   * @private
   * @param {Object} detail The detail of the event trigging this action.
   * @param {Function} callback Callback called when change in state completes.
   */
  _changeState(detail, callback) {
    this[this.constructor.eventHandlers[detail.group]](detail);
    callback();
  }

  /**
   * Toggles the state of this component specified by `data-event` attribute of the given element.
   * @param {HTMLElement} element The element.
   * @param {Event} evt The event trigging this action.
   */
  _toggleState = (element, evt) => {
    const data = element.dataset;
    const label = data.label ? data.label : '';
    const previousValue = data.previousValue ? data.previousValue : '';
    const initialEvt = evt;
    this.changeState({
      group: data.event,
      element,
      label,
      previousValue,
      initialEvt
    });
  };

  /**
   * Zebra stripes - done in javascript to handle expandable rows
   */
  _zebraStripe = parentRows => {
    parentRows.forEach((item, index) => {
      if (index % 2 === 0) {
        item.classList.add(this.options.classParentRowEven);
        if (item.nextElementSibling && item.nextElementSibling.classList.contains(this.options.classExpandableRow)) {
          item.nextElementSibling.classList.add(this.options.classExpandableRowEven);
        }
      } else {
        item.classList.remove(this.options.classParentRowEven);
      }
    });
  };

  /**
   * Find all expandable rows and remove them from the DOM
   */
  _initExpandableRows = expandableRows => {
    expandableRows.forEach(item => {
      item.classList.remove(this.options.classExpandableRowHidden);
      this.tableBody.removeChild(item);
    });
  };

  /**
   * On trigger, insert the expandable row back in
   */
  _toggleRowExpand = detail => {
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
  };

  /**
   * On trigger, flip the sort icon
   */
  _toggleSort = detail => {
    const { element, previousValue } = detail;

    if (!previousValue || previousValue === 'descending') {
      element.dataset.previousValue = 'ascending';
      element.classList.add(this.options.classTableSortAscending);
    } else {
      element.dataset.previousValue = 'descending';
      element.classList.remove(this.options.classTableSortAscending);
    }
  };

  /**
   * On trigger, check all checkboxes
   */
  _toggleSelectAll = detail => {
    const { element, previousValue } = detail;
    const inputs = [...this.element.querySelectorAll(this.options.selectorCheckbox)];
    if (!previousValue || previousValue === 'toggled') {
      inputs.forEach(item => {
        item.checked = true; // eslint-disable-line no-param-reassign
      });
      element.dataset.previousValue = 'off';
    } else {
      inputs.forEach(item => {
        item.checked = false; // eslint-disable-line no-param-reassign
      });
      element.dataset.previousValue = 'toggled';
    }
  };

  /**
   * On fire, create the parent child rows + striping
   */
  refreshRows = () => {
    const newExpandCells = [...this.element.querySelectorAll(this.options.selectorExpandCells)];
    const newExpandableRows = [...this.element.querySelectorAll(this.options.selectorExpandableRows)];
    const newParentRows = [...this.element.querySelectorAll(this.options.selectorParentRows)];

    // check if this is a refresh or the first time
    if (this.parentRows.length > 0) {
      const diffParentRows = newParentRows.filter(newRow => !this.parentRows.some(oldRow => oldRow === newRow));

      // check if there are expandable rows
      if (newExpandableRows.length > 0) {
        const diffExpandableRows = diffParentRows.map(newRow => newRow.nextElementSibling);
        const mergedExpandableRows = [...this.expandableRows, ...diffExpandableRows];
        this._initExpandableRows(diffExpandableRows);
        this.expandableRows = mergedExpandableRows;
      }

      this._zebraStripe(newParentRows);
    } else {
      this._zebraStripe(newParentRows);

      if (newExpandableRows.length > 0) {
        this._initExpandableRows(newExpandableRows);
        this.expandableRows = newExpandableRows;
      }
    }

    this.expandCells = newExpandCells;
    this.parentRows = newParentRows;
  };

  static components = new WeakMap();

  static eventHandlers = {
    expand: '_toggleRowExpand',
    sort: '_toggleSort',
    'select-all': '_toggleSelectAll'
  };

  static options = {
    selectorInit: '[data-responsive-table]',
    selectorExpandCells: '.bx--table-expand',
    selectorExpandableRows: '.bx--expandable-row',
    selectorParentRows: '.bx--parent-row',
    selectorTableBody: '.bx--table-body',
    selectorCheckbox: '.bx--checkbox',
    classParentRowEven: 'bx--parent-row--even',
    classExpandableRow: 'bx--expandable-row',
    classExpandableRowEven: 'bx--expandable-row--even',
    classExpandableRowHidden: 'bx--expandable-row--hidden',
    classTableSortAscending: 'bx--table-sort--ascending',
    eventBeforeExpand: 'responsive-table-beforetoggleexpand',
    eventAfterExpand: 'responsive-table-aftertoggleexpand',
    eventBeforeSort: 'responsive-table-beforetogglesort',
    eventAfterSort: 'responsive-table-aftertogglesort',
    eventBeforeSelectAll: 'responsive-table-beforetoggleselectall',
    eventAfterSelectAll: 'responsive-table-aftertoggleselectall',
    eventTrigger: '[data-event]',
    eventParentContainer: '[data-parent-row]'
  };
}

export default DataTable;
