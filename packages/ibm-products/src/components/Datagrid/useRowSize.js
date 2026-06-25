/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState } from 'react';
import { RowSizeDropdown } from './Datagrid/addons/RowSize';

const useRowSize = (hooks) => {
  const [internalRowSize, setRowSize] = useState('');
  hooks.useInstance.push((instance) => {
    const { rowSizeProps, rowSizes, rowSize, onRowSizeChange, tableId } =
      instance;
    const { labels } = rowSizeProps || {};
    Object.assign(instance, {
      rowSize: internalRowSize || rowSize,
      rowSizeDropdownProps: {
        rowSizes,
        ...labels,
        selectedOption: internalRowSize || rowSize,
        onChange: (value) => {
          setRowSize(value);
          if (typeof onRowSizeChange === 'function') {
            onRowSizeChange(value);
          }
        },
        tableId,
      },
      RowSizeDropdown,
    });
  });
  const getTableProps = (props, { instance }) => {
    const { rowSize } = instance;
    if (!rowSize) {
      return props;
    }
    return [props, { size: rowSize }];
  };
  hooks.getTableProps.push(getTableProps);
};

export default useRowSize;
