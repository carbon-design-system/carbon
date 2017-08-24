import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventMatches from '../../globals/js/misc/event-matches';
import on from '../../globals/js/misc/on';

class Tile extends mixin(createComponent, initComponentBySearch) {
  /**
   * Tile.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as an Tile.
   */
  constructor(element, options) {
    super(element, options);
    const tileType = this.element.dataset.tile;
    this._hookActions(tileType);
  }

  _hookActions = (type) => {
    if (type === 'expandable') {
      this.element.addEventListener('click', () => {
        this.element.classList.toggle(this.options.classExpandedTile);
      });
    } else if (type === 'clickable') {
      this.element.addEventListener('click', () => {
        this.element.classList.toggle(this.options.classClickableTile);
      });
    } else if (type === 'selectable') {
      this.element.addEventListener('click', () => {
        this.element.classList.toggle(this.options.classSelectableTile);
      });
    }
  }

  release() {
    if (this.hDocumentClick) {
      this.hDocumentClick = this.hDocumentClick.release();
    }
    if (this.hDocumentKeyPress) {
      this.hDocumentKeyPress = this.hDocumentKeyPress.release();
    }
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
    classExpandedTile: 'bx--tile--is-expanded',
    classClickableTile: 'bx--tile--is-clicked',
    classSelectableTile: 'bx--tile--is-selected',
  }
}

export default Tile;
