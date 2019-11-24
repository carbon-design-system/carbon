/**
 * Copyright IBM Corp. 2016, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import { TableToolbarSettingSize } from '..';

describe('DataTable.TableToolbarSettingSize', () => {
  const mockOnChange = jest.fn();
  const mockHandleMenuItemFocus = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const wrapper = mount(
      <TableToolbarSettingSize
        size='short'
        sizeOptions={['normal', 'short']}
        onChange={mockOnChange}
        handleMenuItemFocus={mockHandleMenuItemFocus}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle onChange', () => {
    const wrapper = mount(
      <TableToolbarSettingSize
        size='short'
        sizeOptions={['normal', 'short']}
        onChange={mockOnChange}
        handleMenuItemFocus={mockHandleMenuItemFocus}
      />
    );

    // select 'normal'
    wrapper.find('input[id="normal"]').simulate('change', { target: { checked: true } })
    expect(mockOnChange.mock.calls.length).toEqual(1);
    expect(mockOnChange.mock.calls[0]).toEqual(['normal']);
  });
});
