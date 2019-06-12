/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import warning from 'warning';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import window from 'window-or-global';

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
 * @param {FloatingMenu~offset} [oldMenuOffset={}] The old value.
 * @param {FloatingMenu~offset} [menuOffset={}] The new value.
 * @returns `true` if the parent component wants to change in the adjustment of the floating menu position.
 * @private
 */
const hasChangeInOffset = (oldMenuOffset = {}, menuOffset = {}) => {
  if (typeof oldMenuOffset !== typeof menuOffset) {
    return true;
  } else if (
    Object(menuOffset) === menuOffset &&
    typeof menuOffset !== 'function'
  ) {
    return (
      oldMenuOffset.top !== menuOffset.top ||
      oldMenuOffset.left !== menuOffset.left
    );
  }
  return oldMenuOffset !== menuOffset;
};

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
const getFloatingPosition = ({
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
    [DIRECTION_LEFT]: () => ({
      left: refLeft - width + scrollX - left,
      top: refCenterVertical - height / 2 + scrollY + top,
    }),
    [DIRECTION_TOP]: () => ({
      left: refCenterHorizontal - width / 2 + scrollX + left,
      top: refTop - height + scrollY - top,
    }),
    [DIRECTION_RIGHT]: () => ({
      left: refRight + scrollX + left,
      top: refCenterVertical - height / 2 + scrollY + top,
    }),
    [DIRECTION_BOTTOM]: () => ({
      left: refCenterHorizontal - width / 2 + scrollX + left,
      top: refBottom + scrollY + top,
    }),
  }[direction]();
};

/**
 * A menu that is detached from the triggering element.
 * Useful when the container of the triggering element cannot have `overflow:visible` style, etc.
 */
class FloatingMenu extends React.Component {
  static propTypes = {
    /**
     * Contents to put into the floating menu.
     */
    children: PropTypes.object,

    /**
     * The query selector indicating where the floating menu body should be placed.
     */
    target: PropTypes.func,

    /**
     * The position in the viewport of the trigger button.
     */
    menuPosition: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
    }),

    /**
     * Where to put the tooltip, relative to the trigger button.
     */
    menuDirection: PropTypes.oneOf([
      DIRECTION_LEFT,
      DIRECTION_TOP,
      DIRECTION_RIGHT,
      DIRECTION_BOTTOM,
    ]),

    /**
     * The adjustment of the floating menu position, considering the position of dropdown arrow, etc.
     */
    menuOffset: PropTypes.oneOfType([
      PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
      }),
      PropTypes.func,
    ]),

    /**
     * The additional styles to put to the floating menu.
     */
    styles: PropTypes.object,

    /**
     * The callback called when the menu body has been mounted to/will be unmounted from the DOM.
     */
    menuRef: PropTypes.func,

    /**
     * The callback called when the menu body has been mounted and positioned.
     */
    onPlace: PropTypes.func,
  };

  static defaultProps = {
    menuPosition: {},
    menuOffset: {},
    menuDirection: DIRECTION_BOTTOM,
  };

  // `true` if the menu body is mounted and calculation of the position is in progress.
  _placeInProgress = false;

  state = {
    /**
     * The position of the menu, relative to the top-left corner of the viewport.
     * @type {FloatingMenu~offset}
     */
    floatingPosition: undefined,
  };

  /**
   * The cached reference to the menu container.
   * Only used if React portal API is not available.
   * @type {Element}
   * @private
   */
  _menuContainer = null;

  /**
   * The cached reference to the menu body.
   * The reference is set via callback ref instead of object ref,
   * in order to hook the event when the element ref gets available,
   * which can be at a different timing from `cDM()`, presumably with SSR scenario.
   * @type {Element}
   * @private
   */
  _menuBody = null;

  /**
   * Calculates the position in the viewport of floating menu,
   * once this component is mounted or updated upon change in the following props:
   *
   * * `menuPosition` (The position in the viewport of the trigger button)
   * * `menuOffset` (The adjustment that should be applied to the calculated floating menu's position)
   * * `menuDirection` (Where the floating menu menu should be placed relative to the trigger button)
   *
   * @private
   */
  _updateMenuSize = (prevProps = {}) => {
    const menuBody = this._menuBody;
    warning(
      menuBody,
      'The DOM node for menu body for calculating its position is not available. Skipping...'
    );
    if (!menuBody) {
      return;
    }

    const {
      menuPosition: oldRefPosition = {},
      menuOffset: oldMenuOffset = {},
      menuDirection: oldMenuDirection,
    } = prevProps;
    const {
      menuPosition: refPosition = {},
      menuOffset = {},
      menuDirection,
    } = this.props;

    if (
      oldRefPosition.top !== refPosition.top ||
      oldRefPosition.right !== refPosition.right ||
      oldRefPosition.bottom !== refPosition.bottom ||
      oldRefPosition.left !== refPosition.left ||
      hasChangeInOffset(oldMenuOffset, menuOffset) ||
      oldMenuDirection !== menuDirection
    ) {
      const menuSize = menuBody.getBoundingClientRect();
      const { menuEl, flipped } = this.props;
      const offset =
        typeof menuOffset !== 'function'
          ? menuOffset
          : menuOffset(menuBody, menuDirection, menuEl, flipped);
      // Skips if either in the following condition:
      // a) Menu body has `display:none`
      // b) `menuOffset` as a callback returns `undefined` (The callback saw that it couldn't calculate the value)
      if ((menuSize.width > 0 && menuSize.height > 0) || !offset) {
        this.setState({
          floatingPosition: getFloatingPosition({
            menuSize,
            refPosition,
            direction: menuDirection,
            offset,
            scrollX: window.pageXOffset,
            scrollY: window.pageYOffset,
          }),
        });
      }
    }
  };

  componentDidUpdate(prevProps) {
    this._updateMenuSize(prevProps);
    const { onPlace } = this.props;
    if (
      this._placeInProgress &&
      this.state.floatingPosition &&
      typeof onPlace === 'function'
    ) {
      onPlace(this._menuBody);
      this._placeInProgress = false;
    }
  }

  /**
   * A callback for called when menu body is mounted or unmounted.
   * @param {Element} menuBody The menu body being mounted. `null` if the menu body is being unmounted.
   */
  _menuRef = menuBody => {
    const { menuRef } = this.props;
    this._placeInProgress = !!menuBody;
    menuRef && menuRef((this._menuBody = menuBody));
    if (menuBody) {
      this._updateMenuSize();
    }
  };

  /**
   * @returns The child nodes, with styles containing the floating menu position.
   * @private
   */
  _getChildrenWithProps = () => {
    const { styles, children } = this.props;
    const { floatingPosition: pos } = this.state;
    // If no pos available, we need to hide the element (offscreen to the left)
    // This is done so we can measure the content before positioning it correctly.
    const positioningStyle = pos
      ? {
          left: `${pos.left}px`,
          top: `${pos.top}px`,
          right: 'auto',
        }
      : {
          visibility: 'hidden',
          top: '0px',
        };
    return React.cloneElement(children, {
      ref: this._menuRef,
      style: {
        ...styles,
        ...positioningStyle,
        position: 'absolute',
        margin: 0,
        opacity: 1,
      },
    });
  };

  render() {
    if (typeof document !== 'undefined') {
      const { target } = this.props;
      return ReactDOM.createPortal(
        this._getChildrenWithProps(),
        !target ? document.body : target()
      );
    }
    return null;
  }
}

export default FloatingMenu;
