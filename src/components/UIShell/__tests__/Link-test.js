import React from 'react';
import { mount } from 'enzyme';
import Link from '../Link';

describe('UI Shell - Link', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      element: 'a',
      children: 'foo',
      href: '#',
    };
  });

  it('should render', () => {
    const wrapper = mount(<Link {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should support rendering a string element', () => {
    const wrapper = mount(<Link {...mockProps} element="div" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should support rendering a component as the element', () => {
    const mockComponent = props => <a {...props}>link</a>;
    const wrapper = mount(<Link {...mockProps} element={mockComponent} />);
    expect(wrapper).toMatchSnapshot();
  });
});
