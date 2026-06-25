/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';
import { makeData } from './utils/makeData';
import { action } from 'storybook/actions';
import { Activity, Add } from '@carbon/react/icons';
import { TableBatchAction, TableBatchActions, Tooltip } from '@carbon/react';
import { Edit, TrashCan } from '@carbon/react/icons';
import {
  Datagrid,
  useDatagrid,
  useInfiniteScroll,
  useSelectRows,
  useSortableColumns,
  useDisableSelectRows,
  useSelectAllWithToggle,
  useStickyColumn,
  useActionsColumn,
  getAutoSizedColumnWidth,
  useColumnRightAlign,
  useColumnCenterAlign,
} from '.';

// import mdx from './Datagrid.mdx';

import styles from './_storybook-styles.scss?inline';
import { DatagridActions } from './utils/DatagridActions';
import { DatagridPagination } from './utils/DatagridPagination';
import { Wrapper } from './utils/Wrapper';
import DocsPage from './Datagrid.docs-page';
import { getBatchActions } from './utils/getBatchActions';
import { StatusIcon } from '../StatusIcon';
import { Annotation } from '../../../.storybook/Annotation';

export default {
  title: 'Deprecated/Datagrid',
  component: Datagrid,
  tags: ['autodocs'],
  parameters: {
    styles,
    chromatic: { disableSnapshot: true },
    docs: {
      page: DocsPage,
    },
    layout: 'fullscreen',
  },
  argTypes: {
    featureFlags: {
      table: {
        disable: true,
      },
    },
  },
  excludeStories: ['getBatchActions'],
  decorators: [
    (story) => (
      <div>
        <Annotation
          type="deprecation-notice"
          text={
            <div>
              This component is deprecated and will be moving to an
              example-based approach. For more information, please refer to the{' '}
              <a href="https://github.com/carbon-design-system/tanstack-carbon">
                migration documentation
              </a>
              .
            </div>
          }
        >
          {story()}
        </Annotation>
      </div>
    ),
  ],
};

const getColumns = (rows) => {
  return [
    {
      Header: 'Row Index',
      accessor: (row, i) => i,
      sticky: 'left',
      id: 'rowIndex', // id is required when accessor is a function.
      width: getAutoSizedColumnWidth(rows, 'rowIndex', 'Row Index'),
      className: 'test-column',
    },
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
      width: getAutoSizedColumnWidth(rows, 'lastName', 'Last name'),
    },
    {
      Header: 'Age',
      accessor: 'age',
      width: getAutoSizedColumnWidth(rows, 'age', 'Age'),
    },
    {
      Header: 'Visits',
      accessor: 'visits',
      width: getAutoSizedColumnWidth(rows, 'visits', 'Visits'),
    },
    {
      Header: 'Status',
      accessor: 'status',
      width: getAutoSizedColumnWidth(rows, 'status', 'Status'),
    },
    {
      Header: 'Joined',
      accessor: 'joined',
      Cell: ({ cell: { value } }) => <span>{value.toLocaleDateString()}</span>,
    },
    {
      Header: 'Someone 1',
      accessor: 'someone1',
    },
    {
      Header: 'Someone 2',
      accessor: 'someone2',
    },
    {
      Header: 'Someone 3',
      accessor: 'someone3',
    },
    {
      Header: 'Someone 4',
      accessor: 'someone4',
    },
    {
      Header: 'Someone 5',
      accessor: 'someone5',
    },
    {
      Header: 'Someone 6',
      accessor: 'someone6',
    },
    {
      Header: 'Someone 7',
      accessor: 'someone7',
    },
  ];
};

export const BasicUsage = () => {
  const [data] = useState(makeData(10));
  const columns = React.useMemo(
    () => [
      ...getColumns(data),
      {
        Header: 'Someone 11',
        accessor: 'someone11',
        multiLineWrap: true, //If `multiLineWrap` is required only for specific columns
      },
    ],
    []
  );
  const rows = React.useMemo(() => data, [data]);

  const datagridState = useDatagrid({
    columns,
    data: rows,
    onColResizeEnd: (currentColumn, allColumns) =>
      console.log(currentColumn, allColumns),
  });

  return <Datagrid datagridState={datagridState} />;
};

