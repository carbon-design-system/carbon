import React from 'react';
import { mount } from 'enzyme';
import { HeaderGlobalBar } from '../';

describe('HeaderGlobalBar', () => {
  it('should render', () => {
    const wrapper = mount(<HeaderGlobalBar className="custom-class" />);
    expect(wrapper).toMatchSnapshot();
  });
});
