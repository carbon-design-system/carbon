/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import SideNav from '../SideNav';

describe('SideNav', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      'aria-label': 'Navigation',
      children: <h2>Navigation</h2>,
    };
  });

  it('should render', () => {
    const wrapper = mount(<SideNav {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should toggle the menu expansion state when clicking on the footer', () => {
    const wrapper = mount(<SideNav {...mockProps} />);
    expect(wrapper.state('isExpanded')).toBe(true);
    wrapper.find('button').simulate('click');
    expect(wrapper.state('isExpanded')).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('should add focus class when nav items are focused', () => {
    const wrapper = mount(<SideNav {...mockProps} />);
    wrapper.simulate('focus');
    expect(wrapper.state('isFocused')).toBe(true);
  });
});
