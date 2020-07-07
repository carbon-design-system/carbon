/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import debounce from 'lodash.debounce';
import settings from '../../globals/js/settings';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import handles from '../../globals/js/mixins/handles';
import eventMatches from '../../globals/js/misc/event-matches';
import on from '../../globals/js/misc/on';

export default class TooltipSimple extends mixin(
  createComponent,
  initComponentBySearch,
  handles
) {
  /**
   * Simple Tooltip.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element - The element functioning as a text field.
   */
  constructor(element, options) {
    super(element, options);
    this.manage(
      on(this.element.ownerDocument, 'keydown', (event) => {
        // ESC
        if (event.which === 27) {
          this.allowTooltipVisibility({ visible: false });
          const tooltipTriggerButton = this.getTooltipTriggerButton();
          if (tooltipTriggerButton) {
            tooltipTriggerButton.classList.remove(
              this.options.classTooltipVisible
            );
          }
        }
      })
    );
    this.manage(
      on(this.element, 'mouseenter', () => {
        this.tooltipFadeOut.cancel();
        this.allowTooltipVisibility({ visible: true });
        const tooltipTriggerButton = this.getTooltipTriggerButton();
        if (tooltipTriggerButton) {
          tooltipTriggerButton.classList.add(this.options.classTooltipVisible);
        }
      })
    );
    this.manage(on(this.element, 'mouseleave', this.tooltipFadeOut));
    this.manage(
      on(this.element, 'focusin', (event) => {
        if (eventMatches(event, this.options.selectorTriggerButton)) {
          this.allowTooltipVisibility({ visible: true });
        }
      })
    );
  }

  tooltipFadeOut = debounce(() => {
    const tooltipTriggerButton = this.getTooltipTriggerButton();
    if (tooltipTriggerButton) {
      tooltipTriggerButton.classList.remove(this.options.classTooltipVisible);
    }
  }, 100);

  getTooltipTriggerButton = () =>
    this.element.matches(this.options.selectorTriggerButton)
      ? this.element
      : this.element.querySelector(this.options.selectorTriggerButton);

  allowTooltipVisibility = ({ visible }) => {
    const tooltipTriggerButton = this.getTooltipTriggerButton();

    if (!tooltipTriggerButton) {
      return;
    }

    if (visible) {
      tooltipTriggerButton.classList.remove(this.options.classTooltipHidden);
    } else {
      tooltipTriggerButton.classList.add(this.options.classTooltipHidden);
    }
  };

  /**
   * The component options.
   *
   * If `options` is specified in the constructor,
   * {@linkcode TooltipSimple.create .create()},
   * or {@linkcode TooltipSimple.init .init()},
   * properties in this object are overriden for the instance being
   * created and how {@linkcode TooltipSimple.init .init()} works.
   * @property {string} selectorInit The CSS selector to find simple tooltip UIs.
   */
  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-tooltip-definition],[data-tooltip-icon]',
      selectorTriggerButton: `.${prefix}--tooltip__trigger.${prefix}--tooltip--a11y`,
      classTooltipHidden: `${prefix}--tooltip--hidden`,
      classTooltipVisible: `${prefix}--tooltip--visible`,
    };
  }

  /**
   * The map associating DOM element and simple tooltip UI instance.
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();
}
