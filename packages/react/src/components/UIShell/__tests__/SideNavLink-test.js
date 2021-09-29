/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import SideNavLink from '../SideNavLink';

const prefix = 'bx';

describe('SideNavLink', () => {
  let mockProps, wrapper;

  beforeEach(() => {
    mockProps = {
      className: 'custom-classname',
      children: 'link',
      icon: <div>icon</div>,
      isActive: false,
    };
  });

  afterEach(() => {
    wrapper && wrapper.unmount();
  });

  it('should render', () => {
    const inactive = mount(<SideNavLink {...mockProps} />);
    expect(inactive).toMatchSnapshot();
    const active = mount(<SideNavLink {...mockProps} isActive />);
    expect(active).toMatchSnapshot();
  });

  it('should include a css class to render the large variant is large prop is set', () => {
    wrapper = mount(<SideNavLink {...mockProps} />);
    expect(
      wrapper.find('li').hasClass(`${prefix}--side-nav__item--large`)
    ).toBe(false);
    wrapper.setProps({ large: true });
    expect(
      wrapper.find('li').hasClass(`${prefix}--side-nav__item--large`)
    ).toBe(true);
  });
});
