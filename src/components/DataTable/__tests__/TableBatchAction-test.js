import React from 'react';
import { mount } from 'enzyme';
import { TableBatchAction } from '../';

describe('DataTable.TableBatchAction', () => {
  it('should render', () => {
    const wrapper = mount(<TableBatchAction className="custom-class" />);
    expect(wrapper).toMatchSnapshot();
  });
});
