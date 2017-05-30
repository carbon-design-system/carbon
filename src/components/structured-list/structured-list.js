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

  _handleKeyDown(evt) {
    const direction = {
      38: this.constructor.NAVIGATE.BACKWARD,
      40: this.constructor.NAVIGATE.FORWARD,
    }[event.which];

    if (direction) {
      const rows = [...this.element.querySelectorAll(this.options.selectorRow)];
      const selectedRow = eventMatches(evt, this.options.selectorRow);
      const nextIndex = Math.max(rows.indexOf(selectedRow) + direction, -1);

      if (nextIndex < 0 || nextIndex === rows.length) {
        rows[rows.length - 1].focus();
        const id = `#${rows[rows.length - 1].getAttribute('for')}`;
        const input = document.querySelector(`${id}.bx--structured-list-input`);
        input.checked = true;
      } else {
        rows[nextIndex].focus();
        const id = `#${rows[nextIndex].getAttribute('for')}`;
        const input = document.querySelector(`${id}.bx--structured-list-input`);
        input.checked = true;
      }
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
