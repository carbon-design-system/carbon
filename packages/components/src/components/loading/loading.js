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

class Loading extends mixin(createComponent, initComponentBySearch, handles) {
  /**
   * Spinner indicating loading state.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a spinner.
   * @param {object} [options] The component options.
   * @param {boolean} [options.active] `true` if this spinner should roll.
   */
  constructor(element, options) {
    super(element, options);

    this.active = this.options.active;

    // Initialize spinner
    this.set(this.active);
  }

  /**
   * Sets active/inactive state.
   * @param {boolean} active `true` if this spinner should roll.
   */
  set(active) {
    if (typeof active !== 'boolean') {
      throw new TypeError('set expects a boolean.');
    }

    this.active = active;
    this.element.classList.toggle(this.options.classLoadingStop, !this.active);

    /**
     * If overlay is the parentNode then toggle it too.
     */
    const { parentNode } = this.element;

    if (
      parentNode &&
      parentNode.classList.contains(this.options.classLoadingOverlay)
    ) {
      parentNode.classList.toggle(
        this.options.classLoadingOverlayStop,
        !this.active
      );
    }

    return this;
  }

  /**
   * Toggles active/inactive state.
   */
  toggle() {
    return this.set(!this.active);
  }

  /**
   * @returns {boolean} `true` if this spinner is rolling.
   */
  isActive() {
    return this.active;
  }

  /**
   * Sets state to inactive and deletes the loading element.
   */
  end() {
    this.set(false);
    let handleAnimationEnd = this.manage(
      on(this.element, 'animationend', evt => {
        if (handleAnimationEnd) {
          handleAnimationEnd = this.unmanage(handleAnimationEnd).release();
        }
        if (evt.animationName === 'rotate-end-p2') {
          this._deleteElement();
        }
      })
    );
  }

  /**
   * Delete component from the DOM.
   */
  _deleteElement() {
    const { parentNode } = this.element;

    parentNode.removeChild(this.element);

    if (parentNode.classList.contains(this.options.selectorLoadingOverlay)) {
      parentNode.remove();
    }
  }

  /**
   * The map associating DOM element and spinner instance.
   * @member Loading.components
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode Loading.create .create()}, or {@linkcode Loading.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode Loading.init .init()} works.
   * @member Loading.options
   * @type {object}
   * @property {string} selectorInit The CSS selector to find spinners.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-loading]',
      selectorLoadingOverlay: `.${prefix}--loading-overlay`,
      classLoadingOverlay: `${prefix}--loading-overlay`,
      classLoadingStop: `${prefix}--loading--stop`,
      classLoadingOverlayStop: `${prefix}--loading-overlay--stop`,
      active: true,
    };
  }
}

export default Loading;
