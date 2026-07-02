/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DataTable, {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableSlugRow,
  TableDecoratorRow,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
} from '..';
import { rows, headers } from './shared';
import mdx from '../../AILabel/AILabelDataTable.mdx';
import Button from '../../Button';
import { IconButton } from '../../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import { AILabel, AILabelContent, AILabelActions } from '../../AILabel';
import './datatable-story.scss';

export default {
  title: 'Components/DataTable/WithAILabel',
  component: DataTable,
  subcomponents: {
    TableSelectAll,
    TableSelectRow,
    TableSlugRow,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: [
        'filterRows',
        'headers',
        'isSortable',
        'overflowMenuOnHover',
        'radio',
        'rows',
        'translateWithId',
        'sortRow',
      ],
    },
  },
};

const columnAILabelHeaders = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'protocol',
    header: 'Protocol',
  },
  {
    key: 'port',
    header: 'Port',
  },
  {
    key: 'rule',
    header: 'Rule',
  },
  {
    key: 'attached_groups',
    header: 'Attached groups',
    decorator: (
      <AILabel
        className="ai-label-container"
        autoAlign={false}
        align="bottom-right">
        <AILabelContent>
          <div>
            <p className="secondary">AI Explained</p>
            <h2 className="ai-label-heading">84%</h2>
            <p className="secondary bold">Confidence score</p>
            <p className="secondary">
              Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut fsil labore et dolore magna
              aliqua.
            </p>
            <hr />
            <p className="secondary">Model type</p>
            <p className="bold">Foundation model</p>
          </div>
          <AILabelActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </AILabelActions>
        </AILabelContent>
      </AILabel>
    ),
  },
  {
    key: 'status',
    header: 'Status',
  },
];

const aiLabel = (
  <AILabel className="ai-label-container">
    <AILabelContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h2 className="ai-label-heading">84%</h2>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
      <AILabelActions>
        <IconButton kind="ghost" label="View">
          <View />
        </IconButton>
        <IconButton kind="ghost" label="Open Folder">
          <FolderOpen />
        </IconButton>
        <IconButton kind="ghost" label="Folders">
          <Folders />
        </IconButton>
        <Button>View details</Button>
      </AILabelActions>
    </AILabelContent>
  </AILabel>
);

