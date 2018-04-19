import React from 'react';
import { storiesOf } from '@storybook/react';
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
} from '../DataTable';
import Button from '../Button';

const initialRows = [
  {
    id: 'a',
    name: 'Load Balancer 3',
    protocol: 'HTTP',
    port: 3000,
    rule: 'Round robin',
    attached_groups: 'Kevins VM Groups',
    status: 'Disabled',
  },
  {
    id: 'b',
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    port: 443,
    rule: 'Round robin',
    attached_groups: 'Maureens VM Groups',
    status: 'Starting',
  },
  {
    id: 'c',
    name: 'Load Balancer 2',
    protocol: 'HTTP',
    port: 80,
    rule: 'DNS delegation',
    attached_groups: 'Andrews VM Groups',
    status: 'Active',
  },
];

const headers = [
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
    header: 'Attached Groups',
  },
  {
    key: 'status',
    header: 'Status',
  },
];

const readmeURL = 'https://goo.gl/dq6CEK';

const batchActionClick = selectedRows => () =>
  action('batch action click')(selectedRows);

storiesOf('DataTable', module)
  .addWithInfo(
    'default',
    /* eslint-disable no-useless-escape */
    `
      Data Tables are used to represent a collection of resources, displaying a
      subset of their fields in columns, or headers. The \`DataTable\` component
      that we export from Carbon requires two props to be passed in: \`rows\`
      and \`headers\`.

      You can find more detailed information surrounding usage of this component
      at the following url: ${readmeURL}
    `,
    /* eslint-enable no-useless-escape */
    () => (
      <DataTable
        rows={initialRows}
        headers={headers}
        render={({
          rows,
          headers,
          getHeaderProps,
          getSelectionProps,
          getBatchActionProps,
          onInputChange,
          selectedRows,
        }) => (
          <TableContainer title="DataTable">
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
                  iconName="download"
                  iconDescription="Download"
                  onClick={action('TableToolbarAction - Download')}
                />
                <TableToolbarAction
                  iconName="edit"
                  iconDescription="Edit"
                  onClick={action('TableToolbarAction - Edit')}
                />
                <TableToolbarAction
                  iconName="settings"
                  iconDescription="Settings"
                  onClick={action('TableToolbarAction - Settings')}
                />
                <Button onClick={action('Add new row')} small kind="primary">
                  Add new
                </Button>
              </TableToolbarContent>
            </TableToolbar>
            <Table>
              <TableHead>
                <TableRow>
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
                  <TableRow key={row.id}>
                    <TableSelectRow {...getSelectionProps({ row })} />
                    {row.cells.map(cell => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      />
    )
  )
  .addWithInfo(
    'with toolbar',
    `
      DataTable with toolbar and filtering.

      You can find more detailed information surrounding usage of this component
      at the following url: ${readmeURL}
    `,
    () => (
      <DataTable
        rows={initialRows}
        headers={headers}
        render={({ rows, headers, getHeaderProps, onInputChange }) => (
          <TableContainer title="DataTable with toolbar">
            <TableToolbar>
              <TableToolbarSearch onChange={onInputChange} />
              <TableToolbarContent>
                <TableToolbarAction
                  iconName="download"
                  iconDescription="Download"
                  onClick={action('TableToolbarAction - Download')}
                />
                <TableToolbarAction
                  iconName="edit"
                  iconDescription="Edit"
                  onClick={action('TableToolbarAction - Edit')}
                />
                <TableToolbarAction
                  iconName="settings"
                  iconDescription="Settings"
                  onClick={action('TableToolbarAction - Settings')}
                />
                <Button onClick={action('Add new row')} small kind="primary">
                  Add new
                </Button>
              </TableToolbarContent>
            </TableToolbar>
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map(header => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.id}>
                    {row.cells.map(cell => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      />
    )
  )
  .addWithInfo(
    'with sorting',
    `
      DataTable with sorting

      You can find more detailed information surrounding usage of this component
      at the following url: ${readmeURL}
    `,
    () => (
      <DataTable
        rows={initialRows}
        headers={headers}
        render={({ rows, headers, getHeaderProps }) => (
          <TableContainer title="DataTable with sorting">
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map(header => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.id}>
                    {row.cells.map(cell => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      />
    )
  )
  .addWithInfo(
    'with selection',
    `
      DataTable with selection

      You can find more detailed information surrounding usage of this component
      at the following url: ${readmeURL}
    `,
    () => (
      <DataTable
        rows={initialRows}
        headers={headers}
        render={({ rows, headers, getHeaderProps, getSelectionProps }) => (
          <TableContainer title="DataTable">
            <Table>
              <TableHead>
                <TableRow>
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
                  <TableRow key={row.id}>
                    <TableSelectRow {...getSelectionProps({ row })} />
                    {row.cells.map(cell => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      />
    )
  )
  .addWithInfo(
    'with expansion',
    `
      DataTable with expansion

      You can find more detailed information surrounding usage of this component
      at the following url: ${readmeURL}
    `,
    () => (
      <DataTable
        rows={initialRows}
        headers={headers}
        render={({ rows, headers, getHeaderProps, getRowProps }) => (
          <TableContainer title="DataTable with expansion">
            <Table>
              <TableHead>
                <TableRow>
                  <TableExpandHeader />
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
                      {row.cells.map(cell => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableExpandRow>
                    {row.isExpanded && (
                      <TableExpandedRow>
                        <TableCell colSpan={headers.length + 1}>
                          <h1>Expandable row content</h1>
                          <p>Description here</p>
                        </TableCell>
                      </TableExpandedRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      />
    )
  )
  .addWithInfo(
    'with batch actions',
    `
      Uses <TableToolbar> alongside <TableBatchActions> and <TableBatchAction>
      to create the toolbar and placeholder for where the batch action menu will
      be displayed.

      You can use the \`getBatchActionProps\` prop getter on the
      <TableBatchActions> component to have it wire up the ghost menu for you.

      Individual <TableBatchAction> components take in any kind of event handler
      prop that you would expect to use, like \`onClick\`. You can use these
      alongside the \`selectedRows\` property in your \`render\` prop function
      to pass along this info to your batch action handler.

      You can find more detailed information surrounding usage of this component
      at the following url: ${readmeURL}
    `,
    () => (
      <DataTable
        rows={initialRows}
        headers={headers}
        render={({
          rows,
          headers,
          getHeaderProps,
          getSelectionProps,
          getBatchActionProps,
          onInputChange,
          selectedRows,
        }) => (
          <TableContainer title="DataTable with batch actions">
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
                  iconName="download"
                  iconDescription="Download"
                  onClick={action('TableToolbarAction - Download')}
                />
                <TableToolbarAction
                  iconName="edit"
                  iconDescription="Edit"
                  onClick={action('TableToolbarAction - Edit')}
                />
                <TableToolbarAction
                  iconName="settings"
                  iconDescription="Settings"
                  onClick={action('TableToolbarAction - Settings')}
                />
                <Button onClick={action('Add new row')} small kind="primary">
                  Add new
                </Button>
              </TableToolbarContent>
            </TableToolbar>
            <Table>
              <TableHead>
                <TableRow>
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
                  <TableRow key={row.id}>
                    <TableSelectRow {...getSelectionProps({ row })} />
                    {row.cells.map(cell => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      />
    )
  )
  .addWithInfo(
    'with dynamic content',
    `
      Showcases DataTable behavior when rows are added to the component,
      and when cell data changes dynamically.
    `,
    () => {
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

        handleOnCellChange = () => {
          this.setState(state => {
            const rows = state.rows.map(row => {
              return {
                ...row,
                port: row.port + 1,
              };
            });
            return {
              rows,
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
                <TableContainer title="DataTable with dynamic content">
                  <Button small onClick={this.handleOnRowAdd}>
                    Add new row
                  </Button>
                  <Button small onClick={this.handleOnHeaderAdd}>
                    Add new header
                  </Button>
                  <Button small onClick={this.handleOnCellChange}>
                    Change cell contents
                  </Button>
                  <TableToolbar>
                    <TableBatchActions {...getBatchActionProps()}>
                      <TableBatchAction
                        onClick={batchActionClick(selectedRows)}>
                        Ghost
                      </TableBatchAction>
                      <TableBatchAction
                        onClick={batchActionClick(selectedRows)}>
                        Ghost
                      </TableBatchAction>
                      <TableBatchAction
                        onClick={batchActionClick(selectedRows)}>
                        Ghost
                      </TableBatchAction>
                    </TableBatchActions>
                    <TableToolbarSearch onChange={onInputChange} />
                    <TableToolbarContent>
                      <TableToolbarAction
                        iconName="download"
                        iconDescription="Download"
                        onClick={action('TableToolbarAction - Download')}
                      />
                      <TableToolbarAction
                        iconName="edit"
                        iconDescription="Edit"
                        onClick={action('TableToolbarAction - Edit')}
                      />
                      <TableToolbarAction
                        iconName="settings"
                        iconDescription="Settings"
                        onClick={action('TableToolbarAction - Settings')}
                      />
                    </TableToolbarContent>
                  </TableToolbar>
                  <Table>
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
                          {row.isExpanded && (
                            <TableExpandedRow>
                              <TableCell colSpan={headers.length + 3}>
                                <h1>Expandable row content</h1>
                                <p>Description here</p>
                              </TableCell>
                            </TableExpandedRow>
                          )}
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
    }
  );
