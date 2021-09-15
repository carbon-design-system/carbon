/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Form from '../Form';
import { shallow, mount } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('Form', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<Form className="extra-class" />);

    it('renders children as expected', () => {
      expect(wrapper.find('.child').length).toBe(0);
    });
    it('renders wrapper as expected', () => {
      expect(wrapper.length).toBe(1);
    });
    it('has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--form`)).toEqual(true);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('should render wrapper as expected', () => {
      const form = shallow(
        <Form>
          <div className="test-child1" />
          <div className="test-child2" />
        </Form>
      );
      expect(form.length).toEqual(1);
    });
    it('should render children as expected', () => {
      const form1 = shallow(
        <Form>
          <div className="test-child" />
          <div className="test-child" />
        </Form>
      );
      expect(form1.find('.test-child').length).toBe(2);
    });

    it('should handle submit events', () => {
      const onSubmit = jest.fn();
      const form1 = mount(
        <Form>
          <button className="button" type="submit" onSubmit={onSubmit}>
            Submit
          </button>
        </Form>
      );
      const btn = form1.find('button');
      btn.simulate('submit');
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
