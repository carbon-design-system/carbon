import React from 'react';
import ContentSwitcher from '../ContentSwitcher';
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

    it('should have the correct class', () => {
      expect(wrapper.hasClass('bx--content-switcher')).toEqual(true);
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
    const firstChild = children.first();
    const secondChild = children.last();

    firstChild.props().onClick(mockData);

    it('should invoke onChange', () => {
      expect(onChange).toBeCalledWith(mockData);
    });

    it('should set the correct selectedIndex', () => {
      expect(wrapper.state('selectedIndex')).toEqual(mockData.index);
    });

    it('should set selected to true on the correct child', () => {
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
    const firstChild = children.first();
    const secondChild = children.last();

    firstChild.props().onKeyDown(mockData);

    it('should invoke onChange', () => {
      expect(onChange).toBeCalledWith(mockData);
    });

    it('should set the correct selectedIndex', () => {
      expect(wrapper.state('selectedIndex')).toEqual(mockData.index);
    });

    it('should set selected to true on the correct child', () => {
      expect(firstChild.props().selected).toEqual(false);
      expect(secondChild.props().selected).toEqual(true);
    });
  });
});
