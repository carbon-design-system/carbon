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
import warning from 'warning';
import { iconOverflowMenu } from 'carbon-icons';
import { settings } from 'carbon-components';
import ClickListener from '../../internal/ClickListener';
import FloatingMenu, {
  DIRECTION_TOP,
  DIRECTION_BOTTOM,
} from '../../internal/FloatingMenu';
import OptimizedResize from '../../internal/OptimizedResize';
import Icon from '../Icon';
import OverflowMenuVertical16 from '@carbon/icons-react/lib/overflow-menu--vertical/16';
import { breakingChangesX, componentsX } from '../../internal/FeatureFlags';
import { keys, matches as keyCodeMatches } from '../../tools/key';

const { prefix } = settings;

let didWarnAboutDeprecation = false;

const matchesFuncName =
  typeof Element !== 'undefined' &&
  ['matches', 'webkitMatchesSelector', 'msMatchesSelector'].filter(
    name => typeof Element.prototype[name] === 'function'
  )[0];

/**
 * @param {Node} elem A DOM node.
 * @param {string} selector A CSS selector
 * @returns {boolean} `true` if the given DOM element is a element node and matches the given selector.
 * @private
 */
const matches = (elem, selector) =>
  typeof elem[matchesFuncName] === 'function' &&
  elem[matchesFuncName](selector);

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
 * @param {Element} elem An element.
 * @param {string} selector An query selector.
 * @returns {Element} The ancestor of the given element matching the given selector.
 * @private
 */
const closest = (elem, selector) => {
  const doc = elem.ownerDocument;
  for (
    let traverse = elem;
    traverse && traverse !== doc;
    traverse = traverse.parentNode
  ) {
    if (matches(traverse, selector)) {
      return traverse;
    }
  }
  return null;
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
  const arrowStyle = menuBody.ownerDocument.defaultView.getComputedStyle(
    menuBody,
    ':before'
  );
  const values = [
    triggerButtonPositionProp,
    'left',
    'width',
    'height',
    'border-top-width',
  ].reduce(
    (o, name) => ({
      ...o,
      [name]: Number(
        (/^([\d-.]+)px$/.exec(arrowStyle.getPropertyValue(name)) || [])[1]
      ),
    }),
    {}
  );
  if (Object.keys(values).every(name => !isNaN(values[name]))) {
    const { left, width, height, 'border-top-width': borderTopWidth } = values;
    return {
      left: menuWidth / 2 - (left + Math.sqrt(width ** 2 + height ** 2) / 2),
      top:
        Math.sqrt(borderTopWidth ** 2 * 2) +
        triggerButtonPositionFactor * values[triggerButtonPositionProp],
    };
  }

  if (componentsX) {
    switch (triggerButtonPositionProp) {
      case 'top':
      case 'bottom': {
        const triggerWidth = trigger.offsetWidth;
        return {
          left: (!flip ? 1 : -1) * (menuWidth / 2 - triggerWidth / 2),
          top: 0,
        };
      }
      case 'left':
      case 'right': {
        const triggerHeight = trigger.offsetHeight;
        return {
          left: 0,
          top: (!flip ? 1 : -1) * (menuHeight / 2 - triggerHeight / 2),
        };
      }

      default:
        break;
    }
  }
};

export default class OverflowMenu extends Component {
  state = {};

