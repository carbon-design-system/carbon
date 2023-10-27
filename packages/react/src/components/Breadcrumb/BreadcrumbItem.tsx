/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { AriaAttributes, PropsWithChildren } from 'react';
import cx from 'classnames';
import Link from '../Link';
import { OverflowMenuHorizontal } from '@carbon/icons-react';
import { usePrefix } from '../../internal/usePrefix';
import { ForwardRefReturn } from '../../types/common';
import { Text } from '../Text';

export interface BreadcrumbItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  'aria-current'?: AriaAttributes['aria-current'];

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  /**
   * Optional string representing the link location for the BreadcrumbItem
   */
  href?: string;

  /**
   * Provide if this breadcrumb item represents the current page
   */
  isCurrentPage?: boolean;
}

const BreadcrumbItem: ForwardRefReturn<HTMLLIElement, BreadcrumbItemProps> =
  React.forwardRef(function BreadcrumbItem(
    {
      'aria-current': ariaCurrent,
      children,
      className: customClassName = '',
      href,
      isCurrentPage,
      ...rest
    }: PropsWithChildren<BreadcrumbItemProps>,
    ref: React.Ref<HTMLLIElement>
  ) {
    const prefix = usePrefix();
    const className = cx({
      [`${prefix}--breadcrumb-item`]: true,
      // We set the current class only if `isCurrentPage` is passed in and we do
      // not have an `aria-current="page"` set for the breadcrumb item
      [`${prefix}--breadcrumb-item--current`]:
        isCurrentPage && ariaCurrent !== 'page',
      [customClassName]: !!customClassName,
    });

    const child = children as React.FunctionComponentElement<any>;
    if (
      child.type &&
      child.type.displayName !== undefined &&
      child.type.displayName.includes('OverflowMenu')
    ) {
      const horizontalOverflowIcon = (
        <OverflowMenuHorizontal className={`${prefix}--overflow-menu__icon`} />
      );
      return (
        <li className={className} {...rest}>
          {React.cloneElement(child, {
            menuOptionsClass: `${prefix}--breadcrumb-menu-options`,
            menuOffset: { top: 10, left: 59 },
            renderIcon: () => horizontalOverflowIcon,
          })}
        </li>
      );
    }

    if (typeof children === 'string') {
      return (
        <li className={className} ref={ref} {...rest}>
          {href ? (
            <Link href={href} aria-current={ariaCurrent}>
              {children}
            </Link>
          ) : (
            <Text className={`${prefix}--link`}>{children}</Text>
          )}
        </li>
      );
    }

    return (
      <li className={className} ref={ref} {...rest}>
        {React.cloneElement(child, {
          'aria-current': ariaCurrent,
          className: cx(`${prefix}--link`, child.props.className),
        })}
      </li>
    );
  });

BreadcrumbItem.displayName = 'BreadcrumbItem';

BreadcrumbItem.propTypes = {
  'aria-current': PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf([
      'false',
      'true',
      'page',
      'step',
      'location',
      'date',
      'time',
    ] as const),
  ]),

  /**
   * Pass in content that will be inside of the BreadcrumbItem
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Optional string representing the link location for the BreadcrumbItem
   */
  href: PropTypes.string,

  /**
   * Provide if this breadcrumb item represents the current page
   */
  isCurrentPage: PropTypes.bool,
};

export default BreadcrumbItem;
