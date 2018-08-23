import React from 'react';
import { mount, shallow } from 'enzyme';
import { Table } from '../';

describe('DataTable.Table', () => {
  it('should render', () => {
    const wrapper = mount(<Table className="custom-class" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should support disable zebra stripe', () => {
    const wrapper = shallow(<Table zebra={false} />);
    expect(wrapper.hasClass('bx--data-table-v2')).toBe(true);
    expect(wrapper.hasClass('bx--data-table-v2--zebra')).toBe(false);
  });
});
