import React from 'react';
import DataTableRow from '../DataTableRow';
import { shallow } from 'enzyme';

describe('DataTableRow', () => {
  it('should render', () => {
    const wrapper = shallow(
      <DataTableRow>
        <div>Children</div>
      </DataTableRow>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render children as expected', () => {
    const wrapper = shallow(
      <DataTableRow>
        <div>Children</div>
      </DataTableRow>
    );
    expect(wrapper.find('div').length).toEqual(1);
  });
});
