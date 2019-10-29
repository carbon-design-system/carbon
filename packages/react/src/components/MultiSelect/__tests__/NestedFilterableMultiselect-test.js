import React from 'react';
import debounce from 'lodash.debounce';
import { mount } from 'enzyme';
import Downshift from 'downshift';
import NestedFilterableMultiselect from '../NestedFilterableMultiselect';
import {
  assertMenuClosed,
  assertMenuOpen,
  findMenuIconNode,
  openMenu,
  generateItems,
} from '../../ListBox/test-helpers';

const listItemName = 'ListBoxMenuItem';

jest.mock('lodash.debounce');

debounce.mockImplementation(fn => fn);

describe('NestedFilterableMultiselect', () => {
  let mockProps;

  describe('Simple multiselect', () => {
    beforeEach(() => {
      mockProps = {
        disabled: false,
        items: generateItems(5, index => ({
          id: `id-${index}`,
          label: `Item ${index}`,
          value: index,
        })),
        initialSelectedItems: [],
        onChange: jest.fn(),
        placeholder: 'Placeholder...',
      };
    });

    it('should render', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render without showing tooltip', () => {
      const thisProps = {
        ...mockProps,
        showTooltip: false,
      };
      const wrapper = mount(<NestedFilterableMultiselect {...thisProps} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should display all items when the menu is open initially', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      openMenu(wrapper);
      expect(wrapper.find(listItemName).length).toBe(mockProps.items.length);
    });

    it('should let the user toggle the menu by the menu icon', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      findMenuIconNode(wrapper).simulate('click');
      assertMenuOpen(wrapper, mockProps);
      findMenuIconNode(wrapper).simulate('click');
      assertMenuClosed(wrapper);
    });

    it('should close the menu by hitting Esc in search field', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      wrapper.find('.bx--text-input').simulate('keyDown', {
        which: 40,
        key: 'ArrowDown',
      });
      assertMenuOpen(wrapper, mockProps);
      wrapper.find('.bx--text-input').simulate('keyUp', { which: 27 });
      assertMenuClosed(wrapper);
    });

    it('should not close the menu after a user makes a selection', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      openMenu(wrapper);
      wrapper
        .find(listItemName)
        .at(0)
        .simulate('click');
      assertMenuOpen(wrapper, mockProps);
    });

    it('should filter a list of items by the input value', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      openMenu(wrapper);
      expect(wrapper.find(listItemName).length).toBe(mockProps.items.length);
      wrapper.find('Downshift').prop('onInputValueChange')('3', {
        type: Downshift.stateChangeTypes.changeInput,
      });
      wrapper.update();
      expect(wrapper.find(listItemName).length).toBe(1);
      expect(wrapper.state().inputValue).toEqual('3');
      expect(wrapper.state().expandedItems).toEqual([]);
    });

    it('should call `onChange` with each update to selected items via mouse click', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      openMenu(wrapper);

      // Select the first two items
      wrapper
        .find(listItemName)
        .at(0)
        .simulate('click');

      expect(mockProps.onChange).toHaveBeenCalledTimes(1);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItems: [mockProps.items[0]],
      });

      wrapper
        .find(listItemName)
        .at(1)
        .simulate('click');

      expect(mockProps.onChange).toHaveBeenCalledTimes(2);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItems: [mockProps.items[0], mockProps.items[1]],
      });

      // Un-select the next two items
      wrapper
        .find(listItemName)
        .at(0)
        .simulate('click');
      expect(mockProps.onChange).toHaveBeenCalledTimes(3);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItems: [mockProps.items[1]],
      });

      wrapper
        .find(listItemName)
        .at(1)
        .simulate('click');
      expect(mockProps.onChange).toHaveBeenCalledTimes(4);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItems: [],
      });
    });

    it('should call `onChange` with each update to selected items via keyboard', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      openMenu(wrapper);

      wrapper.setState({
        highlightedIndex: 0,
      });

      // Select the first item
      wrapper.find('.bx--text-input').simulate('keyDown', {
        which: 13,
        key: 'Enter',
      });
      expect(mockProps.onChange).toHaveBeenCalledTimes(1);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItems: [mockProps.items[0]],
      });

      // Select the second item
      wrapper.find('.bx--text-input').simulate('keyDown', {
        which: 40,
        key: 'ArrowDown',
      });
      wrapper.find('.bx--text-input').simulate('keyDown', {
        which: 13,
        key: 'Enter',
      });
      expect(mockProps.onChange).toHaveBeenCalledTimes(2);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItems: [mockProps.items[0], mockProps.items[1]],
      });

      // Unselect the first item
      wrapper.find('.bx--text-input').simulate('keyDown', {
        which: 38,
        key: 'ArrowUp',
      });
      wrapper.find('.bx--text-input').simulate('keyDown', {
        which: 13,
        key: 'Enter',
      });
      expect(mockProps.onChange).toHaveBeenCalledTimes(3);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItems: [mockProps.items[1]],
      });
    });
  });

  describe('multiselect with categories', () => {
    const customCategorySorting = jest.fn((a, b) => a[0].localeCompare(b[0]));

    beforeEach(() => {
      jest.clearAllMocks();

      mockProps = {
        disabled: false,
        items: generateItems(5, index => ({
          id: `id-${index}`,
          label: `Item ${index}`,
          value: index,
          category: `category-${index % 2 === 0 ? 1 : 2}`,
        })),
        initialSelectedItems: [],
        customCategorySorting,
        onChange: jest.fn(),
        placeholder: 'Placeholder...',
      };
    });

    it('should render', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      expect(wrapper).toMatchSnapshot();
      openMenu(wrapper);
      expect(
        wrapper.containsAllMatchingElements([
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label className="bx--group-label">CATEGORY-1</label>,
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label className="bx--group-label">CATEGORY-2</label>,
        ])
      ).toBe(true);
      expect(wrapper.find(listItemName).length).toBe(mockProps.items.length);
      expect(customCategorySorting).toHaveBeenCalled();
    });

    it('should clear all selections', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      openMenu(wrapper);

      // Select the first two items
      wrapper
        .find('.bx--checkbox-label')
        .at(0)
        .simulate('click');
      wrapper
        .find('.bx--checkbox-label')
        .at(1)
        .simulate('click');

      expect(mockProps.onChange).toHaveBeenCalledTimes(2);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItems: [mockProps.items[0], mockProps.items[2]],
      });
      expect(wrapper.find('ListBoxSelection').prop('selectionCount')).toBe(2);

      // Clear all selection
      wrapper.find('.bx--list-box__selection--multi').simulate('click');
      expect(mockProps.onChange).toHaveBeenCalledTimes(3);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItems: [],
      });
      expect(wrapper.find('ListBoxSelection').exists()).toBe(false);
    });
  });

  describe('multiselect with suboptions', () => {
    beforeEach(() => {
      mockProps = {
        disabled: false,
        items: generateItems(3, index => ({
          id: `id-${index}`,
          label: `Nested item ${index}`,
          value: index,
          category: `category-${index % 2 === 0 ? 1 : 2}`,
          options: [
            {
              id: 'option-id-1',
              label: 'Sub item 1',
              options:
                index > 0
                  ? [
                      {
                        id: 'suboption-id-11',
                        label: 'Sub-child item 11',
                      },
                      {
                        id: 'suboption-id-12',
                        label: 'Sub-child item 12',
                      },
                    ]
                  : undefined,
            },
            {
              id: 'option-id-2',
              label: 'Sub item 2',
              options:
                index === 1
                  ? [
                      {
                        id: 'suboption-id-21',
                        label: 'Sub-child item 21',
                      },
                      {
                        id: 'suboption-id-22',
                        label: 'Sub-child item 22',
                      },
                    ]
                  : undefined,
            },
          ],
        })),
        onChange: jest.fn(),
        placeholder: 'Placeholder...',
      };
    });

    it('should render', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      expect(wrapper).toMatchSnapshot();
      openMenu(wrapper);
      expect(
        wrapper.containsAllMatchingElements([
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label className="bx--group-label">CATEGORY-1</label>,
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label className="bx--group-label">CATEGORY-2</label>,
        ])
      ).toBe(true);
      // Expand the child items via mouse click
      wrapper
        .find('.bx--checkbox-label')
        .at(1)
        .find('span')
        .simulate('click');
      expect(wrapper.find(listItemName).length).toBe(5);
      // Expand the sub-child items via mouse click
      wrapper
        .find('.bx--checkbox-label')
        .at(2)
        .find('span')
        .simulate('click');
      expect(wrapper.find(listItemName).length).toBe(7);
      // Collapse the sub-child items via mouse click
      wrapper
        .find('.bx--checkbox-label')
        .at(2)
        .find('span')
        .simulate('click');
      expect(wrapper.find(listItemName).length).toBe(5);
      // Collapse the child items via mouse click
      wrapper
        .find('.bx--checkbox-label')
        .at(1)
        .find('span')
        .simulate('click');
      expect(wrapper.find(listItemName).length).toBe(3);
    });

    it('should filter a list of items by the input value (level=0)', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      openMenu(wrapper);
      expect(wrapper.find(listItemName).length).toBe(mockProps.items.length);
      // Type 'Nested item 2'
      wrapper.find('Downshift').prop('onInputValueChange')('Nested item 2', {
        type: Downshift.stateChangeTypes.changeInput,
      });
      wrapper.update();
      expect(wrapper.find(listItemName).length).toBe(1);
      expect(wrapper.state().inputValue).toEqual('Nested item 2');
      expect(wrapper.state().expandedItems).toEqual([]);
      // An array input persists the current value
      wrapper.find('Downshift').prop('onInputValueChange')([], {
        type: Downshift.stateChangeTypes.changeInput,
      });
      wrapper.update();
      expect(wrapper.find(listItemName).length).toBe(1);
      expect(wrapper.state().inputValue).toEqual('Nested item 2');
      expect(wrapper.state().expandedItems).toEqual([]);

      // Expand the child items
      wrapper
        .find('.bx--checkbox-label')
        .at(0)
        .find('span')
        .simulate('click');
      expect(wrapper.find(listItemName).length).toBe(3);

      // Expand the sub-child items
      wrapper
        .find('.bx--checkbox-label')
        .at(1)
        .find('span')
        .simulate('click');
      expect(wrapper.find(listItemName).length).toBe(5);
    });

    it('should filter a list of sub items by the input value (level=1)', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      openMenu(wrapper);
      expect(wrapper.find(listItemName).length).toBe(mockProps.items.length);
      wrapper.find('Downshift').prop('onInputValueChange')('Sub item 2', {
        type: Downshift.stateChangeTypes.changeInput,
      });
      wrapper.update();

      const expectedExpandedItems = mockProps.items.map(item => ({
        ...item,
        level: 0,
        options: undefined,
        checked: undefined,
        hasChildren: true,
      }));

      expect(wrapper.find(listItemName).length).toBe(6);
      expect(wrapper.state().inputValue).toEqual('Sub item 2');
      expect(wrapper.state().expandedItems).toEqual(expectedExpandedItems);

      // Expand the sub-child items
      wrapper
        .find('.bx--checkbox-label')
        .at(5)
        .find('span')
        .simulate('click');
      expect(wrapper.find(listItemName).length).toBe(8);
    });

    it('should filter a list of sub child items by the input value (level=2)', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      openMenu(wrapper);
      expect(wrapper.find(listItemName).length).toBe(mockProps.items.length);
      wrapper.find('Downshift').prop('onInputValueChange')('Sub-child item 1', {
        type: Downshift.stateChangeTypes.changeInput,
      });
      wrapper.update();

      const expectedExpandedItems = [
        {
          ...mockProps.items[1],
          level: 0,
          options: undefined,
          checked: undefined,
          hasChildren: true,
        },
        {
          ...mockProps.items[1].options[0],
          level: 1,
          category: mockProps.items[1].category,
          parentId: mockProps.items[1].id,
          id: `${mockProps.items[1].id}-${mockProps.items[1].options[0].id}`,
          options: undefined,
          checked: undefined,
          hasChildren: true,
        },
        {
          ...mockProps.items[2],
          level: 0,
          options: undefined,
          checked: undefined,
          hasChildren: true,
        },
        {
          ...mockProps.items[2].options[0],
          level: 1,
          category: mockProps.items[2].category,
          parentId: mockProps.items[2].id,
          id: `${mockProps.items[2].id}-${mockProps.items[2].options[0].id}`,
          options: undefined,
          checked: undefined,
          hasChildren: true,
        },
      ];

      expect(wrapper.find(listItemName).length).toBe(8);
      expect(wrapper.state().inputValue).toEqual('Sub-child item 1');
      expect(wrapper.state().expandedItems).toEqual(expectedExpandedItems);

      wrapper.find('Downshift').prop('onInputValueChange')('Sub-child item 2', {
        type: Downshift.stateChangeTypes.changeInput,
      });
      wrapper.update();

      expect(wrapper.find(listItemName).length).toBe(4);
      expect(wrapper.state().inputValue).toEqual('Sub-child item 2');
      expect(wrapper.state().expandedItems).toEqual([
        ...expectedExpandedItems,
        {
          ...mockProps.items[1].options[1],
          level: 1,
          category: mockProps.items[1].category,
          parentId: mockProps.items[1].id,
          id: `${mockProps.items[1].id}-${mockProps.items[1].options[1].id}`,
          options: undefined,
          checked: undefined,
          hasChildren: true,
        },
      ]);
    });

    it('should filter all items by the input value', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      openMenu(wrapper);
      expect(wrapper.find(listItemName).length).toBe(mockProps.items.length);
      wrapper.find('Downshift').prop('onInputValueChange')('xxx', {
        type: Downshift.stateChangeTypes.changeInput,
      });
      wrapper.update();
      expect(wrapper.find(listItemName).length).toBe(0);
      expect(wrapper.state().inputValue).toEqual('xxx');
      expect(wrapper.state().expandedItems).toEqual([]);

      // No group should exist
      expect(
        wrapper.containsAllMatchingElements([
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label className="bx--group-label">CATEGORY-1</label>,
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label className="bx--group-label">CATEGORY-2</label>,
        ])
      ).toBe(false);
    });

    it('should clear the input value', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      openMenu(wrapper);
      wrapper.setState({ inputValue: 'xxx' });

      wrapper.find('ListBoxSelection').prop('clearSelection')({
        stopPropagation: jest.fn(),
      });
      expect(wrapper.state().inputValue).toEqual('');
    });

    it('should call `onChange` with each update to selected items', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      openMenu(wrapper);

      // Select the first item
      wrapper
        .find('.bx--checkbox-label')
        .at(0)
        .simulate('click');

      expect(mockProps.onChange).toHaveBeenCalledTimes(1);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItems: [
          {
            ...mockProps.items[0],
            options: mockProps.items[0].options.map(o => ({
              ...o,
              checked: true,
            })),
          },
        ],
      });
      expect(
        wrapper
          .find('Checkbox')
          .at(0)
          .prop('indeterminate')
      ).toBe(false);
      expect(wrapper.find('ListBoxSelection').prop('selectionCount')).toBe(2);

      // Select the second item
      wrapper
        .find('.bx--checkbox-label')
        .at(1)
        .simulate('click');

      expect(mockProps.onChange).toHaveBeenCalledTimes(2);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItems: [
          {
            ...mockProps.items[0],
            options: mockProps.items[0].options.map(o => ({
              ...o,
              checked: true,
            })),
          },
          {
            ...mockProps.items[2],
            options: mockProps.items[2].options.map(o => ({
              ...o,
              checked: true,
              options:
                o.options &&
                o.options.map(p => ({
                  ...p,
                  checked: true,
                })),
            })),
          },
        ],
      });
      expect(
        wrapper
          .find('Checkbox')
          .at(1)
          .prop('indeterminate')
      ).toBe(false);
      expect(wrapper.find('ListBoxSelection').prop('selectionCount')).toBe(5);

      // Un-select the next two items
      wrapper
        .find('.bx--checkbox-label')
        .at(0)
        .simulate('click');
      expect(mockProps.onChange).toHaveBeenCalledTimes(3);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItems: [
          {
            ...mockProps.items[2],
            options: mockProps.items[2].options.map(o => ({
              ...o,
              checked: true,
              options:
                o.options &&
                o.options.map(p => ({
                  ...p,
                  checked: true,
                })),
            })),
          },
        ],
      });
      expect(wrapper.find('ListBoxSelection').prop('selectionCount')).toBe(3);

      wrapper
        .find('.bx--checkbox-label')
        .at(1)
        .simulate('click');
      expect(mockProps.onChange).toHaveBeenCalledTimes(4);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItems: [],
      });
      expect(wrapper.find('ListBoxSelection').exists()).toBe(false);
    });

    it('should call `onChange` with each update to selected sub items', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      openMenu(wrapper);

      // Expand the child items
      wrapper
        .find('.bx--checkbox-label')
        .at(0)
        .find('span')
        .simulate('click');
      // Check the first suboption
      wrapper
        .find('.bx--checkbox-label')
        .at(1)
        .simulate('click');

      expect(mockProps.onChange).toHaveBeenCalledTimes(1);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItems: [
          {
            ...mockProps.items[0],
            options: mockProps.items[0].options.map((o, i) => ({
              ...o,
              checked: i === 0,
            })),
          },
        ],
      });
      expect(
        wrapper
          .find('Checkbox')
          .at(0)
          .prop('indeterminate')
      ).toBe(true);
      expect(wrapper.find('ListBoxSelection').prop('selectionCount')).toBe(1);

      // Check the second suboption
      wrapper
        .find('.bx--checkbox-label')
        .at(2)
        .simulate('click');

      expect(mockProps.onChange).toHaveBeenCalledTimes(2);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItems: [
          {
            ...mockProps.items[0],
            options: mockProps.items[0].options.map(o => ({
              ...o,
              checked: true,
            })),
          },
        ],
      });
      expect(
        wrapper
          .find('Checkbox')
          .at(1)
          .prop('indeterminate')
      ).toBe(false);
      expect(wrapper.find('ListBoxSelection').prop('selectionCount')).toBe(2);

      // Un-select the first suboption
      wrapper
        .find('.bx--checkbox-label')
        .at(1)
        .simulate('click');
      expect(mockProps.onChange).toHaveBeenCalledTimes(3);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItems: [
          {
            ...mockProps.items[0],
            options: mockProps.items[0].options.map((o, i) => ({
              ...o,
              checked: i !== 0,
            })),
          },
        ],
      });
      expect(
        wrapper
          .find('Checkbox')
          .at(0)
          .prop('indeterminate')
      ).toBe(true);
      expect(wrapper.find('ListBoxSelection').prop('selectionCount')).toBe(1);

      // Un-select the second suboption
      wrapper
        .find('.bx--checkbox-label')
        .at(2)
        .simulate('click');
      expect(mockProps.onChange).toHaveBeenCalledTimes(4);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItems: [],
      });
      expect(
        wrapper
          .find('Checkbox')
          .at(0)
          .prop('indeterminate')
      ).toBe(false);
      expect(wrapper.find('ListBoxSelection').exists()).toBe(false);
    });

    it('should call `onChange` with each update to selected sub child items', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      openMenu(wrapper);

      // Expand the child items
      wrapper
        .find('.bx--checkbox-label')
        .at(2)
        .find('span')
        .simulate('click');
      // Check child item 1
      wrapper
        .find('.bx--checkbox-label')
        .at(3)
        .simulate('click');

      expect(mockProps.onChange).toHaveBeenCalledTimes(1);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItems: [
          {
            ...mockProps.items[1],
            options: mockProps.items[1].options.map((o, i) => ({
              ...o,
              checked: i === 0,
              options: o.options.map(p => ({
                ...p,
                checked: i === 0,
              })),
            })),
          },
        ],
      });
      expect(
        wrapper.find('Checkbox[name="Nested item 1"]').prop('indeterminate')
      ).toBe(true);
      expect(wrapper.find('ListBoxSelection').prop('selectionCount')).toBe(2);

      // Expand sub child items
      wrapper
        .find('.bx--checkbox-label')
        .at(3)
        .find('span')
        .simulate('click');

      // Uncheck sub child 1
      wrapper
        .find('Checkbox[name="Sub-child item 11"]')
        .find('.bx--checkbox-label')
        .simulate('click');

      expect(mockProps.onChange).toHaveBeenCalledTimes(2);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItems: [
          {
            ...mockProps.items[1],
            options: mockProps.items[1].options.map((o, i) => ({
              ...o,
              checked: false,
              options: o.options.map((p, j) => ({
                ...p,
                checked: i !== 0 ? false : j !== 0,
              })),
            })),
          },
        ],
      });
      expect(
        wrapper.find('Checkbox[name="Sub item 1"]').prop('indeterminate')
      ).toBe(true);
      expect(
        wrapper.find('Checkbox[name="Nested item 1"]').prop('indeterminate')
      ).toBe(true);
      expect(wrapper.find('ListBoxSelection').prop('selectionCount')).toBe(1);

      // Uncheck sub child 2
      wrapper
        .find('Checkbox[name="Sub-child item 12"]')
        .find('.bx--checkbox-label')
        .simulate('click');

      expect(mockProps.onChange).toHaveBeenCalledTimes(3);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItems: [],
      });
      expect(
        wrapper.find('Checkbox[name="Sub item 1"]').prop('indeterminate')
      ).toBe(false);
      expect(
        wrapper.find('Checkbox[name="Nested item 1"]').prop('indeterminate')
      ).toBe(false);
      expect(wrapper.find('ListBoxSelection').exists()).toBe(false);

      // Check sub child 1
      wrapper
        .find('Checkbox[name="Sub-child item 11"]')
        .find('.bx--checkbox-label')
        .simulate('click');

      expect(mockProps.onChange).toHaveBeenCalledTimes(4);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItems: [
          {
            ...mockProps.items[1],
            options: mockProps.items[1].options.map((o, i) => ({
              ...o,
              checked: false,
              options: o.options.map((p, j) => ({
                ...p,
                checked: i !== 0 ? false : j === 0,
              })),
            })),
          },
        ],
      });
      expect(
        wrapper.find('Checkbox[name="Sub item 1"]').prop('indeterminate')
      ).toBe(true);
      expect(
        wrapper.find('Checkbox[name="Nested item 1"]').prop('indeterminate')
      ).toBe(true);
      expect(wrapper.find('ListBoxSelection').prop('selectionCount')).toBe(1);
    });

    it('should clear all selections', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      openMenu(wrapper);

      // Select the first two items
      wrapper
        .find('.bx--checkbox-label')
        .at(0)
        .simulate('click');
      wrapper
        .find('.bx--checkbox-label')
        .at(1)
        .simulate('click');

      expect(mockProps.onChange).toHaveBeenCalledTimes(2);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItems: [
          {
            ...mockProps.items[0],
            options: mockProps.items[0].options.map(o => ({
              ...o,
              checked: true,
            })),
          },
          {
            ...mockProps.items[2],
            options: mockProps.items[2].options.map(o => ({
              ...o,
              checked: true,
              options:
                o.options &&
                o.options.map(p => ({
                  ...p,
                  checked: true,
                })),
            })),
          },
        ],
      });
      expect(
        wrapper
          .find('Checkbox')
          .at(1)
          .prop('indeterminate')
      ).toBe(false);
      expect(wrapper.find('ListBoxSelection').prop('selectionCount')).toBe(5);

      // Clear all selection
      wrapper.find('.bx--list-box__selection--multi').simulate('click');
      expect(mockProps.onChange).toHaveBeenCalledTimes(3);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItems: [],
      });
      expect(wrapper.find('ListBoxSelection').exists()).toBe(false);
    });

    it('should set parent item as indeterminate if not all suboptions are checked', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      openMenu(wrapper);

      // checked the item with multiple levels
      wrapper
        .find('.bx--checkbox-label')
        .at(1)
        .simulate('click');
      expect(mockProps.onChange).toHaveBeenCalledTimes(1);
      expect(
        wrapper.find('Checkbox[name="Nested item 2"]').prop('indeterminate')
      ).toBe(false);
      // expand suboptions
      wrapper
        .find('.bx--checkbox-label')
        .at(1)
        .find('span')
        .simulate('click');
      expect(
        wrapper.find('Checkbox[name="Sub item 1"]').prop('indeterminate')
      ).toBe(false);
      // unselect subOption
      wrapper
        .find('.bx--checkbox-label')
        .at(3)
        .simulate('click');
      expect(
        wrapper.find('Checkbox[name="Nested item 2"]').prop('indeterminate')
      ).toBe(true);
      // expand subChild
      wrapper
        .find('.bx--checkbox-label')
        .at(2)
        .find('span')
        .simulate('click');
      expect(
        wrapper.find('Checkbox[name="Sub item 1"]').prop('indeterminate')
      ).toBe(false);
      // unselect subChild
      wrapper
        .find('.bx--checkbox-label')
        .at(3)
        .simulate('click');
      expect(
        wrapper.find('Checkbox[name="Sub item 1"]').prop('indeterminate')
      ).toBe(true);
      expect(
        wrapper.find('Checkbox[name="Nested item 2"]').prop('indeterminate')
      ).toBe(true);
    });

    it('should unselect parent if all suboptions are unselect', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      openMenu(wrapper);

      // checked the item with multiple levels
      wrapper
        .find('.bx--checkbox-label')
        .at(1)
        .simulate('click');
      expect(mockProps.onChange).toHaveBeenCalledTimes(1);
      expect(
        wrapper.find('Checkbox[name="Nested item 2"]').prop('checked')
      ).toBe(true);
      // expand suboptions
      wrapper
        .find('.bx--checkbox-label')
        .at(1)
        .find('span')
        .simulate('click');
      // unselect 1 subOption
      wrapper
        .find('.bx--checkbox-label')
        .at(2)
        .simulate('click');
      expect(
        wrapper.find('Checkbox[name="Nested item 2"]').prop('indeterminate')
      ).toBe(true);
      expect(
        wrapper.find('Checkbox[name="Nested item 2"]').prop('checked')
      ).toBe(true);
      // unselect 2 subOption
      wrapper
        .find('.bx--checkbox-label')
        .at(3)
        .simulate('click');
      expect(
        wrapper.find('Checkbox[name="Nested item 2"]').prop('checked')
      ).toBe(false);
    });

    it('should unselect parent if the suboptions at all levels are unselect', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      openMenu(wrapper);

      // checked the item with multiple levels
      wrapper
        .find('.bx--checkbox-label')
        .at(1)
        .simulate('click');
      expect(mockProps.onChange).toHaveBeenCalledTimes(1);
      expect(
        wrapper.find('Checkbox[name="Nested item 2"]').prop('checked')
      ).toBe(true);
      // expand suboptions
      wrapper
        .find('.bx--checkbox-label')
        .at(1)
        .find('span')
        .simulate('click');
      // unselect 1 subOption
      wrapper
        .find('.bx--checkbox-label')
        .at(3)
        .simulate('click');
      expect(
        wrapper.find('Checkbox[name="Nested item 2"]').prop('indeterminate')
      ).toBe(true);
      expect(
        wrapper.find('Checkbox[name="Nested item 2"]').prop('checked')
      ).toBe(true);
      // expand subChild
      wrapper
        .find('.bx--checkbox-label')
        .at(2)
        .find('span')
        .simulate('click');
      // unselect 1 subChild
      wrapper
        .find('.bx--checkbox-label')
        .at(3)
        .simulate('click');
      expect(
        wrapper.find('Checkbox[name="Sub item 1"]').prop('indeterminate')
      ).toBe(true);
      expect(wrapper.find('Checkbox[name="Sub item 1"]').prop('checked')).toBe(
        true
      );
      expect(
        wrapper.find('Checkbox[name="Nested item 2"]').prop('indeterminate')
      ).toBe(true);
      expect(
        wrapper.find('Checkbox[name="Nested item 2"]').prop('checked')
      ).toBe(true);
      // unselect 2 subChild
      wrapper
        .find('.bx--checkbox-label')
        .at(4)
        .simulate('click');
      expect(
        wrapper.find('Checkbox[name="Sub item 1"]').prop('indeterminate')
      ).toBe(false);
      expect(wrapper.find('Checkbox[name="Sub item 1"]').prop('checked')).toBe(
        false
      );
      expect(
        wrapper.find('Checkbox[name="Nested item 2"]').prop('indeterminate')
      ).toBe(false);
      expect(
        wrapper.find('Checkbox[name="Nested item 2"]').prop('checked')
      ).toBe(false);
    });

    it('should expand when element is clicked out of CheckBox', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      openMenu(wrapper);

      wrapper
        .find('.bx--checkbox-label')
        .at(0)
        .simulate('click');
      expect(mockProps.onChange).toHaveBeenCalledTimes(1);
      //expand suboptions
      wrapper
        .find('.bx--checkbox-label')
        .at(0)
        .find('span')
        .simulate('click');
      expect(wrapper.find('.bx--checkbox-label').length).toEqual(5);
    });

    it('should expand suboptions via keyboard', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      openMenu(wrapper);

      wrapper.setState({
        highlightedIndex: 0,
      });
      //expand suboptions
      wrapper.find('.bx--text-input').simulate('keyDown', {
        which: 40,
        key: 'ArrowDown',
      });
      expect(wrapper.find('.bx--checkbox-label').length).toEqual(5);
      expect(wrapper.state().highlightedIndex).toEqual(1);
      // collapse suboptions
      wrapper.find('.bx--text-input').simulate('keyDown', {
        which: 38,
        key: 'ArrowUp',
      });
      expect(wrapper.find('.bx--checkbox-label').length).toEqual(3);
      expect(wrapper.state().highlightedIndex).toEqual(0);
    });

    it('should not expand subOptions when parent is selected', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      openMenu(wrapper);

      wrapper
        .find('.bx--checkbox-label')
        .at(0)
        .simulate('click');
      expect(mockProps.onChange).toHaveBeenCalledTimes(1);
      expect(wrapper.find('.bx--checkbox-label').length).toEqual(3);
    });

    it('should highlight suboption when mouse enter', () => {
      const wrapper = mount(<NestedFilterableMultiselect {...mockProps} />);
      openMenu(wrapper);

      //expand suboptions
      wrapper
        .find('.bx--checkbox-label')
        .at(0)
        .find('span')
        .simulate('click');
      expect(wrapper.find('.bx--checkbox-label').length).toEqual(5);

      wrapper
        .find('.bx--checkbox-label')
        .at(1)
        .find('span')
        .simulate('mousemove');
      expect(wrapper.state().highlightedIndex).toEqual(1);
    });
  });

  describe('multiselect with initial selections', () => {
    beforeEach(() => {
      mockProps = {
        disabled: false,
        items: generateItems(3, index => ({
          id: `id-${index}`,
          label: `Nested item ${index}`,
          value: index,
          category: `category-${index % 2 === 0 ? 1 : 2}`,
          options:
            index === 0
              ? [
                  {
                    id: 'option-id-1',
                    label: 'Sub item 1',
                    options: [
                      {
                        id: 'suboption-id-11',
                        label: 'Sub-child item 11',
                      },
                      {
                        id: 'suboption-id-12',
                        label: 'Sub-child item 12',
                      },
                    ],
                  },
                  {
                    id: 'option-id-2',
                    label: 'Sub item 2',
                    options: [
                      {
                        id: 'suboption-id-21',
                        label: 'Sub-child item 21',
                      },
                      {
                        id: 'suboption-id-22',
                        label: 'Sub-child item 22',
                      },
                    ],
                  },
                ]
              : undefined,
        })),
        placeholder: 'Placeholder...',
      };
    });

    it('preselect item at level 0', () => {
      const props = {
        ...mockProps,
        initialSelectedItems: [
          {
            ...mockProps.items[0],
          },
          {
            ...mockProps.items[2],
          },
        ],
      };

      const wrapper = mount(<NestedFilterableMultiselect {...props} />);
      expect(wrapper).toMatchSnapshot();
      openMenu(wrapper);
      // Expand the child items via mouse click
      wrapper
        .find('.bx--checkbox-label')
        .at(0)
        .find('span')
        .simulate('click');
      // Expand the sub-child items via mouse click
      wrapper
        .find('.bx--checkbox-label')
        .at(2)
        .find('span')
        .simulate('click');
      wrapper
        .find('.bx--checkbox-label')
        .at(1)
        .find('span')
        .simulate('click');

      const checked = wrapper
        .find('Checkbox')
        .filterWhere(node => !!node.prop('checked'));
      expect(checked.length).toEqual(8);
      expect(wrapper.instance().state.flattenedSelectedItems).toEqual([
        {
          ...props.initialSelectedItems[0],
          level: 0,
          options: undefined,
          checked: undefined,
          hasChildren: true,
        },
        {
          ...props.initialSelectedItems[0].options[0],
          level: 1,
          parentId: props.initialSelectedItems[0].id,
          category: props.initialSelectedItems[0].category,
          id: 'id-0-option-id-1',
          options: undefined,
          checked: undefined,
          hasChildren: true,
        },
        {
          ...props.initialSelectedItems[0].options[0].options[0],
          level: 2,
          parentId: 'id-0-option-id-1',
          category: props.initialSelectedItems[0].category,
          id: 'id-0-option-id-1-suboption-id-11',
          options: undefined,
          checked: undefined,
          hasChildren: false,
        },
        {
          ...props.initialSelectedItems[0].options[0].options[1],
          level: 2,
          parentId: 'id-0-option-id-1',
          category: props.initialSelectedItems[0].category,
          id: 'id-0-option-id-1-suboption-id-12',
          options: undefined,
          checked: undefined,
          hasChildren: false,
        },
        {
          ...props.initialSelectedItems[0].options[1],
          level: 1,
          parentId: props.initialSelectedItems[0].id,
          category: props.initialSelectedItems[0].category,
          id: 'id-0-option-id-2',
          options: undefined,
          checked: undefined,
          hasChildren: true,
        },
        {
          ...props.initialSelectedItems[0].options[1].options[0],
          level: 2,
          parentId: 'id-0-option-id-2',
          category: props.initialSelectedItems[0].category,
          id: 'id-0-option-id-2-suboption-id-21',
          options: undefined,
          checked: undefined,
          hasChildren: false,
        },
        {
          ...props.initialSelectedItems[0].options[1].options[1],
          level: 2,
          parentId: 'id-0-option-id-2',
          category: props.initialSelectedItems[0].category,
          id: 'id-0-option-id-2-suboption-id-22',
          options: undefined,
          checked: undefined,
          hasChildren: false,
        },
        {
          ...props.initialSelectedItems[1],
          level: 0,
          options: undefined,
          checked: undefined,
          hasChildren: false,
        },
      ]);
    });

    it('preselect item at level 1', () => {
      const props = {
        ...mockProps,
        initialSelectedItems: [
          {
            ...mockProps.items[0],
            options: mockProps.items[0].options.map(o => ({
              ...o,
              checked: true,
            })),
          },
        ],
      };

      const wrapper = mount(<NestedFilterableMultiselect {...props} />);
      expect(wrapper).toMatchSnapshot();
      openMenu(wrapper);
      // Expand the child items via mouse click
      wrapper
        .find('.bx--checkbox-label')
        .at(0)
        .find('span')
        .simulate('click');
      // Expand the sub-child items via mouse click
      wrapper
        .find('.bx--checkbox-label')
        .at(2)
        .find('span')
        .simulate('click');
      wrapper
        .find('.bx--checkbox-label')
        .at(1)
        .find('span')
        .simulate('click');

      const checked = wrapper
        .find('Checkbox')
        .filterWhere(node => !!node.prop('checked'));
      expect(checked.length).toEqual(7);
      expect(wrapper.instance().state.flattenedSelectedItems).toEqual([
        {
          ...props.initialSelectedItems[0],
          level: 0,
          options: undefined,
          checked: undefined,
          hasChildren: true,
        },
        {
          ...props.initialSelectedItems[0].options[0],
          level: 1,
          parentId: props.initialSelectedItems[0].id,
          category: props.initialSelectedItems[0].category,
          id: 'id-0-option-id-1',
          options: undefined,
          checked: undefined,
          hasChildren: true,
        },
        {
          ...props.initialSelectedItems[0].options[0].options[0],
          level: 2,
          parentId: 'id-0-option-id-1',
          category: props.initialSelectedItems[0].category,
          id: 'id-0-option-id-1-suboption-id-11',
          options: undefined,
          checked: undefined,
          hasChildren: false,
        },
        {
          ...props.initialSelectedItems[0].options[0].options[1],
          level: 2,
          parentId: 'id-0-option-id-1',
          category: props.initialSelectedItems[0].category,
          id: 'id-0-option-id-1-suboption-id-12',
          options: undefined,
          checked: undefined,
          hasChildren: false,
        },
        {
          ...props.initialSelectedItems[0].options[1],
          level: 1,
          parentId: props.initialSelectedItems[0].id,
          category: props.initialSelectedItems[0].category,
          id: 'id-0-option-id-2',
          options: undefined,
          checked: undefined,
          hasChildren: true,
        },
        {
          ...props.initialSelectedItems[0].options[1].options[0],
          level: 2,
          parentId: 'id-0-option-id-2',
          category: props.initialSelectedItems[0].category,
          id: 'id-0-option-id-2-suboption-id-21',
          options: undefined,
          checked: undefined,
          hasChildren: false,
        },
        {
          ...props.initialSelectedItems[0].options[1].options[1],
          level: 2,
          parentId: 'id-0-option-id-2',
          category: props.initialSelectedItems[0].category,
          id: 'id-0-option-id-2-suboption-id-22',
          options: undefined,
          checked: undefined,
          hasChildren: false,
        },
      ]);
    });

    it('preselect item at level 2', () => {
      const props = {
        ...mockProps,
        initialSelectedItems: [
          {
            ...mockProps.items[0],
            options: mockProps.items[0].options.map(o => ({
              ...o,
              options: o.options.map((p, i) => ({
                ...p,
                checked: i === 0,
              })),
            })),
          },
        ],
      };

      const wrapper = mount(<NestedFilterableMultiselect {...props} />);
      expect(wrapper).toMatchSnapshot();
      openMenu(wrapper);
      // Expand the child items via mouse click
      wrapper
        .find('.bx--checkbox-label')
        .at(0)
        .find('span')
        .simulate('click');
      // Expand the sub-child items via mouse click
      wrapper
        .find('.bx--checkbox-label')
        .at(2)
        .find('span')
        .simulate('click');
      wrapper
        .find('.bx--checkbox-label')
        .at(1)
        .find('span')
        .simulate('click');

      const checked = wrapper
        .find('Checkbox')
        .filterWhere(node => !!node.prop('checked'));
      expect(checked.length).toEqual(5);
      expect(wrapper.instance().state.flattenedSelectedItems).toEqual([
        {
          ...props.initialSelectedItems[0],
          level: 0,
          options: undefined,
          checked: undefined,
          hasChildren: true,
        },
        {
          ...props.initialSelectedItems[0].options[0],
          level: 1,
          parentId: props.initialSelectedItems[0].id,
          category: props.initialSelectedItems[0].category,
          id: 'id-0-option-id-1',
          options: undefined,
          checked: undefined,
          hasChildren: true,
        },
        {
          ...props.initialSelectedItems[0].options[0].options[0],
          level: 2,
          parentId: 'id-0-option-id-1',
          category: props.initialSelectedItems[0].category,
          id: 'id-0-option-id-1-suboption-id-11',
          options: undefined,
          checked: undefined,
          hasChildren: false,
        },
        {
          ...props.initialSelectedItems[0].options[1],
          level: 1,
          parentId: props.initialSelectedItems[0].id,
          category: props.initialSelectedItems[0].category,
          id: 'id-0-option-id-2',
          options: undefined,
          checked: undefined,
          hasChildren: true,
        },
        {
          ...props.initialSelectedItems[0].options[1].options[0],
          level: 2,
          parentId: 'id-0-option-id-2',
          category: props.initialSelectedItems[0].category,
          id: 'id-0-option-id-2-suboption-id-21',
          options: undefined,
          checked: undefined,
          hasChildren: false,
        },
      ]);
    });
  });

  describe('multiselect with flat list', () => {
    beforeEach(() => {
      mockProps = {
        disabled: false,
        items: [
          {
            id: 'id-0',
            label: 'Flat item 1',
            value: 0,
            category: 'category-0',
            level: 0,
            hasChildren: true,
          },
          {
            id: 'id-1',
            label: 'Child item 1',
            value: 1,
            category: 'category-0',
            level: 1,
            hasChildren: true,
            parentId: 'id-0',
          },
          {
            id: 'id-2',
            label: 'Subchild item 2',
            value: 2,
            category: 'category-0',
            level: 2,
            parentId: 'id-1',
          },
          {
            id: 'id-3',
            label: 'Subchild item 3',
            value: 3,
            category: 'category-0',
            level: 2,
            parentId: 'id-1',
          },
          {
            id: 'id-4',
            label: 'Child item 4',
            value: 4,
            category: 'category-0',
            level: 1,
            parentId: 'id-0',
          },
          {
            id: 'id-5',
            label: 'Flat item 5',
            value: 5,
            category: 'category-0',
            level: 0,
          },
          {
            id: 'id-6',
            label: 'Flat item 6',
            value: 6,
            category: 'category-1',
            level: 0,
            hasChildren: true,
          },
          {
            id: 'id-7',
            label: 'Child item 7',
            value: 7,
            category: 'category-1',
            level: 1,
            parentId: 'id-6',
          },
          {
            id: 'id-8',
            label: 'Child item 8',
            value: 8,
            category: 'category-1',
            level: 1,
            parentId: 'id-6',
          },
        ],
        placeholder: 'Placeholder...',
      };
    });

    it('preselect item at level 0', () => {
      const props = {
        ...mockProps,
        initialSelectedItems: [
          {
            ...mockProps.items[0],
          },
          {
            ...mockProps.items[6],
          },
        ],
      };

      const wrapper = mount(<NestedFilterableMultiselect {...props} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.instance().state.flattenedSelectedItems).toEqual([
        mockProps.items[0],
        mockProps.items[6],
        mockProps.items[1],
        mockProps.items[4],
        mockProps.items[2],
        mockProps.items[3],
        mockProps.items[7],
        mockProps.items[8],
      ]);
    });

    it('preselect item at level 1', () => {
      const props = {
        ...mockProps,
        initialSelectedItems: [
          {
            ...mockProps.items[1],
          },
          {
            ...mockProps.items[5],
          },
          {
            ...mockProps.items[7],
          },
        ],
      };

      const wrapper = mount(<NestedFilterableMultiselect {...props} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.instance().state.flattenedSelectedItems).toEqual([
        mockProps.items[1],
        mockProps.items[5],
        mockProps.items[7],
        mockProps.items[0],
        mockProps.items[2],
        mockProps.items[3],
        mockProps.items[6],
      ]);
    });

    it('preselect item at level 2', () => {
      const props = {
        ...mockProps,
        initialSelectedItems: [
          {
            ...mockProps.items[2],
          },
        ],
      };

      const wrapper = mount(<NestedFilterableMultiselect {...props} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.instance().state.flattenedSelectedItems).toEqual([
        mockProps.items[2],
        mockProps.items[0],
        mockProps.items[1],
      ]);
    });
  });
});
