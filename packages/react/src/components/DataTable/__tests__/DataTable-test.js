/**
 * Copyright IBM Corp. 2016, 2018
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
import { mount } from 'enzyme';

// Test helpers
const getHeaderAt = (wrapper, index) =>
  wrapper.find('TableHeader button').at(index);
const getRowAt = (wrapper, index) => wrapper.find('tbody tr').at(index);
const getFilterInput = (wrapper) =>
  wrapper.find('TableToolbarSearch Search input');
const getSelectAll = (wrapper) =>
  wrapper.find('TableSelectAll input[type="checkbox"]');
const getLastCallFor = (mocker) =>
  mocker.mock.calls[mocker.mock.calls.length - 1];
const getInputAtIndex = ({ wrapper, index, inputType }) =>
  getRowAt(wrapper, index).find(`input[type="${inputType}"]`);

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
                <Button onClick={jest.fn()} size="small" kind="primary">
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

  it('should render', () => {
    const wrapper = mount(<DataTable {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('sorting', () => {
    it('should sort a row by a header when a header is clicked', () => {
      const wrapper = mount(<DataTable isSortable={true} {...mockProps} />);
      const header = getHeaderAt(wrapper, 0);
      header.simulate('click');
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

  describe('filtering', () => {
    it('should filter rows by the given input', () => {
      const wrapper = mount(<DataTable {...mockProps} />);
      const filterInput = getFilterInput(wrapper);

      expect(wrapper.state('rowIds').length).toBe(mockProps.rows.length);

      filterInput.getDOMNode().value = 'Field 1';
      filterInput.simulate('change');

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
          ({ rows, headers, getHeaderProps, getSelectionProps }) => (
            <TableContainer title="DataTable with selection">
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

    it('should render', () => {
      const wrapper = mount(<DataTable {...mockProps} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should have select-all default to un-checked if no rows are present', () => {
      const wrapper = mount(<DataTable {...mockProps} rows={[]} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should select all rows if a user interacts with select all', () => {
      const wrapper = mount(<DataTable {...mockProps} />);
      expect(getSelectAll(wrapper).prop('checked')).toBe(false);

      getSelectAll(wrapper).simulate('click');

      expect(getSelectAll(wrapper).prop('checked')).toBe(true);

      const { selectedRows } = getLastCallFor(mockProps.render)[0];
      expect(selectedRows.length).toBe(mockProps.rows.length);
    });

    it('should select a specific row when a user interacts with select row', () => {
      const wrapper = mount(<DataTable {...mockProps} />);
      expect(getSelectAll(wrapper).prop('checked')).toBe(false);
      expect(
        getInputAtIndex({ wrapper, index: 0, inputType: 'checkbox' }).prop(
          'checked'
        )
      ).toBe(false);

      getInputAtIndex({ wrapper, index: 0, inputType: 'checkbox' }).simulate(
        'click'
      );
      expect(
        getInputAtIndex({ wrapper, index: 0, inputType: 'checkbox' }).prop(
          'checked'
        )
      ).toBe(true);

      const { selectedRows } = getLastCallFor(mockProps.render)[0];
      expect(selectedRows.length).toBe(1);
    });

    it('should deselect all rows when onCancel invoked', () => {
      const wrapper = mount(<DataTable {...mockProps} />);
      getSelectAll(wrapper).simulate('click');
      expect(getSelectAll(wrapper).prop('checked')).toBe(true);

      const { getBatchActionProps } = getLastCallFor(mockProps.render)[0];
      expect(getBatchActionProps().shouldShowBatchActions).toBe(true);

      getBatchActionProps().onCancel();

      wrapper.update();

      expect(getSelectAll(wrapper).prop('checked')).toBe(false);
      const { selectedRows } = getLastCallFor(mockProps.render)[0];
      expect(selectedRows.length).toBe(0);
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
                  <Button onClick={jest.fn()} size="small" kind="primary">
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

    it('should only select all from filtered items', () => {
      const wrapper = mount(<DataTable {...mockProps} />);

      expect(getSelectAll(wrapper).prop('checked')).toBe(false);

      const filterInput = getFilterInput(wrapper);

      filterInput.getDOMNode().value = 'Field 1';
      filterInput.simulate('change');

      getInputAtIndex({ wrapper, index: 0, inputType: 'checkbox' }).simulate(
        'click'
      );

      filterInput.getDOMNode().value = '';
      filterInput.simulate('change');

      expect(wrapper.find('TableSelectAll').prop('indeterminate')).toBe(true);

      let { selectedRows } = getLastCallFor(mockProps.render)[0];
      expect(selectedRows.length).toBe(1);

      getSelectAll(wrapper).simulate('click');

      selectedRows = getLastCallFor(mockProps.render)[0].selectedRows;
      expect(selectedRows.length).toBe(0);
    });

    it('should only select rows that are not disabled even when filtered', () => {
      const wrapper = mount(<DataTable {...mockProps} />);

      const nextRows = [
        ...mockProps.rows.map((row) => ({ ...row })),
        {
          id: 'd',
          fieldA: 'Field 3:A',
          fieldB: 'Field 3:B',
          disabled: true,
        },
      ];

      wrapper.setProps({ rows: nextRows });

      const filterInput = getFilterInput(wrapper);

      filterInput.getDOMNode().value = 'Field 3';
      filterInput.simulate('change');

      getSelectAll(wrapper).simulate('click');

      const { selectedRows } = getLastCallFor(mockProps.render)[0];
      expect(selectedRows.length).toBe(1);

      expect(wrapper.find('TableSelectAll').prop('indeterminate')).toBe(true);
    });

    it('does not select a row if they are all disabled', () => {
      const wrapper = mount(<DataTable {...mockProps} />);

      const nextRows = [
        ...mockProps.rows.map((row) => ({ ...row, disabled: true })),
      ];

      wrapper.setProps({ rows: nextRows });

      getSelectAll(wrapper).simulate('click');

      expect(wrapper.find('TableSelectAll').prop('indeterminate')).toBe(false);
      expect(wrapper.find('TableSelectAll').prop('checked')).toBe(false);

      const filterInput = getFilterInput(wrapper);

      filterInput.getDOMNode().value = 'Field 3';
      filterInput.simulate('change');

      getSelectAll(wrapper).simulate('click');

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
      const wrapper = mount(<DataTable {...mockProps} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should not have select-all checkbox', () => {
      const wrapper = mount(<DataTable {...mockProps} rows={[]} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should select a specific row when a user interacts with select row', () => {
      const wrapper = mount(<DataTable {...mockProps} />);
      expect(
        getInputAtIndex({ wrapper, index: 0, inputType: 'radio' }).prop(
          'checked'
        )
      ).toBe(false);

      getInputAtIndex({ wrapper, index: 0, inputType: 'radio' }).simulate(
        'click'
      );
      expect(
        getInputAtIndex({ wrapper, index: 0, inputType: 'radio' }).prop(
          'checked'
        )
      ).toBe(true);

      const { selectedRows } = getLastCallFor(mockProps.render)[0];
      expect(selectedRows.length).toBe(1);
    });

    it('should deselect all other rows when a row is selected', () => {
      const wrapper = mount(<DataTable {...mockProps} />);
      expect(
        getInputAtIndex({ wrapper, index: 0, inputType: 'radio' }).prop(
          'checked'
        )
      ).toBe(false);

      getInputAtIndex({ wrapper, index: 0, inputType: 'radio' }).simulate(
        'click'
      );
      expect(
        getInputAtIndex({ wrapper, index: 0, inputType: 'radio' }).prop(
          'checked'
        )
      ).toBe(true);
      expect(
        getInputAtIndex({ wrapper, index: 1, inputType: 'radio' }).prop(
          'checked'
        )
      ).toBe(false);

      getInputAtIndex({ wrapper, index: 1, inputType: 'radio' }).simulate(
        'click'
      );
      expect(
        getInputAtIndex({ wrapper, index: 0, inputType: 'radio' }).prop(
          'checked'
        )
      ).toBe(false);
      expect(
        getInputAtIndex({ wrapper, index: 1, inputType: 'radio' }).prop(
          'checked'
        )
      ).toBe(true);

      const { selectedRows } = getLastCallFor(mockProps.render)[0];
      expect(selectedRows.length).toBe(1);
    });
  });

  describe('componentDidUpdate', () => {
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
            onInputChange,
          }) => (
            <TableContainer title="container">
              <TableToolbar>
                <TableBatchActions {...getBatchActionProps()}>
                  <TableBatchAction onClick={jest.fn()}>Ghost</TableBatchAction>
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
                        <TableExpandedRow colSpan={headers.length + 3}>
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
      const wrapper = mount(<DataTable {...mockProps} />);
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

      wrapper.setProps({ rows: nextRows });

      const nextArgs = getLastCallFor(mockProps.render)[0];
      expect(nextArgs.rows.length).toBe(nextRows.length);
      expect(nextArgs.rows.map((row) => row.id)).toEqual(['b', 'a', 'c', 'd']);
    });

    it('should add additional headers when receiving new props', () => {
      const wrapper = mount(<DataTable {...mockProps} />);
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

      wrapper.setProps(nextProps);

      const nextArgs = getLastCallFor(mockProps.render)[0];
      expect(nextArgs.headers).toEqual(nextProps.headers);
    });

    it('should keep batch action after adding rows, as long as some existing rows are selected', () => {
      const wrapper = mount(<DataTable {...mockProps} />);
      getSelectAll(wrapper).simulate('click');

      const nextRows = [
        ...mockProps.rows.map((row) => ({ ...row, isSelected: true })),
        {
          id: 'd',
          fieldA: 'Field 4:A',
          fieldB: 'Field 4:B',
          isSelected: false,
        },
      ];

      wrapper.setProps({ rows: nextRows });
      wrapper.update();

      expect(getSelectAll(wrapper).prop('checked')).toBe(false);
      const { getBatchActionProps, selectedRows } = getLastCallFor(
        mockProps.render
      )[0];
      expect(getBatchActionProps().shouldShowBatchActions).toBe(true);
      expect(selectedRows.length).toBe(3);
    });

    it('should keep selected all state after adding rows, as long as all existing rows and new row are selected', () => {
      const wrapper = mount(<DataTable {...mockProps} />);
      getSelectAll(wrapper).simulate('click');

      const nextRows = [
        ...mockProps.rows,
        {
          id: 'd',
          fieldA: 'Field 4:A',
          fieldB: 'Field 4:B',
        },
      ];

      wrapper.setProps({ rows: nextRows });

      const { getBatchActionProps, selectedRows } = getLastCallFor(
        mockProps.render
      )[0];
      expect(getBatchActionProps().shouldShowBatchActions).toBe(true);
      expect(selectedRows.length).toBe(3);
    });

    it('should update rows when receiving new props', () => {
      const wrapper = mount(<DataTable {...mockProps} />);
      const args = mockProps.render.mock.calls[0][0];

      expect(args.rows.length).toEqual(mockProps.rows.length);

      const nextRows = mockProps.rows.slice().reverse();

      wrapper.setProps({ rows: nextRows });

      const nextArgs = getLastCallFor(mockProps.render)[0];
      expect(nextArgs.rows.map((row) => row.id)).toEqual(['c', 'a', 'b']);
    });

    it('should update cells when receiving new props', () => {
      const wrapper = mount(<DataTable {...mockProps} />);
      const args = mockProps.render.mock.calls[0][0];

      expect(args.rows.length).toEqual(mockProps.rows.length);

      const nextRows = mockProps.rows.map((row) => {
        return {
          ...row,
          fieldA: row.fieldA + '!',
        };
      });

      wrapper.setProps({ rows: nextRows });

      const nextArgs = getLastCallFor(mockProps.render)[0];
      expect(nextArgs.rows.map((row) => row.cells[0].value)).toEqual([
        'Field 2:A!',
        'Field 1:A!',
        'Field 3:A!',
      ]);
    });
  });

  describe('sticky header', () => {
    it('should render', () => {
      const wrapper = mount(<DataTable stickyHeader={true} {...mockProps} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
