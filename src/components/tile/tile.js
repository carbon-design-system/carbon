import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';

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
      const aboveTheFold = this.element.querySelector(this.options.selectorAboveTheFold);
      if (aboveTheFold) {
        this.tileHeight = this.element.getBoundingClientRect().height;
        this.atfHeight = aboveTheFold.getBoundingClientRect().height;
        this.element.style.maxHeight = `${this.atfHeight}px`;
      }
    }
    this.element.addEventListener('click', () => {
      this.element.classList.toggle(tileClass);
      if (isExpandable) {
        this._setTileHeight();
      }
    });
    this.element.addEventListener('keydown', (e) => {
      if (e.which === 13 || e.which === 32) {
        this.element.classList.toggle(tileClass);
        if (isExpandable) {
          this._setTileHeight();
        }
      }
    });
  };

  _setTileHeight = () => {
    const isExpanded = this.element.classList.contains(this.options.classExpandedTile);
    this.element.style.maxHeight = (isExpanded) ? `${this.tileHeight}px` : `${this.atfHeight}px`;
  }

  release() {
    super.release();
  }

  /**
   * The map associating DOM element and Tile UI instance.
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * properties in this object are overriden for the instance being created.
   * @property {string} selectorInit The CSS selector to find Tile instances.
   */
  static options = {
    selectorInit: '[data-tile]',
    selectorClickableTile: '[data-tile-clickable]',
    selectorExpandableTile: '[data-tile-expandable]',
    selectorSelectableTile: '[data-tile-selectable]',
    selectorAboveTheFold: '[data-tile-atf]',
    classExpandedTile: 'bx--tile--is-expanded',
    classClickableTile: 'bx--tile--is-clicked',
    classSelectableTile: 'bx--tile--is-selected',
  };
}

export default Tile;
