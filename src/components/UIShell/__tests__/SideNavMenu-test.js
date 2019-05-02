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
});
