/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import SideNavFooter from '../SideNavFooter';

describe('SideNavFooter', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      assistiveText: 'open',
      expanded: false,
      onToggle: jest.fn(),
    };
  });

  it('should render', () => {
    const closed = mount(<SideNavFooter {...mockProps} />);
    expect(closed).toMatchSnapshot();

    const open = mount(
      <SideNavFooter {...mockProps} assistiveText="close" isExpanded />
    );
    expect(open).toMatchSnapshot();
  });

  it('should call `onToggle` when clicked', () => {
    const wrapper = mount(<SideNavFooter {...mockProps} />);
    wrapper.find('button').simulate('click');
    expect(mockProps.onToggle).toHaveBeenCalledTimes(1);
  });
});
