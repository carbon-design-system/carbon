import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';

class NumberInput extends mixin(createComponent, initComponentBySearch) {
  /**
   * Number input UI.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as a number input UI.
   */
  constructor(element, options) {
    super(element, options);
    // Broken DOM tree is seen with up/down arrows <svg> in IE, which breaks event delegation.
    // <svg> does not have `Element.classList` in IE11
    this.element.querySelector('.up-icon').addEventListener('click', event => {
      this._handleClick(event);
    });
    this.element.querySelector('.down-icon').addEventListener('click', event => {
      this._handleClick(event);
    });
  }

  /**
   * Increase/decrease number by clicking on up/down icons.
   * @param {Event} event The event triggering this method.
   */
  _handleClick(event) {
    const numberInput = this.element.querySelector('.bx--number input');
    const target = event.currentTarget.getAttribute('class').split(' ');

    if (target.indexOf('up-icon') >= 0) {
      ++numberInput.value;
    } else if (target.indexOf('down-icon') >= 0) {
      --numberInput.value;
    }

    // Programmatic change in value (including `stepUp()`/`stepDown()`) won't fire change event
    numberInput.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        cancelable: false,
      })
    );
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
