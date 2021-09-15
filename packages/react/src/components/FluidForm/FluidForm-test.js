/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidForm from '../FluidForm';
import { shallow, mount } from 'enzyme';

describe('FluidForm', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(<FluidForm className="extra-class" />);
    it('renders children as expected', () => {
      expect(wrapper.find('.child').length).toBe(0);
    });
    it('renders wrapper as expected', () => {
      expect(wrapper.length).toBe(1);
    });
    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('should render wrapper as expected', () => {
      const form = shallow(
        <FluidForm>
          <div className="test-child1" />
          <div className="test-child2" />
        </FluidForm>
      );
      expect(form.length).toEqual(1);
    });
    it('should render children as expected', () => {
      const form1 = shallow(
        <FluidForm>
          <div className="test-child" />
          <div className="test-child" />
        </FluidForm>
      );
      expect(form1.find('.test-child').length).toBe(2);
    });

    it('should handle submit events', () => {
      const onSubmit = jest.fn();
      const form1 = mount(
        <FluidForm>
          <button className="button" type="submit" onSubmit={onSubmit}>
            Submit
          </button>
        </FluidForm>
      );
      const btn = form1.find('button');
      btn.simulate('submit');
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
