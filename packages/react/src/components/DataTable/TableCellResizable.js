/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { useColumnResizing } from './tools/columnResize';

const TableCellResizable = ({ children, colKey, isResizable, ...rest }) => {
  const { colWidth } = useColumnResizing(colKey);

  if (isResizable && colWidth && colKey) {
    return (
      <td style={{ width: colWidth + 'px' }} {...rest}>
        {children}
      </td>
    );
  }

  return <td {...rest}>{children}</td>;
};

TableCellResizable.propTypes = {
  /**
   * Pass in children that will be embedded in the table header label
   */
  children: PropTypes.node,

  /**
   * key for the column as defined in the header data
   */
  colKey: PropTypes.string,

  /**
   * `false` If true, will apply resizable styles
   */
  isResizable: PropTypes.bool,
};

TableCellResizable.displayName = 'TableCellResizable';

export default TableCellResizable;
