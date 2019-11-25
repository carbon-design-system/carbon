/**
 * Copyright IBM Corp. 2016, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import { TableToolbarSettingColumns } from '..';

describe('DataTable.TableToolbarSettingColumns', () => {
  const mockOnChange = jest.fn();
  const mockHandleMenuItemFocus = jest.fn();

  const columns = [
    { key: 'column1', header: 'Column 1' },
    { key: 'column2', header: 'Column 2' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render - no columns defined', () => {
    const wrapper = mount(
      <TableToolbarSettingColumns />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render - some columns selected', () => {
    const initialSelected = ['column2'];
    const wrapper = mount(
      <TableToolbarSettingColumns
        columns={columns}
        initialSelected={initialSelected}
        onChange={mockOnChange}
        handleMenuItemFocus={mockHandleMenuItemFocus}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle onChange', () => {
    const initialSelected = ['column1'];
    const wrapper = mount(
      <TableToolbarSettingColumns
        columns={columns}
        initialSelected={initialSelected}
        onChange={mockOnChange}
        handleMenuItemFocus={mockHandleMenuItemFocus}
      />
    );

    // uncheck column1
    wrapper.find('input[id="column1"]').simulate('change', { target: { checked: false } });
    expect(mockOnChange.mock.calls.length).toEqual(1);
    expect(mockOnChange.mock.calls[0]).toEqual([[]]);

    jest.clearAllMocks();

    // check column2
    wrapper.find('input[id="column2"]').simulate('change', { target: { checked: true } });
    expect(mockOnChange.mock.calls.length).toEqual(1);
    expect(mockOnChange.mock.calls[0]).toEqual([['column2']]);
  });
});
