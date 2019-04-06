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
    expect(wrapper.state('isExpanded')).toBe(false);
    wrapper.find('button').simulate('click');
    expect(wrapper.state('isExpanded')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be expanded by default', () => {
    const wrapper = mount(<SideNav {...mockProps} isExpanded />);
    expect(wrapper.state('isExpanded')).toBe(true);
  });

  it('should be collapsed by default', () => {
    const wrapper = mount(<SideNav {...mockProps} />);
    expect(wrapper.state('isExpanded')).toBe(false);
  });

  it('Blur event should trigger a state update of isFocused', () => {
    const wrapper = mount(<SideNav {...mockProps} />);
    wrapper.simulate('focus');
    expect(wrapper.state('isFocused')).toBe(true);
    wrapper.simulate('blur');
    expect(wrapper.state('isFocused')).toBe(false);
  });

  it('Focus event should trigger a state update of isFocused', () => {
    const wrapper = mount(<SideNav {...mockProps} />);
    expect(wrapper.state('isFocused')).toBe(false);
    wrapper.simulate('focus');
    expect(wrapper.state('isFocused')).toBe(true);
  });
});
