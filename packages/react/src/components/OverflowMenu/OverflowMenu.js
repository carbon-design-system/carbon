/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import invariant from 'invariant';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import ClickListener from '../../internal/ClickListener';
import FloatingMenu, {
  DIRECTION_TOP,
  DIRECTION_BOTTOM,
} from '../../internal/FloatingMenu';
import OptimizedResize from '../../internal/OptimizedResize';
import { OverflowMenuVertical16 } from '@carbon/icons-react';
import { keys, matches as keyCodeMatches } from '../../internal/keyboard';
import mergeRefs from '../../tools/mergeRefs';

const { prefix } = settings;

const on = (element, ...args) => {
  element.addEventListener(...args);
  return {
    release() {
      element.removeEventListener(...args);
      return null;
    },
  };
};

/**
 * The CSS property names of the arrow keyed by the floating menu direction.
 * @type {Object<string, string>}
 */
const triggerButtonPositionProps = {
  [DIRECTION_TOP]: 'bottom',
  [DIRECTION_BOTTOM]: 'top',
};

/**
 * Determines how the position of arrow should affect the floating menu position.
 * @type {Object<string, number>}
 */
const triggerButtonPositionFactors = {
  [DIRECTION_TOP]: -2,
  [DIRECTION_BOTTOM]: -1,
};

/**
 * @param {Element} menuBody The menu body with the menu arrow.
 * @param {string} direction The floating menu direction.
 * @returns {FloatingMenu~offset} The adjustment of the floating menu position, upon the position of the menu arrow.
 * @private
 */
export const getMenuOffset = (menuBody, direction, trigger, flip) => {
  const triggerButtonPositionProp = triggerButtonPositionProps[direction];
  const triggerButtonPositionFactor = triggerButtonPositionFactors[direction];
  if (__DEV__) {
    invariant(
      triggerButtonPositionProp && triggerButtonPositionFactor,
      '[OverflowMenu] wrong floating menu direction: `%s`',
      direction
    );
  }
  const { offsetWidth: menuWidth, offsetHeight: menuHeight } = menuBody;

  switch (triggerButtonPositionProp) {
    case 'top':
    case 'bottom': {
      // TODO: Ensure `trigger` is there for `<OverflowMenu open>`
      const triggerWidth = !trigger ? 0 : trigger.offsetWidth;
      return {
        left: (!flip ? 1 : -1) * (menuWidth / 2 - triggerWidth / 2),
        top: 0,
      };
    }
    case 'left':
    case 'right': {
      // TODO: Ensure `trigger` is there for `<OverflowMenu open>`
      const triggerHeight = !trigger ? 0 : trigger.offsetHeight;
      return {
        left: 0,
        top: (!flip ? 1 : -1) * (menuHeight / 2 - triggerHeight / 2),
      };
    }

    default:
      break;
  }
};

class OverflowMenu extends Component {
  state = {};

