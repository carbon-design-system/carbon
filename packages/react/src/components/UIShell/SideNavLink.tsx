/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes, { WeakValidationMap } from 'prop-types';
import React, {
  ComponentType,
  ElementType,
  ForwardedRef,
  JSX,
  ReactNode,
  forwardRef,
  useContext,
} from 'react';
import Link, { LinkProps, LinkPropTypes } from './Link';
import SideNavIcon from './SideNavIcon';
import SideNavItem from './SideNavItem';
import SideNavLinkText from './SideNavLinkText';
import { usePrefix } from '../../internal/usePrefix';
import { SideNavContext } from './SideNav';

export type SideNavLinkProps<E extends ElementType> = LinkProps<E> & {
  /**
   * Required props for the accessibility label
   */
  'aria-label'?: string;
  /**
   * Required props for the accessibility label
   */
  'aria-labelledby'?: string;
  /**
   * Specify the text content for the link
   */
  children: ReactNode;

  /**
   * Provide an optional class to be applied to the containing node
   */
  className?: string;

  /**
   * Specify whether the link is the current page
   */
  isActive?: boolean;

  /**
   * Property to indicate if the side nav container is open (or not). Use to
   * keep local state and styling in step with the SideNav expansion state.
   */
  isSideNavExpanded?: boolean;

  /**
   * Specify if this is a large variation of the SideNavLink
   */
  large?: boolean;

  /**
   * A component used to render an icon.
   */
  renderIcon?: ComponentType;

  /**
   * Optional prop to specify the tabIndex of the button. If undefined, it will be applied default validation
   */
  tabIndex?: number;
};

export interface SideNavLinkComponent {
  <E extends ElementType = 'a'>(props: SideNavLinkProps<E>): JSX.Element | null;
  displayName?: string;
  propTypes?: WeakValidationMap<SideNavLinkProps<any>>;
}

// First define a non-generic base component to work with forwardRef
type SideNavLinkPropsWithoutRef = Omit<SideNavLinkProps<'a'>, 'ref'>;

const SideNavLinkBase = (
  {
    children,
    className: customClassName,
    renderIcon: IconElement,
    isActive,
    isSideNavExpanded,
    large = false,
    tabIndex,
    ...rest
  }: SideNavLinkPropsWithoutRef,
  ref: ForwardedRef<HTMLAnchorElement>
) => {
  const isRail = useContext(SideNavContext);

  const prefix = usePrefix();
  const className = cx({
    [`${prefix}--side-nav__link`]: true,
    [`${prefix}--side-nav__link--current`]: isActive,
    [customClassName as string]: !!customClassName,
  });

  return (
    <SideNavItem large={large}>
      <Link
        {...(rest as LinkProps<'a'>)}
        className={className}
        ref={ref}
        tabIndex={
          tabIndex === undefined
            ? !isSideNavExpanded && !isRail
              ? -1
              : 0
            : tabIndex
        }>
        {IconElement && (
          <SideNavIcon small>
            <IconElement />
          </SideNavIcon>
        )}
        <SideNavLinkText>{children}</SideNavLinkText>
      </Link>
    </SideNavItem>
  );
};

// Use forwardRef with the non-generic function and cast to the generic component type
const SideNavLink = forwardRef(
  SideNavLinkBase
) as unknown as SideNavLinkComponent;

SideNavLink.displayName = 'SideNavLink';
SideNavLink.propTypes = {
  ...LinkPropTypes,

  /**
   * Specify the text content for the link
   */
  children: PropTypes.node.isRequired,

  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Specify whether the link is the current page
   */
  isActive: PropTypes.bool,

  /**
   * Property to indicate if the side nav container is open (or not). Use to
   * keep local state and styling in step with the SideNav expansion state.
   */
  isSideNavExpanded: PropTypes.bool,

  /**
   * Specify if this is a large variation of the SideNavLink
   */
  large: PropTypes.bool,

  /**
   * A component used to render an icon.
   */
  // @ts-expect-error - PropTypes are unable to cover this case.
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Optional prop to specify the tabIndex of the button. If undefined, it will be applied default validation
   */
  tabIndex: PropTypes.number,
};

// eslint-disable-next-line react/display-name
export const createCustomSideNavLink = (element) => (props) => {
  return <SideNavLink element={element} {...props} />;
};

export default SideNavLink;
