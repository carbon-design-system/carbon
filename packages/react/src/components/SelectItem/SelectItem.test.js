/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import SelectItem from '../SelectItem';
import { shallow } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('SelectItem', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <SelectItem className="extra-class" value="test" text="test" />
    );

    it('Has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--select-option`)).toEqual(true);
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
