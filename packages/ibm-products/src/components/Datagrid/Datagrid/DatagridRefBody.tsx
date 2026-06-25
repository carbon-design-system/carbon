/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import { pkg } from '../../../settings';
import { DataGridState } from '../types';

const blockClass = `${pkg.prefix}--datagrid`;

// TableBody from carbon is a functional component
// hence no way to pass the ref to html element without changes in carbon side
// define html directly here.
// ref should be passed in thru getTableBodyProps
const DatagridRefBody = (datagridState: DataGridState) => {
  const { getTableBodyProps, rows, prepareRow } = datagridState;
  return (
    <tbody
      {...getTableBodyProps({ role: undefined })}
      className={cx(
        `${blockClass}__simple-body`,
        getTableBodyProps().className
      )}
    >
      {rows?.map((row) => {
        prepareRow(row);
        const { key } = row.getRowProps();
        return row?.RowRenderer?.({ ...datagridState, row, key });
      })}
    </tbody>
  );
};

export default DatagridRefBody;
