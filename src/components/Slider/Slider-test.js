import React from 'react';
import Slider from '../Slider';
import TextInput from '../TextInput';
import { mount } from 'enzyme';
import 'requestanimationframe';

describe('Slider', () => {
  describe('Renders as expected', () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <Slider
        id="slider"
        className="extra-class"
        value={50}
        min={0}
        max={100}
        step={1}
        onChange={mockFn}>
        <TextInput id="input-for-slider" className="bx-slider-text-input" />
      </Slider>
    );

    it('renders children as expected', () => {
      expect(wrapper.find('.bx--text-input').length).toBe(1);
    });

    it('has the expected classes', () => {
      expect(wrapper.find('.bx--slider').length).toBe(1);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.find('.bx--slider').hasClass('extra-class')).toEqual(true);
    });

    it('can be disabled', () => {
      wrapper.setProps({ disabled: true });
      expect(wrapper.props().disabled).toEqual(true);
    });

    it('can set value via props', () => {
      wrapper.setProps({ value: 55 });
      expect(wrapper.props().value).toEqual(55);
    });
  });

  describe('updatePosition method', () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <Slider
        id="slider"
        className="extra-class"
        value={50}
        min={0}
        max={100}
        step={1}
        onChange={mockFn}
      />
    );

    it('sets correct state from event with a right/up keydown', () => {
      const evt = {
        type: 'keydown',
        which: '38',
      };
      wrapper.instance().updatePosition(evt);
      expect(mockFn).lastCalledWith({ value: 51 });
      expect(wrapper.state().value).toEqual(51);
    });

    it('sets correct state from event with a left/down keydown', () => {
      const evt = {
        type: 'keydown',
        which: '40',
      };
      wrapper.instance().updatePosition(evt);
      expect(mockFn).lastCalledWith({ value: 50 });
      expect(wrapper.state().value).toEqual(50);
    });

    it('sets correct state from event with a clientX', () => {
      const evt = {
        type: 'click',
        clientX: '1000',
      };
      wrapper.instance().updatePosition(evt);
      expect(mockFn).lastCalledWith({ value: 100 });
      expect(wrapper.state().value).toEqual(100);
    });
  });
});
