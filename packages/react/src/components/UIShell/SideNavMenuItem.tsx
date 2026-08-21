/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes, { type WeakValidationMap } from 'prop-types';
import React, { forwardRef, type ElementType, type JSX, type Ref } from 'react';
import SideNavLinkText from './SideNavLinkText';
import Link, { type LinkProps } from './Link';
import { usePrefix } from '../../internal/usePrefix';

export type SideNavMenuItemProps<E extends ElementType = 'a'> = LinkProps<E> & {
  /**
   * Specify the children to be rendered inside of the `SideNavMenuItem`
   */
  children?: React.ReactNode;

  /**
   * Provide an optional class to be applied to the containing node
   */
  className?: string;

  /**
   * Optionally specify whether the link is "active". An active link is one that
   * has an href that is the same as the current page. Can also pass in
   * `aria-current="page"`, as well.
   */
  isActive?: boolean;

  /**
   * The `href` for the rendered link.
   */
  href?: string;

  /**
   * Optional component to render instead of default Link
   */
  as?: ElementType;
};

export interface SideNavMenuItemComponent {
  <E extends ElementType = 'a'>(
    props: SideNavMenuItemProps<E>
  ): JSX.Element | null;
  displayName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  propTypes?: WeakValidationMap<SideNavMenuItemProps<any>>;
}

type SideNavMenuItemPropsWithoutRef = Omit<SideNavMenuItemProps<'a'>, 'ref'>;

const frFn = forwardRef<HTMLElement, SideNavMenuItemPropsWithoutRef>;

const SideNavMenuItem = frFn((props, ref) => {
  const prefix = usePrefix();
  const {
    children,
    className: customClassName,
    as: Component = Link,
    isActive,
    ...rest
  } = props;
  const className = cx(`${prefix}--side-nav__menu-item`, customClassName);
  const linkClassName = cx({
    [`${prefix}--side-nav__link`]: true,
    [`${prefix}--side-nav__link--current`]: isActive,
  });

  const ComponentAsElementType = Component as ElementType;

  return (
    <li className={className}>
      <ComponentAsElementType
        {...rest}
        className={linkClassName}
        ref={ref as Ref<ElementType>}>
        <SideNavLinkText>{children}</SideNavLinkText>
      </ComponentAsElementType>
    </li>
  );
}) as SideNavMenuItemComponent;

SideNavMenuItem.displayName = 'SideNavMenuItem';
SideNavMenuItem.propTypes = {
  /**
   * Optional component to render instead of default Link
   */
  as: PropTypes.elementType as PropTypes.Validator<React.ElementType>,

  /**
   * Specify the children to be rendered inside of the `SideNavMenuItem`
   */
  children: PropTypes.node,

  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * The `href` for the rendered link.
   */
  href: PropTypes.string,

  /**
   * Optionally specify whether the link is "active". An active link is one that
   * has an href that is the same as the current page. Can also pass in
   * `aria-current="page"`, as well.
   */
  isActive: PropTypes.bool,
};

export default SideNavMenuItem;
