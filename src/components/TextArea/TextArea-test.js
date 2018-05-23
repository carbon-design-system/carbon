import React from 'react';
import { mount, shallow } from 'enzyme';
import TextArea from '../TextArea';

describe('TextArea', () => {
  describe('should render as expected', () => {
    const wrapper = mount(
      <TextArea id="testing" labelText="testlabel" className="extra-class" />
    );

    const textarea = () => wrapper.find('textarea');

    describe('textarea', () => {
      it('renders a textarea', () => {
        expect(textarea().length).toEqual(1);
      });

      it('has the expected classes', () => {
        expect(textarea().hasClass('bx--text-area')).toEqual(true);
      });

      it('applies extra classes specified via className', () => {
        expect(textarea().hasClass('extra-class')).toEqual(true);
      });

      it('should set rows as expected', () => {
        expect(textarea().props().rows).toEqual(4);
        wrapper.setProps({ rows: 10 });
        expect(textarea().props().rows).toEqual(10);
      });

      it('should set cols as expected', () => {
        expect(textarea().props().cols).toEqual(50);
        wrapper.setProps({ cols: 200 });
        expect(textarea().props().cols).toEqual(200);
      });

      it('should set disabled as expected', () => {
        expect(textarea().props().disabled).toEqual(false);
        wrapper.setProps({ disabled: true });
        expect(textarea().props().disabled).toEqual(true);
      });

      it('should set placeholder as expected', () => {
        wrapper.setProps({ placeholder: 'Type here' });
        expect(textarea().props().placeholder).toEqual('Type here');
      });

      it('should set value as expected', () => {
        wrapper.setProps({ value: 'value set' });
        expect(textarea().props().value).toEqual('value set');
      });

      it('should set defaultValue as expected', () => {
        wrapper.setProps({ defaultValue: 'default value' });
        expect(textarea().props().defaultValue).toEqual('default value');
      });

      it('should specify light version as expected', () => {
        expect(wrapper.props().light).toEqual(false);
        wrapper.setProps({ light: true });
        expect(wrapper.props().light).toEqual(true);
      });
    });

    describe('label', () => {
      wrapper.setProps({ labelText: 'testLabel' });
      const renderedLabel = wrapper.find('label');

      it('renders a label', () => {
        expect(renderedLabel.length).toEqual(1);
      });

      it('label has expected text', () => {
        expect(renderedLabel.text()).toEqual('testLabel');
      });

      it('has the expected classes', () => {
        expect(renderedLabel.hasClass('bx--label')).toEqual(true);
      });
    });
  });

  describe('events', () => {
    describe('disabled textarea', () => {
      const onClick = jest.fn();
      const onChange = jest.fn();

      const wrapper = shallow(
        <TextArea
          id="test"
          labelText="testlabel"
          onClick={onClick}
          onChange={onChange}
          disabled
        />
      );

      const textarea = wrapper.find('textarea');

      it('should not invoke onClick when textarea is clicked', () => {
        textarea.simulate('click');
        expect(onClick).not.toBeCalled();
      });

      it('should not invoke onChange', () => {
        textarea.simulate('change');
        expect(onChange).not.toBeCalled();
      });
    });

    describe('enabled textarea', () => {
      const onClick = jest.fn();
      const onChange = jest.fn();
      const eventObject = {
        target: { value: 'test' },
      };

      const wrapper = shallow(
        <TextArea
          id="test"
          labelText="testlabel"
          onClick={onClick}
          onChange={onChange}
        />
      );

      const textarea = wrapper.find('textarea');

      it('should invoke onClick when textarea is clicked', () => {
        textarea.simulate('click');
        expect(onClick).toBeCalled();
      });

      it('should invoke onChange when textarea value is changed', () => {
        textarea.simulate('change', eventObject);
        expect(onChange).toBeCalledWith(eventObject);
      });
    });
  });
});
