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

class CopyButton extends mixin(
  createComponent,
  initComponentBySearch,
  handles
) {
  /**
   * CopyBtn UI.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a copy button UI.
   */
  constructor(element, options) {
    super(element, options);
    this.manage(on(this.element, 'click', () => this.handleClick()));
  }

  /**
   * Show the feedback tooltip on click. Hide the feedback tooltip after specified timeout value.
   */
  handleClick() {
    const feedback = this.element.querySelector(this.options.feedbackTooltip);
    if (feedback) {
      feedback.classList.add(this.options.classShowFeedback);
      setTimeout(() => {
        feedback.classList.remove(this.options.classShowFeedback);
      }, this.options.timeoutValue);
    }
  }

  /**
   * The map associating DOM element and copy button UI instance.
   * @member CopyBtn.components
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode CopyBtn.create .create()}, or {@linkcode CopyBtn.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode CopyBtn.init .init()} works.
   * @member CopyBtn.options
   * @type {object}
   * @property {string} selectorInit The data attribute to find copy button UIs.
   * @property {string} feedbackTooltip The data attribute to find feedback tooltip.
   * @property {string} classShowFeedback The CSS selector for showing the feedback tooltip.
   * @property {number} timeoutValue The specified timeout value before the feedback tooltip is hidden.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-copy-btn]',
      feedbackTooltip: '[data-feedback]',
      classShowFeedback: `${prefix}--btn--copy__feedback--displayed`,
      timeoutValue: 2000,
    };
  }
}

export default CopyButton;
