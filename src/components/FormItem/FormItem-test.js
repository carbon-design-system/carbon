import React from 'react';
import { shallow } from 'enzyme';
import FormItem from '../FormItem';

describe('FormItem', () => {
  it('should render', () => {
    const wrapper = shallow(<FormItem />);
    expect(wrapper).toMatchSnapshot();
  });
});
