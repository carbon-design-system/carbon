import React from 'react';
import PasswordInput from './PasswordInput';
import { mount, shallow } from 'enzyme';

const prefix = 'cds';

describe('PasswordInput', () => {
  describe('renders as expected', () => {
    const wrapper = mount(
      <PasswordInput
        id="test"
        className="extra-class"
        labelText="testlabel"
        helperText="testHelper"
        light
        showPasswordLabel="Show password"
        hidePasswordLabel="Hide password"
      />
    );

    const passwordInput = () => wrapper.find('input');

    describe('input', () => {
      it('renders as expected', () => {
        expect(passwordInput().length).toBe(1);
      });

      it('should accept refs', () => {
        class MyComponent extends React.Component {
          constructor(props) {
            super(props);
            this.passwordInput = React.createRef();
            this.focus = this.focus.bind(this);
          }
          focus() {
            this.passwordInput.current.focus();
          }
          render() {
            return (
              <PasswordInput
                id="test"
                labelText="testlabel"
                ref={this.passwordInput}
              />
            );
          }
        }
        const container = document.createElement('div');
        container.id = 'container';
        document.body.appendChild(container);
        const wrapper = mount(<MyComponent />, {
          attachTo: document.querySelector('#container'),
        });
        expect(document.activeElement.type).toBeUndefined();
        wrapper.instance().focus();
        expect(document.activeElement.type).toEqual('password');
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
        wrapper.find('button').simulate('click');
        expect(passwordInput().props().type).toEqual('password');
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

      it('should set password visibility toggle text as expected', () => {
        const { hidePasswordLabel, showPasswordLabel } = wrapper.props();
        wrapper.setProps({ disabled: false });
        expect(
          wrapper.find('.cds--text-input--password__visibility__toggle').text()
        ).toEqual(showPasswordLabel);
        wrapper
          .find('.cds--text-input--password__visibility__toggle')
          .simulate('click');
        expect(
          wrapper.find('.cds--text-input--password__visibility__toggle').text()
        ).toEqual(hidePasswordLabel);
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
        expect(onClick).toHaveBeenCalled();
      });

      it('should invoke onChange when input value is changed', () => {
        input.simulate('change', eventObject);
        expect(onChange).toHaveBeenCalledWith(eventObject);
      });
    });
  });
});
