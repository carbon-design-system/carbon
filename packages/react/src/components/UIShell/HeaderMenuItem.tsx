/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes, { WeakValidationMap } from 'prop-types';
import React, {
  type ComponentProps,
  type ForwardedRef,
  forwardRef,
  type ReactNode,
  ElementType,
  JSX,
} from 'react';
import cx from 'classnames';
import Link, { LinkProps, LinkPropTypes } from './Link';
import { usePrefix } from '../../internal/usePrefix';
import deprecate from '../../prop-types/deprecate';
import { PolymorphicComponentPropWithRef } from '../../internal/PolymorphicProps';

export interface HeaderMenuItemBaseProps {
  className?: string | undefined;
  isActive?: boolean | undefined;
  isCurrentPage?: boolean | undefined;
  'aria-current'?: string | undefined;
  children: ReactNode;
  role?: ComponentProps<'li'>['role'];
  tabIndex?: number | undefined;
}

export type HeaderMenuItemProps<E extends ElementType = 'a'> =
  PolymorphicComponentPropWithRef<E, HeaderMenuItemBaseProps>;

export interface HeaderMenuItemComponent {
  <E extends ElementType = 'a'>(
    props: HeaderMenuItemProps<E>
  ): JSX.Element | null;
  displayName?: string;
  propTypes?: WeakValidationMap<HeaderMenuItemProps<any>>;
}

const HeaderMenuItem = forwardRef(function HeaderMenuItem<
  E extends ElementType = 'a',
>(
  {
    className,
    isActive,
    isCurrentPage,
    'aria-current': ariaCurrent,
    children,
    role,
    tabIndex,
    ...rest
  }: Omit<HeaderMenuItemProps<E>, 'ref'>,
  ref: ForwardedRef<E>
) {
  const prefix = usePrefix();
  const resolvedTabIndex = tabIndex ?? 0;
  if (isCurrentPage) {
    isActive = isCurrentPage;
  }
  // We set the current class only if `isActive` is passed in and we do
  // not have an `aria-current="page"` set for the breadcrumb item. When this
  // class is added we also set `aria-current` as `true`
  const hasCurrentClass = isActive && ariaCurrent !== 'page';
  const linkClassName = cx({
    [`${prefix}--header__menu-item`]: true,
    [`${prefix}--header__menu-item--current`]: hasCurrentClass,
  });
  return (
    <li className={className} role={role}>
      <Link
        {...(rest as LinkProps<E>)}
        aria-current={hasCurrentClass ? true : ariaCurrent}
        className={linkClassName}
        ref={ref}
        tabIndex={resolvedTabIndex}>
        <span className={`${prefix}--text-truncate--end`}>{children}</span>
      </Link>
    </li>
  );
}) as HeaderMenuItemComponent;

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
   * If `true` and `aria-current !== 'page'`, applies selected styles to the item and sets `aria-current="true"`.
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