export const EmptyState = () => {
  const [data] = useState(makeData(0));
  const columns = React.useMemo(() => getColumns(data), []);
  const emptyStateTitle = 'Empty state title';
  const emptyStateDescription = 'Description explaining why the table is empty';
  const emptyStateSize = 'lg';
  const illustrationTheme = 'light';
  const emptyStateAction = {
    text: 'Create new',
    onClick: action('Clicked empty state action button'),
    renderIcon: Add,
    iconDescription: 'Add icon',
  };
  const emptyStateLink = {
    text: 'View documentation',
    href: 'https://www.carbondesignsystem.com',
  };

  const datagridState = useDatagrid({
    columns,
    data,
    illustrationTheme,
    DatagridActions,
    DatagridBatchActions,
    DatagridPagination,
    emptyStateDescription,
    emptyStateTitle,
    emptyStateSize,
    emptyStateAction,
    emptyStateLink,
  });

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const InitialLoad = () => {
  const [data, setData] = useState(makeData(0));
  const columns = React.useMemo(() => getColumns(data), []);

  const [isFetching, setIsFetching] = useState(false);
  const fetchData = () =>
    new Promise((resolve) => {
      setIsFetching(true);
      setTimeout(() => {
        setData(data.concat(makeData(30, 5, 2)));
        resolve();
      }, 1000);
    }).then(() => setIsFetching(false));

  useEffect(() => {
    fetchData();
  }, []);

  const emptyStateTitle = 'Empty state title';
  const emptyStateDescription = 'Description explaining why the table is empty';
  const datagridState = useDatagrid({
    columns,
    data,
    isFetching,
    emptyStateTitle,
    emptyStateDescription,
  });

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const InfiniteScroll = () => {
  const [data, setData] = useState(makeData(0));
  const columns = React.useMemo(() => getColumns(data), []);

  const [isFetching, setIsFetching] = useState(false);
  const fetchData = () =>
    new Promise((resolve) => {
      setIsFetching(true);
      setTimeout(() => {
        setData(data.concat(makeData(30, 5, 2)));
        setIsFetching(false);
        resolve();
      }, 1000);
    });
  useEffect(() => {
    fetchData();
  }, []);

  const datagridState = useDatagrid(
    {
      columns,
      data,
      isFetching,
      fetchMoreData: fetchData,
      virtualHeight: 540,
      emptyStateTitle: 'Empty state title',
      emptyStateDescription: 'Description explaining why the table is empty',
    },
    useInfiniteScroll
  );

  return (
    <Wrapper>
      <Datagrid datagridState={{ ...datagridState }} />
    </Wrapper>
  );
};

export const InfiniteScrollWithSelection = () => {
  const [data, setData] = useState(makeData(0));
  const columns = React.useMemo(() => getColumns(data), []);

  const [isFetching, setIsFetching] = useState(false);
  const fetchData = () =>
    new Promise((resolve) => {
      setIsFetching(true);
      setTimeout(() => {
        setData(data.concat(makeData(30, 5, 2)));
        setIsFetching(false);
        resolve();
      }, 1000);
    });
  useEffect(() => {
    fetchData();
  }, []);

  const datagridState = useDatagrid(
    {
      columns,
      data,
      isFetching,
      fetchMoreData: fetchData,
      virtualHeight: 540,
      emptyStateTitle: 'Empty state title',
      emptyStateDescription: 'Description explaining why the table is empty',
    },
    useInfiniteScroll,
    useSelectRows
  );

  return (
    <Wrapper>
      <Datagrid datagridState={{ ...datagridState }} />
    </Wrapper>
  );
};

export const WithVirtualizedData = () => {
  const [data] = useState(makeData(10000));
  const columns = React.useMemo(() => getColumns(data), []);
  const datagridState = useDatagrid(
    {
      columns,
      data,
      onVirtualScroll: (e) => console.log(e),
    },
    useInfiniteScroll
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const Pagination = () => {
  const [data] = useState(makeData(100));
  const columns = React.useMemo(() => getColumns(data), []);
  const datagridState = useDatagrid({
    columns,
    data,
    initialState: {
      pageSize: 25,
      pageSizes: [5, 10, 25, 50],
    },
    DatagridPagination,
  });

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const SelectableRow = () => {
  const [data] = useState(makeData(10));
  const columns = React.useMemo(() => getColumns(data), []);
  const emptyStateTitle = 'Empty state title';
  const emptyStateDescription = 'Description explaining why the table is empty';
  const datagridState = useDatagrid(
    {
      columns,
      data,
      DatagridActions,
      batchActions: true,
      toolbarBatchActions: getBatchActions(),
      emptyStateTitle,
      emptyStateDescription,
      onRowSelect: (row, event) => console.log(row, event),
      endPlugins: [useDisableSelectRows],
      shouldDisableSelectRow: (row) => row.id === '0',
    },
    useSelectRows,
    useStickyColumn
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const Header = () => {
  const [data] = useState(makeData(10));
  const columns = React.useMemo(() => getColumns(data), []);
  const emptyStateTitle = 'Empty state title';
  const emptyStateDescription = 'Description explaining why the table is empty';
  const datagridState = useDatagrid({
    columns,
    data,
    DatagridActions,
    emptyStateTitle,
    emptyStateDescription,
    gridTitle: 'Data table title',
    gridDescription: 'Additional information if needed',
  });

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const ColumnAlignment = () => {
  const [data] = useState(makeData(10));
  const rows = React.useMemo(() => data, [data]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        width: getAutoSizedColumnWidth(rows, 'lastName', 'Last name'),
      },
      {
        Header: 'Age',
        accessor: 'age',
        width: getAutoSizedColumnWidth(rows, 'age', 'Age'),
        rightAlignedColumn: true,
      },
      {
        Header: 'Visits',
        accessor: 'visits',
        width: getAutoSizedColumnWidth(rows, 'visits', 'Visits'),
        rightAlignedColumn: true,
      },
      {
        Header: 'Status',
        accessor: 'status',
        width: getAutoSizedColumnWidth(rows, 'status', 'Status'),
      },
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
    ],
    []
  );

  const datagridState = useDatagrid(
    {
      columns,
      data: rows,
      enableSpacerColumn: true,
    },
    useColumnRightAlign,
    useColumnCenterAlign
  );

  return <Datagrid datagridState={datagridState} />;
};

export const RadioSelect = () => {
  const [data] = useState(makeData(10));
  const columns = React.useMemo(() => getColumns(data), []);
  const datagridState = useDatagrid(
    {
      columns,
      data,
      hideSelectAll: true,
      radio: true,
      onRadioSelect: (row) => console.log(`Row clicked: ${row.id}`),
      initialState: {
        selectedRowIds: {
          3: true,
        },
      },
    },
    useSelectRows,
    useStickyColumn
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const HideSelectAll = () => {
  const [data] = useState(makeData(10));
  const columns = React.useMemo(() => getColumns(data), []);
  const datagridState = useDatagrid(
    {
      columns,
      data,
      hideSelectAll: true,
    },
    useSelectRows
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const SortableColumns = () => {
  const [data] = useState(makeData(10));
  const columns = React.useMemo(() => getColumns(data), []);
  const datagridState = useDatagrid(
    {
      columns,
      data,
      ascendingSortableLabelText: 'ascending',
      descendingSortableLabelText: 'descending',
      defaultSortableLabelText: 'none',
      initialState: {
        sortableColumn: {
          id: 'firstName',
          order: 'ASC',
        },
      },
    },
    useSortableColumns
  );

  return <Datagrid datagridState={datagridState} />;
};

export const ActionsDropdown = () => {
  const [data] = useState(makeData(10));
  const columns = React.useMemo(() => getColumns(data), []);
  const datagridState = useDatagrid(
    {
      columns,
      data,
      DatagridActions,
      DatagridBatchActions,
      rowSizeProps: {
        labels: {
          rowSizeLabels: {
            xl: 'Extra large',
            lg: 'Large (default)',
            md: 'Medium',
            sm: 'Small',
            xs: 'Extra small',
          },
          legendText: 'Row settings',
        },
      },
    },
    useSelectRows
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

const DatagridBatchActions = (datagridState) => {
  const { selectedFlatRows, toggleAllRowsSelected } = datagridState;
  const totalSelected = selectedFlatRows && selectedFlatRows.length;
  const onBatchAction = () => alert('Batch action');
  const actionName = 'Action';

  return (
    <TableBatchActions
      shouldShowBatchActions={totalSelected > 0}
      totalSelected={totalSelected}
      onCancel={() => toggleAllRowsSelected(false)}
    >
      <TableBatchAction
        renderIcon={(props) => <Activity size={16} {...props} />}
        onClick={onBatchAction}
      >
        {actionName}
      </TableBatchAction>
    </TableBatchActions>
  );
};

export const BatchActions = () => {
  const [data] = useState(makeData(10));

  const columns = React.useMemo(
    () => [
      ...getColumns(data),
      {
        Header: '',
        accessor: 'actions',
        sticky: 'right',
        isAction: true,
      },
    ],
    []
  );

  const getRowActions = () => {
    return [
      {
        id: 'edit',
        itemText: 'Edit',
        icon: Edit,
        onClick: action('Clicked row action: edit'),
      },

      {
        id: 'delete',
        itemText: 'Delete',
        icon: TrashCan,
        onClick: action('Clicked row action: delete'),
      },
    ];
  };

  const datagridState = useDatagrid(
    {
      columns,
      data,
      batchActions: true,
      toolbarBatchActions: getBatchActions(),
      DatagridActions,
      DatagridBatchActions,
      toolbarBatchActionsDisplayMin: 3,
      rowActions: getRowActions(),
      onRowSelect: (row, event) => console.log('onRowClick: ', row, event),
      onAllRowSelect: (rows, event) =>
        console.log('onAllRowsClick called', rows, event),
      batchActionMenuButtonLabel: 'More',
    },
    useSelectRows,
    useActionsColumn,
    useStickyColumn
  );

  return (
    <Datagrid
      datagridState={{ ...datagridState }}
      ariaToolbarLabel="batch actions toolbar"
    />
  );
};

export const DisableSelectRow = () => {
  const [data] = useState(makeData(10));
  const columns = React.useMemo(() => getColumns(data), []);
  const datagridState = useDatagrid(
    {
      columns,
      data,
      DatagridActions,
      DatagridBatchActions,
      endPlugins: [useDisableSelectRows],
      shouldDisableSelectRow: (row) => row.id % 2 === 0,
      disableSelectAll: true,
    },
    useSelectRows
  );

  return <Datagrid datagridState={{ ...datagridState }} />;
};

export const FrozenColumns = () => {
  const [data] = useState(makeData(10));

  const columns = React.useMemo(
    () => [
      ...getColumns(data),
      {
        Header: '',
        accessor: 'actions',
        sticky: 'right',
        isAction: true,
      },
    ],
    []
  );
  const [msg, setMsg] = useState('');
  const onActionClick = (actionId, row) => {
    const { original } = row;
    setMsg(
      `Clicked [${actionId}] on row: <${original.firstName} ${original.lastName}>`
    );
  };

  const datagridState = useDatagrid(
    {
      columns,
      data,
      batchActions: true,
      toolbarBatchActions: getBatchActions(),
      DatagridActions,
      DatagridBatchActions,
      rowActions: [
        {
          id: 'edit',
          itemText: 'Edit',
          onClick: onActionClick,
        },
        {
          id: 'vote',
          itemText: 'Vote',
          onClick: onActionClick,
          shouldHideMenuItem: (row) => row.original.age <= 18,
        },
        {
          id: 'retire',
          itemText: 'Retire',
          onClick: onActionClick,
          disabled: false,
          shouldDisableMenuItem: (row) => row.original.age <= 60,
        },
        {
          id: 'delete',
          itemText: 'Delete',
          hasDivider: true,
          isDelete: true,
          onClick: onActionClick,
        },
      ],
    },
    useStickyColumn,
    useActionsColumn,
    useSelectRows,
    useSelectAllWithToggle
  );
  return (
    <Wrapper>
      <Datagrid datagridState={{ ...datagridState }} />
      <p>{msg}</p>
      <p>More details documentation check the Notes section below</p>
    </Wrapper>
  );
};

export const Skeleton = () => {
  const [data] = useState([]);
  const columns = React.useMemo(() => [...getColumns(data)], []);
  const emptyStateTitle = 'Empty state title';
  const emptyStateDescription = 'Description explaining why the table is empty';

  const datagridState = useDatagrid({
    columns,
    data,
    isFetching: true,
    emptyStateDescription,
    emptyStateTitle,
  });

  return <Datagrid datagridState={datagridState} />;
};

export const SpacerColumn = () => {
  const [data] = useState(makeData(10));
  const rows = React.useMemo(() => data, [data]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
        rightAlignedColumn: true,
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        width: getAutoSizedColumnWidth(rows, 'lastName', 'Last name'),
        rightAlignedColumn: true,
      },
      {
        Header: 'Someone 11',
        accessor: 'someone11',
        multiLineWrap: true, //If `multiLineWrap` is required only for specific columns
        rightAlignedColumn: true,
      },
    ],
    []
  );

  const datagridState = useDatagrid(
    {
      columns,
      data: rows,
      enableSpacerColumn: true,
    },
    useColumnRightAlign
  );

  return <Datagrid datagridState={datagridState} />;
};
