/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { mount } from 'enzyme';
import React from 'react';
import ContentSwitcher, { Switch } from '../../ContentSwitcher';
import { ArrowLeft, ArrowRight } from '../../../internal/keyboard/keys';

describe('ContentSwitcher', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      className: 'custom-class',
      onChange: jest.fn(),
      selectedIndex: 0,
    };
  });

  it('should render', () => {
    const wrapper = mount(
      <ContentSwitcher {...mockProps}>
        <Switch text="A" />
        <Switch text="B" />
        <Switch text="C" />
      </ContentSwitcher>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should support a custom class name', () => {
    const wrapper = mount(
      <ContentSwitcher {...mockProps}>
        <Switch text="A" />
        <Switch text="B" />
        <Switch text="C" />
      </ContentSwitcher>
    );
    expect(wrapper.children().find(`.${mockProps.className}`).length).toBe(1);
  });

  it('should match the selected tab with `selectedIndex`', () => {
    const wrapper = mount(
      <ContentSwitcher {...mockProps}>
        <Switch text="A" />
        <Switch text="B" />
        <Switch text="C" />
      </ContentSwitcher>
    );
    expect(wrapper.find({ selected: true }).prop('index')).toBe(
      mockProps.selectedIndex
    );
  });

  it('should update the selected index when a `Switch` is clicked', () => {
    const children = 3;
    const wrapper = mount(
      <ContentSwitcher {...mockProps}>
        {Array.from({ length: children }).map((_, index) => (
          <Switch key={index} text={'' + index} />
        ))}
      </ContentSwitcher>
    );

    for (let i = children - 1; i >= 0; i--) {
      wrapper
        .find(Switch)
        .at(i)
        .simulate('click');
      expect(wrapper.find({ selected: true }).prop('index')).toBe(i);
    }
  });

  it('should update the selected index when `selectedIndex` is updated', () => {
    const children = 3;
    const wrapper = mount(
      <ContentSwitcher {...mockProps}>
        <Switch text="A" />
        <Switch text="B" />
        <Switch text="C" />
      </ContentSwitcher>
    );

    expect(wrapper.find({ selected: true }).prop('index')).toBe(0);

    for (let i = children - 1; i >= 0; i--) {
      wrapper.setProps({ selectedIndex: i });
      expect(wrapper.find({ selected: true }).prop('index')).toBe(i);
    }
  });

  it('should not update focus if `selectedIndex` is updated', () => {
    const wrapper = mount(
      <ContentSwitcher {...mockProps}>
        <Switch text="A" />
        <Switch text="B" />
        <Switch text="C" />
      </ContentSwitcher>
    );

    const secondSwitchTrigger = wrapper
      .find(Switch)
      .at(1)
      .find('button');
    secondSwitchTrigger.simulate('click');

    expect(document.activeElement === secondSwitchTrigger.getDOMNode()).toBe(
      true
    );

    wrapper.setProps({ selectedIndex: 1 });

    expect(document.activeElement === secondSwitchTrigger.getDOMNode()).toBe(
      true
    );
  });

  it('should call `onChange` when the selected index changes', () => {
    const children = 3;
    const wrapper = mount(
      <ContentSwitcher {...mockProps}>
        <Switch text="A" />
        <Switch text="B" />
        <Switch text="C" />
      </ContentSwitcher>
    );

    // Simulate click to change selected index
    for (let i = children - 1; i >= 0; i--) {
      wrapper
        .find(Switch)
        .at(i)
        .find('button')
        .simulate('click');
      expect(mockProps.onChange).toHaveBeenLastCalledWith(i);
    }
  });

  it('should change the selected index when ArrowLeft and ArrowRight are used', () => {
    const children = 3;
    const wrapper = mount(
      <ContentSwitcher {...mockProps}>
        {Array.from({ length: children }).map((_, index) => (
          <Switch key={index} text={'' + index} />
        ))}
      </ContentSwitcher>
    );

    wrapper
      .find(Switch)
      .at(0)
      .find('button')
      .simulate('focus');

    for (let i = 0; i < children; i++) {
      wrapper
        .find(Switch)
        .at(i)
        .find('button')
        .simulate('keydown', ArrowRight);
      expect(wrapper.find({ selected: true }).prop('index')).toBe(
        // The index will wrap to the beginning of the list so we'll use a ring
        // buffer to check the selected index
        (i + 1) % children
      );
    }

    wrapper.setProps({ selectedIndex: 2 });

    for (let i = children - 1; i >= 0; i--) {
      wrapper
        .find(Switch)
        .at(i)
        .find('button')
        .simulate('keydown', ArrowLeft);
      expect(wrapper.find({ selected: true }).prop('index')).toBe(
        // The index will wrap to the end of the list so we'll use a ring
        // buffer to check the selected index
        (i + children - 1) % children
      );
    }
  });
});
