import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';

class TimePicker extends mixin(createComponent, initComponentBySearch) {
  /**
   * Time picker UI.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as a time picker UI.
   */
  constructor(element, options) {
    super(element, options);
    this._initInputEvents();
    this._setMinMaxValues();
    this.element.militaryTime = false;
  }

  setMilitaryTime = () => {
    this.element.militaryTime = true;
    this._setMinMaxValues();
  }

  _setMinMaxValues = () => {
    const hourInput = this.element.querySelector(this.options.classHoursInput);
    if (this.element.militaryTime) {
      hourInput.max = 24;
    } else {
      hourInput.max = 12;
    }
  }

  _initInputEvents = () => {
    [...this.element.querySelectorAll(this.options.selectorTimePickerInputField)].forEach((input) => {
      const curInput = input;
      const isText = (input.type === 'text');
      let lastKey;
      input.addEventListener('focus', () => {
        this.element.querySelector(this.options.selectorTimePickerInput).classList.add('focused');
        input.select();
      });
      input.addEventListener('blur', () => {
        this.element.querySelector(this.options.selectorTimePickerInput).classList.remove('focused');
      });
      input.addEventListener('change', () => {
        if (curInput.value.length === 1 && !isText) {
          curInput.value = `0${curInput.value}`;
        }
      });
      input.addEventListener('keydown', (e) => {
        lastKey = e.which;
      });
      input.addEventListener('input', () => {
        if (isText) {
          if (curInput.value === 'a' || curInput.value === 'A') {
            curInput.value = 'am';
          } else if (curInput.value === 'p' || curInput.value === 'P') {
            curInput.value = 'pm';
          } else {
            curInput.value = '';
          }
        }
        if (lastKey === 8) {
          curInput.value = '';
        }
      });
    });
  }

  /**
   * The map associating DOM element and time picker UI instance.
   * @member TimePicker.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode TimePicker.create .create()}, or {@linkcode TimePicker.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode TimePicker.init .init()} works.
   * @member TimePicker.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find time picker UIs.
   */
  static options = {
    selectorInit: '[data-time-picker]',
    selectorTimePickerInput: '[data-time-picker-input]',
    selectorTimePickerInputField: '[data-time-picker-input-field]',
    classMinutesInput: '.bx--time-picker__input-field--mins',
    classHoursInput: '.bx--time-picker__input-field--hours',
    classAMPMInput: '.bx--time-picker__input-field--text',
  };
}

export default TimePicker;
