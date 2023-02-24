/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { match, keys } from '../../internal/keyboard';
import { warning } from '../../internal/warning';
import { usePrefix } from '../../internal/usePrefix';

const OverflowMenuItem = React.forwardRef(function OverflowMenuItem(
  {
    className,
    closeMenu,
    disabled = false,
    handleOverflowMenuItemFocus,
    hasDivider = false,
    href,
    isDelete = false,
    index,
    itemText = 'Provide itemText',
    onClick = () => {},
    onKeyDown = () => {},
    requireTitle,
    title,
    wrapperClassName,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();

  function setTabFocus(evt) {
    if (match(evt, keys.ArrowDown)) {
      handleOverflowMenuItemFocus({
        currentIndex: index,
        direction: 1,
      });
    }
    if (match(evt, keys.ArrowUp)) {
      handleOverflowMenuItemFocus({
        currentIndex: index,
        direction: -1,
      });
    }
  }

  function handleClick(evt) {
    onClick(evt);
    if (closeMenu) {
      closeMenu();
    }
  }

  if (__DEV__) {
    warning(
      closeMenu,
      '`<OverflowMenuItem>` detected missing `closeMenu` prop. ' +
        '`closeMenu` is required to let `<OverflowMenu>` close the menu upon actions on `<OverflowMenuItem>`. ' +
        'Please make sure `<OverflowMenuItem>` is a direct child of `<OverflowMenu>.'
    );
  }

  const overflowMenuBtnClasses = cx(
    `${prefix}--overflow-menu-options__btn`,
    className
  );
  const overflowMenuItemClasses = cx(
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
        className={overflowMenuBtnClasses}
        disabled={disabled}
        href={href}
        index={index}
        onClick={handleClick}
        onKeyDown={(evt) => {
          setTabFocus(evt);
          onKeyDown(evt);
        }}
        role="menuitem"
        ref={ref}
        tabIndex="-1"
        title={requireTitle ? title || itemText : null}
        {...rest}>
        {OverflowMenuItemContent}
      </TagToUse>
    </li>
  );
});

OverflowMenuItem.propTypes = {
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

export default OverflowMenuItem;
