import React from 'react';
import Dropdown from '../Dropdown';
import DropdownItem from '../DropdownItem';
import { shallow, mount } from 'enzyme';

describe('Dropdown', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <Dropdown
        className="extra-class"
        onChange={(selectedItemInfo) => console.log(selectedItemInfo)} // eslint-disable-line no-console
        defaultText="Choose something.."
      />
    );

    it('renders a dropdown', () => {
      expect(wrapper.length).toEqual(1);
    });

    it('has the expected classes', () => {
      expect(wrapper.hasClass('bx--dropdown')).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('should render children as expected', () => {
      const dropdown = shallow(
        <Dropdown
          onChange={(selectedItemInfo) => console.log(selectedItemInfo)} // eslint-disable-line no-console
        >
          <div className="test-child"></div>
          <div className="test-child"></div>
        </Dropdown>
      );
      expect(dropdown.find('.test-child').length).toEqual(2);
    });
  });

  describe('events', () => {
    const onClick = jest.fn();

    const wrapper = mount(
      <Dropdown
        onChange={(selectedItemInfo) => console.log(selectedItemInfo)} // eslint-disable-line no-console
        onClick={onClick}
      >
        <DropdownItem className="test-child" itemText="test-child" value="test-child" />
      </Dropdown>
    );

    const dropdown = wrapper.find('.bx--dropdown');
    const child = wrapper.find('.test-child');

    it('should add the open dropdown class on click', () => {
      dropdown.simulate('click');
      expect(dropdown.hasClass('bx--dropdown--open')).toEqual(true);
    });

    it('should update data value state when child item is clicked', () => {
      child.simulate('click');
      expect(dropdown.props().value).toEqual('test-child');
    });

    it('should update selected text when child item is clicked', () => {
      child.simulate('click');
      expect(wrapper.state().selectedText).toEqual('test-child');
    });
  });
});
