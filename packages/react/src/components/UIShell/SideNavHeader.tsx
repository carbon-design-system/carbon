/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import SideNavIcon from './SideNavIcon';
import { usePrefix } from '../../internal/usePrefix';

interface SideNavHeaderProps {
  /**
   * The child nodes to be rendered
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
   * Provide an icon to render in the header of the side navigation. Should be
   * a React class.
   */
  renderIcon: React.ComponentType;
}
const SideNavHeader: React.FC<SideNavHeaderProps> = ({
  children,
  className: customClassName,
  renderIcon: IconElement,
}) => {
  const prefix = usePrefix();
  const className = cx(`${prefix}--side-nav__header`, customClassName);
  return (
    <header className={className}>
      <SideNavIcon>
        <IconElement />
      </SideNavIcon>
      {children}
    </header>
  );
};
SideNavHeader.displayName = 'SideNavHeader';
SideNavHeader.propTypes = {
  /**
   * The child nodes to be rendered
   */
  children: PropTypes.node,

  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Property to indicate if the side nav container is open (or not). Use to
   * keep local state and styling in step with the SideNav expansion state.
   */
  isSideNavExpanded: PropTypes.bool,

  /**
   * Provide an icon to render in the header of the side navigation. Should be
   * a React class.
   */
  // @ts-expect-error - PropTypes are unable to cover this case.
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    .isRequired,
};

export default SideNavHeader;
