/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Button from '../../Button';
import DataTable, {
  Table,
  TableBatchActions,
  TableBatchAction,
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
} from '../';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';

// Test helpers
const getLastCallFor = (mocker) =>
  mocker.mock.calls[mocker.mock.calls.length - 1];

const onSelectAllFn = jest.fn();

const rows = [
  {
    id: 'b',
    fieldA: 'Field 2:A',
    fieldB: 'Field 2:B',
  },
  {
    id: 'a',
    fieldA: 'Field 1:A',
    fieldB: 'Field 1:B',
  },
  {
    id: 'c',
    fieldA: 'Field 3:A',
    fieldB: 'Field 3:B',
  },
];

describe('DataTable', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      rows,
      headers: [
        {
          key: 'fieldA',
          header: 'Field A',
        },
        {
          key: 'fieldB',
          header: 'Field B',
        },
      ],
      locale: 'en',
      render: jest.fn(
        ({
          rows,
          headers,
          getHeaderProps,
          onInputChange,
          getBatchActionProps,
          getTableProps,
          getTableContainerProps,
        }) => (
          <TableContainer
            title="DataTable with toolbar"
            data-testid="test-id"
            {...getTableContainerProps()}>
            <TableToolbar>
              <TableBatchActions {...getBatchActionProps()}>
                <TableBatchAction onClick={jest.fn()}>Ghost</TableBatchAction>
                <TableBatchAction onClick={jest.fn()}>Ghost</TableBatchAction>
                <TableBatchAction onClick={jest.fn()}>Ghost</TableBatchAction>
              </TableBatchActions>
              <TableToolbarContent>
                <TableToolbarSearch
                  persistent
                  onChange={onInputChange}
                  id="custom-id"
                />
                <TableToolbarMenu iconDescription="Settings">
                  <TableToolbarAction onClick={jest.fn()}>
                    Action 1
                  </TableToolbarAction>
                  <TableToolbarAction onClick={jest.fn()}>
                    Action 2
                  </TableToolbarAction>
                  <TableToolbarAction onClick={jest.fn()}>
                    Action 3
                  </TableToolbarAction>
                </TableToolbarMenu>
                <Button onClick={jest.fn()} size="sm" kind="primary">
                  Add new
                </Button>
              </TableToolbarContent>
            </TableToolbar>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header, i) => (
                    // TODO: `getHeaderProps` returns a `key`. Using it instead
                    // of overwriting it with the `key` prop may improve test
                    // coverage.
                    //
                    // This comment applies here and elsewhere.
                    <TableHeader key={i} {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  // TODO: `getRowProps` returns a `key`. Using it may improve
                  // test coverage.
                  //
                  // This comment applies here and elsewhere.
                  <TableRow key={row.id}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      ),
    };
  });

  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      const { container } = render(<DataTable {...mockProps} />);

      expect(container.firstChild).toHaveAttribute('data-testid', 'test-id');
    });

    it('should render and match snapshot', () => {
      const { container } = render(<DataTable {...mockProps} />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('behaves as expected', () => {
    describe('sorting', () => {
      it('should sort a row by a header when a header is clicked', async () => {
        render(<DataTable isSortable={true} {...mockProps} />);
        const header = within(screen.getAllByRole('columnheader')[0]).getByRole(
          'button'
        );
        const cells = () => {
          return screen.getAllByRole('cell').map((cell) => {
            return cell.textContent;
          });
        };

        expect(cells()).toEqual([
          'Field 2:A',
          'Field 2:B',
          'Field 1:A',
          'Field 1:B',
          'Field 3:A',
          'Field 3:B',
        ]);

        // Click to sort rows by Field A in ascending order
        await userEvent.click(header);
        expect(cells()).toEqual([
          'Field 1:A',
          'Field 1:B',
          'Field 2:A',
          'Field 2:B',
          'Field 3:A',
          'Field 3:B',
        ]);

        // Click to sort rows by Field A in descending order
        await userEvent.click(header);
        expect(cells()).toEqual([
          'Field 3:A',
          'Field 3:B',
          'Field 2:A',
          'Field 2:B',
          'Field 1:A',
          'Field 1:B',
        ]);

        // Click to unsort rows by Field A in descending order
        await userEvent.click(header);
        expect(cells()).toEqual([
          'Field 2:A',
          'Field 2:B',
          'Field 1:A',
          'Field 1:B',
          'Field 3:A',
          'Field 3:B',
        ]);
      });

      it('should re-sort new row props by the current sort state', async () => {
        const { rerender } = render(
          <DataTable isSortable={true} {...mockProps} />
        );
        const header = within(screen.getAllByRole('columnheader')[0]).getByRole(
          'button'
        );

        const cells = () => {
          return screen.getAllByRole('cell').map((cell) => {
            return cell.textContent;
          });
        };

        // Click to sort rows by Field A in ascending order
        await userEvent.click(header);
        expect(cells()).toEqual([
          'Field 1:A',
          'Field 1:B',
          'Field 2:A',
          'Field 2:B',
          'Field 3:A',
          'Field 3:B',
        ]);

        rerender(<DataTable isSortable={true} {...mockProps} />);
        expect(cells()).toEqual([
          'Field 1:A',
          'Field 1:B',
          'Field 2:A',
          'Field 2:B',
          'Field 3:A',
          'Field 3:B',
        ]);
      });

      it('should reset to ASC ordering when another header is clicked', async () => {
        render(<DataTable isSortable={true} {...mockProps} />);

        const firstHeader = () => screen.getAllByRole('columnheader')[0];
        const secondHeader = () => screen.getAllByRole('columnheader')[1];
        const firstHeaderButton = within(firstHeader()).getByRole('button');
        const secondHeaderButton = within(secondHeader()).getByRole('button');

        expect(firstHeader()).toHaveTextContent('ascending');

        await userEvent.click(firstHeaderButton);
        expect(firstHeader()).toHaveTextContent('descending');

        await userEvent.click(firstHeaderButton);
        expect(firstHeader()).toHaveTextContent('unsort');

        await userEvent.click(secondHeaderButton);
        // After clicking the second header once, the table will now be
        // sorted ascending based on that header, which means the button
        // should now be in a state where clicking _again_ will sort it
        // "descending" via that header:
        expect(secondHeader()).toHaveTextContent('descending');
      });
    });

    describe('filtering', () => {
      it('should filter rows by the given input', async () => {
        render(<DataTable isSortable={true} {...mockProps} />);
        const filterInput = screen.getByRole('searchbox');

        // +1 for the header row
        expect(screen.getAllByRole('row').length).toBe(
          mockProps.rows.length + 1
        );

        await userEvent.type(filterInput, 'Field 1');

        expect(mockProps.render).toHaveBeenCalledWith(
          expect.objectContaining({
            rows: [
              expect.objectContaining({
                id: 'a',
              }),
            ],
          })
        );
      });
    });

    describe('selection', () => {
      let mockProps;
      let spy;

      beforeEach(() => {
        // v12 TODO: Remove the mock of console.warn once we remove ariaLabel from DataTable
        spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        mockProps = {
          rows: [
            {
              id: 'b',
              fieldA: 'Field 2:A',
              fieldB: 'Field 2:B',
            },
            {
              id: 'a',
              fieldA: 'Field 1:A',
              fieldB: 'Field 1:B',
            },
            {
              id: 'c',
              fieldA: 'Field 3:A',
              fieldB: 'Field 3:B',
            },
          ],
          headers: [
            {
              key: 'fieldA',
              header: 'Field A',
            },
            {
              key: 'fieldB',
              header: 'Field B',
            },
          ],
          locale: 'en',
          render: jest.fn(
            ({
              rows,
              headers,
              getHeaderProps,
              getSelectionProps,
              getBatchActionProps,
              onInputChange,
            }) => (
              <TableContainer title="DataTable with selection">
                <TableToolbar>
                  <TableBatchActions
                    {...getBatchActionProps({
                      onSelectAll: onSelectAllFn,
                    })}>
                    <TableBatchAction onClick={jest.fn()}>
                      Ghost
                    </TableBatchAction>
                    <TableBatchAction onClick={jest.fn()}>
                      Ghost
                    </TableBatchAction>
                    <TableBatchAction onClick={jest.fn()}>
                      Ghost
                    </TableBatchAction>
                  </TableBatchActions>
                  <TableToolbarContent>
                    <TableToolbarSearch
                      persistent
                      onChange={onInputChange}
                      id="custom-id"
                    />
                    <TableToolbarMenu iconDescription="Settings">
                      <TableToolbarAction onClick={jest.fn()}>
                        Action 1
                      </TableToolbarAction>
                      <TableToolbarAction onClick={jest.fn()}>
                        Action 2
                      </TableToolbarAction>
                      <TableToolbarAction onClick={jest.fn()}>
                        Action 3
                      </TableToolbarAction>
                    </TableToolbarMenu>
                    <Button onClick={jest.fn()} size="sm" kind="primary">
                      Add new
                    </Button>
                  </TableToolbarContent>
                </TableToolbar>
                <Table>
                  <TableHead>
                    <TableRow>
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
                      <TableRow key={row.id}>
                        <TableSelectRow {...getSelectionProps({ row })} />
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )
          ),
        };
      });

      afterEach(() => {
        spy.mockRestore();
      });

      it('should render and match snapshot', () => {
        const { container } = render(<DataTable {...mockProps} />);
        expect(container).toMatchSnapshot();
      });

      it('should have select-all default to un-checked if no rows are present', () => {
        render(<DataTable {...mockProps} rows={[]} />);
        expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked();
      });

      it('should select all rows if a user interacts with select all', async () => {
        render(<DataTable {...mockProps} />);
        const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
        expect(selectAllCheckbox).not.toBeChecked();

        await userEvent.click(selectAllCheckbox);

        expect(selectAllCheckbox).toBeChecked();

        const { selectedRows } = getLastCallFor(mockProps.render)[0];
        expect(selectedRows.length).toBe(mockProps.rows.length);
      });

      it('should select a specific row when a user interacts with select row', async () => {
        render(<DataTable {...mockProps} />);
        const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
        const firstRowCheckbox = screen.getAllByRole('checkbox')[1];

        expect(selectAllCheckbox).not.toBeChecked();
        expect(firstRowCheckbox).not.toBeChecked();

        await userEvent.click(firstRowCheckbox);

        expect(firstRowCheckbox).toBeChecked();
        expect(selectAllCheckbox).toBePartiallyChecked();

        const { selectedRows } = getLastCallFor(mockProps.render)[0];
        expect(selectedRows.length).toBe(1);
      });

      it('should deselect all rows when batch action cancel is invoked', async () => {
        render(<DataTable {...mockProps} />);
        const selectAllCheckbox = screen.getAllByRole('checkbox')[0];

        await userEvent.click(selectAllCheckbox);
        expect(selectAllCheckbox).toBeChecked();

        const { getBatchActionProps } = getLastCallFor(mockProps.render)[0];
        expect(getBatchActionProps().shouldShowBatchActions).toBe(true);

        const cancelButton = await screen.findByText('Cancel');
        await userEvent.click(cancelButton);

        expect(selectAllCheckbox).not.toBeChecked();
        const { selectedRows } = getLastCallFor(mockProps.render)[0];
        expect(selectedRows.length).toBe(0);
      });

      it('should call the onSelectAll prop if supplied to TableBatchAction component', async () => {
        render(<DataTable {...mockProps} />);
        const selectAllCheckbox = screen.getAllByRole('checkbox')[0];

        await userEvent.click(selectAllCheckbox);
        expect(selectAllCheckbox).toBeChecked();

        const selectAllButton = screen.getByText(`Select all (${rows.length})`);
        await userEvent.click(selectAllButton);
        expect(onSelectAllFn).toHaveBeenCalledTimes(1);
      });
    });

    describe('selection with filtering', () => {
      let mockProps;

      beforeEach(() => {
        mockProps = {
          rows: [
            {
              id: 'b',
              fieldA: 'Field 2:A',
              fieldB: 'Field 2:B',
            },
            {
              id: 'a',
              fieldA: 'Field 1:A',
              fieldB: 'Field 1:B',
            },
            {
              id: 'c',
              fieldA: 'Field 3:A',
              fieldB: 'Field 3:B',
            },
          ],
          headers: [
            {
              key: 'fieldA',
              header: 'Field A',
            },
            {
              key: 'fieldB',
              header: 'Field B',
            },
          ],
          locale: 'en',
          render: jest.fn(
            ({
              rows,
              headers,
              getHeaderProps,
              getSelectionProps,
              onInputChange,
            }) => (
              <TableContainer title="DataTable with selection">
                <TableToolbar>
                  <TableToolbarContent>
                    <TableToolbarSearch
                      persistent
                      onChange={onInputChange}
                      id="custom-id"
                    />
                    <TableToolbarMenu iconDescription="Settings">
                      <TableToolbarAction onClick={jest.fn()}>
                        Action 1
                      </TableToolbarAction>
                      <TableToolbarAction onClick={jest.fn()}>
                        Action 2
                      </TableToolbarAction>
                      <TableToolbarAction onClick={jest.fn()}>
                        Action 3
                      </TableToolbarAction>
                    </TableToolbarMenu>
                    <Button onClick={jest.fn()} size="sm" kind="primary">
                      Add new
                    </Button>
                  </TableToolbarContent>
                </TableToolbar>
                <Table>
                  <TableHead>
                    <TableRow>
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
                      <TableRow key={row.id}>
                        <TableSelectRow {...getSelectionProps({ row })} />
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )
          ),
        };
      });

      it('should only select all from filtered items', async () => {
        render(<DataTable {...mockProps} />);

        const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
        const firstRowCheckbox = () => screen.getAllByRole('checkbox')[1];
        const filterInput = screen.getByRole('searchbox');

        expect(selectAllCheckbox).not.toBeChecked();

        await userEvent.type(filterInput, 'Field 1');
        await userEvent.click(firstRowCheckbox());
        await userEvent.clear(filterInput);

        expect(selectAllCheckbox).toBePartiallyChecked();

        let { selectedRows } = getLastCallFor(mockProps.render)[0];
        expect(selectedRows.length).toBe(1);

        await userEvent.click(selectAllCheckbox);

        selectedRows = getLastCallFor(mockProps.render)[0].selectedRows;
        expect(selectedRows.length).toBe(0);
      });

      it('should only select rows that are not disabled even when filtered', async () => {
        const nextRows = [
          ...mockProps.rows.map((row) => ({ ...row })),
          {
            id: 'd',
            fieldA: 'Field 3:A',
            fieldB: 'Field 3:B',
            disabled: true,
          },
        ];
        render(<DataTable {...mockProps} rows={nextRows} />);

        const filterInput = screen.getByRole('searchbox');
        const selectAllCheckbox = screen.getAllByRole('checkbox')[0];

        await userEvent.type(filterInput, 'Field 3');
        await userEvent.click(selectAllCheckbox);

        const { selectedRows } = getLastCallFor(mockProps.render)[0];
        expect(selectedRows.length).toBe(1);

        expect(selectAllCheckbox).toBePartiallyChecked();
      });

      it('does not select a row if they are all disabled', async () => {
        const nextRows = [
          ...mockProps.rows.map((row) => ({ ...row, disabled: true })),
        ];
        render(<DataTable {...mockProps} rows={nextRows} />);
        const selectAllCheckbox = screen.getAllByRole('checkbox')[0];

        await userEvent.click(selectAllCheckbox);

        expect(selectAllCheckbox).not.toBePartiallyChecked();
        expect(selectAllCheckbox).not.toBeChecked();

        const filterInput = screen.getByRole('searchbox');

        await userEvent.type(filterInput, 'Field 3');
        await userEvent.click(selectAllCheckbox);

        const { selectedRows } = getLastCallFor(mockProps.render)[0];
        expect(selectedRows.length).toBe(0);
      });
    });

    describe('selection -- radio buttons', () => {
      let mockProps;

      beforeEach(() => {
        mockProps = {
          rows: [
            {
              id: 'b',
              fieldA: 'Field 2:A',
              fieldB: 'Field 2:B',
            },
            {
              id: 'a',
              fieldA: 'Field 1:A',
              fieldB: 'Field 1:B',
            },
            {
              id: 'c',
              fieldA: 'Field 3:A',
              fieldB: 'Field 3:B',
            },
          ],
          headers: [
            {
              key: 'fieldA',
              header: 'Field A',
            },
            {
              key: 'fieldB',
              header: 'Field B',
            },
          ],
          locale: 'en',
          radio: true,
          render: jest.fn(
            ({ rows, headers, getHeaderProps, getSelectionProps }) => (
              <TableContainer title="DataTable with selection">
                <Table>
                  <TableHead>
                    <TableRow>
                      {headers.map((header, i) => (
                        <TableHeader key={i} {...getHeaderProps({ header })}>
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableSelectRow {...getSelectionProps({ row })} />
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )
          ),
        };
      });

      it('should render', () => {
        const { container } = render(<DataTable {...mockProps} />);
        expect(container).toMatchSnapshot();
      });

      it('should not have select-all checkbox', () => {
        const { container } = render(<DataTable {...mockProps} />);
        expect(screen.queryAllByRole('checkbox').length).toBe(0);
        expect(container).toMatchSnapshot();
      });

      it('should select a specific row when a user interacts with select row', async () => {
        render(<DataTable {...mockProps} />);
        const radioButton = screen.getAllByRole('radio')[0];

        expect(radioButton).not.toBeChecked();

        await userEvent.click(radioButton);
        expect(radioButton).toBeChecked();

        const { selectedRows } = getLastCallFor(mockProps.render)[0];
        expect(selectedRows.length).toBe(1);
      });

      it('should deselect all other rows when a row is selected', async () => {
        render(<DataTable {...mockProps} />);
        const radioButtonOne = screen.getAllByRole('radio')[0];
        const radioButtonTwo = screen.getAllByRole('radio')[1];

        expect(radioButtonOne).not.toBeChecked();

        await userEvent.click(radioButtonOne);

        expect(radioButtonOne).toBeChecked();
        expect(radioButtonTwo).not.toBeChecked();

        await userEvent.click(radioButtonTwo);
        expect(radioButtonOne).not.toBeChecked();
        expect(radioButtonTwo).toBeChecked();

        const { selectedRows } = getLastCallFor(mockProps.render)[0];
        expect(selectedRows.length).toBe(1);
      });
    });

    describe('updates properly when passed new props', () => {
      let mockProps;

      beforeEach(() => {
        mockProps = {
          rows: [
            {
              id: 'b',
              fieldA: 'Field 2:A',
              fieldB: 'Field 2:B',
            },
            {
              id: 'a',
              fieldA: 'Field 1:A',
              fieldB: 'Field 1:B',
            },
            {
              id: 'c',
              fieldA: 'Field 3:A',
              fieldB: 'Field 3:B',
            },
          ],
          headers: [
            {
              key: 'fieldA',
              header: 'Field A',
            },
            {
              key: 'fieldB',
              header: 'Field B',
            },
          ],
          locale: 'en',
          render: jest.fn(
            ({
              rows,
              headers,
              getHeaderProps,
              getExpandHeaderProps,
              getSelectionProps,
              getBatchActionProps,
              getRowProps,
              getExpandedRowProps,
              onInputChange,
            }) => (
              <TableContainer title="container">
                <TableToolbar>
                  <TableBatchActions {...getBatchActionProps()}>
                    <TableBatchAction onClick={jest.fn()}>
                      Ghost
                    </TableBatchAction>
                  </TableBatchActions>
                  <TableToolbarSearch onChange={onInputChange} />
                </TableToolbar>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableExpandHeader {...getExpandHeaderProps()} />
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
                        {row.isExpanded && (
                          <TableExpandedRow
                            {...getExpandedRowProps({ row })}
                            colSpan={headers.length + 3}>
                            <h1>Expandable row content</h1>
                            <p>Description here</p>
                          </TableExpandedRow>
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )
          ),
        };
      });

      it('should add additional rows when receiving new props', () => {
        const { rerender } = render(<DataTable {...mockProps} />);
        const args = mockProps.render.mock.calls[0][0];

        expect(args.rows.length).toEqual(mockProps.rows.length);

        const nextRows = [
          ...mockProps.rows,
          {
            id: 'd',
            fieldA: 'Field 4:A',
            fieldB: 'Field 4:B',
          },
        ];

        rerender(<DataTable {...mockProps} rows={nextRows} />);

        const nextArgs = getLastCallFor(mockProps.render)[0];
        expect(nextArgs.rows.length).toBe(nextRows.length);
        expect(nextArgs.rows.map((row) => row.id)).toEqual([
          'b',
          'a',
          'c',
          'd',
        ]);
      });

      it('should add additional headers when receiving new props', () => {
        const { rerender } = render(<DataTable {...mockProps} />);
        const args = mockProps.render.mock.calls[0][0];

        expect(args.headers).toEqual(mockProps.headers);

        const nextProps = {
          rows: mockProps.rows.map((row) => ({
            ...row,
            fieldC: 'Field X:C',
          })),
          headers: [
            ...mockProps.headers,
            {
              key: 'fieldC',
              header: 'Field C',
            },
          ],
        };

        rerender(<DataTable {...mockProps} {...nextProps} />);

        const nextArgs = getLastCallFor(mockProps.render)[0];
        expect(nextArgs.headers).toEqual(nextProps.headers);
      });

      it('should keep batch action after adding rows, as long as some existing rows are selected', async () => {
        const { rerender } = render(<DataTable {...mockProps} />);
        const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
        await userEvent.click(selectAllCheckbox);

        const nextRows = [
          ...mockProps.rows.map((row) => ({ ...row, isSelected: true })),
          {
            id: 'd',
            fieldA: 'Field 4:A',
            fieldB: 'Field 4:B',
            isSelected: false,
          },
        ];

        rerender(<DataTable {...mockProps} rows={nextRows} />);

        expect(selectAllCheckbox).not.toBeChecked();
        const { getBatchActionProps, selectedRows } = getLastCallFor(
          mockProps.render
        )[0];
        expect(getBatchActionProps().shouldShowBatchActions).toBe(true);
        expect(selectedRows.length).toBe(3);
      });

      it('should keep selected all state after adding rows, as long as all existing rows and new row are selected', async () => {
        const { rerender } = render(<DataTable {...mockProps} />);
        const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
        await userEvent.click(selectAllCheckbox);

        const nextRows = [
          ...mockProps.rows,
          {
            id: 'd',
            fieldA: 'Field 4:A',
            fieldB: 'Field 4:B',
          },
        ];

        rerender(<DataTable {...mockProps} rows={nextRows} />);

        const { getBatchActionProps, selectedRows } = getLastCallFor(
          mockProps.render
        )[0];
        expect(getBatchActionProps().shouldShowBatchActions).toBe(true);
        expect(selectedRows.length).toBe(3);
      });

      it('should update rows when receiving new props', () => {
        const { rerender } = render(<DataTable {...mockProps} />);
        const args = mockProps.render.mock.calls[0][0];

        expect(args.rows.length).toEqual(mockProps.rows.length);

        const nextRows = mockProps.rows.slice().reverse();

        rerender(<DataTable {...mockProps} rows={nextRows} />);

        const nextArgs = getLastCallFor(mockProps.render)[0];
        expect(nextArgs.rows.map((row) => row.id)).toEqual(['c', 'a', 'b']);
      });

      it('should update cells when receiving new props', () => {
        const { rerender } = render(<DataTable {...mockProps} />);
        const args = mockProps.render.mock.calls[0][0];

        expect(args.rows.length).toEqual(mockProps.rows.length);

        const nextRows = mockProps.rows.map((row) => {
          return {
            ...row,
            fieldA: row.fieldA + '!',
          };
        });

        rerender(<DataTable {...mockProps} rows={nextRows} />);

        const nextArgs = getLastCallFor(mockProps.render)[0];
        expect(nextArgs.rows.map((row) => row.cells[0].value)).toEqual([
          'Field 2:A!',
          'Field 1:A!',
          'Field 3:A!',
        ]);
      });
    });

    describe('row click behavior', () => {
      it('should call onClick handler passed via getRowProps when row is clicked', async () => {
        const handleClick = jest.fn();

        render(
          <DataTable
            {...mockProps}
            render={({ rows, headers, getRowProps, getHeaderProps }) => (
              <TableContainer title="Test table">
                <Table>
                  <TableHead>
                    <TableRow>
                      {headers.map((header) => (
                        <TableHeader {...getHeaderProps({ header })}>
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        {...getRowProps({ row, onClick: handleClick })}
                        data-testid={`row-${row.id}`}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          />
        );

        const firstRow = screen.getByTestId('row-b');
        await userEvent.click(firstRow);

        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});
