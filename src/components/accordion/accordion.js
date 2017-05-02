import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch
  from '../../globals/js/mixins/init-component-by-search';
import eventMatches from '../../globals/js/misc/event-matches';

class Accordion extends mixin(createComponent, initComponentBySearch) {
  /**
   * Accordion.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as an accordion.
   */
  constructor(element, options) {
    super(element, options);
    this.element.addEventListener('click', (event) => {
      const item = eventMatches(event, this.options.selectorAccordionItem);
      if (item && !eventMatches(event, this.options.selectorAccordionContent)) {
        item.classList.toggle(this.options.classActive);
      }
    });

    this.element.addEventListener('keypress', (event) => {
      const item = eventMatches(event, this.options.selectorAccordionItem);
      if (item && !eventMatches(event, this.options.selectorAccordionContent)) {
        this._handleKeypress(event);
      }
    });
  }

  /**
   * Handles toggling of active state of accordion via keyboard
   * @param {Event} event The event triggering this method.
   */
  _handleKeypress(event) {
    if (event.which === 13 || event.which === 32) {
      event.target.classList.toggle(this.options.classActive);
    }
  }

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode NumberInput.create .create()}, or {@linkcode NumberInput.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode NumberInput.init .init()} works.
   * @property {string} selectorInit The CSS selector to find accordion UIs.
   */
  static options = {
    selectorInit: '[data-accordion]',
    selectorAccordionItem: '.bx--accordion__item',
    selectorAccordionContent: '.bx--accordion__content',
    classActive: 'bx--accordion__item--active',
  };

  /**
   * The map associating DOM element and accordion UI instance.
   * @type {WeakMap}
   */
  static components = new WeakMap();
}

export default Accordion;
