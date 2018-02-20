import React from 'react';
import { mount } from 'enzyme';
import { Table, TableHead, TableRow, TableSelectRow } from '../';

describe('DataTable.TableSelectRow', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      id: 'id',
      name: 'select-all',
      checked: false,
      onSelect: jest.fn(),
      className: 'custom-class-name',
      ariaLabel: 'Aria label',
    };
  });

  it('should render', () => {
    const wrapper = mount(
      <Table>
        <TableHead>
          <TableRow>
            <TableSelectRow {...mockProps} />
          </TableRow>
        </TableHead>
      </Table>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should invoke `onSelect` when clicked', () => {
    const wrapper = mount(
      <Table>
        <TableHead>
          <TableRow>
            <TableSelectRow {...mockProps} />
          </TableRow>
        </TableHead>
      </Table>
    );
    wrapper.find('InlineCheckbox input').simulate('click');
    expect(mockProps.onSelect).toHaveBeenCalledTimes(1);
  });
});
