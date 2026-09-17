/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { useFeatureFlag } from '../FeatureFlags';
import { MenuItem, type MenuItemProps } from '../Menu';
import OverflowMenuItem from '../OverflowMenuItem';

export interface TableToolbarActionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * Pass in the children that will be rendered inside the TableToolbarAction
   */
  children?: React.ReactNode;

  /**
   * onClick handler for the TableToolbarAction
   */
  onClick: (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.MouseEvent<HTMLLIElement>
      | React.KeyboardEvent<HTMLLIElement>
  ) => void;
}

const frFn = forwardRef<HTMLDivElement, TableToolbarActionProps>;

const TableToolbarAction = frFn((props, ref) => {
  const { children, onClick, ...rest } = props;
  const enableV12OverflowMenu = useFeatureFlag('enable-v12-overflowmenu');

  if (enableV12OverflowMenu) {
    return (
      <MenuItem
        ref={ref as React.Ref<HTMLLIElement>}
        label={String(children)}
        onClick={onClick as MenuItemProps['onClick']}
        {...(rest as Omit<MenuItemProps, 'label'>)}
      />
    );
  }

  return (
    <OverflowMenuItem
      ref={ref}
      itemText={children}
      onClick={onClick as React.MouseEventHandler<HTMLDivElement>}
      {...rest}
    />
  );
});

TableToolbarAction.displayName = 'TableToolbarAction';
TableToolbarAction.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default TableToolbarAction;
