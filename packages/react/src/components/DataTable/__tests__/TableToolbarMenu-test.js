/**
 * Copyright IBM Corp. 2016, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { Download16 } from '@carbon/icons-react';
import { TableToolbarMenu } from '..';

describe('DataTable.TableToolbarMenu', () => {
  it('should render', () => {
    const wrapper = mount(
      <TableToolbarMenu
        className="custom-class"
        renderIcon={Download16}
        iconDescription="Add"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Custom icon in DataTable.TableToolbarMenu', () => {
  it('should render', () => {
    const iconAction = mount(
      <TableToolbarMenu renderIcon={Download16} iconDescription="Download" />
    );
    const originalIcon = mount(<Download16 />).find('svg');
    const icon = iconAction.find('svg');
    expect(icon.find(':not(svg):not(title)').html()).toBe(
      originalIcon.children().html()
    );
  });
});

describe('Handle menu item focus on arrow keys', () => {
  const stub = () => (
    <div>stub</div>
  );
  const mockNode1Focus = jest.fn();
  const mockNode2Focus = jest.fn();
  const mockNode3Focus = jest.fn();

  beforeEach(() => {
    document.querySelectorAll = jest.fn(() => ([
      { focus: mockNode1Focus },
      { focus: mockNode2Focus },
      { focus: mockNode3Focus },
    ]));    
  });

  it('should change focus when down arrow key pressed', async () => {
    const wrapper = mount(
      <TableToolbarMenu open={true}>
        <stub />
      </TableToolbarMenu>
    );

    // down from first to second
    jest.clearAllMocks();
    await act(() => {
      wrapper.find('stub').prop('handleMenuItemFocus')({ key: 'ArrowDown' });
    });
    expect(mockNode1Focus).toHaveBeenCalledTimes(0);
    expect(mockNode2Focus).toHaveBeenCalledTimes(1);
    expect(mockNode3Focus).toHaveBeenCalledTimes(0);
  });

  it('should change focus when up arrow key pressed', async () => {
    const wrapper = mount(
      <TableToolbarMenu open={true}>
        <stub />
      </TableToolbarMenu>
    );

    // up from first to last (wrap around)
    jest.clearAllMocks();
    await act(() => {
      wrapper.find('stub').prop('handleMenuItemFocus')({ key: 'ArrowUp' });
    });
    expect(mockNode1Focus).toHaveBeenCalledTimes(0);
    expect(mockNode2Focus).toHaveBeenCalledTimes(0);
    expect(mockNode3Focus).toHaveBeenCalledTimes(1);
  });

  it('should ignore invalid key press', async () => {
    const wrapper = mount(
      <TableToolbarMenu open={true}>
        <stub />
      </TableToolbarMenu>
    );

    // invalid key pressed
    jest.clearAllMocks();
    await act(() => {
      wrapper.find('stub').prop('handleMenuItemFocus')({ key: 'ArrowRight' });
    });
    expect(mockNode1Focus).toHaveBeenCalledTimes(0);
    expect(mockNode2Focus).toHaveBeenCalledTimes(0);
    expect(mockNode3Focus).toHaveBeenCalledTimes(0);
  });

  it('should ignore when no focusable items found', async () => {
    document.querySelectorAll = jest.fn(() => ([]));    
    const wrapper = mount(
      <TableToolbarMenu open={true}>
        <stub />
      </TableToolbarMenu>
    );

    // no focusable item found
    jest.clearAllMocks();
    await act(() => {
      wrapper.find('stub').prop('handleMenuItemFocus')({ key: 'ArrowDown' });
    });
    expect(mockNode1Focus).toHaveBeenCalledTimes(0);
    expect(mockNode2Focus).toHaveBeenCalledTimes(0);
    expect(mockNode3Focus).toHaveBeenCalledTimes(0);
  });
});
