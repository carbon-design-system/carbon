/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import RadioButton from '../RadioButton';
import { mount } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

const render = (props) =>
  mount(
    <RadioButton
      {...props}
      className="extra-class"
      name="test-name"
      value="test-value"
      labelText="testlabel"
    />
  );

describe('RadioButton', () => {
  describe('renders as expected', () => {
    const wrapper = render({
      checked: true,
    });

    const input = wrapper.find('input');
    const label = wrapper.find('label');
    const div = wrapper.find('div');

    describe('input', () => {
      it('is of type radio', () => {
        expect(input.props().type).toEqual('radio');
      });

      it('has the expected class', () => {
        expect(input.hasClass(`${prefix}--radio-button`)).toEqual(true);
      });

      it('has a unique id set by default', () => {
        expect(input.props().id).toBeDefined();
      });

      it('should have checked set when checked is passed', () => {
        wrapper.setProps({ checked: true });
        expect(input.props().checked).toEqual(true);
      });

      it('should set the name prop as expected', () => {
        expect(input.props().name).toEqual('test-name');
      });
    });

    describe('label', () => {
      it('should set htmlFor', () => {
        expect(label.props().htmlFor).toEqual(input.props().id);
      });

      it('should set the correct class', () => {
        expect(label.props().className).toEqual(
          `${prefix}--radio-button__label`
        );
      });

      it('should render a span with the correct class for radio style', () => {
        const span = label.find('span');
        expect(
          span.at(0).hasClass(`${prefix}--radio-button__appearance`)
        ).toEqual(true);
      });

      it('should render a span for the label text', () => {
        const span = label.find('span');
        expect(span.at(1).hasClass('')).toEqual(true);
        expect(span.at(1).text()).toEqual('testlabel');
      });

      it('should render label text', () => {
        wrapper.setProps({ labelText: 'test label text' });
        expect(label.text()).toMatch(/test label text/);
      });

      it('should not have the className when no class is passed through props', () => {
        expect(label.hasClass(label.props.className)).toEqual(false);
      });

      it('should have the className passed through props', () => {
        const label = render({
          className: 'extra-class',
        });
        expect(label.hasClass('extra-class')).toEqual(true);
      });
    });

    describe('wrapper', () => {
      it('should have the correct class', () => {
        expect(div.hasClass(`${prefix}--radio-button-wrapper`)).toEqual(true);
      });

      it('should have extra classes applied', () => {
        expect(div.hasClass('extra-class')).toEqual(true);
      });
    });
  });

  it('should set defaultChecked as expected', () => {
    const wrapper = render({
      defaultChecked: true,
    });

    const input = () => wrapper.find('input');
    expect(input().props().defaultChecked).toEqual(true);
    wrapper.setProps({ defaultChecked: false });
    expect(input().props().defaultChecked).toEqual(false);
  });

  it('should set id if one is passed in', () => {
    const wrapper = render({
      id: 'unique-id',
    });

    const input = wrapper.find('input');
    expect(input.props().id).toEqual('unique-id');
  });

  describe('events', () => {
    it('should invoke onChange with expected arguments', () => {
      const onChange = jest.fn();
      const wrapper = render({ onChange });
      const input = wrapper.find('input');
      const inputElement = input.instance();

      inputElement.checked = true;
      wrapper.find('input').simulate('change');

      const call = onChange.mock.calls[0];

      expect(call[0]).toEqual('test-value');
      expect(call[1]).toEqual('test-name');
      expect(call[2].target).toBe(inputElement);
    });
  });

  it('supports disabled state', () => {
    const wrapper = render({
      disabled: true,
    });

    const input = () => wrapper.find('input');
    expect(input().props().disabled).toEqual(true);
  });
});
