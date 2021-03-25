/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ToggleSmallSkeleton from '../ToggleSmall/ToggleSmall.Skeleton';
import { mount, shallow } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('ToggleSmall', () => {
  let ToggleSmall;

  beforeEach(() => {
    jest.mock('../../internal/warning');

    ToggleSmall = require('../ToggleSmall').default;
  });

  describe('Renders as expected', () => {
    let input;
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <ToggleSmall
          id="toggle-1"
          aria-label="test label"
          labelA="Off"
          labelB="On"
        />
      );

      input = wrapper.find('input');
    });

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
  });

  it('toggled prop sets checked prop on input', () => {
    const wrapper = mount(
      <ToggleSmall id="test" aria-label="test label" toggled />
    );

    const input = () => wrapper.find('input');
    expect(input().props().checked).toEqual(true);

    wrapper.setProps({ toggled: false });
    expect(input().props().checked).toEqual(false);
  });

  describe('events', () => {
    it('passes along onChange to <input>', () => {
      const onChange = jest.fn();
      const id = 'test-input';
      const wrapper = mount(
        <ToggleSmall aria-label="test label" id={id} onChange={onChange} />
      );

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
      const wrapper = mount(
        <ToggleSmall aria-label="test label" id={id} onToggle={onToggle} />
      );

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
});

describe('ToggleSmallSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<ToggleSmallSkeleton />);
    const input = wrapper.find('input');
    const toggleLabel = wrapper.find(`.${prefix}--toggle__label`);

    it('Has the expected classes', () => {
      expect(input.hasClass(`${prefix}--skeleton`)).toEqual(true);
      expect(input.hasClass(`${prefix}--toggle`)).toEqual(true);
      expect(toggleLabel.hasClass(`${prefix}--skeleton`)).toEqual(true);
    });
  });
});