  static propTypes = {
    /**
     * `true` if the menu should be open.
     */
    open: PropTypes.bool,

    /**
     * The menu direction.
     */
    direction: PropTypes.oneOf([DIRECTION_TOP, DIRECTION_BOTTOM]),

    /**
     * `true` if the menu alignment should be flipped.
     */
    flipped: PropTypes.bool,

    /**
     * The child nodes.
     */
    children: PropTypes.node,

    /**
     * The CSS class names.
     */
    className: PropTypes.string,

    /**
     * The `tabindex` attribute.
     */
    tabIndex: PropTypes.number,

    /**
     * The element ID.
     */
    id: PropTypes.string,

    /**
     * The ARIA label.
     */
    ariaLabel: PropTypes.string,

    /**
     * The event handler for the `click` event.
     */
    onClick: PropTypes.func,

    /**
     * The event handler for the `focus` event.
     */
    onFocus: PropTypes.func,

    /**
     * The event handler for the `keydown` event.
     */
    onKeyDown: PropTypes.func,

    /**
     * The icon description.
     */
    iconDescription: PropTypes.string.isRequired,

    /**
     * The adjustment in position applied to the floating menu.
     */
    menuOffset: PropTypes.oneOfType([
      PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
      }),
      PropTypes.func,
    ]),

    /**
     * The adjustment in position applied to the floating menu.
     */
    menuOffsetFlip: PropTypes.oneOfType([
      PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
      }),
      PropTypes.func,
    ]),

    /**
     * The CSS class for the icon.
     */
    iconClass: PropTypes.string,

    /**
     * Function called to override icon rendering.
     */
    renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

    /**
     * Function called when menu is closed
     */
    onClose: PropTypes.func,

    /**
     * The class to apply to the menu options
     */
    menuOptionsClass: PropTypes.string,

    /**
     * Function called when menu is closed
     */
    onOpen: PropTypes.func,

    /**
     * `true` to use the light version. For use on $ui-01 backgrounds only.
     * Don't use this to make OverflowMenu background color same as container background color.
     */
    light: PropTypes.bool,
  };

  static defaultProps = {
    ariaLabel: 'Menu',
    iconDescription: 'open and close list of options',
    open: false,
    direction: DIRECTION_BOTTOM,
    flipped: false,
    renderIcon: OverflowMenuVertical16,
    onClick: () => {},
    onKeyDown: () => {},
    onClose: () => {},
    onOpen: () => {},
    tabIndex: 0,
    menuOffset: getMenuOffset,
    menuOffsetFlip: getMenuOffset,
    light: false,
  };

  /**
   * The handle of `onfocusin` or `focus` event handler.
   * @private
   */
  _hFocusIn = null;

  /**
   * The timeout handle for handling `blur` event.
   * @private
   */
  _hBlurTimeout;

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.open && !this.state.open) {
      requestAnimationFrame(() => {
        this.getMenuPosition();
      });
      return false; // Let `.getMenuPosition()` cause render
    }

    return true;
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.getMenuPosition();
    });
    this.hResize = OptimizedResize.add(() => {
      this.getMenuPosition();
    });
  }

  getPrimaryFocusableElement = () => {
    if (this.menuEl) {
      const primaryFocusPropEl = this.menuEl.querySelector(
        '[data-floating-menu-primary-focus]'
      );
      if (primaryFocusPropEl) {
        return primaryFocusPropEl;
      }
    }
    const firstItem = this.overflowMenuItem0;
    if (
      firstItem &&
      firstItem.overflowMenuItem &&
      firstItem.overflowMenuItem.current
    ) {
      return firstItem.overflowMenuItem.current;
    }
  };

  componentDidUpdate() {
    const { onClose } = this.props;
    if (!this.state.open) {
      onClose();
    }
  }

  static getDerivedStateFromProps({ open }, state) {
    const { prevOpen } = state;
    return prevOpen === open
      ? null
      : {
          open,
          prevOpen: open,
        };
  }

  componentWillUnmount() {
    if (typeof this._hBlurTimeout === 'number') {
      clearTimeout(this._hBlurTimeout);
      this._hBlurTimeout = undefined;
    }
    this.hResize.release();
  }

  getMenuPosition = () => {
    if (this.menuEl) {
      const menuPosition = this.menuEl.getBoundingClientRect();
      this.setState({ menuPosition });
    }
  };

  handleClick = evt => {
    if (!this._menuBody || !this._menuBody.contains(evt.target)) {
      this.setState({ open: !this.state.open });
      this.props.onClick(evt);
    }
  };

  handleKeyDown = evt => {
    if (keyCodeMatches(evt, [keys.ArrowDown])) {
      this.setState({ open: !this.state.open });
      this.props.onClick(evt);
    }
  };

  handleKeyPress = evt => {
    if (
      this.state.open &&
      keyCodeMatches(evt, [
        keys.ArrowUp,
        keys.ArrowRight,
        keys.ArrowDown,
        keys.ArrowLeft,
      ])
    ) {
      evt.preventDefault();
    }

    // Close the overflow menu on escape
    if (keyCodeMatches(evt, [keys.Escape])) {
      this.closeMenu();
      // Stop the esc keypress from bubbling out and closing something it shouldn't
      evt.stopPropagation();
    }
  };

  handleClickOutside = evt => {
    if (!this._menuBody || !this._menuBody.contains(evt.target)) {
      this.closeMenu();
    }
  };

  closeMenu = () => {
    let wasOpen = this.state.open;
    this.setState({ open: false }, () => {
      if (wasOpen) {
        this.focusMenuEl();
      }
      this.props.onClose();
    });
  };

  bindMenuEl = menuEl => {
    this.menuEl = menuEl;
  };

  focusMenuEl = () => {
    if (this.menuEl) {
      this.menuEl.focus();
    }
  };

  handleOverflowMenuItemFocus = index => {
    const i = (() => {
      switch (index) {
        case -1:
          return React.Children.count(this.props.children) - 1;
        case React.Children.count(this.props.children):
          return 0;
        default:
          return index;
      }
    })();
    const { overflowMenuItem } =
      this[`overflowMenuItem${i}`] ||
      React.Children.toArray(this.props.children)[i];
    if (overflowMenuItem && overflowMenuItem.current) {
      overflowMenuItem.current.focus();
    }
  };

  /**
   * Handles the floating menu being unmounted or non-floating menu being
   * mounted or unmounted.
   * @param {Element} menuBody The DOM element of the menu body.
   * @private
   */
  _bindMenuBody = menuBody => {
    if (!menuBody) {
      this._menuBody = menuBody;
    }
    if (!menuBody && this._hFocusIn) {
      this._hFocusIn = this._hFocusIn.release();
    }
  };

  /**
   * Handles the floating menu being placed.
   * @param {Element} menuBody The DOM element of the menu body.
   * @private
   */
  _handlePlace = menuBody => {
    if (menuBody) {
      this._menuBody = menuBody;
      const primaryFocus =
        menuBody.querySelector('[data-floating-menu-primary-focus]') ||
        menuBody;
      primaryFocus.focus();
      const hasFocusin = 'onfocusin' in window;
      const focusinEventName = hasFocusin ? 'focusin' : 'focus';
      this._hFocusIn = on(
        menuBody.ownerDocument,
        focusinEventName,
        event => {
          const { target } = event;
          if (
            !menuBody.contains(target) &&
            this.menuEl &&
            !target.matches(
              `.${prefix}--overflow-menu,.${prefix}--overflow-menu-options`
            )
          ) {
            this.closeMenu();
          }
        },
        !hasFocusin
      );
      this.props.onOpen();
    }
  };

  /**
   * @returns {Element} The DOM element where the floating menu is placed in.
   */
  _getTarget = () => {
    return (
      (this.menuEl && this.menuEl.closest('[data-floating-menu-container]')) ||
      document.body
    );
  };

  render() {
    const {
      id,
      tabIndex,
      ariaLabel,
      children,
      iconDescription,
      direction,
      flipped,
      menuOffset,
      menuOffsetFlip,
      iconClass,
      onClick, // eslint-disable-line
      onOpen, // eslint-disable-line
      renderIcon: IconElement,
      innerRef: ref,
      menuOptionsClass,
      light,
      ...other
    } = this.props;

    const { open } = this.state;

    const overflowMenuClasses = classNames(
      this.props.className,
      `${prefix}--overflow-menu`,
      {
        [`${prefix}--overflow-menu--open`]: open,
        [`${prefix}--overflow-menu--light`]: light,
      }
    );

    const overflowMenuOptionsClasses = classNames(
      menuOptionsClass,
      `${prefix}--overflow-menu-options`,
      {
        [`${prefix}--overflow-menu--flip`]: this.props.flipped,
        [`${prefix}--overflow-menu-options--open`]: open,
        [`${prefix}--overflow-menu-options--light`]: light,
      }
    );

    const overflowMenuIconClasses = classNames(
      `${prefix}--overflow-menu__icon`,
      iconClass
    );

    const childrenWithProps = React.Children.toArray(children).map(
      (child, index) =>
        React.cloneElement(child, {
          closeMenu: this.closeMenu,
          handleOverflowMenuItemFocus: this.handleOverflowMenuItemFocus,
          ref: e => {
            this[`overflowMenuItem${index}`] = e;
          },
          index,
        })
    );

    const menuBody = (
      <ul
        className={overflowMenuOptionsClasses}
        tabIndex="-1"
        role="menu"
        aria-label={ariaLabel}>
        {childrenWithProps}
      </ul>
    );

    const wrappedMenuBody = (
      <FloatingMenu
        menuPosition={this.state.menuPosition}
        menuDirection={direction}
        menuOffset={flipped ? menuOffsetFlip : menuOffset}
        menuRef={this._bindMenuBody}
        menuEl={this.menuEl}
        flipped={this.props.flipped}
        target={this._getTarget}
        onPlace={this._handlePlace}>
        {React.cloneElement(menuBody, {
          'data-floating-menu-direction': direction,
        })}
      </FloatingMenu>
    );

    const iconProps = {
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
      className: overflowMenuIconClasses,
      'aria-label': iconDescription,
      focusable: 'false', // Prevent `<svg>` in trigger icon from getting focus for IE11
    };

    return (
      <ClickListener onClickOutside={this.handleClickOutside}>
        <button
          {...other}
          aria-haspopup
          aria-expanded={this.state.open}
          className={overflowMenuClasses}
          onKeyDown={this.handleKeyPress}
          onClick={this.handleClick}
          aria-label={ariaLabel}
          id={id}
          tabIndex={tabIndex}
          ref={mergeRefs(ref, this.bindMenuEl)}>
          <IconElement {...iconProps}>
            {iconDescription && <title>{iconDescription}</title>}
          </IconElement>
          {open && wrappedMenuBody}
        </button>
      </ClickListener>
    );
  }
}

export default (() => {
  const forwardRef = (props, ref) => <OverflowMenu {...props} innerRef={ref} />;
  forwardRef.displayName = 'OverflowMenu';
  return React.forwardRef(forwardRef);
})();
