/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { keys, match } from '../../internal/keyboard';
import { usePrefix } from '../../internal/usePrefix';
import { warning } from '../../internal/warning';
import { ForwardRefReturn } from '../../types/common';

export interface OverflowMenuItemProps
  extends React.HTMLAttributes<HTMLElement> {
  /**
   * The CSS class name to be placed on the button element
   */
  className?: string;

  /**
   * A callback to tell the parent menu component that the menu should be closed.
   */
  closeMenu?: () => void;

  /**
   * `true` to make this menu item disabled.
   */
  disabled?: boolean;

  handleOverflowMenuItemFocus?: (options: {
    currentIndex?: number;
    direction: number;
  }) => void;

  /**
   * `true` to make this menu item a divider.
   */
  hasDivider?: boolean;

  /**
   * If given, overflow item will render as a link with the given href
   */
  href?: string;

  index?: number;

  /**
   * The text to show for the menu item
   */
  itemText?: React.ReactNode;

  /**
   * `true` to make this menu item a danger button.
   */
  isDelete?: boolean;

  /**
   * `true` to require the title attribute.
   */
  requireTitle?: boolean;

  /**
   * The title attribute.
   */
  title?: string;

  /**
   * The CSS class name to be placed on the wrapper element
   */
  wrapperClassName?: string;
}

export type OverflowMenuItemComponent = ForwardRefReturn<
  HTMLElement,
  OverflowMenuItemProps
>;

const OverflowMenuItem: OverflowMenuItemComponent = React.forwardRef(
  function OverflowMenuItem(
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
        handleOverflowMenuItemFocus?.({
          currentIndex: index,
          direction: 1,
        });
      }
      if (match(evt, keys.ArrowUp)) {
        handleOverflowMenuItemFocus?.({
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
          onClick={handleClick}
          onKeyDown={(evt) => {
            setTabFocus(evt);
            onKeyDown(evt);
          }}
          role="menuitem"
          // ref as any: the type of `ref` is `ForwardedRef<HTMLButtonElement>` in `Button` component
          // but `OverflowMenuItem` can be rendered as `a` tag as well, which is `HTMLAnchorElement`
          // so we have to use `any` here
          ref={ref as any}
          tabIndex={-1}
          // itemText as any: itemText may be a ReactNode, but `title` only accepts string
          // to avoid compatibility issue, we use `any` here. Consider to enforce `itemText` to be `string?`
          // in the next major release
          title={requireTitle ? title || (itemText as any) : undefined}
          {...rest}>
          {OverflowMenuItemContent}
        </TagToUse>
      </li>
    );
  }
);

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
