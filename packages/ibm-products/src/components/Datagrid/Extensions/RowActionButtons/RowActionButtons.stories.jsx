/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Add, Edit, TrashCan, Checkmark } from '@carbon/react/icons';
import { action } from 'storybook/actions';
import {
  Datagrid,
  useDatagrid,
  useStickyColumn,
  useActionsColumn,
  useDisableSelectRows,
  useSelectRows,
} from '../../index';
import styles from '../../_storybook-styles.scss?inline';
import { DocsPage } from './RowActionButtons.docs-page';
import { DatagridActions } from '../../utils/DatagridActions';
import { DatagridPagination } from '../../utils/DatagridPagination';
import { makeData } from '../../utils/makeData';
import { ARG_TYPES } from '../../utils/getArgTypes';

export default {
  title: 'Deprecated/Datagrid/RowActionButtons',
  component: Datagrid,
  tags: ['autodocs'],
  parameters: {
    chromatic: { disableSnapshot: true },
    styles,
    docs: { page: DocsPage },
    layout: 'fullscreen',
  },
  argTypes: {
    featureFlags: {
      table: {
        disable: true,
      },
    },
  },
};

const defaultHeader = [
  {
    Header: 'Row Index',
    accessor: (row, i) => i,
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
    width: 90,
  },
  {
    Header: 'Visits',
    accessor: 'visits',
    width: 100,
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
];

const sharedDatagridProps = {
  emptyStateTitle: 'Empty state title',
  emptyStateDescription: 'Description text explaining why table is empty',
  emptyStateSize: 'lg',
  gridTitle: 'Data table title',
  gridDescription: 'Additional information if needed',
  useDenseHeader: false,
  rowSize: 'lg',
  rowSizes: [
    {
      value: 'xl',
      labelText: 'Extra large',
    },
    {
      value: 'lg',
      labelText: 'Large',
    },
    {
      value: 'md',
      labelText: 'Medium',
    },
    {
      value: 'xs',
      labelText: 'Small',
    },
  ],
  onRowSizeChange: (value) => {
    console.log('row size changed to: ', value);
  },
  rowActions: [
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
      isDelete: true,
      onClick: action('Clicked row action: delete'),
      align: 'top-right',
    },
  ],
};

const RowActionButtons = ({ ...args }) => {
  const columns = React.useMemo(
    () => [
      ...defaultHeader,
      {
        Header: '',
        accessor: 'actions',
        isAction: true,
      },
    ],
    []
  );
  const [data] = useState(makeData(10));
  const rows = React.useMemo(() => data, [data]);

  const datagridState = useDatagrid(
    {
      columns,
      data: rows,
      initialState: {
        pageSize: 10,
        pageSizes: [5, 10, 25, 50],
      },
      DatagridActions,
      DatagridPagination,
      ...args.defaultGridProps,
    },
    useStickyColumn,
    useActionsColumn
  );

  return <Datagrid datagridState={datagridState} />;
};

const RowActionButtonTemplateWrapper = ({ ...args }) => {
  return <RowActionButtons defaultGridProps={{ ...args }} />;
};

const rowActionButtonsProps = {
  gridTitle: sharedDatagridProps.gridTitle,
  gridDescription: sharedDatagridProps.gridDescription,
  useDenseHeader: sharedDatagridProps.useDenseHeader,
  rowActions: sharedDatagridProps.rowActions,
};
const basicUsageStoryName = 'With row action buttons';
export const RowActionButtonsUsageStory = RowActionButtonTemplateWrapper.bind(
  {}
);
RowActionButtonsUsageStory.storyName = basicUsageStoryName;
RowActionButtonsUsageStory.argTypes = {
  gridTitle: ARG_TYPES.gridTitle,
  gridDescription: ARG_TYPES.gridDescription,
  useDenseHeader: ARG_TYPES.useDenseHeader,
  rowActions: ARG_TYPES.rowActions,
};
RowActionButtonsUsageStory.args = {
  ...rowActionButtonsProps,
};

const RowActionButtonsOverflow = ({ ...args }) => {
  const columns = React.useMemo(
    () => [
      ...defaultHeader,
      {
        Header: '',
        accessor: 'actions',
        sticky: 'right',
        isAction: true,
      },
    ],
    []
  );
  const [data] = useState(makeData(10));
  const rows = React.useMemo(() => data, [data]);

  const datagridState = useDatagrid(
    {
      columns,
      data: rows,
      initialState: {
        pageSize: 10,
        pageSizes: [5, 10, 25, 50],
      },
      DatagridActions,
      DatagridPagination,
      ...args.defaultGridProps,
    },
    useStickyColumn,
    useActionsColumn
  );

  return <Datagrid datagridState={datagridState} />;
};

