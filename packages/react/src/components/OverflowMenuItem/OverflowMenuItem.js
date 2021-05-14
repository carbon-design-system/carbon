/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { match, keys } from '../../internal/keyboard';
import { warning } from '../../internal/warning';
import deprecate from '../../prop-types/deprecate.js';

const { prefix } = settings;

export default class OverflowMenuItem extends React.Component {
  static propTypes = {
    /**
     * The CSS class name to be placed on the button element
     */
    className: PropTypes.string,

    /**
     * A callback to tell the parent menu component that the menu should be closed.
     */
    closeMenu: PropTypes.func,

    /**
     * `true` to make this menu item disabled.
     */
    disabled: PropTypes.bool,

    handleOverflowMenuItemFocus: PropTypes.func,

    /**
     * `true` to make this menu item a divider.
     */
    hasDivider: PropTypes.bool,

    /**
     * If given, overflow item will render as a link with the given href
     */
    href: PropTypes.string,

    index: PropTypes.number,

    /**
     * `true` to make this menu item a "danger button".
     */
    isDelete: PropTypes.bool,

    /**
     * The text in the menu item.
     */
    itemText: PropTypes.node.isRequired,

    /**
     * event handlers
     */
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseUp: PropTypes.func,

    /**
     * `true` if this menu item should get focus when the menu gets open.
     */
    primaryFocus: deprecate(
      PropTypes.bool,
      'The `primaryFocus` prop has been deprecated as it is no longer used. ' +
        'Feel free to remove this prop from <OverflowMenuItem>. This prop will ' +
        'be removed in the next major release of `carbon-components-react`. ' +
        'Opt for `selectorPrimaryFocus` in `<OverflowMenu>` instead'
    ),

    /**
     * `true` if this menu item has long text and requires a browser tooltip
     */
    requireTitle: PropTypes.bool,

    /**
     * Specify a title for the OverflowMenuItem
     */
    title: PropTypes.string,

    /**
     * The CSS class name to be placed on the wrapper list item element
     */
    wrapperClassName: PropTypes.string,
  };

  static defaultProps = {
    hasDivider: false,
    isDelete: false,
    disabled: false,
    itemText: 'Provide itemText',
    onClick: () => {},
    onKeyDown: () => {},
  };

  overflowMenuItem = React.createRef();

  setTabFocus = (evt) => {
    if (match(evt, keys.ArrowDown)) {
      this.props.handleOverflowMenuItemFocus({
        currentIndex: this.props.index,
        direction: 1,
      });
    }
    if (match(evt, keys.ArrowUp)) {
      this.props.handleOverflowMenuItemFocus({
        currentIndex: this.props.index,
        direction: -1,
      });
    }
  };

  handleClick = (evt) => {
    const { onClick, closeMenu } = this.props;
    onClick(evt);
    if (closeMenu) {
      closeMenu();
    }
  };

  render() {
    const {
      href,
      className,
      itemText,
      hasDivider,
      isDelete,
      disabled,
      closeMenu,
      // eslint-disable-next-line no-unused-vars
      onClick,
      // eslint-disable-next-line no-unused-vars
      handleOverflowMenuItemFocus,
      onKeyDown,
      primaryFocus,
      wrapperClassName,
      requireTitle,
      index,
      title,
      ...other
    } = this.props;

    if (__DEV__) {
      warning(
        closeMenu,
        '`<OverflowMenuItem>` detected missing `closeMenu` prop. ' +
          '`closeMenu` is required to let `<OverflowMenu>` close the menu upon actions on `<OverflowMenuItem>`. ' +
          'Please make sure `<OverflowMenuItem>` is a direct child of `<OverflowMenu>.'
      );
    }

    const overflowMenuBtnClasses = classNames(
      `${prefix}--overflow-menu-options__btn`,
      className
    );
    const overflowMenuItemClasses = classNames(
      `${prefix}--overflow-menu-options__option`,
      {
        [`${prefix}--overflow-menu--divider`]: hasDivider,
        [`${prefix}--overflow-menu-options__option--danger`]: isDelete,
        [`${prefix}--overflow-menu-options__option--disabled`]: disabled,
      },
      wrapperClassName
    );
    const TagToUse = href ? 'a' : 'button';
    const OverflowMenuItemContent = (() => {
      if (typeof itemText !== 'string') {
        return itemText;
      }
      return (
        <div className={`${prefix}--overflow-menu-options__option-content`}>
          {itemText}
        </div>
      );
    })();
    return (
      <li className={overflowMenuItemClasses} role="none">
        <TagToUse
          {...other}
          {...{
            'data-floating-menu-primary-focus': primaryFocus || null,
          }}
          role="menuitem"
          href={href}
          className={overflowMenuBtnClasses}
          disabled={disabled}
          onClick={this.handleClick}
          onKeyDown={(evt) => {
            this.setTabFocus(evt);
            onKeyDown(evt);
          }}
          ref={this.overflowMenuItem}
          title={requireTitle ? title || itemText : null}
          tabIndex="-1"
          index={index}>
          {OverflowMenuItemContent}
        </TagToUse>
      </li>
    );
  }
}
