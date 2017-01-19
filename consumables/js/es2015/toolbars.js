import mixin from '../misc/mixin';
import createComponent from '../mixins/create-component';
import initComponent from '../mixins/init-component-by-search';
import '../polyfills/array-from';
import '../polyfills/element-matches';
import '../polyfills/object-assign';

class Toolbars extends mixin(createComponent, initComponent) {
  /**
   * Search button in tool bar.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as an search button.
   */
  constructor(element) {
    super(element);
    this.searchFieldNode = this.element.ownerDocument.querySelector(this.element.dataset.listIconsSearchActionTarget);
    this.element.addEventListener('click', (event) => { this.handleActionClick(event); });
  }

  /**
   * Show/hide search box.
   * @param {Event} event The event triggering this method.
   */
  handleActionClick(event) {
    const searchActionNode = event.currentTarget;

    if (searchActionNode.tagName === 'A') {
      event.preventDefault();
    }

    this.element.classList.toggle('show-search');
    if (this.searchFieldNode) {
      this.searchFieldNode.classList.toggle('show-search');
      this.searchFieldNode.value = '';
    }
  }

  /**
   * The map associating DOM element and search button instance.
   * @member Toolbars.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode Toolbars.create .create()}, or {@linkcode Toolbars.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode Toolbars.init .init()} works.
   * @member Toolbars.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find search buttons.
   */
  static options = {
    selectorInit: '[data-list-icons-search-action-target]',
  };
}

export default Toolbars;
