/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Toggle from './Toggle';
import { mount } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('Toggle', () => {
  const props = {
    id: 'toggle-id',
    labelA: 'labelA-unchecked',
    labelB: 'labelB-checked',
    labelText: 'toggle-label',
    toggled: false,
    onToggle: () => {},
  };
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Toggle {...props} />);
  });

  describe('renders as expected', () => {
    it('button and label ids should match', () => {
      const button = wrapper.find('button');
      const label = wrapper.find('label');
      expect(button.id).toBe(label.htmlFor);
    });

    it('renders labelA when unchecked', () => {
      wrapper.setProps({ toggled: false });
      expect(wrapper.find(`.${prefix}--toggle__text`).text()).toBe(
        props.labelA
      );
    });

    it('renders labelB when checked', () => {
      wrapper.setProps({ toggled: true });
      expect(wrapper.find(`.${prefix}--toggle__text`).text()).toBe(
        props.labelB
      );
    });

    it('supports additional css class names', () => {
      const className = 'some-additional-class';
      wrapper.setProps({ className });
      expect(wrapper.find(`.${prefix}--toggle`).hasClass(className)).toBe(true);
    });

    it('supports sm size', () => {
      expect(
        wrapper
          .find(`.${prefix}--toggle__appearance`)
          .hasClass(`${prefix}--toggle__appearance--sm`)
      ).toBe(false);
      expect(wrapper.find(`.${prefix}--toggle__check`).length).toBe(0);

      wrapper.setProps({ size: 'sm' });

      expect(
        wrapper
          .find(`.${prefix}--toggle__appearance`)
          .hasClass(`${prefix}--toggle__appearance--sm`)
      ).toBe(true);
      expect(wrapper.find(`.${prefix}--toggle__check`).length).toBe(1);
    });
  });

  describe('behaves as expected', () => {
    it('supports to be disabled', () => {
      expect(wrapper.find('button').props().disabled).toBe(false);
      wrapper.setProps({ disabled: true });
      expect(wrapper.find('button').props().disabled).toBe(true);
    });

    it('can be controlled with props.toggled', () => {
      wrapper.setProps({ toggled: false });
      expect(wrapper.find('button').props()['aria-checked']).toBe(false);
      wrapper.setProps({ toggled: true });
      expect(wrapper.find('button').props()['aria-checked']).toBe(true);
    });
  });

  describe('emits events as expected', () => {
    it('passes along props.onClick to button', () => {
      const onClick = jest.fn();
      wrapper.setProps({ onClick });

      expect(onClick.mock.calls.length).toBe(0);

      wrapper.find('button').simulate('click');
      expect(onClick.mock.calls.length).toBe(1);
      expect(onClick.mock.calls[0][0].target.id).toBe(props.id);
    });

    it('emits props.onToggle when toggled and passes current state', () => {
      const onToggle = jest.fn();
      wrapper.setProps({ onToggle, toggled: false });

      expect(onToggle.mock.calls.length).toBe(0);

      wrapper.find('button').simulate('click');
      expect(onToggle.mock.calls.length).toBe(1);
      expect(onToggle.mock.calls[0][0]).toBe(true);

      wrapper.setProps({ toggled: true });
      wrapper.find('button').simulate('click');
      expect(onToggle.mock.calls.length).toBe(2);
      expect(onToggle.mock.calls[1][0]).toBe(false);
    });
  });
});
