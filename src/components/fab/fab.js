/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import warning from 'warning';
import { breakingChangesX } from '../../globals/js/feature-flags';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentByEvent from '../../globals/js/mixins/init-component-by-event';
import handles from '../../globals/js/mixins/handles';
import on from '../../globals/js/misc/on';
import removedComponent from '../removed-component';

let didWarnAboutDeprecation;

class FabButton extends mixin(createComponent, initComponentByEvent, handles) {
  /**
   * Floating action button.
   * @extends CreateComponent
   * @extends InitComponentByEvent
   * @extends Handles
   * @param {HTMLElement} element The element working as a floting action button.
   */
  constructor(element) {
    super(element);
    if (__DEV__) {
      warning(
        didWarnAboutDeprecation,
        'The `FabButton` component in `carbon-components` has been deprecated. It will be removed in the next major release.'
      );
      didWarnAboutDeprecation = true;
    }
    this.manage(
      on(element, 'click', event => {
        this.toggle(event);
      })
    );
  }

  /**
   * A method called when this widget is created upon clicking.
   * @param {Event} event The event triggering the creation.
   */
  createdByEvent(event) {
    this.toggle(event);
  }

  /**
   * Toggles this floating action button.
   * @param {Event} event The event triggering this method.
   */
  toggle(event) {
    if (this.element.tagName === 'A') {
      event.preventDefault();
    }

    if (this.element.dataset.state === 'closed') {
      this.element.dataset.state = 'open';
    } else {
      this.element.dataset.state = 'closed';
    }
  }

  /**
   * Instantiates floating action button of the given element.
   * @param {HTMLElement} element The element.
   */
  static create(element) {
    return this.components.get(element) || new this(element);
  }

  /**
   * The map associating DOM element and floating action button instance.
   * @member FabButton.components
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode FabButton.create .create()}, or {@linkcode FabButton.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode FabButton.init .init()} works.
   * @member FabButton.options
   * @type {Object}
   * @property {string} selectorInit The CSS selector to find floating action buttons.
   */
  static options /* #__PURE_CLASS_PROPERTY__ */ = {
    selectorInit: '[data-fab]',
    initEventNames: ['click'],
  };
}

export default (!breakingChangesX ? FabButton : removedComponent('FabButton'));
