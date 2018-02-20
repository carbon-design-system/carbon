import React from 'react';
import { mount } from 'enzyme';
import { TableToolbarSearch } from '../';

describe('DataTable.TableToolbarSearch', () => {
  it('should render', () => {
    const wrapper = mount(
      <TableToolbarSearch className="custom-class" onChange={jest.fn()} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
