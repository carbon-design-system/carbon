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
  let mockProps, wrapper;

  beforeEach(() => {
    mockProps = {
      'aria-label': 'Navigation',
      children: <h2>Navigation</h2>,
    };
  });

  afterEach(() => {
    wrapper && wrapper.unmount();
  });

  it('should render', () => {
    wrapper = mount(<SideNav {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('by default, all event listeners are added', () => {
    wrapper = mount(<SideNav {...mockProps} />);
    expect(wrapper.find('nav').props().onFocus).toBeDefined();
    expect(wrapper.find('nav').props().onBlur).toBeDefined();
    expect(wrapper.find('nav').props().onMouseEnter).toBeDefined();
    expect(wrapper.find('nav').props().onMouseLeave).toBeDefined();
  });

  it('if addFocusListeners is specified as false, no focus event listeners props are added', () => {
    wrapper = mount(<SideNav {...mockProps} />);
    wrapper.setProps({ addFocusListeners: false });
    expect(wrapper.find('nav').props().onFocus).not.toBeDefined();
    expect(wrapper.find('nav').props().onBlur).not.toBeDefined();
    expect(wrapper.find('nav').props().onMouseEnter).toBeDefined();
    expect(wrapper.find('nav').props().onMouseLeave).toBeDefined();
  });

  it('if addMouseListeners is specified as false, no mouse listener props are added', () => {
    wrapper = mount(<SideNav {...mockProps} />);
    wrapper.setProps({ addMouseListeners: false });
    expect(wrapper.find('nav').props().onFocus).toBeDefined();
    expect(wrapper.find('nav').props().onBlur).toBeDefined();
    expect(wrapper.find('nav').props().onMouseEnter).not.toBeDefined();
    expect(wrapper.find('nav').props().onMouseLeave).not.toBeDefined();
  });

  it('if both addFocusListeners and addMouseListeners are specified as false, no mouse or focus listener props are added', () => {
    wrapper = mount(<SideNav {...mockProps} />);
    wrapper.setProps({ addFocusListeners: false, addMouseListeners: false });
    expect(wrapper.find('nav').props().onFocus).not.toBeDefined();
    expect(wrapper.find('nav').props().onBlur).not.toBeDefined();
    expect(wrapper.find('nav').props().onMouseEnter).not.toBeDefined();
    expect(wrapper.find('nav').props().onMouseLeave).not.toBeDefined();
  });
});
