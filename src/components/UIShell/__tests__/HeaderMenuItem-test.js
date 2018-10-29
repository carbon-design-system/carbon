import React from 'react';
import { mount } from 'enzyme';
import { HeaderMenuItem } from '../';

describe('HeaderMenuItem', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      className: 'custom-class',
      children: 'Menu Item',
      role: 'none',
      ref: jest.fn(),
    };
  });

  it('should render', () => {
    const wrapper = mount(<HeaderMenuItem {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
    expect(mockProps.ref).toHaveBeenCalledTimes(1);
  });
});
