/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ChevronDown } from '@carbon/icons-react';
import cx from 'classnames';
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useContext,
  useRef,
  useState,
  type ComponentProps,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';
import PropTypes from 'prop-types';
import { keys, matches } from '../../internal/keyboard';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
import { PrefixContext } from '../../internal/usePrefix';
import deprecate from '../../prop-types/deprecate';
import { composeEventHandlers } from '../../tools/events';
import { useMergedRefs } from '../../internal/useMergedRefs';
import type HeaderMenuItem from './HeaderMenuItem';

export interface HeaderMenuProps {
  /**
   * Required props for the accessibility label of the menu
   */
  'aria-label'?: string;
  'aria-labelledby'?: string;

  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className?: string;

  /**
   * Provide a custom ref handler for the menu button
   */
  focusRef?: Ref<any>;

  /**
   * Applies selected styles to the item if a user sets this to true and `aria-current !== 'page'`.
   */
  isActive?: boolean;

  /**
   * Applies selected styles to the item if a user sets this to true and `aria-current !== 'page'`.
   * @deprecated Please use `isActive` instead. This will be removed in the next major release.
   */
  isCurrentPage?: boolean;

  /**
   * Provide a label for the link text
   */
  menuLinkName: string;

  /**
   * Optionally provide an onBlur handler that is called when the underlying
   * button fires it's onblur event
   */
  onBlur?: (event: FocusEvent<HTMLLIElement>) => void;

  /**
   * Optionally provide an onClick handler that is called when the underlying
   * button fires it's onclick event
   */
  onClick?: (event: MouseEvent<HTMLLIElement>) => void;

  /**
   * Optionally provide an onKeyDown handler that is called when the underlying
   * button fires it's onkeydown event
   */
  onKeyDown?: (event: KeyboardEvent<HTMLLIElement>) => void;

  /**
   * Optional component to render instead of string
   */
  renderMenuContent?: () => ReactNode;

  /**
   * Optionally provide a tabIndex for the underlying menu button
   */
  tabIndex?: number;

  /**
   * The children should be a series of `HeaderMenuItem` components.
   */
  children?: ReactNode;
}

const frFn = forwardRef<HTMLLIElement, HeaderMenuProps>;

export const HeaderMenu = frFn((props, ref) => {
  const {
    isActive,
    isCurrentPage,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    className: customClassName,
    children,
    renderMenuContent: MenuContent,
    menuLinkName,
    focusRef,
    onBlur,
    onClick,
    onKeyDown,
    ...rest
  } = props;
  const prefix = useContext(PrefixContext);
  const [expanded, setExpanded] = useState(false);

  const menuButtonRef = useRef<HTMLElement | null>(null);
  const subMenusRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  const mergedButtonRef = useMergedRefs([ref, focusRef, menuButtonRef]);

  /**
   * Toggle the expanded state of the menu on click.
   */
  const handleOnClick = (e: MouseEvent<HTMLLIElement>) => {
    if (
      !subMenusRef.current ||
      (e.target instanceof Node && !subMenusRef.current.contains(e.target))
    ) {
      e.preventDefault();
    }

    setExpanded((prev) => !prev);
  };

  /**
   * Keyboard event handler for the entire menu.
   */
  const handleOnKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
    // Handle enter or space key for toggling the expanded state of the menu.
    if (matches(event, [keys.Enter, keys.Space])) {
      event.stopPropagation();
      event.preventDefault();

      setExpanded((prev) => !prev);

      return;
    }
  };

  /**
   * Handle our blur event from our underlying menuitems. Will mostly be used
   * for closing our menu in response to a user clicking off or tabbing out of
   * the menu or menubar.
   */
  const handleOnBlur = (event: FocusEvent<HTMLLIElement>) => {
    // Close the menu on blur when the related target is not a sibling menu item
    // or a child in a submenu
    const siblingItemBlurredTo = itemRefs.current.find(
      (element) => element === event.relatedTarget
    );
    const childItemBlurredTo = subMenusRef.current?.contains(
      event.relatedTarget
    );

    if (!siblingItemBlurredTo && !childItemBlurredTo) {
      setExpanded(false);
    }
  };

  /**
   * Handles individual menuitem refs. We assign them to a class instance
   * property so that we can properly manage focus of our children.
   */
  const handleItemRef = (index: number) => (node: HTMLElement | null) => {
    itemRefs.current[index] = node;
  };

  const handleMenuClose = (event: KeyboardEvent<HTMLLIElement>) => {
    // Handle ESC keydown for closing the expanded menu.
    if (matches(event, [keys.Escape]) && expanded) {
      event.stopPropagation();
      event.preventDefault();

      setExpanded(false);

      // Return focus to menu button when the user hits ESC.
      if (menuButtonRef.current) {
        menuButtonRef.current.focus();
      }
    }
  };

  const hasActiveDescendant = (childrenArg: ReactNode): boolean =>
    Children.toArray(childrenArg).some((child) => {
      if (!isValidElement<ComponentProps<typeof HeaderMenuItem>>(child)) {
        return false;
      }

      const { isActive, isCurrentPage, children } = child.props;

      return (
        isActive ||
        isCurrentPage ||
        (Array.isArray(children) && hasActiveDescendant(children))
      );
    });

  /**
   * We capture the `ref` for each child inside of `this.items` to properly
   * manage focus. In addition to this focus management, all items receive a
   * `tabIndex: -1` so the user won't hit a large number of items in their tab
   * sequence when they might not want to go through all the items.
   */
  const renderMenuItem = (item: ReactNode, index: number): ReactNode => {
    if (isValidElement(item)) {
      return cloneElement(item as ReactElement<any>, {
        ref: handleItemRef(index),
      });
    }
    return item;
  };

  const accessibilityLabel = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  };
  const itemClassName = cx({
    [`${prefix}--header__submenu`]: true,
    [`${customClassName}`]: !!customClassName,
  });
  const isActivePage = isActive ? isActive : isCurrentPage;
  const linkClassName = cx({
    [`${prefix}--header__menu-item`]: true,
    [`${prefix}--header__menu-title`]: true,
    // We set the current class only if `isActive` is passed in and we do
    // not have an `aria-current="page"` set for the breadcrumb item
    [`${prefix}--header__menu-item--current`]:
      isActivePage || (hasActiveDescendant(children) && !expanded),
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
      onKeyDown={composeEventHandlers([onKeyDown, handleMenuClose])}
      onClick={composeEventHandlers([onClick, handleOnClick])}
      onBlur={composeEventHandlers([onBlur, handleOnBlur])}
      ref={ref}>
      <a // eslint-disable-line jsx-a11y/role-supports-aria-props,jsx-a11y/anchor-is-valid
        aria-haspopup="menu" // eslint-disable-line jsx-a11y/aria-proptypes
        aria-expanded={expanded}
        className={linkClassName}
        href="#"
        onKeyDown={handleOnKeyDown}
        ref={mergedButtonRef}
        tabIndex={0}
        {...accessibilityLabel}>
        {menuLinkName}
        {MenuContent ? (
          <MenuContent />
        ) : (
          <ChevronDown className={`${prefix}--header__menu-arrow`} />
        )}
      </a>
      <ul
        {...accessibilityLabel}
        ref={subMenusRef}
        className={`${prefix}--header__menu`}>
        {Children.map(children, renderMenuItem)}
      </ul>
    </li>
  );
});

HeaderMenu.displayName = 'HeaderMenu';
HeaderMenu.propTypes = {
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

export default HeaderMenu;
