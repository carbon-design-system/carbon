import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventedState from '../../globals/js/mixins/evented-state';
import eventMatches from '../../globals/js/misc/event-matches';

class DataTableV2 extends mixin(createComponent, initComponentBySearch, eventedState) {
  /**
   * Data Table
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends   EventedState
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

    this.container = element.parentNode;
    this.toolbarEl = this.element.querySelector(this.options.selectorToolbar);
    this.batchActionEl = this.element.querySelector(this.options.selectorActions);
    this.countEl = this.element.querySelector(this.options.selectorCount);
    this.cancelEl = this.element.querySelector(this.options.selectorActionCancel);
    this.tableHeaders = this.element.querySelectorAll('th');
    this.tableBody = this.element.querySelector(this.options.selectorTableBody);
    this.expandCells = [];
    this.expandableRows = [];
    this.parentRows = [];

    this.refreshRows();

    this.element.addEventListener('mouseover', evt => {
      const eventElement = eventMatches(evt, this.options.selectorChildRow);

      if (eventElement) {
        this._expandableHoverToggle(eventElement, true);
      }
    });

    this.element.addEventListener('click', evt => {
      const eventElement = eventMatches(evt, this.options.eventTrigger);
      if (eventElement) {
        this._toggleState(eventElement, evt);
      }
    });

    this.element.addEventListener('keydown', this._keydownHandler);

    this.state = {
      checkboxCount: 0,
    };
  }

  _sortToggle = detail => {
    const { element, previousValue } = detail;

    this.tableHeaders.forEach(header => {
      const sortEl = header.querySelector('.bx--table-sort-v2');

      if (sortEl !== null && sortEl !== element) {
        sortEl.classList.remove(this.options.classTableSortActive);
        sortEl.classList.remove(this.options.classTableSortAscending);
      }
    });

    if (!previousValue || previousValue === 'descending') {
      element.dataset.previousValue = 'ascending';
      element.classList.add(this.options.classTableSortActive);
      element.classList.add(this.options.classTableSortAscending);
    } else {
      element.dataset.previousValue = 'descending';
      element.classList.add(this.options.classTableSortActive);
      element.classList.remove(this.options.classTableSortAscending);
    }
  };

  _selectToggle = detail => {
    const { element } = detail;
    const checked = element.checked;

    // increment the  count
    this.state.checkboxCount += checked ? 1 : -1;
    this.countEl.textContent = this.state.checkboxCount;

    const row = element.parentNode.parentNode;

    row.classList.toggle('bx--data-table-v2--selected');

    // toggle on/off batch action bar
    this._actionBarToggle(this.state.checkboxCount > 0);
  };

  _selectAllToggle = detail => {
    const checked = detail.element.checked;

    const inputs = [...this.element.querySelectorAll(this.options.selectorCheckbox)];

    this.state.checkboxCount = checked ? inputs.length - 1 : 0;

    inputs.forEach(item => {
      item.checked = checked;

      const row = item.parentNode.parentNode;
      if (checked && row) {
        row.classList.add('bx--data-table-v2--selected');
      } else {
        row.classList.remove('bx--data-table-v2--selected');
      }
    });

    this._actionBarToggle(this.state.checkboxCount > 0);
    this.countEl.textContent = this.state.checkboxCount;
  };

  _actionBarCancel = () => {
    const inputs = [...this.element.querySelectorAll(this.options.selectorCheckbox)];

    inputs.forEach(item => {
      item.checked = false;
    });

    this.state.checkboxCount = 0;
    this._actionBarToggle(false);
    this.countEl.textContent = this.state.checkboxCount;
  };

  _actionBarToggle = toggleOn => {
    const transition = evt => {
      this.batchActionEl.removeEventListener('transitionend', transition);

      if (evt.target.matches(this.options.selectorActions)) {
        if (this.batchActionEl.dataset.active === 'false') {
          this.batchActionEl.setAttribute('tabIndex', -1);
        } else {
          this.batchActionEl.setAttribute('tabIndex', 0);
        }
      }
    };

    if (toggleOn) {
      this.batchActionEl.dataset.active = true;
      this.batchActionEl.classList.add(this.options.classActionBarActive);
    } else {
      this.batchActionEl.dataset.active = false;
      this.batchActionEl.classList.remove(this.options.classActionBarActive);
    }

    this.batchActionEl.addEventListener('transitionend', transition);
  };

  _expandableRowsInit = expandableRows => {
    expandableRows.forEach(item => {
      item.classList.remove(this.options.classExpandableRowHidden);
      this.tableBody.removeChild(item);
    });
  };

  _rowExpandToggle = detail => {
    const element = detail.element;
    const parent = eventMatches(detail.initialEvt, this.options.eventParentContainer);

    const index = this.expandCells.indexOf(element);
    if (element.dataset.previousValue === undefined || element.dataset.previousValue === 'expanded') {
      element.dataset.previousValue = 'collapsed';
      parent.classList.add(this.options.classExpandableRow);
      this.tableBody.insertBefore(this.expandableRows[index], this.parentRows[index + 1]);
    } else {
      parent.classList.remove(this.options.classExpandableRow);
      this.tableBody.removeChild(parent.nextElementSibling);
      element.dataset.previousValue = 'expanded';
    }
  };

  _expandableHoverToggle = element => {
    element.previousElementSibling.classList.add(this.options.classExpandableRowHover);

    const mouseout = () => {
      element.previousElementSibling.classList.remove(this.options.classExpandableRowHover);
      element.removeEventListener('mouseout', mouseout);
    };

    element.addEventListener('mouseout', mouseout);
  };

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
      initialEvt,
    });
  };

  _keydownHandler = evt => {
    if (evt.which === 27) {
      this._batchCancel();
    }
  };

  _changeState(detail, callback) {
    this[this.constructor.eventHandlers[detail.group]](detail);
    callback();
  }

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
        this._expandableRowsInit(diffExpandableRows);
        this.expandableRows = mergedExpandableRows;
      }
    } else if (newExpandableRows.length > 0) {
      this._expandableRowsInit(newExpandableRows);
      this.expandableRows = newExpandableRows;
    }

    this.expandCells = newExpandCells;
    this.parentRows = newParentRows;
  };

  static components = new WeakMap();

  // UI Events
  static eventHandlers = {
    expand: '_rowExpandToggle',
    sort: '_sortToggle',
    select: '_selectToggle',
    'select-all': '_selectAllToggle',
    'action-bar-cancel': '_actionBarCancel',
  };

  static options = {
    selectorInit: '[data-table-v2]',
    selectorToolbar: '.bx--table--toolbar',
    selectorActions: '.bx--batch-actions',
    selectorCount: '[data-items-selected]',
    selectorActionCancel: '.bx--batch-summary__cancel',
    selectorCheckbox: '.bx--checkbox',
    selectorExpandCells: '.bx--table-expand-v2',
    selectorExpandableRows: '.bx--expandable-row-v2',
    selectorParentRows: '.bx--parent-row-v2',
    selectorChildRow: '[data-child-row]',
    selectorTableBody: 'tbody',
    classExpandableRow: 'bx--expandable-row-v2',
    classExpandableRowHidden: 'bx--expandable-row--hidden-v2',
    classExpandableRowHover: 'bx--expandable-row--hover-v2',
    classTableSortAscending: 'bx--table-sort-v2--ascending',
    classTableSortActive: 'bx--table-sort-v2--active',
    classActionBarActive: 'bx--batch-actions--active',
    eventBeforeExpand: 'data-table-v2-beforetoggleexpand',
    eventAfterExpand: 'data-table-v2-aftertoggleexpand',
    eventBeforeSort: 'data-table-v2-beforetogglesort',
    eventAfterSort: 'data-table-v2-aftertogglesort',
    eventTrigger: '[data-event]',
    eventParentContainer: '[data-parent-row]',
  };
}

export default DataTableV2;
