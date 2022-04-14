/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import FilterableMultiSelect from '../../MultiSelect/FilterableMultiSelect';
import {
  assertMenuOpen,
  assertMenuClosed,
  findMenuIconNode,
  generateItems,
  generateGenericItem,
} from '../../ListBox/test-helpers';

const listItemName = 'ListBoxMenuItem';
const openMenu = (wrapper) => {
  wrapper.find(`[role="combobox"]`).simulate('click');
};

describe('FilterableMultiSelect', () => {
  let mockProps;

  beforeEach(() => {
    // jest.mock('../../../internal/deprecateFieldOnObject');

    mockProps = {
      id: 'test-filterable-multiselect',
      disabled: false,
      items: generateItems(5, generateGenericItem),
      initialSelectedItems: [],
      onChange: jest.fn(),
      onMenuChange: jest.fn(),
      placeholder: 'Placeholder...',
    };
  });

  it('should render', () => {
    const wrapper = mount(<FilterableMultiSelect {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should display all items when the menu is open initially', () => {
    const wrapper = mount(<FilterableMultiSelect {...mockProps} />);
    openMenu(wrapper);
    expect(wrapper.find(listItemName).length).toBe(mockProps.items.length);
  });

  it('should initially have the menu open when open prop is provided', () => {
    const wrapper = mount(<FilterableMultiSelect {...mockProps} open />);
    assertMenuOpen(wrapper, mockProps);
  });

  it('should open the menu with a down arrow', () => {
    const wrapper = mount(<FilterableMultiSelect {...mockProps} />);
    const menuIconNode = findMenuIconNode(wrapper);

    menuIconNode.simulate('keyDown', { key: 'ArrowDown' });
    assertMenuOpen(wrapper, mockProps);
  });

  it('should let the user toggle the menu by the menu icon', () => {
    const wrapper = mount(<FilterableMultiSelect {...mockProps} />);
    findMenuIconNode(wrapper).simulate('click');
    assertMenuOpen(wrapper, mockProps);
    findMenuIconNode(wrapper).simulate('click');
    assertMenuClosed(wrapper);
  });

  it('should not close the menu after a user makes a selection', () => {
    const wrapper = mount(<FilterableMultiSelect {...mockProps} />);
    openMenu(wrapper);

    const firstListItem = wrapper.find(listItemName).at(0);

    firstListItem.simulate('click');
    assertMenuOpen(wrapper, mockProps);
  });

  it('should filter a list of items by the input value', () => {
    const wrapper = mount(<FilterableMultiSelect {...mockProps} />);
    openMenu(wrapper);
    expect(wrapper.find(listItemName).length).toBe(mockProps.items.length);

    wrapper
      .find('[placeholder="Placeholder..."]')
      .at(1)
      .simulate('change', { target: { value: '3' } });

    expect(wrapper.find(listItemName).length).toBe(1);
  });

  it('should call `onChange` with each update to selected items', () => {
    const wrapper = mount(
      <FilterableMultiSelect {...mockProps} selectionFeedback="top" />
    );
    openMenu(wrapper);

    // Select the first two items
    wrapper.find(listItemName).at(0).simulate('click');

    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItems: [mockProps.items[0]],
    });

    wrapper.find(listItemName).at(1).simulate('click');

    expect(mockProps.onChange).toHaveBeenCalledTimes(2);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItems: [mockProps.items[0], mockProps.items[1]],
    });

    // Un-select the next two items
    wrapper.find(listItemName).at(0).simulate('click');
    expect(mockProps.onChange).toHaveBeenCalledTimes(3);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItems: [mockProps.items[0]],
    });

    wrapper.find(listItemName).at(0).simulate('click');
    expect(mockProps.onChange).toHaveBeenCalledTimes(4);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItems: [],
    });
  });

  it('should let items stay at their position after selecting', () => {
    const wrapper = mount(
      <FilterableMultiSelect {...mockProps} selectionFeedback="fixed" />
    );
    openMenu(wrapper);

    // Select the first two items
    wrapper.find(listItemName).at(1).simulate('click');

    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItems: [mockProps.items[1]],
    });

    wrapper.find(listItemName).at(1).simulate('click');

    expect(mockProps.onChange).toHaveBeenCalledTimes(2);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItems: [],
    });
  });

  it('should not clear input value after a user makes a selection', () => {
    const wrapper = mount(<FilterableMultiSelect {...mockProps} />);
    openMenu(wrapper);

    wrapper
      .find('[placeholder="Placeholder..."]')
      .at(1)
      .simulate('change', { target: { value: '3' } });

    wrapper.find(listItemName).at(0).simulate('click');

    expect(
      wrapper.find('[placeholder="Placeholder..."]').at(1).props().value
    ).toEqual('3');
  });
});
