/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import warning from 'warning';
import mixin from '../../globals/js/misc/mixin';
import settings from '../../globals/js/settings';
import createComponent from '../../globals/js/mixins/create-component';
import eventedShowHideState from '../../globals/js/mixins/evented-show-hide-state';
import handles from '../../globals/js/mixins/handles';
import trackBlur from '../../globals/js/mixins/track-blur';
import getLaunchingDetails from '../../globals/js/misc/get-launching-details';
import optimizedResize from '../../globals/js/misc/resize';
import on from '../../globals/js/misc/on';

/**
 * The structure for the position of floating menu.
 * @typedef {Object} FloatingMenu~position
 * @property {number} left The left position.
 * @property {number} top The top position.
 * @property {number} right The right position.
 * @property {number} bottom The bottom position.
 */

/**
 * The structure for the size of floating menu.
 * @typedef {Object} FloatingMenu~size
 * @property {number} width The width.
 * @property {number} height The height.
 */

/**
 * The structure for the position offset of floating menu.
 * @typedef {Object} FloatingMenu~offset
 * @property {number} top The top position.
 * @property {number} left The left position.
 */

export const DIRECTION_LEFT = 'left';
export const DIRECTION_TOP = 'top';
export const DIRECTION_RIGHT = 'right';
export const DIRECTION_BOTTOM = 'bottom';

/**
 * @param {object} params The parameters.
 * @param {FloatingMenu~size} params.menuSize The size of the menu.
 * @param {FloatingMenu~position} params.refPosition The position of the triggering element.
 * @param {FloatingMenu~offset} [params.offset={ left: 0, top: 0 }] The position offset of the menu.
 * @param {string} [params.direction=bottom] The menu direction.
 * @param {number} [params.scrollX=0] The scroll position of the viewport.
 * @param {number} [params.scrollY=0] The scroll position of the viewport.
 * @returns {FloatingMenu~offset} The position of the menu, relative to the top-left corner of the viewport.
 * @private
 */
export const getFloatingPosition = ({
  menuSize,
  refPosition,
  offset = {},
  direction = DIRECTION_BOTTOM,
  scrollX = 0,
  scrollY = 0,
}) => {
  const {
    left: refLeft = 0,
    top: refTop = 0,
    right: refRight = 0,
    bottom: refBottom = 0,
  } = refPosition;

  const { width, height } = menuSize;
  const { top = 0, left = 0 } = offset;
  const refCenterHorizontal = (refLeft + refRight) / 2;
  const refCenterVertical = (refTop + refBottom) / 2;

  return {
    [DIRECTION_LEFT]: {
      left: refLeft - width + scrollX - left,
      top: refCenterVertical - height / 2 + scrollY + top,
    },
    [DIRECTION_TOP]: {
      left: refCenterHorizontal - width / 2 + scrollX + left,
      top: refTop - height + scrollY - top,
    },
    [DIRECTION_RIGHT]: {
      left: refRight + scrollX + left,
      top: refCenterVertical - height / 2 + scrollY + top,
    },
    [DIRECTION_BOTTOM]: {
      left: refCenterHorizontal - width / 2 + scrollX + left,
      top: refBottom + scrollY + top,
    },
  }[direction];
};

