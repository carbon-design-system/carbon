import React from 'react';
import { mount } from 'enzyme';
import ListBox from '../';

describe('ListBoxField', () => {
  it('should render', () => {
    const wrapper = mount(
      <ListBox.Field>
        <ListBox.Selection clearSelection={jest.fn()} />
      </ListBox.Field>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should be focusable', () => {
    const wrapper = mount(
      <ListBox.Field>
        <ListBox.Selection clearSelection={jest.fn()} />
      </ListBox.Field>
    );
    expect(wrapper.children().prop('tabIndex')).toBe('0');
  });
});
