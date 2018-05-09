import React from 'react';
import ToggleSmall from '../ToggleSmall';
import ToggleSmallSkeleton from '../ToggleSmall/ToggleSmall.Skeleton';
import { mount, shallow } from 'enzyme';

describe('ToggleSmall', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(<ToggleSmall id="toggle-1" ariaLabel="test label" />);

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
  });

  it('toggled prop sets checked prop on input', () => {
    const wrapper = mount(
      <ToggleSmall id="test" ariaLabel="test label" toggled />
    );

    const input = () => wrapper.find('input');
    expect(input().props().checked).toEqual(true);

    wrapper.setProps({ toggled: false });
    expect(input().props().checked).toEqual(false);
  });

  describe('events', () => {
    it('passes along onChange to <input>', () => {
      const onChange = jest.fn();
      const id = 'test-input';
      const wrapper = mount(
        <ToggleSmall ariaLabel="test label" id={id} onChange={onChange} />
      );

      const input = wrapper.find('input');
      const inputElement = input.instance();

      inputElement.checked = true;
      wrapper.find('input').simulate('change');

      expect(
        onChange.mock.calls.map(call =>
          call.map((arg, i) => (i > 0 ? arg : arg.target))
        )
      ).toEqual([[inputElement]]);
    });

    it('should invoke onToggle with expected arguments', () => {
      const onToggle = jest.fn();
      const id = 'test-input';
      const wrapper = mount(
        <ToggleSmall ariaLabel="test label" id={id} onToggle={onToggle} />
      );

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

describe('ToggleSmallSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<ToggleSmallSkeleton />);
    const input = wrapper.find('input');
    const toggleLabel = wrapper.find('.bx--toggle__label');

    it('Has the expected classes', () => {
      expect(input.hasClass('bx--skeleton')).toEqual(true);
      expect(input.hasClass('bx--toggle')).toEqual(true);
      expect(toggleLabel.hasClass('bx--skeleton')).toEqual(true);
    });
  });
});
