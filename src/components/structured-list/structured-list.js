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
      this._handleKeyDown(evt);
    });
  }

  _getRowId(array, index) {
    return `#${array[index].getAttribute('for')}`;
  }

  _handleKeyDown(evt) {
    const direction = {
      38: this.constructor.NAVIGATE.BACKWARD,
      40: this.constructor.NAVIGATE.FORWARD,
    }[event.which];

    if (direction) {
      const rows = [...this.element.querySelectorAll(this.options.selectorRow)];
      const selectedRow = eventMatches(evt, this.options.selectorRow);
      const nextIndex = Math.max(rows.indexOf(selectedRow) + direction, -1);
      let input;

      if (nextIndex < 0) {
        rows[rows.length - 1].focus();
        input = document.querySelector(
          `${this._getRowId(rows, rows.length - 1)}.bx--structured-list-input`,
        );
      } else if (nextIndex === rows.length) {
        rows[0].focus();
        input = document.querySelector(`${this._getRowId(rows, 0)}.bx--structured-list-input`);
      } else {
        rows[nextIndex].focus();
        input = document.querySelector(
          `${this._getRowId(rows, nextIndex)}.bx--structured-list-input`,
        );
      }
      input.checked = true;
    }
  }

  static NAVIGATE = {
    BACKWARD: -1,
    FORWARD: 1,
  };

  static components = new WeakMap();

  static options = {
    selectorInit: '[data-structured-list]',
    selectorRow: '.bx--structured-list-tbody .bx--structured-list-row',
  };
}

export default StructuredList;
