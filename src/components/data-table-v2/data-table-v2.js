import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventedState from '../../globals/js/mixins/evented-state';
import eventMatches from '../../globals/js/misc/event-matches';

class DataTable extends mixin(
  createComponent,
  initComponentBySearch,
  eventedState
) {
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

    this.container = element.parentNode;
  }

  toggleBatchActionBar = () => {};
  expandTableRow = () => {};

  static components = new WeakMap();

  static options = {
    selectorInit: '[data-responsive-table]',
  };
}

export default DataTable;
