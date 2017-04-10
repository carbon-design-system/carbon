import React from 'react';
import SelectItemGroup from '../SelectItemGroup';
import { shallow } from 'enzyme';

describe('SelectItemGroup', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <SelectItemGroup className="extra-class" label="test" />
    );

    it('should have the expected classes', () => {
      expect(wrapper.hasClass('bx--select-optgroup')).toEqual(true);
    });

    it('Should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('Should add the label that is passed', () => {
      wrapper.setProps({ label: 'placeholder-item' });
      expect(wrapper.props().label).toEqual('placeholder-item');
    });

    it('Should not be disabled by default', () => {
      expect(wrapper.props().disabled).toEqual(false);
    });

    it('should set disabled as expected', () => {
      expect(wrapper.props().disabled).toEqual(false);
      wrapper.setProps({ disabled: true });
      expect(wrapper.props().disabled).toEqual(true);
    });
  });
});
