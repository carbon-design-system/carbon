/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import { SideNavMenu } from '../SideNavMenu';

describe('SideNavMenu', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      buttonRef: jest.fn(),
      className: 'custom-classname',
      children: 'text',
      renderIcon: () => <div>icon</div>,
      isActive: false,
      title: 'title',
    };
  });

  it('should render', () => {
    const wrapper = mount(<SideNavMenu {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should expand the menu when the button ref is clicked', () => {
    const wrapper = mount(<SideNavMenu {...mockProps} />);
    expect(wrapper.state('isExpanded')).toBe(false);
    expect(mockProps.buttonRef).toHaveBeenCalledTimes(1);
    wrapper.find('button').simulate('click');
    expect(wrapper.state('isExpanded')).toBe(true);
  });

  it('should reset expanded state if the isSideNavExpanded prop is false', () => {
    const wrapper = mount(<SideNavMenu {...mockProps} />);
    expect(wrapper.state('isExpanded')).toBe(false);
    expect(wrapper.state('wasPreviouslyExpanded')).toBe(false);
    wrapper.setState({ isExpanded: true });
    expect(wrapper.state('isExpanded')).toBe(true);
    expect(wrapper.state('wasPreviouslyExpanded')).toBe(false);
    // set the prop to false. This should force isExpanded from true to false, and update wasPreviouslyExpanded to true
    wrapper.setProps({ isSideNavExpanded: false });
    expect(wrapper.state('isExpanded')).toBe(false);
    expect(wrapper.state('wasPreviouslyExpanded')).toBe(true);
  });

  it('should reset expanded state if the SideNav was collapsed/expanded', () => {
    const wrapper = mount(<SideNavMenu {...mockProps} />);
    wrapper.setState({ isExpanded: false, wasPreviouslyExpanded: true });
    // set the prop to false. This should force isExpanded from true to false, and update wasPreviouslyExpanded to true
    wrapper.setProps({ isSideNavExpanded: true });
    expect(wrapper.state('isExpanded')).toBe(true);
    expect(wrapper.state('wasPreviouslyExpanded')).toBe(false);
  });
});
