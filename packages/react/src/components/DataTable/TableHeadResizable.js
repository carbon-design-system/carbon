/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { useResizableColumnsTableHead } from './tools/columnResize';

const TableHeadResizable = ({ children, isResizable, ...rest }) => {
  const { ref } = useResizableColumnsTableHead();

  if (isResizable) {
    return (
      <thead ref={ref} {...rest}>
        {children}
      </thead>
    );
  }

  return <thead {...rest}>{children}</thead>;
};

TableHeadResizable.propTypes = {
  /**
   * Pass in children that will be embedded in the table header label
   */
  children: PropTypes.node,

  /**
   * `false` If true, will apply resizable styles
   */
  isResizable: PropTypes.bool,
};

TableHeadResizable.displayName = 'TableHeadResizable';

export default TableHeadResizable;
