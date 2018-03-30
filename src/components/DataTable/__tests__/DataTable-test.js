import React from 'react';
import Button from '../../Button';
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
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarSearch,
} from '../';
import { sortStates } from '../state/sorting';
import { mount } from 'enzyme';

// Test helpers
const getHeaderAt = (wrapper, index) =>
  wrapper.find('TableHeader button').at(index);
const getRowAt = (wrapper, index) => wrapper.find('tbody tr').at(index);
const getFilterInput = wrapper => wrapper.find('TableToolbarSearch input');
const getSelectAll = wrapper =>
  wrapper.find('TableSelectAll input[type="checkbox"]');
const getLastCallFor = mocker =>
  mocker.mock.calls[mocker.mock.calls.length - 1];

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
      render: jest.fn(({ rows, headers, getHeaderProps, onInputChange }) => (
        <TableContainer title="DataTable with toolbar">
          <TableToolbar>
            <TableToolbarSearch onChange={onInputChange} id="custom-id" />
            <TableToolbarContent>
              <TableToolbarAction
                iconName="download"
                iconDescription="Download"
                onClick={jest.fn()}
              />
              <TableToolbarAction
                iconName="edit"
                iconDescription="Edit"
                onClick={jest.fn()}
              />
              <TableToolbarAction
                iconName="settings"
                iconDescription="Settings"
                onClick={jest.fn()}
              />
              <Button onClick={jest.fn()} small kind="primary">
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
      )),
    };
  });

  it('should render', () => {
    const wrapper = mount(<DataTable {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('sorting', () => {
    it('should sort a row by a header when a header is clicked', () => {
      const wrapper = mount(<DataTable {...mockProps} />);
      const header = getHeaderAt(wrapper, 0);

      header.simulate('click');
      expect(wrapper.state('rowIds')).toEqual(['a', 'b', 'c']);

      header.simulate('click');
      expect(wrapper.state('rowIds')).toEqual(['c', 'b', 'a']);

      header.simulate('click');
      expect(wrapper.state('rowIds')).toEqual(['b', 'a', 'c']);
    });

    it('should re-sort new row props by the current sort state', () => {
      const wrapper = mount(<DataTable {...mockProps} />);
      const header = getHeaderAt(wrapper, 0);

      header.simulate('click');
      expect(wrapper.state('rowIds')).toEqual(['a', 'b', 'c']);

      wrapper.setProps({ rows: mockProps.rows });
      expect(wrapper.state('rowIds')).toEqual(['a', 'b', 'c']);
    });

    it('should reset to DESC ordering when another header is clicked', () => {
      const wrapper = mount(<DataTable {...mockProps} />);
      const firstHeader = getHeaderAt(wrapper, 0);
      const secondHeader = getHeaderAt(wrapper, 1);

      firstHeader.simulate('click');
      expect(wrapper.state('rowIds')).toEqual(['a', 'b', 'c']);

      firstHeader.simulate('click');
      expect(wrapper.state('rowIds')).toEqual(['c', 'b', 'a']);
      expect(wrapper.state('sortDirection')).toBe(sortStates.ASC);

      secondHeader.simulate('click');
      expect(wrapper.state('sortDirection')).toBe(sortStates.DESC);
    });
  });

  describe('filtering', () => {
    it('should filter rows by the given input', () => {
      const wrapper = mount(<DataTable {...mockProps} />);
      const filterInput = getFilterInput(wrapper);

      expect(wrapper.state('rowIds').length).toBe(mockProps.rows.length);

      filterInput.simulate('change', {
        target: {
          value: 'Field 1',
        },
      });

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

      const beforeInput = getRowAt(wrapper, 0).find('input[type="checkbox"]');
      expect(beforeInput.prop('checked')).toBe(false);

      beforeInput.simulate('click');

      const afterInput = getRowAt(wrapper, 0).find('input[type="checkbox"]');
      expect(afterInput.prop('checked')).toBe(true);

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
});
