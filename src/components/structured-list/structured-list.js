import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventMatches from '../../globals/js/misc/event-matches';

class StructuredList extends mixin(createComponent, initComponentBySearch) {
  /**
   * StructuredList
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The root element of tables
   * @param {Object} [options] the... options
   * @param {string} [options.selectorInit] selector initialization
   * @param {string} [options.selectorRow] css selector for selected row
   */
  constructor(element, options) {
    super(element, options);

    this.element.addEventListener('keydown', (evt) => {
      if (evt.which === 13) {
        this._handleKeyDown(evt);
      }

      if (evt.which === 32) {
        evt.preventDefault();
        this._handleKeyDown(evt);
      }
    });
  }

  _handleKeyDown = (evt) => {
    const selectedRow = eventMatches(evt, this.options.selectorRow);

    if (selectedRow) {
      const id = `#${selectedRow.getAttribute('for')}`;
      const input = document.querySelector(`${id}.bx--structured-list-input`);
      input.checked = true;
    }
  };

  static components = new WeakMap();

  static options = {
    selectorInit: '[data-structured-list]',
    selectorRow: '.bx--structured-list-row',
  };
}

export default StructuredList;
