import React from 'react';
import DropdownItem from '../DropdownItem';
import { mount } from 'enzyme';

describe('DropdownItem', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(
      <DropdownItem className="extra-class" itemText="test" value="test" />
    );

    const item = wrapper.find('li');
    const link = wrapper.find('a');

    it('renders a dropdown item', () => {
      expect(wrapper.length).toEqual(1);
    });

    it('has the expected classes', () => {
      expect(item.hasClass('bx--dropdown__list-item')).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(item.hasClass('extra-class')).toEqual(true);
    });

    it('should add the value passed via value', () => {
      expect(item.props().value).toEqual('test');
    });

    it('should add the item text passed via itemText', () => {
      expect(link.props().children).toEqual('test');
    });
  });
});
