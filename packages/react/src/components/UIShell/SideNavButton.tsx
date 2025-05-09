/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  useContext,
  type ComponentProps,
  type ForwardedRef,
} from 'react';
import Button from '../Button';
import SideNavItem from './SideNavItem';
import cx from 'classnames';
import { SideNavContext } from './SideNav';

export type SideNavButtonProps = ComponentProps<typeof Button> & {
  /**
   * Specify the children to be rendered inside of the `SideNavMenuItem`
   */
  children?: React.ReactNode;

  /**
   * Provide an optional class to be applied to the containing node
   */
  className?: string;

  /**
   * Property to indicate if the side nav container is open (or not). Use to
   * keep local state and styling in step with the SideNav expansion state.
   */
  isSideNavExpanded?: boolean;

  /**
   * Optional prop to specify the tabIndex of the button. If undefined, it will be applied default validation
   */
  tabIndex?: number;
};

const SideNavButton = React.forwardRef<HTMLButtonElement, SideNavButtonProps>(
  (props, ref) => {
    const isRail = useContext(SideNavContext);
    const {
      children,
      className: customClassName,
      isSideNavExpanded,
      onClick,
      tabIndex,
      ...rest
    } = props;
    const className = cx({
      [customClassName as string]: !!customClassName,
    });
    return (
      <SideNavItem>
        <Button className={className} {...rest} onClick={onClick} ref={ref}>
          {children}
          tabIndex=
          {typeof tabIndex === 'undefined'
            ? !isSideNavExpanded && !isRail
              ? -1
              : 0
            : tabIndex}
        </Button>
      </SideNavItem>
    );
  }
);

SideNavButton.displayName = 'SideNavButton';
SideNavButton.propTypes = {
  /**
   * Specify the children to be rendered inside of the `SideNavMenuItem`
   */
  children: PropTypes.node,

  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Provide an optional function to be called when the button element
   * is clicked
   */
  onClick: PropTypes.func,

  /**
   * Property to indicate if the side nav container is open (or not). Use to
   * keep local state and styling in step with the SideNav expansion state.
   */
  isSideNavExpanded: PropTypes.bool,

  /**
   * Optional prop to specify the tabIndex of the button. If undefined, it will be applied default validation
   */
  tabIndex: PropTypes.number,
};

export default SideNavButton;
