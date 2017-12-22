import React from 'react';
import { DataTableContainer } from '../DataTable';
import { shallow } from 'enzyme';

describe('DataTable', () => {
  it('should render', () => {
    const wrapper = shallow(
      <DataTableContainer>
        <div>Children</div>
      </DataTableContainer>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('has the expected classes', () => {
    const wrapper = shallow(
      <DataTableContainer>
        <div>Children</div>
      </DataTableContainer>
    );
    expect(wrapper.hasClass('bx--data-table-v2-container')).toEqual(true);
  });
});
