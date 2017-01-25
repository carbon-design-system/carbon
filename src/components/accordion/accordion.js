import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import '../../../demo/polyfills/array-from';
import '../../../demo/polyfills/element-matches';
import '../../../demo/polyfills/object-assign';
import '../../../demo/polyfills/custom-event';

class Accordion extends mixin(createComponent, initComponentBySearch) {
  /**
   * Accordion.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as an accordion.
   */
  constructor(element, options) {
    super(element, options);
    [...this.element.querySelectorAll(this.options.accordionItem)].forEach((item) => {
      item.addEventListener('click', (event) => { this.handleClick(event); });
      item.addEventListener('keypress', (event) => { this.handleKeypress(event); });
    });
  }

  /**
   * Handles toggling of active state of accordion
   * @param {Event} event The event triggering this method.
   */
  handleClick(event) {
    event.currentTarget.classList.toggle('bx--accordion__item--active');
  }

  /**
   * Handles toggling of active state of accordion via keyboard
   * @param {Event} event The event triggering this method.
   */
  handleKeypress(event) {
    if (event.keyCode === 13 || event.keyCode === 32) this.handleClick(event);
  }
}

/**
 * The map associating DOM element and accordion UI instance.
 * @type {WeakMap}
 */
Accordion.components = new WeakMap();

/**
 * The component options.
 * If `options` is specified in the constructor,
 * {@linkcode NumberInput.create .create()}, or {@linkcode NumberInput.init .init()},
 * properties in this object are overriden for the instance being create and how {@linkcode NumberInput.init .init()} works.
 * @property {string} selectorInit The CSS selector to find accordion UIs.
 */
Accordion.options = {
  selectorInit: '[data-accordion]',
  accordionItem: '[data-accordion-item]',
};

export default Accordion;
