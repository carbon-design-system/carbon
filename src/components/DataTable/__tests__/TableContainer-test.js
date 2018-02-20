import React from 'react';
import { mount } from 'enzyme';
import { TableContainer } from '../';

describe('DataTable.TableContainer', () => {
  it('should render', () => {
    const wrapper = mount(<TableContainer className="custom-class" />);
    expect(wrapper).toMatchSnapshot();
  });
});
