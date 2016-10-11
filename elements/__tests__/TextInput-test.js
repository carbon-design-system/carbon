import React from 'react';
import TextInput from '../TextInput';
import { mount, shallow } from 'enzyme';

describe('TextInput', () => {
  describe('renders as expected', () => {
    const wrapper = mount(
      <TextInput id="test" className="extra-class" label="Text Input" />
    );

    const label = wrapper.find('label');
    const textInput = wrapper.find('input');

    describe('input', () => {
      it('renders as expected', () => {
        expect(textInput.length).toBe(1);
      });

      it('has the expected classes', () => {
        expect(textInput.hasClass('bx--text__input')).toEqual(true);
      });

      it('should add extra classes that are passed via className', () => {
        expect(textInput.hasClass('extra-class')).toEqual(true);
      });

      it('should set type as expected', () => {
        expect(textInput.props().type).toEqual('text');
        wrapper.setProps({ type: 'email' });
        expect(textInput.props().type).toEqual('email');
      });

      it('should set value as expected', () => {
        expect(textInput.props().defaultValue).toEqual(undefined);
        wrapper.setProps({ defaultValue: 'test' });
        expect(textInput.props().defaultValue).toEqual('test');
      });

      it('should set disabled as expected', () => {
        expect(textInput.props().disabled).toEqual(false);
        wrapper.setProps({ disabled: true });
        expect(textInput.props().disabled).toEqual(true);
      });

      it('should set placeholder as expected', () => {
        expect(textInput.props().placeholder).toEqual('');
        wrapper.setProps({ placeholder: 'Enter text' });
        expect(textInput.props().placeholder).toEqual('Enter text');
      });
    });

    describe('label', () => {
      it('renders a label', () => {
        expect(label.length).toBe(1);
      });

      it('has the expected classes', () => {
        expect(label.hasClass('bx--form__label')).toEqual(true);
      });

      it('should set label as expected', () => {
        expect(wrapper.props().label).toEqual('Text Input');
        wrapper.setProps({ label: 'Email Input' });
        expect(wrapper.props().label).toEqual('Email Input');
      });
    });
  });

  describe('events', () => {
    describe('disabled textinput', () => {
      const onClick = jest.fn();
      const onChange = jest.fn();

      const wrapper = shallow(
        <TextInput
          id="test"
          onClick={onClick}
          onChange={onChange}
          disabled
        />
      );

      const input = wrapper.find('input');

      it('should not invoke onClick', () => {
        input.simulate('click');
        expect(onClick).not.toBeCalled();
      });

      it('should not invoke onChange', () => {
        input.simulate('change');
        expect(onChange).not.toBeCalled();
      });
    });

    describe('enabled textinput', () => {
      const onClick = jest.fn();
      const onChange = jest.fn();

      const wrapper = shallow(
        <TextInput
          id="test"
          onClick={onClick}
          onChange={onChange}
        />
      );

      const input = wrapper.find('input');
      const eventObject = {
        target: {
          defaultValue: 'test',
        },
      };

      it('should invoke onClick when input is clicked', () => {
        input.simulate('click');
        expect(onClick).toBeCalled();
      });

      it('should invoke onChange when input value is changed', () => {
        input.simulate('change', eventObject);
        expect(onChange).toBeCalledWith(eventObject);
      });
    });
  });
});
