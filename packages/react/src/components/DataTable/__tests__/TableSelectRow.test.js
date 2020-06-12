/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

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

  it('should render with the provided class name', () => {
    const customClassName = 'custom-table-select-row-classname';
    const wrapper = mount(
      <Table>
        <TableHead>
          <TableRow>
            <TableSelectRow {...mockProps} className={customClassName} />
          </TableRow>
        </TableHead>
      </Table>
    );
    const elements = wrapper.find(`td.${customClassName}`);
    expect(elements.length).toBe(1);
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
