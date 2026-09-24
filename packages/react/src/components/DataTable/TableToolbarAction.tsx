/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { forwardRef, type Ref } from 'react';
import OverflowMenuItem from '../OverflowMenuItem';
import { MenuItem, type MenuItemProps } from '../Menu';
import { useFeatureFlag } from '../FeatureFlags';

export interface TableToolbarActionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * Pass in the children that will be rendered inside the TableToolbarAction
   */
  children?: React.ReactNode;

  /**
   * onClick handler for the TableToolbarAction
   */
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const frFn = forwardRef<HTMLDivElement, TableToolbarActionProps>;

const TableToolbarAction = frFn((props, ref) => {
  const { children, ...rest } = props;
  const enableV12OverflowMenu = useFeatureFlag('enable-v12-overflowmenu');

  // The v12 `TableToolbarMenu` renders a `Menu`, which only accepts `MenuItem`
  // children. `MenuItem` takes its text through `label` and renders an `<li>`
  // instead of the `<div>` that `OverflowMenuItem` renders.
  if (enableV12OverflowMenu) {
    // `closeMenu` is injected by the v11 `OverflowMenu`. The v12 `Menu` closes
    // itself, and `MenuItem` would forward the prop on to the DOM.
    const { closeMenu, ...menuItemProps } = rest as typeof rest & {
      closeMenu?: () => void;
    };

    return (
      <MenuItem
        {...(menuItemProps as unknown as MenuItemProps)}
        ref={ref as unknown as Ref<HTMLLIElement>}
        label={children as string}
      />
    );
  }

  return <OverflowMenuItem ref={ref} itemText={children} {...rest} />;
});

TableToolbarAction.displayName = 'TableToolbarAction';
TableToolbarAction.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default TableToolbarAction;
