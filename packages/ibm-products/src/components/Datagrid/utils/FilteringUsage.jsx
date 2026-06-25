/* eslint-disable react/prop-types */
/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Tooltip } from '@carbon/react';
import { StatusIcon } from '../../StatusIcon';
import { makeData } from './makeData';
import {
  Datagrid,
  useDatagrid,
  useFiltering,
  useColumnCenterAlign,
} from '../../Datagrid';
import { DatagridActions } from './DatagridActions';
import { getBatchActions } from './getBatchActions';

export const FilteringUsage = ({ defaultGridProps }) => {
  const {
    gridDescription,
    gridTitle,
    useDenseHeader,
    filterProps,
    emptyStateTitle,
    emptyStateDescription,
    initialState,
    data: initialData,
  } = defaultGridProps;

  const headers = [
    {
      Header: 'Row Index',
      accessor: (row, i) => i,
      sticky: 'left',
      id: 'rowIndex', // id is required when accessor is a function.
    },
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
    {
      Header: 'Age',
      accessor: 'age',
      width: 50,
    },
    {
      Header: 'Visits',
      accessor: 'visits',
      filter: 'number',
      width: 60,
    },
    {
      Header: 'Status',
      accessor: 'status',
      filter: 'multiSelect',
    },
    // Shows the date filter example
    {
      Header: 'Joined',
      accessor: 'joined',
      filter: 'date',
      Cell: ({ cell: { value } }) => <span>{value.toLocaleDateString()}</span>,
    },
    // Shows the checkbox filter example
    {
      Header: 'Password strength',
      accessor: 'passwordStrength',
      filter: 'checkbox',
      width: 160,
      centerAlignedColumn: true,
      Cell: ({ cell: { value } }) => {
        const iconProps = {
          size: 'sm',
          theme: 'light',
          kind: value,
          iconDescription: value,
        };
        return (
          <Tooltip label={iconProps.iconDescription}>
            <button type="button" className="sb--tooltip-trigger">
              <StatusIcon {...iconProps} />
            </button>
          </Tooltip>
        );
      },
    },
    // Shows the checkbox filter example
    {
      Header: 'Role',
      accessor: 'role',
      filter: 'radio',
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = React.useMemo(() => headers, []);
  const [data] = useState(initialData ?? makeData(20));

  const datagridState = useDatagrid(
    {
      columns,
      data,
      initialState,
      DatagridActions,
      batchActions: true,
      toolbarBatchActions: getBatchActions(),
      filterProps,
      gridTitle,
      gridDescription,
      useDenseHeader,
      emptyStateTitle,
      emptyStateDescription,
    },
    useFiltering,
    useColumnCenterAlign
  );

  return <Datagrid datagridState={datagridState} />;
};
