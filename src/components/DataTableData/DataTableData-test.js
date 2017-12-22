import React from 'react';
import DataTableData from '../DataTableData';
import { shallow } from 'enzyme';

describe('DataTableData', () => {
  it('should render', () => {
    const wrapper = shallow(
      <DataTableData>
        <div>Children</div>
      </DataTableData>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render children as expected', () => {
    const wrapper = shallow(
      <DataTableData>
        <div>Children</div>
      </DataTableData>
    );
    expect(wrapper.find('div').length).toEqual(1);
  });
});
