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
import { sortStates } from '../state/sorting';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';

describe('DataTable', () => {
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
          onInputChange,
          getBatchActionProps,
          getTableProps,
          getTableContainerProps,
        }) => (
          <TableContainer
            title="DataTable with toolbar"
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
                <TableToolbarMenu>
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
                    <TableHeader key={i} {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
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
      const { container } = render(
        <DataTable data-testid="test-id" {...mockProps} />
      );

      expect(container.firstChild).toHaveAttribute('data-testid', 'test-id');
    });

    it('should render and match snapshot', () => {
      const { container } = render(<DataTable {...mockProps} />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('behaves as expected', () => {
    describe('sorting', () => {
      it('should sort a row by a header when a header is clicked', () => {
        render(<DataTable isSortable={true} {...mockProps} />);
        const header = screen
          .getAllByRole('row')
          .find((row) => within(row).queryByText('Field A') !== null);
        userEvent.click(header);

        const cells = getAllByRole('cell');
        expect(wrapper.state('rowIds')).toEqual(['a', 'b', 'c']);

        header.simulate('click');
        expect(wrapper.state('rowIds')).toEqual(['c', 'b', 'a']);

        header.simulate('click');
        expect(wrapper.state('rowIds')).toEqual(['b', 'a', 'c']);
      });

      it('should re-sort new row props by the current sort state', () => {
        const wrapper = mount(<DataTable isSortable={true} {...mockProps} />);
        const header = getHeaderAt(wrapper, 0);

        header.simulate('click');
        expect(wrapper.state('rowIds')).toEqual(['a', 'b', 'c']);

        wrapper.setProps({ rows: mockProps.rows });
        expect(wrapper.state('rowIds')).toEqual(['a', 'b', 'c']);
      });

      it('should reset to ASC ordering when another header is clicked', () => {
        const wrapper = mount(<DataTable isSortable={true} {...mockProps} />);

        const firstHeader = getHeaderAt(wrapper, 0);
        const secondHeader = getHeaderAt(wrapper, 1);

        firstHeader.simulate('click');
        expect(wrapper.state('rowIds')).toEqual(['a', 'b', 'c']);

        firstHeader.simulate('click');
        expect(wrapper.state('rowIds')).toEqual(['c', 'b', 'a']);
        expect(wrapper.state('sortDirection')).toBe(sortStates.DESC);

        secondHeader.simulate('click');
        expect(wrapper.state('sortDirection')).toBe(sortStates.ASC);
      });
    });
  });
});
