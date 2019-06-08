/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ChevronDown16 from '@carbon/icons-react/lib/chevron--down/16';
import {
  Tile,
  ClickableTile,
  SelectableTile,
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from '../Tile';
import { shallow, mount } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

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

    it('has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--tile`)).toEqual(true);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });

  describe('Renders clickable tile as expected', () => {
    const wrapper = shallow(
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

    it('has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--tile--clickable`)).toEqual(true);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('toggles the clickable class on click', () => {
      expect(wrapper.hasClass(`${prefix}--tile--is-clicked`)).toEqual(false);
      wrapper.simulate('click', { persist: () => {} });
      expect(wrapper.hasClass(`${prefix}--tile--is-clicked`)).toEqual(true);
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
  });

  describe('Renders selectable tile as expected', () => {
    const wrapper = mount(
      <SelectableTile className="extra-class">
        <div className="child">Test</div>
      </SelectableTile>
    );
    let label;

    beforeEach(() => {
      wrapper.state().selected = false;
      label = wrapper.find('label');
    });

    it('renders children as expected', () => {
      expect(wrapper.find('.child').length).toBe(1);
    });

    it('has the expected classes', () => {
      expect(label.hasClass(`${prefix}--tile--selectable`)).toEqual(true);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('toggles the selectable state on click', () => {
      expect(wrapper.state().selected).toEqual(false);
      label.simulate('click');
      expect(wrapper.state().selected).toEqual(true);
    });

    it('toggles the selectable state when using enter or space', () => {
      expect(wrapper.state().selected).toEqual(false);
      label.simulate('keydown', { which: 32 });
      expect(wrapper.state().selected).toEqual(true);
      label.simulate('keydown', { which: 13 });
      expect(wrapper.state().selected).toEqual(false);
    });

    it('the input should be checked when state is selected', () => {
      wrapper.setState({ selected: true });
      expect(wrapper.find('input').props().checked).toEqual(true);
    });

    it('supports setting initial selected state from props', () => {
      expect(shallow(<SelectableTile selected />).state().selected).toEqual(
        true
      );
    });

    it('supports setting selected state from props', () => {
      wrapper.setProps({ selected: true });
      wrapper.setState({ selected: true });
      wrapper.setProps({ selected: false });
      expect(wrapper.state().selected).toEqual(false);
    });

    it('avoids changing selected state upon setting props, unless actual value change is detected', () => {
      wrapper.setProps({ selected: true });
      wrapper.setState({ selected: false });
      wrapper.setProps({ selected: true });
      expect(wrapper.state().selected).toEqual(false);
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

    it('displays the default tooltip for the chevron depending on state', () => {
      const defaultExpandedIconText = 'Collapse';
      const defaultCollapsedIconText = 'Expand';

      // Force the expanded tile to be collapsed.
      wrapper.setState({ expanded: false });
      const collapsedDescription = wrapper.find(ChevronDown16).getElements()[0]
        .props['aria-label'];
      expect(collapsedDescription).toEqual(defaultCollapsedIconText);

      // click on the item to expand it.
      wrapper.simulate('click');

      // Validate the description change
      const expandedDescription = wrapper.find(ChevronDown16).getElements()[0]
        .props['aria-label'];
      expect(expandedDescription).toEqual(defaultExpandedIconText);
    });

    it('displays the custom tooltips for the chevron depending on state', () => {
      const tileExpandedIconText = 'Click To Collapse';
      const tileCollapsedIconText = 'Click To Expand';

      // Force the custom icon text
      wrapper.setProps({ tileExpandedIconText, tileCollapsedIconText });

      // Force the expanded tile to be collapsed.
      wrapper.setState({ expanded: false });
      const collapsedDescription = wrapper.find(ChevronDown16).getElements()[0]
        .props['aria-label'];
      expect(collapsedDescription).toEqual(tileCollapsedIconText);

      // click on the item to expand it.
      wrapper.simulate('click');

      // Validate the description change
      const expandedDescription = wrapper.find(ChevronDown16).getElements()[0]
        .props['aria-label'];
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
  });
});
