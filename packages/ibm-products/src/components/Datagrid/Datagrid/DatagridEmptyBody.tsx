/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { pkg } from '../../../settings';
import { TableBody, TableRow, TableCell } from '@carbon/react';
import {
  NoDataEmptyState,
  ErrorEmptyState,
  NotFoundEmptyState,
  EmptyState,
} from '../../EmptyStates';
import { DataGridState } from '../types';

const blockClass = `${pkg.prefix}--datagrid`;

const DatagridEmptyBody = (datagridState: DataGridState) => {
  const {
    getTableBodyProps,
    headers,
    emptyStateTitle,
    emptyStateDescription,
    emptyStateSize,
    emptyStateType = 'noData',
    illustrationTheme,
    emptyStateAction,
    emptyStateLink,
  } = datagridState;

  const emptyStateProps = {
    illustrationTheme,
    size: emptyStateSize,
    title: emptyStateTitle,
    subtitle: emptyStateDescription,
    action: emptyStateAction,
    link: emptyStateLink,
  };

  const validEmptyStates = ['error', 'noData', 'notFound'];

  return (
    <TableBody
      {...getTableBodyProps({ role: undefined })}
      aria-live="off"
      className={`${blockClass}__empty-state-body`}
    >
      <TableRow>
        <TableCell
          colSpan={headers?.length}
          className={`${blockClass}__empty-state-cell`}
        >
          {validEmptyStates.includes(emptyStateType) ? (
            <>
              {emptyStateType === 'error' && (
                <ErrorEmptyState {...emptyStateProps} />
              )}
              {emptyStateType === 'noData' && (
                <NoDataEmptyState {...emptyStateProps} />
              )}
              {emptyStateType === 'notFound' && (
                <NotFoundEmptyState {...emptyStateProps} />
              )}
            </>
          ) : (
            <EmptyState {...(emptyStateProps as any)} />
          )}
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default DatagridEmptyBody;
