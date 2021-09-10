/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import TileGroup from '../TileGroup';
import RadioTile from '../RadioTile';

describe('TileGroup', () => {
  describe('renders as expected', () => {
    const wrapper = mount(
      <TileGroup defaultSelected="female" name="gender">
        <RadioTile value="male" />
        <RadioTile value="female" />
      </TileGroup>
    );

    describe('wrapping div', () => {
      const div = wrapper.first('div');

      it('renders a div', () => {
        expect(div.length).toEqual(1);
      });

      it('sets classes that are passed via className prop', () => {
        wrapper.setProps({ className: 'extra-class' });
        expect(wrapper.first('div').hasClass('extra-class')).toBe(true);
      });

      it('sets disabled attribute if disabled prop is set', () => {
        wrapper.setProps({ disabled: true });
        expect(wrapper.first().props().disabled).toEqual(true);
      });
    });

    describe('children', () => {
      const tileButton = () => wrapper.find(RadioTile);

      it('renders expected number of children', () => {
        expect(tileButton().length).toEqual(2);
      });

      it('should set checked property based on defaultSelected prop', () => {
        expect(tileButton().last().props().checked).toEqual(true);
      });

      it('should set checked property based on valueSelected prop', () => {
        wrapper.setProps({ valueSelected: 'male' });
        expect(tileButton().first().props().checked).toEqual(true);
        wrapper.setProps({ valueSelected: 'female' });
        expect(tileButton().last().props().checked).toEqual(true);
      });

      it('should set expected props on children', () => {
        const firstChild = tileButton().first();
        expect(firstChild.props().name).toEqual('gender');
        expect(firstChild.props().value).toEqual('male');
      });
    });
  });

  describe('onChange event', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <TileGroup onChange={onChange} name="gender">
        <RadioTile value="male" />
        <RadioTile value="female" />
      </TileGroup>
    );

    const firstRadio = wrapper.find(RadioTile).first();
    const args = ['male', 'gender', { test: 'test event' }];

    it('first child should not have checked set initially', () => {
      expect(firstRadio.props().checked).toEqual(false);
    });

    it('invoking onChange sets checked on correct child', () => {
      firstRadio.props().onChange(...args);
      wrapper.update();
      expect(wrapper.find(RadioTile).first().props().checked).toEqual(true);
    });

    it('should invoke onChange with correct arguments', () => {
      expect(onChange).toHaveBeenCalledWith(...args);
    });

    it('calling onChange with same args should not call onChange prop', () => {
      onChange.mockClear();
      firstRadio.props().onChange(...args);
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Getting derived state from props', () => {
    it('should change the selected item upon change in props', () => {
      const wrapper = shallow(
        <TileGroup name="gender" valueSelected="male">
          <RadioTile value="male" />
          <RadioTile value="female" />
        </TileGroup>
      );
      expect(wrapper.state().selected).toEqual('male');
      wrapper.setProps({ valueSelected: 'female' });
      expect(wrapper.state().selected).toEqual('female');
    });

    it('should avoid change the selected item upon setting props, unless there the value actually changes', () => {
      const wrapper = shallow(
        <TileGroup name="gender">
          <RadioTile value="male" />
          <RadioTile value="female" />
        </TileGroup>
      );
      wrapper.setProps({ valueSelected: 'male' });
      wrapper.setState({ selected: 'female' });
      wrapper.setProps({ valueSelected: 'male' });
      expect(wrapper.state().selected).toEqual('female');
    });
  });
});
