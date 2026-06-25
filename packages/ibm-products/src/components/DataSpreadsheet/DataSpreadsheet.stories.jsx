/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useMemo, useState } from 'react';
import { previewCandidate__DataSpreadsheet as DataSpreadsheet } from '..';
import { generateData } from './utils/generateData';
import mdx from './DataSpreadsheet.mdx';
import { Annotation } from '../../../.storybook/Annotation';

import styles from './_storybook-styles.scss?inline';
import { OverflowMenu, OverflowMenuItem } from '@carbon/react';

export default {
  title: 'Deprecated/DataSpreadsheet',
  component: DataSpreadsheet,
  tags: ['autodocs'],
  argTypes: {
    onActiveCellChange: {
      action: 'active cell change',
    },
    onColDrag: {
      action: 'on column drag',
    },
    onSelectionAreaChange: {
      action: 'selection area change',
    },
  },
  parameters: {
    styles,
    chromatic: { disableSnapshot: true },
    docs: {
      page: mdx,
    },
  },
  decorators: [
    (story) => (
      <div>
        <Annotation
          type="deprecation-notice"
          text={
            <div>
              This component is deprecated and will be removed in the next major
              version.
            </div>
          }
        >
          {story()}
        </Annotation>
      </div>
    ),
  ],
};

const NumericLayout = ({ value }) => {
  return (
    <span
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {value}
    </span>
  );
};

const customColumnData = [
  {
    Header: 'Row Index',
    accessor: (row, index) => index,
    Cell: ({ cell: { value } }) => <NumericLayout value={value} />,
    placement: 'right',
    width: 275,
  },
  {
    Header: 'Pet type',
    accessor: 'petType',
  },
  {
    Header: (
      <div>
        <div>
          <span>{'First Name'}</span>&nbsp;
          <span>{'(Pets)'}</span>
        </div>
      </div>
    ),
    accessor: 'firstName',
    column_name: 'First Name', // This will equal to the same string you want to represent as your header
  },
  {
    Header: 'Age',
    accessor: 'age',
    Cell: ({ cell: { value } }) => <NumericLayout value={value} />,
    placement: 'right',
  },
  {
    Header: 'Vet visits',
    accessor: 'visits',
    Cell: ({ cell: { value } }) => <NumericLayout value={value} />,
    placement: 'right',
  },
  {
    Header: 'Health',
    accessor: 'health',
    Cell: ({ cell: { value } }) => <NumericLayout value={value} />,
    placement: 'right',
  },
];

const columnData = [
  {
    Header: 'Row index',
    accessor: (row, index) => index,
    Cell: ({ cell: { value } }) => <NumericLayout value={value} />,
    placement: 'right',
    width: 275,
  },
  {
    Header: 'Pet Type',
    accessor: 'petType',
  },
  {
    Header: 'First Name',
    accessor: 'firstName',
  },
  {
    Header: 'Age',
    accessor: 'age',
    Cell: ({ cell: { value } }) => <NumericLayout value={value} />,
    placement: 'right',
  },
  {
    Header: 'Vet visits',
    accessor: 'visits',
    Cell: ({ cell: { value } }) => <NumericLayout value={value} />,
    placement: 'right',
  },
  {
    Header: 'Health',
    accessor: 'health',
    Cell: ({ cell: { value } }) => <NumericLayout value={value} />,
    placement: 'right',
  },
];

const Template = ({ ...args }) => {
  const [data, setData] = useState(() => generateData({ rows: 16 }));
  const columns = useMemo(() => columnData, []);

  return (
    <DataSpreadsheet
      columns={columns}
      data={data}
      onDataUpdate={setData}
      id="spreadsheet--id"
      {...args}
    />
  );
};

const largeDatasetSpreadsheetCustomRowHeaders = ({ ...args }) => {
  const [data, setData] = useState(() => generateData({ rows: 100000 }));
  const columns = useMemo(() => columnData, []);

  const buildComponent = (index) => (
    <OverflowMenu
      style={{
        width: '32px',
        height: '32px',
        minWidth: '32px',
        minHeight: '32px',
      }}
    >
      <OverflowMenuItem itemText={`Test item ${index}`} />
    </OverflowMenu>
  );

  return (
    <DataSpreadsheet
      columns={columns}
      data={data}
      onDataUpdate={setData}
      renderRowHeaderDirection="Left"
      renderRowHeader={buildComponent}
      id="spreadsheet--id"
      {...args}
    />
  );
};

const LargeTemplate = ({ ...args }) => {
  const [data, setData] = useState(() => generateData({ rows: 1000 }));
  const columns = useMemo(() => columnData, []);

  return (
    <DataSpreadsheet
      columns={columns}
      data={data}
      onDataUpdate={setData}
      id="spreadsheet--id"
      {...args}
    />
  );
};

