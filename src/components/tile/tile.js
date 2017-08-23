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

    document.querySelector('[data-tile]').addEventListener('click', () => {
      document.querySelector('[data-tile]').classList.toggle('clicked');
    });
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
   * @property {string} selectorSearch The CSS selector to find search inputs in a Tile.
   * @property {string} selectorRowHeight The CSS selector to find the row height inputs in a Tile.
   * @property {string} classTallRows The CSS class for making table rows into tall rows.
   * @property {string} classSearchActive The CSS class the active state of the search input.
   */
  static options = {
    selectorInit: '[data-tile]',
  }
}

export default Tile;
