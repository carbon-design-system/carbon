import React from 'react';
import { mount } from 'enzyme';
import { Table } from '../';

describe('DataTable.Table', () => {
  it('should render', () => {
    const wrapper = mount(<Table className="custom-class" />);
    expect(wrapper).toMatchSnapshot();
  });
});
