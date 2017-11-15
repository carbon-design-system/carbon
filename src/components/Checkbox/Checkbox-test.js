import React from 'react';
import Checkbox from '../Checkbox';
import { mount } from 'enzyme';

describe('Checkbox', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(
      <Checkbox id="testing" labelText="testingLabel" className="extra-class" />
    );
    const label = wrapper.find('label');

    describe('label', () => {
      it('renders a label', () => {
        expect(label.length).toEqual(1);
      });

      it('has the expected classes', () => {
        expect(label.hasClass('bx--checkbox-label')).toEqual(true);
      });

      it('has the expected htmlFor value', () => {
        expect(label.props().htmlFor).toEqual('testing');
      });

      it('applies extra classes to label', () => {
        expect(label.hasClass('extra-class')).toEqual(true);
      });

      describe('firstSpan', () => {
        const span1 = label.find('span').first();
        it('has the expected className', () => {
          expect(span1.props().className).toEqual('bx--checkbox-appearance');
        });

        it('has expected children', () => {
          const icon = span1.childAt(0);
          expect(icon.props().className).toEqual('bx--checkbox-checkmark');
          expect(icon.props().name).toEqual('checkmark');
        });
      });

      describe('secondSpan', () => {
        const span2 = label.find('span').last();
        it('has the expected className', () => {
          expect(span2.props().className).toEqual('bx--checkbox-label-text');
        });
        it('has the expected labelText', () => {
          expect(span2.props().children).toEqual('testingLabel');
        });
      });

      describe('input', () => {
        const input = () => wrapper.find('input');

        it('has id set as expected', () => {
          expect(input().props().id).toEqual('testing');
        });

        it('defaultChecked prop sets defaultChecked on input', () => {
          expect(input().props().defaultChecked).toBeUndefined();
          wrapper.setProps({ defaultChecked: true });
          expect(input().props().defaultChecked).toEqual(true);
        });
      });
    });
  });

  it('disabled prop on component sets disabled prop on input', () => {
    const wrapper = mount(<Checkbox id="test" disabled />);

    const input = () => wrapper.find('input');
    expect(input().props().disabled).toEqual(true);

    wrapper.setProps({ disabled: false });
    expect(input().props().disabled).toEqual(false);
  });

  it('checked prop on component sets checked prop on input', () => {
    const wrapper = mount(<Checkbox id="test" checked />);

    const input = () => wrapper.find('input');
    expect(input().props().checked).toEqual(true);

    wrapper.setProps({ checked: false });
    expect(input().props().checked).toEqual(false);
  });

  describe('events', () => {
    it('should invoke onChange with expected arguments', () => {
      const onChange = jest.fn();
      const id = 'test-input';
      const wrapper = mount(<Checkbox id={id} onChange={onChange} />);

      const input = wrapper.find('input');
      const inputElement = input.instance();

      inputElement.checked = true;
      wrapper.find('input').simulate('change');

      const call = onChange.mock.calls[0];

      expect(call[0]).toEqual(true);
      expect(call[1]).toEqual(id);
      expect(call[2].target).toBe(inputElement);
    });
  });
});
