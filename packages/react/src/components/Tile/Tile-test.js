/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  Tile,
  ClickableTile,
  SelectableTile,
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from '../Tile';
import { shallow, mount } from 'enzyme';

const prefix = 'bx';

describe('Tile', () => {
  describe('Renders default tile as expected', () => {
    const wrapper = shallow(
      <Tile className="extra-class">
        <div className="child">Test</div>
      </Tile>
    );

    it('renders children as expected', () => {
      expect(wrapper.find('.child').length).toBe(1);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('supports light version', () => {
      const wrapper = mount(<Tile>Test</Tile>);
      expect(wrapper.props().light).toEqual(false);
      expect(wrapper.childAt(0).hasClass(`${prefix}--tile--light`)).toEqual(
        false
      );
      wrapper.setProps({ light: true });
      expect(wrapper.props().light).toEqual(true);
      expect(wrapper.childAt(0).hasClass(`${prefix}--tile--light`)).toEqual(
        true
      );
    });
  });

  describe('Renders clickable tile as expected', () => {
    const wrapper = mount(
      <ClickableTile className="extra-class">
        <div className="child">Test</div>
      </ClickableTile>
    );

    beforeEach(() => {
      wrapper.state().clicked = false;
    });

    it('renders children as expected', () => {
      expect(wrapper.find('.child').length).toBe(1);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('toggles the clickable class on click', () => {
      expect(
        wrapper.find('Link').hasClass(`${prefix}--tile--is-clicked`)
      ).toEqual(false);
      wrapper.simulate('click', { persist: () => {} });
      expect(
        wrapper.find('Link').hasClass(`${prefix}--tile--is-clicked`)
      ).toEqual(true);
    });

    it('toggles the clickable state on click', () => {
      expect(wrapper.state().clicked).toEqual(false);
      wrapper.simulate('click', { persist: () => {} });
      expect(wrapper.state().clicked).toEqual(true);
    });

    it('toggles the clicked state when using enter or space', () => {
      expect(wrapper.state().clicked).toEqual(false);
      wrapper.simulate('keydown', { which: 32, persist: () => {} });
      expect(wrapper.state().clicked).toEqual(true);
      wrapper.simulate('keydown', { which: 13, persist: () => {} });
      expect(wrapper.state().clicked).toEqual(false);
    });

    it('supports setting initial clicked state from props', () => {
      expect(shallow(<ClickableTile clicked />).state().clicked).toEqual(true);
    });

    it('supports setting clicked state from props', () => {
      wrapper.setProps({ clicked: true });
      wrapper.setState({ clicked: true });
      wrapper.setProps({ clicked: false });
      expect(wrapper.state().clicked).toEqual(false);
    });

    it('avoids changing clicked state upon setting props, unless actual value change is detected', () => {
      wrapper.setProps({ clicked: true });
      wrapper.setState({ clicked: false });
      wrapper.setProps({ clicked: true });
      expect(wrapper.state().clicked).toEqual(false);
    });

    it('supports light version', () => {
      const wrapper = mount(<ClickableTile>Test</ClickableTile>);
      expect(wrapper.props().light).toEqual(false);
      expect(wrapper.childAt(0).hasClass(`${prefix}--tile--light`)).toEqual(
        false
      );
      wrapper.setProps({ light: true });
      expect(wrapper.props().light).toEqual(true);
      expect(wrapper.childAt(0).hasClass(`${prefix}--tile--light`)).toEqual(
        true
      );
    });
  });

  describe('Renders selectable tile as expected', () => {
    let wrapper;
    let label;

    beforeEach(() => {
      wrapper = mount(
        <SelectableTile className="extra-class" onClick={jest.fn()}>
          <div className="child">Test</div>
        </SelectableTile>
      );
      label = wrapper.find('label');
    });

    it('renders children as expected', () => {
      expect(wrapper.find('.child').length).toBe(1);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('toggles the selectable state on click', () => {
      expect(wrapper.hasClass(`${prefix}--tile--is-selected`)).toEqual(false);
      label.simulate('click');
      expect(wrapper.props().onClick).toHaveBeenCalledTimes(1);
      expect(wrapper.render().hasClass(`${prefix}--tile--is-selected`)).toEqual(
        true
      );
    });

    it('toggles the selectable state when using enter or space', () => {
      expect(wrapper.hasClass(`${prefix}--tile--is-selected`)).toEqual(false);
      label.simulate('keydown', { which: 32 });
      expect(wrapper.render().hasClass(`${prefix}--tile--is-selected`)).toEqual(
        true
      );
      label.simulate('keydown', { which: 13 });
      expect(wrapper.render().hasClass(`${prefix}--tile--is-selected`)).toEqual(
        false
      );
    });

    it('the input should be checked when state is selected', () => {
      label.simulate('click');
      expect(wrapper.find('input').props().checked).toEqual(true);
    });

    it('supports setting initial selected state from props', () => {
      expect(
        shallow(<SelectableTile selected />)
          .render()
          .hasClass(`${prefix}--tile--is-selected`)
      ).toEqual(true);
    });

    it('supports setting selected state from props', () => {
      wrapper.setProps({ selected: true });
      expect(wrapper.render().hasClass(`${prefix}--tile--is-selected`)).toEqual(
        true
      );
    });

    it('avoids changing selected state upon setting props, unless actual value change is detected', () => {
      wrapper.setProps({ selected: true });
      label.simulate('click');
      wrapper.setProps({ selected: true });
      expect(wrapper.hasClass(`${prefix}--tile--is-selected`)).toEqual(false);
    });

    it('supports light version', () => {
      const wrapper = mount(<SelectableTile>Test</SelectableTile>);
      expect(wrapper.props().light).toEqual(false);
      expect(wrapper.childAt(1).hasClass('bx--tile--light')).toEqual(false);
      wrapper.setProps({ light: true });
      expect(wrapper.props().light).toEqual(true);
      expect(wrapper.childAt(1).hasClass('bx--tile--light')).toEqual(true);
    });

    it('should call onChange when the checkbox value changes', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <SelectableTile onChange={onChange}>
          <span id="test-id">test</span>
        </SelectableTile>
      );

      const content = wrapper.find('#test-id');

      // Tile becomes selected
      content.simulate('click');
      expect(onChange).toHaveBeenCalledTimes(1);

      // Tile becomes un-selected
      content.simulate('click');
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('supports disabled state', () => {
      wrapper.setProps({ disabled: true });
      expect(wrapper.find('input').props().disabled).toEqual(true);
    });
  });

  describe('Renders expandable tile as expected', () => {
    const wrapper = mount(
      <ExpandableTile className="extra-class">
        <TileAboveTheFoldContent className="child">
          <div style={{ height: '200px' }}>Test</div>
        </TileAboveTheFoldContent>
        <TileBelowTheFoldContent className="child">
          <div style={{ height: '500px' }}>Test</div>
          <a id="test-link" href="/">
            Test Link
          </a>
        </TileBelowTheFoldContent>
      </ExpandableTile>
    );

    beforeEach(() => {
      wrapper.state().expanded = false;
    });

    it('renders children as expected', () => {
      expect(wrapper.props().children.length).toBe(2);
    });

    it('has the expected classes', () => {
      expect(
        wrapper.children().hasClass(`${prefix}--tile--expandable`)
      ).toEqual(true);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('toggles the expandable class on click', () => {
      expect(
        wrapper.children().hasClass(`${prefix}--tile--is-expanded`)
      ).toEqual(false);
      wrapper.simulate('click');
      expect(
        wrapper.children().hasClass(`${prefix}--tile--is-expanded`)
      ).toEqual(true);
    });

    it('toggles the expandable state on click', () => {
      expect(wrapper.state().expanded).toEqual(false);
      wrapper.simulate('click');
      expect(wrapper.state().expanded).toEqual(true);
    });

    it('ignores allows click events to be ignored using onBeforeClick', () => {
      wrapper.setProps({
        onBeforeClick: (evt) => evt.target.tagName.toLowerCase() !== 'a', // ignore link clicks
      });
      expect(wrapper.state().expanded).toEqual(false);
      wrapper.simulate('click');
      expect(wrapper.state().expanded).toEqual(true);
      wrapper.find('#test-link').simulate('click');
      expect(wrapper.state().expanded).toEqual(true);
      wrapper.simulate('click');
      expect(wrapper.state().expanded).toEqual(false);
    });

    it('displays the default tooltip for the button depending on state', () => {
      const defaultExpandedIconText = 'Interact to collapse Tile';
      const defaultCollapsedIconText = 'Interact to expand Tile';

      // Force the expanded tile to be collapsed.
      wrapper.setState({ expanded: false });
      const collapsedDescription = wrapper.find('button').prop('title');
      expect(collapsedDescription).toEqual(defaultCollapsedIconText);

      // click on the item to expand it.
      wrapper.simulate('click');

      // Validate the description change
      const expandedDescription = wrapper.find('button').prop('title');
      expect(expandedDescription).toEqual(defaultExpandedIconText);
    });

    it('displays the custom tooltips for the button depending on state', () => {
      const tileExpandedIconText = 'Click To Collapse';
      const tileCollapsedIconText = 'Click To Expand';

      // Force the custom icon text
      wrapper.setProps({ tileExpandedIconText, tileCollapsedIconText });

      // Force the expanded tile to be collapsed.
      wrapper.setState({ expanded: false });
      const collapsedDescription = wrapper.find('button').prop('title');

      expect(collapsedDescription).toEqual(tileCollapsedIconText);

      // click on the item to expand it.
      wrapper.simulate('click');

      // Validate the description change
      const expandedDescription = wrapper.find('button').prop('title');
      expect(expandedDescription).toEqual(tileExpandedIconText);
    });

    it('supports setting initial expanded state from props', () => {
      const { expanded } = mount(
        <ExpandableTile expanded>
          <TileAboveTheFoldContent className="child">
            <div style={{ height: '200px' }}>Test</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent className="child">
            <div style={{ height: '500px' }}>Test</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      ).state();
      expect(expanded).toEqual(true);
    });

    it('supports setting expanded state from props', () => {
      wrapper.setProps({ expanded: true });
      wrapper.setState({ expanded: true });
      wrapper.setProps({ expanded: false });
      expect(wrapper.state().expanded).toEqual(false);
    });

    it('avoids changing expanded state upon setting props, unless actual value change is detected', () => {
      wrapper.setProps({ expanded: true });
      wrapper.setState({ expanded: false });
      wrapper.setProps({ expanded: true });
      expect(wrapper.state().expanded).toEqual(false);
    });

    it('supports setting max height from props', () => {
      wrapper.setProps({ tileMaxHeight: 2 });
      wrapper.setState({ tileMaxHeight: 2 });
      wrapper.setProps({ tileMaxHeight: 1 });
      expect(wrapper.state().tileMaxHeight).toEqual(1);
    });

    it('avoids changing max height upon setting props, unless actual value change is detected', () => {
      wrapper.setProps({ tileMaxHeight: 2 });
      wrapper.setState({ tileMaxHeight: 1 });
      wrapper.setProps({ tileMaxHeight: 2 });
      expect(wrapper.state().tileMaxHeight).toEqual(1);
    });

    it('supports setting padding from props', () => {
      wrapper.setProps({ tilePadding: 2 });
      wrapper.setState({ tilePadding: 2 });
      wrapper.setProps({ tilePadding: 1 });
      expect(wrapper.state().tilePadding).toEqual(1);
    });

    it('avoids changing padding upon setting props, unless actual value change is detected', () => {
      wrapper.setProps({ tilePadding: 2 });
      wrapper.setState({ tilePadding: 1 });
      wrapper.setProps({ tilePadding: 2 });
      expect(wrapper.state().tilePadding).toEqual(1);
    });

    it('supports light version', () => {
      const wrapper = mount(<ExpandableTile>Test</ExpandableTile>);
      expect(wrapper.props().light).toEqual(false);
      expect(wrapper.childAt(0).hasClass(`${prefix}--tile--light`)).toEqual(
        false
      );
      wrapper.setProps({ light: true });
      expect(wrapper.props().light).toEqual(true);
      expect(wrapper.childAt(0).hasClass(`${prefix}--tile--light`)).toEqual(
        true
      );
    });
  });
});
