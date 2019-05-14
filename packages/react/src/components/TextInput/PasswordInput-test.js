import React from 'react';
import PasswordInput from './PasswordInput';
import { mount, shallow } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('PasswordInput', () => {
  describe('renders as expected', () => {
    const wrapper = mount(
      <PasswordInput
        id="test"
        className="extra-class"
        labelText="testlabel"
        helperText="testHelper"
        light
      />
    );

    const passwordInput = () => wrapper.find('input');

    describe('input', () => {
      it('renders as expected', () => {
        expect(passwordInput().length).toBe(1);
      });

      it('has the expected classes', () => {
        expect(passwordInput().hasClass(`${prefix}--text-input`)).toEqual(true);
      });

      it('should add extra classes that are passed via className', () => {
        expect(passwordInput().hasClass('extra-class')).toEqual(true);
      });

      it('has the expected classes for light', () => {
        wrapper.setProps({ light: true });
        expect(
          passwordInput().hasClass(`${prefix}--text-input--light`)
        ).toEqual(true);
      });

      it('should set type as expected', () => {
        expect(passwordInput().props().type).toEqual('password');
        wrapper.find('button').simulate('click');
        expect(passwordInput().props().type).toEqual('text');
      });

      it('should set value as expected', () => {
        expect(passwordInput().props().defaultValue).toEqual(undefined);
        wrapper.setProps({ defaultValue: 'test' });
        expect(passwordInput().props().defaultValue).toEqual('test');
      });

      it('should set disabled as expected', () => {
        expect(passwordInput().props().disabled).toEqual(false);
        wrapper.setProps({ disabled: true });
        expect(passwordInput().props().disabled).toEqual(true);
      });

      it('should set placeholder as expected', () => {
        expect(passwordInput().props().placeholder).not.toBeDefined();
        wrapper.setProps({ placeholder: 'Enter text' });
        expect(passwordInput().props().placeholder).toEqual('Enter text');
      });
    });

    describe('label', () => {
      wrapper.setProps({ labelText: 'Password Input' });
      const renderedLabel = wrapper.find('label');

      it('renders a label', () => {
        expect(renderedLabel.length).toBe(1);
      });

      it('has the expected classes', () => {
        expect(renderedLabel.hasClass(`${prefix}--label`)).toEqual(true);
      });

      it('should set label as expected', () => {
        expect(renderedLabel.text()).toEqual('Password Input');
      });
    });

    describe('helper', () => {
      it('renders a helper', () => {
        const renderedHelper = wrapper.find(`.${prefix}--form__helper-text`);
        expect(renderedHelper.length).toEqual(1);
      });

      it('renders children as expected', () => {
        wrapper.setProps({
          helperText: (
            <span>
              This helper text has <a href="/">a link</a>.
            </span>
          ),
        });
        const renderedHelper = wrapper.find(`.${prefix}--form__helper-text`);
        expect(renderedHelper.props().children).toEqual(
          <span>
            This helper text has <a href="/">a link</a>.
          </span>
        );
      });

      it('should set helper text as expected', () => {
        wrapper.setProps({ helperText: 'Helper text' });
        const renderedHelper = wrapper.find(`.${prefix}--form__helper-text`);
        expect(renderedHelper.text()).toEqual('Helper text');
      });
    });
  });

  describe('events', () => {
    describe('disabled textinput', () => {
      const onClick = jest.fn();
      const onChange = jest.fn();

      const wrapper = shallow(
        <PasswordInput
          id="test"
          labelText="testlabel"
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
        <PasswordInput
          labelText="testlabel"
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
