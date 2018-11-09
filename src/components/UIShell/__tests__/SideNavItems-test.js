import React from 'react';
import { mount } from 'enzyme';
import SideNavItems from '../SideNavItems';

describe('SideNavItems', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      className: 'custom-classname',
      children: <span>foo</span>,
    };
  });

  it('should render', () => {
    const wrapper = mount(<SideNavItems {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
