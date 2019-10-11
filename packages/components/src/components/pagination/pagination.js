/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import handles from '../../globals/js/mixins/handles';
import eventMatches from '../../globals/js/misc/event-matches';
import on from '../../globals/js/misc/on';

class Pagination extends mixin(
  createComponent,
  initComponentBySearch,
  handles
) {
  /**
   * Pagination component.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as a pagination component.
   * @param {object} [options] The component options.
   * @property {string} [selectorInit] The CSS selector to find pagination components.
   * @property {string} [selectorItemsPerPageInput]
   *   The CSS selector to find the input that determines the number of items per page.
   * @property {string} [selectorPageNumberInput] The CSS selector to find the input that changes the page displayed.
   * @property {string} [selectorPageBackward] The CSS selector to find the button that goes back a page.
   * @property {string} [selectorPageForward] The CSS selector to find the button that goes forward a page.
   * @property {string} [eventItemsPerPage]
   *   The name of the custom event fired when a user changes the number of items per page.
   *   event.detail.value contains the number of items a user wishes to see.
   * @property {string} [eventPageNumber]
   *   The name of the custom event fired when a user inputs a specific page number.
   *   event.detail.value contains the value that the user input.
   * @property {string} [eventPageChange]
   *   The name of the custom event fired when a user goes forward or backward a page.
   *   event.detail.direction contains the direction a user wishes to go.
   */
  constructor(element, options) {
    super(element, options);

    this.manage(
      on(this.element, 'click', evt => {
        if (eventMatches(evt, this.options.selectorPageBackward)) {
          const detail = {
            initialEvt: evt,
            element: evt.target,
            direction: 'backward',
          };
          this._emitEvent(this.options.eventPageChange, detail);
        } else if (eventMatches(evt, this.options.selectorPageForward)) {
          const detail = {
            initialEvt: evt,
            element: evt.target,
            direction: 'forward',
          };
          this._emitEvent(this.options.eventPageChange, detail);
        }
      })
    );

    this.manage(
      on(this.element, 'input', evt => {
        if (eventMatches(evt, this.options.selectorItemsPerPageInput)) {
          const detail = {
            initialEvt: evt,
            element: evt.target,
            value: evt.target.value,
          };
          this._emitEvent(this.options.eventItemsPerPage, detail);
        } else if (eventMatches(evt, this.options.selectorPageNumberInput)) {
          const detail = {
            initialEvt: evt,
            element: evt.target,
            value: evt.target.value,
          };
          this._emitEvent(this.options.eventPageNumber, detail);
        }
      })
    );
  }

  /**
   * Dispatches a custom event
   * @param {string} evtName name of the event to be dispatched.
   * @param {object} detail contains the original event and any other necessary details.
   */
  _emitEvent = (evtName, detail) => {
    const event = new CustomEvent(`${evtName}`, {
      bubbles: true,
      cancelable: true,
      detail,
    });

    this.element.dispatchEvent(event);
  };

  /**
   * The map associating DOM element and pagination instance.
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode Pagination.create .create()}, or {@linkcode Pagination.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode Pagination.init .init()} works.
   * @property {string} [selectorInit] The CSS selector to find pagination components.
   * @property {string} [selectorItemsPerPageInput] The CSS selector to find the input that determines
   * the number of items per page.
   * @property {string} [selectorPageNumberInput] The CSS selector to find the input that changes the page displayed.
   * @property {string} [selectorPageBackward] The CSS selector to find the button that goes back a page.
   * @property {string} [selectorPageForward] The CSS selector to find the button that goes forward a page.
   * @property {string} [eventItemsPerPage]
   *   The name of the custom event fired when a user changes the number of items per page.
   *   event.detail.value contains the number of items a user wishes to see.
   * @property {string} [eventPageNumber]
   *   The name of the custom event fired when a user inputs a specific page number.
   *   event.detail.value contains the value that the user input.
   * @property {string} [eventPageChange]
   *   The name of the custom event fired when a user goes forward or backward a page.
   *   event.detail.direction contains the direction a user wishes to go.
   */
  static options /* #__PURE_CLASS_PROPERTY__ */ = {
    selectorInit: '[data-pagination]',
    selectorItemsPerPageInput: '[data-items-per-page]',
    selectorPageNumberInput: '[data-page-number-input]',
    selectorPageBackward: '[data-page-backward]',
    selectorPageForward: '[data-page-forward]',
    eventItemsPerPage: 'itemsPerPage',
    eventPageNumber: 'pageNumber',
    eventPageChange: 'pageChange',
  };
}

export default Pagination;
