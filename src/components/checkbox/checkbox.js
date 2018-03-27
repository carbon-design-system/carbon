import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import handles from '../../globals/js/mixins/handles';
import on from '../../globals/js/misc/on';

const stateChangeTypes = {
  true: 'true',
  false: 'false',
  mixed: 'mixed',
};

class Checkbox extends mixin(createComponent, initComponentBySearch, handles) {
  /**
   * Checkbox UI.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a checkbox UI.
   */

  constructor(element, options) {
    super(element, options);
    this.manage(
      on(this.element, 'click', event => {
        this._handleClick(event);
      })
    );
    this.manage(
      on(this.element, 'focus', event => {
        this._handleFocus(event);
      })
    );
    this.manage(
      on(this.element, 'blur', event => {
        this._handleBlur(event);
      })
    );

    this._indeterminateCheckbox();
    this._initCheckbox();
  }

  _handleClick() {
    if (this.element.checked === true) {
      this.element.setAttribute('checked', '');
      this.element.setAttribute('aria-checked', 'true');
      this.element.checked = true;

      // nested checkboxes inside labels
      if (this.element.parentElement.classList.contains('bx--checkbox-label')) {
        this.element.parentElement.setAttribute('data-contained-checkbox-state', 'true');
      }
    } else if (this.element.checked === false) {
      this.element.removeAttribute('checked');
      this.element.setAttribute('aria-checked', 'false');
      this.element.checked = false;

      // nested checkboxes inside labels
      if (this.element.parentElement.classList.contains('bx--checkbox-label')) {
        this.element.parentElement.setAttribute('data-contained-checkbox-state', 'false');
      }
    }
  }

  _handleFocus() {
    if (this.element.parentElement.classList.contains('bx--checkbox-label')) {
      this.element.parentElement.classList.add('bx--checkbox-label__focus');
    }
  }

  _handleBlur() {
    if (this.element.parentElement.classList.contains('bx--checkbox-label')) {
      this.element.parentElement.classList.remove('bx--checkbox-label__focus');
    }
  }

  /**
   * Sets the new checkbox state.
   * @param {boolean|string} [state]
   *   The new checkbox state to set. `mixed` to put checkbox in indeterminate state.
   *   If omitted, this method simply makes the style reflect `aria-checked` attribute.
   */
  setState(state) {
    if (state === undefined || stateChangeTypes[state] === undefined) {
      throw new TypeError('setState expects a value of true, false or mixed.');
    }

    this.element.setAttribute('aria-checked', state);
    this.element.indeterminate = state === stateChangeTypes.mixed;
    this.element.checked = state === stateChangeTypes.true;

    const container = this.element.closest('[data-contained-checkbox-state]');
    if (container) {
      container.setAttribute('data-contained-checkbox-state', state);
    }
  }

  setDisabled(value) {
    if (value === undefined) {
      throw new TypeError('setDisabled expects a boolean value of true or false');
    }
    if (value === true) {
      this.element.setAttribute('disabled', true);
    } else if (value === false) {
      this.element.removeAttribute('disabled');
    }
    const container = this.element.closest('[data-contained-checkbox-disabled]');
    if (container) {
      container.setAttribute('data-contained-checkbox-disabled', value);
    }
  }

  _indeterminateCheckbox() {
    if (this.element.getAttribute('aria-checked') === 'mixed') {
      this.element.indeterminate = true;
    }
    if (this.element.indeterminate === true) {
      this.element.setAttribute('aria-checked', 'mixed');
    }
    if (this.element.parentElement.classList.contains('bx--checkbox-label') && this.element.indeterminate === true) {
      this.element.parentElement.setAttribute('data-contained-checkbox-state', 'mixed');
    }
  }

  _initCheckbox() {
    if (this.element.checked === true) {
      this.element.setAttribute('aria-checked', 'true');
    }
    if (this.element.parentElement.classList.contains('bx--checkbox-label') && this.element.checked) {
      this.element.parentElement.setAttribute('data-contained-checkbox-state', 'true');
    }
    if (this.element.parentElement.classList.contains('bx--checkbox-label')) {
      this.element.parentElement.setAttribute('data-contained-checkbox-disabled', 'false');
    }
    if (this.element.parentElement.classList.contains('bx--checkbox-label') && this.element.disabled) {
      this.element.parentElement.setAttribute('data-contained-checkbox-disabled', 'true');
    }
  }

  /**
   * The map associating DOM element and copy button UI instance.
   * @member Checkbox.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode Checkbox.create .create()}, or {@linkcode Checkbox.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode Checkbox.init .init()} works.
   * @member Checkbox.options
   * @type {Object}
   * @property {string} selectorInit The data attribute to find copy button UIs.
   */
  static options = {
    selectorInit: '.bx--checkbox',
  };

  static stateChangeTypes = stateChangeTypes;
}

export default Checkbox;
