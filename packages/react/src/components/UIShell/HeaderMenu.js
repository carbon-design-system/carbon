/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ChevronDown } from '@carbon/icons-react';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { keys, matches } from '../../internal/keyboard';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
import { PrefixContext } from '../../internal/usePrefix';
import deprecate from '../../prop-types/deprecate';
import { composeEventHandlers } from '../../tools/events';

/**
 * `HeaderMenu` is used to render submenu's in the `Header`. Most often children
 * will be a `HeaderMenuItem`. It handles certain keyboard events to help
 * with managing focus. It also passes along refs to each child so that it can
 * help manage focus state of its children.
 */
class HeaderMenu extends React.Component {
  static propTypes = {
    /**
     * Required props for the accessibility label of the menu
     */
    ...AriaLabelPropType,

    /**
     * Optionally provide a custom class to apply to the underlying `<li>` node
     */
    className: PropTypes.string,

    /**
     * Provide a custom ref handler for the menu button
     */
    focusRef: PropTypes.func,

    /**
     * Applies selected styles to the item if a user sets this to true and `aria-current !== 'page'`.
     */
    isActive: PropTypes.bool,

    /**
     * Applies selected styles to the item if a user sets this to true and `aria-current !== 'page'`.
     * @deprecated Please use `isActive` instead. This will be removed in the next major release.
     */
    isCurrentPage: deprecate(
      PropTypes.bool,
      'The `isCurrentPage` prop for `HeaderMenu` has ' +
        'been deprecated. Please use `isActive` instead. This will be removed in the next major release.'
    ),

    /**
     * Provide a label for the link text
     */
    menuLinkName: PropTypes.string.isRequired,

    /**
     * Optionally provide an onBlur handler that is called when the underlying
     * button fires it's onblur event
     */
    onBlur: PropTypes.func,

    /**
     * Optionally provide an onClick handler that is called when the underlying
     * button fires it's onclick event
     */
    onClick: PropTypes.func,

    /**
     * Optionally provide an onKeyDown handler that is called when the underlying
     * button fires it's onkeydown event
     */
    onKeyDown: PropTypes.func,

    /**
     * Optional component to render instead of string
     */
    renderMenuContent: PropTypes.func,

    /**
     * Optionally provide a tabIndex for the underlying menu button
     */
    tabIndex: PropTypes.number,
  };

  static contextType = PrefixContext;

