import React from 'react';
import Toggle from '../Toggle';
import { mount } from 'enzyme';

describe('Toggle', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(<Toggle id="toggle-1" />);

    const input = wrapper.find('input');

    it('Switch and label Ids should match', () => {
      const toggleLabel = wrapper.find('.bx--toggle__label');
      expect(input.id).toEqual(toggleLabel.htmlFor);
    });

    it('should set defaultChecked as expected', () => {
      expect(input.props().defaultChecked).toEqual(false);
      wrapper.setProps({ defaultToggled: true });
      expect(wrapper.find('input').props().defaultChecked).toEqual(true);
    });

    it('Can set defaultToggled state', () => {
      wrapper.setProps({ defaultToggled: true });
      expect(wrapper.find('.bx--toggle').props().defaultChecked).toEqual(true);
    });

    it('Should add extra classes that are passed via className', () => {
      wrapper.setProps({ className: 'extra-class' });
      expect(wrapper.find('div').hasClass('extra-class')).toEqual(true);
    });

    it('Can be disabled', () => {
      wrapper.setProps({ disabled: true });
      expect(wrapper.find('.bx--toggle').props().disabled).toEqual(true);
    });

    it('Can have a labelA', () => {
      wrapper.setProps({ labelA: 'labelA-test' });
      expect(wrapper.find('.bx--toggle__text--left').text()).toEqual(
        'labelA-test'
      );
    });

    it('Can have a labelB', () => {
      wrapper.setProps({ labelB: 'labelB-test' });
      expect(wrapper.find('.bx--toggle__text--right').text()).toEqual(
        'labelB-test'
      );
    });
  });

  it('toggled prop sets checked prop on input', () => {
    const wrapper = mount(<Toggle id="test" toggled />);

    const input = () => wrapper.find('input');
    expect(input().props().checked).toEqual(true);

    wrapper.setProps({ toggled: false });
    expect(input().props().checked).toEqual(false);
  });

  describe('events', () => {
    it('should invoke onToggle with expected arguments', () => {
      const onToggle = jest.fn();
      const id = 'test-input';
      const wrapper = mount(<Toggle id={id} onToggle={onToggle} />);

      const input = wrapper.find('input');
      const inputElement = input.instance();

      inputElement.checked = true;
      wrapper.find('input').simulate('change');

      const call = onToggle.mock.calls[0];

      expect(call[0]).toEqual(true);
      expect(call[1]).toEqual(id);
      expect(call[2].target).toBe(inputElement);
    });
  });
});
