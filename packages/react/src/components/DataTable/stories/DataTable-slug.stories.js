/**
 * Copyright IBM Corp. 2016, 2023
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
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
} from '..';
import { rows, headers } from './shared';
import mdx from '../DataTable.mdx';
import Button from '../../Button';
import { IconButton } from '../../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import { Slug, SlugContent, SlugActions } from '../../Slug';
import './datatable-story.scss';

export default {
  title: 'Experimental/unstable__Slug/DataTable',
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
  },
};

const slug = (
  <Slug className="slug-container">
    <SlugContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h1>84%</h1>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
      <SlugActions>
        <IconButton kind="ghost" label="View">
          <View />
        </IconButton>
        <IconButton kind="ghost" label="Open Folder">
          <FolderOpen />
        </IconButton>
        <IconButton kind="ghost" label="Folders">
          <Folders />
        </IconButton>
        <Button>View literature</Button>
      </SlugActions>
    </SlugContent>
  </Slug>
);

const columnSlug = (
  <Slug className="slug-container" autoAlign={false} align="bottom-right">
    <SlugContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h1>84%</h1>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
      <SlugActions>
        <IconButton kind="ghost" label="View">
          <View />
        </IconButton>
        <IconButton kind="ghost" label="Open Folder">
          <FolderOpen />
        </IconButton>
        <IconButton kind="ghost" label="Folders">
          <Folders />
        </IconButton>
        <Button>View literature</Button>
      </SlugActions>
    </SlugContent>
  </Slug>
);

export const SlugWithSelection = () => (
  <DataTable rows={rows} headers={headers}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
      getTableProps,
      getTableContainerProps,
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
              <TableRow key={i} {...getRowProps({ row })}>
                <TableSlugRow
                  slug={i === 3 || i === 4 || i === 1 ? slug : null}
                />
                <TableSelectRow {...getSelectionProps({ row })} />
                {row.cells.map((cell) => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

export const SlugWithRadioSelection = () => (
  <DataTable rows={rows} headers={headers} radio>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
      getTableProps,
      getTableContainerProps,
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
              <TableRow key={i} {...getRowProps({ row })}>
                <TableSlugRow
                  slug={i === 3 || i === 4 || i === 1 ? slug : null}
                />
                <TableSelectRow {...getSelectionProps({ row })} />
                {row.cells.map((cell) => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

export const SlugWithSelectionAndExpansion = () => (
  <DataTable rows={rows} headers={headers}>
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
                  <TableSlugRow
                    slug={i === 3 || i === 4 || i === 1 ? slug : null}
                  />
                  <TableSelectRow {...getSelectionProps({ row })} />
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
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

export const SlugWithExpansion = () => (
  <DataTable rows={rows} headers={headers}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getExpandedRowProps,
      getExpandHeaderProps,
      getTableProps,
      getTableContainerProps,
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
                  <TableSlugRow
                    slug={i === 3 || i === 4 || i === 1 ? slug : null}
                  />
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
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

export const ColumnSlugWithSelectionAndExpansion = () => (
  <DataTable rows={rows} headers={headers}>
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
    }) => (
      <TableContainer
        title="DataTable"
        description="With expansion"
        className="slug-column-table"
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
                  slug={i === 1 ? columnSlug : null}
                  key={i}
                  {...getHeaderProps({ header })}>
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
                      console.log(cell);
                      return <TableCell key={cell.id}>{cell.value}</TableCell>;
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

export const ColumnSlugSort = () => (
  <DataTable rows={rows} headers={headers}>
    {({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
      <TableContainer
        title="DataTable"
        description="With sorting"
        className="slug-column-table">
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              {headers.map((header, i) => (
                <TableHeader
                  key={header.key}
                  slug={i === 4 ? columnSlug : null}
                  {...getHeaderProps({ header, isSortable: true })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} {...getRowProps({ row })}>
                {row.cells.map((cell) => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);
