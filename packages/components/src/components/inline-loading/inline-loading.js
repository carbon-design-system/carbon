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
import toggleAttribute from '../../globals/js/misc/toggle-attribute';

class InlineLoading extends mixin(
  createComponent,
  initComponentBySearch,
  handles
) {
  /**
   * Spinner indicating loading state.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a spinner.
   * @param {object} [options] The component options.
   * @param {string} [options.initialState] The initial state, should be `inactive`, `active` or `finished`.
   */
  constructor(element, options) {
    super(element, options);
    // Sets the initial state
    const { initialState } = this.options;
    if (initialState) {
      this.setState(initialState);
    }
  }

  /**
   * Sets active/inactive state.
   * @param {string} state The new state, should be `inactive`, `active` or `finished`.
   */
  setState(state) {
    const { states } = this.constructor;
    const values = Object.keys(states).map((key) => states[key]);
    if (values.indexOf(state) < 0) {
      throw new Error(
        `One of the following value should be given as the state: ${values.join(
          ', '
        )}`
      );
    }

    const elem = this.element;
    const {
      selectorSpinner,
      selectorFinished,
      selectorError,
      selectorTextActive,
      selectorTextFinished,
      selectorTextError,
    } = this.options;
    const spinner = elem.querySelector(selectorSpinner);
    const finished = elem.querySelector(selectorFinished);
    const error = elem.querySelector(selectorError);
    const textActive = elem.querySelector(selectorTextActive);
    const textFinished = elem.querySelector(selectorTextFinished);
    const textError = elem.querySelector(selectorTextError);

    if (spinner) {
      spinner.classList.toggle(
        this.options.classLoadingStop,
        state !== states.ACTIVE
      );
      toggleAttribute(
        spinner,
        'hidden',
        state !== states.INACTIVE && state !== states.ACTIVE
      );
    }

    if (finished) {
      toggleAttribute(finished, 'hidden', state !== states.FINISHED);
    }

    if (error) {
      toggleAttribute(error, 'hidden', state !== states.ERROR);
    }

    if (textActive) {
      toggleAttribute(textActive, 'hidden', state !== states.ACTIVE);
    }

    if (textFinished) {
      toggleAttribute(textFinished, 'hidden', state !== states.FINISHED);
    }

    if (textError) {
      toggleAttribute(textError, 'hidden', state !== states.ERROR);
    }

    return this;
  }

  /**
   * The list of states.
   * @type {object<string, string>}
   */
  static states /* #__PURE_CLASS_PROPERTY__ */ = {
    INACTIVE: 'inactive',
    ACTIVE: 'active',
    FINISHED: 'finished',
    ERROR: 'error',
  };

  /**
   * The map associating DOM element and spinner instance.
   * @member InlineLoading.components
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode InlineLoading.create .create()},
   * or {@linkcode InlineLoading.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode InlineLoading.init .init()} works.
   * @member InlineLoading.options
   * @type {object}
   * @property {string} selectorInit The CSS selector to find inline loading components.
   * @property {string} selectorSpinner The CSS selector to find the spinner.
   * @property {string} selectorFinished The CSS selector to find the "finished" icon.
   * @property {string} selectorError The CSS selector to find the "error" icon.
   * @property {string} selectorTextActive The CSS selector to find the text describing the active state.
   * @property {string} selectorTextFinished The CSS selector to find the text describing the finished state.
   * @property {string} selectorTextError The CSS selector to find the text describing the error state.
   * @property {string} classLoadingStop The CSS class for spinner's stopped state.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-inline-loading]',
      selectorSpinner: '[data-inline-loading-spinner]',
      selectorFinished: '[data-inline-loading-finished]',
      selectorError: '[data-inline-loading-error]',
      selectorTextActive: '[data-inline-loading-text-active]',
      selectorTextFinished: '[data-inline-loading-text-finished]',
      selectorTextError: '[data-inline-loading-text-error]',
      classLoadingStop: `${prefix}--loading--stop`,
    };
  }
}

export default InlineLoading;
