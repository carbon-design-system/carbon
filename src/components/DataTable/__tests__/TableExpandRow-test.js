import React from 'react';
import { mount } from 'enzyme';
import { Table, TableBody, TableExpandRow, TableExpandedRow } from '../';

describe('DataTable.TableExpandRow', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      className: 'custom-class',
      isExpanded: false,
      onExpand: jest.fn(),
      ariaLabel: 'Aria label',
    };
  });

  it('should render', () => {
    const wrapper = mount(
      <Table>
        <TableBody>
          <TableExpandRow {...mockProps} />
          <TableExpandedRow />
        </TableBody>
      </Table>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should initially not define `data-previous-value`', () => {
    const wrapper = mount(
      <Table>
        <TableBody>
          <TableExpandRow {...mockProps} />
          <TableExpandedRow />
        </TableBody>
      </Table>
    );
    expect(
      Object.keys(wrapper.find('TableCell').props()).indexOf(
        'data-previous-value'
      ) !== -1
    ).toBe(true);
    expect(
      wrapper.find('TableCell').prop('data-previous-value')
    ).not.toBeDefined();
  });

  it('should expand when the expand button is clicked', () => {
    const initialWrapper = mount(
      <Table>
        <TableBody>
          <TableExpandRow {...mockProps} />
          <TableExpandedRow />
        </TableBody>
      </Table>
    );
    initialWrapper.find('button').simulate('click');
    expect(mockProps.onExpand).toHaveBeenCalledTimes(1);

    const expandedWrapper = mount(
      <Table>
        <TableBody>
          <TableExpandRow {...mockProps} isExpanded />
          <TableExpandedRow />
        </TableBody>
      </Table>
    );
    expect(expandedWrapper.find('TableCell').prop('data-previous-value')).toBe(
      'collapsed'
    );
  });
});
