import React from 'react';
import { shallow } from 'enzyme';
import FormLabel from '../FormLabel';

describe('FormLabel', () => {
  it('should render', () => {
    const wrapper = shallow(<FormLabel />);
    expect(wrapper).toMatchSnapshot();
  });
});