class FloatingMenu extends mixin(
  createComponent,
  eventedShowHideState,
  trackBlur,
  handles
) {
  /**
   * Floating menu.
   * @extends CreateComponent
   * @extends EventedShowHideState
   * @param {HTMLElement} element The element working as a modal dialog.
   * @param {object} [options] The component options.
   * @param {string} [options.selectorContainer] The CSS selector to find the container to put this menu in.
   * @param {string} [options.attribDirection] The attribute name to specify menu placement direction (top/right/bottom/left).
   * @param {string} [options.classShown] The CSS class for shown state, for the menu.
   * @param {string} [options.classRefShown] The CSS class for shown state, for the trigger button.
   * @param {string} [options.eventBeforeShown]
   *   The name of the custom event fired before this menu is shown.
   *   Cancellation of this event stops hiding the menu.
   * @param {string} [options.eventAfterShown]
   *   The name of the custom event telling that menu is sure shown
   *   without being canceled by the event handler named by `eventBeforeShown` option (`floating-menu-beingshown`).
   * @param {string} [options.eventBeforeHidden]
   *   The name of the custom event fired before this menu is hidden.
   *   Cancellation of this event stops hiding the menu.
   * @param {string} [options.eventAfterHidden]
   *   The name of the custom event telling that menu is sure hidden
   *   without being canceled by the event handler named by `eventBeforeHidden` option (`floating-menu-beinghidden`).
   * @param {Element} [options.refNode] The launching element of the menu. Used for calculating the geometry of the menu.
   * @param {object} [options.offset] The offset to adjust the geometry of the menu. Should have `top`/`left` properties.
   */
  constructor(element, options) {
    super(element, options);
    const attribDirectionValue = this.element.getAttribute(
      this.options.attribDirection
    );
    if (!this.options.direction) {
      this.options.direction = attribDirectionValue || 'bottom';
    }
    if (!attribDirectionValue) {
      // Update attribute for styling
      this.element.setAttribute(
        this.options.attribDirection,
        this.options.direction
      );
    }
    this.manage(
      on(this.element.ownerDocument, 'keydown', event => {
        this._handleKeydown(event);
      })
    );
  }

  /**
   * Handles key press on document.
   * @param {Event} event The triggering event.
   * @private
   */
  _handleKeydown(event) {
    const key = event.which;
    const { triggerNode, refNode } = this.options;
    const isOfMenu = this.element.contains(event.target);

    switch (key) {
      // Esc
      case 27:
        this.changeState('hidden', getLaunchingDetails(event), () => {
          if (isOfMenu) {
            (triggerNode || refNode).focus();
          }
        });
        break;
      default:
        break;
    }
  }

  /**
   * Focuses back on the trigger button if this component loses focus.
   */
  handleBlur(event) {
    if (this.element.classList.contains(this.options.classShown)) {
      this.changeState('hidden', getLaunchingDetails(event));
      const { refNode, triggerNode } = this.options;

      if (
        (event.relatedTarget === null ||
          this.element.contains(event.relatedTarget)) &&
        refNode &&
        event.target !== refNode
      ) {
        HTMLElement.prototype.focus.call(triggerNode || refNode); // SVGElement in IE11 does not have `.focus()` method
      }
    }
  }

  /**
   * @private
   * @returns {Element} The element that this menu should be placed to.
   */
  _getContainer() {
    return (
      this.element.closest(this.options.selectorContainer) ||
      this.element.ownerDocument.body
    );
  }

  /**
   * @private
   * @returns {object} The menu position, with `top` and `left` properties.
   */
  _getPos() {
    const { element } = this;
    const { refNode, offset, direction } = this.options;

    if (!refNode) {
      throw new Error(
        'Cannot find the reference node for positioning floating menu.'
      );
    }

    return getFloatingPosition({
      menuSize: element.getBoundingClientRect(),
      refPosition: refNode.getBoundingClientRect(),
      offset:
        typeof offset !== 'function'
          ? offset
          : offset(element, direction, refNode),
      direction,
      scrollX: refNode.ownerDocument.defaultView.pageXOffset,
      scrollY: refNode.ownerDocument.defaultView.pageYOffset,
    });
  }

  /**
   * Sees if the computed style is what this floating menu expects.
   * @private
   */
  _testStyles() {
    if (!this.options.debugStyle) {
      return;
    }
    const { element } = this;
    const computedStyle = element.ownerDocument.defaultView.getComputedStyle(
      element
    );
    const styles = {
      position: 'absolute',
      right: 'auto',
      margin: 0,
    };
    Object.keys(styles).forEach(key => {
      const expected =
        typeof styles[key] === 'number' ? parseFloat(styles[key]) : styles[key];
      const actual = computedStyle.getPropertyValue(key);
      if (expected !== actual) {
        // eslint-disable-next-line no-console
        console.warn(
          `Floating menu component expects ${key}: ${styles[key]} style.`
        );
      }
    });
  }

  /**
   * Places the menu.
   * @private
   */
  _place() {
    const { element } = this;
    const { left, top } = this._getPos();
    element.style.left = `${left}px`;
    element.style.top = `${top}px`;
    this._testStyles();
  }

  /**
   * @param {string} state The new state.
   * @returns {boolean} `true` of the current state is different from the given new state.
   */
  shouldStateBeChanged(state) {
    return (
      (state === 'shown' || state === 'hidden') &&
      state !==
        (this.element.classList.contains(this.options.classShown)
          ? 'shown'
          : 'hidden')
    );
  }

  /**
   * Changes the shown/hidden state.
   * @private
   * @param {string} state The new state.
   * @param {object} detail The detail of the event trigging this action.
   * @param {Function} callback Callback called when change in state completes.
   */
  _changeState(state, detail, callback) {
    const shown = state === 'shown';
    const { refNode, classShown, classRefShown, triggerNode } = this.options;
    if (!refNode) {
      throw new TypeError(
        'Cannot find the reference node for changing the style.'
      );
    }

    if (state === 'shown') {
      if (!this.hResize) {
        this.hResize = optimizedResize.add(() => {
          this._place();
        });
      }
      this._getContainer().appendChild(this.element);
    }

    this.element.setAttribute('aria-hidden', (!shown).toString());
    (triggerNode || refNode).setAttribute('aria-expanded', shown.toString());

    this.element.classList.toggle(classShown, shown);
    if (classRefShown) {
      refNode.classList.toggle(classRefShown, shown);
    }
    if (state === 'shown') {
      this._place();

      // IE11 puts focus on elements with `.focus()`, even ones without `tabindex` attribute
      if (!this.element.hasAttribute(this.options.attribAvoidFocusOnOpen)) {
        const primaryFocusNode = this.element.querySelector(
          this.options.selectorPrimaryFocus
        );
        const focusableNode = this.element.querySelector(
          settings.selectorTabbable
        );

        if (primaryFocusNode) {
          primaryFocusNode.focus();
        } else if (focusableNode) {
          focusableNode.focus();
        } else {
          this.element.focus();
          if (__DEV__) {
            const elementTabindex = this.element.getAttribute('tabindex');
            warning(
              elementTabindex !== null && parseInt(elementTabindex, 10) > -1,
              'Floating Menus without interactive elements must include tabindex="0" on the floating element.'
            );
          }
        }
      }
    }
    if (state === 'hidden' && this.hResize) {
      this.hResize.release();
      this.hResize = null;
    }
    callback();
  }

  release() {
    if (this.hResize) {
      this.hResize.release();
      this.hResize = null;
    }
    super.release();
  }

  static options /* #__PURE_CLASS_PROPERTY__ */ = {
    selectorContainer: '[data-floating-menu-container]',
    selectorPrimaryFocus: '[data-floating-menu-primary-focus]',
    attribDirection: 'data-floating-menu-direction',
    attribAvoidFocusOnOpen: 'data-avoid-focus-on-open',
    classShown: '', // Should be provided from options arg in constructor
    classRefShown: '', // Should be provided from options arg in constructor
    eventBeforeShown: 'floating-menu-beingshown',
    eventAfterShown: 'floating-menu-shown',
    eventBeforeHidden: 'floating-menu-beinghidden',
    eventAfterHidden: 'floating-menu-hidden',
    refNode: null, // Should be provided from options arg in constructor
    offset: {
      left: 0,
      top: 0,
    },
  };

  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();
}

export default FloatingMenu;
