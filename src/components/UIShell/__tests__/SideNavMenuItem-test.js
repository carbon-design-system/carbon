import React from 'react';
import { mount } from 'enzyme';
import SideNavMenuItem from '../SideNavMenuItem';

describe('SideNavMenuItem', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      className: 'custom-classname',
      children: 'link',
      isActive: false,
      href: '#',
      ref: jest.fn(),
    };
  });

  it('should render', () => {
    const wrapper = mount(<SideNavMenuItem {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
    expect(mockProps.ref).toHaveBeenCalledTimes(1);
  });

  it('should render active styles with `isActive` or `aria-current="page"`', () => {
    const activeProp = mount(<SideNavMenuItem {...mockProps} isActive />);
    expect(activeProp).toMatchSnapshot();

    const ariaProp = mount(
      <SideNavMenuItem {...mockProps} aria-current="page" />
    );
    expect(ariaProp).toMatchSnapshot();
  });
});
