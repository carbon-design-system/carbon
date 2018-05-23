import settings from '../../globals/js/settings';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import handles from '../../globals/js/mixins/handles';
import eventMatches from '../../globals/js/misc/event-matches';
import on from '../../globals/js/misc/on';

class StructuredList extends mixin(createComponent, initComponentBySearch, handles) {
  /**
   * StructuredList
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The root element of tables
   * @param {Object} [options] the... options
   * @param {string} [options.selectorInit] selector initialization
   * @param {string} [options.selectorRow] css selector for selected row
   */
  constructor(element, options) {
    super(element, options);
    this.manage(
      on(this.element, 'keydown', evt => {
        if (evt.which === 38 || evt.which === 40) {
          this._handleKeydownArrow(evt);
        }
        if (evt.which === 13 || evt.which === 32) {
          this._handleKeydownChecked(evt);
        }
      })
    );
    this.manage(
      on(this.element, 'click', evt => {
        this._handleClick(evt);
      })
    );
  }

  _direction(evt) {
    return {
      38: -1, // backward
      40: 1, // forward
    }[evt.which];
  }

  _nextIndex(array, arrayItem, direction) {
    return array.indexOf(arrayItem) + direction; // returns -1, 0, 1, 2, 3, 4...
  }

  _getInput(index) {
    const rows = [...this.element.querySelectorAll(this.options.selectorRow)];
    return this.element.ownerDocument.querySelector(this.options.selectorListInput(rows[index].getAttribute('for')));
  }

  _handleInputChecked(index) {
    const input = this._getInput(index);
    input.checked = true;
  }

  _handleClick(evt) {
    const selectedRow = eventMatches(evt, this.options.selectorRow);
    [...this.element.querySelectorAll(this.options.selectorRow)].forEach(row => row.classList.remove(this.options.classActive));
    if (selectedRow) {
      selectedRow.classList.add(this.options.classActive);
    }
  }

  // Handle Enter or Space keydown events for selecting <label> rows
  _handleKeydownChecked(evt) {
    const selectedRow = eventMatches(evt, this.options.selectorRow);
    [...this.element.querySelectorAll(this.options.selectorRow)].forEach(row => row.classList.remove(this.options.classActive));
    if (selectedRow) {
      selectedRow.classList.add(this.options.classActive);
      const input = this.element.querySelector(this.options.selectorListInput(selectedRow.getAttribute('for')));
      input.checked = true;
    }
  }

  // Handle up and down keydown events for selecting <label> rows
  _handleKeydownArrow(evt) {
    const selectedRow = eventMatches(evt, this.options.selectorRow);
    const direction = this._direction(evt);

    if (direction && selectedRow !== undefined) {
      const rows = [...this.element.querySelectorAll(this.options.selectorRow)];
      rows.forEach(row => row.classList.remove(this.options.classActive));
      const firstIndex = 0;
      const nextIndex = this._nextIndex(rows, selectedRow, direction);
      const lastIndex = rows.length - 1;

      switch (nextIndex) {
        case -1:
          rows[lastIndex].classList.add(this.options.classActive);
          rows[lastIndex].focus();
          this._handleInputChecked(lastIndex);
          break;
        case rows.length:
          rows[firstIndex].classList.add(this.options.classActive);
          rows[firstIndex].focus();
          this._handleInputChecked(firstIndex);
          break;
        default:
          rows[nextIndex].classList.add(this.options.classActive);
          rows[nextIndex].focus();
          this._handleInputChecked(nextIndex);
          break;
      }
    }
  }

  static components = new WeakMap();

  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-structured-list]',
      selectorRow: `[data-structured-list] .${prefix}--structured-list-tbody > label.${prefix}--structured-list-row`,
      selectorListInput: id => `#${id}.${prefix}--structured-list-input`,
      classActive: `${prefix}--structured-list-row--selected`,
    };
  }
}

export default StructuredList;
