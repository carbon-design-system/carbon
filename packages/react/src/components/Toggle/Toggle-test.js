/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Toggle from '../Toggle';
import { mount } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;
describe('Toggle', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(<Toggle id="toggle-1" />);

    const input = wrapper.find('input');

    it('Switch and label Ids should match', () => {
      const toggleLabel = wrapper.find(`.${prefix}--toggle__label`);
      expect(input.id).toEqual(toggleLabel.htmlFor);
    });

    it('should set defaultChecked as expected', () => {
      expect(input.props().defaultChecked).toEqual(false);
      wrapper.setProps({ defaultToggled: true });
      expect(wrapper.find('input').props().defaultChecked).toEqual(true);
    });

    it('Can set defaultToggled state', () => {
      wrapper.setProps({ defaultToggled: true });
      expect(
        wrapper.find(`.${prefix}--toggle-input`).props().defaultChecked
      ).toEqual(true);
    });

    it('Should add extra classes that are passed via className', () => {
      wrapper.setProps({ className: 'extra-class' });
      expect(wrapper.find('div').hasClass('extra-class')).toEqual(true);
    });

    it('Can be disabled', () => {
      wrapper.setProps({ disabled: true });
      expect(wrapper.find(`.${prefix}--toggle-input`).props().disabled).toEqual(
        true
      );
    });

    it('Can have a labelA', () => {
      wrapper.setProps({ labelA: 'labelA-test' });
      expect(wrapper.find(`.${prefix}--toggle__text--off`).text()).toEqual(
        'labelA-test'
      );
    });

    it('Can have a labelB', () => {
      wrapper.setProps({ labelB: 'labelB-test' });
      expect(wrapper.find(`.${prefix}--toggle__text--on`).text()).toEqual(
        'labelB-test'
      );
    });
  });

  it('toggled prop sets checked prop on input', () => {
    const wrapper = mount(<Toggle id="test" toggled />);

    const input = () => wrapper.find('input');
    expect(input().props().checked).toEqual(true);

    wrapper.setProps({ toggled: false });
    expect(input().props().checked).toEqual(false);
  });

  describe('events', () => {
    it('passes along onChange to <input>', () => {
      const onChange = jest.fn();
      const id = 'test-input';
      const wrapper = mount(<Toggle id={id} onChange={onChange} />);

      const input = wrapper.find('input');
      const inputElement = input.instance();

      inputElement.checked = true;
      wrapper.find('input').simulate('change');

      expect(
        onChange.mock.calls.map((call) =>
          call.map((arg, i) => (i > 0 ? arg : arg.target))
        )
      ).toEqual([[inputElement]]);
    });

    it('should invoke onToggle with expected arguments', () => {
      const onToggle = jest.fn();
      const id = 'test-input';
      const wrapper = mount(<Toggle id={id} onToggle={onToggle} />);

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

  describe('ToggleSmall', () => {
    const wrapper = mount(<Toggle id="toggle-1" size="sm" />);

    it('Sets the `ToggleSmall` className', () => {
      const input = wrapper.find('input');
      expect(input.hasClass(`${prefix}--toggle-input--small`)).toEqual(true);
    });

    it('Renders a checkmark SVG', () => {
      const svg = wrapper.find(`.${prefix}--toggle__check`);
      expect(svg.length).toBe(1);
    });

    it('Does not render toggle text', () => {
      const offLabel = wrapper.find(`.${prefix}--toggle__text--off`);
      const onLabel = wrapper.find(`.${prefix}--toggle__text--on`);
      expect(offLabel.length).toBe(0);
      expect(onLabel.length).toBe(0);
    });
  });
});
