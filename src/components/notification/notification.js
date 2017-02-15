import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventedState from '../../globals/js/mixins/evented-state';
import '../../../demo/polyfills/array-from';
import '../../../demo/polyfills/custom-event';

class Notification extends mixin(createComponent, initComponentBySearch, eventedState) {
  /**
   * InlineNotification.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as a InlineNotification.
   */
  constructor(element, options) {
    super(element, options);
    this.button = element.querySelector(this.options.selectorButton) || false;
    this.button.addEventListener('click', (evt) => {
      this.remove(evt);
    });
  }

  _changeState = (state, callback) => {
    if (state === 'delete-notification') {
      this.element.parentNode.removeChild(this.element);
      this.release();
    }
    callback();
  }

  remove = (evt) => {
    if (evt.currentTarget === this.button) {
      this.changeState('delete-notification');
    }
  }

  /**
   * The map associating DOM element and accordion UI instance.
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * @property {string} selectorInit The CSS selector to find InlineNotification.
   * @property {string} selectorButton The CSS selector to find close button.
   */
  static options = {
    selectorInit: '[data-notification]',
    selectorButton: '[data-notification-btn]',
    eventBeforeDeleteNotification: 'notification-before-delete',
    eventAfterDeleteNotification: 'notification-after-delete',
  };
}

export default Notification;