const EmptyWithCellsTemplate = ({ ...args }) => {
  const [data, setData] = useState([]);
  const columnDataClone = useMemo(
    () => [...columnData.filter((item) => item.Header !== 'Row Index')],
    []
  );
  const columns = useMemo(() => columnDataClone, [columnDataClone]);
  return (
    <DataSpreadsheet
      columns={columns}
      data={data}
      onDataUpdate={setData}
      id="spreadsheet--id"
      {...args}
    />
  );
};

const WithManyColumns = ({ ...args }) => {
  const [data, setData] = useState(() =>
    generateData({ rows: 24, extraColumns: true })
  );

  const columnDataClone = useMemo(
    () => [
      ...columnData,
      {
        Header: 'Owner name',
        accessor: 'ownerName',
      },
      {
        Header: 'Weight',
        accessor: 'weight',
      },
    ],
    []
  );
  const columns = useMemo(() => columnDataClone, [columnDataClone]);

  return (
    <DataSpreadsheet
      columns={columns}
      data={data}
      onDataUpdate={setData}
      id="spreadsheet--id"
      {...args}
    />
  );
};

const WithDifferentOptions = ({ ...args }) => {
  const [data, setData] = useState(() =>
    generateData({ rows: 24, extraColumns: true })
  );
  const columnDataClone = useMemo(
    () => [
      ...columnData,
      {
        Header: 'Owner name',
        accessor: 'ownerName',
      },
      {
        Header: 'Weight',
        accessor: 'weight',
      },
    ],
    []
  );
  const columns = useMemo(() => columnDataClone, [columnDataClone]);

  return (
    <DataSpreadsheet
      columns={columns}
      data={data}
      onDataUpdate={setData}
      id="spreadsheet--id"
      {...args}
    />
  );
};

const dragDropCallback = ({ ...args }) => {
  const [data, setData] = useState(() =>
    generateData({ rows: 24, extraColumns: true })
  );

  const onColumnDragDrop = (tableData) => {
    // Dev can debug here
  };

  const columnDataClone = useMemo(
    () => [
      ...customColumnData,
      {
        Header: 'Owner name',
        accessor: 'ownerName',
      },
      {
        Header: 'Weight',
        accessor: 'weight',
      },
    ],
    []
  );
  const columns = useMemo(() => columnDataClone, [columnDataClone]);

  return (
    <DataSpreadsheet
      columns={columns}
      data={data}
      onDataUpdate={setData}
      onColDrag={onColumnDragDrop}
      id="spreadsheet--id"
      {...args}
    />
  );
};

export const dataSpreadsheet = Template.bind({});
dataSpreadsheet.storyName = 'Basic spreadsheet';
dataSpreadsheet.args = {
  selectAllAriaLabel: 'Select all',
  spreadsheetAriaLabel: 'Example data spreadsheet',
};

export const largeDatasetSpreadsheet = LargeTemplate.bind({});
largeDatasetSpreadsheet.storyName = 'Large dataset';
largeDatasetSpreadsheet.args = {
  cellSize: 'lg',
  selectAllAriaLabel: 'Select all',
  spreadsheetAriaLabel: 'Example data spreadsheet',
};

export const largeDatasetSpreadsheetCustom =
  largeDatasetSpreadsheetCustomRowHeaders.bind({});
largeDatasetSpreadsheetCustom.storyName =
  'Large dataset with optional component';
largeDatasetSpreadsheetCustom.args = {
  cellSize: 'lg',
  selectAllAriaLabel: 'Select all',
  spreadsheetAriaLabel: 'Example data spreadsheet',
};

export const emptyWithCells = EmptyWithCellsTemplate.bind({});
emptyWithCells.storyName = 'Empty with cells';
emptyWithCells.args = {
  defaultEmptyRowCount: 24,
  selectAllAriaLabel: 'Select all',
  spreadsheetAriaLabel: 'Example data spreadsheet',
};

export const withManyColumns = WithManyColumns.bind({});
withManyColumns.storyName = 'With many columns';
withManyColumns.args = {
  selectAllAriaLabel: 'Select all',
  spreadsheetAriaLabel: 'Example data spreadsheet',
  totalVisibleColumns: 5,
};

export const withDifferentOptions = WithDifferentOptions.bind({});
withDifferentOptions.storyName = 'With different options';
withDifferentOptions.args = {
  readOnlyTable: false,
  disableColumnSwapping: false,
  selectAllAriaLabel: 'Select all',
  spreadsheetAriaLabel: 'Example data spreadsheet',
  totalVisibleColumns: 5,
};

export const withDragDropCallback = dragDropCallback.bind({});
withDragDropCallback.storyName = 'With drag drop  callback';
withDragDropCallback.args = {
  selectAllAriaLabel: 'Select all',
  spreadsheetAriaLabel: 'Example data spreadsheet',
  totalVisibleColumns: 5,
};