const RowActionButtonOverflowTemplateWrapper = ({ ...args }) => {
  return <RowActionButtonsOverflow defaultGridProps={{ ...args }} />;
};

const manyRowActionButtonsProps = {
  gridTitle: sharedDatagridProps.gridTitle,
  gridDescription: sharedDatagridProps.gridDescription,
  useDenseHeader: sharedDatagridProps.useDenseHeader,
  rowActions: [
    {
      id: 'edit',
      itemText: 'Edit',
      icon: Edit,
      onClick: action('Clicked row action: edit'),
    },
    {
      id: 'approve',
      itemText: 'Approve',
      icon: Checkmark,
      onClick: action('Clicked row action: approve'),
    },
    {
      id: 'delete',
      itemText: 'Delete',
      icon: TrashCan,
      isDelete: true,
      hasDivider: true,
      onClick: action('Clicked row action: delete'),
    },
  ],
};

const manyRowActionButtonsStoryName = 'With many row action buttons';
export const ManyRowActionButtonsUsageStory =
  RowActionButtonOverflowTemplateWrapper.bind({});
ManyRowActionButtonsUsageStory.storyName = manyRowActionButtonsStoryName;
ManyRowActionButtonsUsageStory.argTypes = {
  gridTitle: ARG_TYPES.gridTitle,
  gridDescription: ARG_TYPES.gridDescription,
  useDenseHeader: ARG_TYPES.useDenseHeader,
  rowActions: ARG_TYPES.rowActions,
};
ManyRowActionButtonsUsageStory.args = {
  ...manyRowActionButtonsProps,
};

const RowActionButtonsBatchActions = ({ ...args }) => {
  const columns = React.useMemo(
    () => [
      ...defaultHeader,
      {
        Header: '',
        accessor: 'actions',
        sticky: 'right',
        isAction: true,
      },
    ],
    []
  );
  const [data] = useState(makeData(50));
  const rows = React.useMemo(() => data, [data]);

  const datagridState = useDatagrid(
    {
      columns,
      data: rows,
      initialState: {
        pageSize: 10,
        pageSizes: [5, 10, 25, 50],
      },
      DatagridActions,
      DatagridPagination,
      endPlugins: [useDisableSelectRows],
      shouldDisableSelectRow: (row) => row.id % 5 === 0,
      ...args.defaultGridProps,
    },
    useStickyColumn,
    useActionsColumn,
    useSelectRows
  );

  return <Datagrid datagridState={datagridState} />;
};

const getBatchActions = () => {
  return [
    {
      label: 'Duplicate',
      renderIcon: Add,
      onClick: action('Clicked batch action button'),
    },
    {
      label: 'Add',
      renderIcon: Add,
      onClick: action('Clicked batch action button'),
    },
    {
      label: 'Publish to catalog',
      renderIcon: Add,
      onClick: action('Clicked batch action button'),
    },
    {
      label: 'Download',
      renderIcon: Add,
      onClick: action('Clicked batch action button'),
    },
    {
      label: 'Delete',
      renderIcon: Add,
      onClick: action('Clicked batch action button'),
      hasDivider: true,
      kind: 'danger',
    },
  ];
};

const RowActionButtonBatchTemplateWrapper = ({ ...args }) => {
  return <RowActionButtonsBatchActions defaultGridProps={{ ...args }} />;
};

const rowActionButtonsBatchActionsProps = {
  gridTitle: sharedDatagridProps.gridTitle,
  gridDescription: sharedDatagridProps.gridDescription,
  useDenseHeader: sharedDatagridProps.useDenseHeader,
  rowActions: sharedDatagridProps.rowActions,
  toolbarBatchActions: getBatchActions(),
  batchActions: true,
};
const rowActionButtonsBatchActionsStoryName =
  'With row action buttons and batch actions';
export const RowActionButtonsBatchActionsUsageStory =
  RowActionButtonBatchTemplateWrapper.bind({});
RowActionButtonsBatchActionsUsageStory.storyName =
  rowActionButtonsBatchActionsStoryName;
RowActionButtonsBatchActionsUsageStory.argTypes = {
  gridTitle: ARG_TYPES.gridTitle,
  gridDescription: ARG_TYPES.gridDescription,
  useDenseHeader: ARG_TYPES.useDenseHeader,
  rowActions: ARG_TYPES.rowActions,
  batchActions: ARG_TYPES.batchActions,
};
RowActionButtonsBatchActionsUsageStory.args = {
  ...rowActionButtonsBatchActionsProps,
};
