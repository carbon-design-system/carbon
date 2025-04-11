/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
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
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const frFn = forwardRef<HTMLDivElement, TableToolbarActionProps>;

const TableToolbarAction = frFn((props, ref) => {
  const { children, ...rest } = props;

  return <OverflowMenuItem ref={ref} itemText={children} {...rest} />;
});

TableToolbarAction.displayName = 'TableToolbarAction';
TableToolbarAction.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default TableToolbarAction;
