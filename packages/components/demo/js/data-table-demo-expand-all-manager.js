import settings from '../../src/globals/js/settings';
import mixin from '../../src/globals/js/misc/mixin';
import createComponent from '../../src/globals/js/mixins/create-component';
import initComponentByEvent from '../../src/globals/js/mixins/init-component-by-event';
import handles from '../../src/globals/js/mixins/handles';
import on from '../../src/globals/js/misc/on';

class DataTableDemoExpandRowAllManager extends mixin(
  createComponent,
  initComponentByEvent,
  handles
) {
  /**
   * The row expando handler for data table "expand all" feature demo.
   * @extends CreateComponent
   * @extends InitComponentByEvent
   * @extends Handles
   * @param {HTMLElement} element The element working as the button for data table "expand all" feature demo.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorExpandHeader] The CSS selector to find the header expando button.
   * @param {string} [options.selectorExpandCells] The CSS selector to find the row expando button.
   * @param {string} [options.selectorExpandCellsExpanded]
   *   The CSS selector to find the row expando button with its expanded state.
   */
  constructor(element, options) {
    super(element, options);
    this.manage(on(element, 'click', this._handleClickRowExpando));
  }

  /**
   * A method called when this widget is created upon events.
   * @param {Event} event The event triggering the creation.
   */
  createdByEvent(event) {
    this._handleClickRowExpando(event);
  }

  /**
   * Handles `click` event on the row expand button.
   * @private
   */
  _handleClickRowExpando = () => {
    if (
      this.element.querySelectorAll(this.options.selectorExpandCells).length ===
      this.element.querySelectorAll(this.options.selectorExpandCellsExpanded)
        .length
    ) {
      this.element.querySelector(
        this.options.selectorExpandHeader
      ).dataset.previousValue = 'collapsed';
    }
  };

  /**
   * The map associating DOM element and the instance.
   * @member DataTableDemoExpandRowAllManager.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode DataTableDemoExpandRowAllManager.create .create()},
   * or {@linkcode DataTableDemoExpandRowAllManager.init .init()},
   * properties in this object are overridden for the instance being create
   * and how {@linkcode DataTableDemoExpandRowAllManager.init .init()} works.
   * @member DataTableDemoExpandRowAllManager.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find the row expando handler for data table "expand all" feature demo.
   * @property {string} [selectorExpandHeader] The CSS selector to find the header expando button.
   * @property {string} [selectorExpandCells] The CSS selector to find the row expando button.
   * @property {string} [selectorExpandCellsExpanded] The CSS selector to find the row expando button with its expanded state.
   * @property {string[]} initEventNames The event names that instantiates this component.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-table-demo-expand-all-manager]',
      selectorExpandHeader: `th.${prefix}--table-expand`,
      selectorExpandCells: `td.${prefix}--table-expand`,
      selectorExpandCellsExpanded: `td.${prefix}--table-expand[data-previous-value="collapsed"]`,
      initEventNames: ['click'],
    };
  }
}

export default DataTableDemoExpandRowAllManager;
