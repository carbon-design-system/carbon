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
import initComponentByEvent from '../../globals/js/mixins/init-component-by-event';
import eventedShowHideState from '../../globals/js/mixins/evented-show-hide-state';
import handles from '../../globals/js/mixins/handles';
import FloatingMenu, {
  DIRECTION_LEFT,
  DIRECTION_TOP,
  DIRECTION_RIGHT,
  DIRECTION_BOTTOM,
} from '../floating-menu/floating-menu';
import getLaunchingDetails from '../../globals/js/misc/get-launching-details';
import eventMatches from '../../globals/js/misc/event-matches';
import on from '../../globals/js/misc/on';

/**
 * @param {Element} menuBody The menu body with the menu arrow.
 * @param {string} menuDirection Where the floating menu menu should be placed relative to the trigger button.
 * @returns {FloatingMenu~offset} The adjustment of the floating menu position, upon the position of the menu arrow.
 * @private
 */
const getMenuOffset = (menuBody, menuDirection) => {
  const arrowStyle = menuBody.ownerDocument.defaultView.getComputedStyle(
    menuBody,
    ':before'
  );
  const arrowPositionProp = {
    [DIRECTION_LEFT]: 'right',
    [DIRECTION_TOP]: 'bottom',
    [DIRECTION_RIGHT]: 'left',
    [DIRECTION_BOTTOM]: 'top',
  }[menuDirection];
  const menuPositionAdjustmentProp = {
    [DIRECTION_LEFT]: 'left',
    [DIRECTION_TOP]: 'top',
    [DIRECTION_RIGHT]: 'left',
    [DIRECTION_BOTTOM]: 'top',
  }[menuDirection];
  const values = [arrowPositionProp, 'border-bottom-width'].reduce(
    (o, name) => ({
      ...o,
      [name]: Number(
        (/^([\d-.]+)px$/.exec(arrowStyle.getPropertyValue(name)) || [])[1]
      ),
    }),
    {}
  );
  let margin = 0;
  if (menuDirection !== DIRECTION_BOTTOM) {
    const style = menuBody.ownerDocument.defaultView.getComputedStyle(menuBody);
    margin = Number(
      (/^([\d-.]+)px$/.exec(style.getPropertyValue('margin-top')) || [])[1]
    );
  }
  values[arrowPositionProp] = values[arrowPositionProp] || -6; // IE, etc.
  if (Object.keys(values).every(name => !isNaN(values[name]))) {
    const {
      [arrowPositionProp]: arrowPosition,
      'border-bottom-width': borderBottomWidth,
    } = values;
    return {
      left: 0,
      top: 0,
      [menuPositionAdjustmentProp]:
        Math.sqrt(borderBottomWidth ** 2 * 2) -
        arrowPosition +
        margin * (menuDirection === DIRECTION_TOP ? 2 : 1),
    };
  }
  return undefined;
};

