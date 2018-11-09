import React from 'react';
import { mount } from 'enzyme';
import SideNavLinkText from '../SideNavLinkText';

describe('SideNavLinkText', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      className: 'custom-classname',
      children: 'text',
    };
  });

  it('should render', () => {
    const wrapper = mount(<SideNavLinkText {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
