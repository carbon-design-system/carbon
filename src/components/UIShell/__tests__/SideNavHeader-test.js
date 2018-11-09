import React from 'react';
import { mount } from 'enzyme';
import SideNavHeader from '../SideNavHeader';

describe('SideNavHeader', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      icon: <div>mock icon</div>,
      children: <span>foo</span>,
    };
  });

  it('should render', () => {
    const wrapper = mount(<SideNavHeader {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
