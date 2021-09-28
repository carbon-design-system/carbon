/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import SideNavItem from '../SideNavItem';

const prefix = 'bx';
describe('SideNavItem', () => {
  let mockProps, wrapper;

  beforeEach(() => {
    mockProps = {
      className: 'custom-classname',
      children: <span>foo</span>,
    };
  });

  afterEach(() => {
    wrapper && wrapper.unmount();
  });

  it('should render', () => {
    wrapper = mount(<SideNavItem {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should include a css class to render the large variant is large prop is set', () => {
    wrapper = mount(<SideNavItem {...mockProps} />);
    expect(
      wrapper.find('li').hasClass(`${prefix}--side-nav__item--large`)
    ).toBe(false);
    wrapper.setProps({ large: true });
    expect(
      wrapper.find('li').hasClass(`${prefix}--side-nav__item--large`)
    ).toBe(true);
  });
});
