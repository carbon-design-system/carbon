/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
          <TableExpandedRow colSpan={1} />
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
          <TableExpandedRow colSpan={1} />
        </TableBody>
      </Table>
    );
    expect(
      Object.keys(wrapper.find('TableCell').first().props()).indexOf(
        'data-previous-value'
      ) !== -1
    ).toBe(true);
    expect(
      wrapper.find('TableCell').first().prop('data-previous-value')
    ).not.toBeDefined();
  });

  it('should expand when the expand button is clicked', () => {
    const initialWrapper = mount(
      <Table>
        <TableBody>
          <TableExpandRow {...mockProps} />
          <TableExpandedRow colSpan={1} />
        </TableBody>
      </Table>
    );
    initialWrapper.find('button').simulate('click');
    expect(mockProps.onExpand).toHaveBeenCalledTimes(1);

    const expandedWrapper = mount(
      <Table>
        <TableBody>
          <TableExpandRow {...mockProps} isExpanded />
          <TableExpandedRow colSpan={1} />
        </TableBody>
      </Table>
    );
    expect(
      expandedWrapper.find('TableCell').first().prop('data-previous-value')
    ).toBe('collapsed');
  });
});
