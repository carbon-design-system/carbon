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
import eventMatches from '../../globals/js/misc/event-matches';

class Tile extends mixin(createComponent, initComponentBySearch) {
  /**
   * Tile.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as an Tile.
   */
  constructor(element, options) {
    super(element, options);
    this.tileType = this.element.dataset.tile;
    this.tileHeight = 0; // Tracks expandable tile height
    this.atfHeight = 0; // Tracks above the fold height
    this._hookActions(this._getClass(this.tileType));
  }

  _getClass = (type) => {
    const typeObj = {
      expandable: this.options.classExpandedTile,
      clickable: this.options.classClickableTile,
      selectable: this.options.classSelectableTile,
    };
    return typeObj[type];
  };

  _hookActions = (tileClass) => {
    const isExpandable = this.tileType === 'expandable';
    if (isExpandable) {
      const aboveTheFold = this.element.querySelector(
        this.options.selectorAboveTheFold
      );
      const getStyle = this.element.ownerDocument.defaultView.getComputedStyle(
        this.element,
        null
      );
      const tilePaddingTop = parseInt(
        getStyle.getPropertyValue('padding-top'),
        10
      );
      const tilePaddingBottom = parseInt(
        getStyle.getPropertyValue('padding-bottom'),
        10
      );
      const tilePadding = tilePaddingTop + tilePaddingBottom;
      if (aboveTheFold) {
        this.tileHeight = this.element.getBoundingClientRect().height;
        this.atfHeight =
          aboveTheFold.getBoundingClientRect().height + tilePadding;
        this.element.style.maxHeight = `${this.atfHeight}px`;
      }

      if (this.element.classList.contains(this.options.classExpandedTile)) {
        this._setTileHeight();
      }
    }

    this.element.addEventListener('click', (evt) => {
      const input = eventMatches(evt, this.options.selectorTileInput);
      if (!input) {
        this.element.classList.toggle(tileClass);
      }
      if (isExpandable) {
        this._setTileHeight();
      }
    });
    this.element.addEventListener('keydown', (evt) => {
      const input = this.element.querySelector(this.options.selectorTileInput);
      if (input) {
        if (evt.which === 13 || evt.which === 32) {
          if (!isExpandable) {
            this.element.classList.toggle(tileClass);
            input.checked = !input.checked;
          }
        }
      }
    });
  };

  _setTileHeight = () => {
    const isExpanded = this.element.classList.contains(
      this.options.classExpandedTile
    );
    this.element.style.maxHeight = isExpanded
      ? `${this.tileHeight}px`
      : `${this.atfHeight}px`;
  };

  release() {
    super.release();
  }

  /**
   * The map associating DOM element and Tile UI instance.
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * properties in this object are overriden for the instance being created.
   * @property {string} selectorInit The CSS selector to find Tile instances.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-tile]',
      selectorAboveTheFold: '[data-tile-atf]',
      selectorTileInput: '[data-tile-input]',
      classExpandedTile: `${prefix}--tile--is-expanded`,
      classClickableTile: `${prefix}--tile--is-clicked`,
      classSelectableTile: `${prefix}--tile--is-selected`,
    };
  }
}

export default Tile;
