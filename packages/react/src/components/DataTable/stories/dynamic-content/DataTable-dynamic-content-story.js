/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';

import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import {
  Delete16 as Delete,
  Save16 as Save,
  Download16 as Download,
} from '@carbon/icons-react';
import DataTable, {
  Table,
  TableBatchAction,
  TableBatchActions,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
} from '../../../DataTable';
import { batchActionClick, rows, headers } from '../shared';

const sizes = {
  Compact: 'compact',
  Short: 'short',
  Medium: 'md',
  Default: null,
  Tall: 'tall',
};

const tableProps = {
  sizeProp: () => {
    return {
      size: select('Row size (size)', sizes, null),
    };
  },
};

export default {
  title: 'Components/DataTable/Development',
  decorators: [withKnobs],
};

export const Example = (props) => {
  const insertInRandomPosition = (array, element) => {
    const index = Math.floor(Math.random() * (array.length + 1));
    return [...array.slice(0, index), element, ...array.slice(index)];
  };

  class DynamicRows extends React.Component {
    state = {
      rows,
      headers: headers,
      id: 0,
    };

    handleOnHeaderAdd = () => {
      const length = this.state.headers.length;
      const header = {
        key: `header_${length}`,
        header: `Header ${length}`,
      };

      this.setState((state) => {
        const rows = state.rows.map((row) => {
          return {
            ...row,
            [header.key]: header.header,
          };
        });
        return {
          rows,
          headers: state.headers.concat(header),
        };
      });
    };

    handleOnRowAdd = () => {
      this.setState((state) => {
        const { id: _id, rows } = state;
        const id = _id + 1;
        const row = {
          id: '' + id,
          name: `New Row ${id}`,
          protocol: 'HTTP',
          port: id * 100,
          rule: id % 2 === 0 ? 'Round robin' : 'DNS delegation',
          attached_groups: `Row ${id}'s VM Groups`,
          status: 'Starting',
        };

        state.headers
          .filter((header) => row[header.key] === undefined)
          .forEach((header) => {
            row[header.key] = header.header;
          });

        return {
          id,
          rows: insertInRandomPosition(rows, row),
        };
      });
    };

    render() {
      const sizeProp = tableProps.sizeProp();
      return (
        <DataTable
          rows={this.state.rows}
          headers={this.state.headers}
          {...this.props}
          render={({
            rows,
            headers,
            getHeaderProps,
            getSelectionProps,
            getToolbarProps,
            getBatchActionProps,
            getRowProps,
            onInputChange,
            selectedRows,
            getTableProps,
            getTableContainerProps,
          }) => (
            <TableContainer
              title="DataTable"
              description="Use the toolbar menu to add rows and headers"
              {...getTableContainerProps()}>
              <TableToolbar {...getToolbarProps()}>
                <TableBatchActions {...getBatchActionProps()}>
                  <TableBatchAction
                    renderIcon={Delete}
                    iconDescription="Delete the selected rows"
                    onClick={batchActionClick(selectedRows)}>
                    Delete
                  </TableBatchAction>
                  <TableBatchAction
                    renderIcon={Save}
                    iconDescription="Save the selected rows"
                    onClick={batchActionClick(selectedRows)}>
                    Save
                  </TableBatchAction>
                  <TableBatchAction
                    renderIcon={Download}
                    iconDescription="Download the selected rows"
                    onClick={batchActionClick(selectedRows)}>
                    Download
                  </TableBatchAction>
                </TableBatchActions>
                <TableToolbarContent>
                  <TableToolbarSearch onChange={onInputChange} />
                  <TableToolbarMenu>
                    <TableToolbarAction onClick={this.handleOnRowAdd}>
                      Add row
                    </TableToolbarAction>
                    <TableToolbarAction onClick={this.handleOnHeaderAdd}>
                      Add header
                    </TableToolbarAction>
                  </TableToolbarMenu>
                </TableToolbarContent>
              </TableToolbar>
              <Table {...getTableProps()} {...sizeProp}>
                <TableHead>
                  <TableRow>
                    <TableExpandHeader />
                    <TableSelectAll {...getSelectionProps()} />
                    {headers.map((header, i) => (
                      <TableHeader key={i} {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <React.Fragment key={row.id}>
                      <TableExpandRow {...getRowProps({ row })}>
                        <TableSelectRow {...getSelectionProps({ row })} />
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableExpandRow>
                      <TableExpandedRow
                        colSpan={headers.length + 3}
                        className="demo-expanded-td">
                        <h6>Expandable row content</h6>
                        <div>Description here</div>
                      </TableExpandedRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        />
      );
    }
  }
  return <DynamicRows {...props} />;
};
