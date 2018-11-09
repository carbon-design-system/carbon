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
      icon: <div>icon</div>,
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
