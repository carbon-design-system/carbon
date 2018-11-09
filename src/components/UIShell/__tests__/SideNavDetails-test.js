import React from 'react';
import { mount } from 'enzyme';
import SideNavDetails from '../SideNavDetails';

describe('SideNavDetails', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      title: 'foo',
    };
  });

  it('should render', () => {
    const wrapper = mount(<SideNavDetails {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
