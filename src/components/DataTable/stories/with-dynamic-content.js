/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
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
} from '../../DataTable';
import Button from '../../Button';
import Download16 from '@carbon/icons-react/lib/download/16';
import Edit16 from '@carbon/icons-react/lib/edit/16';
import Settings16 from '@carbon/icons-react/lib/settings/16';
import { batchActionClick, initialRows, headers } from './shared';

export default () => {
  const insertInRandomPosition = (array, element) => {
    const index = Math.floor(Math.random() * (array.length + 1));
    return [...array.slice(0, index), element, ...array.slice(index)];
  };

  class DynamicRows extends React.Component {
    state = {
      rows: initialRows,
      headers: headers,
      id: 0,
    };

    handleOnHeaderAdd = () => {
      const length = this.state.headers.length;
      const header = {
        key: `header_${length}`,
        header: `Header ${length}`,
      };

      this.setState(state => {
        const rows = state.rows.map(row => {
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
      this.setState(state => {
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
          .filter(header => row[header.key] === undefined)
          .forEach(header => {
            row[header.key] = header.header;
          });

        return {
          id,
          rows: insertInRandomPosition(rows, row),
        };
      });
    };

    render() {
      return (
        <DataTable
          rows={this.state.rows}
          headers={this.state.headers}
          render={({
            rows,
            headers,
            getHeaderProps,
            getSelectionProps,
            getBatchActionProps,
            getRowProps,
            onInputChange,
            selectedRows,
          }) => (
            <TableContainer
              title="DataTable"
              description="With dynamic content">
              <Button small onClick={this.handleOnRowAdd}>
                Add new row
              </Button>
              <Button small onClick={this.handleOnHeaderAdd}>
                Add new header
              </Button>
              <TableToolbar>
                <TableBatchActions {...getBatchActionProps()}>
                  <TableBatchAction onClick={batchActionClick(selectedRows)}>
                    Ghost
                  </TableBatchAction>
                  <TableBatchAction onClick={batchActionClick(selectedRows)}>
                    Ghost
                  </TableBatchAction>
                  <TableBatchAction onClick={batchActionClick(selectedRows)}>
                    Ghost
                  </TableBatchAction>
                </TableBatchActions>
                <TableToolbarSearch onChange={onInputChange} />
                <TableToolbarContent>
                  <TableToolbarAction
                    renderIcon={Download16}
                    iconDescription="Download"
                    onClick={action('TableToolbarAction - Download')}
                  />
                  <TableToolbarAction
                    renderIcon={Edit16}
                    iconDescription="Edit"
                    onClick={action('TableToolbarAction - Edit')}
                  />
                  <TableToolbarAction
                    renderIcon={Settings16}
                    iconDescription="Settings"
                    onClick={action('TableToolbarAction - Settings')}
                  />
                </TableToolbarContent>
              </TableToolbar>
              <Table sortable={true}>
                <TableHead>
                  <TableRow>
                    <TableExpandHeader />
                    <TableSelectAll {...getSelectionProps()} />
                    {headers.map(header => (
                      <TableHeader {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <React.Fragment key={row.id}>
                      <TableExpandRow {...getRowProps({ row })}>
                        <TableSelectRow {...getSelectionProps({ row })} />
                        {row.cells.map(cell => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableExpandRow>
                      <TableExpandedRow colSpan={headers.length + 3}>
                        <h1>Expandable row content</h1>
                        <p>Description here</p>
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

  return <DynamicRows />;
};