export const AILabelWithSelection = (args) => (
  <DataTable rows={rows} headers={headers} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
      getTableProps,
      getTableContainerProps,
      getCellProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With selection"
        {...getTableContainerProps()}>
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              <th scope="col" />
              <TableSelectAll {...getSelectionProps()} />
              {headers.map((header, i) => (
                <TableHeader key={i} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow {...getRowProps({ row })}>
                {i === 3 || i === 4 || i === 1 ? (
                  <TableDecoratorRow decorator={aiLabel} />
                ) : (
                  <TableCell />
                )}
                <TableSelectRow {...getSelectionProps({ row })} />
                {row.cells.map((cell) => (
                  <TableCell {...getCellProps({ cell })}>
                    {cell.value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

export const AILabelWithRadioSelection = (args) => (
  <DataTable rows={rows} headers={headers} radio {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
      getTableProps,
      getTableContainerProps,
      getCellProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With radio selection"
        {...getTableContainerProps()}>
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              <th scope="col" />
              <th scope="col" />
              {headers.map((header, i) => (
                <TableHeader key={i} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow {...getRowProps({ row })}>
                {i === 3 || i === 4 || i === 1 ? (
                  <TableDecoratorRow decorator={aiLabel} />
                ) : (
                  <TableCell />
                )}
                <TableSelectRow {...getSelectionProps({ row })} />
                {row.cells.map((cell) => (
                  <TableCell {...getCellProps({ cell })}>
                    {cell.value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

export const AILabelWithSelectionAndExpansion = (args) => (
  <DataTable rows={rows} headers={headers} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getExpandedRowProps,
      getExpandHeaderProps,
      getSelectionProps,
      getTableProps,
      getTableContainerProps,
      getCellProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With expansion"
        {...getTableContainerProps()}>
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              <th scope="col" />
              <TableExpandHeader
                enableToggle={true}
                {...getExpandHeaderProps()}
              />
              <TableSelectAll {...getSelectionProps()} />
              {headers.map((header, i) => (
                <TableHeader key={i} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <React.Fragment key={row.id}>
                <TableExpandRow {...getRowProps({ row })}>
                  {i === 3 || i === 4 || i === 1 ? (
                    <TableDecoratorRow decorator={aiLabel} />
                  ) : (
                    <TableDecoratorRow decorator={null} />
                  )}
                  <TableSelectRow {...getSelectionProps({ row })} />
                  {row.cells.map((cell) => (
                    <TableCell {...getCellProps({ cell })}>
                      {cell.value}
                    </TableCell>
                  ))}
                </TableExpandRow>
                <TableExpandedRow
                  colSpan={headers.length + 3}
                  className="demo-expanded-td"
                  {...getExpandedRowProps({ row })}>
                  <h6>Expandable row content</h6>
                  <div>Description here</div>
                </TableExpandedRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

export const AILabelWithExpansion = (args) => (
  <DataTable rows={rows} headers={headers} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getExpandedRowProps,
      getExpandHeaderProps,
      getTableProps,
      getTableContainerProps,
      getCellProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With expansion"
        {...getTableContainerProps()}>
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              <th scope="col" />
              <TableExpandHeader
                enableToggle={true}
                {...getExpandHeaderProps()}
              />
              {headers.map((header, i) => (
                <TableHeader key={i} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <React.Fragment key={row.id}>
                <TableExpandRow {...getRowProps({ row })}>
                  {i === 3 || i === 4 || i === 1 ? (
                    <TableDecoratorRow decorator={aiLabel} />
                  ) : (
                    <TableDecoratorRow decorator={null} />
                  )}
                  {row.cells.map((cell) => (
                    <TableCell {...getCellProps({ cell })}>
                      {cell.value}
                    </TableCell>
                  ))}
                </TableExpandRow>
                <TableExpandedRow
                  colSpan={headers.length + 2}
                  className="demo-expanded-td"
                  {...getExpandedRowProps({ row })}>
                  <h6>Expandable row content</h6>
                  <div>Description here</div>
                </TableExpandedRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

export const ColumnAILabelWithSelectionAndExpansion = (args) => (
  <DataTable rows={rows} headers={columnAILabelHeaders} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getExpandedRowProps,
      getExpandHeaderProps,
      getSelectionProps,
      getTableProps,
      getTableContainerProps,
      getCellProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With expansion"
        className="ai-label-column-table"
        {...getTableContainerProps()}>
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              <TableExpandHeader
                enableToggle={true}
                {...getExpandHeaderProps()}
              />
              <TableSelectAll {...getSelectionProps()} />
              {headers.map((header, i) => (
                <TableHeader
                  key={i}
                  {...getHeaderProps({
                    header,
                  })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <React.Fragment key={row.id}>
                  <TableExpandRow {...getRowProps({ row })}>
                    <TableSelectRow {...getSelectionProps({ row })} />
                    {row.cells.map((cell) => {
                      return (
                        <TableCell {...getCellProps({ cell })}>
                          {cell.value}
                        </TableCell>
                      );
                    })}
                  </TableExpandRow>
                  <TableExpandedRow
                    colSpan={headers.length + 2}
                    className="demo-expanded-td"
                    {...getExpandedRowProps({ row })}>
                    <h6>Expandable row content</h6>
                    <div>Description here</div>
                  </TableExpandedRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

export const ColumnAILabelSort = (args) => (
  <DataTable rows={rows} headers={columnAILabelHeaders} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      getCellProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With sorting"
        className="ai-label-column-table">
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader
                  key={header.key}
                  {...getHeaderProps({ header, isSortable: true })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map((cell) => (
                  <TableCell {...getCellProps({ cell })}>
                    {cell.value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

export const FullTableAI = (args) => (
  <DataTable rows={rows} headers={headers} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      getCellProps,
    }) => (
      <TableContainer
        decorator={aiLabel}
        aiEnabled
        title="DataTable"
        description="AI, full table"
        className="ai-label-column-table">
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader
                  key={header.key}
                  {...getHeaderProps({ header, isSortable: true })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map((cell) => (
                  <TableCell {...getCellProps({ cell })}>
                    {cell.value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);
