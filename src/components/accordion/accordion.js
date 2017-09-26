import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
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
    this.element.addEventListener('click', event => {
      const item = eventMatches(event, this.options.selectorAccordionItem);
      if (item && !eventMatches(event, this.options.selectorAccordionContent)) {
        this._toggle(item);
      }
    });

    /**
     *
     *  DEPRECATE in v8
     *
     *  Swapping to a button elemenet instead of a div
     *  automatically maps click events to keypress as well
     *  This event listener now is only added if user is using
     *  the older markup
     */

    if (!this._checkIfButton()) {
      this.element.addEventListener('keypress', event => {
        const item = eventMatches(event, this.options.selectorAccordionItem);

        if (item && !eventMatches(event, this.options.selectorAccordionContent)) {
          this._handleKeypress(event);
        }
      });
    }
  }

  _checkIfButton() {
    return this.element.firstElementChild.firstElementChild.nodeName === 'BUTTON';
  }

  /**
   * Handles toggling of active state of accordion via keyboard
   * @param {Event} event The event triggering this method.
   */
  _handleKeypress(event) {
    if (event.which === 13 || event.which === 32) {
      this._toggle(event.target);
    }
  }

  _toggle(element) {
    const heading = element.querySelector(this.options.selectorAccordionItemHeading);
    const expanded = heading.getAttribute('aria-expanded');

    if (expanded !== null) {
      heading.setAttribute('aria-expanded', expanded === 'true' ? 'false' : 'true');
    }

    element.classList.toggle(this.options.classActive);
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
    selectorAccordionItemHeading: '.bx--accordion__heading',
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
