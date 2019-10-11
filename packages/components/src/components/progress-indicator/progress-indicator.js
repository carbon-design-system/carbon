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

const toArray = arrayLike => Array.prototype.slice.call(arrayLike);

class ProgressIndicator extends mixin(createComponent, initComponentBySearch) {
  /**
   * ProgressIndicator.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element representing the ProgressIndicator.
   * @param {object} [options] The component options.
   * @property {string} [options.selectorStepElement] The CSS selector to find step elements.
   * @property {string} [options.selectorCurrent] The CSS selector to find the current step element.
   * @property {string} [options.selectorIncomplete] The CSS class to find incomplete step elements.
   * @property {string} [options.selectorComplete] The CSS selector to find completed step elements.
   * @property {string} [options.classStep] The className for a step element.
   * @property {string} [options.classComplete] The className for a completed step element.
   * @property {string} [options.classCurrent] The className for the current step element.
   * @property {string} [options.classIncomplete] The className for a incomplete step element.
   */
  constructor(element, options) {
    super(element, options);

    /**
     * The component state.
     * @type {Object}
     */
    this.state = {
      /**
       * The current step index.
       * @type {number}
       */
      currentIndex: this.getCurrent().index,

      /**
       * Total number of steps.
       * @type {number}
       */
      totalSteps: this.getSteps().length,
    };

    this.addOverflowTooltip();
  }

  /**
   * Returns all steps with details about element and index.
   */
  getSteps() {
    return toArray(
      this.element.querySelectorAll(this.options.selectorStepElement)
    ).map((element, index) => ({
      element,
      index,
    }));
  }

  /**
   * Returns current step; gives detail about element and index.
   */
  getCurrent() {
    const currentEl = this.element.querySelector(this.options.selectorCurrent);
    return this.getSteps().filter(step => step.element === currentEl)[0];
  }

  /**
   * Sets the current step.
   * * @param {Number} new step index or use default in `this.state.currentIndex`.
   */
  setCurrent(newCurrentStep = this.state.currentIndex) {
    let changed = false;

    if (newCurrentStep !== this.state.currentIndex) {
      this.state.currentIndex = newCurrentStep;
      changed = true;
    }

    if (changed) {
      this.getSteps().forEach(step => {
        if (step.index < newCurrentStep) {
          this._updateStep({
            element: step.element,
            className: this.options.classComplete,
            html: this._getSVGComplete(),
          });
        }

        if (step.index === newCurrentStep) {
          this._updateStep({
            element: step.element,
            className: this.options.classCurrent,
            html: this._getCurrentSVG(),
          });
        }

        if (step.index > newCurrentStep) {
          this._updateStep({
            element: step.element,
            className: this.options.classIncomplete,
            html: this._getIncompleteSVG(),
          });
        }
      });
    }
  }

  /**
   * Update step with correct inline SVG and className
   * @param {object} args
   * @param {object} [args.element] target element
   * @param {object} [args.className] new className
   * @param {object} [args.html] new inline SVG to insert
   */
  _updateStep(args) {
    const { element, className, html } = args;

    if (element.firstElementChild) {
      element.removeChild(element.firstElementChild);
    }

    if (!element.classList.contains(className)) {
      element.setAttribute('class', this.options.classStep);
      element.classList.add(className);
    }

    element.insertAdjacentHTML('afterbegin', html);
  }

  /**
   * Returns HTML string for an SVG used to represent a compelted step (checkmark)
   */
  _getSVGComplete() {
    return `<svg width="24px" height="24px" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="12"></circle>
        <polygon points="10.3 13.6 7.7 11 6.3 12.4 10.3 16.4 17.8 9 16.4 7.6"></polygon>
      </svg>`;
  }

  /**
   * Returns HTML string for an SVG used to represent current step (circles, like a radio button, but not.)
   */
  _getCurrentSVG() {
    return `<svg>
        <circle cx="12" cy="12" r="12"></circle>
        <circle cx="12" cy="12" r="6"></circle>
      </svg>`;
  }

  /**
   * Returns HTML string for an SVG used to represent incomple step (grey empty circle)
   */
  _getIncompleteSVG() {
    return `<svg>
        <circle cx="12" cy="12" r="12"></circle>
      </svg>`;
  }

  addOverflowTooltip() {
    const stepLabels = toArray(
      this.element.querySelectorAll(this.options.selectorLabel)
    );
    const tooltips = toArray(
      this.element.querySelectorAll(this.options.selectorTooltip)
    );

    stepLabels.forEach(step => {
      if (step.scrollWidth > this.options.maxWidth) {
        step.classList.add(this.options.classOverflowLabel);
      }
    });

    tooltips.forEach(tooltip => {
      const childText = tooltip.querySelector(this.options.selectorTooltipText);
      if (childText.scrollHeight > this.options.tooltipMaxHeight) {
        tooltip.classList.add(this.options.classTooltipMulti);
      }
    });
  }

  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode ProgressIndicator.create .create()}, or {@linkcode ProgressIndicator.init .init()},
   * properties in this object are overriden for the instance being created.
   * @member ProgressIndicator.options
   * @type {object}
   * @property {string} selectorInit The CSS selector to find content switcher button set.
   * @property {string} [selectorStepElement] The CSS selector to find step elements.
   * @property {string} [selectorCurrent] The CSS selector to find the current step element.
   * @property {string} [selectorIncomplete] The CSS class to find incomplete step elements.
   * @property {string} [selectorComplete] The CSS selector to find completed step elements.
   * @property {string} [classStep] The className for a step element.
   * @property {string} [classComplete] The className for a completed step element.
   * @property {string} [classCurrent] The className for the current step element.
   * @property {string} [classIncomplete] The className for a incomplete step element.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-progress]',
      selectorStepElement: `.${prefix}--progress-step`,
      selectorCurrent: `.${prefix}--progress-step--current`,
      selectorIncomplete: `.${prefix}--progress-step--incomplete`,
      selectorComplete: `.${prefix}--progress-step--complete`,
      selectorLabel: `.${prefix}--progress-label`,
      selectorTooltip: `.${prefix}--tooltip`,
      selectorTooltipText: `.${prefix}--tooltip__text`,
      classStep: `${prefix}--progress-step`,
      classComplete: `${prefix}--progress-step--complete`,
      classCurrent: `${prefix}--progress-step--current`,
      classIncomplete: `${prefix}--progress-step--incomplete`,
      classOverflowLabel: `${prefix}--progress-label-overflow`,
      classTooltipMulti: `${prefix}--tooltip_multi`,
      maxWidth: 87,
      tooltipMaxHeight: 21,
    };
  }
}

export default ProgressIndicator;
