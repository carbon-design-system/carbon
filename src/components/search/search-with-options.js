import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import '../../../demo/polyfills/array-from';
import '../../../demo/polyfills/custom-event';
import '../../../demo/polyfills/element-matches';
import '../../../demo/polyfills/object-assign';
import toggleClass from '../../../demo/polyfills/toggle-class';

class SearchWithOptions extends mixin(createComponent, initComponentBySearch) {
  /**
   * Search with Options.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as the search component.
   * @param {Object} [options] The component options
   * @param {string} [options.selectorToggleLayoutBtn]
   *   The data attribute selector for the button that toggles between the layouts.
   * @param {string} [options.selectorIconContainer] The data attribute selector for the icon layout container.
   * @param {string} [options.classHiddenContainer] The class selector for a hidden container.
   */
  constructor(element, options) {
    super(element, options);
    const toggleLayoutBtnNode = this.element.querySelector(this.options.selectorToggleLayoutBtn);
    toggleLayoutBtnNode.addEventListener('click', (evt) => { this.toggleLayout(evt); });
  }

  /**
   * Toggles between the grid and list layout.
   * @param {Event} event The event triggering this method.
   */
  toggleLayout(evt) {
    const btn = evt.currentTarget;
    const iconContainers = [...btn.querySelectorAll(this.options.selectorIconContainer)];
    iconContainers.forEach((container) => {
      const isHidden = container.classList.contains(this.options.classHiddenContainer);
      toggleClass(container, this.options.classHiddenContainer, !isHidden);
    });
  }

  /**
   * The map associating DOM element and content switcher set instance.
   * @member SearchWithOptions.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode SearchWithOptions.create .create()}, or {@linkcode SearchWithOptions.init .init()},
   * properties in this object are overriden for the instance being created
   * and how {@linkcode SearchWithOptions.init .init()} works.
   * @member SearchWithOptions.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find search UIs with options.
   */
  static options = {
    selectorInit: '[data-search-with-options]',
    selectorToggleLayoutBtn: '[data-search-toggle-btn]',
    selectorIconContainer: '[data-search-toggle-layout]',
    classHiddenContainer: 'bx--search__toggle-layout__container--hidden',
  };
}

export default SearchWithOptions;
