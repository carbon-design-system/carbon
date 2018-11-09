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
