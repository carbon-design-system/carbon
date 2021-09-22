/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TimePicker from '../TimePicker';
import { mount, shallow } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('TimePicker', () => {
  describe('renders as expected', () => {
    describe('input', () => {
      let wrapper;
      let timePicker;
      let textInput;

      beforeEach(() => {
        wrapper = mount(<TimePicker id="test" className="extra-class" />);

        timePicker = () => wrapper.find(`.${prefix}--time-picker`);
        textInput = () => wrapper.find('input');
      });

      it('renders as expected', () => {
        expect(textInput().length).toBe(1);
      });

      it('should add extra classes that are passed via className', () => {
        expect(timePicker().hasClass('extra-class')).toEqual(true);
      });

      it('should set type as expected', () => {
        expect(textInput().props().type).toEqual('text');
      });

      it('should set value as expected', () => {
        expect(textInput().props().defaultValue).toEqual(undefined);
        wrapper.setProps({ defaultValue: 'test' });
        expect(textInput().props().defaultValue).toEqual('test');
      });

      it('should set disabled as expected', () => {
        expect(textInput().props().disabled).toEqual(false);
        wrapper.setProps({ disabled: true });
        expect(textInput().props().disabled).toEqual(true);
      });

      it('should set placeholder as expected', () => {
        wrapper.setProps({ placeholder: 'ss:mm' });
        expect(textInput().props().placeholder).toEqual('ss:mm');
      });
    });

    describe('label', () => {
      let wrapper;
      let label;

      beforeEach(() => {
        wrapper = mount(<TimePicker id="test" className="extra-class" />);

        label = () => wrapper.find('label');
      });

      it('does not render a label by default', () => {
        expect(label().length).toBe(0);
      });

      it('renders a label', () => {
        wrapper.setProps({ labelText: 'Enter a time' });
        const renderedlabel = wrapper.find('label');
        expect(renderedlabel.length).toBe(1);
      });

      it('has the expected classes', () => {
        wrapper.setProps({ labelText: 'Enter a time' });
        const renderedlabel = wrapper.find('label');
        expect(renderedlabel.hasClass(`${prefix}--label`)).toEqual(true);
      });

      it('should set label as expected', () => {
        wrapper.setProps({ labelText: 'Enter a time' });
        const renderedlabel = wrapper.find('label');
        expect(renderedlabel.text()).toEqual('Enter a time');
      });
    });
  });

  describe('events', () => {
    describe('disabled time picker', () => {
      const onClick = jest.fn();
      const onChange = jest.fn();

      const wrapper = mount(
        <TimePicker id="test" onClick={onClick} onChange={onChange} disabled />
      );

      const input = wrapper.find('input');

      it('should not invoke onClick', () => {
        input.simulate('click');
        expect(onClick).not.toHaveBeenCalled();
      });

      it('should not invoke onChange', () => {
        input.simulate('change');
        expect(onChange).not.toHaveBeenCalled();
      });
    });

    describe('enabled textinput', () => {
      const onClick = jest.fn();
      const onChange = jest.fn();
      const onBlur = jest.fn();

      const wrapper = shallow(
        <TimePicker
          id="test"
          onClick={onClick}
          onChange={onChange}
          onBlur={onBlur}
        />
      );

      const input = wrapper.find('input');
      const eventObject = {
        target: {
          defaultValue: 'test',
        },
      };

      it('should invoke onBlur when input is clicked', () => {
        input.simulate('blur', eventObject);
        expect(onBlur).toHaveBeenCalledWith(eventObject);
      });

      it('should invoke onClick when input is clicked', () => {
        input.simulate('click', eventObject);
        expect(onClick).toHaveBeenCalledWith(eventObject);
      });

      it('should invoke onChange when input value is changed', () => {
        input.simulate('change', eventObject);
        expect(onChange).toHaveBeenCalledWith(eventObject);
      });
    });
  });

  describe('Getting derived state from props', () => {
    it('should change the value upon change in props', () => {
      const wrapper = shallow(<TimePicker id="test" />);
      wrapper.setProps({ value: 'foo' });
      wrapper.setState({ value: 'foo' });
      wrapper.setProps({ value: 'bar' });
      expect(wrapper.state().value).toEqual('bar');
    });

    it('should avoid change the value upon setting props, unless there the value actually changes', () => {
      const wrapper = shallow(<TimePicker id="test" />);
      wrapper.setProps({ value: 'foo' });
      wrapper.setState({ value: 'bar' });
      wrapper.setProps({ value: 'foo' });
      expect(wrapper.state().value).toEqual('bar');
    });
  });
});
