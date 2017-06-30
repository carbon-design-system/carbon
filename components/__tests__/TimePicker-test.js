import React from 'react';
import TimePicker from '../TimePicker';
import { mount, shallow } from 'enzyme';

describe('TimePicker', () => {
  describe('renders as expected', () => {
    const wrapper = mount(<TimePicker id="test" className="extra-class" />);

    const timePicker = wrapper.childAt(0);
    const label = wrapper.find('label');
    const textInput = wrapper.find('input');

    describe('input', () => {
      it('renders as expected', () => {
        expect(textInput.length).toBe(1);
      });

      it('has the expected classes', () => {
        expect(timePicker.hasClass('bx--time-picker')).toEqual(true);
      });

      it('should add extra classes that are passed via className', () => {
        expect(timePicker.hasClass('extra-class')).toEqual(true);
      });

      it('should set type as expected', () => {
        expect(textInput.props().type).toEqual('text');
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
        wrapper.setProps({ placeholder: 'ss:mm' });
        expect(textInput.props().placeholder).toEqual('ss:mm');
      });
    });

    describe('label', () => {
      it('does not render a label by default', () => {
        expect(label.length).toBe(0);
      });

      wrapper.setProps({ labelText: 'Enter a time' });
      const renderedLabel = wrapper.find('label');

      it('renders a label', () => {
        expect(renderedLabel.length).toBe(1);
      });

      it('has the expected classes', () => {
        expect(renderedLabel.hasClass('bx--label')).toEqual(true);
      });

      it('should set label as expected', () => {
        expect(renderedLabel.text()).toEqual('Enter a time');
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
        <TimePicker id="test" onClick={onClick} onChange={onChange} />
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
