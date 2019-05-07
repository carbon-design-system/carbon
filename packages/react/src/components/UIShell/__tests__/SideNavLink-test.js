/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import SideNavLink from '../SideNavLink';

describe('SideNavLink', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      className: 'custom-classname',
      children: 'link',
      icon: <div>icon</div>,
      isActive: false,
    };
  });

  it('should render', () => {
    const inactive = mount(<SideNavLink {...mockProps} />);
    expect(inactive).toMatchSnapshot();
    const active = mount(<SideNavLink {...mockProps} isActive />);
    expect(active).toMatchSnapshot();
  });
});
