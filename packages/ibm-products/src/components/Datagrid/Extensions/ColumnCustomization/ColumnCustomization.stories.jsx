/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Checkmark, Edit, TrashCan } from '@carbon/react/icons';
import { action } from 'storybook/actions';
import {
  Datagrid,
  useDatagrid,
  useCustomizeColumns,
  useColumnOrder,
  useStickyColumn,
  useActionsColumn,
  useSortableColumns,
} from '../../index';
import styles from '../../_storybook-styles.scss?inline';
import { DocsPage } from './ColumnCustomization.docs-page';
import { DatagridActions } from '../../utils/DatagridActions';
import { DatagridPagination } from '../../utils/DatagridPagination';
import { makeData } from '../../utils/makeData';
import { ARG_TYPES } from '../../utils/getArgTypes';
import { CodeSnippet } from '@carbon/react';
import { pkg } from '../../../../settings';
import { FeatureFlags } from '../../../FeatureFlags';
import { WithFeatureFlags } from '../../../../../.storybook/WithFeatureFlags';

export default {
  title: 'Deprecated/Datagrid/ColumnCustomization',
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

const blockClass = `${pkg.prefix}--datagrid`;

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
    width: 50,
    disableGlobalFilter: true,
  },
  {
    Header: 'Visits',
    accessor: 'visits',
    width: 60,
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
  {
    Header: 'Someone 8',
    accessor: 'someone8',
  },
  {
    Header: 'Someone 9',
    accessor: 'someone9',
  },
  {
    Header: 'Someone 10',
    accessor: 'someone10',
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
    },
  ],
};

const ColumnCustomizationUsage = ({ ...args }) => {
  const [hiddenIndices, setHiddenIndices] = useState([]);
  const columns = React.useMemo(() => {
    const header = [...defaultHeader];
    header.forEach((headerItem) => {
      hiddenIndices.some((index) => {
        if (headerItem.accessor === index) {
          headerItem.disableGlobalFilter = true;
          return true;
        } else {
          headerItem.disableGlobalFilter = false;
        }
      });
    });
    return header;
  }, [hiddenIndices]);

  const [data] = useState(makeData(10));

  const datagridState = useDatagrid(
    {
      className: `c4p--datagrid__hidden--columns`,
      columns,
      data,
      initialState: {
        pageSize: 10,
        pageSizes: [5, 10, 25, 50],
        hiddenColumns: ['age'],
        columnOrder: [],
      },
      DatagridActions,
      DatagridPagination,
      ...args.defaultGridProps,
      customizeColumnsProps: {
        onSaveColumnPrefs: (newColDefs) => {
          const indices = newColDefs
            .map((col, index) => (!col.isVisible ? col.id : null))
            .filter((col) => col !== null);
          setHiddenIndices(indices);
        },
        labels: {
          findColumnPlaceholderLabel: 'Find column',
          resetToDefaultLabel: 'Reset to default',
          customizeTearsheetHeadingLabel: 'Customize columns',
          primaryButtonTextLabel: 'Save',
          secondaryButtonTextLabel: 'Cancel',
          instructionsLabel:
            'Deselect columns to hide them. Drag rows to change column order. These specifications will be saved if you leave and return to the data table.',
          iconTooltipLabel: 'Customize columns',
          assistiveTextInstructionsLabel:
            'Press space bar to toggle drag drop mode, use arrow keys to move selected elements.',
          assistiveTextDisabledInstructionsLabel:
            'Reordering columns are disabled because they are filtered currently.',
          selectAllLabel: 'Column name',
        },
      },
    },
    useCustomizeColumns,
    useColumnOrder
  );

  return (
    <WithFeatureFlags
      flags={{
        'enable-datagrid-useCustomizeColumns': true,
      }}
    >
      <Datagrid datagridState={datagridState} />
      <div className={`${blockClass}-story__hidden-column-id-snippet`}>
        <p>Hidden column ids:</p>
        <CodeSnippet type="multi">
          {JSON.stringify(datagridState.state.hiddenColumns, null, 2)}
        </CodeSnippet>
      </div>
    </WithFeatureFlags>
  );
};

const ColumnCustomizationWrapper = ({ ...args }) => {
  return <ColumnCustomizationUsage defaultGridProps={{ ...args }} />;
};

