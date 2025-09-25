/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Settings } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';
import OverflowMenu, { OverflowMenuProps } from '../OverflowMenu';

const defaultIconDescription = 'Settings';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- https://github.com/carbon-design-system/carbon/issues/20071
export interface TableToolbarMenuProps extends OverflowMenuProps {}

const TableToolbarMenu: React.FC<TableToolbarMenuProps> = ({
  className,
  renderIcon = Settings,
  iconDescription = defaultIconDescription,
  children,
  menuOptionsClass,
  ...rest
}) => {
  const prefix = usePrefix();
  const toolbarActionClasses = cx(
    className,
    `${prefix}--toolbar-action ${prefix}--overflow-menu`
  );
  const menuOptionsClasses = cx(
    menuOptionsClass,
    `${prefix}--toolbar-action__menu`
  );
  return (
    <OverflowMenu
      renderIcon={renderIcon}
      className={toolbarActionClasses}
      title={iconDescription}
      iconDescription={iconDescription}
      menuOptionsClass={menuOptionsClasses}
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
   * Provide an optional class name for the toolbar menu
   */
  menuOptionsClass: PropTypes.string,

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default TableToolbarMenu;
