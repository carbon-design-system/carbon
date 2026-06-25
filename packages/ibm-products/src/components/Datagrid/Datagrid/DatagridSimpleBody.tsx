/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { TableBody } from '@carbon/react';
import cx from 'classnames';
import { pkg } from '../../../settings';
import { DataGridState } from '../types';

const blockClass = `${pkg.prefix}--datagrid`;

const DatagridSimpleBody = (datagridState: DataGridState) => {
  const { getTableBodyProps, rows, prepareRow } = datagridState;
  return (
    <TableBody
      {...getTableBodyProps({ role: undefined })}
      aria-live={undefined}
      className={cx(
        `${blockClass}__simple-body`,
        getTableBodyProps().className
      )}
    >
      {rows.map((row) => {
        prepareRow(row);
        const { key } = row.getRowProps();
        return row?.RowRenderer?.({ ...datagridState, row, key });
      })}
    </TableBody>
  );
};

export default DatagridSimpleBody;
