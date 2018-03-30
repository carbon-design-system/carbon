import React from 'react';
import { mount } from 'enzyme';
import { TableToolbarSearch } from '../';

describe('DataTable.TableToolbarSearch', () => {
  it('should render', () => {
    const wrapper = mount(
      <TableToolbarSearch
        className="custom-class"
        onChange={jest.fn()}
        id="custom-id"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
