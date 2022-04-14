/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import SideNavHeader from '../SideNavHeader';

describe('SideNavHeader', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      renderIcon: () => <div>mock icon</div>,
      children: <span>foo</span>,
    };
  });

  it('should render', () => {
    const wrapper = mount(<SideNavHeader {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
