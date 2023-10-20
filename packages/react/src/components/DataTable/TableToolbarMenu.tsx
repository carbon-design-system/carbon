/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Settings } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';
import OverflowMenu from '../OverflowMenu';

const defaultIconDescription = 'Settings';

export interface TableToolbarMenuProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;

  /**
   * Provide an optional class name for the toolbar menu
   */
  className?: string;

  /**
   * The description of the menu icon.
   */
  iconDescription?: string;

  /**
   * Optional prop to allow overriding the default menu icon
   */
  renderIcon?: React.ReactNode;
}

const TableToolbarMenu: React.FC<TableToolbarMenuProps> = ({
  className,
  renderIcon = Settings,
  iconDescription = defaultIconDescription,
  children,
  ...rest
}) => {
  const prefix = usePrefix();
  const toolbarActionClasses = cx(
    className,
    `${prefix}--toolbar-action ${prefix}--overflow-menu`
  );
  return (
    <OverflowMenu
      aria-label={iconDescription}
      renderIcon={renderIcon}
      className={toolbarActionClasses}
      title={iconDescription}
      iconDescription={iconDescription}
      flipped
      {...rest}>
      {children}
    </OverflowMenu>
  );
};

TableToolbarMenu.propTypes = {
  children: PropTypes.node.isRequired,

  /**
   * Provide an optional class name for the toolbar menu
   */
  className: PropTypes.string,

  /**
   * The description of the menu icon.
   */
  iconDescription: PropTypes.string,

  /**
   * Optional prop to allow overriding the default menu icon
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default TableToolbarMenu;
