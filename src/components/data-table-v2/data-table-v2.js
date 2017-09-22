import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventedState from '../../globals/js/mixins/evented-state';
import eventMatches from '../../globals/js/misc/event-matches';

class DataTableV2 extends mixin(
  createComponent,
  initComponentBySearch,
  eventedState
) {
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
    this.toolbarEl = this.element.querySelector('.bx--table-toolbar');
    this.batchActionEl = this.element.querySelector('.bx--batch-actions');
    this.countEl = this.element.querySelector('[data-items-selected]');
    this.cancelEl = this.element.querySelector('.bx--batch-summary__cancel');
    this.tableBody = this.element.querySelector(this.options.selectorTableBody);
    this.expandCells = [];
    this.expandableRows = [];
    this.parentRows = [];

    this.refreshRows();

    this.element.addEventListener('mouseover', evt => {
      const eventElement = eventMatches(
        evt,
        this.options.selectorExpandableRows
      );

      if (eventElement) {
        this._toggleExpandableHover(eventElement, true);
      }
    });

    this.element.addEventListener('mouseout', evt => {
      const eventElement = eventMatches(
        evt,
        this.options.selectorExpandableRows
      );

      if (eventElement) {
        this._toggleExpandableHover(eventElement, false);
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
      toggleBar: false,
    };
  }

  _toggleBatchActionBar = toggleOn => {
    const transition = evt => {
      this.batchActionEl.removeEventListener('transitionend', transition);

      if (evt.target.matches(this.options.selectorActions)) {
        if (this.batchActionEl.dataset.active === 'false') {
          this.batchActionEl.setAttribute('tabIndex', -1);
        } else {
          this.toolbarEl.style.visibility = 'hidden';
          this.batchActionEl.setAttribute('tabIndex', 0);
        }
      }
    };

    if (toggleOn) {
      this.batchActionEl.dataset.active = true;
      this.batchActionEl.classList.add('bx--batch-actions--active');
    } else {
      this.toolbarEl.style.visibility = '';
      this.batchActionEl.dataset.active = false;
      this.batchActionEl.classList.remove('bx--batch-actions--active');
    }

    this.batchActionEl.addEventListener('transitionend', transition);
  };

  _actionBarAnimate = () => {};

  _toggleRowExpand = () => {};
  _toggleSort = () => {};
  _toggleSelect = detail => {
    const { element } = detail;
    const checked = element.checked;

    // increment the  count
    this.state.checkboxCount += checked ? 1 : -1;
    this.countEl.textContent = this.state.checkboxCount;

    // toggle on/off all-checkbox if all are selected

    // toggle on/off batch action bar
    this._toggleBatchActionBar(this.state.checkboxCount > 0);
  };

  _toggleSelectAll = detail => {
    const checked = detail.element.checked;

    const inputs = [
      ...this.element.querySelectorAll(this.options.selectorCheckbox),
    ];

    this.state.checkboxCount = checked ? inputs.length - 1 : 0;

    inputs.forEach(item => {
      item.checked = checked;
    });

    this._toggleBatchActionBar(this.state.checkboxCount > 0);
    this.countEl.textContent = this.state.checkboxCount;
  };

  _batchCancel = () => {
    const inputs = [
      ...this.element.querySelectorAll(this.options.selectorCheckbox),
    ];

    inputs.forEach(item => {
      item.checked = false;
    });

    this.state.checkboxCount = 0;
    this._toggleBatchActionBar(false);
    this.countEl.textContent = this.state.checkboxCount;
  };

  _initExpandableRows = expandableRows => {
    expandableRows.forEach(item => {
      item.classList.remove(this.options.classExpandableRowHidden);
      this.tableBody.removeChild(item);
    });
  };

  _toggleRowExpand = detail => {
    const element = detail.element;
    const parent = eventMatches(
      detail.initialEvt,
      this.options.eventParentContainer
    );

    const index = this.expandCells.indexOf(element);
    if (
      element.dataset.previousValue === undefined ||
      element.dataset.previousValue === 'expanded'
    ) {
      element.dataset.previousValue = 'collapsed';
      parent.classList.add(this.options.classExpandableRow);
      this.tableBody.insertBefore(
        this.expandableRows[index],
        this.parentRows[index + 1]
      );
    } else {
      parent.classList.remove(this.options.classExpandableRow);
      this.tableBody.removeChild(parent.nextElementSibling);
      element.dataset.previousValue = 'expanded';
    }
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

  _toggleExpandableHover = (element, flag) => {
    element.previousElementSibling.classList[flag ? 'add' : 'remove'](
      this.options.classExpandableRowHover
    );
    element.classList[flag ? 'add' : 'remove'](
      this.options.classExpandableRowHover
    );
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
    const newExpandCells = [
      ...this.element.querySelectorAll(this.options.selectorExpandCells),
    ];
    const newExpandableRows = [
      ...this.element.querySelectorAll(this.options.selectorExpandableRows),
    ];
    const newParentRows = [
      ...this.element.querySelectorAll(this.options.selectorParentRows),
    ];

    // check if this is a refresh or the first time
    if (this.parentRows.length > 0) {
      const diffParentRows = newParentRows.filter(
        newRow => !this.parentRows.some(oldRow => oldRow === newRow)
      );

      // check if there are expandable rows
      if (newExpandableRows.length > 0) {
        const diffExpandableRows = diffParentRows.map(
          newRow => newRow.nextElementSibling
        );
        const mergedExpandableRows = [
          ...this.expandableRows,
          ...diffExpandableRows,
        ];
        this._initExpandableRows(diffExpandableRows);
        this.expandableRows = mergedExpandableRows;
      }
    } else {
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
    select: '_toggleSelect',
    'batch-cancel': '_batchCancel',
    'select-all': '_toggleSelectAll',
  };

  static options = {
    selectorInit: '[data-table-v2]',
    selectorActions: '.bx--batch-actions',
    selectorCheckbox: '.bx--checkbox',
    selectorExpandCells: '.bx--table-expand-v2',
    selectorExpandableRows: '.bx--expandable-row-v2',
    selectorParentRows: '.bx--parent-row-v2',
    selectorTableBody: 'tbody',
    classExpandableRow: 'bx--expandable-row-v2',
    classExpandableRowEven: 'bx--expandable-row--even-v2',
    classExpandableRowHidden: 'bx--expandable-row--hidden-v2',
    classExpandableRowHover: 'bx--expandable-row--hover-v2',
    classParentRowEven: 'bx--parent-row--even-v2',
    eventBeforeExpand: 'responsive-table-beforetoggleexpand',
    eventAfterExpand: 'responsive-table-aftertoggleexpand',
    eventTrigger: '[data-event]',
    eventParentContainer: '[data-parent-row]',
  };
}

export default DataTableV2;
