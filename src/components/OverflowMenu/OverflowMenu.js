import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import ClickListener from '../../internal/ClickListener';
import FloatingMenu from '../../internal/FloatingMenu';
import OptimizedResize from '../../internal/OptimizedResize';
import Icon from '../Icon';

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
    if (traverse.matches(selector)) {
      return traverse;
    }
  }
  return null;
};

/**
 * @param {Element} menuBody The menu body with the menu arrow.
 * @returns {FloatingMenu~offset} The adjustment of the floating menu position, upon the position of the menu arrow.
 * @private
 */
const getMenuOffset = menuBody => {
  const menuWidth = menuBody.offsetWidth;
  const arrowStyle = menuBody.ownerDocument.defaultView.getComputedStyle(
    menuBody,
    ':before'
  );
  const values = ['top', 'left', 'width', 'height', 'border-top-width'].reduce(
    (o, name) => ({
      ...o,
      [name]: Number(
        (/^([\d-]+)px$/.exec(arrowStyle.getPropertyValue(name)) || [])[1]
      ),
    }),
    {}
  );
  if (Object.keys(values).every(name => !isNaN(values[name]))) {
    const {
      top,
      left,
      width,
      height,
      'border-top-width': borderTopWidth,
    } = values;
    return {
      left:
        menuWidth / 2 -
        (left + Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2),
      top: Math.sqrt(Math.pow(borderTopWidth, 2) * 2) - top,
    };
  }
};

export default class OverflowMenu extends Component {
  static propTypes = {
    /**
     * `true` if the menu should be open.
     */
    open: PropTypes.bool,

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
    renderIcon: PropTypes.func,

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
    iconName: 'overflow-menu',
    open: false,
    flipped: false,
    floatingMenu: false,
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

  state = {
    /**
     * The open/closed state.
     * @type {boolean}
     */
    open: this.props.open,
  };

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

  componentDidUpdate() {
    const { onClose, onOpen, floatingMenu } = this.props;

    if (this.state.open) {
      if (!floatingMenu) {
        (
          this.menuEl.querySelector('[data-overflow-menu-primary-focus]') ||
          this.menuEl
        ).focus();
        onOpen();
      }
    } else {
      onClose();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open) {
      this.setState({ open: nextProps.open });
    }
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
    this.setState({ open: !this.state.open });
    this.props.onClick(evt);
  };

  handleKeyDown = evt => {
    if (evt.which === 40) {
      this.setState({ open: !this.state.open });
      this.props.onClick(evt);
    }
  };

  handleKeyPress = evt => {
    // only respond to key events when the menu is closed, so that menu items still respond to key events
    if (!this.state.open) {
      const key = evt.key || evt.which;

      if (key === 'Enter' || key === 13 || key === ' ' || key === 32) {
        this.setState({ open: true });
      }
    }
  };

  handleClickOutside = evt => {
    if (!this._menuBody || !this._menuBody.contains(evt.target)) {
      this.closeMenu();
    }
  };

  closeMenu = () => {
    this.setState({ open: false }, () => {
      this.props.onClose();
    });
  };

  bindMenuEl = menuEl => {
    this.menuEl = menuEl;
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
            !matches(target, '.bx--overflow-menu,.bx--overflow-menu-options')
          ) {
            this.closeMenu();
            // Note:
            // The last focusable element in the page should NOT be the trigger button of overflow menu.
            // Doing so breaks the code that detects if floating menu losing focus, e.g. by keyboard events.
            this.menuEl.focus();
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
      iconName,
      flipped,
      floatingMenu,
      menuOffset,
      menuOffsetFlip,
      iconClass,
      onClick, // eslint-disable-line
      onOpen, // eslint-disable-line
      renderIcon,
      ...other
    } = this.props;

    const { open } = this.state;

    const overflowMenuClasses = classNames(
      this.props.className,
      'bx--overflow-menu',
      {
        'bx--overflow-menu--open': open,
      }
    );

    const overflowMenuOptionsClasses = classNames('bx--overflow-menu-options', {
      'bx--overflow-menu--flip': this.props.flipped,
      'bx--overflow-menu-options--open': open,
    });

    const overflowMenuIconClasses = classNames(
      'bx--overflow-menu__icon',
      iconClass
    );

    const childrenWithProps = React.Children.toArray(children).map(child =>
      React.cloneElement(child, {
        closeMenu: this.closeMenu,
        floatingMenu: floatingMenu || undefined,
      })
    );

    const menuBody = (
      <ul
        className={overflowMenuOptionsClasses}
        tabIndex="-1"
        ref={!floatingMenu && this._bindMenuBody}>
        {childrenWithProps}
      </ul>
    );

    const wrappedMenuBody = !floatingMenu ? (
      menuBody
    ) : (
      <div role="menuitem">
        <FloatingMenu
          menuPosition={this.state.menuPosition}
          menuOffset={flipped ? menuOffsetFlip : menuOffset}
          menuRef={this._bindMenuBody}
          target={this._getTarget}
          onPlace={this._handlePlace}>
          {menuBody}
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

    return (
      <ClickListener onClickOutside={this.handleClickOutside}>
        <div
          {...other}
          role="button"
          aria-haspopup
          aria-expanded={this.state.open}
          className={overflowMenuClasses}
          onKeyDown={this.handleKeyPress}
          aria-label={ariaLabel}
          id={id}
          tabIndex={tabIndex}
          ref={this.bindMenuEl}>
          {renderIcon ? (
            renderIcon(iconProps)
          ) : (
            <Icon {...iconProps} name={iconName} style={{ width: '100%' }} />
          )}
          {open && wrappedMenuBody}
        </div>
      </ClickListener>
    );
  }
}
