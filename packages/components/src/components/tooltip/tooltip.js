/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
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
  if (Object.keys(values).every((name) => !isNaN(values[name]))) {
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

/**
 * Key codes for allowed keys that will trigger opening a tooltip
 * @type {Integer[]}
 * @private
 */
const allowedOpenKeys = [32, 13];

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
  }

  /**
   * A flag to detect if `oncontextmenu` event is fired right before `focus`/`blur` events.
   * @type {boolean}
   */
  _hasContextMenu = false;

  /**
   * A method called when this widget is created upon events.
   * @param {Event} event The event triggering the creation.
   */
  createdByEvent(event) {
    const { relatedTarget, type, which } = event;

    if (type === 'click' || allowedOpenKeys.includes(which)) {
      this._handleClick({
        relatedTarget,
        type,
        details: getLaunchingDetails(event),
      });
    }
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
        contentNode: tooltip.querySelector(this.options.selectorContent),
      });
      this._hookOn(tooltip);
      this.children.push(this.tooltip);
    }

    // Delegates the action of changing state to the tooltip.
    // (And thus the before/after shown/hidden events are fired from the tooltip)
    this.tooltip.changeState(
      state,
      Object.assign(detail, { delegatorNode: this.element }),
      callback
    );
  }

  /**
   * Attaches event handlers to show the tooltip.
   * @param {Element} element The element to attach the events to.
   * @private
   */
  _hookOn(element) {
    /**
     * Setup the _handleClick function for displaying a tooltip
     * @param {Event} evt - user initiated event
     * @param {Integer[]} [allowedKeys] - allowed key codes the user may press to open the tooltip
     * @private
     */
    const handleClickContextMenu = (evt, allowedKeys) => {
      const { relatedTarget, type, which } = evt;
      // Allow user to use `space` or `enter` to open tooltip
      if (typeof allowedKeys === 'undefined' || allowedKeys.includes(which)) {
        const hadContextMenu = this._hasContextMenu;
        this._hasContextMenu = type === 'contextmenu';
        this._handleClick({
          relatedTarget,
          type,
          hadContextMenu,
          details: getLaunchingDetails(evt),
        });
      }
    };

    this.manage(on(element, 'click', handleClickContextMenu, false));

    if (this.element.tagName !== 'BUTTON') {
      this.manage(
        on(
          this.element,
          'keydown',
          (event) => {
            handleClickContextMenu(event, allowedOpenKeys);
          },
          false
        )
      );
    }
  }

  /**
   * Handles click/focus events.
   * @param {object} params The parameters.
   * @param {Element} params.relatedTarget The element that focus went to. (For `blur` event)
   * @param {string} params.type The event type triggering this method.
   * @param {boolean} params.hadContextMenu
   * @param {object} params.details The event details.
   * @private
   */
  _handleClick({ relatedTarget, type, hadContextMenu, details }) {
    const state = {
      click: 'shown',
      keydown: 'shown',
      blur: 'hidden',
      touchleave: 'hidden',
      touchcancel: 'hidden',
    }[type];

    let shouldPreventClose;
    if (type === 'blur') {
      // Note: SVGElement in IE11 does not have `.contains()`
      const wentToSelf =
        (relatedTarget &&
          this.element.contains &&
          this.element.contains(relatedTarget)) ||
        (this.tooltip && this.tooltip.element.contains(relatedTarget));
      shouldPreventClose = hadContextMenu || wentToSelf;
    }
    if (!shouldPreventClose) {
      this.changeState(state, details);
    }
  }

  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

  static get options() {
    const { prefix } = settings;
    return {
      selectorInit: '[data-tooltip-trigger]',
      selectorContent: `.${prefix}--tooltip__content`,
      classShown: `${prefix}--tooltip--shown`,
      attribTooltipTarget: 'data-tooltip-target',
      objMenuOffset: getMenuOffset,
      initEventNames: ['click', 'keydown'],
    };
  }
}

export default Tooltip;
