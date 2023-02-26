/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import OverflowMenuItem from '../OverflowMenuItem';

const TableToolbarAction = React.forwardRef(({ children, ...rest }, ref) => {
  return <OverflowMenuItem ref={ref} itemText={children} {...rest} />;
});

TableToolbarAction.displayName = 'TableToolbarAction';
TableToolbarAction.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default TableToolbarAction;
