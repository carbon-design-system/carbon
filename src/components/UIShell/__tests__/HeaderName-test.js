import React from 'react';
import { mount } from 'enzyme';
import { HeaderName } from '../';

describe('HeaderName', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      className: 'custom-class',
      children: 'Name',
      prefix: 'IBM',
      href: '/',
    };
  });

  it('should render', () => {
    const wrapper = mount(<HeaderName {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
