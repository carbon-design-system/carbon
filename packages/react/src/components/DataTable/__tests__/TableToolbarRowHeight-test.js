/**
 * Copyright IBM Corp. 2016, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import { TableToolbarRowHeight } from '..';

describe('DataTable.TableToolbarRowHeight', () => {
  const mockOnChange = jest.fn();
  const mockHandleMenuItemFocus = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const initialSelected = 'short';
    const wrapper = mount(
      <TableToolbarRowHeight
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
      <TableToolbarRowHeight
        initialSelected={initialSelected}
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
