/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DropdownItem from '../DropdownItem';
import { mount } from 'enzyme';

describeBreakingChangesXFeatures('DropdownItem', () => {
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
      expect(item.hasClass('bx--dropdown-item')).toEqual(true);
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

  describe('Functions are called as expected', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <DropdownItem onClick={onClick} itemText="test" value="test" />
    );

    it('onClick is called as expected', () => {
      wrapper.simulate('click');
      expect(onClick).toBeCalled();
    });
  });
});
