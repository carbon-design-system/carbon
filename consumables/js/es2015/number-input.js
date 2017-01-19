import mixin from '../misc/mixin';
import createComponent from '../mixins/create-component';
import initComponent from '../mixins/init-component-by-search';
import '../polyfills/array-from';
import '../polyfills/custom-event';
import '../polyfills/element-matches';
import '../polyfills/object-assign';

class NumberInput extends mixin(createComponent, initComponent) {
  /**
   * Number input UI.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as a number input UI.
   */
  constructor(element, options) {
    super(element, options);
    this.options.ie = this.options.ie || 'ActiveXObject' in window;
    // Broken DOM tree is seen with up/down arrows <svg> in IE, which breaks event delegation.
    // Also <svg> does not seems to have `Element.classList`.
    this.element.querySelector('.bx--number__arrow--up').addEventListener('click', (event) => { this.handleClick(event); });
    this.element.querySelector('.bx--number__arrow--down').addEventListener('click', (event) => { this.handleClick(event); });
  }

  /**
   * Increase/decrease number by clicking on up/down icons.
   * @param {Event} event The event triggering this method.
   */
  handleClick(event) {
    const state = event.currentTarget.classList;
    const numberInput = this.element.querySelector('.bx--number__input');

    if (state.contains('bx--number__arrow--up')) {
      if (this.options.ie) {
        ++numberInput.value;
      } else {
        numberInput.stepUp();
      }
    } else if (state.contains('bx--number__arrow--down')) {
      if (this.options.ie) {
        if (numberInput.value > 0) {
          --numberInput.value;
        }
      } else {
        numberInput.stepDown();
      }
    } else {
      return;
    }

    // Programmatic change in value (including `stepUp()`/`stepDown()`) won't fire change event
    numberInput.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      cancelable: false,
    }));
  }

  /**
   * The map associating DOM element and number input UI instance.
   * @member NumberInput.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode NumberInput.create .create()}, or {@linkcode NumberInput.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode NumberInput.init .init()} works.
   * @member NumberInput.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find number input UIs.
   */
  static options = {
    selectorInit: '[data-numberinput]',
  };
}

export default NumberInput;
