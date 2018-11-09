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
