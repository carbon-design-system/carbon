import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import InitComponentBySearch from '../../globals/js/mixins/init-component-by-search';

class Checkbox extends mixin(createComponent, InitComponentBySearch) {
  /**
   * Checkbox UI.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as a copy button UI.
   */
  
  constructor(element, options) {
    super(element, options);
    this.element.addEventListener('click', () => this.handleClick());
    this.element.addEventListener('focus', () => this.handleFocus());
    this.element.addEventListener('blur', () => this.handleBlur());
    
    this.indeterminateCheckbox();
    this.initCheckbox();
  }
  
  handleClick() {
    
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

  handleFocus() {
    if (this.element.parentElement.classList.contains('bx--checkbox-label')) {
      this.element.parentElement.classList.add('bx--checkbox-label__focus');
    }
  }

  handleBlur() {
    if (this.element.parentElement.classList.contains('bx--checkbox-label')) {
      this.element.parentElement.classList.remove('bx--checkbox-label__focus');
    }
  }

  indeterminateCheckbox() {
    if (!this.element.getAttribute('aria-checked', 'mixed')) {
      return;
    }
    this.element.indeterminate = true;

    if (this.element.indeterminate = true) {
      this.element.parentElement.classList.add('bx--checkbox-label__indeterminate');
   }
  }

  initCheckbox() {
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
}

export default Checkbox;
