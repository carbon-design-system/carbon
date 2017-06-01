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
    this.rows = [...this.element.ownerDocument.querySelectorAll(this.options.selectorRow)];
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

  _nextIndex(array, arrayItem, direction) {
    // console.log(array.indexOf(arrayItem) + direction);
    return array.indexOf(arrayItem) + direction; // -1, 0, 1, 2, 3, 4...
  }

  _handleChecked(index) {
    const id = `#${this.rows[index].getAttribute('for')}`;
    const input = this.element.ownerDocument.querySelector(`${id}.bx--structured-list-input`);
    input.checked = true;

    return { id, input };
  }

  _arrowKeydown(evt) {
    const selectedRow = eventMatches(evt, this.options.selectorRow);
    const direction = this._direction(evt);

    if (direction && selectedRow !== undefined) {
      const firstIndex = 0;
      const nextIndex = this._nextIndex(this.rows, selectedRow, direction);
      const lastIndex = this.rows.length - 1;

      switch (nextIndex) {
        case -1:
          this.rows[lastIndex].focus();
          this._handleChecked(lastIndex);
          break;
        case this.rows.length:
          this.rows[firstIndex].focus();
          this._handleChecked(firstIndex);
          break;
        default:
          this.rows[nextIndex].focus();
          this._handleChecked(nextIndex);
          break;
      }
    }
  }

  static components = new WeakMap();

  static options = {
    selectorInit: '[data-structured-list]',
    selectorRow: '[data-structured-list] .bx--structured-list-tbody .bx--structured-list-row',
  };
}

export default StructuredList;
