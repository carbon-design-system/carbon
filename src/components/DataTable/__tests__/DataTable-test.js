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
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarSearch,
} from '../';
import { sortStates } from '../state/sorting';
import { mount } from 'enzyme';

const getHeaderAt = (wrapper, index) =>
  wrapper.find('TableHeader button').at(index);
const getFilterInput = wrapper => wrapper.find('TableToolbarSearch input');

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
            <TableToolbarSearch onChange={onInputChange} />
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
});
