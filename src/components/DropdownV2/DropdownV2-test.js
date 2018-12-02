import React from 'react';
import { mount, shallow } from 'enzyme';
import {
  assertMenuOpen,
  assertMenuClosed,
  findMenuItemNode,
  openMenu,
  generateItems,
  generateGenericItem,
} from '../ListBox/test-helpers';
import DropdownV2 from '../DropdownV2';
import DropdownSkeleton from '../DropdownV2/Dropdown.Skeleton';

describe('DropdownV2', () => {
  let mockProps;
  beforeEach(() => {
    mockProps = {
      items: generateItems(5, generateGenericItem),
      onChange: jest.fn(),
      label: 'input',
      placeholder: 'Filter...',
      type: 'default',
    };
  });

  it('should render', () => {
    const wrapper = mount(<DropdownV2 {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should initially render with the menu not open', () => {
    const wrapper = mount(<DropdownV2 {...mockProps} />);
    assertMenuClosed(wrapper);
  });

  it('should let the user open the menu by clicking on the control', () => {
    const wrapper = mount(<DropdownV2 {...mockProps} />);
    openMenu(wrapper);
    assertMenuOpen(wrapper, mockProps);
  });

  it('should specify light version as expected', () => {
    const wrapper = mount(<DropdownV2 {...mockProps} />);
    expect(wrapper.props().light).toEqual(false);
    wrapper.setProps({ light: true });
    expect(wrapper.props().light).toEqual(true);
  });

  it('should let the user select an option by clicking on the option node', () => {
    const wrapper = mount(<DropdownV2 {...mockProps} />);
    openMenu(wrapper);
    findMenuItemNode(wrapper, 0).simulate('click');
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItem: mockProps.items[0],
    });
    assertMenuClosed(wrapper);

    mockProps.onChange.mockClear();

    openMenu(wrapper);
    findMenuItemNode(wrapper, 1).simulate('click');
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItem: mockProps.items[1],
    });
  });

  describe('should display initially selected item found in `initialSelectedItem`', () => {
    it('using an object type for the `initialSelectedItem` prop', () => {
      const wrapper = mount(
        <DropdownV2 {...mockProps} initialSelectedItem={mockProps.items[0]} />
      );

      expect(wrapper.find('span.bx--list-box__label').text()).toEqual(
        mockProps.items[0].label
      );
    });

    it('using a string type for the `initialSelectedItem` prop', () => {
      // Replace the 'items' property in mockProps with a list of strings
      mockProps = {
        ...mockProps,
        items: ['1', '2', '3'],
      };

      const wrapper = mount(
        <DropdownV2 {...mockProps} initialSelectedItem={mockProps.items[1]} />
      );

      expect(wrapper.find('span.bx--list-box__label').text()).toEqual(
        mockProps.items[1]
      );
    });
  });
});

describe('DropdownSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<DropdownSkeleton inline />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass('bx--skeleton')).toEqual(true);
      expect(wrapper.hasClass('bx--dropdown-v2')).toEqual(true);
      expect(wrapper.hasClass('bx--list-box--inline')).toEqual(true);
    });
  });
});
