/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  type ComponentProps,
  type ForwardedRef,
  forwardRef,
  type ReactNode,
  ElementType,
  WeakValidationMap,
} from 'react';
import cx from 'classnames';
import Link, { LinkProps, LinkPropTypes } from './Link';
import { usePrefix } from '../../internal/usePrefix';
import deprecate from '../../prop-types/deprecate';

type HeaderMenuItemProps<E extends ElementType> = LinkProps<E> & {
  className?: string | undefined;
  isActive?: boolean | undefined;
  isCurrentPage?: boolean | undefined;
  'aria-current'?: string | undefined;
  children: ReactNode;
  role?: ComponentProps<'li'>['role'];
  tabIndex?: number | undefined;
};

function HeaderMenuItemRenderFunction<E extends ElementType = 'a'>(
  {
    className,
    isActive,
    isCurrentPage,
    'aria-current': ariaCurrent,
    children,
    role,
    tabIndex = 0,
    ...rest
  }: HeaderMenuItemProps<E>,
  ref: ForwardedRef<ElementType>
) {
  const prefix = usePrefix();
  if (isCurrentPage) {
    isActive = isCurrentPage;
  }
  const linkClassName = cx({
    [`${prefix}--header__menu-item`]: true,
    // We set the current class only if `isActive` is passed in and we do
    // not have an `aria-current="page"` set for the breadcrumb item
    [`${prefix}--header__menu-item--current`]:
      isActive && ariaCurrent !== 'page',
  });
  return (
    <li className={className} role={role}>
      <Link
        {...rest}
        aria-current={ariaCurrent}
        className={linkClassName}
        ref={ref}
        tabIndex={tabIndex}>
        <span className={`${prefix}--text-truncate--end`}>{children}</span>
      </Link>
    </li>
  );
}

const HeaderMenuItem = forwardRef(HeaderMenuItemRenderFunction) as (<
  E extends ElementType = 'a'
>(
  props: HeaderMenuItemProps<E>
) => JSX.Element) & {
  displayName?: string;
  propTypes?: WeakValidationMap<HeaderMenuItemProps<any>>;
};

HeaderMenuItem.displayName = 'HeaderMenuItem';
HeaderMenuItem.propTypes = {
  /**
   * Pass in a valid `element` to replace the underlying `<a>` tag with a
   * custom `Link` element
   */
  ...LinkPropTypes,

  /**
   * Pass in children that are either a string or can be read as a string by
   * screen readers
   */
  children: PropTypes.node.isRequired,

  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className: PropTypes.string,

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
    'The `isCurrentPage` prop for `HeaderMenuItem` has ' +
      'been deprecated. Please use `isActive` instead. This will be removed in the next major release.'
  ),

  /**
   * Optionally supply a role for the underlying `<li>` node. Useful for resetting
   * `<ul>` semantics for menus.
   */
  role: PropTypes.string,

  /**
   * Specify the tab index of the Link
   */
  tabIndex: PropTypes.number,
};

export default HeaderMenuItem;
