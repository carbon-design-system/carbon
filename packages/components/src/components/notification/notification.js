/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventedState from '../../globals/js/mixins/evented-state';
import handles from '../../globals/js/mixins/handles';
import on from '../../globals/js/misc/on';

class Notification extends mixin(
  createComponent,
  initComponentBySearch,
  eventedState,
  handles
) {
  /**
   * InlineNotification.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a InlineNotification.
   */
  constructor(element, options) {
    super(element, options);
    this.button = element.querySelector(this.options.selectorButton);
    if (this.button) {
      this.manage(
        on(this.button, 'click', (evt) => {
          if (evt.currentTarget === this.button) {
            this.remove();
          }
        })
      );
    }
  }

  _changeState = (state, callback) => {
    if (state === 'delete-notification') {
      this.element.parentNode.removeChild(this.element);
      this.release();
    }
    callback();
  };

  remove() {
    this.changeState('delete-notification');
  }

  /**
   * The map associating DOM element and accordion UI instance.
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  /**
   * The component options.
   * @property {string} selectorInit The CSS selector to find InlineNotification.
   * @property {string} selectorButton The CSS selector to find close button.
   */
  static options /* #__PURE_CLASS_PROPERTY__ */ = {
    selectorInit: '[data-notification]',
    selectorButton: '[data-notification-btn]',
    eventBeforeDeleteNotification: 'notification-before-delete',
    eventAfterDeleteNotification: 'notification-after-delete',
  };
}

export default Notification;
