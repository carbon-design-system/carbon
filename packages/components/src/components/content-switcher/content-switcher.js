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
import eventedState from '../../globals/js/mixins/evented-state';
import handles from '../../globals/js/mixins/handles';
import eventMatches from '../../globals/js/misc/event-matches';
import on from '../../globals/js/misc/on';

const toArray = arrayLike => Array.prototype.slice.call(arrayLike);

class ContentSwitcher extends mixin(
  createComponent,
  initComponentBySearch,
  eventedState,
  handles
) {
  /**
   * Set of content switcher buttons.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends EventedState
   * @extends Handles
   * @param {HTMLElement} element The element working as a set of content switcher buttons.
   * @param {object} [options] The component options.
   * @param {string} [options.selectorButton] The CSS selector to find switcher buttons.
   * @param {string} [options.selectorButtonSelected] The CSS selector to find the selected switcher button.
   * @param {string} [options.classActive] The CSS class for switcher button's selected state.
   * @param {string} [options.eventBeforeSelected]
   *   The name of the custom event fired before a switcher button is selected.
   *   Cancellation of this event stops selection of content switcher button.
   * @param {string} [options.eventAfterSelected] The name of the custom event fired after a switcher button is selected.
   */
  constructor(element, options) {
    super(element, options);
    this.manage(
      on(this.element, 'click', event => {
        this._handleClick(event);
      })
    );
  }

  /**
   * Handles click on content switcher button set.
   * If the click is on a content switcher button, activates it.
   * @param {Event} event The event triggering this method.
   */
  _handleClick(event) {
    const button = eventMatches(event, this.options.selectorButton);

    if (button) {
      this.changeState({
        group: 'selected',
        item: button,
        launchingEvent: event,
      });
    }
  }

  /**
   * Internal method of {@linkcode ContentSwitcher#setActive .setActive()}, to select a content switcher button.
   * @private
   * @param {object} detail The detail of the event trigging this action.
   * @param {HTMLElement} detail.item The button to be selected.
   * @param {Function} callback Callback called when change in state completes.
   */
  _changeState({ item }, callback) {
    // `options.selectorLink` is not defined in this class itself, code here primary is for inherited classes
    const itemLink = item.querySelector(this.options.selectorLink);
    if (itemLink) {
      toArray(this.element.querySelectorAll(this.options.selectorLink)).forEach(
        link => {
          if (link !== itemLink) {
            link.setAttribute('aria-selected', 'false');
          }
        }
      );
      itemLink.setAttribute('aria-selected', 'true');
    }

    const selectorButtons = toArray(
      this.element.querySelectorAll(this.options.selectorButton)
    );

    selectorButtons.forEach(button => {
      if (button !== item) {
        button.setAttribute('aria-selected', false);
        button.classList.toggle(this.options.classActive, false);
        toArray(
          button.ownerDocument.querySelectorAll(button.dataset.target)
        ).forEach(element => {
          element.setAttribute('hidden', '');
          element.setAttribute('aria-hidden', 'true');
        });
      }
    });

    item.classList.toggle(this.options.classActive, true);
    item.setAttribute('aria-selected', true);
    toArray(item.ownerDocument.querySelectorAll(item.dataset.target)).forEach(
      element => {
        element.removeAttribute('hidden');
        element.setAttribute('aria-hidden', 'false');
      }
    );

    if (callback) {
      callback();
    }
  }

  /**
   * Selects a content switcher button.
   * If the selected button has `data-target` attribute, DOM elements it points to as a CSS selector will be shown.
   * DOM elements associated with unselected buttons in the same way will be hidden.
   * @param {HTMLElement} item The button to be selected.
   * @param {ChangeState~callback} callback The callback is called once selection is finished
   * or is canceled. Will only invoke callback if it's passed in.
   */
  setActive(item, callback) {
    this.changeState(
      {
        group: 'selected',
        item,
      },
      error => {
        if (error) {
          if (callback) {
            callback(Object.assign(error, { item }));
          }
        } else if (callback) {
          callback(null, item);
        }
      }
    );
  }

  /**
   * The map associating DOM element and content switcher set instance.
   * @member ContentSwitcher.components
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode ContentSwitcher.create .create()}, or {@linkcode ContentSwitcher.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode ContentSwitcher.init .init()} works.
   * @member ContentSwitcher.options
   * @type {object}
   * @property {string} selectorInit The CSS selector to find content switcher button set.
   * @property {string} [selectorButton] The CSS selector to find switcher buttons.
   * @property {string} [selectorButtonSelected] The CSS selector to find the selected switcher button.
   * @property {string} [classActive] The CSS class for switcher button's selected state.
   * @property {string} [eventBeforeSelected]
   *   The name of the custom event fired before a switcher button is selected.
   *   Cancellation of this event stops selection of content switcher button.
   * @property {string} [eventAfterSelected] The name of the custom event fired after a switcher button is selected.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-content-switcher]',
      selectorButton: `input[type="radio"], .${prefix}--content-switcher-btn`,
      classActive: `${prefix}--content-switcher--selected`,
      eventBeforeSelected: 'content-switcher-beingselected',
      eventAfterSelected: 'content-switcher-selected',
    };
  }
}

export default ContentSwitcher;
