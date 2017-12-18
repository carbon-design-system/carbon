import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import InitComponentBySearch from '../../globals/js/mixins/init-component-by-search';


const stateChangeTypes = {
  checked: 'true',
  unchecked: 'false',
  mixed: 'mixed',
}

class Checkbox extends mixin(createComponent, InitComponentBySearch) {
  /**
   * Checkbox UI.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as a checkbox UI.
   */
  
  constructor(element, options) {
    super(element, options);
    this.element.addEventListener('click', () => this._handleClick());
    this.element.addEventListener('focus', () => this._handleFocus());
    this.element.addEventListener('blur', () => this._handleBlur());
    
    this._indeterminateCheckbox();
    this._initCheckbox();
  }
  
  _handleClick() {
    
    if (this.element.checked) {
      this.element.setAttribute('checked', '');
      this.element.setAttribute('aria-checked', 'true');

      //Adds class for nested checkboxes inside labels
      if (this.element.parentElement.classList.contains('bx--checkbox-label')) {
        this.element.parentElement.classList.add('bx--checkbox-label__checked');
        this.element.parentElement.classList.remove('bx--checkbox-label__indeterminate');
      }
    } else {
      this.element.removeAttribute('checked');
      this.element.setAttribute('aria-checked', 'false');
      
      //Removes class for nested checkboxes inside labels
      if (this.element.parentElement.classList.contains('bx--checkbox-label')) {
        this.element.parentElement.classList.remove('bx--checkbox-label__checked', 'bx--checkbox-label__indeterminate');
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
      throw new TypeError('setState expects a value of checked, unchecked or mixed.');
    }

    this.element.setAttribute('aria-checked', state);

    if (state === stateChangeTypes.mixed) {
      this.element.indeterminate = true;
      if (this.element.parentElement.classList.contains('bx--checkbox-label')) {
        this.element.parentElement.classList.add('bx--checkbox-label__indeterminate');
      }  
    }

    if (state === stateChangeTypes.checked || state === stateChangeTypes.unchecked) {
      this.element.indeterminate = false;

      // Check to see if we're in the nested checkbox
      if (this.element.parentElement.classList.contains('bx--checkbox-label')) {
        this.element.parentElement.classList.remove('bx--checkbox-label__indeterminate');

        if (state === stateChangeTypes.checked) {
          this.element.parentElement.classList.add('bx--checkbox-label__checked');
        }
        if (state === stateChangeTypes.unchecked) {
          this.element.parentElement.classList.remove('bx--checkbox-label__checked');
        }        
      }
    }
  }

  _indeterminateCheckbox() {
    if (this.element.getAttribute('aria-checked', 'mixed')) {
      this.element.indeterminate = true;
    }

    if (this.element.indeterminate === true) {
      this.element.parentElement.classList.add('bx--checkbox-label__indeterminate');
      this.element.setAttribute('aria-checked', 'mixed');
   }
  }

  _initCheckbox() {
    if (this.element.checked) {
      this.element.setAttribute('aria-checked', 'true');
    }
    if (this.element.parentElement.classList.contains('bx--checkbox-label') && this.element.checked) {
      this.element.parentElement.classList.add('bx--checkbox-label__checked');
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

  static stateChangeTypes = stateChangeTypes
}

export default Checkbox;
