/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TabContent from '../TabContent';
import { shallow } from 'enzyme';

describe('TabContent', () => {
  describe('renders as expected', () => {
    const wrapper = shallow(
      <TabContent>
        <div className="child">content</div>
        <div className="child">content</div>
      </TabContent>
    );

    it('renders children as expected', () => {
      expect(wrapper.props().children.length).toEqual(2);
    });

    it('sets selected if passed in via props', () => {
      wrapper.setProps({ selected: true });
      expect(wrapper.props().selected).toEqual(true);
    });

    it('sets selected and hidden props with opposite boolean values', () => {
      wrapper.setProps({ selected: true });
      expect(wrapper.props().hidden).toEqual(false);
    });
  });
});
