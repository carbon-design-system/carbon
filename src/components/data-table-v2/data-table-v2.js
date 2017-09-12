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

    this.element.addEventListener('click', evt => {
      const eventElement = eventMatches(evt, this.options.eventTrigger);
      if (eventElement) {
        this._toggleState(eventElement, evt);
      }
    });

    this.element.ownerDocument.body.addEventListener(
      'keydown',
      this._keydownHandler
    );

    this.state = {
      checkboxCount: 0,
      toggleBar: false,
    };
  }

  _toggleBatchActionBar = toggleOn => {
    const button = this.batchActionEl.querySelector('button');

    const transition = evt => {
      this.batchActionEl.removeEventListener('transitionend', transition);
      const eventElement = eventMatches(evt, this.options.selectorActions);

      if (evt.target.matches(this.options.selectorActions)) {
        if (this.batchActionEl.dataset.active === 'false') {
          this.batchActionEl.setAttribute('tabIndex', -1);
        } else {
          this.toolbarEl.style.visibility = 'hidden';
          this.batchActionEl.setAttribute('tabIndex', 0);
          this.batchActionEl.focus();
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

  refreshRows = () => {};

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
    eventTrigger: '[data-event]',
  };
}

export default DataTableV2;
