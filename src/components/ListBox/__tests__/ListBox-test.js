import React from 'react';
import { mount } from 'enzyme';
import ListBox from '../';

describe('ListBox', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      type: 'default',
      children: <ListBox.Field />,
      className: 'bx--list-box__container',
      disabled: false,
      innerRef: jest.fn(),
    };
  });

  it('should render', () => {
    const wrapper = mount(<ListBox {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an inline class if the type=`inline`', () => {
    const wrapper = mount(<ListBox {...mockProps} type="inline" />);
    expect(wrapper.find('.bx--list-box--inline').length).toBe(1);
  });

  it('should render a disabled class if disabled is true', () => {
    const wrapper = mount(<ListBox {...mockProps} disabled />);
    expect(wrapper.find('.bx--list-box--disabled').length).toBe(1);
  });

  it('should call the provided `innerRef` function with a ref to the node', () => {
    mount(<ListBox {...mockProps} />);
    expect(mockProps.innerRef).toHaveBeenCalled();
  });

  it('should add the provided `className` to the root node', () => {
    const wrapper = mount(<ListBox {...mockProps} />);
    expect(
      wrapper
        .children()
        .prop('className')
        .includes(mockProps.className)
    ).toBe(true);
  });
});
