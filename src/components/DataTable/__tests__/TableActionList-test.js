import React from 'react';
import { mount } from 'enzyme';
import { TableActionList } from '../';

describe('DataTable.TableActionList', () => {
  it('should render', () => {
    const wrapper = mount(<TableActionList className="custom-class" />);
    expect(wrapper).toMatchSnapshot();
  });
});
