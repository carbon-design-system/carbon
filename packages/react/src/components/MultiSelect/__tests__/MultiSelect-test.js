/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import MultiSelect from '../../MultiSelect';
import {
  openMenu,
  generateItems,
  generateGenericItem,
} from '../../ListBox/test-helpers';
import { settings } from 'carbon-components';

const { prefix } = settings;

const mouseDownAndUp = node => {
  node.dispatchEvent(new window.MouseEvent('mousedown', { bubbles: true }));
  node.dispatchEvent(new window.MouseEvent('mouseup', { bubbles: true }));
};

describe('MultiSelect', () => {
  it('should render', () => {
    const wrapper = mount(
      <MultiSelect
        label="Field"
        items={generateItems(5, generateGenericItem)}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should initialize with no selected items if no `initialSelectedItems` are given', () => {
    const items = generateItems(5, generateGenericItem);
    const wrapper = mount(<MultiSelect label="Field" items={items} />);
    expect(wrapper.find('Selection').instance().state.selectedItems).toEqual(
      []
    );
  });
  it('should initialize with the menu not open', () => {
    const items = generateItems(5, generateGenericItem);
    const wrapper = mount(<MultiSelect label="Field" items={items} />);
    expect(wrapper.state('isOpen')).toEqual(false);
  });

  it('should initialize with the menu open', () => {
    const items = generateItems(5, generateGenericItem);
    const wrapper = mount(<MultiSelect label="Field" items={items} open />);
    expect(wrapper.state('isOpen')).toEqual(true);
  });

  describe('#handleOnToggleMenu', () => {
    it('should toggle the boolean `isOpen` field', () => {
      const items = generateItems(5, generateGenericItem);
      const wrapper = mount(<MultiSelect label="Field" items={items} />);
      expect(wrapper.state('isOpen')).toBe(false);
      wrapper.find(`.${prefix}--list-box__field`).simulate('click');
      expect(wrapper.state('isOpen')).toBe(true);
      wrapper.find(`.${prefix}--list-box__field`).simulate('click');
      expect(wrapper.state('isOpen')).toBe(false);
    });
  });

  describe('when `initialSelectedItems` is given', () => {
    it('should initialize `selectedItems` with the given initial selected items', () => {
      const items = generateItems(5, generateGenericItem);
      const wrapper = mount(
        <MultiSelect
          label="Field"
          items={items}
          initialSelectedItems={[items[0], items[1]]}
        />
      );
      expect(wrapper.find('Selection').instance().state.selectedItems).toEqual([
        items[0],
        items[1],
      ]);
    });
  });

  describe('MultiSelect with InitialSelectedItems', () => {
    let mockProps;
    const items = generateItems(5, generateGenericItem);

    beforeEach(() => {
      mockProps = {
        items: items,
        initialSelectedItems: [items[0], items[1], items[2]],
        itemToString: ({ label }) => label,
        onChange: jest.fn(),
        label: 'Label',
      };
    });

    it('should allow a user to de-select an item by clicking on initial selected items', () => {
      const wrapper = mount(<MultiSelect {...mockProps} />);
      expect(
        wrapper.find('Selection').instance().state.selectedItems.length
      ).toBe(3);

      wrapper.find(`.${prefix}--list-box__field`).simulate('click');
      wrapper
        .find(`.${prefix}--list-box__menu-item`)
        .at(0)
        .simulate('click');

      expect(
        wrapper.find('Selection').instance().state.selectedItems.length
      ).toBe(2);
    });

    it('should allow a user to de-select an initial selected item by hitting enter on initial selected item', () => {
      const wrapper = mount(<MultiSelect {...mockProps} />);
      const simulateArrowDown = wrapper =>
        wrapper.find(`.${prefix}--list-box__field`).simulate('keydown', {
          key: 'ArrowDown',
        });

      expect(
        wrapper.find('Selection').instance().state.selectedItems.length
      ).toBe(3);
      openMenu(wrapper);
      simulateArrowDown(wrapper);
      wrapper
        .find(`.${prefix}--list-box__field`)
        .at(0)
        .simulate('keydown', {
          key: 'Enter',
        });
      expect(
        wrapper.find('Selection').instance().state.selectedItems.length
      ).toBe(2);
    });

    it('should allow a user to de-select an item after calling setState by clicking on selected item', () => {
      const wrapper = mount(
        <MultiSelect
          {...mockProps}
          items={[{ label: 'foo' }]}
          initialSelectedItems={[{ label: 'foo' }]}
        />
      );
      expect(
        wrapper.find('Selection').instance().state.selectedItems.length
      ).toBe(1);
      wrapper.setState({ foo: 'bar' });
      wrapper.find(`.${prefix}--list-box__field`).simulate('click');
      wrapper
        .find(`.${prefix}--list-box__menu-item`)
        .at(0)
        .simulate('click');

      expect(
        wrapper.find('Selection').instance().state.selectedItems.length
      ).toBe(0);
    });

    it('should select an item when a user clicks on an item', () => {
      const wrapper = mount(<MultiSelect {...mockProps} />);
      expect(
        wrapper.find('Selection').instance().state.selectedItems.length
      ).toBe(3);

      wrapper.find(`.${prefix}--list-box__field`).simulate('click');
      wrapper
        .find(`.${prefix}--list-box__menu-item`)
        .at(4)
        .simulate('click');

      expect(
        wrapper.find('Selection').instance().state.selectedItems.length
      ).toBe(4);
    });
  });

  describe('e2e', () => {
    let mockProps;

    beforeEach(() => {
      mockProps = {
        items: generateItems(5, generateGenericItem),
        initialSelectedItems: [],
        itemToString: ({ label }) => label,
        onChange: jest.fn(),
        label: 'Label',
      };
    });

    it('should open the menu when a user clicks on the ListBox field', () => {
      const wrapper = mount(<MultiSelect {...mockProps} />);
      wrapper.find(`.${prefix}--list-box__field`).simulate('click');
      expect(wrapper.find(`.${prefix}--list-box__menu`).length).toBe(1);
      expect(wrapper.find(`.${prefix}--list-box__menu-item`).length).toBe(
        mockProps.items.length
      );
    });

    it('should open the menu when a user focuses and hits space on the ListBox field', () => {
      const wrapper = mount(<MultiSelect {...mockProps} />);
      wrapper.find(`.${prefix}--list-box__field`).simulate('keydown', {
        key: ' ',
      });
      expect(wrapper.find(`.${prefix}--list-box__menu`).length).toBe(1);
      expect(wrapper.find(`.${prefix}--list-box__menu-item`).length).toBe(
        mockProps.items.length
      );
    });

    it('should select an item when a user clicks on an item', () => {
      const wrapper = mount(<MultiSelect {...mockProps} />);
      openMenu(wrapper);
      wrapper
        .find(`.${prefix}--list-box__menu-item`)
        .first()
        .simulate('click');
      expect(wrapper.find('Selection').instance().state.selectedItems).toEqual([
        mockProps.items[0],
      ]);
    });

    it('should allow a user to highlight items with the up and down arrow keys', () => {
      const wrapper = mount(<MultiSelect {...mockProps} />);
      wrapper.find(`.${prefix}--list-box__field`).simulate('click');
      const simulateArrowDown = () =>
        wrapper.find(`.${prefix}--list-box__field`).simulate('keydown', {
          key: 'ArrowDown',
        });
      const simulateArrowUp = () =>
        wrapper.find(`.${prefix}--list-box__field`).simulate('keydown', {
          key: 'ArrowUp',
        });
      const getHighlightedId = () =>
        wrapper.find(`.${prefix}--list-box__menu-item--highlighted`).prop('id');
      simulateArrowDown();
      expect(getHighlightedId()).toBe('downshift-13-item-0');
      simulateArrowDown();
      expect(getHighlightedId()).toBe('downshift-13-item-1');
      // Simulate "wrap" behavior
      simulateArrowDown();
      simulateArrowDown();
      simulateArrowDown();
      simulateArrowDown();
      expect(getHighlightedId()).toBe('downshift-13-item-0');
      simulateArrowUp();
      expect(getHighlightedId()).toBe('downshift-13-item-4');
    });

    it('should close the menu when a user clicks outside of the control', () => {
      const wrapper = mount(<MultiSelect {...mockProps} />);
      wrapper.find(`.${prefix}--list-box__field`).simulate('click');
      mouseDownAndUp(document.body);
      expect(wrapper.state('isOpen')).toBe(false);
    });

    it('should show a badge that mirrors the number of selected items', () => {
      const wrapper = mount(<MultiSelect {...mockProps} />);
      openMenu(wrapper);
      for (let i = 0; i < mockProps.items.length; i++) {
        wrapper
          .find(`.${prefix}--list-box__menu-item`)
          .at(i)
          .simulate('click');
        expect(wrapper.find(`.${prefix}--list-box__selection`).text()).toEqual(
          expect.stringContaining(`${i + 1}`)
        );
      }
      expect(wrapper.find('Selection').instance().state.selectedItems).toEqual(
        mockProps.items
      );
    });

    it('should allow a user to de-select an item by clicking on a selected item', () => {
      const wrapper = mount(<MultiSelect {...mockProps} />);
      wrapper.find(`.${prefix}--list-box__field`).simulate('click');
      wrapper
        .find(`.${prefix}--list-box__menu-item`)
        .at(0)
        .simulate('click');
      expect(
        wrapper.find(`.${prefix}--list-box__menu-item--active`).length
      ).toBe(1);
      wrapper
        .find(`.${prefix}--list-box__menu-item`)
        .at(0)
        .simulate('click');
      expect(
        wrapper.find(`.${prefix}--list-box__menu-item--active`).length
      ).toBe(0);
    });

    it('should allow a user to de-select an item by hitting enter on a selected item', () => {
      const wrapper = mount(<MultiSelect {...mockProps} />);
      const simulateArrowDown = wrapper =>
        wrapper.find(`.${prefix}--list-box__field`).simulate('keydown', {
          key: 'ArrowDown',
        });
      openMenu(wrapper);
      wrapper
        .find(`.${prefix}--list-box__menu-item`)
        .at(0)
        .simulate('click');
      expect(
        wrapper.find(`.${prefix}--list-box__menu-item--active`).length
      ).toBe(1);
      simulateArrowDown(wrapper);
      wrapper.find(`.${prefix}--list-box__field`).simulate('keydown', {
        key: 'Enter',
      });
      expect(
        wrapper.find(`.${prefix}--list-box__menu-item--active`).length
      ).toBe(0);
    });

    it('should allow a user to click on the clear icon to clear all selected items', () => {
      const wrapper = mount(<MultiSelect {...mockProps} />);
      openMenu(wrapper);
      wrapper
        .find(`.${prefix}--list-box__menu-item`)
        .at(0)
        .simulate('click');
      wrapper.find(`.${prefix}--list-box__selection`).simulate('click');
      expect(wrapper.find('Selection').instance().state.selectedItems).toEqual(
        []
      );
    });

    it('should allow a user to focus the clear icon and hit enter to clear all selected items', () => {
      const wrapper = mount(<MultiSelect {...mockProps} />);
      openMenu(wrapper);
      wrapper
        .find(`.${prefix}--list-box__menu-item`)
        .at(0)
        .simulate('click');
      wrapper.find(`.${prefix}--list-box__selection`).simulate('keydown', {
        keyCode: 13,
      });
      expect(wrapper.find('Selection').instance().state.selectedItems).toEqual(
        []
      );
    });
  });
});