const columnCustomizationControlProps = {
  gridTitle: sharedDatagridProps.gridTitle,
  gridDescription: sharedDatagridProps.gridDescription,
  useDenseHeader: sharedDatagridProps.useDenseHeader,
  customizeColumnsProps: sharedDatagridProps.customizeColumnsProps,
};
const columnCustomizationStoryName = 'With column customization';
export const ColumnCustomizationUsageStory = ColumnCustomizationWrapper.bind(
  {}
);
ColumnCustomizationUsageStory.storyName = columnCustomizationStoryName;
ColumnCustomizationUsageStory.argTypes = {
  gridTitle: ARG_TYPES.gridTitle,
  gridDescription: ARG_TYPES.gridDescription,
  useDenseHeader: ARG_TYPES.useDenseHeader,
  customizeColumnsProps: ARG_TYPES.customizeColumnsProps,
};
ColumnCustomizationUsageStory.args = {
  ...columnCustomizationControlProps,
};

const ColumnCustomizationWithFixedColumn = ({ ...args }) => {
  const [hiddenIndices, setHiddenIndices] = useState([]);
  const stickyHeaders = defaultHeader.slice(2, 15);

  const columns = React.useMemo(() => {
    const header = [
      {
        Header: 'Row Index',
        accessor: (row, i) => i,
        sticky: 'left',
        id: 'rowIndex', // id is required when accessor is a function.
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
        disabled: true,
      },
      ...stickyHeaders,
      {
        Header: '',
        accessor: 'actions',
        sticky: 'right',
        width: 48,
        isAction: true,
      },
    ];
    header.forEach((headerItem) => {
      hiddenIndices.some((index) => {
        if (headerItem.accessor === index) {
          headerItem.disableGlobalFilter = true;
          return true;
        } else {
          headerItem.disableGlobalFilter = false;
        }
      });
    });
    return header;
  }, [hiddenIndices]);
  const [data] = useState(makeData(10));

  const datagridState = useDatagrid(
    {
      className: `c4p--datagrid__hidden--columns`,
      columns,
      data,
      ascendingSortableLabelText: 'ascending',
      descendingSortableLabelText: 'descending',
      defaultSortableLabelText: 'none',

      initialState: {
        pageSize: 10,
        pageSizes: [5, 10, 25, 50],
        hiddenColumns: ['age'],
        columnOrder: [],
        sortableColumn: {
          id: 'rowIndex',
          order: 'ASC',
        },
      },
      DatagridActions,
      DatagridPagination,
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
      ...args.defaultGridProps,
      customizeColumnsProps: {
        onSaveColumnPrefs: (newColDefs) => {
          const indices = newColDefs
            .map((col, index) => (!col.isVisible ? col.id : null))
            .filter((col) => col !== null);
          setHiddenIndices(indices);
        },
        labels: {
          findColumnPlaceholderLabel: 'Find column',
          resetToDefaultLabel: 'Reset to default',
          customizeTearsheetHeadingLabel: 'Customize columns',
          primaryButtonTextLabel: 'Save',
          secondaryButtonTextLabel: 'Cancel',
          instructionsLabel:
            'Deselect columns to hide them. Drag rows to change column order. These specifications will be saved if you leave and return to the data table.',
          iconTooltipLabel: 'Customize columns',
          assistiveTextInstructionsLabel:
            'Press space bar to toggle drag drop mode, use arrow keys to move selected elements.',
          assistiveTextDisabledInstructionsLabel:
            'Reordering columns are disabled because they are filtered currently.',
          selectAllLabel: 'Column name',
        },
      },
    },
    useCustomizeColumns,
    useColumnOrder,
    useStickyColumn,
    useActionsColumn,
    useSortableColumns
  );

  return (
    <WithFeatureFlags
      flags={{
        'enable-datagrid-useCustomizeColumns': true,
      }}
    >
      <Datagrid datagridState={datagridState} />
      <div className={`${blockClass}-story__hidden-column-id-snippet`}>
        <p>Hidden column ids:</p>
        <CodeSnippet type="multi">
          {JSON.stringify(datagridState.state.hiddenColumns, null, 2)}
        </CodeSnippet>
      </div>
    </WithFeatureFlags>
  );
};

const ColumnCustomizationWithFixedWrapper = ({ ...args }) => {
  return <ColumnCustomizationWithFixedColumn defaultGridProps={{ ...args }} />;
};

const columnCustomizationFixedStoryName =
  'With column customization and frozen columns';
export const ColumnCustomizationWithFixedColumnAndDisabledStory =
  ColumnCustomizationWithFixedWrapper.bind({});
ColumnCustomizationWithFixedColumnAndDisabledStory.storyName =
  columnCustomizationFixedStoryName;
ColumnCustomizationWithFixedColumnAndDisabledStory.argTypes = {
  gridTitle: ARG_TYPES.gridTitle,
  gridDescription: ARG_TYPES.gridDescription,
  useDenseHeader: ARG_TYPES.useDenseHeader,
  customizeColumnsProps: ARG_TYPES.customizeColumnsProps,
};
ColumnCustomizationWithFixedColumnAndDisabledStory.args = {
  ...columnCustomizationControlProps,
};
