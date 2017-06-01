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
      this._arrowKeydown(evt);
      this._selectKeydown(evt);
    });
  }

  _selectKeydown(evt) {
    const selectedRow = eventMatches(evt, this.options.selectorRow);
    if (selectedRow) {
      const input = this.element.querySelector(
        `#${selectedRow.getAttribute('for')}.bx--structured-list-input`,
      );
      if (evt.which === 13) {
        input.checked = true;
      }

      if (evt.which === 32) {
        evt.preventDefault();
        input.checked = true;
      }
    }
  }

  _direction(evt) {
    return {
      38: -1, // backward
      40: 1, // forward
    }[evt.which];
  }

  _arrowKeydown(evt) {
    const selectedRow = eventMatches(evt, this.options.selectorRow);
    const direction = this._direction(evt);

    if (direction && selectedRow !== undefined) {
      const rows = [...this.element.querySelectorAll(this.options.selectorRow)];
      const nextIndex = Math.max(rows.indexOf(selectedRow) + direction, -1);
      let adjustedNextIndex;

      if (nextIndex < 0) {
        adjustedNextIndex = rows.length - 1;
      } else if (nextIndex === rows.length) {
        adjustedNextIndex = 0;
      } else {
        adjustedNextIndex = nextIndex;
      }
      rows[adjustedNextIndex].focus();
      const id = `#${rows[adjustedNextIndex].getAttribute('for')}`;
      const input = this.element.querySelector(`${id}.bx--structured-list-input`);
      input.checked = true;
    }
  }

  static components = new WeakMap();

  static options = {
    selectorInit: '[data-structured-list]',
    selectorRow: '.bx--structured-list-tbody .bx--structured-list-row',
  };
}

export default StructuredList;
