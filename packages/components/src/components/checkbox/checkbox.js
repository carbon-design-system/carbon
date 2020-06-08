/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '../../globals/js/settings';
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
      on(this.element, 'click', (event) => {
        this._handleClick(event);
      })
    );
    this.manage(
      on(this.element, 'focus', (event) => {
        this._handleFocus(event);
      })
    );
    this.manage(
      on(this.element, 'blur', (event) => {
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
      if (
        this.element.parentElement.classList.contains(this.options.classLabel)
      ) {
        this.element.parentElement.setAttribute(
          this.options.attribContainedCheckboxState,
          'true'
        );
      }
    } else if (this.element.checked === false) {
      this.element.removeAttribute('checked');
      this.element.setAttribute('aria-checked', 'false');
      this.element.checked = false;

      // nested checkboxes inside labels
      if (
        this.element.parentElement.classList.contains(this.options.classLabel)
      ) {
        this.element.parentElement.setAttribute(
          this.options.attribContainedCheckboxState,
          'false'
        );
      }
    }
  }

  _handleFocus() {
    if (
      this.element.parentElement.classList.contains(this.options.classLabel)
    ) {
      this.element.parentElement.classList.add(this.options.classLabelFocused);
    }
  }

  _handleBlur() {
    if (
      this.element.parentElement.classList.contains(this.options.classLabel)
    ) {
      this.element.parentElement.classList.remove(
        this.options.classLabelFocused
      );
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

    const container = this.element.closest(
      this.options.selectorContainedCheckboxState
    );
    if (container) {
      container.setAttribute(this.options.attribContainedCheckboxState, state);
    }
  }

  setDisabled(value) {
    if (value === undefined) {
      throw new TypeError(
        'setDisabled expects a boolean value of true or false'
      );
    }
    if (value === true) {
      this.element.setAttribute('disabled', true);
    } else if (value === false) {
      this.element.removeAttribute('disabled');
    }
    const container = this.element.closest(
      this.options.selectorContainedCheckboxDisabled
    );
    if (container) {
      container.setAttribute(
        this.options.attribContainedCheckboxDisabled,
        value
      );
    }
  }

  _indeterminateCheckbox() {
    if (this.element.getAttribute('aria-checked') === 'mixed') {
      this.element.indeterminate = true;
    }
    if (this.element.indeterminate === true) {
      this.element.setAttribute('aria-checked', 'mixed');
    }
    if (
      this.element.parentElement.classList.contains(this.options.classLabel) &&
      this.element.indeterminate === true
    ) {
      this.element.parentElement.setAttribute(
        this.options.attribContainedCheckboxState,
        'mixed'
      );
    }
  }

  _initCheckbox() {
    if (this.element.checked === true) {
      this.element.setAttribute('aria-checked', 'true');
    }
    if (
      this.element.parentElement.classList.contains(this.options.classLabel) &&
      this.element.checked
    ) {
      this.element.parentElement.setAttribute(
        this.options.attribContainedCheckboxState,
        'true'
      );
    }
    if (
      this.element.parentElement.classList.contains(this.options.classLabel)
    ) {
      this.element.parentElement.setAttribute(
        this.options.attribContainedCheckboxDisabled,
        'false'
      );
    }
    if (
      this.element.parentElement.classList.contains(this.options.classLabel) &&
      this.element.disabled
    ) {
      this.element.parentElement.setAttribute(
        this.options.attribContainedCheckboxDisabled,
        'true'
      );
    }
  }

  /**
   * The map associating DOM element and copy button UI instance.
   * @member Checkbox.components
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode Checkbox.create .create()}, or {@linkcode Checkbox.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode Checkbox.init .init()} works.
   * @member Checkbox.options
   * @type {object}
   * @property {string} selectorInit The data attribute to find copy button UIs.
   * @property {string} selectorContainedCheckboxState The CSS selector to find a container of checkbox preserving checked state.
   * @property {string} selectorContainedCheckboxDisabled
   *   The CSS selector to find a container of checkbox preserving disabled state.
   * @property {string} classLabel The CSS class for the label.
   * @property {string} classLabelFocused The CSS class for the focused label.
   * @property {string} attribContainedCheckboxState The attribute name for the checked state of contained checkbox.
   * @property {string} attribContainedCheckboxDisabled The attribute name for the disabled state of contained checkbox.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: `.${prefix}--checkbox`,
      selectorContainedCheckboxState: '[data-contained-checkbox-state]',
      selectorContainedCheckboxDisabled: '[data-contained-checkbox-disabled]',
      classLabel: `${prefix}--checkbox-label`,
      classLabelFocused: `${prefix}--checkbox-label__focus`,
      attribContainedCheckboxState: 'data-contained-checkbox-state',
      attribContainedCheckboxDisabled: 'data-contained-checkbox-disabled',
    };
  }

  static stateChangeTypes /* #__PURE_CLASS_PROPERTY__ */ = stateChangeTypes;
}

export default Checkbox;
