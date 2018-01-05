import React from 'react';
import { mount } from 'enzyme';
import ListBox from '../';

describe('ListBoxMenu', () => {
  it('should render', () => {
    const wrapper = mount(
      <ListBox.Menu>
        <ListBox.MenuItem>Hello</ListBox.MenuItem>
      </ListBox.Menu>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
