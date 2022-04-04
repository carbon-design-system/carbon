/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import ContentSwitcher from './ContentSwitcher';
import Switch from '../Switch';
import { mount, shallow } from 'enzyme';

describe('ContentSwitcher', () => {
  describe('component initial rendering', () => {
    const wrapper = shallow(
      <ContentSwitcher onChange={() => {}} className="extra-class">
        <Switch kind="anchor" text="one" />
        <Switch kind="anchor" text="two" />
      </ContentSwitcher>
    );

    const children = wrapper.find(Switch);

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

    it('should not have a selectionMode prop', () => {
      expect('selectionMode' in wrapper.props()).toEqual(false);
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
      children.first().props().onClick(mockData);
      wrapper.setProps({ selectedIndex: 1 }); // No change in `selectedIndex` prop
      const clonedChildren = wrapper.find(Switch);
      expect(clonedChildren.first().props().selected).toEqual(true);
      expect(clonedChildren.last().props().selected).toEqual(false);
    });

    it('should change the selected index upon change in props', () => {
      wrapper.setProps({ selectedIndex: 0 });
      children.first().props().onClick(mockData);
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

    children.first().props().onClick(mockData);

    it('should invoke onChange', () => {
      expect(onChange).toHaveBeenCalledWith(mockData);
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

    children.first().props().onKeyDown(mockData);

    it('should invoke onChange', () => {
      expect(onChange).toHaveBeenCalledWith(mockData);
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

  describe('onChange', () => {
    it('should call `onChange` with the newly selected switch data when using a keyboard', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <ContentSwitcher onChange={onChange}>
          <Switch name="first" text="first" />
          <Switch name="second" text="second" />
          <Switch name="third" text="third" />
        </ContentSwitcher>
      );

      wrapper.find({ name: 'first' }).simulate('keydown', {
        key: 'ArrowRight',
      });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith({
        index: 1,
        name: 'second',
        text: 'second',
        key: 'ArrowRight',
      });

      wrapper.find({ name: 'second' }).simulate('keydown', {
        key: 'ArrowRight',
      });
      expect(onChange).toHaveBeenLastCalledWith({
        index: 2,
        name: 'third',
        text: 'third',
        key: 'ArrowRight',
      });

      wrapper.find({ name: 'third' }).simulate('keydown', {
        key: 'ArrowRight',
      });
      expect(onChange).toHaveBeenLastCalledWith({
        index: 0,
        name: 'first',
        text: 'first',
        key: 'ArrowRight',
      });
    });

    it('should call `onChange` with the newly selected switch data when using a mouse', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <ContentSwitcher onChange={onChange}>
          <Switch name="first" text="first" />
          <Switch name="second" text="second" />
          <Switch name="third" text="third" />
        </ContentSwitcher>
      );

      wrapper.find({ name: 'second' }).simulate('click');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith({
        index: 1,
        name: 'second',
        text: 'second',
      });

      wrapper.find({ name: 'third' }).simulate('click');
      expect(onChange).toHaveBeenLastCalledWith({
        index: 2,
        name: 'third',
        text: 'third',
      });
    });
  });

  describe('automated verification testing', () => {
    it('should have no aXe violations', async () => {
      const { container } = render(
        <ContentSwitcher>
          <Switch kind="anchor" text="one" />
          <Switch kind="anchor" text="two" />
        </ContentSwitcher>
      );
      await expect(container).toHaveNoAxeViolations();
    });

    it('should have no AC violations', async () => {
      const { container } = render(
        <ContentSwitcher>
          <Switch kind="anchor" text="one" />
          <Switch kind="anchor" text="two" />
        </ContentSwitcher>
      );
      await expect(container).toHaveNoACViolations('ContentSwitcher');
    });
  });
});
