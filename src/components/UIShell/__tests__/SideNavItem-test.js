/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import SideNavItem from '../SideNavItem';

describe('SideNavItem', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      className: 'custom-classname',
      children: <span>foo</span>,
    };
  });

  it('should render', () => {
    const wrapper = mount(<SideNavItem {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
