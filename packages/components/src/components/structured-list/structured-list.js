/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '../../globals/js/settings';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import handles from '../../globals/js/mixins/handles';
import eventMatches from '../../globals/js/misc/event-matches';
import on from '../../globals/js/misc/on';

const toArray = arrayLike => Array.prototype.slice.call(arrayLike);

class StructuredList extends mixin(
  createComponent,
  initComponentBySearch,
  handles
) {
  /**
   * StructuredList
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The root element of tables
   * @param {object} [options] the... options
   * @param {string} [options.selectorInit] selector initialization
   * @param {string} [options.selectorRow] css selector for selected row
   */
  constructor(element, options) {
    super(element, options);
    this.manage(
      on(this.element, 'keydown', evt => {
        if (
          evt.which === 37 ||
          evt.which === 38 ||
          evt.which === 39 ||
          evt.which === 40
        ) {
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
      37: -1, // backward
      38: -1, // backward
      39: 1, // forward
      40: 1, // forward
    }[evt.which];
  }

  _nextIndex(array, arrayItem, direction) {
    return array.indexOf(arrayItem) + direction; // returns -1, 0, 1, 2, 3, 4...
  }

  _getInput(index) {
    const rows = toArray(
      this.element.querySelectorAll(this.options.selectorRow)
    );
    return this.element.ownerDocument.querySelector(
      this.options.selectorListInput(rows[index].getAttribute('for'))
    );
  }

  _handleInputChecked(index) {
    const rows = this.element.querySelectorAll(this.options.selectorRow);
    const input = this.getInput(index) || rows[index].querySelector('input');
    input.checked = true;
  }

  _handleClick(evt) {
    const selectedRow = eventMatches(evt, this.options.selectorRow);
    toArray(
      this.element.querySelectorAll(this.options.selectorRow)
    ).forEach(row => row.classList.remove(this.options.classActive));
    if (selectedRow) {
      selectedRow.classList.add(this.options.classActive);
    }
  }

  // Handle Enter or Space keydown events for selecting <label> rows
  _handleKeydownChecked(evt) {
    evt.preventDefault(); // prevent spacebar from scrolling page
    const selectedRow = eventMatches(evt, this.options.selectorRow);
    toArray(
      this.element.querySelectorAll(this.options.selectorRow)
    ).forEach(row => row.classList.remove(this.options.classActive));
    if (selectedRow) {
      selectedRow.classList.add(this.options.classActive);
      const input =
        selectedRow.querySelector(
          this.options.selectorListInput(selectedRow.getAttribute('for'))
        ) || selectedRow.querySelector('input');
      input.checked = true;
    }
  }

  // Handle up and down keydown events for selecting <label> rows
  _handleKeydownArrow(evt) {
    evt.preventDefault(); // prevent arrow keys from scrolling
    const selectedRow = eventMatches(evt, this.options.selectorRow);
    const direction = this._direction(evt);

    if (direction && selectedRow !== undefined) {
      const rows = toArray(
        this.element.querySelectorAll(this.options.selectorRow)
      );
      rows.forEach(row => row.classList.remove(this.options.classActive));
      const firstIndex = 0;
      const nextIndex = this._nextIndex(rows, selectedRow, direction);
      const lastIndex = rows.length - 1;
      const getSelectedIndex = () => {
        switch (nextIndex) {
          case -1:
            return lastIndex;
          case rows.length:
            return firstIndex;
          default:
            return nextIndex;
        }
      };
      const selectedIndex = getSelectedIndex();
      rows[selectedIndex].classList.add(this.options.classActive);
      rows[selectedIndex].focus();
      this._handleInputChecked(selectedIndex);
    }
  }

  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

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
