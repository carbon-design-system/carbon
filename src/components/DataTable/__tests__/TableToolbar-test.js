import React from 'react';
import { mount } from 'enzyme';
import { TableToolbar } from '../';

describe('DataTable.TableToolbar', () => {
  it('should render', () => {
    const wrapper = mount(<TableToolbar className="custom-class" />);
    expect(wrapper).toMatchSnapshot();
  });
});
