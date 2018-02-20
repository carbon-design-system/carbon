import React from 'react';
import { mount } from 'enzyme';
import { TableToolbarContent } from '../';

describe('DataTable.TableToolbarContent', () => {
  it('should render', () => {
    const wrapper = mount(<TableToolbarContent className="custom-class" />);
    expect(wrapper).toMatchSnapshot();
  });
});
