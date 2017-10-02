import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventedState from '../../globals/js/mixins/evented-state';

class Notification extends mixin(createComponent, initComponentBySearch, eventedState) {
  /**
   * InlineNotification.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as a InlineNotification.
   */
  constructor(element, options) {
    super(element, options);
    this.button = element.querySelector(this.options.selectorButton);
    if (this.button) {
      this.button.addEventListener('click', evt => {
        if (evt.currentTarget === this.button) {
          this.remove();
        }
      });
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
