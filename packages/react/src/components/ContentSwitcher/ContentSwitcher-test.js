/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ContentSwitcher from '../ContentSwitcher';
import Switch from '../Switch';
import { mount, shallow } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('ContentSwitcher', () => {
  describe('component initial rendering', () => {
    const wrapper = shallow(
      <ContentSwitcher onChange={() => {}} className="extra-class">
        <Switch kind="anchor" text="one" />
        <Switch kind="anchor" text="two" />
      </ContentSwitcher>
    );

    const children = wrapper.find(Switch);

    it('should have the correct class', () => {
      expect(wrapper.hasClass(`${prefix}--content-switcher`)).toEqual(true);
    });

    it('should render children as expected', () => {
      expect(children.length).toEqual(2);
    });

    it('should default "selected" property to true on first child', () => {
      expect(children.first().props().selected).toEqual(true);
      expect(children.last().props().selected).toEqual(false);
    });

    it('should apply extra classes passed to it', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });

  describe('Allow initial state to draw from props', () => {
    const onChange = jest.fn();
    const mockData = {
      index: 0,
    };

    const wrapper = mount(
      <ContentSwitcher
        selectedIndex={1}
        onChange={onChange}
        className="extra-class">
        <Switch kind="anchor" text="one" />
        <Switch kind="anchor" text="two" />
      </ContentSwitcher>
    );

    const children = wrapper.find(Switch);

    it('Should apply the selected property on the selected child', () => {
      expect(children.first().props().selected).toEqual(false);
      expect(children.last().props().selected).toEqual(true);
    });

    it('should avoid change the selected index upon setting props, unless there the value actually changes', () => {
      wrapper.setProps({ selectedIndex: 1 });
      // Turns `state.selectedIndex` to `0`
      children
        .first()
        .props()
        .onClick(mockData);
      wrapper.setProps({ selectedIndex: 1 }); // No change in `selectedIndex` prop
      const clonedChildren = wrapper.find(Switch);
      expect(clonedChildren.first().props().selected).toEqual(true);
      expect(clonedChildren.last().props().selected).toEqual(false);
    });

    it('should change the selected index upon change in props', () => {
      wrapper.setProps({ selectedIndex: 0 });
      children
        .first()
        .props()
        .onClick(mockData);
      wrapper.setProps({ selectedIndex: 1 });
      const clonedChildren = wrapper.find(Switch);
      expect(clonedChildren.first().props().selected).toEqual(false);
      expect(clonedChildren.last().props().selected).toEqual(true);
    });
  });

  describe('when child component onClick is invoked', () => {
    const onChange = jest.fn();
    const mockData = {
      index: 1,
    };

    const wrapper = mount(
      <ContentSwitcher onChange={onChange}>
        <Switch kind="anchor" text="one" />
        <Switch kind="anchor" text="two" />
      </ContentSwitcher>
    );

    const children = wrapper.find(Switch);

    children
      .first()
      .props()
      .onClick(mockData);

    it('should invoke onChange', () => {
      expect(onChange).toBeCalledWith(mockData);
    });

    it('should set the correct selectedIndex', () => {
      expect(wrapper.state('selectedIndex')).toEqual(mockData.index);
    });

    it('should set selected to true on the correct child', () => {
      wrapper.update();
      const firstChild = wrapper.find(Switch).first();
      const secondChild = wrapper.find(Switch).last();
      expect(firstChild.props().selected).toEqual(false);
      expect(secondChild.props().selected).toEqual(true);
    });
  });

  describe('when child component onKeyDown is invoked', () => {
    const onChange = jest.fn();
    const mockData = {
      index: 1,
    };

    const wrapper = mount(
      <ContentSwitcher onChange={onChange}>
        <Switch kind="anchor" text="one" />
        <Switch kind="anchor" text="two" />
      </ContentSwitcher>
    );

    const children = wrapper.find(Switch);

    children
      .first()
      .props()
      .onKeyDown(mockData);

    it('should invoke onChange', () => {
      expect(onChange).toBeCalledWith(mockData);
    });

    it('should set the correct selectedIndex', () => {
      expect(wrapper.state('selectedIndex')).toEqual(mockData.index);
    });

    it('should set selected to true on the correct child', () => {
      wrapper.update();
      const firstChild = wrapper.find(Switch).first();
      const secondChild = wrapper.find(Switch).last();
      expect(firstChild.props().selected).toEqual(false);
      expect(secondChild.props().selected).toEqual(true);
    });
  });
});
