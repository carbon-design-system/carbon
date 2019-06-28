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

export default class TextArea extends mixin(
  createComponent,
  initComponentBySearch,
  handles
) {
  /**
   * Text Area.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element - The textarea element
   */
  constructor(element, options) {
    super(element, options);
    this.manage(
      on(this.element, 'input', event => {
        if (event.target.maxLength < 0) {
          return;
        }
        this._handleInput({ element, length: event.target.value.length });
      })
    );
  }

  /**
   * Updates the character counter
   * @param {object} obj - The elements that can change in the component
   * @param {HTMLElement} obj.element - The textarea element
   * @param {HTMLElement} obj.length - The length of the textarea value
   */
  _handleInput = ({ element, length }) => {
    element.querySelector(
      this.options.selectorCharCounter
    ).textContent = length;
  };

  /**
   * The component options.
   *
   * If `options` is specified in the constructor,
   * {@linkcode TextArea.create .create()},
   * or {@linkcode TextArea.init .init()},
   * properties in this object are overriden for the instance being
   * created and how {@linkcode TextArea.init .init()} works.
   * @property {string} selectorInit The CSS selector to find textarea UIs.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-text-area]',
      selectorCharCounter: `.${prefix}--text-area--character-counter--length`,
    };
  }

  /**
   * The map associating DOM element and textarea UI instance.
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();
}