class Tooltip extends mixin(
  createComponent,
  initComponentByEvent,
  eventedShowHideState,
  handles
) {
  /**
   * Tooltip.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   */
  constructor(element, options) {
    super(element, options);
    this._hookOn(element);
    this._hookCloseActions(element);
  }

  /**
   * A flag to detect if `oncontextmenu` event is fired right before `focus`/`blur` events.
   * @type {boolean}
   */
  _hasContextMenu = false;

  /**
   * The handle for `focus` event listener.
   * Used for "focus-navigation" feature.
   * @type {Handle}
   * @private
   */
  _handleFocusinListener;

  /**
   * The handle for `keydown` event listener.
   * Used for "close-on-escape-key" feature.
   * @type {Handle}
   * @private
   */
  _handleKeydownListener;

  /**
   * The handle for `click` event listener.
   * Used for "click-outside-tooltip" feature.
   * @type {Handle}
   * @private
   */
  _handleClickListener;

  /**
   * The debounced version of the event handler.
   * @type {Function}
   * @private
   */
  _debouncedHandleClick = debounce(this._handleClick, 200);

  /**
   * A method called when this widget is created upon events.
   * @param {Event} event The event triggering the creation.
   */
  createdByEvent(event) {
    const { relatedTarget, type } = event;
    this._debouncedHandleClick({
      relatedTarget,
      type,
      details: getLaunchingDetails(event),
    });
  }

  /**
   * Changes the shown/hidden state.
   * @param {string} state The new state.
   * @param {object} detail The detail of the event trigging this action.
   * @param {Function} callback Callback called when change in state completes.
   */
  changeState(state, detail, callback) {
    if (!this.tooltip) {
      const tooltip = this.element.ownerDocument.querySelector(
        this.element.getAttribute(this.options.attribTooltipTarget)
      );
      if (!tooltip) {
        throw new Error('Cannot find the target tooltip.');
      }

      // Lazily create a component instance for tooltip
      this.tooltip = FloatingMenu.create(tooltip, {
        refNode: this.element,
        classShown: this.options.classShown,
        offset: this.options.objMenuOffset,
      });
      this._hookOn(tooltip);
      this.children.push(this.tooltip);
    }

    // Delegates the action of changing state to the tooltip.
    // (And thus the before/after shown/hidden events are fired from the tooltip)
    this.tooltip.changeState(
      state,
      Object.assign(detail, { delegatorNode: this.element }),
      () => {
        // @questions
        // -- What is the expected behavior if the user clicks on the trigger when the tooltip is already open
        // -- What's the focus state look like when there is only rich text within a tooltip (no buttons/links/etc)
        // -- There is a "flash" where the next element (another trigger in the demo) is focused before focus is
        //      moved to the tooltip. I'm assuming this is due to the debounce. Now that it's triggered on "click"
        //      for keyboard users do we still want the debounce?
        this.isHidden = state !== 'shown';
        this.tooltip.element.setAttribute(
          'aria-hidden',
          this.isHidden.toString()
        );
        this.element.setAttribute('aria-expanded', (!this.isHidden).toString());

        if (this._handleFocusinListener) {
          this._handleFocusinListener = this.unmanage(
            this._handleFocusinListener
          ).release();
        }

        if (this._handleClickListener) {
          this._handleClickListener = this.unmanage(
            this._handleClickListener
          ).release();
        }

        if (this._handleKeydownListener) {
          this._handleKeydownListener = this.unmanage(
            this._handleKeydownListener
          ).release();
        }

        if (state === 'shown') {
          this._hookCloseActions(this.element);
          const focusableNode = this.tooltip.element.querySelector(
            settings.selectorTabbable
          );
          if (focusableNode) {
            focusableNode.focus();
          } else {
            this.tooltip.element.setAttribute('tabindex', '0');
            this.tooltip.element.focus();
          }

          const hasFocusin =
            'onfocusin' in this.element.ownerDocument.defaultView;
          const focusinEventName = hasFocusin ? 'focusin' : 'focus';
          this._handleFocusinListener = this.manage(
            on(
              this.element.ownerDocument,
              focusinEventName,
              this._handleFocusin,
              !hasFocusin
            )
          );
        } else {
          this.element.focus();
        }

        // @question Do I need to pass any parameters to callback?
        if (typeof callback === 'function') callback();
      }
    );
  }

  /**
   * Attaches event handlers to show the tooltip.
   * @param {Element} element The element to attach the events to.
   * @private
   */
  _hookOn(element) {
    this.manage(
      on(
        element,
        'click',
        event => {
          const { relatedTarget, type } = event;
          const hadContextMenu = this._hasContextMenu;
          this._hasContextMenu = type === 'contextmenu';
          this._debouncedHandleClick({
            relatedTarget,
            type,
            hadContextMenu,
            details: getLaunchingDetails(event),
          });
        },
        false
      )
    );

    if (this.element.tagName.toLowerCase() !== 'button') {
      this.manage(
        on(
          this.element,
          // Does Carbon prefer keydown or keyup?
          'keydown',
          event => {
            const { relatedTarget, type, which } = event;
            // Allow user to use `space` or `enter` to open tooltip
            if (which === 32 || which === 13) {
              const hadContextMenu = this._hasContextMenu;
              this._hasContextMenu = type === 'contextmenu';
              this._debouncedHandleClick({
                relatedTarget,
                type,
                hadContextMenu,
                details: getLaunchingDetails(event),
              });
            }
          },
          false
        )
      );
    }
  }

  /**
   * Attaches event handlers to hide the tooltip.
   * @param {Element} element The element to attach the events to.
   * @private
   */
  _hookCloseActions(element) {
    this._handleClickListener = this.manage(
      on(element.ownerDocument, 'click', evt => {
        if (
          !eventMatches(
            evt,
            element.getAttribute(this.options.attribTooltipTarget)
          )
        ) {
          this.changeState('hidden', evt);
        }
      })
    );

    this._handleKeydownListener = this.manage(
      on(element.ownerDocument, 'keydown', evt => {
        if (evt.which === 27 && !this.isHidden) {
          evt.stopPropagation();
          this.changeState('hidden', evt);
        }
      })
    );
  }

  /**
   * Handles click/focus events.
   * @param {object} params The parameters.
   * @param {string} params.type The event type triggering this method.
   * @param {object} params.details The event details.
   * @private
   */
  _handleClick({ type, details }) {
    const state = {
      click: 'shown',
      keydown: 'shown',
    }[type];

    this.changeState(state, details);
  }

  /**
   * Handles `focus` event to navigate sequentially in the DOM.
   * @param {Event} evt The event.
   * @private
   */
  _handleFocusin = evt => {
    if (
      this.tooltip.element.classList.contains(this.options.classShown) &&
      !this.tooltip.element.contains(evt.target)
    ) {
      // @question It's never getting in this function but the tooltip is hiding when it's suppose to
      //  The issue is that since it's not calling Tooltip.changeState the attributes are not getting updated properly
      this.changeState('hidden', evt);
    }
  };

  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-tooltip-trigger]',
      classShown: `${prefix}--tooltip--shown`,
      attribTooltipTarget: 'data-tooltip-target',
      objMenuOffset: getMenuOffset,
      // @question I want to init the component on keydown IF it's not a button element as the trigger
      //    and the user pressed only enter or space
      initEventNames: ['click'],
    };
  }
}

export default Tooltip;