  static propTypes = {
    /**
     * `true` if the menu should be open.
     */
    open: PropTypes.bool,

    /**
     * The menu direction, supported only with `floatingMenu={true}`.
     */
    direction: PropTypes.oneOf([DIRECTION_TOP, DIRECTION_BOTTOM]),

    /**
     * `true` if the menu alignment should be flipped.
     */
    flipped: PropTypes.bool,

    /**
     * `true` if the menu should be floated, making the DOM of the menu body orphaned from the trigger button.
     * Useful when the container of the triggering element cannot have `overflow:visible` style, etc.
     */
    floatingMenu: PropTypes.bool,

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
     * The icon.
     */
    icon: PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
      viewBox: PropTypes.string.isRequired,
      svgData: PropTypes.object.isRequired,
    }),

    /**
     * The icon name.
     */
    iconName: PropTypes.string,

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
     * Function called when menu is closed
     */
    onOpen: PropTypes.func,
  };

  static defaultProps = {
    ariaLabel: 'list of options',
    iconDescription: 'open and close list of options',
    open: false,
    direction: DIRECTION_BOTTOM,
    flipped: false,
    floatingMenu: false,
    renderIcon: !componentsX ? undefined : OverflowMenuVertical16,
    onClick: () => {},
    onKeyDown: () => {},
    onClose: () => {},
    onOpen: () => {},
    tabIndex: 0,
    menuOffset: getMenuOffset,
    menuOffsetFlip: getMenuOffset,
  };

  /**
   * The handle of `onfocusin` or `focus` event handler.
   * @private
   */
  _hFocusIn = null;

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
    const { onClose, onOpen, floatingMenu } = this.props;

    if (this.state.open) {
      if (!floatingMenu) {
        const primaryFocusableElement = this.getPrimaryFocusableElement();
        if (primaryFocusableElement) {
          primaryFocusableElement.focus();
        }

        onOpen();
      }
    } else {
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
    if (keyCodeMatches(evt, [keys.DOWN])) {
      this.setState({ open: !this.state.open });
      this.props.onClick(evt);
    }
  };

  handleKeyPress = evt => {
    // only respond to key events when the menu is closed, so that menu items still respond to key events
    if (!this.state.open) {
      if (keyCodeMatches(evt, [keys.ENTER, keys.SPACE])) {
        this.setState({ open: true });
      }
    }

    // Close the overflow menu on escape
    if (keyCodeMatches(evt, [keys.ESC])) {
      this.closeMenu();
      // Stop the esc keypress from bubbling out and closing something it shouldn't
      evt.stopPropagation();
      evt.preventDefault();
    }
  };

  handleClickOutside = evt => {
    if (!this._menuBody || !this._menuBody.contains(evt.target)) {
      this.closeMenu();
    }
  };

  /**
   * collapse menu when focus is lost
   * Due to Storybook hijacking focus, we must wrap our `activeElement` check
   * in a closure. As a result of this hack, we must also call `event.persist()`
   * to ensure that we can access the event properties asynchronously
   *
   * https://reactjs.org/docs/events.html#event-pooling
   */
  handleBlur = evt => {
    if (this.props.floatingMenu) {
      return;
    }
    evt.persist();
    // event loop hack
    setTimeout(() => {
      if (!this.menuEl.contains(evt.target.ownerDocument.activeElement)) {
        this.setState({ open: false });
      }
    }, 0);
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
   * Handles the floating menu being unmounted.
   * @param {Element} menuBody The DOM element of the menu body.
   * @private
   */
  _bindMenuBody = menuBody => {
    if (!menuBody) {
      this._menuBody = menuBody;
      if (this._hFocusIn) {
        this._hFocusIn = this._hFocusIn.release();
      }
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
      (
        menuBody.querySelector('[data-floating-menu-primary-focus]') || menuBody
      ).focus();
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
            !matches(
              target,
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
  _getTarget = () =>
    (this.menuEl && closest(this.menuEl, '[data-floating-menu-container]')) ||
    document.body;

  render() {
    const {
      id,
      tabIndex,
      ariaLabel,
      children,
      iconDescription,
      icon,
      iconName,
      direction,
      flipped,
      floatingMenu,
      menuOffset,
      menuOffsetFlip,
      iconClass,
      onClick, // eslint-disable-line
      onOpen, // eslint-disable-line
      renderIcon: IconElement,
      ...other
    } = this.props;

    if (__DEV__) {
      warning(
        floatingMenu || direction === DIRECTION_BOTTOM,
        '[OverflowMenu] menu direction other than `bottom` is only supporting with `floatingMenu` option. Received: `%s`',
        direction
      );
    }

    if (__DEV__ && breakingChangesX && (icon || iconName)) {
      warning(
        didWarnAboutDeprecation,
        'The `icon`/`iconName` properties in the `OverflowMenu` component is being removed in the next release of ' +
          '`carbon-components-react`. Please use `renderIcon` instead.'
      );
      didWarnAboutDeprecation = true;
    }

    const { open } = this.state;

    const overflowMenuClasses = classNames(
      this.props.className,
      `${prefix}--overflow-menu`,
      {
        [`${prefix}--overflow-menu--open`]: open,
      }
    );

    const overflowMenuOptionsClasses = classNames(
      `${prefix}--overflow-menu-options`,
      {
        [`${prefix}--overflow-menu--flip`]: this.props.flipped,
        [`${prefix}--overflow-menu-options--open`]: open,
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
          floatingMenu: floatingMenu || undefined,
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
        ref={!floatingMenu && this._bindMenuBody}
        role="menu">
        {childrenWithProps}
      </ul>
    );

    const wrappedMenuBody = !floatingMenu ? (
      menuBody
    ) : (
      <div role="menuitem">
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
      </div>
    );

    const iconProps = {
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
      className: overflowMenuIconClasses,
      description: iconDescription,
      focusable: 'false', // Prevent `<svg>` in trigger icon from getting focus for IE11
    };

    const overflowMenuIcon = (() => {
      return IconElement ? (
        <IconElement {...iconProps} />
      ) : (
        <Icon
          {...iconProps}
          icon={!icon && !iconName ? iconOverflowMenu : icon}
          name={iconName}
        />
      );
    })();

    return (
      <ClickListener onClickOutside={this.handleClickOutside}>
        <div
          {...other}
          role="menu"
          aria-haspopup
          aria-expanded={this.state.open}
          className={overflowMenuClasses}
          onKeyDown={this.handleKeyPress}
          onBlur={this.handleBlur}
          onClick={this.handleClick}
          aria-label={ariaLabel}
          id={id}
          tabIndex={tabIndex}
          ref={this.bindMenuEl}>
          {overflowMenuIcon}
          {open && wrappedMenuBody}
        </div>
      </ClickListener>
    );
  }
}
