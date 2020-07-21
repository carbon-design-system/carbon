/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import SelectItemGroup from '../SelectItemGroup';
import { shallow } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;
describe('SelectItemGroup', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <SelectItemGroup className="extra-class" label="test" />
    );

    it('should have the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--select-optgroup`)).toEqual(true);
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
