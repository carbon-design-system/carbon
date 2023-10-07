/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
// import PropTypes, { bool } from "prop-types";
import React from 'react';
import { CARBON_SIDENAV_ITEMS } from './_utils';
import { usePrefix } from '../../internal/usePrefix';

interface SideNavItemsProps {
  /**
   * Provide an optional class to be applied to the containing node
   */
  className?: string;
  /**
   * Provide a single icon as the child to `SideNavIcon` to render in the
   * container, and it is required
   */
  children: React.ReactNode;
  /**
   * Property to indicate if the side nav container is open (or not). Use to
   * keep local state and styling in step with the SideNav expansion state.
   */
  isSideNavExpanded?: boolean;
}

const SideNavItems: React.FC<SideNavItemsProps> = ({
  className: customClassName,
  children,
  isSideNavExpanded,
}): React.ReactElement => {
  const prefix = usePrefix();
  const className = cx([`${prefix}--side-nav__items`], customClassName);
  const childrenWithExpandedState = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childType = child.type as React.ComponentType<any>;

      // avoid spreading `isSideNavExpanded` to non-Carbon UI Shell children
      if (childType && childType.displayName) {
        // Check if the child's type's displayName is in CARBON_SIDENAV_ITEMS

        if (CARBON_SIDENAV_ITEMS.includes(childType.displayName)) {
          // If it's in CARBON_SIDENAV_ITEMS, pass isSideNavExpanded as a prop
          return React.cloneElement(child, {
            isSideNavExpanded,
          });
        } else {
          // If it's not in CARBON_SIDENAV_ITEMS, don't pass isSideNavExpanded
          return child;
        }
      }
    }
  });
  return <ul className={className}>{childrenWithExpandedState}</ul>;
};

SideNavItems.displayName = 'SideNavItems';

// Commenting the SideNavItem.propTypes, it is not required as typescript will
// provide type checking

// SideNavItems.propTypes = {
//   /**
//    * Provide a single icon as the child to `SideNavIcon` to render in the
//    * container
//    */
//   children: PropTypes.node.isRequired,
//
//   /**
//    * Provide an optional class to be applied to the containing node
//    */
//   className: PropTypes.string,
//
//   /**
//    * Property to indicate if the side nav container is open (or not). Use to
//    * keep local state and styling in step with the SideNav expansion state.
//    */
//   isSideNavExpanded: PropTypes.bool,
// };

export default SideNavItems;
