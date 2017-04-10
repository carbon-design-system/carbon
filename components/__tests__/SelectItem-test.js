import React from 'react';
import SelectItem from '../SelectItem';
import { shallow } from 'enzyme';

describe('SelectItem', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <SelectItem className="extra-class" value="test" text="test" />
    );

    it('Has the expected classes', () => {
      expect(wrapper.hasClass('bx--select-option')).toEqual(true);
    });

    it('Should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('Should add the value that is passed', () => {
      wrapper.setProps({ value: 'placeholder-item' });
      expect(wrapper.props().value).toEqual('placeholder-item');
    });

    it('Should add the select item text that is passed', () => {
      wrapper.setProps({ text: 'Pick an option' });
      expect(wrapper.props().children).toEqual('Pick an option');
    });

    it('Should not be disabled by default', () => {
      expect(wrapper.props().disabled).toEqual(false);
    });

    it('should set disabled as expected', () => {
      expect(wrapper.props().disabled).toEqual(false);
      wrapper.setProps({ disabled: true });
      expect(wrapper.props().disabled).toEqual(true);
    });

    it('should set hidden as expected', () => {
      expect(wrapper.props().hidden).toEqual(false);
      wrapper.setProps({ hidden: true });
      expect(wrapper.props().hidden).toEqual(true);
    });
  });
});
