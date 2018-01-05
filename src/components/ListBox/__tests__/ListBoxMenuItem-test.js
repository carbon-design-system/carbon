import React from 'react';
import { mount } from 'enzyme';
import ListBox from '../';

describe('ListBoxMenuItem', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      isActive: false,
      isHighlighted: false,
      children: <span>ListBox.MenuItem</span>,
    };
  });

  it('should render', () => {
    const wrapper = mount(<ListBox.MenuItem {...mockProps} />);
    const activeWrapper = mount(
      <ListBox.MenuItem {...mockProps} isActive={true} />
    );
    const highlightedWrapper = mount(
      <ListBox.MenuItem {...mockProps} isHighlighted={true} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(activeWrapper).toMatchSnapshot();
    expect(highlightedWrapper).toMatchSnapshot();
  });
});
