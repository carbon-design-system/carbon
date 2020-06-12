/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import SideNavIcon from '../SideNavIcon';

describe('SideNavIcon', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      className: 'custom-classname',
      children: <span>foo</span>,
      small: false,
    };
  });

  it('should render', () => {
    const regular = mount(<SideNavIcon {...mockProps} />);
    expect(regular).toMatchSnapshot();
    const small = mount(<SideNavIcon {...mockProps} small />);
    expect(small).toMatchSnapshot();
  });
});
