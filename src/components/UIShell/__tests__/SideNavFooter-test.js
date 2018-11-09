import React from 'react';
import { mount } from 'enzyme';
import SideNavFooter from '../SideNavFooter';

describe('SideNavFooter', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      assistiveText: 'open',
      isExpanded: false,
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