  _subMenus = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      // Used to manage the expansion state of the menu
      expanded: false,
      // Refers to the menuitem that is currently focused
      // Note: children should have `role="menuitem"` on node consuming ref
      selectedIndex: null,
    };
    this.items = [];
  }

  /**
   * Toggle the expanded state of the menu on click.
   */
  handleOnClick = (e) => {
    const { current: subMenusNode } = this._subMenus;
    if (!subMenusNode || !subMenusNode.contains(e.target)) {
      e.preventDefault();
    }

    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }));
  };

  /**
   * Keyboard event handler for the entire menu.
   */
  handleOnKeyDown = (event) => {
    // Handle enter or space key for toggling the expanded state of the menu.
    if (matches(event, [keys.Enter, keys.Space])) {
      event.stopPropagation();
      event.preventDefault();

      this.setState((prevState) => ({
        expanded: !prevState.expanded,
      }));

      return;
    }
  };

  /**
   * Handle our blur event from our underlying menuitems. Will mostly be used
   * for closing our menu in response to a user clicking off or tabbing out of
   * the menu or menubar.
   */
  handleOnBlur = (event) => {
    // Close the menu on blur when the related target is not a sibling menu item
    // or a child in a submenu
    const siblingItemBlurredTo = this.items.find(
      (element) => element === event.relatedTarget
    );
    const childItemBlurredTo = this._subMenus.current?.contains(
      event.relatedTarget
    );

    if (!siblingItemBlurredTo && !childItemBlurredTo) {
      this.setState({ expanded: false, selectedIndex: null });
    }
  };

  /**
   * ref handler for our menu button. If we are supplied a `focusRef` prop, we also
   * forward along the node.
   *
   * This is useful when this component is a child in a
   * menu or menubar as it will allow the parent to explicitly focus the menu
   * button node when that child should receive focus.
   */
  handleMenuButtonRef = (node) => {
    if (this.props.focusRef) {
      this.props.focusRef(node);
    }
    this.menuButtonRef = node;
  };

  /**
   * Handles individual menuitem refs. We assign them to a class instance
   * property so that we can properly manage focus of our children.
   */
  handleItemRef = (index) => (node) => {
    this.items[index] = node;
  };

  handleMenuClose = (event) => {
    // Handle ESC keydown for closing the expanded menu.
    if (matches(event, [keys.Escape]) && this.state.expanded) {
      event.stopPropagation();
      event.preventDefault();

      this.setState(() => ({
        expanded: false,
        selectedIndex: null,
      }));

      // Return focus to menu button when the user hits ESC.
      this.menuButtonRef.focus();
      return;
    }
  };

  render() {
    const prefix = this.context;
    const {
      isActive,
      isCurrentPage,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      className: customClassName,
      children,
      renderMenuContent: MenuContent,
      menuLinkName,
      focusRef, // eslint-disable-line no-unused-vars
      onBlur,
      onClick,
      onKeyDown,
      ...rest
    } = this.props;

    const hasActiveDescendant = (childrenArg) =>
      React.Children.toArray(childrenArg).some(
        (child) =>
          child.props &&
          (child.props.isActive ||
            child.props.isCurrentPage ||
            (child.props.children instanceof Array &&
              hasActiveDescendant(child.props.children)))
      );

    const accessibilityLabel = {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
    };
    const itemClassName = cx({
      [`${prefix}--header__submenu`]: true,
      [customClassName]: !!customClassName,
    });
    let isActivePage = isActive ? isActive : isCurrentPage;
    const linkClassName = cx({
      [`${prefix}--header__menu-item`]: true,
      [`${prefix}--header__menu-title`]: true,
      // We set the current class only if `isActive` is passed in and we do
      // not have an `aria-current="page"` set for the breadcrumb item
      [`${prefix}--header__menu-item--current`]:
        isActivePage || (hasActiveDescendant(children) && !this.state.expanded),
    });

    // Notes on eslint comments and based on the examples in:
    // https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html#
    // - The focus is handled by the <a> menuitem, onMouseOver is for mouse
    // users
    // - aria-haspopup can definitely have the value "menu"
    // - aria-expanded is on their example node with role="menuitem"
    // - href can be set to javascript:void(0), ideally this will be a button
    return (
      <li // eslint-disable-line jsx-a11y/mouse-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
        {...rest}
        className={itemClassName}
        onKeyDown={composeEventHandlers([onKeyDown, this.handleMenuClose])}
        onClick={composeEventHandlers([onClick, this.handleOnClick])}
        onBlur={composeEventHandlers([onBlur, this.handleOnBlur])}>
        <a // eslint-disable-line jsx-a11y/role-supports-aria-props,jsx-a11y/anchor-is-valid
          aria-haspopup="menu" // eslint-disable-line jsx-a11y/aria-proptypes
          aria-expanded={this.state.expanded}
          className={linkClassName}
          href="#"
          onKeyDown={this.handleOnKeyDown}
          ref={this.handleMenuButtonRef}
          tabIndex={0}
          {...accessibilityLabel}>
          {menuLinkName}
          {MenuContent ? (
            <MenuContent />
          ) : (
            <ChevronDown className={`${this.context}--header__menu-arrow`} />
          )}
        </a>
        <ul
          {...accessibilityLabel}
          ref={this._subMenus}
          className={`${prefix}--header__menu`}>
          {React.Children.map(children, this._renderMenuItem)}
        </ul>
      </li>
    );
  }

  /**
   * We capture the `ref` for each child inside of `this.items` to properly
   * manage focus. In addition to this focus management, all items receive a
   * `tabIndex: -1` so the user won't hit a large number of items in their tab
   * sequence when they might not want to go through all the items.
   */
  _renderMenuItem = (item, index) => {
    if (React.isValidElement(item)) {
      return React.cloneElement(item, {
        ref: this.handleItemRef(index),
      });
    }
  };
}

const HeaderMenuForwardRef = React.forwardRef((props, ref) => {
  return <HeaderMenu {...props} focusRef={ref} />;
});

HeaderMenuForwardRef.displayName = 'HeaderMenu';

export { HeaderMenu };
export default HeaderMenuForwardRef;
